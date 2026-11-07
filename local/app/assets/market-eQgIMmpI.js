import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
var CATALOG;
function init_catalog() {
	return (init_catalog = __esmMin((() => {
		CATALOG = [
			[
				"usdkrw",
				"달러/원",
				"fx",
				"USD",
				"KRW",
				"1",
				"원",
				"1380",
				"1382.515"
			],
			[
				"jpykrw100",
				"100엔/원",
				"fx",
				"JPY",
				"KRW",
				"100",
				"원",
				"910.25",
				"908.125"
			],
			[
				"cnykrw",
				"위안/원",
				"fx",
				"CNY",
				"KRW",
				"1",
				"원",
				"190.25",
				"190.25"
			],
			[
				"eurkrw",
				"유로/원",
				"fx",
				"EUR",
				"KRW",
				"1",
				"원",
				"1490.125",
				"1495.375"
			],
			[
				"gbpkrw",
				"파운드/원",
				"fx",
				"GBP",
				"KRW",
				"1",
				"원",
				"1740",
				"1742.125"
			],
			[
				"eurusd",
				"유로/달러",
				"fx",
				"EUR",
				"USD",
				"1",
				"달러",
				"1.08123",
				"1.08234"
			],
			[
				"usdjpy",
				"달러/엔",
				"fx",
				"USD",
				"JPY",
				"1",
				"엔",
				"150.8123",
				"150.5123"
			],
			[
				"kospi",
				"코스피",
				"index",
				null,
				null,
				null,
				"포인트",
				"2640",
				"2645.23"
			],
			[
				"kosdaq",
				"코스닥",
				"index",
				null,
				null,
				null,
				"포인트",
				"868.32",
				"865.12"
			],
			[
				"sp500",
				"S&P 500",
				"index",
				null,
				null,
				null,
				"포인트",
				"5690",
				"5702.54"
			],
			[
				"nasdaq",
				"나스닥",
				"index",
				null,
				null,
				null,
				"포인트",
				"17863.02",
				"17948.32"
			],
			[
				"dow",
				"다우존스",
				"index",
				null,
				null,
				null,
				"포인트",
				"42706.82",
				"42583.32"
			],
			[
				"bitcoin-fear-greed",
				"Bitcoin 공포·탐욕",
				"sentiment",
				null,
				null,
				null,
				"점 / 100",
				"62",
				"64"
			],
			[
				"synthetic-stocks-fear-greed",
				"주식 공포·탐욕 · 가상",
				"stocksSentiment",
				null,
				null,
				null,
				"점 / 100",
				"46",
				"48"
			],
			[
				"vix",
				"VIX",
				"volatility",
				null,
				null,
				null,
				"포인트",
				"18",
				"17.5"
			]
		];
	})))();
}
function heatmapDemoSnapshots() {
	return Object.fromEntries(Object.entries({
		kospi: [
			"반도체",
			"자동차",
			"금융",
			"산업재",
			"소재",
			"생활소비"
		],
		kosdaq: [
			"바이오",
			"소프트웨어",
			"반도체장비",
			"콘텐츠",
			"친환경",
			"의료기기"
		],
		sp500: [
			"정보기술",
			"금융",
			"헬스케어",
			"소비재",
			"통신",
			"에너지"
		],
		nasdaq: [
			"소프트웨어",
			"반도체",
			"인터넷",
			"바이오",
			"미디어",
			"운송"
		]
	}).map(([market, names], m) => {
		const rows = names.flatMap((sector, s) => Array.from({ length: 6 }, (_, i) => ({
			symbol: `${[
				"KP",
				"KQ",
				"SP",
				"NQ"
			][m]}${s + 1}${i + 1}`,
			name: `가상 ${sector} ${[
				"온빛",
				"새결",
				"이음",
				"한울"
			][m]}${i + 1}`,
			sector,
			marketCap: String(BigInt((7 - s) * (8 - i) * (m + 2) + (s + i + m) % 5) * 1000000000n),
			changePct: [
				"1.42",
				"-2.16",
				"0.38",
				"-0.64",
				"0",
				"2.83",
				"-1.07"
			][(s * 2 + i + m) % 7]
		})));
		rows.push({
			symbol: `${market.toUpperCase()}_NA`,
			name: "가상 미조회 종목",
			sector: names[5],
			marketCap: null,
			changePct: null
		});
		return [market, {
			market,
			asOf: "2024-03-31T00:00:00Z",
			sourceLabel: "데모 · 고정 가상 종목 (실제 지수 구성 아님)",
			sourceUrl: "https://example.invalid/stockpin-web-demo",
			universeSize: 40,
			rows
		}];
	}));
}
function historyFor(id, previous, current) {
	const start = Date.parse("2023-03-01T00:00:00Z"), end = Date.parse("2024-03-31T00:00:00Z");
	const rows = [], p = decimal(previous);
	let seed = 1n, offset = 0n, velocity = 0n;
	for (const char of id) seed = seed * 31n + BigInt(char.codePointAt(0)) & 4294967295n;
	for (let t = end; t >= start; t -= DAY) {
		if (t < end - DAY) {
			seed = 1664525n * seed + 1013904223n & 4294967295n;
			const impulse = p * (seed % 25n - 12n) / 10000n;
			velocity = (3n * velocity + impulse) / 4n;
			offset += velocity - offset / 96n;
		}
		const value = t === end ? current : t === end - DAY ? previous : rawDecimal(p + offset);
		rows.push({
			date: new Date(t).toISOString().slice(0, 10),
			value
		});
	}
	return rows.reverse();
}
function chart(rows, small = true) {
	const valid = rows.filter((p) => p.value !== null);
	if (!valid.length) return {
		points: [],
		segments: [],
		minimum: null,
		maximum: null
	};
	const numbers = valid.map((p) => decimal(p.value));
	const min = numbers.reduce((a, b) => a < b ? a : b), max = numbers.reduce((a, b) => a > b ? a : b);
	const first = Date.parse(rows[0].date), last = Date.parse(rows.at(-1).date);
	const points = [], segments = [];
	let segment = [], previous = -Infinity;
	const flush = () => {
		if (segment.length > 1) segments.push(segment.join(" "));
		segment = [];
	};
	for (const row of rows) {
		const t = Date.parse(row.date);
		if (row.value === null) {
			flush();
			previous = -Infinity;
			continue;
		}
		if (t - previous !== DAY) flush();
		const x = (small ? 2 : 24) + (t - first) / Math.max(DAY, last - first) * (small ? 92 : 592);
		const y = max === min ? small ? 16 : 140 : (small ? 28 : 248) - Number((decimal(row.value) - min) * BigInt(small ? 24e3 : 216e3) / (max - min)) / 1e3;
		points.push({
			...row,
			x,
			y
		});
		segment.push(`${x},${y}`);
		previous = t;
	}
	flush();
	return {
		points,
		segments,
		minimum: rawDecimal(min),
		maximum: rawDecimal(max)
	};
}
function project(entry) {
	const [id, label, category, base, quote, baseAmount, unit, previous, current] = entry;
	const history = historyFor(id, previous, current), diff = decimal(current) - decimal(previous), abs = diff < 0n ? -diff : diff;
	const sign = diff > 0n ? "+" : diff < 0n ? "−" : "";
	const pct = roundEven(abs * 10000n, decimal(previous));
	return {
		id,
		label,
		category,
		base,
		quote,
		baseAmount,
		unit,
		status: "ready",
		value: current,
		displayValue: formatDecimal(current),
		sourceDate: history.at(-1).date,
		comparisonDate: history.at(-2).date,
		changeRaw: rawDecimal(diff),
		percentRaw: rawDecimal(diff * 100n * SCALE / decimal(previous)),
		change: sign + formatDecimal(rawDecimal(abs)),
		percent: sign + (abs > 0n && pct === 0n ? "<0.01" : `${pct / 100n}.${(pct % 100n).toString().padStart(2, "0")}`) + "%",
		direction: diff > 0n ? "gain" : diff < 0n ? "loss" : "flat",
		history,
		mini: chart(history.slice(-30)),
		provenance: provenance()
	};
}
function createMarketDemo({ fixture = "ready" } = {}) {
	if (![
		"ready",
		"empty",
		"error",
		"unqueried"
	].includes(fixture)) throw new TypeError("Unknown fixture");
	const rows = CATALOG.map(project).map((row) => fixture === "ready" ? row : {
		...row,
		status: fixture,
		value: null,
		displayValue: "—",
		sourceDate: null,
		comparisonDate: null,
		changeRaw: null,
		percentRaw: null,
		change: null,
		percent: null,
		direction: "unknown",
		history: [],
		mini: chart([])
	});
	for (const row of rows.filter((x) => ["sentiment", "stocksSentiment"].includes(x.category))) row.comparisons = [
		[
			"yesterday",
			"어제",
			"2024-03-30"
		],
		[
			"lastWeek",
			"지난주",
			"2024-03-24"
		],
		[
			"lastMonth",
			"지난달",
			"2024-02-29"
		]
	].map(([key, label, date]) => ({
		key,
		label,
		date,
		value: row.history.find((p) => p.date === date)?.value ?? null
	}));
	rows.find((x) => x.category === "stocksSentiment").meaning = "고정 가상 주식 심리 · 실제 주식 심리 아님 · 공급 미연결 · 매매 신호 아님";
	rows.find((x) => x.category === "sentiment").meaning = "Bitcoin 심리 · 0–100점 · 주식 심리 아님";
	rows.find((x) => x.category === "volatility").meaning = "S&P 500 옵션 · 약 30일 예상 변동성 (연율 %)";
	return {
		stockFearGreed: {
			status: "unsupported",
			value: null,
			reason: "주식 심리 공급 없음"
		},
		status: fixture,
		error: fixture === "error" ? "DEMO_FIXTURE_ERROR" : null,
		provenance: provenance(),
		fx: rows.filter((x) => x.category === "fx"),
		indices: rows.filter((x) => x.category === "index"),
		stocksSentiment: rows.find((x) => x.category === "stocksSentiment"),
		bitcoinSentiment: rows.find((x) => x.category === "sentiment"),
		vix: rows.find((x) => x.category === "volatility")
	};
}
function getSeries(id, { period = "7d", fixture = "ready" } = {}) {
	const demo = createMarketDemo({ fixture });
	const row = [
		...demo.fx,
		...demo.indices,
		demo.stocksSentiment,
		demo.bitcoinSentiment,
		demo.vix
	].find((x) => x.id === id);
	const result = {
		status: fixture,
		error: demo.error,
		provenance: provenance(),
		pair: null,
		start: null,
		end: null,
		availableStart: null,
		availableEnd: null,
		...chart([])
	};
	if (!row || ![
		"7d",
		"1m",
		"3m",
		"1y",
		"all"
	].includes(period)) return {
		...result,
		status: "unsupported",
		error: null
	};
	result.pair = {
		id: row.id,
		base: row.base,
		quote: row.quote,
		baseAmount: row.baseAmount,
		value: row.value
	};
	if (fixture !== "ready") return result;
	const end = Date.parse(row.history.at(-1).date), target = new Date(end);
	let start = -Infinity;
	if (period === "7d") start = end - 6 * DAY;
	else if (period !== "all") {
		const months = {
			"1m": 1,
			"3m": 3,
			"1y": 12
		}[period], date = target.getUTCDate();
		target.setUTCDate(1);
		target.setUTCMonth(target.getUTCMonth() - months);
		const last = new Date(target);
		last.setUTCMonth(last.getUTCMonth() + 1);
		last.setUTCDate(0);
		target.setUTCDate(Math.min(date, last.getUTCDate()));
		start = target.getTime();
	}
	const selected = row.history.filter((p) => Date.parse(p.date) >= start);
	return {
		...result,
		status: "ready",
		start: selected[0].date,
		end: selected.at(-1).date,
		availableStart: row.history[0].date,
		availableEnd: row.history.at(-1).date,
		...chart(selected, false)
	};
}
function getComponentData(target, { fixture = "ready" } = {}) {
	const demo = createMarketDemo({ fixture });
	const envelope = {
		status: demo.status,
		data: null,
		error: demo.error,
		provenance: provenance()
	};
	if (!["MarketPage.snapshots", "ReferenceRatesPresentation"].includes(target)) return {
		...envelope,
		status: "unsupported",
		error: null,
		reason: "Source-bound UI requires an explicit demo presentation seam; no provider DTO is fabricated."
	};
	if (fixture !== "ready") return envelope;
	if (target === "ReferenceRatesPresentation") return {
		...envelope,
		data: {
			caption: "데모 · 고정 가상 자료 · 2024-03-31 가상 기준일",
			rows: demo.fx
		}
	};
	const data = heatmapDemoSnapshots();
	return {
		...envelope,
		data
	};
}
function decimal(raw) {
	if (typeof raw !== "string" || raw.length > 48 || !/^-?\d+(?:\.\d{1,12})?$/.test(raw)) throw new TypeError("Invalid decimal");
	const negative = raw.startsWith("-");
	const [a, b = ""] = (negative ? raw.slice(1) : raw).split(".");
	return (negative ? -1n : 1n) * (BigInt(a) * SCALE + BigInt(b.padEnd(12, "0")));
}
function roundEven(n, d) {
	let q = n / d;
	const r = n % d;
	if (r * 2n > d || r * 2n === d && q % 2n !== 0n) q++;
	return q;
}
function rawDecimal(n) {
	const sign = n < 0n ? "-" : "";
	n = n < 0n ? -n : n;
	const f = (n % SCALE).toString().padStart(12, "0").replace(/0+$/, "");
	return sign + n / SCALE + (f ? "." + f : "");
}
function formatDecimal(raw) {
	const value = decimal(raw), n = value < 0n ? -value : value;
	const cents = roundEven(n * 100n, SCALE);
	const sign = value < 0n ? "−" : "";
	if (n > 0n && cents === 0n) return sign + "<0.01";
	const f = (cents % 100n).toString().padStart(2, "0").replace(/0+$/, "");
	return sign + (cents / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (f ? "." + f : "");
}
var DAY, SCALE, provenance;
function init_market() {
	return (init_market = __esmMin((() => {
		init_catalog();
		DAY = 864e5;
		SCALE = 10n ** 12n;
		provenance = () => ({
			kind: "synthetic",
			label: "데모 · 고정 가상 자료",
			source: "stockpin-web-demo-v1",
			fixedAsOf: "2024-03-31",
			observedAt: null,
			nextUpdateAt: null,
			live: false
		});
	})))();
}
init_market();
export { createMarketDemo, getComponentData, getSeries };
