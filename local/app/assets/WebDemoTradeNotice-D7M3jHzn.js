import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D3ER87f6.js";
import { t as init_diary_trade_carousel } from "./diary-trade-carousel-B7kj0dAD.js";
function init_WebDemoTradeNotice() {
	return (init_WebDemoTradeNotice = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/journal/WebDemoTradeNotice.css?v=source-build-r57";
			document.head.appendChild(l);
		}
	})))();
}
/** Passive fixed trade cards. Only an explicit card click starts an editable draft. */
function WebDemoTradeNotice({ onRecord }) {
	const [offset, setOffset] = (0, import_react.useState)(0);
	const cards = (0, import_react.useRef)([]);
	function move(next) {
		if (next < 0 || next >= WEB_DEMO_TRADES.length || next === offset) return;
		setOffset(next);
		cards.current[next]?.scrollIntoView({
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
			block: "nearest",
			inline: "start"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "web-demo-trade-notice",
		"aria-label": "최근 거래",
		"aria-roledescription": "carousel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "web-trade-toolbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "최근 거래" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "이전 거래",
				disabled: offset === 0,
				onClick: () => move(offset - 1),
				children: "‹"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "다음 거래",
				disabled: offset === WEB_DEMO_TRADES.length - 1,
				onClick: () => move(offset + 1),
				children: "›"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "web-trade-viewport",
			onKeyDown: (event) => {
				const next = event.key === "ArrowLeft" ? offset - 1 : event.key === "ArrowRight" ? offset + 1 : event.key === "Home" ? 0 : event.key === "End" ? WEB_DEMO_TRADES.length - 1 : null;
				if (next !== null) {
					event.preventDefault();
					move(next);
				}
			},
			children: WEB_DEMO_TRADES.map((trade, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				ref: (node) => {
					cards.current[index] = node;
				},
				type: "button",
				className: "web-trade-card",
				"data-trade-record": trade.id,
				"aria-label": `${trade.instrument} 매도 기록하기`,
				onFocus: () => setOffset(index),
				onClick: (event) => onRecord(webDemoTradeExample(trade), event.currentTarget),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "web-trade-identity",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: trade.logo,
								width: "28",
								height: "28",
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: trade.instrument }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
								dateTime: trade.soldAt,
								title: `매도 ${trade.soldAt}`,
								children: [
									Number(trade.soldAt.slice(5, 7)),
									".",
									Number(trade.soldAt.slice(8)),
									" 매도"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `web-trade-result ${trade.direction}`,
						title: "매수가 대비 매도가 기준 · 수수료·세금 제외",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: trade.direction === "gain" ? "실현이익" : "실현손실" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: trade.pnl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "web-trade-percent",
							children: trade.returnPercent
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "web-trade-prices",
						children: [
							"매수 ",
							trade.buyPrice,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "→"
							}),
							" 매도 ",
							trade.sellPrice
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "web-trade-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							trade.quantity,
							"주 · ",
							trade.account.split(" · ")[0]
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "web-trade-write",
							children: "기록하기 ↗"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "web-trade-detail",
						children: [
							trade.ticker,
							" · ",
							trade.account,
							" · 매수 ",
							trade.boughtAt,
							" · 매도 ",
							trade.soldAt,
							" · 매도금액 ",
							trade.proceeds,
							" · 실현손익 ",
							trade.pnl,
							" (",
							trade.returnPercent,
							") · 수수료·세금 제외"
						]
					})
				]
			}, trade.id))
		})]
	});
}
function webDemoTradeExample(trade) {
	return {
		id: trade.id,
		title: `${Number(trade.recordDate.slice(5, 7))}월 ${Number(trade.recordDate.slice(8))}일 매도 기록`,
		recordDate: trade.recordDate,
		body: `### ${trade.instrument} (${trade.ticker})\n\n- 계좌: ${trade.account}\n\n- 매수: ${trade.boughtAt} · ${trade.buyPrice}\n\n- 매도: ${trade.soldAt} · ${trade.sellPrice}\n\n- 수량: ${trade.quantity}주 · 매도금액: ${trade.proceeds}\n\n- 실현손익: ${trade.pnl} (${trade.returnPercent})\n\n수수료·세금 제외\n\n### 매수 이유\n\n처음 기대한 변화는 무엇이었나요?\n\n### 매도 판단\n\n그 기대가 달라졌나요, 미리 세운 기준에 도달했나요?\n\n### 다음 거래에서 지킬 한 가지\n\n다시 같은 상황이라면 무엇을 유지하거나 바꿀까요?\n\n웹 프리뷰 거래 예시 · 실제 체결 기록 아님\n`
	};
}
var import_react, import_jsx_runtime, WEB_DEMO_TRADES;
function init_WebDemoTradeNotice$1() {
	return (init_WebDemoTradeNotice$1 = __esmMin((() => {
		import_react = require_react();
		init_diary_trade_carousel();
		init_WebDemoTradeNotice();
		import_jsx_runtime = require_jsx_runtime();
		WEB_DEMO_TRADES = Object.freeze([
			Object.freeze({
				id: "web-demo-trade-amber",
				instrument: "SK하이닉스",
				ticker: "000660",
				logo: "/local/app/logos/skhynix-official.png",
				account: "키움 · ••••1001",
				quantity: "12",
				buyPrice: "185,000원",
				sellPrice: "210,000원",
				proceeds: "2,520,000원",
				pnl: "+300,000원",
				returnPercent: "+13.51%",
				direction: "gain",
				boughtAt: "2026-10-19",
				soldAt: "2026-11-02",
				recordDate: "2026-11-02",
				question: "수익을 실현한 판단, 다음에도 반복할 수 있을까요?"
			}),
			Object.freeze({
				id: "web-demo-trade-birch",
				instrument: "삼성전자",
				ticker: "005930",
				logo: "/local/app/logos/samsung-official.png",
				account: "키움 · ••••1001",
				quantity: "40",
				buyPrice: "78,000원",
				sellPrice: "84,000원",
				proceeds: "3,360,000원",
				pnl: "+240,000원",
				returnPercent: "+7.69%",
				direction: "gain",
				boughtAt: "2026-10-26",
				soldAt: "2026-11-04",
				recordDate: "2026-11-04",
				question: "처음 세운 목표와 실제 매도 이유는 같았나요?"
			}),
			Object.freeze({
				id: "web-demo-trade-cedar",
				instrument: "Apple",
				ticker: "AAPL",
				logo: "/local/app/logos/apple.svg",
				account: "토스 · ••••2002",
				quantity: "8",
				buyPrice: "225.00 USD",
				sellPrice: "218.00 USD",
				proceeds: "1,744.00 USD",
				pnl: "−56.00 USD",
				returnPercent: "−3.11%",
				direction: "loss",
				boughtAt: "2026-10-20",
				soldAt: "2026-11-05",
				recordDate: "2026-11-05",
				question: "생각이 달라진 순간과 손절의 근거를 남겨보세요."
			})
		]);
	})))();
}
init_WebDemoTradeNotice$1();
export { WebDemoTradeNotice };
