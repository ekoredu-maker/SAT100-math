/* 수능핏 MATH v2.6 시험용 필기 엔진
   목표
   1) Apple Pencil 시각 지연 최소화
   2) 손바닥/보조 터치가 현재 펜 획에 섞이거나 획을 종료하지 않도록 pointerId 잠금
   3) Safari 텍스트 선택·롱프레스·콜아웃 차단
   4) 기존 획 데이터/자동저장 구조와 호환
*/
(() => {
  'use strict';
  if (window.__SAT100_PEN_V26__) return;
  window.__SAT100_PEN_V26__ = true;

  const canvas = document.getElementById('scratchCanvas');
  const shell = document.getElementById('canvasShell');
  const pane = document.querySelector('.scratch-pane');
  if (!canvas || !shell) return;

  let activePenId = null;
  let activePointerType = 'mouse';
  let metrics = null;
  let overlay = null;
  let octx = null;
  let overlayLast = null;

  function refreshMetrics(){
    const r = canvas.getBoundingClientRect();
    metrics = {
      left:r.left, top:r.top,
      width:Math.max(1,r.width),
      height:Math.max(1,r.height),
      dpr:Math.max(1,window.devicePixelRatio||1)
    };
    syncOverlay();
    return metrics;
  }
  function m(){
    return metrics || refreshMetrics();
  }
  function fastPoint(e){
    const r=m();
    return {
      x:(e.clientX-r.left)/r.width,
      y:(e.clientY-r.top)/r.height,
      p:(e.pressure && e.pressure>0) ? e.pressure : .5
    };
  }

  /* 기존 point()는 coalesced 좌표마다 getBoundingClientRect()를 호출했다.
     펜이 닿을 때 한 번 측정한 rect를 재사용해 동기 레이아웃 호출을 줄인다. */
  try {
    point = fastPoint;
  } catch (_) {}

  /* ------------------------------
     네이티브 선택/롱프레스 차단
     ------------------------------ */
  const style = document.createElement('style');
  style.id = 'sat100PenV26Style';
  style.textContent = `
    .scratch-pane,.scratch-pane *{
      -webkit-user-select:none!important;
      user-select:none!important;
      -webkit-touch-callout:none!important;
    }
    #canvasShell,#scratchCanvas{
      touch-action:none!important;
      overscroll-behavior:contain!important;
      -webkit-user-drag:none!important;
      -webkit-tap-highlight-color:transparent!important;
    }
    #scratchCanvas{z-index:1}
    #sat100PenOverlay{z-index:2;pointer-events:none!important}
    #canvasShell .canvas-hint{z-index:3}
  `;
  document.head.appendChild(style);

  ['selectstart','dragstart','contextmenu','gesturestart'].forEach(type => {
    shell.addEventListener(type, e => e.preventDefault(), {capture:true});
  });
  ['touchstart','touchmove','touchend','touchcancel'].forEach(type => {
    shell.addEventListener(type, e => {
      e.preventDefault();
    }, {capture:true, passive:false});
  });

  /* ---------------------------------------
     실시간 시각 오버레이
     raw update가 있으면 base canvas보다 먼저 표시
     --------------------------------------- */
  function createOverlay(){
    overlay = document.createElement('canvas');
    overlay.id = 'sat100PenOverlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.style.position='absolute';
    overlay.style.inset='0';
    overlay.style.width='100%';
    overlay.style.height='100%';
    overlay.style.touchAction='none';
    shell.appendChild(overlay);
    octx=overlay.getContext('2d',{alpha:true,desynchronized:true}) || overlay.getContext('2d');
    syncOverlay();
  }
  function syncOverlay(){
    if(!overlay || !octx) return;
    const r=metrics;
    if(!r) return;
    const w=Math.max(1,Math.round(r.width*r.dpr));
    const h=Math.max(1,Math.round(r.height*r.dpr));
    if(overlay.width!==w || overlay.height!==h){
      overlay.width=w; overlay.height=h;
      octx.setTransform(r.dpr,0,0,r.dpr,0,0);
    }
  }
  function clearOverlay(){
    if(!octx || !metrics) return;
    octx.clearRect(0,0,metrics.width,metrics.height);
    overlayLast=null;
  }
  function overlayPoint(e){
    const r=m();
    return {
      x:e.clientX-r.left,
      y:e.clientY-r.top,
      p:(e.pressure && e.pressure>0)?e.pressure:.5
    };
  }
  function drawOverlayPoint(pt, dot=false){
    if(!octx || !metrics) return;
    /* 지우개는 base canvas가 즉시 처리하도록 두고,
       시각 오버레이는 펜 획에만 사용한다. */
    try { if(typeof tool!=='undefined' && tool==='eraser') return; } catch(_){}
    let color='#172033', width=2;
    try { if(typeof penColor!=='undefined') color=penColor; } catch(_){}
    try { if(typeof penWidth!=='undefined') width=Number(penWidth)||2; } catch(_){}
    const w=width*(.6+.8*(pt.p??.5));
    octx.save();
    octx.strokeStyle=color;
    octx.fillStyle=color;
    octx.lineWidth=w;
    octx.lineCap='round';
    octx.lineJoin='round';
    if(dot || !overlayLast){
      octx.beginPath();
      octx.arc(pt.x,pt.y,Math.max(.6,w/2),0,Math.PI*2);
      octx.fill();
    }else{
      octx.beginPath();
      octx.moveTo(overlayLast.x,overlayLast.y);
      octx.lineTo(pt.x,pt.y);
      octx.stroke();
    }
    octx.restore();
    overlayLast=pt;
  }
  function drawOverlayEvent(e){
    if(e.pointerType!=='pen' || activePenId===null || e.pointerId!==activePenId) return;
    const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
    if(evs && evs.length){
      for(const ce of evs) drawOverlayPoint(overlayPoint(ce));
    }else{
      drawOverlayPoint(overlayPoint(e));
    }
  }
  createOverlay();

  /* ---------------------------------------
     pointerId 잠금 + palm rejection
     capture 단계에서 base 필기 리스너보다 먼저 걸러낸다.
     --------------------------------------- */
  function fingerDrawingEnabled(){
    try { return !!state.settings.fingerDraw; } catch(_) { return false; }
  }
  function blockForeignPointer(e){
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  canvas.addEventListener('pointerdown', e => {
    refreshMetrics();

    if(e.pointerType==='pen'){
      /* 이미 다른 펜 포인터가 활성인 특이 상황만 차단 */
      if(activePenId!==null && e.pointerId!==activePenId){
        blockForeignPointer(e);
        return;
      }
      activePenId=e.pointerId;
      activePointerType='pen';
      e.preventDefault();
      overlayLast=null;
      drawOverlayPoint(overlayPoint(e),true);
      return;
    }

    /* 펜으로 쓰는 중에는 손바닥/손가락 포인터가 base drawing 상태를 건드리지 못하게 한다. */
    if(activePenId!==null && e.pointerId!==activePenId){
      blockForeignPointer(e);
      return;
    }

    activePointerType=e.pointerType||'mouse';
    if(e.pointerType==='touch' && !fingerDrawingEnabled()){
      blockForeignPointer(e);
    }
  }, {capture:true, passive:false});

  canvas.addEventListener('pointermove', e => {
    if(activePenId!==null){
      if(e.pointerId!==activePenId){
        blockForeignPointer(e);
        return;
      }
      if(e.pointerType==='pen'){
        e.preventDefault();
        drawOverlayEvent(e);
      }
      return;
    }
    if(e.pointerType==='touch' && !fingerDrawingEnabled()){
      blockForeignPointer(e);
    }
  }, {capture:true, passive:false});

  /* 지원 브라우저에서는 pointermove보다 빠른 raw update를 오버레이에만 사용.
     저장 데이터는 기존 pointermove 경로가 담당하므로 중복 좌표가 생기지 않는다. */
  canvas.addEventListener('pointerrawupdate', e => {
    if(e.pointerType==='pen' && activePenId!==null && e.pointerId===activePenId){
      drawOverlayEvent(e);
    }
  }, {capture:true, passive:true});

  function captureEnd(e){
    if(activePenId!==null && e.pointerId!==activePenId){
      blockForeignPointer(e);
      return;
    }
    if(e.pointerType==='touch' && activePenId===null && !fingerDrawingEnabled()){
      blockForeignPointer(e);
    }
  }
  canvas.addEventListener('pointerup',captureEnd,{capture:true,passive:false});
  canvas.addEventListener('pointercancel',captureEnd,{capture:true,passive:false});

  /* base의 stopDraw()가 먼저 실행된 뒤 overlay와 pen lock을 해제한다.
     이 리스너는 원본 리스너보다 나중에 등록되므로 같은 target의 bubble 순서상 뒤에서 실행된다. */
  function finishPen(e){
    if(activePenId===null || e.pointerId!==activePenId) return;
    try { flushDraw(); } catch(_){}
    clearOverlay();
    activePenId=null;
    activePointerType='mouse';
  }
  canvas.addEventListener('pointerup',finishPen,{passive:true});
  canvas.addEventListener('pointercancel',finishPen,{passive:true});
  canvas.addEventListener('lostpointercapture',e=>{
    if(activePenId!==null && e.pointerId===activePenId){
      try { flushDraw(); } catch(_){}
      clearOverlay();
      activePenId=null;
      activePointerType='mouse';
    }
  },{passive:true});

  /* 기존 RAF 예약은 Apple Pencil에서 즉시 flush.
     point() 최적화와 함께 base canvas도 overlay를 빠르게 따라오게 한다. */
  try{
    const originalScheduleDraw=scheduleDraw;
    scheduleDraw=function(){
      if(activePointerType==='pen' && activePenId!==null){
        try{ flushDraw(); return; }catch(_){}
      }
      return originalScheduleDraw();
    };
  }catch(_){}

  /* 크기/방향이 바뀔 때만 rect를 다시 측정한다. */
  const refreshSoon=()=>requestAnimationFrame(()=>refreshMetrics());
  window.addEventListener('resize',refreshSoon,{passive:true});
  window.addEventListener('orientationchange',refreshSoon,{passive:true});
  window.addEventListener('scroll',()=>{
    /* 필기 중에는 touch-action:none으로 스크롤되지 않지만,
       외부 스크롤 후 첫 펜 입력 전 좌표 보정을 위해 갱신 */
    if(activePenId===null) metrics=null;
  },{passive:true});
  if('ResizeObserver' in window){
    try{
      new ResizeObserver(()=>{ if(activePenId===null) refreshSoon(); }).observe(shell);
    }catch(_){}
  }
  refreshSoon();

  document.documentElement.dataset.penEngine='v2.6-exam-low-latency-palm-lock';
  const version=document.querySelector('.version');
  if(version){
    const count=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK.length:104;
    version.textContent=`v2.6 ${count}문항`;
  }
})();