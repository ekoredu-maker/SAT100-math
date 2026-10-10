/* 수능핏 MATH v2.8 학습 무결성 패치
   1) 한 번 시작한 묶음은 채점 종료까지 문제 ID + 문제 스냅샷을 고정한다.
   2) 자정을 넘어가도 풀이 중인 묶음의 날짜키를 유지한다.
   3) 필기 IndexedDB write/read를 문제별 직렬화한다.
   4) 새 문제 필기 로딩이 끝나기 전 펜 입력을 차단해 이전 필기 객체와 섞이지 않게 한다.
*/
(() => {
  'use strict';
  if (window.__SAT100_INTEGRITY_V28__) return;
  window.__SAT100_INTEGRITY_V28__ = true;

  const BUNDLE_SCHEMA = '2.8-frozen-bundle';
  const pendingWrites = new Map();
  window.__SAT100_PENDING_SCRATCH_WRITES__ = pendingWrites;

  function cloneData(v){
    try { if (typeof structuredClone === 'function') return structuredClone(v); } catch (_) {}
    try { return JSON.parse(JSON.stringify(v)); } catch (_) { return v; }
  }
  function bankById(id){
    try { return (window.QUESTION_BANK || []).find(q => q.id === id) || null; } catch (_) { return null; }
  }
  function validIds(ids){
    return Array.isArray(ids) && ids.length && ids.every(id => !!bankById(id));
  }
  function ensureDailyShape(d){
    if (!d || typeof d !== 'object') d = {};
    d.drafts = d.drafts && typeof d.drafts === 'object' ? d.drafts : {};
    d.marked = Array.isArray(d.marked) ? d.marked : [];
    d.visited = Array.isArray(d.visited) ? d.visited : [];
    d.times = d.times && typeof d.times === 'object' ? d.times : {};
    d.results = d.results && typeof d.results === 'object' ? d.results : {};
    d.completed = Array.isArray(d.completed) ? d.completed : [];
    if (!Number.isInteger(d.currentIndex)) d.currentIndex = 0;
    return d;
  }
  function meaningfulDraftIds(d){
    const ids = [];
    for (const [id,dr] of Object.entries(d?.drafts || {})) {
      if (dr && (String(dr.answer ?? '').trim() !== '' || dr.confidence || dr.hintUsed)) ids.push(id);
    }
    return ids.filter(id => !!bankById(id));
  }
  function currentToday(){
    try { return dayKey(); } catch (_) {
      const d = new Date();
      return d.toISOString().slice(0,10);
    }
  }

  const generatorMakeQueue = typeof makeQueue === 'function' ? makeQueue : null;

  function snapshotBundle(key, ids){
    state.daily = state.daily && typeof state.daily === 'object' ? state.daily : {};
    let d = ensureDailyShape(state.daily[key]);
    state.daily[key] = d;

    /* 과거 패치로 ids가 흔들렸는데 이미 답을 적은 문항이 현재 ids에서 빠져 있으면
       그 답안 문항을 우선 보존한다. */
    const answered = meaningfulDraftIds(d);
    let frozen = validIds(ids) ? [...ids] : [];
    if (answered.some(id => !frozen.includes(id))) {
      const target = Math.max(frozen.length, Number(state.settings?.dailyCount || 7));
      frozen = [...new Set([...answered, ...frozen])].filter(id => !!bankById(id)).slice(0,target);
      d.integrityRecoveredV28 = true;
    }

    d.ids = frozen;
    d.mode = d.mode || state.settings?.mode || 'normal';
    d.bundleFrozenV28 = true;
    d.bundleSchemaV28 = BUNDLE_SCHEMA;
    d.frozenAtV28 = d.frozenAtV28 || Date.now();

    if (!d.questionSnapshotV28 || typeof d.questionSnapshotV28 !== 'object') d.questionSnapshotV28 = {};
    frozen.forEach(id => {
      if (!d.questionSnapshotV28[id]) {
        const q = bankById(id);
        if (q) d.questionSnapshotV28[id] = cloneData(q);
      }
    });

    state.bundleLockV28 = {
      key,
      ids:[...frozen],
      startedAt: state.bundleLockV28?.key === key ? (state.bundleLockV28.startedAt || Date.now()) : Date.now(),
      schema:BUNDLE_SCHEMA
    };
    try { save(); } catch (_) {}
    return d;
  }

  function resolveBundleKey(){
    const today = currentToday();
    const lock = state.bundleLockV28;
    if (lock?.key && state.daily?.[lock.key]) {
      const d = ensureDailyShape(state.daily[lock.key]);
      state.daily[lock.key] = d;
      /* 미채점 묶음은 자정을 넘어도 그대로 유지.
         채점 완료 묶음은 같은 날에는 결과 열람용으로 유지하고, 다음 날 새 묶음으로 넘어간다. */
      if (!d.gradedAt || lock.key === today || window.__SAT100_HOLD_BUNDLE_KEY__ === lock.key) return lock.key;
      delete state.bundleLockV28;
      try { save(); } catch (_) {}
    }

    state.daily = state.daily && typeof state.daily === 'object' ? state.daily : {};
    let d = state.daily[today];
    if (d?.ids?.length && validIds(d.ids)) {
      snapshotBundle(today,d.ids);
      return today;
    }

    let ids = [];
    try { if (generatorMakeQueue) ids = generatorMakeQueue(false) || []; } catch (_) {}
    d = state.daily[today];
    if ((!ids || !ids.length) && d?.ids?.length) ids = d.ids;
    snapshotBundle(today,ids);
    return today;
  }

  function activeDaily(){
    const k = resolveBundleKey();
    let d = ensureDailyShape(state.daily[k]);
    state.daily[k] = d;
    if (!d.bundleFrozenV28 || !validIds(d.ids)) snapshotBundle(k,d.ids || []);
    if (d.ids.length) d.currentIndex = Math.max(0,Math.min(d.ids.length-1,d.currentIndex||0));
    return d;
  }

  /* 큐는 시작 후 절대 재선정하지 않는다. force=true도 진행 중 묶음에는 소급하지 않는다. */
  try {
    makeQueue = function(force=false){
      const key = resolveBundleKey();
      const d = ensureDailyShape(state.daily[key]);
      if (d.ids?.length && validIds(d.ids)) return [...d.ids];

      /* 실질적으로 빈 새 묶음에서만 원래 생성기를 허용한다. */
      let ids = [];
      try { if (generatorMakeQueue) ids = generatorMakeQueue(!!force) || []; } catch (_) {}
      return [...snapshotBundle(key,ids).ids];
    };
  } catch (_) {}

  try {
    queue = function(){
      const d = activeDaily();
      return (d.ids || []).map(id => {
        const snap = d.questionSnapshotV28?.[id];
        return snap ? cloneData(snap) : bankById(id);
      }).filter(Boolean);
    };
  } catch (_) {}

  try {
    dailyBundle = function(){
      makeQueue(false);
      return activeDaily();
    };
  } catch (_) {}

  /* 채점 직전 ID 무결성 검증. 불일치가 있으면 채점하지 않고 세트를 복구한다. */
  try {
    const rawGradeBundle = gradeBundle;
    gradeBundle = function(){
      const d = activeDaily();
      const qs = queue();
      const qids = qs.map(q=>q.id);
      const dids = [...(d.ids||[])];
      const same = qids.length===dids.length && qids.every((id,i)=>id===dids[i]);
      if (!same) {
        snapshotBundle(resolveBundleKey(),dids);
        alert('문제 묶음의 일치 여부를 다시 확인했습니다. 현재 화면의 문제 세트를 고정했으니 다시 한 번 채점을 눌러주세요.');
        try { renderStudy(); } catch (_) {}
        return;
      }
      window.__SAT100_HOLD_BUNDLE_KEY__ = resolveBundleKey();
      return rawGradeBundle();
    };
  } catch (_) {}

  /* ---------------- 필기 저장 무결성 ---------------- */
  try {
    const rawScratchPut = scratchPut;
    scratchPut = function(id,data){
      if (!id) return Promise.resolve();
      const snapshot = cloneData(data);
      const prev = pendingWrites.get(id) || Promise.resolve();
      const p = prev.catch(()=>{}).then(()=>rawScratchPut(id,snapshot));
      pendingWrites.set(id,p);
      p.finally(()=>{
        if (pendingWrites.get(id) === p) pendingWrites.delete(id);
      });
      return p;
    };
  } catch (_) {}

  window.__SAT100_SCRATCH_READY_QID__ = null;

  try {
    loadScratch = async function(qid){
      const token = ++loadToken;
      window.__SAT100_SCRATCH_READY_QID__ = null;

      /* 전 문제의 마지막 획을 먼저 확정·저장 */
      const prevId = currentQid;
      const prevData = currentScratch;
      try {
        if (drawing && currentStroke) {
          drawing = false;
          flushDraw();
          currentStroke = null;
          drawnUpTo = 0;
        }
      } catch (_) {}
      if (prevId && prevData) {
        try { await scratchPut(prevId,prevData); } catch (_) {}
      }

      currentQid = qid;
      currentScratch = blankScratch();
      scratchPage = 0;
      try { clearCanvasVisual(); } catch (_) {}

      if (!qid) {
        window.__SAT100_SCRATCH_READY_QID__ = null;
        return;
      }

      const pending = pendingWrites.get(qid);
      if (pending) {
        try { await pending; } catch (_) {}
      }

      let data = null;
      try { data = await scratchGet(qid); } catch (_) {}
      if (token !== loadToken || currentQid !== qid) return;

      currentScratch = ensureScratch(data);
      scratchPage = currentScratch.page || 0;
      const label = document.getElementById('scratchPageLabel');
      if (label) label.textContent = (scratchPage+1) + ' / 2';

      await new Promise(resolve=>requestAnimationFrame(resolve));
      if (token !== loadToken || currentQid !== qid) return;
      try { resizeCanvas(); } catch (_) {}
      window.__SAT100_SCRATCH_READY_QID__ = qid;
    };
  } catch (_) {}

  /* 필기가 아직 로딩 중이면 canvas까지 이벤트가 내려가기 전에 shell에서 차단 */
  try {
    const shell = document.getElementById('canvasShell');
    const canvas = document.getElementById('scratchCanvas');
    if (shell && canvas) {
      const blockUntilReady = e => {
        if (e.target !== canvas) return;
        const ready = window.__SAT100_SCRATCH_READY_QID__;
        if (!currentQid || ready !== currentQid) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      shell.addEventListener('pointerdown',blockUntilReady,{capture:true,passive:false});
      shell.addEventListener('touchstart',blockUntilReady,{capture:true,passive:false});
    }
  } catch (_) {}

  /* 앱이 숨겨지거나 페이지가 닫힐 때 현재 필기를 한 번 더 저장 */
  async function persistCurrentScratch(){
    try {
      if (currentQid && currentScratch) await scratchPut(currentQid,currentScratch);
    } catch (_) {}
  }
  document.addEventListener('visibilitychange',()=>{
    if (document.visibilityState === 'hidden') persistCurrentScratch();
  });
  window.addEventListener('pagehide',()=>{ persistCurrentScratch(); });

  try {
    const v=document.querySelector('.version');
    if(v){
      const count=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK.length:110;
      v.textContent='v2.8 '+count+'문항';
    }
    document.documentElement.dataset.bundleIntegrity='v2.8-frozen';
    document.documentElement.dataset.scratchIntegrity='v2.8-serialized';
  } catch (_) {}

  /* 현재 세트를 즉시 동결한다. 기존 답안이 있다면 그 문제들을 우선 보존한다. */
  try {
    const today=currentToday();
    if (state.daily?.[today]?.ids?.length) snapshotBundle(today,state.daily[today].ids);
    else resolveBundleKey();
    renderStudy();
  } catch (_) {}
})();