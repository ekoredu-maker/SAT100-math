/* 수능핏 MATH v2.5.1 사고-행동 연결 피드백
   목적: 해설 전에 학생이 '내가 방금 무엇을 했고, 그것이 어떤 사고였는지' 연결한다.
   정답 칭찬보다 행동의 의미와 재사용 조건을 언어화한다.
*/
(() => {
  'use strict';
  if (window.__SAT100_INSIGHT_V251__) return;
  window.__SAT100_INSIGHT_V251__ = true;

  const META = {
    P01: {
      thought:'조건을 계산값이 아니라 그래프의 모양과 가능한 경우를 제한하는 정보로 바꾸는 사고',
      trigger:'극한·연속·미분가능성과 함수 조건이 함께 나오면',
      actions:[
        ['graph','조건을 그래프 모양으로 바꿔 보았다'],
        ['root','근·중근·접점 같은 구조로 바꿔 보았다'],
        ['eliminate','가능한 그래프를 하나씩 지워 보았다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P02: {
      thought:'항을 전부 계산하지 않고 규칙의 분기와 반복을 찾아 가능한 경우를 줄이는 사고',
      trigger:'귀납적으로 정의된 수열에서 조건이 여러 갈래를 만들면',
      actions:[
        ['branch','규칙이 갈라지는 지점을 먼저 찾았다'],
        ['backward','뒤 조건에서 앞 항을 거꾸로 추적했다'],
        ['pattern','몇 항을 써 보고 반복 규칙을 찾았다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P03: {
      thought:'식을 계산 대상으로만 보지 않고 그래프의 이동·대칭·역함수 관계로 번역하는 사고',
      trigger:'지수·로그 함수와 좌표·교점·역함수 조건이 함께 나오면',
      actions:[
        ['translate','식을 그래프 관계로 번역했다'],
        ['symmetry','대칭·역함수 관계를 먼저 사용했다'],
        ['move','평행이동된 기준점을 찾아 비교했다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P04: {
      thought:'공식을 바로 적용하기 전에 변수 사이의 관계를 만들고 그 관계 자체를 미분하는 사고',
      trigger:'두 양이 함께 변하거나 관계가 간접적으로 주어지면',
      actions:[
        ['relation','먼저 변수 사이 관계식을 세웠다'],
        ['differentiate','관계식을 통째로 미분했다'],
        ['variable','어떤 변수를 기준으로 볼지 정했다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P05: {
      thought:'적분 계산보다 도함수의 영점과 부호 변화로 원함수의 그래프와 극값을 읽는 사고',
      trigger:'정적분으로 정의된 함수와 극값·증감 조건이 함께 나오면',
      actions:[
        ['derivative','적분식을 먼저 미분해 구조를 단순화했다'],
        ['sign','도함수의 부호 변화를 먼저 보았다'],
        ['extreme','극값 조건으로 미지수를 결정했다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P06: {
      thought:'직접 계산하기 어려운 정보를 역함수의 대칭과 정적분 관계를 이용해 다른 문제로 바꾸는 사고',
      trigger:'역함수·교점·넓이·정적분이 함께 나오면',
      actions:[
        ['symmetry','y=x 대칭 관계로 바꿔 보았다'],
        ['integral','두 적분의 관계를 이용해 계산을 줄였다'],
        ['intersection','교점 조건을 함수값 관계로 바꿨다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P07: {
      thought:'접선이라는 기하적 조건을 연립식의 중근이라는 대수 구조로 바꾸는 사고',
      trigger:'접선·교점·넓이가 한 문제에 함께 나오면',
      actions:[
        ['double','접점을 중근 조건으로 바꿨다'],
        ['otherroot','중근 구조에서 다른 교점을 찾았다'],
        ['area','교점 구조를 넓이 계산까지 연결했다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P08: {
      thought:'숫자를 바로 대입하지 않고 도형에서 어떤 관계식이 핵심 정보를 고정하는지 선택하는 사고',
      trigger:'삼각형의 길이·각 조건이 여러 개 주어지면',
      actions:[
        ['law','사인·코사인법칙 중 무엇이 필요한지 먼저 골랐다'],
        ['relation','길이와 각의 관계를 식으로 정리했다'],
        ['geometry','도형의 숨은 동일각·원 조건을 먼저 찾았다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    },
    P09: {
      thought:'급수를 계산하기 전에 수렴 조건이 공비와 가능한 경우를 얼마나 제한하는지 이용하는 사고',
      trigger:'수열·급수와 매개변수 또는 절댓값 조건이 함께 나오면',
      actions:[
        ['converge','수렴 조건부터 적용해 범위를 줄였다'],
        ['ratio','공비의 가능한 값을 먼저 정리했다'],
        ['cases','남은 경우를 분기해 하나씩 제거했다'],
        ['unknown','결정적인 행동이 아직 잘 안 보였다']
      ]
    }
  };

  function currentQ(){
    try { const qs=queue(); return qs?.[idx] || null; } catch (_) { return null; }
  }
  function daily(){
    try { return dailyBundle(); } catch (_) { return null; }
  }
  function attemptFor(q,result){
    try{
      if(result?.ts){
        const a=(state.attempts||[]).find(x=>x.ts===result.ts);
        if(a)return a;
      }
      return [...(state.attempts||[])].reverse().find(x=>x.id===q.id && x.date===dayKey())||null;
    }catch(_){return null;}
  }
  function performance(q,result,a){
    const ok=!!result?.correct;
    const conf=a?.confidence||'none';
    const hint=!!a?.hintUsed;
    const sec=Number(result?.sec||a?.sec||0);
    const expected=Number(q.expected||0);
    const slow=expected>0 && sec>expected*1.35;

    if(ok && conf==='sure' && !hint && !slow)
      return '풀이가 맞았다는 사실보다, 이 사고를 스스로 꺼내 적정 시간 안에 사용했다는 점이 중요합니다.';
    if(ok && hint)
      return '정답은 도달했습니다. 다음 복습에서는 힌트가 대신해 준 첫 연결을 스스로 꺼내는 것이 학습 목표입니다.';
    if(ok && conf!=='sure')
      return '정답은 맞았지만 아직 자동화되지는 않았습니다. 방금 한 핵심 행동을 한 문장으로 말할 수 있으면 재현성이 높아집니다.';
    if(ok && slow)
      return '풀이 방향은 맞았습니다. 다음에는 계산을 서두르기보다 핵심 구조를 알아차리는 시점을 앞당기는 것이 시간 단축의 핵심입니다.';
    if(!ok && conf==='sure')
      return '확신했는데 틀렸다면 계산 실수만 찾지 마세요. 조건을 어떤 구조로 번역했는지, 경우를 너무 일찍 하나로 정하지 않았는지 먼저 점검합니다.';
    if(!ok && conf==='maybe')
      return '방향은 어느 정도 잡았지만 조건 연결이 끝까지 닫히지 않았습니다. 어느 조건이 마지막 경우를 제거했어야 하는지 확인하면 됩니다.';
    return '막힌 지점은 실패가 아니라 사고의 입구입니다. 이 문제에서 처음 해야 했던 행동이 무엇이었는지를 찾는 것이 이번 풀이의 의미입니다.';
  }
  function lineage(q){
    try{
      if(typeof window.sat100LineageForQuestion!=='function')return '';
      const x=(window.sat100LineageForQuestion(q)||[])[0];
      return x ? `이 사고는 ${x.exam} ${x.slot}번의 ‘${x.dna}’와 같은 계보에 있습니다.` : '';
    }catch(_){return '';}
  }
  function style(){
    if(document.getElementById('sat100InsightV251Style'))return;
    const s=document.createElement('style');
    s.id='sat100InsightV251Style';
    s.textContent=`
      .insight-v251{margin-top:10px;padding:14px;border:1px solid #d8e0f5;background:#f8f9ff;border-radius:14px;color:#394359;line-height:1.62}
      .insight-v251 .kicker{font-size:10px;font-weight:950;color:#3159d9;letter-spacing:.04em}
      .insight-v251 .question{font-size:13px;font-weight:900;color:#26334d;margin:5px 0 9px}
      .insight-v251 .action-grid{display:grid;gap:6px}
      .insight-v251 .action{border:1px solid #dfe4ee;background:#fff;border-radius:10px;padding:9px 10px;text-align:left;font-size:11px;font-weight:800;color:#46516a}
      .insight-v251 .action.selected{border-color:#7f96e8;background:#eef2ff;color:#3159d9}
      .insight-v251 .bridge{margin-top:10px;padding:10px 11px;background:#fff;border:1px solid #e2e6ef;border-radius:10px;font-size:11px}
      .insight-v251 .bridge b{color:#26334d}
      .insight-v251 .why{margin-top:8px;font-size:11px;color:#59657a}
      .insight-v251 .reuse{margin-top:8px;padding-top:8px;border-top:1px dashed #d9dfeb;font-size:11px;color:#46516a}
      .insight-v251 .lineage{margin-top:7px;font-size:10px;color:#727b8c}
      .insight-v251 .reveal{width:100%;min-height:42px;margin-top:10px;border:1px solid #3159d9;border-radius:10px;background:#3159d9;color:#fff;font-weight:900}
      .result-box .solution.insight-hidden{display:none!important}
    `;
    document.head.appendChild(s);
  }
  function selectedAction(meta,key){
    return meta.actions.find(x=>x[0]===key)?.[1]||'아직 결정적인 행동을 고르지 않았다';
  }
  function saveChoice(q,result,key){
    const d=daily();
    if(!d)return;
    d.insightChoices=d.insightChoices&&typeof d.insightChoices==='object'?d.insightChoices:{};
    d.insightChoices[q.id]=key;
    const a=attemptFor(q,result);
    if(a)a.insightChoice=key;
    try{save();}catch(_){}
  }
  function renderBridge(card,q,result,meta,key){
    const target=card.querySelector('[data-bridge-v251]');
    if(!target)return;
    if(!key){
      target.innerHTML='<b>왜 이걸 고르는가?</b><br>해설을 읽기 전에 방금 한 행동을 스스로 이름 붙이면, 풀이가 한 번의 경험이 아니라 다음 문제에서 다시 꺼낼 수 있는 사고 도구가 됩니다.';
      return;
    }
    if(key==='unknown'){
      target.innerHTML=`<b>이번 풀이의 의미</b><br>아직 결정적 행동이 보이지 않는다는 사실 자체가 중요한 정보입니다. 해설에서는 정답 계산보다 <b>“첫 번째 사고 전환이 어디에서 일어나는가”</b>만 찾으세요.<div class="reuse"><b>다음에 다시 쓰는 순간</b><br>${safeMath(meta.trigger)}, 첫 계산보다 먼저 구조를 한 문장으로 바꿔 봅니다.</div>`;
      return;
    }
    const act=selectedAction(meta,key);
    target.innerHTML=`
      <b>네가 한 행동</b><br>${safeMath(act)}
      <div class="why"><b>사고로 바꾸면</b><br>그 행동은 ${safeMath(meta.thought)}입니다. 즉, 방금 한 계산의 의미는 답을 만드는 데만 있지 않고 문제를 더 단순한 구조로 바꾸는 데 있었습니다.</div>
      <div class="reuse"><b>다음에 다시 쓰는 순간</b><br>${safeMath(meta.trigger)}, 방금 선택한 행동을 첫 후보로 꺼내면 됩니다.</div>
    `;
  }
  function decorate(){
    style();
    const q=currentQ(),d=daily();
    if(!q||!d?.gradedAt)return;
    const result=d.results?.[q.id];
    const box=document.querySelector('.result-box');
    const solution=box?.querySelector('.solution');
    if(!box||!solution||box.querySelector('[data-insight-v251]'))return;

    const meta=META[q.patternId]||{
      thought:`${q.skill||'핵심 개념'}을 조건 해석과 구조 연결로 바꾸는 사고`,
      trigger:'비슷한 조건이 다시 나오면',
      actions:[['structure','조건을 구조로 바꿔 보았다'],['unknown','결정적인 행동이 아직 잘 안 보였다']]
    };
    d.solutionRevealed=d.solutionRevealed&&typeof d.solutionRevealed==='object'?d.solutionRevealed:{};
    d.insightChoices=d.insightChoices&&typeof d.insightChoices==='object'?d.insightChoices:{};
    const revealed=!!d.solutionRevealed[q.id];
    const chosen=d.insightChoices[q.id]||'';
    solution.classList.toggle('insight-hidden',!revealed);

    const a=attemptFor(q,result);
    const card=document.createElement('div');
    card.className='insight-v251';
    card.dataset.insightV251='1';
    card.innerHTML=`
      <div class="kicker">풀이를 사고로 바꾸는 10초</div>
      <div class="question">방금 이 문제에서 네가 한 가장 결정적인 행동은 무엇이었나?</div>
      <div class="action-grid">
        ${meta.actions.map(([k,label])=>`<button type="button" class="action ${chosen===k?'selected':''}" data-insight-choice="${k}">${safeMath(label)}</button>`).join('')}
      </div>
      <div class="bridge" data-bridge-v251></div>
      <div class="why">${safeMath(performance(q,result,a))}</div>
      ${lineage(q)?`<div class="lineage">${safeMath(lineage(q))}</div>`:''}
      <button type="button" class="reveal" data-reveal-v251>${revealed?'해설 접기':'이제 해설에서 연결 확인하기'}</button>
    `;
    solution.before(card);
    renderBridge(card,q,result,meta,chosen);

    card.querySelectorAll('[data-insight-choice]').forEach(btn=>btn.onclick=()=>{
      const key=btn.dataset.insightChoice;
      card.querySelectorAll('[data-insight-choice]').forEach(x=>x.classList.toggle('selected',x===btn));
      saveChoice(q,result,key);
      renderBridge(card,q,result,meta,key);
    });
    const reveal=card.querySelector('[data-reveal-v251]');
    reveal.onclick=()=>{
      const open=solution.classList.contains('insight-hidden');
      solution.classList.toggle('insight-hidden',!open);
      d.solutionRevealed[q.id]=open;
      try{save();}catch(_){}
      reveal.textContent=open?'해설 접기':'이제 해설에서 연결 확인하기';
      if(open)solution.scrollIntoView({behavior:'smooth',block:'nearest'});
    };

    const stage=document.getElementById('stageLabel');
    if(stage&&!revealed)stage.textContent=result?.correct?'채점 완료 · 풀이→사고 연결':'채점 완료 · 오답→사고 연결';
  }

  try{
    const prev=renderStudy;
    renderStudy=function(){prev();decorate();};
  }catch(_){}
  try{
    const v=document.querySelector('.version');
    if(v){
      const count=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK.length:104;
      v.textContent=`v2.5.1 ${count}문항`;
    }
  }catch(_){}
  try{decorate();}catch(_){}
})();