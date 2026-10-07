/* 수능핏 MATH v2.7 대학별 수리논술 + 난도 미세상향 */
(()=>{
'use strict';
if(window.__SAT100_ESSAY_V27__)return;
window.__SAT100_ESSAY_V27__=true;
const BANK={"KU":{"name":"고려대(서울)","badge":"80분 · 수학Ⅰ·Ⅱ·미적분·확통·기하","trend":"최근 5년 창을 그대로 보면 서울캠퍼스는 논술 본시험이 연속 5년 존재하지 않는다. 2023·2024 모의논술을 설계 원형으로, 2025·2026 본시험·선행학습영향평가를 실제 출제 축으로 보고 2027 현행 전 범위와 연결한다. 핵심은 한 문항 안에서 앞 소문항의 결과를 뒤에서 재사용하는 연결, 여러 단원의 표현을 오가는 종합 추론이다.","note":"없는 연도의 본시험을 기출처럼 만들지 않는다. 5년 창의 자료 존재 여부 자체를 분석에 포함한다.","sources":[["2023 모의논술","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=84&BOARD_SEQ=2&CONTENTS_NO=1&MENU_ID=720&SITE_NO=2"],["2024 모의논술","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=86&BOARD_SEQ=2&MENU_ID=720&SITE_NO=2"],["2025 영향평가","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=87&BOARD_SEQ=2&MENU_ID=720&SITE_NO=2"],["2026 영향평가","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=88&BOARD_SEQ=2&MENU_ID=720&SITE_NO=2"],["2027 모집요강","https://oku.korea.ac.kr/attach/202605/1780023076409_0.pdf"]],"problems":[{"title":"예상 1 · 함수-교점-정적분 연결","time":"20분","prompt":"함수 f(x)=x³-3x와 실수 t에 대하여 직선 ℓ_t:y=tx를 생각하자.\n\n(1) y=f(x)와 ℓ_t가 서로 다른 세 점에서 만나기 위한 t의 범위를 구하여라.\n(2) 세 교점 사이에서 두 그래프로 둘러싸인 두 부분의 넓이의 합을 A(t)라 할 때 A(t)를 t로 나타내어라.\n(3) A(t)=8일 때 t의 값을 구하고, (2)의 결과를 이용한 이유를 서술하여라.","guide":"f(x)-tx=x{x²-(t+3)}로 두어 교점 구조를 먼저 읽는다. t>-3에서 비영 교점은 ±√(t+3)이고 대칭성을 이용하면 한쪽만 적분하면 된다. A(t)=(t+3)²/2, 따라서 t=1.","why":"교점의 구조 → 대칭 → 정적분 → 매개변수 결정이 한 대문항 안에서 이어지는 연결형."},{"title":"예상 2 · 벡터와 최적화","time":"17분","prompt":"삼각형 ABC에서 |AB|=|AC|=2이고 ∠BAC=60°이다. 점 P가 선분 BC를 B에서 C까지 움직인다.\n\n(1) BP:PC=t:(1-t) (0≤t≤1)로 놓고 벡터 AP를 AB, AC로 나타내어라.\n(2) |AP|²+|PB|²을 t의 식으로 나타내어라.\n(3) 이 값의 최솟값과 그때의 BP:PC를 구하여라.","guide":"AP=(1-t)AB+tAC, AB·AC=2를 사용한다. |AP|²=4t²-4t+4, |PB|²=4t²이므로 합은 8t²-4t+4. t=1/4에서 최소 7/2, BP:PC=1:3.","why":"기하 조건을 벡터 내적의 이차식으로 바꾸고 최적화하는 종합형."},{"title":"예상 3 · 조건부확률과 정보 갱신","time":"18분","prompt":"어떤 질환의 유병률은 1/10이다. 검사 T는 질환이 있는 사람에게 양성일 확률이 4/5이고, 질환이 없는 사람에게 양성일 확률이 1/10이다. 같은 사람에게 조건부로 독립인 두 번의 검사를 시행한다.\n\n(1) 두 검사 중 정확히 한 번만 양성일 확률을 구하여라.\n(2) 정확히 한 번만 양성이었다는 조건 아래 실제 질환이 있을 확률을 구하여라.\n(3) 두 번 모두 양성일 때의 사후확률과 (2)의 값을 비교하고 그 이유를 설명하여라.","guide":"질환 D와 비질환 N으로 나누어 전확률을 먼저 계산한다. 정확히 한 번 양성일 때 P(E|D)=8/25, P(E|N)=9/50이므로 P(D|E)=16/97. 두 번 모두 양성이면 64/73.","why":"사건 정의 → 전확률 → 베이즈 갱신을 말로 설명해야 하는 논리형."},{"title":"예상 4 · 조합-점화-무한급수","time":"25분","prompt":"0과 1로 이루어진 길이 n의 문자열 중 1이 연속해서 두 번 나타나지 않는 문자열의 개수를 a_n이라 하자. a_0=1로 둔다.\n\n(1) a_1, a_2를 구하고 n≥2에서 a_n=a_{n-1}+a_{n-2}임을 설명하여라.\n(2) S=Σ(n=1→∞) a_n/3^n 이 수렴함을 보이고, 점화식을 이용하여 S의 값을 구하여라.\n(3) (2)에서 점화식을 급수 전체에 적용할 때 지수와 시작항을 어떻게 맞추었는지 서술하여라.","guide":"마지막 문자가 0인 경우와 10으로 끝나는 경우로 분리한다. A=Σ(n=0→∞)a_n/3^n라 두면 A=1+(1/3)A+(1/9)A, 따라서 A=9/5이고 S=4/5.","why":"경우의 수 → 점화식 → 무한급수로 표현을 바꾸는 연결형."}]},"GACHON":{"name":"가천대 한의예","badge":"80분 · 수학 8문항 · 수학Ⅰ·Ⅱ·미적분","trend":"2022~2026 실제 기출·가이드에서 짧은 서술형, 교과 개념의 정확한 사용, EBS·수능형 소재의 변형이 반복된다. 2027 한의예는 과거 일반 자연계와 달리 의약학군 수학 단일형으로 준비해야 하므로 최근 의예 기출과 2027 한의예·약학 모의논술에 더 큰 가중치를 둔다.","note":"오래된 일반 자연계 형식을 그대로 복제하지 않고, 2027 한의예의 수학Ⅰ·Ⅱ·미적분 8문항/80분 구조를 기준으로 재구성한다.","sources":[["2022 기출","https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=12506"],["2023 가이드/기출","https://admission.gachon.ac.kr/upload/BBS0024/20220629085606JE2ZE4.PDF"],["2024 기출","https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=18445"],["2025 기출·2026 모의","https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=24228"],["2026 기출 가이드","https://admission.gachon.ac.kr/admission/html/rolling/susi_guide.asp"],["2027 의약학 모의","https://admission.gachon.ac.kr/admission/html/rolling/notice.asp"]],"problems":[{"title":"예상 1 · 사인/코사인법칙","time":"8분","prompt":"삼각형 ABC에서 AB=5, AC=6이고 넓이가 12이다. BC>8일 때 BC²의 값을 구하는 과정을 서술하여라.","guide":"(1/2)·5·6·sinA=12에서 sinA=4/5. BC>8 조건으로 cosA=-3/5를 선택한 뒤 코사인법칙을 적용하면 BC²=97.","why":"특수각 숫자에 기대지 않고, 추가 조건이 삼각비의 부호를 결정하도록 만든 EBS 변형형."},{"title":"예상 2 · 로그함수와 해의 개수","time":"8분","prompt":"정수 a에 대하여 방정식 log₂(x-a)+log₂(6-x)=1이 서로 다른 두 실근을 갖도록 하는 a의 최댓값을 구하여라.","guide":"정의역 a<x<6에서 (x-a)(6-x)=2. 아래로 열린 이차식의 최댓값 ((6-a)/2)²가 2보다 커야 하므로 a<6-2√2. 정수 a의 최댓값은 3.","why":"로그 계산보다 정의역과 이차함수의 최대를 결합해 해의 개수를 판단하는 유형."},{"title":"예상 3 · 귀납수열 역추론","time":"10분","prompt":"양의 정수 a₁<50에 대하여 수열 {a_n}을 다음과 같이 정의한다.\na_n이 짝수이면 a_{n+1}=a_n/2+1,\na_n이 홀수이면 a_{n+1}=3a_n-1.\na₅=26일 때 a₁을 구하는 과정을 서술하여라.","guide":"거꾸로 갈 때 각 단계의 홀짝 조건도 함께 검사한다. 허용 경로만 남기면 26←50←17←32←11이므로 a₁=11.","why":"항을 무작정 전개하기보다 조건을 보존하며 역으로 가지를 쳐내는 수열 추론."},{"title":"예상 4 · 연속·미분가능성","time":"9분","prompt":"다항식 p(x)=x³+ax²+bx+c에 대하여 f(x)=p(x)/(x-1) (x≠1), f(1)=2로 정의한다. f가 x=1에서 미분가능하고 f'(1)=3일 때 a+b+c를 구하는 과정을 서술하여라.","guide":"연속성에서 p(1)=0. p(x)=(x-1)q(x)로 두면 q(1)=2, q'(1)=3. q=x²+(a+1)x+(a+b+1)이므로 a=0,b=-1,c=0, 답은 -1.","why":"제거가능 불연속을 인수 구조로 바꾸고 미분가능성까지 연결하는 수Ⅱ형."},{"title":"예상 5 · 도함수와 극값 구조","time":"8분","prompt":"함수 f(x)=x⁴-4x³+ax²가 x=1에서 정지점을 갖고 서로 다른 세 개의 정지점을 갖는다. a의 값과 각 정지점에서의 극대·극소 여부를 서술하여라.","guide":"f'(1)=0에서 a=4. f'(x)=4x(x-1)(x-2)이므로 정지점은 0,1,2. 부호변화로 0과 2는 극소, 1은 극대.","why":"미분 계산보다 도함수 인수와 부호표를 빠르게 읽는 타임어택형."},{"title":"예상 6 · 절댓값 정적분","time":"8분","prompt":"F(3)=∫₀³ |t²-3t+2|dt의 값을 구하고, 적분구간을 나눈 근거를 서술하여라.","guide":"(t-1)(t-2)의 부호가 1,2에서 바뀐다. 세 구간으로 나누어 계산하면 F(3)=11/6.","why":"절댓값을 계산 기술로 처리하지 않고 영점·부호 구조를 먼저 보는 기본-중상 문항."},{"title":"예상 7 · 무한급수와 정적분","time":"12분","prompt":"S=Σ(n=1→∞) ∫₀¹ (x^n-x^(n+1))dx 의 값을 구하고, 급수의 수렴 과정을 서술하여라.","guide":"각 항은 1/(n+1)-1/(n+2). 부분합을 먼저 쓰면 망원급수로 정리되어 S=1/2.","why":"무한급수와 정적분을 한 문제 안에서 전환하는 의약학군 결합형."},{"title":"예상 8 · 역함수의 2계 미분","time":"17분","prompt":"f(x)=x³+x의 역함수를 g라 하고 h(x)={g(x)}²라 하자. h''(2)의 값을 구하는 과정을 서술하여라.","guide":"f(1)=2에서 g(2)=1. g'(2)=1/f'(1)=1/4, g''(2)=-f''(1)/{f'(1)}³=-3/32. 따라서 h''(2)=2(g')²+2gg''=-1/16.","why":"역함수 미분을 합성함수와 2계미분으로 확장한 상위 변별 문항."}]}};

try{
  const prev=lscore;
  lscore=function(q){
    const base=prev(q);
    const bump=q&&q.tier==='challenge'?8:(q&&q.tier==='bridge'?-2:0);
    return Math.max(0,Math.min(100,Math.round(base+bump)));
  };
}catch(_){}
function esc(v){
  try{return safeMath(v);}catch(_){
    return String(v==null?'':v).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m];});
  }
}
function cfg(){
  state.essayV27=state.essayV27&&typeof state.essayV27==='object'?state.essayV27:{school:'KU',index:0};
  if(!BANK[state.essayV27.school])state.essayV27.school='KU';
  var max=BANK[state.essayV27.school].problems.length;
  state.essayV27.index=Math.max(0,Math.min(max-1,Number(state.essayV27.index)||0));
  return state.essayV27;
}
function memoKey(){var c=cfg();return 'v27:'+c.school+':'+c.index;}
function saveEssayMemo(){
  var ta=document.getElementById('kuMemo');if(!ta)return;
  state.kuV27=state.kuV27&&typeof state.kuV27==='object'?state.kuV27:{};
  state.kuV27[memoKey()]={memo:ta.value,checks:Array.prototype.map.call(document.querySelectorAll('.kucheck'),function(x){return x.checked;}),savedAt:Date.now()};
  save();
}
function syncEssayMemo(){
  var ta=document.getElementById('kuMemo');if(!ta)return;
  state.kuV27=state.kuV27&&typeof state.kuV27==='object'?state.kuV27:{};
  var rec=state.kuV27[memoKey()]||{};
  ta.value=rec.memo||'';
  document.querySelectorAll('.kucheck').forEach(function(x,i){x.checked=(rec.checks||[])[i]||false;});
  var c=cfg(),g=document.getElementById('kuGuide');
  if(g){g.classList.add('hidden');g.textContent=BANK[c.school].problems[c.index].guide;}
}
function renderEssayV27(){
  var root=document.getElementById('kuProblem');if(!root)return;
  var c=cfg(),pack=BANK[c.school],p=pack.problems[c.index];
  var src=pack.sources.map(function(x){return '<a href="'+x[1]+'" target="_blank" rel="noopener">'+esc(x[0])+' ↗</a>';}).join(' · ');
  var nums=pack.problems.map(function(x,i){return '<button class="mini-btn '+(i===c.index?'active':'')+'" data-essay-idx="'+i+'">'+(i+1)+'</button>';}).join('');
  root.innerHTML=
    '<div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px">'+
    '<button class="mode '+(c.school==='KU'?'active':'')+'" data-school-v27="KU">고려대(서울)</button>'+
    '<button class="mode '+(c.school==='GACHON'?'active':'')+'" data-school-v27="GACHON">가천대 한의예</button></div>'+
    '<div class="q-tags"><span class="tag a">'+esc(pack.name)+'</span><span class="tag">'+esc(pack.badge)+'</span><span class="tag challenge">예상문제 · 기출구조 재구성</span></div>'+
    '<div class="info-box" style="margin-top:10px"><b>최근 5년 창에서 읽은 방향</b><br>'+esc(pack.trend)+'<br><span style="font-size:10px;color:#727b8c">'+esc(pack.note)+'</span><br><span style="font-size:10px">'+src+'</span></div>'+
    '<div style="display:flex;gap:5px;flex-wrap:wrap;margin:12px 0 4px">'+nums+'</div>'+
    '<div class="q-tags"><span class="tag">'+esc(p.time)+' 권장</span></div>'+
    '<div class="question-text essay">'+esc(p.title)+'<br><br>'+esc(p.prompt)+'</div>'+
    '<div class="quality-note"><b>왜 이 문제인가</b><br>'+esc(p.why)+'</div>';
  document.querySelectorAll('[data-school-v27]').forEach(function(b){b.onclick=function(){saveEssayMemo();c.school=b.dataset.schoolV27;c.index=0;save();renderEssayV27();syncEssayMemo();};});
  document.querySelectorAll('[data-essay-idx]').forEach(function(b){b.onclick=function(){saveEssayMemo();c.index=Number(b.dataset.essayIdx);save();renderEssayV27();syncEssayMemo();};});
  syncEssayMemo();
}
try{renderKU=renderEssayV27;}catch(_){}
var saveBtn=document.getElementById('saveKu');if(saveBtn)saveBtn.onclick=function(){saveEssayMemo();alert('저장했습니다.');};
var guideBtn=document.getElementById('showKuGuide');if(guideBtn)guideBtn.onclick=function(){var g=document.getElementById('kuGuide');if(!g)return;var c=cfg();g.textContent=BANK[c.school].problems[c.index].guide;g.classList.toggle('hidden');};
var h=document.querySelector('#kuView h2');if(h)h.textContent='대학별 수리논술 실전';
var e=document.querySelector('#kuView .eyebrow');if(e)e.textContent='최근 기출을 복제하지 않고 출제 구조를 재구성';
try{
  var k=dayKey(),d=state.daily&&state.daily[k];
  var drafts=Object.values((d&&d.drafts)||{});
  var hasWork=!!(d&&d.gradedAt)||((d&&d.marked)||[]).length>0||drafts.some(function(x){return x&&(x.answer||x.confidence||x.hintUsed);});
  if(state.difficultyV27!=='challenge-plus-8'){
    state.difficultyV27='challenge-plus-8';
    if(d&&!hasWork)delete state.daily[k];
    save();makeQueue(true);
  }
}catch(_){}
try{
  var v=document.querySelector('.version');
  if(v){var count=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK.length:104;v.textContent='v2.7 '+count+'문항';}
}catch(_){}
try{renderEssayV27();}catch(_){}
})();