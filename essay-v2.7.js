/* 수능핏 MATH v2.7 대학별 수리논술 + 난도 미세상향 */
(()=>{
'use strict';
if(window.__SAT100_ESSAY_V27__)return;
window.__SAT100_ESSAY_V27__=true;
const BANK={"KU":{"name":"고려대(서울)","badge":"80분 · 수학Ⅰ·Ⅱ·미적분·확통·기하","trend":"최근 5년 창을 그대로 보면 서울캠퍼스는 논술 본시험이 연속 5년 존재하지 않는다. 2023·2024 모의논술을 설계 원형으로, 2025·2026 본시험·선행학습영향평가를 실제 출제 축으로 보고 2027 현행 전 범위와 연결한다. 핵심은 한 문항 안에서 앞 소문항의 결과를 뒤에서 재사용하는 연결, 여러 단원의 표현을 오가는 종합 추론이다.","note":"없는 연도의 본시험을 기출처럼 만들지 않는다. 5년 창의 자료 존재 여부 자체를 분석에 포함한다.","sources":[["2023 모의논술","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=84&BOARD_SEQ=2&CONTENTS_NO=1&MENU_ID=720&SITE_NO=2"],["2024 모의논술","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=86&BOARD_SEQ=2&MENU_ID=720&SITE_NO=2"],["2025 영향평가","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=87&BOARD_SEQ=2&MENU_ID=720&SITE_NO=2"],["2026 영향평가","https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?BBS_SEQ=88&BOARD_SEQ=2&MENU_ID=720&SITE_NO=2"],["2027 모집요강","https://oku.korea.ac.kr/attach/202605/1780023076409_0.pdf"]],"problems":[{"title":"예상 1 · 함수-교점-정적분 연결","time":"20분","prompt":"함수 f(x)=x³-3x와 실수 t에 대하여 직선 ℓ_t:y=tx를 생각하자.\n\n(1) y=f(x)와 ℓ_t가 서로 다른 세 점에서 만나기 위한 t의 범위를 구하여라.\n(2) 세 교점 사이에서 두 그래프로 둘러싸인 두 부분의 넓이의 합을 A(t)라 할 때 A(t)를 t로 나타내어라.\n(3) A(t)=8일 때 t의 값을 구하고, (2)의 결과를 이용한 이유를 서술하여라.","guide":"f(x)-tx=x{x²-(t+3)}로 두어 교점 구조를 먼저 읽는다. t>-3에서 비영 교점은 ±√(t+3)이고 대칭성을 이용하면 한쪽만 적분하면 된다. A(t)=(t+3)²/2, 따라서 t=1.","why":"교점의 구조 → 대칭 → 정적분 → 매개변수 결정이 한 대문항 안에서 이어지는 연결형."},{"title":"예상 2 · 벡터와 최적화","time":"17분","prompt":"삼각형 ABC에서 |AB|=|AC|=2이고 ∠BAC=60°이다. 점 P가 선분 BC를 B에서 C까지 움직인다.\n\n(1) BP:PC=t:(1-t) (0≤t≤1)로 놓고 벡터 AP를 AB, AC로 나타내어라.\n(2) |AP|²+|PB|²을 t의 식으로 나타내어라.\n(3) 이 값의 최솟값과 그때의 BP:PC를 구하여라.","guide":"AP=(1-t)AB+tAC, AB·AC=2를 사용한다. |AP|²=4t²-4t+4, |PB|²=4t²이므로 합은 8t²-4t+4. t=1/4에서 최소 7/2, BP:PC=1:3.","why":"기하 조건을 벡터 내적의 이차식으로 바꾸고 최적화하는 종합형."},{"title":"예상 3 · 조건부확률과 정보 갱신","time":"18분","prompt":"어떤 질환의 유병률은 1/10이다. 검사 T는 질환이 있는 사람에게 양성일 확률이 4/5이고, 질환이 없는 사람에게 양성일 확률이 1/10이다. 같은 사람에게 조건부로 독립인 두 번의 검사를 시행한다.\n\n(1) 두 검사 중 정확히 한 번만 양성일 확률을 구하여라.\n(2) 정확히 한 번만 양성이었다는 조건 아래 실제 질환이 있을 확률을 구하여라.\n(3) 두 번 모두 양성일 때의 사후확률과 (2)의 값을 비교하고 그 이유를 설명하여라.","guide":"질환 D와 비질환 N으로 나누어 전확률을 먼저 계산한다. 정확히 한 번 양성일 때 P(E|D)=8/25, P(E|N)=9/50이므로 P(D|E)=16/97. 두 번 모두 양성이면 64/73.","why":"사건 정의 → 전확률 → 베이즈 갱신을 말로 설명해야 하는 논리형."},{"title":"예상 4 · 조합-점화-무한급수","time":"25분","prompt":"0과 1로 이루어진 길이 n의 문자열 중 1이 연속해서 두 번 나타나지 않는 문자열의 개수를 a_n이라 하자. a_0=1로 둔다.\n\n(1) a_1, a_2를 구하고 n≥2에서 a_n=a_{n-1}+a_{n-2}임을 설명하여라.\n(2) S=Σ(n=1→∞) a_n/3^n 이 수렴함을 보이고, 점화식을 이용하여 S의 값을 구하여라.\n(3) (2)에서 점화식을 급수 전체에 적용할 때 지수와 시작항을 어떻게 맞추었는지 서술하여라.","guide":"마지막 문자가 0인 경우와 10으로 끝나는 경우로 분리한다. A=Σ(n=0→∞)a_n/3^n라 두면 A=1+(1/3)A+(1/9)A, 따라서 A=9/5이고 S=4/5.","why":"경우의 수 → 점화식 → 무한급수로 표현을 바꾸는 연결형."}]},"GACHON":{"name":"가천대 한의예","badge":"80분 · 수학 8문항 · 수학Ⅰ·Ⅱ·미적분","trend":"2022~2026 실제 기출·가이드에서 짧은 서술형, 교과 개념의 정확한 사용, EBS·수능형 소재의 변형이 반복된다. 2027 한의예는 과거 일반 자연계와 달리 의약학군 수학 단일형으로 준비해야 하므로 최근 의예 기출과 2027 한의예·약학 모의논술에 더 큰 가중치를 둔다.","note":"오래된 일반 자연계 형식을 그대로 복제하지 않고, 2027 한의예의 수학Ⅰ·Ⅱ·미적분 8문항/80분 구조를 기준으로 재구성한다.","sources":[["2022 기출","https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=12506"],["2023 가이드/기출","https://admission.gachon.ac.kr/upload/BBS0024/20220629085606JE2ZE4.PDF"],["2024 기출","https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=18445"],["2025 기출·2026 모의","https://admission.gachon.ac.kr/admission/html/rolling/noticeView.asp?BOARD_IDX=24228"],["2026 기출 가이드","https://admission.gachon.ac.kr/admission/html/rolling/susi_guide.asp"],["2027 의약학 모의","https://admission.gachon.ac.kr/admission/html/rolling/notice.asp"]],"problems":[{"title":"예상 1 · 사인/코사인법칙","time":"8분","prompt":"삼각형 ABC에서 AB=5, AC=6이고 넓이가 12이다. BC>8일 때 BC²의 값을 구하는 과정을 서술하여라.","guide":"(1/2)·5·6·sinA=12에서 sinA=4/5. BC>8 조건으로 cosA=-3/5를 선택한 뒤 코사인법칙을 적용하면 BC²=97.","why":"특수각 숫자에 기대지 않고, 추가 조건이 삼각비의 부호를 결정하도록 만든 EBS 변형형."},{"title":"예상 2 · 로그함수와 해의 개수","time":"8분","prompt":"정수 a에 대하여 방정식 log₂(x-a)+log₂(6-x)=1이 서로 다른 두 실근을 갖도록 하는 a의 최댓값을 구하여라.","guide":"정의역 a<x<6에서 (x-a)(6-x)=2. 아래로 열린 이차식의 최댓값 ((6-a)/2)²가 2보다 커야 하므로 a<6-2√2. 정수 a의 최댓값은 3.","why":"로그 계산보다 정의역과 이차함수의 최대를 결합해 해의 개수를 판단하는 유형."},{"title":"예상 3 · 귀납수열 역추론","time":"10분","prompt":"양의 정수 a₁<50에 대하여 수열 {a_n}을 다음과 같이 정의한다.\na_n이 짝수이면 a_{n+1}=a_n/2+1,\na_n이 홀수이면 a_{n+1}=3a_n-1.\na₅=26일 때 a₁을 구하는 과정을 서술하여라.","guide":"거꾸로 갈 때 각 단계의 홀짝 조건도 함께 검사한다. 허용 경로만 남기면 26←50←17←32←11이므로 a₁=11.","why":"항을 무작정 전개하기보다 조건을 보존하며 역으로 가지를 쳐내는 수열 추론."},{"title":"예상 4 · 연속·미분가능성","time":"9분","prompt":"다항식 p(x)=x³+ax²+bx+c에 대하여 f(x)=p(x)/(x-1) (x≠1), f(1)=2로 정의한다. f가 x=1에서 미분가능하고 f'(1)=3일 때 a+b+c를 구하는 과정을 서술하여라.","guide":"연속성에서 p(1)=0. p(x)=(x-1)q(x)로 두면 q(1)=2, q'(1)=3. q=x²+(a+1)x+(a+b+1)이므로 a=0,b=-1,c=0, 답은 -1.","why":"제거가능 불연속을 인수 구조로 바꾸고 미분가능성까지 연결하는 수Ⅱ형."},{"title":"예상 5 · 도함수와 극값 구조","time":"8분","prompt":"함수 f(x)=x⁴-4x³+ax²가 x=1에서 정지점을 갖고 서로 다른 세 개의 정지점을 갖는다. a의 값과 각 정지점에서의 극대·극소 여부를 서술하여라.","guide":"f'(1)=0에서 a=4. f'(x)=4x(x-1)(x-2)이므로 정지점은 0,1,2. 부호변화로 0과 2는 극소, 1은 극대.","why":"미분 계산보다 도함수 인수와 부호표를 빠르게 읽는 타임어택형."},{"title":"예상 6 · 절댓값 정적분","time":"8분","prompt":"F(3)=∫₀³ |t²-3t+2|dt의 값을 구하고, 적분구간을 나눈 근거를 서술하여라.","guide":"(t-1)(t-2)의 부호가 1,2에서 바뀐다. 세 구간으로 나누어 계산하면 F(3)=11/6.","why":"절댓값을 계산 기술로 처리하지 않고 영점·부호 구조를 먼저 보는 기본-중상 문항."},{"title":"예상 7 · 무한급수와 정적분","time":"12분","prompt":"S=Σ(n=1→∞) ∫₀¹ (x^n-x^(n+1))dx 의 값을 구하고, 급수의 수렴 과정을 서술하여라.","guide":"각 항은 1/(n+1)-1/(n+2). 부분합을 먼저 쓰면 망원급수로 정리되어 S=1/2.","why":"무한급수와 정적분을 한 문제 안에서 전환하는 의약학군 결합형."},{"title":"예상 8 · 역함수의 2계 미분","time":"17분","prompt":"f(x)=x³+x의 역함수를 g라 하고 h(x)={g(x)}²라 하자. h''(2)의 값을 구하는 과정을 서술하여라.","guide":"f(1)=2에서 g(2)=1. g'(2)=1/f'(1)=1/4, g''(2)=-f''(1)/{f'(1)}³=-3/32. 따라서 h''(2)=2(g')²+2gg''=-1/16.","why":"역함수 미분을 합성함수와 2계미분으로 확장한 상위 변별 문항."}]}};

const HARD_V27=[{"id":"H2714","patternId":"P03","course":"공통","unit":"수학Ⅰ","skill":"지수함수·역함수·조건 결합","tier":"challenge","type":"numeric","q":"실수 a<3에 대하여 f(x)=2^x+a이고 g는 f의 역함수이다. 다음 조건을 만족시킨다.\n\ng(3)+g(5)=3\n\nf(3)+g(9)의 값을 구하여라.","ans":"12","expected":260,"why":"역함수 값을 로그식으로 바꾼 뒤 두 조건을 곱의 관계로 묶어 매개변수를 결정해야 합니다. 주어진 3,5,9를 개별 대입하는 것이 아니라 역함수의 정의역과 함수 관계를 함께 읽는 문제입니다.","tip":"g(y)=log₂(y-a)이고 g(3), g(5)가 존재하므로 a<3입니다.","solution":"g(3)+g(5)=log₂{(3-a)(5-a)}=3이므로 (3-a)(5-a)=8. a²-8a+7=0에서 a=1 또는 7인데 a<3이므로 a=1. 따라서 f(3)=9, g(9)=3이므로 답은 12.","conditionUse":"정의역 + 역함수 + 로그결합","qualityGate":{"mathVerified":true,"conditionsEssential":true,"conceptLinks":3,"numberSmellChecked":true},"slot":"14","variant":false,"hardV27":true},{"id":"H2715","patternId":"P05","course":"공통","unit":"수학Ⅱ","skill":"정적분 정의 함수·극값 위치·대칭화","tier":"challenge","type":"numeric","q":"실수 a,b에 대하여\nF(x)=∫₀ˣ(t²+at+b)dt\n라 하자. F가 x=α에서 극댓값, x=β에서 극솟값을 가지며 α<β이다. 다음 조건을 만족시킨다.\n\nα+β=4,\nF(β)-F(α)=-9/2.\n\n4F'(0)의 값을 구하여라.","ans":"7","expected":330,"why":"극값의 위치를 직접 주어진 숫자로 대입하는 대신 도함수의 두 근을 중심과 간격으로 표현하고, 두 극값의 차를 정적분으로 다시 해석해야 합니다.","tip":"F'(x)의 두 근을 2-d, 2+d로 놓으면 계산 구조가 단순해집니다.","solution":"F'(x)=x²+ax+b의 두 근이 α,β이므로 α+β=-a=4, a=-4. α=2-d, β=2+d라 두면 F'(x)=(x-2)²-d². 따라서 F(β)-F(α)=∫_{2-d}^{2+d}((x-2)²-d²)dx=-4d³/3=-9/2. d=3/2이고 b=αβ=4-d²=7/4. F'(0)=b이므로 4F'(0)=7.","conditionUse":"극값 2조건 + 적분차","qualityGate":{"mathVerified":true,"conditionsEssential":true,"conceptLinks":4,"numberSmellChecked":true},"slot":"15","variant":false,"hardV27":true},{"id":"H2721","patternId":"P01","course":"공통","unit":"수학Ⅱ","skill":"미분가능성·중근·도함수 근 구조","tier":"challenge","type":"numeric","q":"최고차항의 계수가 1인 삼차함수 f(x)에 대하여\nh(x)=|f(x)-2x+1|\n이라 하자. 다음 조건을 모두 만족시킨다.\n\n(가) h(1)=0이고 h는 x=1에서 미분가능하다.\n(나) 방정식 f'(x)=2의 서로 다른 두 실근을 α,β라 할 때 α+β=4.\n\n-f(0)의 값을 구하여라.","ans":"5","expected":360,"why":"절댓값의 미분가능성을 중근으로 번역한 뒤, 도함수의 근의 합을 이용해 아직 드러나지 않은 세 번째 근을 결정해야 합니다.","tip":"H(x)=f(x)-2x+1이라 놓으면 h=|H|이고, H는 x=1을 중근으로 가집니다.","solution":"H(x)=f(x)-2x+1은 최고차항 계수가 1인 삼차식이다. h(1)=0이고 |H|가 x=1에서 미분가능하므로 H(1)=H'(1)=0, 따라서 H(x)=(x-1)²(x-r). 또한 H'(x)=f'(x)-2이고 H'=0의 두 근 합은 4. H'=3x²-2(r+2)x+(2r+1)이므로 2(r+2)/3=4, r=4. H(0)=-4=f(0)+1이므로 f(0)=-5, 답은 5.","conditionUse":"절댓값 미분가능성 + 도함수 근합","qualityGate":{"mathVerified":true,"conditionsEssential":true,"conceptLinks":4,"numberSmellChecked":true},"slot":"21","variant":false,"hardV27":true},{"id":"H2722","patternId":"P02","course":"공통","unit":"수학Ⅰ","skill":"귀납수열·역추론·경우 제거","tier":"challenge","type":"numeric","q":"100 이하의 자연수 a₁을 첫째항으로 하는 수열 {a_n}이 다음을 만족시킨다.\n\na_n이 짝수이면 a_{n+1}=a_n/2+1,\na_n이 홀수이면 a_{n+1}=3a_n-1.\n\n(가) a₆=50\n(나) a₁,a₂,…,a₅ 중 홀수인 항은 정확히 3개이다.\n\n∑(n=1→7)a_n의 값을 구하여라.","ans":"163","expected":390,"why":"결과에서 거꾸로 가능한 전단계를 모두 만들고, 각 단계의 홀짝 조건과 전체 홀수 개수 조건을 함께 적용해야 경로가 하나로 정리됩니다.","tip":"a₆=50에서 역으로 갈 때 ‘짝수였던 경우’와 ‘홀수였던 경우’를 모두 만든 뒤 실제 홀짝 조건을 검사하세요.","solution":"a₆=50에서 조건을 보존하며 역추적하면 100 이하 가능한 a₁ 후보는 7,38,40,41,43이다. 이 중 a₁~a₅의 홀수 항이 정확히 3개인 경로는 7→20→11→32→17→50뿐이다. 이어 a₇=26이므로 합은 7+20+11+32+17+50+26=163.","conditionUse":"역분기 + 홀짝검증 + 개수조건","qualityGate":{"mathVerified":true,"conditionsEssential":true,"conceptLinks":4,"numberSmellChecked":true},"slot":"22","variant":false,"hardV27":true},{"id":"H2728","patternId":"P04","course":"미적분","unit":"미적분","skill":"음함수 미분·관계식·변화율","tier":"challenge","type":"mcq","q":"제1사분면의 점 P(x,y)가 곡선\nx²+xy+y²=13\n위를 움직인다. 어느 순간 x-y=1이다. S=xy라 할 때, 이 순간 38(dS/dx)의 값은?","opts":["-51-√17","-51+√17","-38-√17","-38+√17","-17-3√17"],"ans":"-51-√17","expected":330,"why":"좌표가 정수로 떨어지지 않는 상황에서 관계식을 그대로 미분하고, 주어진 선형 조건으로 좌표를 정리해야 합니다. 숫자에서 먼저 구조를 추측하기 어렵게 설계했습니다.","tip":"곡선식을 먼저 미분하여 y'를 구한 뒤, x-y=1과 원래 곡선식으로 x,y를 정리하세요.","solution":"2x+y+(x+2y)y'=0이므로 y'=-(2x+y)/(x+2y). x-y=1에서 y=x-1이고 곡선식에 대입하면 x=(1+√17)/2, y=(-1+√17)/2. S'=y+xy'를 정리하면 S'=-(51+√17)/38. 따라서 답은 -51-√17.","conditionUse":"곡선관계 + 선형조건 + 곱미분","qualityGate":{"mathVerified":true,"conditionsEssential":true,"conceptLinks":4,"numberSmellChecked":true},"slot":"28","variant":false,"hardV27":true},{"id":"H2730","patternId":"P06","course":"미적분","unit":"미적분","skill":"역함수 접선·도함수·정적분 치환","tier":"challenge","type":"numeric","q":"a>0에 대하여 f(x)=x³+ax이고 g를 f의 역함수라 하자. t>0일 때 y=g(x)의 그래프 위의 점 P=(f(t),t)에서 그은 접선이 x축과 만나는 점을 Q라 하자.\n\n(가) Q=(-16,0)\n(나) P는 직선 y=x/6 위에 있다.\n\n15∫₀^{f(1)}{g(y)}²dy의 값을 구하여라.","ans":"19","expected":420,"why":"역함수 접선의 x절편에서 매개변수가 소거되는 구조를 먼저 발견하고, 이후에야 a를 결정해 역함수 적분을 원함수 변수로 치환해야 합니다.","tip":"g'(f(t))=1/f'(t). 접선의 x절편을 f(t)-t f'(t)로 나타내 보세요.","solution":"P에서 g의 기울기는 1/f'(t)이다. 접선의 x절편은 f(t)-t f'(t)=(t³+at)-t(3t²+a)=-2t³. Q=(-16,0)이므로 t=2. P=(8+2a,2)가 y=x/6 위에 있으므로 2=(8+2a)/6, a=2. 이제 y=f(x)로 치환하면 dy=(3x²+2)dx, y:0→f(1)=3은 x:0→1에 대응한다. 따라서 적분은 ∫₀¹x²(3x²+2)dx=19/15, 15배는 19.","conditionUse":"역함수 접선 + 위치조건 + 치환적분","qualityGate":{"mathVerified":true,"conditionsEssential":true,"conceptLinks":5,"numberSmellChecked":true},"slot":"30","variant":false,"hardV27":true}];
try{var existing=new Set((window.QUESTION_BANK||[]).map(function(q){return q.id;}));HARD_V27.forEach(function(q){if(!existing.has(q.id)){window.QUESTION_BANK.push(q);existing.add(q.id);}});}catch(_){}

try{
  const prev=lscore;
  lscore=function(q){
    const base=prev(q);
    const bump=q&&q.hardV27?18:(q&&q.tier==='challenge'?8:(q&&q.tier==='bridge'?-2:0));
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
  if(v){var count=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK.length:110;v.textContent='v2.7 '+count+'문항';document.title='수능핏 MATH v2.7 '+count+'문항 · 기출핵심+대학별논술';document.querySelectorAll('.quality-note').forEach(function(el){if(el.textContent.indexOf('문제 구성')>=0){el.innerHTML='<b>문제 구성</b><br>현재 '+count+'문항. 14·15·21·22·28·30에는 구조 은폐형 상위 문항을 추가했고, D-30부터는 기출 변형 중심으로 운영합니다.';}});}
}catch(_){}
try{renderEssayV27();}catch(_){}
})();