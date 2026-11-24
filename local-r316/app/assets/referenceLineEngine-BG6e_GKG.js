import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function referenceLineSegments(points, dates) {
	const valid = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s;
	const indices = /* @__PURE__ */ new Map();
	let previous = "";
	for (const [index, date] of dates.entries()) {
		if (!valid(date) || date <= previous) throw TypeError("관측 날짜 확인 필요");
		indices.set(date, index);
		previous = date;
	}
	const segments = [];
	let last = -2;
	previous = "";
	for (const point of points) {
		const index = indices.get(point.date);
		if (!valid(point.date) || point.date <= previous || index === void 0 || !Number.isFinite(point.value) || point.value <= 0) throw TypeError("참고환율 관측 확인 필요");
		if (index !== last + 1) segments.push([]);
		segments.at(-1).push({
			time: point.date,
			value: point.value
		});
		last = index;
		previous = point.date;
	}
	return segments;
}
/** Engine/style lineage: legacy useChartEngine + chart-colors; only LineSeries is admitted.
* The legacy network/events/compare/trade hooks and OHLC/volume contract are not reused.
*/
function createReferenceLineChart(container, points, dates, options, load = () => import("./lightweight-charts.standalone.production-C-pEwC0Q.js")) {
	const segments = referenceLineSegments(points, dates);
	let disposed = false, chart = null;
	const destroy = () => {
		if (disposed) return;
		disposed = true;
		chart?.remove();
		chart = null;
	};
	return {
		ready: load().then((engine) => {
			if (disposed) return false;
			try {
				chart = engine.createChart(container, {
					autoSize: true,
					layout: {
						background: { color: options.dark ? "#111111" : "#F8F8F9" },
						textColor: options.dark ? "#C1C1C1" : "#3E3E3F",
						fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
						fontSize: 12,
						attributionLogo: true
					},
					grid: {
						vertLines: { visible: false },
						horzLines: { visible: false }
					},
					rightPriceScale: {
						borderVisible: false,
						entireTextOnly: true,
						scaleMargins: {
							top: .08,
							bottom: .08
						}
					},
					timeScale: {
						borderVisible: false,
						timeVisible: false,
						rightOffset: 0
					},
					crosshair: { mode: engine.CrosshairMode.Magnet },
					localization: { locale: "ko-KR" },
					handleScale: {
						mouseWheel: true,
						pinch: true,
						axisPressedMouseMove: {
							time: true,
							price: false
						}
					},
					handleScroll: {
						mouseWheel: true,
						pressedMouseMove: true,
						horzTouchDrag: true,
						vertTouchDrag: false
					}
				});
				segments.forEach((data, index) => {
					chart.addSeries(engine.LineSeries, {
						color: options.direction === "up" ? "#e05a5a" : options.direction === "down" ? "#5a7fe0" : options.dark ? "#C1C1C1" : "#01A525",
						lineWidth: 2,
						lineVisible: data.length > 1,
						priceLineVisible: false,
						lastValueVisible: index === segments.length - 1,
						pointMarkersVisible: data.length === 1,
						priceFormat: {
							type: "custom",
							minMove: 1e-8,
							formatter: (value) => {
								if (value > 0 && value < (options.digits === 0 ? 1 : .01)) return options.digits === 0 ? "<1" : "<0.01";
								return new Intl.NumberFormat("ko-KR", {
									minimumFractionDigits: options.digits,
									maximumFractionDigits: options.digits
								}).format(value);
							}
						}
					}).setData(data);
				});
				chart.timeScale().fitContent();
				return true;
			} catch (error) {
				chart?.remove();
				chart = null;
				throw error;
			}
		}),
		destroy,
		fit: () => chart?.timeScale().fitContent()
	};
}
function init_referenceLineEngine() {
	return (init_referenceLineEngine = __esmMin((() => {})))();
}
export { init_referenceLineEngine as n, referenceLineSegments as r, createReferenceLineChart as t };
