import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CSsnt-5j.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-BqwcScuB.js";
import { S as ReferenceRateRows, w as init_ReferenceRatesTable } from "./market-page-C-NQBwZZ.js";
import { a as PublicReferenceDetail, f as decodePublicReferenceRelease, i as referenceObservationDates, m as projectPublicReference, n as init_PublicReferenceMarket, p as init_contract, r as referenceGeometry } from "./PublicReferenceMarket-D73dlSvM.js";
/** Public source only. Missing permission/data never borrows the fixed-demo feed. */
function PublicMarketWidget({ id, release }) {
	const [open, setOpen] = (0, import_react.useState)(false), opener = (0, import_react.useRef)(null);
	const label = labels[id] ?? "시장 지표";
	if (id !== "usdkrw") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "market-widget",
		"data-market-mode": "public",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: label }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "market-empty",
			children: "공급 미연결"
		})]
	});
	let r;
	try {
		r = decodePublicReferenceRelease(release);
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "market-widget",
			"data-market-mode": "public",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: "참고환율 확인 필요"
			})]
		});
	}
	const v = projectPublicReference(r, "usdkrw", "30d"), chart = referenceGeometry(v.points, 96, 32, referenceObservationDates(r));
	const f = (n) => new Intl.NumberFormat("ko-KR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(n);
	const signed = (n) => (n > 0 ? "+" : "") + f(n);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "market-widget reference-rates-table",
		"data-market-mode": "public",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetMetricHelp, {
				label: "달러/원 출처",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ECB 원문으로 StockPin이 계산한 정보용 일별 참고율입니다. 거래용 환율이 아닙니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"같은 날짜 KRW/EUR ÷ USD/EUR. 자료일 ",
						r.daily.observations[0].date,
						", 원문 수신 ",
						r.daily.observedAt,
						". 자동 갱신 서비스가 아닌 저장된 발표 자료입니다."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: r.daily.sourceUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "ECB 무료 원본"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceRateRows, {
				rows: [{
					id: "usdkrw",
					label: "달러/원",
					unit: "원",
					value: v.value === null ? "—" : f(v.value),
					valueTitle: v.value === null ? "미제공" : `1 USD = ${v.value} KRW`,
					segments: chart.segments,
					trendTitle: `${v.start}–${v.end} 실제 일별 관측 · 원천 관측값을 이은 선 · 관측 없는 날짜 값은 미제공 · 보간 없음`,
					direction: v.change === null ? "unknown" : v.change > 0 ? "up" : v.change < 0 ? "down" : "flat",
					change: v.change === null ? "등락 미확인" : `${signed(v.change)}원 (${signed(v.percent)}%)`,
					comparison: v.comparisonDate ? `${v.comparisonDate} 발표 대비` : null
				}],
				onOpen: (_, button) => {
					opener.current = button;
					setOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "market-fx-caption",
				children: ["ECB 기반 계산 참고율 · ", r.daily.observations[0].date]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicReferenceDetail, {
				release: r,
				pairId: "usdkrw",
				onClose: () => {
					setOpen(false);
					opener.current?.focus();
				}
			})
		]
	});
}
var import_react, import_jsx_runtime, labels;
function init_PublicMarketWidget() {
	return (init_PublicMarketWidget = __esmMin((() => {
		import_react = require_react();
		init_ReferenceRatesTable();
		init_WidgetMetricHelp();
		init_PublicReferenceMarket();
		init_contract();
		import_jsx_runtime = require_jsx_runtime();
		labels = {
			kospi: "코스피",
			kosdaq: "코스닥",
			sp500: "S&P 500",
			nasdaq: "나스닥",
			dow: "다우존스",
			usdkrw: "달러/원",
			vix: "VIX"
		};
	})))();
}
init_PublicMarketWidget();
export { PublicMarketWidget };
