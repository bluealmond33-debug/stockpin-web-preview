import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D3ER87f6.js";
import { a as init_WebDemoMarketModel, c as init_ReferenceRatesTable, n as init_WebDemoMarketDetails, o as ReferenceRateRows, r as WEB_DEMO_CAPTION, t as WebDemoMarketDetails } from "./WebDemoMarketDetails-BzujGOXi.js";
/** Web-only supplied presentation. Provider admission stays with the supplier. */
function WebDemoMarketWidget({ row, series }) {
	const [detail, setDetail] = (0, import_react.useState)(null);
	const opener = (0, import_react.useRef)(null);
	const open = (id, button) => {
		opener.current = button;
		setDetail(id);
	};
	const close = () => {
		setDetail(null);
		if (opener.current?.isConnected && !opener.current.disabled) opener.current.focus();
	};
	const ready = row.status === "ready" && row.value !== null;
	const hasChange = ready && row.change !== null && row.percent !== null;
	const presentation = {
		id: row.id,
		label: row.label,
		value: ready ? row.displayValue : "미확인",
		valueTitle: !ready ? "가상 값 미확인" : row.category === "fx" ? `${row.baseAmount} ${row.base} = ${row.value} ${row.quote} · 가상` : `${row.value} ${row.unit} · 가상`,
		unit: row.unit,
		segments: ready ? row.mini.segments : [],
		trendTitle: `${WEB_DEMO_CAPTION} · 최근 30일 가상 표본`,
		direction: hasChange ? row.direction : "unknown",
		change: hasChange ? `${row.change} ${row.unit} (${row.percent})` : "등락 미확인",
		comparison: hasChange && row.comparisonDate ? `${row.comparisonDate} 가상 값 대비` : null
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "reference-rates-table web-demo-market-widget",
		"aria-label": `${row.label} 가상 위젯`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceRateRows, {
				rows: [presentation],
				onOpen: open
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "reference-rate-comparison",
				children: WEB_DEMO_CAPTION
			}),
			detail === row.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebDemoMarketDetails, {
				row,
				series,
				onClose: close
			}, row.id)
		]
	});
}
var import_react, import_jsx_runtime;
function init_WebDemoMarketWidget() {
	return (init_WebDemoMarketWidget = __esmMin((() => {
		import_react = require_react();
		init_WebDemoMarketDetails();
		init_ReferenceRatesTable();
		init_WebDemoMarketModel();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
init_WebDemoMarketWidget();
export { WebDemoMarketWidget };
