import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { n as init_MarketDataHelp, t as MarketDataHelp } from "./MarketDataHelp-BESJNU7R.js";
import { i as init_SentimentDial, r as VolatilityDial } from "./SentimentDial-BK-4_2dl.js";
import { r as isUTCReceivedAt } from "./publicObservationTime-DbR_qU5y.js";
import { i as loadMetricHistory, n as init_MetricHistoryDetail, r as init_metricHistoryRead, t as MetricHistoryHelp } from "./MetricHistoryDetail-B83YhiId.js";
var observation_default;
function init_observation() {
	return (init_observation = __esmMin((() => {
		observation_default = {
			schema: "cboe-vix-daily-snapshot-v1",
			source: "https://cdn-api.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv",
			receivedAt: "2026-11-22T03:17:34.853965+00:00",
			csvSha256: "2a3b180ffb268b7805c17567c0ac7787c74898b0d99f62f550be67eafffd1c16",
			observations: [{
				"date": "2026-11-19",
				"close": "28.440000"
			}, {
				"date": "2026-11-20",
				"close": "35.890000"
			}]
		};
	})))();
}
function record(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function sourceDate(value) {
	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	const date = /* @__PURE__ */ new Date(value + "T00:00:00.000Z");
	return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
/** Validates a bundled observation; does not grant licensing or live-feed rights. */
function readVixSnapshot(value) {
	if (!record(value) || value.schema !== "cboe-vix-daily-snapshot-v1" || value.source !== "https://cdn-api.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv" || !isUTCReceivedAt(value.receivedAt) || typeof value.csvSha256 !== "string" || !/[a-f0-9]{64}/.test(value.csvSha256) || value.csvSha256.length !== 64 || !Array.isArray(value.observations) || value.observations.length !== 2) return null;
	const observations = [];
	for (const row of value.observations) {
		if (!record(row) || !sourceDate(row.date) || row.date > value.receivedAt.slice(0, 10) || typeof row.close !== "string" || row.close.length > 32 || !/^(?:0|[1-9]\d*)(?:\.\d{1,8})?$/.test(row.close) || !Number.isFinite(Number(row.close)) || Number(row.close) <= 0) return null;
		observations.push(Object.freeze({
			date: row.date,
			close: row.close
		}));
	}
	if (observations[0].date >= observations[1].date) return null;
	return Object.freeze({
		previous: observations[0],
		latest: observations[1],
		receivedAt: value.receivedAt
	});
}
var VIX_DAILY_SOURCE;
function init_read() {
	return (init_read = __esmMin((() => {
		VIX_DAILY_SOURCE = "https://cdn-api.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv";
	})))();
}
/** Web-only bundled daily observation: no fetch, credential, timer or native path. */
function VixSnapshotGauge({ snapshot = observation_default } = {}) {
	const quote = readVixSnapshot(snapshot), history = loadMetricHistory("vix");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "public-market-gauge",
		"data-source": "cboe-daily-snapshot",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "public-reference-heading-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "VIX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketDataHelp, {
				floating: true,
				compact: true,
				label: "VIX",
				brief: "S&P 500 옵션의 향후 30일 예상 변동성입니다.",
				asOf: quote?.latest.date,
				receivedAt: quote?.receivedAt,
				sourceUrl: VIX_DAILY_SOURCE,
				description: "제작기관, 변동성 산출 기준과 종가·보관 시점을 설명합니다.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cboe가 S&P 500 지수 옵션 가격으로 산출하는 향후 30일 예상 변동성입니다. 연율화 변동성의 원시 VIX 값이며 공포·탐욕 심리점수로 환산하지 않습니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "공식 CSV에서 확인한 일별 종가 보관값입니다. 실시간·자동 갱신 공급이 아닙니다. 정확한 종가 시각과 현재 대비 지연 시간은 미확인입니다." }),
					quote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"기준일 ",
						quote.latest.date,
						" · 수신시각 ",
						quote.receivedAt
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"이전 종가 ",
						quote.previous.close,
						" · ",
						quote.previous.date
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: VIX_DAILY_SOURCE,
						target: "_blank",
						rel: "noopener noreferrer",
						referrerPolicy: "no-referrer",
						children: "Cboe 원문"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolatilityDial, {
			value: quote ? Number(quote.latest.close) : null,
			label: quote ? `VIX · Cboe · ${quote.latest.date} 일별 종가` : "VIX · 미확인",
			stateHelp: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetricHistoryHelp, {
				label: "VIX",
				history: quote ? history : null,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "VIX는 공포·탐욕 5단계가 아닙니다. 값이 높을수록 옵션시장에 반영된 예상 변동성이 큽니다." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"현재 보관값 ",
					quote ? quote.latest.close : "미확인",
					" · 표시 척도 0–80. 색띠는 시각적 척도일 뿐 공식 위험등급이 아닙니다. 80을 넘으면 원시 숫자는 보존하고 바늘만 끝에 둡니다."
				] })]
			})
		})]
	});
}
var import_jsx_runtime;
function init_VixSnapshotGauge() {
	return (init_VixSnapshotGauge = __esmMin((() => {
		init_observation();
		init_read();
		init_SentimentDial();
		init_MarketDataHelp();
		init_MetricHistoryDetail();
		init_metricHistoryRead();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
init_VixSnapshotGauge();
export { VixSnapshotGauge };
