/* 수능핏 MATH v2.2 운영 패치
   목표
   - D-31까지: 14·15·21·22·28·30 중심의 4점 기출 핵심형 완전 정복
   - D-30(2026-10-20)부터: 기출 변형 중심 + 1단계 오답/불확실 문항 복습
   - CORE/EBS WATCH는 문제 선택 근거로 쓰되 출제확률처럼 표시하지 않음
*/
(() => {
  'use strict';
  if (window.__SAT100_V22__) return;
  window.__SAT100_V22__ = true;

  const PATCH_VERSION = '2.2-phase-mastery';
  const PHASE2_DATE = '2026-10-20';
  const FOCUS_SLOTS = ['14','15','21','22','28','30'];
  const SLOT_WEIGHT = {14:5,15:6,21:10,22:10,28:9,30:10};

  const rawPool = () => {
    try {
      if (typeof __prePhaseEligible === 'function') return __prePhaseEligible();
      if (Array.isArray(QB)) return QB.filter(q => !q.course || q.course === '공통' || q.course === state.settings.elective);
    } catch (_) {}
    return Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];
  };

  const isPhase2 = () => {
    try { return dayKey() >= PHASE2_DATE; } catch (_) { return false; }
  };
  const isFocus = q => !!q && FOCUS_SLOTS.includes(String(q.slot || ''));
  const isHard = q => !!q && q.tier !== 'secure';
  const attemptsOf = id => (state.attempts || []).filter(a => a.id === id);

  /* '맞았다'가 아니라 시험에서 다시 쓸 수 있는 상태를 정복으로 본다.
     - 정답
     - 확신(sure)
     - 힌트 미사용
     - 기준시간의 135% 이내(시간 기록이 없는 경우는 시간조건 제외)
  */
  function mastered(q) {
    if (!q) return false;
    return attemptsOf(q.id).some(a => {
      if (!a.correct || a.confidence !== 'sure' || a.hintUsed) return false;
      if (!q.expected || !a.sec) return true;
      return a.sec <= q.expected * 1.35;
    });
  }
  window.sat100Mastered = mastered;

  function wrongBefore(q) {
    return attemptsOf(q.id).some(a => !a.correct);
  }
  function due(q) {
    try { return dueIds().includes(q.id); } catch (_) { return false; }
  }
  function novelty(q) {
    const n = attemptsOf(q.id).length;
    return Math.max(0, 100 - n * 24);
  }
  function phaseScore(q) {
    let core = 70, current = 70, watch = 50, weak = 50, stage = 50;
    try {
      const c = typeof corePattern === 'function' ? corePattern(q.patternId) : null;
      if (c) { core = c.core ?? core; current = c.currentYear ?? current; watch = c.ebsWatch ?? watch; }
      else if (typeof pScore === 'function') core = pScore(q);
    } catch (_) {}
    try { if (typeof weakness === 'function') weak = weakness(q.skill); } catch (_) {}
    try { if (typeof stageFit === 'function') stage = stageFit(q); } catch (_) {}

    const dueV = due(q) ? 100 : 0;
    const wrongV = wrongBefore(q) ? 100 : 0;
    const masterPenalty = mastered(q) ? 26 : 0;
    const slotBoost = SLOT_WEIGHT[String(q.slot)] || 0;

    if (!isPhase2()) {
      // 1단계: 최근 평가원 신호와 기출 반복성을 최우선, EBS는 보조 감시
      return Math.round(
        0.34 * core + 0.22 * current + 0.12 * watch + 0.12 * weak +
        0.09 * dueV + 0.06 * wrongV + 0.05 * novelty(q) + slotBoost - masterPenalty
      );
    }
    // 2단계: 변형 적응 + 오답 회수. variant 자체에 가산하되 CORE를 왜곡하지 않는다.
    const variantBoost = q.variant ? 12 : 0;
    return Math.round(
      0.38 * core + 0.17 * watch + 0.12 * weak + 0.13 * dueV +
      0.10 * wrongV + 0.05 * stage + 0.05 * novelty(q) + variantBoost + slotBoost - masterPenalty
    );
  }

  /* 최종 L-score: 과거 버전의 여러 override를 이 한 함수로 끝낸다. */
  try { lscore = q => Math.max(0, Math.min(100, phaseScore(q))); } catch (_) {}

  /* 단계별 풀: 1단계는 쉬운 secure·변형 제외, 2단계는 변형 + 미정복/오답 기출. */
  try {
    eligibleQB = function() {
      const all = rawPool().filter(isFocus);
      if (!isPhase2()) {
        const hardBase = all.filter(q => !q.variant && isHard(q));
        return hardBase.length ? hardBase : all.filter(q => !q.variant);
      }
      const variants = all.filter(q => q.variant);
      const recoverBase = all.filter(q => !q.variant && isHard(q) && (!mastered(q) || wrongBefore(q) || due(q)));
      const map = new Map();
      [...variants, ...recoverBase].forEach(q => map.set(q.id, q));
      return [...map.values()].length ? [...map.values()] : all;
    };
  } catch (_) {}

  function ranked(pool) {
    return [...pool].sort((a,b) => {
      const am = mastered(a) ? 1 : 0, bm = mastered(b) ? 1 : 0;
      if (am !== bm) return am - bm;
      const d = phaseScore(b) - phaseScore(a);
      if (d) return d;
      return attemptsOf(a.id).length - attemptsOf(b.id).length;
    });
  }

  function rotateSlots() {
    let n = 0;
    try { n = Math.floor(new Date(dayKey() + 'T00:00:00').getTime()/86400000); } catch (_) {}
    const s = [...FOCUS_SLOTS];
    const r = ((n % s.length) + s.length) % s.length;
    return [...s.slice(r), ...s.slice(0,r)];
  }

  function buildPhase1Ids(count, pool) {
    const out = [], used = new Set();
    const slots = count >= 6 ? FOCUS_SLOTS : rotateSlots().slice(0, count);
    slots.forEach(slot => {
      const q = ranked(pool.filter(x => String(x.slot) === slot && !used.has(x.id)))[0];
      if (q) { out.push(q.id); used.add(q.id); }
    });
    ranked(pool.filter(q => !used.has(q.id))).forEach(q => {
      if (out.length < count) { out.push(q.id); used.add(q.id); }
    });
    return out.slice(0,count);
  }

  function buildPhase2Ids(count, pool) {
    const out = [], used = new Set();
    const variants = pool.filter(q => q.variant);
    const recovery = pool.filter(q => !q.variant && (wrongBefore(q) || due(q) || !mastered(q)));
    const variantTarget = Math.max(1, Math.min(count, count >= 7 ? 5 : Math.ceil(count*0.7)));

    // 변형은 자리 편중을 막기 위해 회전 슬롯에서 하나씩 먼저 뽑는다.
    rotateSlots().forEach(slot => {
      if (out.length >= variantTarget) return;
      const q = ranked(variants.filter(x => String(x.slot) === slot && !used.has(x.id)))[0];
      if (q) { out.push(q.id); used.add(q.id); }
    });
    ranked(variants.filter(q => !used.has(q.id))).forEach(q => {
      if (out.length < variantTarget) { out.push(q.id); used.add(q.id); }
    });
    ranked(recovery.filter(q => !used.has(q.id))).forEach(q => {
      if (out.length < count) { out.push(q.id); used.add(q.id); }
    });
    ranked(pool.filter(q => !used.has(q.id))).forEach(q => {
      if (out.length < count) { out.push(q.id); used.add(q.id); }
    });
    return out.slice(0,count);
  }

  try {
    const previousMakeQueue = makeQueue;
    makeQueue = function(force=false) {
      try { previousMakeQueue(force); } catch (_) {}
      const k = dayKey();
      const d = state.daily?.[k];
      if (!d || d.gradedAt) return d?.ids || [];
      const count = state.settings.mode === 'minimum' ? 3 : Number(state.settings.dailyCount || 7);
      const pool = eligibleQB();
      const ids = isPhase2() ? buildPhase2Ids(count,pool) : buildPhase1Ids(count,pool);
      if (ids.length) d.ids = ids;
      save();
      return d.ids || ids;
    };
  } catch (_) {}

  /* 정복 현황도 '확신·무힌트·시간' 기준으로 계산 */
  try {
    slotProgress = function(slot) {
      const all = rawPool().filter(q => String(q.slot) === String(slot) && isHard(q));
      const qs = isPhase2() ? all.filter(q => q.variant) : all.filter(q => !q.variant);
      return {total:qs.length, done:qs.filter(mastered).length};
    };
  } catch (_) {}

  try {
    renderPhaseBanner = function() {
      const el = $('phaseBanner'); if (!el) return;
      const phase2 = isPhase2();
      const dday = typeof daysTo === 'function' ? daysTo('2026-11-19') : '';
      const toSwitch = typeof daysTo === 'function' ? daysTo(PHASE2_DATE) : '';
      const tot = FOCUS_SLOTS.reduce((s,n) => { const p=slotProgress(n); return {d:s.d+p.done,t:s.t+p.total}; }, {d:0,t:0});
      const chips = FOCUS_SLOTS.map(n => { const p=slotProgress(n); return `<span class="phase-chip">${n}번 ${p.done}/${p.total}</span>`; }).join('');
      el.className = 'phase-banner' + (phase2 ? ' p2' : '');
      el.innerHTML = !phase2
        ? `<div><b>1단계 · 4점 기출 핵심 완전정복</b> — 수능 D-${dday}. 14·15·21·22·28·30번의 최근 수능·평가원 사고구조와 EBS 핵심 신호를 먼저 익힙니다. 쉬운 secure 문항은 오늘 세트에서 제외합니다.${toSwitch>0?` <b>D-30 전환까지 ${toSwitch}일</b>.`:''}<div style="margin-top:7px">${chips}</div><div style="margin-top:6px;font-weight:700">정복 기준: 정답 + 확신 + 무힌트 + 기준시간 135% 이내 · ${tot.d}/${tot.t}</div></div>`
        : `<div><b>2단계 · 기출 변형 실전</b> — 수능 D-${dday}. 최근 기출 DNA를 비튼 변형을 중심으로 풀고, 1단계에서 틀렸거나 불확실했던 문제를 함께 회수합니다.<div style="margin-top:7px">${chips}</div><div style="margin-top:6px;font-weight:700">변형 정복 ${tot.d}/${tot.t} · 기본 7문제 중 변형 약 5문제</div></div>`;
    };
  } catch (_) {}

  function currentQ() {
    try { const qs=queue(); return qs?.[idx] || null; } catch (_) { return null; }
  }
  function patchQuestionTag() {
    const q = currentQ();
    const tags = document.querySelector('.q-tags');
    if (!q || !tags || tags.querySelector('[data-v22-lane]')) return;
    const s = document.createElement('span');
    s.className = 'tag'; s.dataset.v22Lane='1';
    s.textContent = q.variant ? '기출 변형' : '4점 기출 핵심형';
    tags.prepend(s);
  }

  function patchStaticUI() {
    document.title = `수능핏 MATH v2.2 ${Array.isArray(QB)?QB.length:104}문항 · 4점 기출→변형`;
    const v = document.querySelector('.version');
    if (v) v.textContent = `v2.2 ${Array.isArray(QB)?QB.length:104}문항`;
    const sub = document.querySelector('.brand-sub');
    if (sub) sub.textContent = 'D-31까지 4점 기출 핵심 × D-30부터 기출 변형 × CORE/EBS WATCH';
    document.querySelectorAll('.quality-note').forEach(el => {
      if (el.textContent.includes('문제 구성')) {
        el.innerHTML = `<b>문제 구성</b><br>현재 ${Array.isArray(QB)?QB.length:104}문항. 1단계는 14·15·21·22·28·30번 4점 기출 핵심형, D-30부터는 기출 변형 중심으로 운영합니다. 정답·조건 검산 문항만 사용합니다.`;
      }
    });
  }

  try {
    const prevRenderStudy = renderStudy;
    renderStudy = function() { prevRenderStudy(); patchQuestionTag(); renderPhaseBanner(); };
  } catch (_) {}
  try {
    const prevRenderSettings = renderSettings;
    renderSettings = function() { prevRenderSettings(); patchStaticUI(); };
  } catch (_) {}

  /* 패치 최초 적용 시: 아직 오늘 문제를 풀지 않았다면 새 편성으로 즉시 교체.
     이미 답/표시/채점이 있으면 오늘 세트는 보존한다. */
  try {
    const k = dayKey();
    const d = state.daily?.[k];
    const drafts = Object.values(d?.drafts || {});
    const hasWork = !!d?.gradedAt || (d?.marked || []).length > 0 || drafts.some(x => x && (x.answer || x.confidence || x.hintUsed));
    if (state.phaseSystemVersion !== PATCH_VERSION) {
      state.phaseSystemVersion = PATCH_VERSION;
      if (d && !hasWork) { delete state.daily[k]; }
      save();
      makeQueue(true);
    }
  } catch (_) {}

  patchStaticUI();
  try { renderPhaseBanner(); } catch (_) {}
  try { renderStudy(); } catch (_) {}
})();
