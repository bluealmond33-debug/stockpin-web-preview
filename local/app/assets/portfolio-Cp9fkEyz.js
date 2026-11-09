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
		const domestic = s.accounts.find((a) => a.id === "demo-kiwoom"), foreign = s.accounts.find((a) => a.id === "demo-toss");
		if (domestic && foreign) {
			domestic.maskedLabel = "키움증권 · ••••1001";
			foreign.maskedLabel = "토스증권 · ••••1001";
			const income = {
				...foreign,
				id: "demo-kiwoom-income",
				provider: "kiwoom",
				maskedLabel: "키움증권 · ••••2002"
			};
			s.accounts.splice(s.accounts.indexOf(foreign), 0, income);
			s.positions = s.positions.map((p) => p.accountId === "demo-toss" && p.instrumentId === "MSFT" ? {
				...p,
				accountId: income.id,
				provider: "kiwoom"
			} : p);
			const balance = s.balances.find((b) => b.accountId === "demo-toss" && b.currency === "USD");
			if (balance?.settledCash && /^\d+$/.test(balance.settledCash.amount)) {
				const amount = BigInt(balance.settledCash.amount), share = amount / 3n;
				s.balances.push({
					...balance,
					accountId: income.id,
					settledCash: {
						...balance.settledCash,
						amount: String(share)
					}
				});
				balance.settledCash = {
					...balance.settledCash,
					amount: String(amount - share)
				};
			}
			const observation = s.accountObservations?.find((o) => o.accountId === "demo-toss");
			if (observation) s.accountObservations.push({
				...observation,
				accountId: income.id,
				provider: "kiwoom"
			});
			if (s.holdingTraces) s.holdingTraces = s.holdingTraces.map((t) => t.accountId === "demo-toss" && t.instrumentId === "MSFT" ? {
				...t,
				accountId: income.id,
				provider: "kiwoom"
			} : t);
		}
		return s;
	};
}
var WEB_DEMO_FX, WEB_DEMO_ACCOUNT_ALIAS_IDS, WEB_DEMO_ACCOUNT_LABELS, instruments;
function init_portfolio() {
	return (init_portfolio = __esmMin((() => {
		WEB_DEMO_FX = Object.freeze({
			rate: "1350",
			date: "2026-10-20",
			source: "StockPin 가상 환율"
		});
		WEB_DEMO_ACCOUNT_ALIAS_IDS = Object.freeze({
			"demo-kiwoom": "kiwoom-1001",
			"demo-kiwoom-income": "kiwoom-2002",
			"demo-toss": "toss-1001"
		});
		WEB_DEMO_ACCOUNT_LABELS = Object.freeze({
			"demo-kiwoom": "국내주식",
			"demo-kiwoom-income": "해외배당",
			"demo-toss": "해외 장기투자"
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
export { WEB_DEMO_ACCOUNT_ALIAS_IDS, WEB_DEMO_ACCOUNT_LABELS, WEB_DEMO_FX, createWebPortfolio };
