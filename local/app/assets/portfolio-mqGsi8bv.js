import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function createWebPortfolio(createAppDemo) {
	if (typeof createAppDemo !== "function") throw TypeError("An explicit App demo factory is required");
	return (scenario) => {
		const source = createAppDemo(scenario);
		if (source?.mode !== "demo" || !Array.isArray(source.accounts) || !source.accounts.every((a) => typeof a.id === "string" && a.id.startsWith("demo-"))) throw TypeError("Only synthetic App snapshots are accepted");
		const s = structuredClone(source);
		s.positions = s.positions.map((p) => ({
			...p,
			instrumentId: instruments[p.instrumentId] ?? p.instrumentId
		}));
		return s;
	};
}
var WEB_DEMO_FX, instruments;
function init_portfolio() {
	return (init_portfolio = __esmMin((() => {
		WEB_DEMO_FX = Object.freeze({
			rate: "1350",
			date: "2026-10-20",
			source: "StockPin 가상 환율"
		});
		instruments = Object.freeze({
			"DEMO-SAMSUNG": "005930",
			"DEMO-SKHYNIX": "000660",
			"DEMO-HYUNDAI": "005380",
			"DEMO-KODEX": "069500",
			"DEMO-MSFT": "MSFT",
			"DEMO-AAPL": "AAPL"
		});
	})))();
}
init_portfolio();
export { WEB_DEMO_FX, createWebPortfolio };
