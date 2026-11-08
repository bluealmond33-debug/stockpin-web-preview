import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
import { d as init_diary_trade_carousel, l as StockLogo, o as formatMoney, r as init_currencyDisplay, t as convertMoney, u as init_StockLogo } from "./currencyDisplay-D_7PrZZu.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-Cjf5qekk.js";
function exactDecimal(value) {
	if (typeof value !== "string" || !/^[-]?\d{1,24}(?:\.\d{1,12})?$/.test(value)) throw Error("invalid raw amount");
	const negative = value.startsWith("-");
	const [w, f = ""] = value.replace(/^-/, "").split(".");
	return (BigInt(w) * SCALE + BigInt(f.padEnd(12, "0"))) * (negative ? -1n : 1n);
}
function projectDemoTradeMoney(raw, mode, quote) {
	try {
		if (!["KRW", "USD"].includes(raw.currency) || ![
			"original",
			"KRW",
			"USD"
		].includes(mode)) return null;
		const quantity = exactDecimal(raw.quantity), buy = exactDecimal(raw.buyPrice), sell = exactDecimal(raw.sellPrice), total = exactDecimal(raw.proceeds), gain = exactDecimal(raw.pnl);
		if (quantity <= 0n || buy <= 0n || sell <= 0n || total <= 0n || sell * quantity !== total * SCALE || (sell - buy) * quantity !== gain * SCALE) return null;
		if (mode !== "original" && mode !== raw.currency) {
			if (!quote || typeof quote.source !== "string" || !quote.source.trim() || quote.source.length > 500 || typeof quote.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(quote.date) || exactDecimal(quote.rate) <= 0n) return null;
			const date = Date.parse(quote.date + "T00:00:00Z");
			if (!Number.isFinite(date) || new Date(date).toISOString().slice(0, 10) !== quote.date) return null;
		}
	} catch {
		return null;
	}
	const get = (key) => convertMoney({
		amount: raw[key],
		currency: raw.currency
	}, mode, quote);
	const buyPrice = get("buyPrice"), sellPrice = get("sellPrice"), proceeds = get("proceeds"), pnl = get("pnl");
	return buyPrice && sellPrice && proceeds && pnl ? {
		buyPrice,
		sellPrice,
		proceeds,
		pnl
	} : null;
}
var DEMO_TRADE_RAW_MONEY, SCALE;
function init_tradeMoney() {
	return (init_tradeMoney = __esmMin((() => {
		init_currencyDisplay();
		DEMO_TRADE_RAW_MONEY = Object.freeze({
			"web-demo-trade-amber": Object.freeze({
				currency: "KRW",
				quantity: "12",
				buyPrice: "185000",
				sellPrice: "210000",
				proceeds: "2520000",
				pnl: "300000"
			}),
			"web-demo-trade-birch": Object.freeze({
				currency: "KRW",
				quantity: "40",
				buyPrice: "78000",
				sellPrice: "84000",
				proceeds: "3360000",
				pnl: "240000"
			}),
			"web-demo-trade-cedar": Object.freeze({
				currency: "USD",
				quantity: "8",
				buyPrice: "225",
				sellPrice: "218",
				proceeds: "1744",
				pnl: "-56"
			})
		});
		SCALE = 10n ** 12n;
	})))();
}
function init_WebDemoTradeNotice() {
	return (init_WebDemoTradeNotice = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/journal/WebDemoTradeNotice.css?v=source-build-r99";
			document.head.appendChild(l);
		}
	})))();
}
/** Passive fixed trade cards. Only an explicit card click starts an editable draft. */
function WebDemoTradeNotice({ onRecord, hideProfit, onHideProfitChange, currencyDisplay, onCurrencyDisplayChange, fxQuote }) {
	const [localHideProfit, setLocalHideProfit] = (0, import_react.useState)(false);
	const profitHidden = hideProfit ?? localHideProfit;
	function toggleProfit() {
		const next = !profitHidden;
		if (hideProfit === void 0) setLocalHideProfit(next);
		onHideProfitChange?.(next);
	}
	const [localCurrencyDisplay, setLocalCurrencyDisplay] = (0, import_react.useState)("original");
	const requestedCurrency = currencyDisplay ?? localCurrencyDisplay;
	const projections = WEB_DEMO_TRADES.map((trade) => {
		const raw = DEMO_TRADE_RAW_MONEY[trade.id];
		return raw?.currency === trade.currency && raw.quantity === trade.quantity ? projectDemoTradeMoney(raw, requestedCurrency, fxQuote ?? null) : null;
	});
	const incomplete = projections.some((amounts) => amounts === null);
	const verifiedQuote = fxQuote && WEB_DEMO_TRADES.every((trade) => {
		const raw = DEMO_TRADE_RAW_MONEY[trade.id];
		return raw?.currency === trade.currency && raw.quantity === trade.quantity && projectDemoTradeMoney(raw, raw.currency === "USD" ? "KRW" : "USD", fxQuote) !== null;
	}) ? fxQuote : null;
	const presented = WEB_DEMO_TRADES.map((trade, index) => {
		const amounts = projections[index];
		return {
			trade,
			view: requestedCurrency === "original" || incomplete || !amounts ? trade : {
				...trade,
				buyPrice: formatMoney(amounts.buyPrice, false, amounts.buyPrice.currency === "KRW" ? 0 : 2),
				sellPrice: formatMoney(amounts.sellPrice, false, amounts.sellPrice.currency === "KRW" ? 0 : 2),
				proceeds: formatMoney(amounts.proceeds, false, amounts.proceeds.currency === "KRW" ? 0 : 2),
				pnl: formatMoney(amounts.pnl, true, amounts.pnl.currency === "KRW" ? 0 : 2)
			},
			available: amounts !== null
		};
	});
	function changeCurrency(next) {
		if (currencyDisplay === void 0) setLocalCurrencyDisplay(next);
		onCurrencyDisplayChange?.(next);
	}
	const [offset, setOffset] = (0, import_react.useState)(0);
	const cards = (0, import_react.useRef)([]);
	function move(next, focusCard = false) {
		if (next < 0 || next >= WEB_DEMO_TRADES.length || next === offset) return;
		setOffset(next);
		cards.current[next]?.scrollIntoView({
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
			block: "nearest",
			inline: "start"
		});
		if (focusCard) cards.current[next]?.focus({ preventScroll: true });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "web-demo-trade-notice",
		"aria-label": "최근 거래",
		"aria-roledescription": "carousel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "web-trade-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "web-trade-heading widget-metric-heading",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "최근 거래" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetMetricHelp, {
							label: "최근 거래 표시 기준",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "원통화: SK하이닉스·삼성전자 KRW, Apple USD. 거래 원본과 기록 초안은 표시 통화를 바꿔도 유지됩니다." }),
								verifiedQuote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									verifiedQuote.source,
									" · ",
									verifiedQuote.date,
									" · 1 USD = ",
									verifiedQuote.rate,
									" KRW"
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "검증된 환율 자료 미제공 · 원통화 기준" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "환율은 소수 12자리까지 검증하며 제공된 정밀도를 그대로 표시합니다. 원시 금액을 십진수로 환산하고 화면 금액은 KRW 정수·USD 소수 2자리로 반올림합니다." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "가상 거래 표시용, 환차손익 아님 · 체결 당시 환율이나 실시간 시세가 아닙니다. 실현손익·수익률은 매수가 대비 매도가 기준 · 수수료·세금 제외." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "web-trade-privacy",
							"aria-label": profitHidden ? "손익 금액·수익률 표시" : "손익 금액·수익률 숨기기",
							title: profitHidden ? "손익 금액·수익률 표시" : "손익 금액·수익률 숨기기",
							"aria-pressed": profitHidden,
							onClick: toggleProfit,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 24 24",
								width: "18",
								height: "18",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "12",
										cy: "12",
										r: "3"
									}),
									profitHidden && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3 3 18 18" })
								]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "web-trade-controls",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "거래 표시 통화",
							value: requestedCurrency,
							onChange: (event) => {
								const next = event.currentTarget.value;
								if (next === "original" || next === "KRW" || next === "USD") changeCurrency(next);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "original",
									children: "원통화"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "KRW",
									children: "KRW 통일"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "USD",
									children: "USD 통일"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "이전 거래",
							disabled: offset === 0,
							onClick: () => move(offset - 1),
							children: "‹"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "다음 거래",
							disabled: offset === WEB_DEMO_TRADES.length - 1,
							onClick: () => move(offset + 1),
							children: "›"
						})
					]
				})]
			}),
			requestedCurrency !== "original" && incomplete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "web-trade-currency-status",
				role: "status",
				children: "환산 자료 미제공 · 원통화 표시"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "web-trade-viewport",
				onKeyDown: (event) => {
					const next = event.key === "ArrowLeft" ? offset - 1 : event.key === "ArrowRight" ? offset + 1 : event.key === "Home" ? 0 : event.key === "End" ? WEB_DEMO_TRADES.length - 1 : null;
					if (next !== null) {
						event.preventDefault();
						move(next, true);
					}
				},
				children: presented.map(({ trade, view }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					ref: (node) => {
						cards.current[index] = node;
					},
					type: "button",
					className: "web-trade-card",
					"data-trade-record": trade.id,
					"aria-label": `${trade.instrument} ${trade.soldAt} ${trade.quantity}주 매도 기록하기`,
					onFocus: () => setOffset(index),
					onClick: (event) => onRecord(webDemoTradeExample(trade), event.currentTarget),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "web-trade-identity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockLogo, { position: {
								name: trade.instrument,
								instrumentId: trade.ticker,
								currency: trade.currency,
								market: trade.market
							} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: trade.instrument })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "web-trade-facts",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								"매도 ",
								trade.quantity,
								"주"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: trade.soldAt,
								children: trade.soldAt
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `web-trade-result ${trade.direction}`,
							title: "매수가 대비 매도가 기준 · 수수료·세금 제외",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: trade.direction === "gain" ? "실현이익" : "실현손실" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profitHidden ? "••••" : view.pnl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "web-trade-percent",
								children: profitHidden ? "숨김" : trade.returnPercent
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "web-trade-prices",
							children: [
								"매수 ",
								view.buyPrice,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "→"
								}),
								" 매도 ",
								view.sellPrice
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "web-trade-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: trade.account.split(" · ")[0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "web-trade-write",
								children: "기록하기"
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
								view.proceeds,
								" · 실현손익 ",
								profitHidden ? "숨김" : `${view.pnl} (${trade.returnPercent})`,
								" · 수수료·세금 제외"
							]
						})
					]
				}, trade.id))
			})
		]
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
		init_tradeMoney();
		init_StockLogo();
		init_WidgetMetricHelp();
		init_diary_trade_carousel();
		init_WebDemoTradeNotice();
		import_jsx_runtime = require_jsx_runtime();
		WEB_DEMO_TRADES = Object.freeze([
			Object.freeze({
				id: "web-demo-trade-amber",
				instrument: "SK하이닉스",
				ticker: "000660",
				currency: "KRW",
				market: "KRX",
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
				currency: "KRW",
				market: "KRX",
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
				currency: "USD",
				market: "US",
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
