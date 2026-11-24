import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
function init_reference_rate_details() {
	return (init_reference_rate_details = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/reference-rate-details.css?v=source-build-r50019";
			document.head.appendChild(l);
		}
	})))();
}
/** Display geometry only: no dates, source values, resampling or persisted data.
* Monotone Hermite tangents are limited to keep both Bézier controls inside
* each pair's y range. The convex hull then forbids invented high/low extrema.
*/
function curveEdges(points) {
	if (points.some((p, i) => !Number.isFinite(p.x) || !Number.isFinite(p.y) || i > 0 && p.x <= points[i - 1].x)) return [];
	if (points.length < 2) return [];
	const slopes = points.slice(1).map((p, i) => (p.y - points[i].y) / (p.x - points[i].x));
	const tangents = points.map((_, i) => {
		if (i === 0) return slopes[0];
		if (i === points.length - 1) return slopes[i - 1];
		const a = slopes[i - 1], b = slopes[i];
		return a * b <= 0 ? 0 : 2 / (1 / a + 1 / b);
	});
	for (let i = 0; i < slopes.length; i++) {
		const slope = slopes[i];
		if (slope === 0) {
			tangents[i] = 0;
			tangents[i + 1] = 0;
			continue;
		}
		const limit = 3 * Math.abs(slope);
		for (const j of [i, i + 1]) tangents[j] = Math.sign(slope) * Math.min(Math.abs(tangents[j]), limit);
	}
	return slopes.map((_, i) => {
		const a = points[i], b = points[i + 1], dx = (b.x - a.x) / 3;
		const low = Math.min(a.y, b.y), high = Math.max(a.y, b.y);
		const clamp = (y) => Math.max(low, Math.min(high, y));
		return `C ${a.x + dx},${clamp(a.y + dx * tangents[i])} ${b.x - dx},${clamp(b.y - dx * tangents[i + 1])} ${key(b)}`;
	});
}
function smoothChartPath(points) {
	const edges = curveEdges(points);
	return edges.length ? `M ${key(points[0])} ${edges.join(" ")}` : "";
}
/** Preserve the source's solid segments; classify only missing edges as bridges.
* Shared tangents keep the visual curve continuous across the dashed bridges.
* Singleton observations remain markers, and can bound a missing edge.
*/
function smoothIndexChart(segments, points) {
	const groups = segments.map(parse);
	const all = points ?? groups.flat();
	const edges = curveEdges(all);
	const edgeMap = /* @__PURE__ */ new Map();
	for (let i = 0; i < edges.length; i++) edgeMap.set(`${key(all[i])}|${key(all[i + 1])}`, edges[i]);
	const solidEdges = /* @__PURE__ */ new Set();
	return {
		curves: groups.map((group, index) => {
			const commands = group.slice(1).map((p, i) => {
				const edge = `${key(group[i])}|${key(p)}`;
				solidEdges.add(edge);
				return edgeMap.get(edge) ?? "";
			});
			return {
				source: segments[index],
				d: group.length > 1 && commands.every(Boolean) ? `M ${key(group[0])} ${commands.join(" ")}` : ""
			};
		}),
		bridges: edges.flatMap((edge, i) => solidEdges.has(`${key(all[i])}|${key(all[i + 1])}`) ? [] : [`M ${key(all[i])} ${edge}`])
	};
}
var key, parse;
function init_smoothChartPath() {
	return (init_smoothChartPath = __esmMin((() => {
		key = (p) => `${p.x},${p.y}`;
		parse = (segment) => segment.trim() ? segment.trim().split(/\s+/).map((pair) => {
			const [x, y] = pair.split(",").map(Number);
			return {
				x,
				y
			};
		}) : [];
	})))();
}
function init_sentiment_dial() {
	return (init_sentiment_dial = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/sentiment-dial.css?v=source-build-r50019";
			document.head.appendChild(l);
		}
	})))();
}
function Dial({ value, label, volatility = false, syntheticClassification = false, sourceClassification, stateHelp }) {
	const known = value !== null && Number.isFinite(value) && value >= 0 && (volatility || value <= 100);
	const maximum = volatility ? 80 : 100;
	const overflow = known && value > maximum;
	const bands = volatility ? volatilityBands : sentimentBands;
	const band = known ? bands.findIndex((item) => item.inclusive ? Math.min(value, maximum) <= item.end : Math.min(value, maximum) < item.end) : -1;
	const active = band >= 0 ? bands[band] : null;
	const sourceIndex = sourceClassification ? sourceBand(sourceClassification) : -1;
	const matched = !sourceClassification || sourceIndex === band;
	const state = !known ? "미확인" : volatility ? overflow ? "척도 초과" : "변동성" : sourceIndex >= 0 ? [
		"극도의 공포",
		"공포",
		"중립",
		"탐욕",
		"극도의 탐욕"
	][sourceIndex] : syntheticClassification ? active.label : "";
	const stateColor = matched ? active?.color : void 0;
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
								style: { stroke: color },
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
							stroke: matched ? active?.color : void 0,
							style: { stroke: matched ? active?.color : "var(--bright, #e5e7eb)" },
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sentiment-dial-state-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sentiment-dial-state",
					"data-band": !known ? "unknown" : volatility ? "volatility" : matched ? band : "unconfirmed",
					style: { color: stateColor },
					children: state
				}), stateHelp]
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
var import_jsx_runtime, ticks, sentimentBands, volatilityBands, point, sourceBand, SENTIMENT_BAND_NOTE;
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
		sourceBand = (classification) => [
			"extreme fear",
			"fear",
			"neutral",
			"greed",
			"extreme greed"
		].indexOf(classification.toLowerCase());
		SENTIMENT_BAND_NOTE = "표시 색띠는 0–25 / 25–45 / 45–55 / 55–75 / 75–100의 예시 구간입니다. 중립 띠가 좁은 이유는 45–55 폭을 쓰기 때문이며, 공급자의 공식 경계로 확인된 것이 아닙니다. 55는 중립에 포함합니다. 원천 등급과 표시 구간이 다르면 색 판정을 하지 않습니다.";
	})))();
}
export { init_smoothChartPath as a, init_reference_rate_details as c, init_SentimentDial as i, SentimentDial as n, smoothChartPath as o, VolatilityDial as r, smoothIndexChart as s, SENTIMENT_BAND_NOTE as t };
