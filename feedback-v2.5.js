/* 수능핏 MATH v2.5 사고 관통 피드백
   채점 직후 정답/오답 다음에 '무엇을 관통했는가'를 먼저 언어로 제시하고,
   해설은 학생이 직접 '해설 보기'를 눌러야 공개한다.
*/
(() => {
  'use strict';
  if (window.__SAT100_INSIGHT_V25__) return;
  window.__SAT100_INSIGHT_V25__ = true;

  const INSIGHT = {
    P01: '식 자체를 계산하는 문제가 아니라, 극한·연속·미분가능성 같은 조건이 함수의 근과 그래프 모양을 강제한다는 점을 관통하는 문제입니다.',
    P02: '항을 순서대로 계산하기보다, 귀납 규칙의 분기와 반복 구조를 읽고 가능한 경우를 역으로 좁히는 사고를 관통하는 문제입니다.',
    P03: '지수·로그 식을 계산식으로만 보지 않고, 그래프의 이동·대칭·역함수 관계로 번역하는 사고를 관통하는 문제입니다.',
    P04: '미분 공식을 먼저 쓰는 것이 아니라, 변수 사이의 관계를 만들거나 읽은 뒤 그 관계 자체를 미분하는 사고를 관통하는 문제입니다.',
    P05: '적분값 계산보다 먼저, 정적분으로 정의된 함수의 도함수와 부호 변화에서 그래프·극값 구조를 읽는 사고를 관통하는 문제입니다.',
    P06: '역함수의 대칭 관계를 이용해 직접 구하기 어려운 교점·정적분 정보를 다른 관점으로 바꾸는 사고를 관통하는 문제입니다.',
    P07: '접선 조건을 접점에서의 중근으로 번역하고, 그 구조를 다른 교점과 넓이까지 연결하는 사고를 관통하는 문제입니다.',
    P08: '도형의 숫자를 바로 계산하기보다 사인·코사인법칙이 어떤 길이·각의 관계를 고정하는지 먼저 읽는 사고를 관통하는 문제입니다.',
    P09: '수렴 조건이 공비와 항의 범위를 어떻게 강제하는지 읽고, 불가능한 경우를 제거하는 사고를 관통하는 문제입니다.'
  };

  const FIRST_LOOK = {
    P01: '숫자보다 먼저 “이 조건이 그래프 모양을 어떻게 제한하지?”를 보세요.',
    P02: '처음 몇 항보다 “어디에서 분기되고, 무엇이 반복되지?”를 먼저 보세요.',
    P03: '계산 전에 그래프 이동·대칭·역함수 관계를 한 문장으로 번역해 보세요.',
    P04: '미분하기 전에 “변수 사이 관계식이 무엇이지?”를 먼저 세우세요.',
    P05: '적분하기 전에 F′(x)의 부호와 영점이 그래프에 무엇을 만드는지 보세요.',
    P06: '직접 계산하기 전에 역함수의 y=x 대칭으로 바꿀 수 있는 정보를 찾으세요.',
    P07: '접선이라는 말을 보면 연립식에서 중근이 생긴다는 사실부터 떠올리세요.',
    P08: '주어진 길이를 바로 대입하지 말고 어떤 법칙이 관계를 고정하는지 먼저 선택하세요.',
    P09: '급수를 합하기 전에 수렴 자체가 공비와 경우를 얼마나 지우는지 먼저 보세요.'
  };

  function currentQ(){
    try { const qs = queue(); return qs?.[idx] || null; } catch (_) { return null; }
  }
  function currentDaily(){
    try { return dailyBundle(); } catch (_) { return null; }
  }
  function attemptFor(q, result){
    try {
      if (result?.ts) {
        const exact = (state.attempts || []).find(a => a.ts === result.ts);
        if (exact) return exact;
      }
      return [...(state.attempts || [])].reverse().find(a => a.id === q.id && a.date === dayKey()) || null;
    } catch (_) { return null; }
  }
  function performanceSentence(q, result, a){
    const correct = !!result?.correct;
    const conf = a?.confidence || 'none';
    const hint = !!a?.hintUsed;
    const sec = Number(result?.sec || a?.sec || 0);
    const expected = Number(q.expected || 0);
    const slow = expected > 0 && sec > expected * 1.35;

    if (correct && conf === 'sure' && !hint && !slow) {
      return '정답뿐 아니라 핵심 구조를 스스로 찾아 적정 시간 안에 밀어냈습니다. 이 문제는 ‘정복’에 가까운 풀이입니다.';
    }
    if (correct && hint) {
      return '정답까지 도달했지만 힌트가 첫 연결을 대신해 주었습니다. 다음 복습에서는 같은 구조를 힌트 없이 먼저 꺼내는 것이 목표입니다.';
    }
    if (correct && conf !== 'sure') {
      return '정답은 맞았지만 풀이 확신이 아직 충분하지 않습니다. 핵심 연결을 자기 말로 설명할 수 있으면 실제 시험에서 훨씬 안정적입니다.';
    }
    if (correct && slow) {
      return '구조는 찾았습니다. 다만 시간이 길었다면 계산을 줄이기보다 핵심 구조를 알아차리는 시점을 더 앞당기는 연습이 필요합니다.';
    }
    if (!correct && conf === 'sure') {
      return '확신했는데 틀렸다면 계산 실수만 의심하지 마세요. 조건을 잘못 번역했거나, 가능한 경우를 너무 일찍 하나로 정했을 가능성을 먼저 점검해야 합니다.';
    }
    if (!correct && conf === 'maybe') {
      return '핵심 구조의 방향은 감지했지만 조건 연결이 끝까지 닫히지 않았습니다. 해설에서는 “어느 조건이 마지막 경우를 지우는가”를 확인하세요.';
    }
    if (!correct && conf === 'none') {
      return '이번 문제에서는 정답보다 첫 관문을 잡는 것이 중요합니다. 해설을 보기 전에 “이 조건을 그래프·관계식·분기 중 무엇으로 번역해야 했나”를 한 번 생각해 보세요.';
    }
    return correct
      ? '정답에 도달했습니다. 이제 같은 풀이를 숫자가 달라져도 재현할 수 있는지 핵심 구조를 한 문장으로 정리해 보세요.'
      : '오답 자체보다 어떤 구조를 놓쳤는지가 중요합니다. 해설을 보기 전에 첫 번째로 놓친 연결을 짚어 보세요.';
  }
  function lineageSentence(q){
    try {
      if (typeof window.sat100LineageForQuestion !== 'function') return '';
      const ls = window.sat100LineageForQuestion(q) || [];
      if (!ls.length) return '';
      const x = ls[0];
      return `이 사고는 ${x.exam} ${x.slot}번에서 확인된 ‘${x.dna}’ 계보와 이어집니다.`;
    } catch (_) { return ''; }
  }
  function conditionSentence(q){
    if (!q.conditionUse) return '';
    return '여러 조건을 하나씩 소비하는 것이 아니라, 서로 같은 구조를 가리키도록 결합하는 연습도 함께 한 문제입니다.';
  }
  function ensureStyle(){
    if (document.getElementById('sat100InsightV25Style')) return;
    const st = document.createElement('style');
    st.id = 'sat100InsightV25Style';
    st.textContent = `
      .insight-v25{margin-top:10px;padding:13px 14px;border:1px solid #d8e0f5;background:#f7f9ff;border-radius:13px;color:#394359;line-height:1.65}
      .insight-v25 .kicker{font-size:10px;font-weight:950;letter-spacing:.04em;color:#3159d9;margin-bottom:5px}
      .insight-v25 .core{font-size:13px;font-weight:900;color:#26334d}
      .insight-v25 .meta{margin-top:7px;font-size:11px;color:#59657a}
      .insight-v25 .transfer{margin-top:7px;padding-top:7px;border-top:1px dashed #d9dfeb;font-size:11px;color:#46516a}
      .insight-v25 .lineage{margin-top:6px;font-size:10px;color:#6a7385}
      .insight-v25 .reveal-btn{margin-top:10px;width:100%;min-height:42px;border:1px solid #3159d9;border-radius:10px;background:#3159d9;color:white;font-weight:900}
      .result-box .solution.insight-hidden{display:none!important}
    `;
    document.head.appendChild(st);
  }
  function decorateInsight(){
    ensureStyle();
    const q = currentQ(), d = currentDaily();
    if (!q || !d?.gradedAt) return;
    const result = d.results?.[q.id];
    const box = document.querySelector('.result-box');
    const solution = box?.querySelector('.solution');
    if (!box || !solution || box.querySelector('[data-insight-v25]')) return;

    d.solutionRevealed = d.solutionRevealed && typeof d.solutionRevealed === 'object' ? d.solutionRevealed : {};
    const revealed = !!d.solutionRevealed[q.id];
    solution.classList.toggle('insight-hidden', !revealed);

    const a = attemptFor(q, result);
    const insight = INSIGHT[q.patternId] || `이번 문제는 ${q.skill || '핵심 개념'}을 계산 기술보다 조건 해석과 구조 연결로 다루는 연습입니다.`;
    const perf = performanceSentence(q, result, a);
    const first = FIRST_LOOK[q.patternId] || '다음에는 숫자보다 조건 사이의 관계를 먼저 읽어 보세요.';
    const lineage = lineageSentence(q);
    const cond = conditionSentence(q);

    const card = document.createElement('div');
    card.className = 'insight-v25';
    card.dataset.insightV25 = '1';
    card.innerHTML = `
      <div class="kicker">이번 문제에서 관통한 것</div>
      <div class="core">${safeMath(insight)}</div>
      <div class="meta">${safeMath(perf)}${cond ? `<br>${safeMath(cond)}` : ''}</div>
      <div class="transfer"><b>다음 문제에서 먼저 볼 것</b><br>${safeMath(first)}</div>
      ${lineage ? `<div class="lineage">${safeMath(lineage)}</div>` : ''}
      <button type="button" class="reveal-btn" data-reveal-solution-v25>${revealed ? '해설 접기' : '이제 해설 보기'}</button>
    `;
    solution.before(card);

    const btn = card.querySelector('[data-reveal-solution-v25]');
    btn.onclick = () => {
      const now = solution.classList.contains('insight-hidden');
      solution.classList.toggle('insight-hidden', !now);
      d.solutionRevealed[q.id] = now;
      try { save(); } catch (_) {}
      btn.textContent = now ? '해설 접기' : '이제 해설 보기';
      if (now) solution.scrollIntoView({behavior:'smooth', block:'nearest'});
    };

    try {
      const label = document.getElementById('stageLabel');
      if (label && !revealed) label.textContent = result?.correct ? '채점 완료 · 사고 피드백' : '채점 완료 · 오답 사고 피드백';
    } catch (_) {}
  }

  try {
    const prevRenderStudy = renderStudy;
    renderStudy = function(){
      prevRenderStudy();
      decorateInsight();
    };
  } catch (_) {}

  try {
    const version = document.querySelector('.version');
    if (version) {
      const count = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK.length : 104;
      version.textContent = `v2.5 ${count}문항`;
    }
  } catch (_) {}

  try { decorateInsight(); } catch (_) {}
})();