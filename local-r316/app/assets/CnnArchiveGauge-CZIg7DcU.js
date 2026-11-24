import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { n as init_MarketDataHelp, t as MarketDataHelp } from "./MarketDataHelp-BESJNU7R.js";
import { i as init_SentimentDial, n as SentimentDial, t as SENTIMENT_BAND_NOTE } from "./SentimentDial-BK-4_2dl.js";
import { i as loadMetricHistory, n as init_MetricHistoryDetail, r as init_metricHistoryRead, t as MetricHistoryHelp } from "./MetricHistoryDetail-B83YhiId.js";
var observation_default;
function init_observation() {
	return (init_observation = __esmMin((() => {
		observation_default = {
			schema: "cnn-public-archive-snapshot-v1",
			sourceKind: "public_archive_snapshot",
			publisher: "whit3rabbit/fear-greed-data",
			claimedUnderlying: "CNN equity Fear and Greed",
			commit: "ee75caab1282a1a390b01e560f29e88985a5dd90",
			scoreRaw: "9.67368421052632",
			ratingRaw: "extreme fear",
			sourceDate: "2026-11-20",
			sourceAt: "2026-11-20T23:59:52+00:00",
			receivedAt: "2026-11-22T05:24:41.959435+00:00",
			sources: [{
				"name": "fear-greed.csv",
				"url": "https://raw.githubusercontent.com/whit3rabbit/fear-greed-data/ee75caab1282a1a390b01e560f29e88985a5dd90/fear-greed.csv",
				"receivedAt": "2026-11-22T05:24:41.696779+00:00",
				"sha256": "c9abdf6a3654d8b5e21d479f14c69a566241c1290de04e85c5c84b386b4e71ba"
			}, {
				"name": "cnn_output.json",
				"url": "https://raw.githubusercontent.com/whit3rabbit/fear-greed-data/ee75caab1282a1a390b01e560f29e88985a5dd90/json/cnn_output.json",
				"receivedAt": "2026-11-22T05:24:41.959435+00:00",
				"sha256": "bd1025d1047bd8012dc44da68ebdd9288e4b8010f91ed45958b340d1c2141cfd"
			}],
			directCnnVerified: false,
			independentExactValueVerified: false,
			autoRefresh: false,
			change: null
		};
	})))();
}
/** Bundled archive only; not an authentication API for caller-provided data. */
function loadCnnArchive(..._input) {
	if (_input.length !== 0) return null;
	const ratings = {
		"extreme fear": "극도의 공포",
		fear: "공포",
		neutral: "중립",
		greed: "탐욕",
		"extreme greed": "극도의 탐욕"
	};
	const score = observation_default.scoreRaw, rating = observation_default.ratingRaw;
	if (typeof score !== "string" || !/^\d+(?:\.\d+)?$/.test(score) || !Number.isFinite(Number(score)) || Number(score) > 100 || !Object.hasOwn(ratings, rating)) return null;
	if (!/^\d{4}-\d{2}-\d{2}$/.test(observation_default.sourceDate) || !Number.isFinite(Date.parse(observation_default.sourceAt)) || !Number.isFinite(Date.parse(observation_default.receivedAt)) || new Date(observation_default.sourceAt).toISOString().slice(0, 10) !== observation_default.sourceDate) return null;
	return {
		...observation_default,
		sources: observation_default.sources.map((source) => ({ ...source })),
		displayScore: Number(Number(score).toFixed(2)),
		displayRating: ratings[rating]
	};
}
function init_read() {
	return (init_read = __esmMin((() => {
		init_observation();
	})))();
}
function init_CnnArchiveGauge() {
	return (init_CnnArchiveGauge = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-reference/cnn-archive-snapshot/CnnArchiveGauge.css?v=source-build-r50018";
			document.head.appendChild(l);
		}
	})))();
}
/** Static public archive, not a direct CNN or automatic-refresh feed. */
function CnnArchiveGauge() {
	const quote = loadCnnArchive(), history = loadMetricHistory("cnn");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "public-market-gauge",
		"data-source": "cnn-public-archive-snapshot",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "public-reference-heading-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "CNN 공포·탐욕" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketDataHelp, {
				floating: true,
				compact: true,
				label: "CNN 공포·탐욕",
				brief: "CNN이 산출한 미국 주식시장 심리지표입니다.",
				asOf: quote?.sourceAt,
				receivedAt: quote?.receivedAt,
				sourceUrl: quote?.sources[0]?.url ?? "https://www.cnn.com/markets/fear-and-greed",
				description: "지표의 제작기관, 구성 기준, 출처와 보관 시점을 설명합니다.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CNN이 미국 주식시장 심리를 0–100으로 나타낸 지표입니다. 주가 모멘텀·주가 강도·주가 폭·풋/콜·시장 변동성·안전자산 수요·정크본드 수요의 7개 항목을 종합합니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "공개보관본 · CNN 직접 수신 아님 · 자동 갱신 아님. 실시간 값이 아니며 정확한 종가 산출 여부·지연 시간은 미확인입니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.cnn.com/markets/fear-and-greed",
						target: "_blank",
						rel: "noopener noreferrer",
						referrerPolicy: "no-referrer",
						children: "CNN 제작기관 설명"
					}) }),
					quote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["출처: ", quote.publisher] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"원문 점수 ",
							quote.scoreRaw,
							" / 100 · 원문 등급 ",
							quote.ratingRaw
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"기준시각 ",
							quote.sourceAt,
							" · 수신시각 ",
							quote.receivedAt
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["고정 commit ", quote.commit] }),
						quote.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: source.url,
								target: "_blank",
								rel: "noopener noreferrer",
								referrerPolicy: "no-referrer",
								children: [source.name, " 보관 원문"]
							}),
							" · 수신 ",
							source.receivedAt
						] }, source.name))
					] })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentimentDial, {
			value: quote?.displayScore ?? null,
			sourceClassification: quote?.ratingRaw,
			label: quote ? `CNN 공포·탐욕 · 공개보관본 · ${quote.displayRating} · ${quote.sourceDate}` : "CNN 공포·탐욕 · 미확인",
			stateHelp: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetricHistoryHelp, {
				label: "CNN 공포·탐욕",
				history: quote ? history : null,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "극도의 공포 → 공포 → 중립 → 탐욕 → 극도의 탐욕. 낮을수록 공포, 높을수록 탐욕입니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"현재 보관값: ",
						quote ? `${quote.displayScore} / 100 · ${quote.displayRating}` : "미확인",
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SENTIMENT_BAND_NOTE })
				]
			})
		})]
	});
}
var import_jsx_runtime;
function init_CnnArchiveGauge$1() {
	return (init_CnnArchiveGauge$1 = __esmMin((() => {
		init_SentimentDial();
		init_MarketDataHelp();
		init_MetricHistoryDetail();
		init_metricHistoryRead();
		init_read();
		init_CnnArchiveGauge();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
init_CnnArchiveGauge$1();
export { CnnArchiveGauge };
