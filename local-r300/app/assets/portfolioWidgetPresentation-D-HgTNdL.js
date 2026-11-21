import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
/** Explicit fixed fiction for WEB supply and inert gallery only. Never a native financial fallback. */
function createPortfolioWidgetDemo() {
	const dates = [];
	for (let day = 1; day <= 31; day++) {
		const date = new Date(Date.UTC(2024, 2, day));
		if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6) dates.push(date.toISOString().slice(0, 10));
	}
	const patterns = [
		[
			0,
			1.2,
			-.8,
			.4,
			1.1,
			-.3,
			.7
		],
		[
			-.2,
			1,
			.4,
			-.8,
			.2,
			.6,
			-.4
		],
		[
			.3,
			-.4,
			.9,
			.1,
			-.6,
			1.4,
			0
		],
		[
			-.4,
			.7,
			.2,
			-.5,
			.8,
			-.1,
			.6
		]
	];
	const observations = (pattern, offset = 0) => dates.map((date, i) => ({
		date,
		returnPct: pattern[(i + offset) % pattern.length]
	}));
	const common = {
		provenance: "fixed-demo",
		source: "웹 고정 가상 자료",
		dateBasis: "exchange-local-date",
		method: "고정 예시 일간 단순 수익률"
	};
	return {
		instant: "2024-03-31T00:00:00Z",
		initialMonth: "2024-03",
		radar: {
			method: "legacy-portfolio-score-v1",
			source: "웹 고정 가상 예시 · 실제 보유 분석 아님",
			asOf: "2024-03-31",
			axes: {
				return: {
					score: 64,
					coverage: "complete"
				},
				stability: {
					score: 72,
					coverage: "complete"
				},
				diversification: {
					score: 58,
					coverage: "complete"
				},
				fundamental: {
					score: 67,
					coverage: "complete"
				},
				momentum: {
					score: 81,
					coverage: "complete"
				}
			}
		},
		daily: {
			...common,
			currency: "KRW",
			dateBasis: "고정 예시 포트폴리오 평가일",
			method: "고정 예시 일간 수익률 · 실제 계좌 성과 아님",
			observations: observations(patterns[0])
		},
		series: patterns.map((pattern, i) => ({
			...common,
			id: `fictional-return-${i}`,
			name: [
				"가상 한국 성장주",
				"가상 한국 배당주",
				"가상 미국 성장주",
				"가상 미국 배당주"
			][i],
			currency: i < 2 ? "KRW" : "USD",
			observations: observations(pattern, i)
		}))
	};
}
function init_portfolioWidgetPresentation() {
	return (init_portfolioWidgetPresentation = __esmMin((() => {})))();
}
export { init_portfolioWidgetPresentation as n, createPortfolioWidgetDemo as t };
