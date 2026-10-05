/* 수능핏 MATH v2.4 Apple Pencil 저지연 패치
   - Apple Pencil(pointerType=pen)은 requestAnimationFrame 대기 없이 incremental draw 즉시 실행
   - 손가락/마우스는 기존 RAF 배칭 유지
   - 기존 필기 저장 구조, 획 데이터, 문제별 저장과 호환
*/
(() => {
  'use strict';
  if (window.__SAT100_PEN_V24__) return;
  window.__SAT100_PEN_V24__ = true;

  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;

  let activePointerType = 'mouse';
  let activePointerId = null;

  canvas.style.touchAction = 'none';
  canvas.style.webkitUserSelect = 'none';
  canvas.style.userSelect = 'none';
  canvas.style.webkitTouchCallout = 'none';
  if (canvas.parentElement) canvas.parentElement.style.overscrollBehavior = 'contain';

  canvas.addEventListener('pointerdown', e => {
    activePointerType = e.pointerType || 'mouse';
    activePointerId = e.pointerId;
  }, {capture:true, passive:true});

  const clearPointer = e => {
    if (activePointerId === null || e.pointerId === activePointerId) {
      activePointerId = null;
      activePointerType = 'mouse';
    }
  };
  canvas.addEventListener('pointerup', clearPointer, {capture:true, passive:true});
  canvas.addEventListener('pointercancel', clearPointer, {capture:true, passive:true});
  canvas.addEventListener('lostpointercapture', clearPointer, {capture:true, passive:true});

  /* 기존 pointermove가 호출하는 scheduleDraw만 교체한다.
     Pencil에서는 같은 이벤트 턴에서 바로 그려 화면 지연을 줄이고,
     손가락/마우스는 기존 RAF 방식을 그대로 쓴다. */
  try {
    const originalScheduleDraw = scheduleDraw;
    scheduleDraw = function() {
      if (activePointerType === 'pen') {
        try {
          flushDraw();
          return;
        } catch (_) {}
      }
      return originalScheduleDraw();
    };
  } catch (_) {}

  /* 펜을 뗄 때 혹시 남은 coalesced 좌표가 있으면 즉시 마무리 */
  const finishNow = e => {
    if ((e.pointerType || activePointerType) !== 'pen') return;
    try { flushDraw(); } catch (_) {}
  };
  canvas.addEventListener('pointerup', finishNow, {capture:true, passive:true});
  canvas.addEventListener('pointercancel', finishNow, {capture:true, passive:true});

  /* 화면 표기: 학습 로직 버전은 유지하고 펜 엔진 패치만 확인 가능하게 표시 */
  const version = document.querySelector('.version');
  if (version) {
    const count = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK.length : 104;
    version.textContent = `v2.4 ${count}문항`;
  }
  document.documentElement.dataset.penEngine = 'v2.4-low-latency';
})();
