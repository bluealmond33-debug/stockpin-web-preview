import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
import { a as init_MarketHeatmap, i as MARKET_UNIVERSES, n as IndependentHeatmapPanels, r as init_HeatmapExplorer } from "./HeatmapExplorer-D3hxhNLB.js";
/** UI selection is usable; market-wide display rights/supply remain unconnected. */
function PublicHeatmapExplorer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndependentHeatmapPanels, {
		panels,
		sources: disconnected
	});
}
var import_jsx_runtime, panels, disconnected;
function init_PublicHeatmapExplorer() {
	return (init_PublicHeatmapExplorer = __esmMin((() => {
		init_HeatmapExplorer();
		init_MarketHeatmap();
		import_jsx_runtime = require_jsx_runtime();
		panels = [{
			id: "market-left",
			label: "지도 1",
			available: MARKET_UNIVERSES,
			initialMarket: "kospi"
		}, {
			id: "market-right",
			label: "지도 2",
			available: MARKET_UNIVERSES,
			initialMarket: "sp500"
		}];
		disconnected = Object.freeze({});
	})))();
}
init_PublicHeatmapExplorer();
export { PublicHeatmapExplorer };
