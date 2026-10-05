/* 수능핏 MATH v2.3 기출 계보 레이어
   - 실제 기출 원문을 복제하지 않고, 공식 분석에서 확인된 '문항 번호 + 핵심 사고 DNA'를 연결한다.
   - 앱의 기존 문제는 '기출 핵심형(재구성)' 또는 '기출 변형'으로 표시한다.
   - 최근 수능/평가원 4점 핵심 구조를 익힌 뒤 D-30부터 변형 적응으로 전환한다.
*/
(() => {
  'use strict';
  if (window.__SAT100_LINEAGE_V23__) return;
  window.__SAT100_LINEAGE_V23__ = true;

  const LINEAGE = [
    {id:'270921', exam:'2027 9모', slot:'21', patternId:'P01', dna:'함수 그래프 개형 → 미분가능성 조건 → 종합 추론', priority:100, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127095'},
    {id:'270922', exam:'2027 9모', slot:'22', patternId:'P03', dna:'지수·로그 함수 → 평행이동 → 역함수/대칭 관계 → 좌표 추론', priority:100, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127095'},
    {id:'270928', exam:'2027 9모', slot:'28', patternId:'P04', dna:'도형·변수 관계 설정 → 음함수 미분 → 미분계수 추론', priority:96, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127095'},
    {id:'270930', exam:'2027 9모', slot:'30', patternId:'P06', dna:'역함수 관계 → 정적분/치환 관점 → 구간·면적 해석', priority:94, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127095'},

    {id:'270621', exam:'2027 6모', slot:'21', patternId:'P01', dna:'삼차함수 그래프 개형 → 조건 결합 → 함수 추론', priority:98, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127091'},
    {id:'270622', exam:'2027 6모', slot:'22', patternId:'P02', dna:'귀납수열 → 규칙 발견 → 경우 분기·역추론', priority:99, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127091'},
    {id:'270628', exam:'2027 6모', slot:'28', patternId:'P04', dna:'매개/합성 관계 → 미분법 → 조건 해석', priority:88, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127091'},

    {id:'261114', exam:'2026 수능', slot:'14', patternId:'P08', dna:'도형 조건 → 사인·코사인법칙 → 길이/각 추론', priority:86, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127090'},
    {id:'261115', exam:'2026 수능', slot:'15', patternId:'P05', dna:'극값 조건 → 정적분 관계 → 함수값 추론', priority:88, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127090'},
    {id:'261121', exam:'2026 수능', slot:'21', patternId:'P01', dna:'극한 존재 조건 → 함수 결정 → 최댓값/함숫값 추론', priority:100, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127090'},
    {id:'261122', exam:'2026 수능', slot:'22', patternId:'P03', dna:'지수·로그 그래프 → 평행이동/대칭 → 관계 추론', priority:100, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127090'},
    {id:'261128', exam:'2026 수능', slot:'28', patternId:'P04', dna:'음함수 미분 → 관계식 해석 → 적분/변수 변환 연결', priority:92, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127090'},
    {id:'261130', exam:'2026 수능', slot:'30', patternId:'P06', dna:'역함수 그래프 → 교점/대칭 관계 → 고난도 함수 추론', priority:96, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?bbsCd=B114&cookieGradeVal=high3&datNo=127090'},

    {id:'251114', exam:'2025 수능', slot:'14', patternId:'P08', dna:'삼각형/원 조건 → 사인법칙 → 길이 관계', priority:80, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127086'},
    {id:'251121', exam:'2025 수능', slot:'21', patternId:'P01', dna:'극한값 존재 조건 → 함수 추론 → 계수 범위/최댓값', priority:97, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127086'},
    {id:'251122', exam:'2025 수능', slot:'22', patternId:'P02', dna:'귀납수열 → 항 나열 → 조건을 만족하는 첫째항 역추적', priority:98, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127086'},
    {id:'251130', exam:'2025 수능', slot:'30', patternId:'P04', dna:'삼각함수 + 합성함수 미분 → 극대 조건 → 함수 추론', priority:93, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127086'},

    {id:'241114', exam:'2024 수능', slot:'14', patternId:'P01', dna:'삼차함수 그래프 → 함숫값/극한 조건 → 그래프 추론', priority:88, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127082'},
    {id:'241115', exam:'2024 수능', slot:'15', patternId:'P02', dna:'귀납수열 → 뒤 항에서 시작 → 첫째항 역추론', priority:96, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127082'},
    {id:'241122', exam:'2024 수능', slot:'22', patternId:'P01', dna:'미분계수 부호 → 증가·감소 → 그래프 개형 → 함수식 결정', priority:100, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127082'},
    {id:'241130', exam:'2024 수능', slot:'30', patternId:'P04', dna:'도함수의 비미분가능 지점 → 그래프 개형 → 조건 해석', priority:93, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127082'},

    {id:'231114', exam:'2023 수능', slot:'14', patternId:'P01', dna:'함수의 극한·연속 → 새 함수 정의 → 참/거짓 추론', priority:88, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127075'},
    {id:'231115', exam:'2023 수능', slot:'15', patternId:'P02', dna:'귀납적 정의 → 경우 분기 → 항의 최댓값/최솟값', priority:95, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127075'},
    {id:'231122', exam:'2023 수능', slot:'22', patternId:'P01', dna:'평균변화율/도함수 → 삼차함수 추론', priority:97, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127075'},
    {id:'231130', exam:'2023 수능', slot:'30', patternId:'P04', dna:'합성함수 미분 → 실근 개수 → 삼차함수 값 추론', priority:94, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127075'},

    {id:'221115', exam:'2022 수능', slot:'15', patternId:'P08', dna:'원주각/코사인법칙 → 현 길이 비 추론', priority:92, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127071'},
    {id:'221121', exam:'2022 수능', slot:'21', patternId:'P02', dna:'수열의 합 + 자연수 조건 → 수열 항 추론', priority:95, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127071'},
    {id:'221122', exam:'2022 수능', slot:'22', patternId:'P01', dna:'실근 개수 함수 + 극한 조건 → 삼차함수 추론', priority:100, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127071'},
    {id:'221128', exam:'2022 수능', slot:'28', patternId:'P04', dna:'삼각함수 + 합성함수 미분 → 극소 조건 추론', priority:91, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127071'},
    {id:'221130', exam:'2022 수능', slot:'30', patternId:'P06', dna:'역함수 관계 + 부분적분/정적분 → 값 추론', priority:96, source:'https://www.ebsi.co.kr/ebs/ent/enta/retrieveEntAnlyStrdDataVw.ebs?cookieGradeVal=high3&datNo=127071'}
  ];

  window.SAT100_LINEAGE_DB = LINEAGE;

  function lineagesFor(q){
    if(!q) return [];
    const exact = LINEAGE.filter(x => String(x.slot)===String(q.slot||'') && x.patternId===q.patternId);
    const samePattern = LINEAGE.filter(x => x.patternId===q.patternId && !exact.some(e=>e.id===x.id));
    return [...exact, ...samePattern].sort((a,b)=>b.priority-a.priority).slice(0,4);
  }
  window.sat100LineageForQuestion = lineagesFor;

  function lineageBoost(q){
    const ls=lineagesFor(q);
    if(!ls.length) return 0;
    const p=ls[0].priority||0;
    const recent=ls.some(x=>x.exam.startsWith('2027')) ? 4 : 0;
    return Math.round(Math.max(0,(p-80)/5)) + recent;
  }

  /* v2.2의 학습 우선도 위에 '최근 실제 기출 계보 일치도'만 소폭 가산한다. */
  try{
    const prev=lscore;
    lscore=q=>Math.max(0,Math.min(100,Math.round(prev(q)+lineageBoost(q))));
  }catch(_){ }

  function currentQ(){
    try{const qs=queue();return qs?.[idx]||null;}catch(_){return null;}
  }

  function removeOld(){
    document.querySelectorAll('[data-lineage-v23]').forEach(x=>x.remove());
  }

  function renderLineage(){
    removeOld();
    const q=currentQ();
    if(!q) return;
    const ls=lineagesFor(q);
    if(!ls.length) return;
    const anchor=document.querySelector('.q-tags');
    if(!anchor) return;

    const box=document.createElement('div');
    box.dataset.lineageV23='1';
    box.style.cssText='margin:10px 0 2px;padding:10px 11px;border:1px solid #e1e7ff;background:#f8f9ff;border-radius:12px;font-size:11px;line-height:1.55;color:#46516a';
    const mode=q.variant?'기출 변형':'기출 핵심형(재구성)';
    const rows=ls.slice(0,3).map(x=>`<div style="margin-top:5px"><b>${x.exam} ${x.slot}번</b> · ${x.dna} <a href="${x.source}" target="_blank" rel="noopener" style="font-weight:800;color:#3159d9;text-decoration:none">공식 분석↗</a></div>`).join('');
    box.innerHTML=`<div><b>${mode}</b> · 이 문제는 아래 실제 기출의 사고구조를 훈련합니다.</div>${rows}<div style="margin-top:6px;color:#7a8496">※ 앱 문제는 실제 기출 원문이 아니라 동일 사고 DNA를 연습하도록 재구성한 문항입니다.</div>`;
    anchor.insertAdjacentElement('afterend',box);
  }

  try{
    const prevRenderStudy=renderStudy;
    renderStudy=function(){prevRenderStudy();renderLineage();};
  }catch(_){ }

  function patchVersion(){
    document.title=`수능핏 MATH v2.3 ${Array.isArray(QB)?QB.length:104}문항 · 기출계보→변형`;
    const v=document.querySelector('.version'); if(v) v.textContent=`v2.3 ${Array.isArray(QB)?QB.length:104}문항`;
    const s=document.querySelector('.brand-sub'); if(s) s.textContent='최근 5개년 수능·6·9모 계보 × D-30부터 기출 변형';
  }

  try{
    const prevSettings=renderSettings;
    renderSettings=function(){prevSettings();patchVersion();};
  }catch(_){ }

  patchVersion();
  try{renderStudy();}catch(_){ }
})();