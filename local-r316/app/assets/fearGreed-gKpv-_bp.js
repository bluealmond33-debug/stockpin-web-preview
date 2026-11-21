import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
function init_market_metric_note() {
	return (init_market_metric_note = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-metric-note.css?v=source-build-r311";
			document.head.appendChild(l);
		}
	})))();
}
/** Show the actual received timestamp, never the render clock. */
function MarketMetricNote({ meaning, observedAt, source }) {
	let stamp = "—";
	if (observedAt) try {
		stamp = new Intl.DateTimeFormat("sv-SE", {
			timeZone: "Asia/Seoul",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			hourCycle: "h23"
		}).format(new Date(observedAt)).replaceAll("-", ".");
	} catch {}
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "market-metric-note",
		children: [meaning && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
			className: "market-metric-note-meaning",
			children: meaning
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "market-metric-note-meta",
			children: [
				stamp === "—" ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					"aria-label": "확인 시각 없음",
					children: "—"
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("time", {
					dateTime: observedAt,
					children: stamp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					"aria-hidden": "true",
					children: "·"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
					href: source,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "출처"
				})
			]
		})]
	});
}
var import_jsx_runtime$1;
function init_MarketMetricNote() {
	return (init_MarketMetricNote = __esmMin((() => {
		init_market_metric_note();
		import_jsx_runtime$1 = require_jsx_runtime();
	})))();
}
function init_sentiment_dial() {
	return (init_sentiment_dial = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/sentiment-dial.css?v=source-build-r311";
			document.head.appendChild(l);
		}
	})))();
}
/** Shared geometry only: VIX retains its raw value and its own display scale. */
function Dial({ value, label, volatility = false, syntheticClassification = false }) {
	const known = value !== null && Number.isFinite(value) && value >= 0 && (volatility || value <= 100);
	const maximum = volatility ? 80 : 100;
	const overflow = known && value > maximum;
	const bands = volatility ? volatilityBands : sentimentBands;
	const band = known ? bands.findIndex((item) => item.inclusive ? Math.min(value, maximum) <= item.end : Math.min(value, maximum) < item.end) : -1;
	const active = band >= 0 ? bands[band] : null;
	const state = !known ? "미확인" : volatility ? overflow ? "척도 초과" : "변동성" : syntheticClassification ? active.label : "";
	const description = !known ? "미확인" : volatility ? `${value} · 표시 척도 0–80${overflow ? " · 척도 초과" : ""}` : `${value} / 100 · 0 공포, 100 탐욕${syntheticClassification ? ` · ${state} · 예시 구간, 공식 분류 아님` : ""}`;
	const [x, y] = point(known ? Math.min(value, maximum) / maximum * 100 : 0, 54);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `sentiment-dial-control${volatility ? " volatility-dial" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "sentiment-dial",
				viewBox: "0 -26 180 112",
				tabIndex: 0,
				role: volatility || !known ? "img" : "meter",
				"aria-label": volatility || !known ? `${label}: ${description}` : label,
				"aria-valuemin": !volatility && known ? 0 : void 0,
				"aria-valuemax": !volatility && known ? 100 : void 0,
				"aria-valuenow": !volatility && known ? value : void 0,
				"aria-valuetext": !volatility && known ? description : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					"aria-hidden": "true",
					children: [
						bands.map(({ start, end, color }, index) => {
							const [sx, sy] = point(start / maximum * 100, 64), [ex, ey] = point(end / maximum * 100, 64);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								className: `sentiment-dial__arc sentiment-dial__arc--${index}`,
								stroke: color,
								"data-start": start,
								"data-end": end,
								d: `M ${sx} ${sy} A 64 64 0 0 1 ${ex} ${ey}`
							}, start);
						}),
						ticks.map((tick) => {
							const [x1, y1] = point(tick, 59), [x2, y2] = point(tick, 69), [tx, ty] = point(tick, 80);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								className: "sentiment-dial__tick",
								x1,
								y1,
								x2,
								y2
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								className: "sentiment-dial__scale",
								x: tx,
								y: ty + 3,
								children: tick / 100 * maximum
							})] }, tick);
						}),
						known && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							className: "sentiment-dial__needle",
							stroke: active?.color,
							x1: 90,
							y1: 74,
							x2: x,
							y2: y
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sentiment-dial__value",
				"aria-hidden": "true",
				children: known ? value : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sentiment-dial-state",
				"data-band": !known ? "unknown" : volatility ? "volatility" : band,
				style: { color: active?.color },
				children: state
			})
		]
	});
}
/** Display-only 0–100 sentiment score. Not a VIX normalizer. */
function SentimentDial(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dial, { ...props });
}
/** Raw volatility index on a display scale, not a bounded sentiment meter. */
function VolatilityDial(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dial, {
		...props,
		volatility: true
	});
}
var import_jsx_runtime, ticks, sentimentBands, volatilityBands, point;
function init_SentimentDial() {
	return (init_SentimentDial = __esmMin((() => {
		init_sentiment_dial();
		import_jsx_runtime = require_jsx_runtime();
		ticks = [
			0,
			25,
			50,
			75,
			100
		];
		sentimentBands = [
			{
				start: 0,
				end: 25,
				label: "극도 공포",
				color: "#5276d2"
			},
			{
				start: 25,
				end: 45,
				label: "공포",
				color: "#8299dc"
			},
			{
				start: 45,
				end: 55,
				label: "중립",
				color: "#c7ad75",
				inclusive: true
			},
			{
				start: 55,
				end: 75,
				label: "탐욕",
				color: "#df8a55"
			},
			{
				start: 75,
				end: 100,
				label: "극도 탐욕",
				color: "#dd5c61",
				inclusive: true
			}
		];
		volatilityBands = [
			"#8c9ca7",
			"#a6a49a",
			"#c3ad7c",
			"#d69a59"
		].map((color, index) => ({
			start: index * 20,
			end: (index + 1) * 20,
			color,
			label: "변동성",
			inclusive: index === 3
		}));
		point = (value, radius) => {
			const angle = value * Math.PI / 100;
			return [Number((90 - radius * Math.cos(angle)).toFixed(6)), Number((74 - radius * Math.sin(angle)).toFixed(6))];
		};
	})))();
}
function instant(v) {
	if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(v)) throw Error("invalid");
	const t = Date.parse(v);
	if (!Number.isFinite(t) || new Date(t).toISOString().replace(".000Z", "Z") !== v) throw Error("invalid");
	return t;
}
function parseFearQuote(value, now) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("invalid");
	const q = value;
	if (Object.keys(q).sort().join(",") !== "asOf,classification,kind,nextUpdateAt,observedAt,sourceUrl,value" || q.kind !== "alternative_bitcoin_fng_v1" || q.sourceUrl !== "https://alternative.me/crypto/fear-and-greed-index/" || !Number.isInteger(q.value) || Number(q.value) < 0 || Number(q.value) > 100 || typeof q.classification !== "string" || !Object.hasOwn(FEAR_LABELS, q.classification)) throw Error("invalid");
	const source = instant(q.asOf), observed = instant(q.observedAt), next = instant(q.nextUpdateAt);
	if (source > observed || observed > Date.parse(now) || !Number.isFinite(Date.parse(now)) || next < observed || next - observed > 1728e5) throw Error("invalid");
	return { ...q };
}
function coalescedFearRequest(load) {
	let flight = null;
	return () => {
		if (flight) return flight;
		flight = Promise.resolve().then(load).finally(() => {
			flight = null;
		});
		return flight;
	};
}
function fearQuoteIsStale(q, clock) {
	const now = Date.parse(clock);
	return now - Date.parse(q.asOf) > 1296e5 || now > Date.parse(q.nextUpdateAt) + 36e5;
}
var FEAR_KEY, FEAR_SOURCE, FEAR_LABELS, FearGreedReader;
function init_fearGreed() {
	return (init_fearGreed = __esmMin((() => {
		FEAR_KEY = "stockpin:bitcoin-fear-greed:v1";
		FEAR_SOURCE = "https://alternative.me/crypto/fear-and-greed-index/";
		FEAR_LABELS = {
			"Extreme Fear": "극단적 공포",
			Fear: "공포",
			Neutral: "중립",
			Greed: "탐욕",
			"Extreme Greed": "극단적 탐욕"
		};
		FearGreedReader = class {
			storage;
			fetchQuote;
			clock;
			state = {
				quote: null,
				busy: false,
				blocked: false,
				error: null
			};
			listeners = /* @__PURE__ */ new Set();
			disposed = false;
			floor;
			constructor(storage, fetchQuote, clock) {
				this.storage = storage;
				this.fetchQuote = fetchQuote;
				this.clock = clock;
				this.floor = Date.parse(clock());
				try {
					const raw = storage.getItem(FEAR_KEY);
					if (raw !== null) {
						if (raw.length > 4096) throw Error("invalid");
						this.state.quote = parseFearQuote(JSON.parse(raw), clock());
					}
				} catch {
					this.state = {
						...this.state,
						blocked: true,
						error: "저장된 시장 심리를 확인할 수 없습니다. 원본은 유지합니다."
					};
				}
			}
			subscribe(listener) {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			}
			update(state) {
				this.state = state;
				for (const listener of this.listeners) listener();
			}
			async refresh() {
				if (this.disposed || this.state.busy || this.state.blocked) return;
				if (!Number.isFinite(Date.parse(this.clock())) || Date.parse(this.clock()) < this.floor) {
					this.update({
						...this.state,
						error: "기기 시각을 확인해 주세요. 이전 값은 유지합니다."
					});
					return;
				}
				this.floor = Date.parse(this.clock());
				let expected;
				try {
					expected = this.storage.getItem(FEAR_KEY);
				} catch {
					this.update({
						...this.state,
						blocked: true,
						error: "저장값을 확인할 수 없습니다. 이전 값은 유지합니다."
					});
					return;
				}
				this.update({
					...this.state,
					busy: true,
					error: null
				});
				try {
					const wire = await this.fetchQuote();
					if (this.disposed) return;
					const quote = parseFearQuote(wire, this.clock());
					if (Date.parse(this.clock()) < this.floor) throw Error("clock");
					const old = this.state.quote;
					if (old && (Date.parse(quote.asOf) < Date.parse(old.asOf) || Date.parse(quote.observedAt) < Date.parse(old.observedAt))) throw Error("older");
					if (this.storage.getItem("stockpin:bitcoin-fear-greed:v1") !== expected) {
						this.update({
							...this.state,
							blocked: true,
							error: "다른 창에서 시장 자료가 바뀌었습니다. 페이지를 다시 열어 확인해 주세요."
						});
						return;
					}
					try {
						this.storage.setItem(FEAR_KEY, JSON.stringify(quote));
					} catch {
						this.update({
							...this.state,
							blocked: true,
							error: "시장 자료를 저장하지 못했습니다. 이전 값은 유지합니다."
						});
						return;
					}
					this.update({
						quote,
						busy: false,
						blocked: false,
						error: null
					});
				} catch {
					if (!this.disposed) this.update({
						...this.state,
						error: "시장 심리를 갱신하지 못했습니다. 이전 값은 유지합니다."
					});
				} finally {
					if (!this.disposed && this.state.busy) this.update({
						...this.state,
						busy: false
					});
				}
			}
			dispose() {
				this.disposed = true;
				this.listeners.clear();
			}
		};
	})))();
}
export { fearQuoteIsStale as a, VolatilityDial as c, init_MarketMetricNote as d, coalescedFearRequest as i, init_SentimentDial as l, FEAR_SOURCE as n, init_fearGreed as o, FearGreedReader as r, SentimentDial as s, FEAR_LABELS as t, MarketMetricNote as u };
