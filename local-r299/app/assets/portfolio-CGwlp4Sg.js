import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function createDemoSnapshot(scenario) {
	const base = {
		mode: "demo",
		fetchedAt: DEMO_AS_OF,
		sourceAsOf: DEMO_AS_OF,
		accounts,
		balances,
		positions,
		completeness: "complete",
		freshness: "fresh",
		errors: [],
		accountObservations: accounts.map((account) => ({
			accountId: account.id,
			completeness: "complete",
			freshness: "fresh",
			sourceAsOf: DEMO_AS_OF
		}))
	};
	if (scenario === "empty") return {
		...base,
		positions: [],
		balances: balances.map((balance) => ({
			...balance,
			settledCash: {
				amount: "0",
				currency: balance.currency
			}
		}))
	};
	if (scenario === "stale") return {
		...base,
		freshness: "stale",
		accountObservations: base.accountObservations?.map((observation) => ({
			...observation,
			freshness: "stale"
		}))
	};
	if (scenario === "partial") return {
		...base,
		completeness: "partial",
		positions: positions.filter((position) => position.provider !== "toss"),
		accountObservations: base.accountObservations?.map((observation) => ({
			...observation,
			completeness: observation.accountId === "demo-toss" ? "partial" : "complete"
		})),
		balances: balances.filter((balance) => balance.accountId !== "demo-toss"),
		errors: [{
			code: "network",
			provider: "toss",
			accountId: "demo-toss",
			message: "합성 계좌 B를 조회하지 못한 예시입니다. 누락 자산은 합산하지 않습니다."
		}]
	};
	if (scenario === "error") return {
		...base,
		completeness: "partial",
		positions: [],
		balances: [],
		accountObservations: base.accountObservations?.map((observation) => ({
			...observation,
			completeness: "partial"
		})),
		errors: accounts.map((account) => ({
			code: "network",
			provider: account.provider,
			accountId: account.id,
			message: "조회 실패 예시입니다. 자산을 0으로 표시하지 않습니다."
		}))
	};
	return base;
}
var DEMO_AS_OF, accounts, balances, positions;
function init_portfolio() {
	return (init_portfolio = __esmMin((() => {
		DEMO_AS_OF = "2026-10-20T00:00:00.000Z";
		accounts = [{
			id: "demo-kiwoom",
			provider: "kiwoom",
			maskedLabel: "키움 · 합성 계좌 A",
			supportedCurrencies: ["KRW"]
		}, {
			id: "demo-toss",
			provider: "toss",
			maskedLabel: "토스 · 합성 계좌 B",
			supportedCurrencies: ["USD"]
		}];
		balances = [{
			accountId: "demo-kiwoom",
			currency: "KRW",
			settledCash: {
				amount: "15000000",
				currency: "KRW"
			},
			unsettledCash: null,
			withdrawableCash: null,
			buyingPower: null
		}, {
			accountId: "demo-toss",
			currency: "USD",
			settledCash: {
				amount: "1500",
				currency: "USD"
			},
			unsettledCash: null,
			withdrawableCash: null,
			buyingPower: null
		}];
		positions = [
			[
				"DEMO-SAMSUNG",
				"삼성전자",
				"100",
				"78400",
				"84000",
				"8400000",
				"560000"
			],
			[
				"DEMO-SKHYNIX",
				"SK하이닉스",
				"50",
				"215000",
				"250000",
				"12500000",
				"1750000"
			],
			[
				"DEMO-HYUNDAI",
				"현대차",
				"20",
				"280000",
				"271000",
				"5420000",
				"-180000"
			],
			[
				"DEMO-KODEX",
				"KODEX 200",
				"200",
				"32900",
				"35000",
				"7000000",
				"420000"
			]
		].map(([instrumentId, name, quantity, avgCost, currentPrice, marketValue, unrealizedPnl]) => ({
			instrumentId,
			name,
			quantity,
			provider: "kiwoom",
			accountId: "demo-kiwoom",
			market: "KRX",
			currency: "KRW",
			avgCost: {
				amount: avgCost,
				currency: "KRW"
			},
			currentPrice: {
				amount: currentPrice,
				currency: "KRW"
			},
			marketValue: {
				amount: marketValue,
				currency: "KRW"
			},
			unrealizedPnl: {
				amount: unrealizedPnl,
				currency: "KRW"
			},
			sourceAsOf: DEMO_AS_OF
		}));
		positions.push(...[[
			"DEMO-MSFT",
			"Microsoft",
			"15",
			"450",
			"480",
			"7200",
			"450"
		], [
			"DEMO-AAPL",
			"Apple",
			"25",
			"200",
			"210",
			"5250",
			"250"
		]].map(([instrumentId, name, quantity, avgCost, currentPrice, marketValue, unrealizedPnl]) => ({
			instrumentId,
			name,
			quantity,
			provider: "toss",
			accountId: "demo-toss",
			market: "NASDAQ",
			currency: "USD",
			avgCost: {
				amount: avgCost,
				currency: "USD"
			},
			currentPrice: {
				amount: currentPrice,
				currency: "USD"
			},
			marketValue: {
				amount: marketValue,
				currency: "USD"
			},
			unrealizedPnl: {
				amount: unrealizedPnl,
				currency: "USD"
			},
			sourceAsOf: DEMO_AS_OF
		})));
	})))();
}
export { createDemoSnapshot as n, init_portfolio as r, DEMO_AS_OF as t };
