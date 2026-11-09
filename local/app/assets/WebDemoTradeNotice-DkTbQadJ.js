import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CSsnt-5j.js";
import { a as StockLogo, o as init_StockLogo, r as init_currencyDisplay, s as init_diary_trade_carousel, t as convertMoney } from "./currencyDisplay-Cgvh38tY.js";
import { n as init_BrandDisplayContext, r as useBrandDisplayMode } from "./BrandDisplayContext-7FfB3p9j.js";
import { n as formatMoney } from "./format-C1zunbmg.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-wNLfWwOx.js";
/** Round half away from zero to hundredths, without binary float arithmetic. */
function demoTradeReturnPercent(raw) {
	if (!projectDemoTradeMoney(raw, "original", null)) return null;
	const buy = exactDecimal(raw.buyPrice), delta = exactDecimal(raw.sellPrice) - buy;
	const hundredths = ((delta < 0n ? -delta : delta) * 10000n + buy / 2n) / buy;
	return `${delta < 0n ? "−" : delta > 0n ? "+" : ""}${hundredths / 100n}.${String(hundredths % 100n).padStart(2, "0")}%`;
}
function exactDecimal(value) {
	if (typeof value !== "string" || !/^[-]?\d{1,24}(?:\.\d{1,12})?$/.test(value)) throw Error("invalid raw amount");
	const negative = value.startsWith("-");
	const [w, f = ""] = value.replace(/^-/, "").split(".");
	return (BigInt(w) * SCALE + BigInt(f.padEnd(12, "0"))) * (negative ? -1n : 1n);
}
/** Same fail-closed quote gate for conversion and its human-readable provenance. */
function validDemoTradeQuote(quote) {
	try {
		if (!quote || typeof quote.source !== "string" || !quote.source.trim() || quote.source.length > 500 || typeof quote.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(quote.date) || exactDecimal(quote.rate) <= 0n) return false;
		const date = Date.parse(quote.date + "T00:00:00Z");
		return Number.isFinite(date) && new Date(date).toISOString().slice(0, 10) === quote.date;
	} catch {
		return false;
	}
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
			if (!validDemoTradeQuote(quote)) return null;
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
			}),
			"web-demo-trade-dawn": Object.freeze({
				currency: "KRW",
				quantity: "5",
				buyPrice: "200000",
				sellPrice: "190000",
				proceeds: "950000",
				pnl: "-50000"
			}),
			"web-demo-trade-elm": Object.freeze({
				currency: "USD",
				quantity: "4",
				buyPrice: "200",
				sellPrice: "225",
				proceeds: "900",
				pnl: "100"
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
			l.href = "/local/app/css-source/src/features/journal/WebDemoTradeNotice.css?v=source-build-r156";
			document.head.appendChild(l);
		}
	})))();
}
function RecentTradeLogo({ trade }) {
	return useBrandDisplayMode() === "text-only" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockLogo, { position: {
		name: trade.instrument,
		instrumentId: trade.ticker,
		currency: trade.currency,
		market: trade.market
	} });
}
/** Passive fixed trade cards. Only an explicit card click starts an editable draft. */
function WebDemoTradeNotice({ onRecord, hideProfit, onHideProfitChange, currencyDisplay, fxQuote, accountAliases = {}, accountDefaultAliases = {} }) {
	const [localHideProfit, setLocalHideProfit] = (0, import_react.useState)(false);
	const profitHidden = hideProfit ?? localHideProfit;
	function toggleProfit() {
		const next = !profitHidden;
		if (hideProfit === void 0) setLocalHideProfit(next);
		onHideProfitChange?.(next);
	}
	const requestedCurrency = currencyDisplay ?? "original";
	const displayFx = fxQuote && validDemoTradeQuote(fxQuote) ? fxQuote : null;
	const projections = WEB_DEMO_TRADES.map((trade) => {
		const raw = DEMO_TRADE_RAW_MONEY[trade.id];
		return raw?.currency === trade.currency && raw.quantity === trade.quantity ? projectDemoTradeMoney(raw, requestedCurrency, fxQuote ?? null) : null;
	});
	const incomplete = projections.some((amounts) => amounts === null);
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
	const [selecting, setSelecting] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const selectedTrades = WEB_DEMO_TRADES.filter((trade) => selected.includes(trade.id));
	function toggleSelected(id) {
		setSelected((previous) => previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id]);
	}
	const cards = (0, import_react.useRef)([]);
	const viewport = (0, import_react.useRef)(null);
	const [bounds, setBounds] = (0, import_react.useState)({
		start: true,
		end: true
	});
	function syncScroll() {
		const node = viewport.current;
		if (!node) return;
		const max = Math.max(0, node.scrollWidth - node.clientWidth);
		const start = node.scrollLeft <= 1, end = node.scrollLeft >= max - 1;
		setBounds((previous) => previous.start === start && previous.end === end ? previous : {
			start,
			end
		});
	}
	(0, import_react.useEffect)(() => {
		syncScroll();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(syncScroll);
		if (viewport.current) observer.observe(viewport.current);
		cards.current.forEach((card) => {
			if (card) observer.observe(card);
		});
		return () => observer.disconnect();
	}, []);
	function scrollToPosition(target) {
		const node = viewport.current;
		if (!node) return;
		const max = Math.max(0, node.scrollWidth - node.clientWidth);
		const current = Math.max(0, Math.min(max, node.scrollLeft));
		const next = Math.max(0, Math.min(max, target));
		if (Math.abs(next - current) <= 1) {
			syncScroll();
			return;
		}
		node.scrollBy({
			left: next - current,
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
		});
		syncScroll();
	}
	function step(direction) {
		const node = viewport.current;
		if (!node) return;
		const edge = node.getBoundingClientRect().left + node.clientLeft;
		const rects = cards.current.flatMap((card) => card ? [card.getBoundingClientRect()] : []);
		const index = Math.max(0, rects.findIndex((rect) => rect.left + rect.width > edge + 1));
		const rect = rects[index];
		const stride = rects[index + 1] ? rects[index + 1].left - rect.left : rects[index - 1] ? rect.left - rects[index - 1].left : rect?.width ?? 0;
		scrollToPosition(node.scrollLeft + direction * stride);
	}
	function move(next) {
		const node = viewport.current, card = cards.current[next];
		if (!node || !card) return;
		scrollToPosition(next === 0 ? 0 : next === WEB_DEMO_TRADES.length - 1 ? node.scrollWidth - node.clientWidth : node.scrollLeft + card.getBoundingClientRect().left - node.getBoundingClientRect().left - node.clientLeft);
		card.focus({ preventScroll: true });
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
							label: "최근 거래 작성",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "최근 거래를 클릭하면 바로 복기를 작성할 수 있습니다." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "여러 거래를 함께 남기려면 여러 거래 선택을 누르세요." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "실현손익·수익률은 매수가 대비 매도가 기준이며 수수료·세금은 제외됩니다. 거래 원문은 작성 본문에 남습니다." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "원통화·KRW·USD 표시는 설정의 기본 표시 통화를 따릅니다. 표시 환산이며 환차손익 아님 · 원문 decimal은 소수 12자리까지 보존합니다." }),
								displayFx && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "web-trade-fx-basis",
									children: [
										"1 USD = ",
										displayFx.rate,
										" KRW · ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: displayFx.date,
											children: displayFx.date
										}),
										" · ",
										displayFx.source,
										" · 거래일 실시간 환율 아님"
									]
								})
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
						selecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "web-trade-selection",
							onClick: () => {
								setSelecting(false);
								setSelected([]);
							},
							children: "선택 취소"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "web-trade-selection",
							disabled: selectedTrades.length === 0,
							onClick: (event) => {
								const example = webDemoTradesExample(selectedTrades);
								if (example) onRecord(example, event.currentTarget);
							},
							children: [
								"선택한 ",
								selectedTrades.length,
								"건 작성"
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "web-trade-selection",
							onClick: () => setSelecting(true),
							children: "여러 거래 선택"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "이전 거래",
							disabled: bounds.start,
							onClick: () => step(-1),
							children: "‹"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "다음 거래",
							disabled: bounds.end,
							onClick: () => step(1),
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
				ref: (node) => {
					viewport.current = node;
				},
				onScroll: syncScroll,
				onKeyDown: (event) => {
					const focused = cards.current.findIndex((card) => card?.contains(event.target));
					if (focused < 0) return;
					const next = event.key === "ArrowLeft" ? focused - 1 : event.key === "ArrowRight" ? focused + 1 : event.key === "Home" ? 0 : event.key === "End" ? WEB_DEMO_TRADES.length - 1 : null;
					if (next !== null) {
						event.preventDefault();
						if (next >= 0 && next < WEB_DEMO_TRADES.length) move(next);
					}
				},
				children: presented.map(({ trade, view }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					ref: (node) => {
						cards.current[index] = node;
					},
					type: "button",
					className: "web-trade-card",
					"data-trade-record": trade.id,
					"aria-label": `${trade.instrument} ${trade.soldAt} ${trade.quantity}주 매도 ${selecting ? "선택" : "복기 작성"}`,
					"aria-pressed": selecting ? selected.includes(trade.id) : void 0,
					onClick: (event) => selecting ? toggleSelected(trade.id) : onRecord(webDemoTradeExample(trade), event.currentTarget),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "web-trade-side",
							children: [
								"매도 ",
								trade.quantity,
								"주",
								selecting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "web-trade-selection-mark",
									"aria-hidden": "true",
									children: selected.includes(trade.id) ? " ✓" : " ○"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "web-trade-identity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentTradeLogo, { trade }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: trade.instrument })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "web-trade-facts",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: trade.soldAt,
								children: trade.soldAt
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `web-trade-result ${trade.direction}`,
							title: "매수가 대비 매도가 기준 · 수수료·세금 제외",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "실현손익" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profitHidden ? "••••" : view.pnl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "web-trade-percent",
								children: profitHidden ? "숨김" : demoTradeReturnPercent(DEMO_TRADE_RAW_MONEY[trade.id]) ?? "—"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "web-trade-footer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: (() => {
								const alias = accountAliases[trade.accountId] ?? accountDefaultAliases[trade.accountId];
								return `${trade.account.split(" · ")[0]}${alias ? " · " + alias : ""}`;
							})() })
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
/** Web examples stay plain text: never manufacture a broker trade link. */
function webDemoTradesExample(trades) {
	if (trades.length === 0) return null;
	const recordDate = trades.reduce((latest, trade) => trade.recordDate > latest ? trade.recordDate : latest, trades[0].recordDate);
	return {
		id: `web-demo-trades:${trades.map((trade) => trade.id).join(",")}`,
		title: `${Number(recordDate.slice(5, 7))}월 ${Number(recordDate.slice(8))}일 거래 ${trades.length}건 복기`,
		recordDate,
		body: trades.map((trade) => webDemoTradeExample(trade).body).join("\n---\n\n")
	};
}
var import_react, import_jsx_runtime, WEB_DEMO_TRADES;
function init_WebDemoTradeNotice$1() {
	return (init_WebDemoTradeNotice$1 = __esmMin((() => {
		import_react = require_react();
		init_tradeMoney();
		init_StockLogo();
		init_BrandDisplayContext();
		import_jsx_runtime = require_jsx_runtime();
		init_WidgetMetricHelp();
		init_diary_trade_carousel();
		init_WebDemoTradeNotice();
		WEB_DEMO_TRADES = Object.freeze([
			Object.freeze({
				id: "web-demo-trade-amber",
				instrument: "SK하이닉스",
				ticker: "000660",
				currency: "KRW",
				market: "KRX",
				logo: "/local/app/logos/skhynix-official.png",
				accountId: "kiwoom-1001",
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
				accountId: "kiwoom-1001",
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
				accountId: "toss-1001",
				account: "토스 · ••••1001",
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
			}),
			Object.freeze({
				id: "web-demo-trade-dawn",
				instrument: "SK하이닉스",
				ticker: "000660",
				currency: "KRW",
				market: "KRX",
				logo: "/local/app/logos/skhynix-official.png",
				accountId: "kiwoom-1001",
				account: "키움 · ••••1001",
				quantity: "5",
				buyPrice: "200,000원",
				sellPrice: "190,000원",
				proceeds: "950,000원",
				pnl: "−50,000원",
				returnPercent: "−5.00%",
				direction: "loss",
				boughtAt: "2026-10-27",
				soldAt: "2026-11-06",
				recordDate: "2026-11-06",
				question: "매도 기준을 지켰나요?"
			}),
			Object.freeze({
				id: "web-demo-trade-elm",
				instrument: "Apple",
				ticker: "AAPL",
				currency: "USD",
				market: "US",
				logo: "/local/app/logos/apple.svg",
				accountId: "toss-1001",
				account: "토스 · ••••1001",
				quantity: "4",
				buyPrice: "200.00 USD",
				sellPrice: "225.00 USD",
				proceeds: "900.00 USD",
				pnl: "+100.00 USD",
				returnPercent: "+12.50%",
				direction: "gain",
				boughtAt: "2026-10-28",
				soldAt: "2026-11-06",
				recordDate: "2026-11-06",
				question: "다음에도 유지할 판단은 무엇인가요?"
			})
		]);
	})))();
}
init_WebDemoTradeNotice$1();
export { WebDemoTradeNotice };
