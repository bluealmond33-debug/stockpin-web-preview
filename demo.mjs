// Fictional web presentation only. Never used by the native Mac app.
const FX=1350;
const positions=[
 {name:'삼성전자',symbol:'005930',quantity:12,price:75000,cost:70000,currency:'KRW',provider:'키움증권'},
 {name:'SK하이닉스',symbol:'000660',quantity:5,price:180000,cost:190000,currency:'KRW',provider:'키움증권'},
 {name:'Apple',symbol:'AAPL',quantity:8,price:200,cost:185,currency:'USD',provider:'토스증권'},
 {name:'NVIDIA',symbol:'NVDA',quantity:10,price:120,cost:100,currency:'USD',provider:'토스증권'}
];
export function demoSummary(){
 const rows=positions.map(p=>({...p,valueKrw:p.quantity*p.price*(p.currency==='USD'?FX:1),gainKrw:p.quantity*(p.price-p.cost)*(p.currency==='USD'?FX:1)}));
 const cashKrw=1500000+400*FX;
 return {demo:true,positions:rows,cashKrw,totalKrw:rows.reduce((s,p)=>s+p.valueKrw,0)+cashKrw,gainKrw:rows.reduce((s,p)=>s+p.gainKrw,0)};
}
const krw=n=>new Intl.NumberFormat('ko-KR').format(n)+'원';
const s=demoSummary();
const badge='<p class="demo-caption">데모 · 실제 자산 아님</p>';
export const demoPages={
 assets:`<h1>내 자산</h1>${badge}<div class="metrics demo-metrics"><div><span class="quiet">전체 자산 · 원화 환산</span><p class="metric-value">${krw(s.totalKrw)}</p></div><div><span class="quiet">평가손익 · 보유 주식</span><p class="demo-summary-gain">+${krw(s.gainKrw)}</p></div></div><h2>보유 종목 <span class="quiet">4</span></h2><div class="demo-holdings" role="list" aria-label="가상 보유 종목">${s.positions.map(p=>`<div class="demo-holding" role="listitem"><div><strong>${p.name}</strong><small>${p.symbol} · ${p.provider}</small></div><div class="demo-quantity"><span>${p.quantity}주</span><small>현재가 ${p.currency==='USD'?'$'+p.price:krw(p.price)}</small></div><div class="demo-value"><strong>${krw(p.valueKrw)}</strong><small class="${p.gainKrw<0?'demo-loss':'demo-gain'}">${p.gainKrw>0?'+':''}${krw(p.gainKrw)}</small></div></div>`).join('')}</div><h2 class="demo-section-title">현금</h2><div class="demo-cash"><span>원화</span><span>${krw(1500000)}</span><span>달러</span><span>$400 · ${krw(400*FX)}</span></div><p class="quiet demo-footnote">모든 수량·가격·환율은 화면 설명용 가상 값입니다. 예시 환율 $1 = 1,350원.</p>`,
 market:`<h1>시장</h1>${badge}<p class="quiet">가상 지표 · 실시간 시세가 아닙니다.</p><div class="market-list">${[['원·달러 환율','1,350.00원','예시 환율 · 달러당 원'],['비트코인 심리','52 · 중립','가상 예시 · 주식시장 지표 아님'],['VIX','19.20','가상 예시 · 미국 주식 변동성']].map(([name,value,detail])=>`<div class="market-row"><div><p>${name}</p><p class="quiet">${detail}</p></div><span class="demo-market-value">${value}</span></div>`).join('')}</div>`,
 connections:`<h1>계좌 연결</h1>${badge}<div class="provider-list">${['키움증권','토스증권'].map(name=>`<div class="provider-row"><div><p>${name}</p><small class="quiet">데모 계좌 · 식별정보 없음</small></div><span class="quiet">연결 예시</span></div>`).join('')}</div><p class="quiet">웹은 화면 체험용입니다. 실제 계좌 연결·조회는 Mac 앱의 별도 기능이며 이 웹에서 실행하지 않습니다.</p><button type="button" data-route="assets">데모 자산 보기</button>`
};
