import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { n as init_MarketDataHelp, t as MarketDataHelp } from "./MarketDataHelp-EG1YQF7z.js";
import { i as init_SentimentDial, n as SentimentDial, t as SENTIMENT_BAND_NOTE } from "./SentimentDial-DFXLMMey.js";
import { o as init_fearGreed, t as FEAR_LABELS } from "./fearGreed-DnRDDE6b.js";
import { a as init_adapter, i as bitcoinProps, m as init_contract, n as BITCOIN_HISTORY_URL, o as updateBitcoinState, r as BITCOIN_LATEST_URL, t as init_BitcoinPublicGauge } from "./BitcoinPublicGauge-CJWlvRpS.js";
import { i as loadMetricHistory, n as init_MetricHistoryDetail, r as init_metricHistoryRead, t as MetricHistoryHelp } from "./MetricHistoryDetail-BekXnlZp.js";
function init_reviewedEcbTerms() {
	return (init_reviewedEcbTerms = __esmMin((() => {
		init_contract();
	})))();
}
function init_extendedHistory() {
	return (init_extendedHistory = __esmMin((() => {
		init_contract();
		init_reviewedEcbTerms();
	})))();
}
/** Drain the complete fixed request set on failure: Promise.all would release
* the owner slot while a sibling transport still runs. The host must bound
* each transport's lifetime; this pure module creates no timeout/timer. */
async function collectRefreshCaptures(requests) {
	return (await Promise.allSettled(requests)).map((result) => {
		if (result.status === "rejected") throw result.reason;
		return result.value;
	});
}
function freeze(value) {
	if (value && typeof value === "object") {
		for (const child of Object.values(value)) freeze(child);
		Object.freeze(value);
	}
	return value;
}
/** Shared pure owner for these two adapters. No timers, fetch, browser, native,
* storage globals, subscriptions, or implicit restore. Factories/inspection are
* inert. Only explicit refresh/refreshIfDue may call injected ports.
*/
function createRefreshOwner(options) {
	const { clock, cache, acquire, intervalMs } = options;
	const retryDelays = [...options.retryDelaysMs ?? [
		1e3,
		5e3,
		3e4
	]];
	if (!boundedDelay(intervalMs) || retryDelays.length > 8 || retryDelays.some((n) => !boundedDelay(n))) throw new TypeError("refresh policy");
	let generation = 0, visible = true, disposed = false, floor = null;
	let flight = null;
	let state = Object.freeze({
		kind: "observed-public-refresh-v1",
		provenance: "injected-transport",
		phase: "idle",
		generation,
		release: null,
		sourceAsOf: null,
		receivedAt: Object.freeze([]),
		error: null,
		failures: 0,
		nextAttemptAt: 0,
		nextReleaseAt: null
	});
	const publish = (patch) => {
		state = Object.freeze({
			...state,
			...patch,
			generation
		});
		return state;
	};
	function readClock() {
		let now;
		try {
			now = clock();
		} catch {
			return reject("clock-invalid");
		}
		if (!validTime(now) || floor !== null && now < floor) return reject("clock-invalid");
		floor = now;
		return now;
	}
	const deadline = (now, delay) => validTime(now + delay) ? now + delay : null;
	function failed(error, now) {
		const failures = state.failures + 1, delay = retryDelays[failures - 1];
		return publish({
			phase: "error",
			error,
			failures,
			nextAttemptAt: now !== null && error !== "clock-invalid" && delay !== void 0 ? deadline(now, delay) : null
		});
	}
	function cacheRead() {
		try {
			const bytes = cache.read();
			if (bytes !== null && typeof bytes !== "string") return reject("cache-failed");
			return bytes;
		} catch {
			return reject("cache-failed");
		}
	}
	function retire() {
		generation++;
		flight = null;
		publish({ phase: disposed ? "disposed" : !visible ? "hidden" : state.error ? "error" : state.release ? "ready" : "idle" });
	}
	function refresh(request = {}) {
		if (disposed || !visible) return Promise.resolve(state);
		if (flight) return flight;
		let started;
		try {
			started = readClock();
		} catch {
			return Promise.resolve(failed("clock-invalid", null));
		}
		if (disposed || !visible) return Promise.resolve(state);
		if (!request.force && (state.nextAttemptAt === null || started < state.nextAttemptAt)) return Promise.resolve(state);
		const epoch = generation, previous = state;
		const current = () => !disposed && visible && generation === epoch;
		publish({
			phase: "refreshing",
			...request.force ? { failures: 0 } : {}
		});
		const pending = Promise.resolve().then(async () => {
			if (!current()) return state;
			try {
				const expected = cache ? cacheRead() : null;
				if (!current()) return state;
				const candidate = await acquire(previous.release);
				if (!current()) return state;
				let completed = readClock();
				if (!current()) return state;
				const receipts = candidate.receivedAt.map((value) => Date.parse(value));
				if (!receipts.length || receipts.some((t) => !validTime(t) || t < started || t > completed)) reject("receipt-outside-flight");
				if (previous.sourceAsOf !== null && (Date.parse(candidate.sourceAsOf) < Date.parse(previous.sourceAsOf) || receipts.some((t, n) => t < Date.parse(previous.receivedAt[n])))) reject("older-release");
				const release = freeze(candidate.release), receivedAt = Object.freeze([...candidate.receivedAt]);
				if (cache) {
					if (cacheRead() !== expected) reject("cache-conflict");
					if (!current()) return state;
					const bytes = JSON.stringify({
						kind: "public-refresh-cache-v1",
						provenance: "injected-transport",
						sourceAsOf: candidate.sourceAsOf,
						receivedAt,
						release
					});
					let clockFailed = false;
					const commitCurrent = () => {
						if (!current()) return false;
						try {
							completed = readClock();
						} catch {
							clockFailed = true;
							return false;
						}
						return current();
					};
					let saved;
					try {
						saved = cache.compareAndSet(expected, bytes, commitCurrent);
					} catch {
						return reject("cache-failed");
					}
					if (!current()) return state;
					if (clockFailed) reject("clock-invalid");
					if (!saved) reject("cache-conflict");
					if (cacheRead() !== bytes) reject("cache-failed");
					if (!current()) return state;
					completed = readClock();
					if (!current()) return state;
				}
				const intervalAt = deadline(completed, intervalMs);
				const nextAttemptAt = intervalAt === null ? null : Math.max(intervalAt, candidate.nextReleaseAt ?? intervalAt);
				return publish({
					phase: "ready",
					release,
					sourceAsOf: candidate.sourceAsOf,
					receivedAt,
					error: null,
					failures: 0,
					nextReleaseAt: candidate.nextReleaseAt,
					nextAttemptAt
				});
			} catch (error) {
				if (!current()) return state;
				let now = null, code = error instanceof Rejected ? error.code : "supply-rejected";
				try {
					now = readClock();
				} catch {
					code = "clock-invalid";
				}
				if (!current()) return state;
				return failed(code, now);
			}
		}).finally(() => {
			if (flight === pending) flight = null;
		});
		flight = pending;
		return pending;
	}
	return Object.freeze({
		getSnapshot: () => state,
		view: (now) => {
			const clockInvalid = !validTime(now) || floor !== null && now < floor || state.receivedAt.some((t) => Date.parse(t) > now);
			const sourceAgeMs = state.sourceAsOf === null || !validTime(now) ? null : now - Date.parse(state.sourceAsOf);
			return Object.freeze({
				...state,
				clockInvalid,
				sourceAgeMs,
				due: !clockInvalid && visible && !disposed && !flight && state.nextAttemptAt !== null && now >= state.nextAttemptAt,
				stale: state.release !== null && (clockInvalid || sourceAgeMs !== null && sourceAgeMs > 1296e5 || state.nextReleaseAt !== null && now > state.nextReleaseAt + 3e5)
			});
		},
		refresh,
		refreshIfDue: () => refresh(),
		setVisible: (next) => {
			if (disposed || visible === next) return;
			visible = next;
			retire();
		},
		replaceGeneration: () => {
			if (!disposed) retire();
		},
		dispose: () => {
			if (disposed) return;
			disposed = true;
			retire();
		}
	});
}
var maxInstant, validTime, boundedDelay, Rejected, reject;
function init_refresh() {
	return (init_refresh = __esmMin((() => {
		init_contract();
		init_extendedHistory();
		maxInstant = 864e13;
		validTime = (n) => Number.isSafeInteger(n) && n >= 0 && n <= maxInstant;
		boundedDelay = (n) => Number.isSafeInteger(n) && n > 0 && n <= 1728e5;
		Rejected = class extends Error {
			code;
			constructor(code) {
				super(code);
				this.code = code;
			}
		};
		reject = (code) => {
			throw new Rejected(code);
		};
	})))();
}
/** Observed envelope around the UNCHANGED frozen-kind adapter contract.
* No fetch/clock rewriting, JSON repair, scheduling or live provenance claims.
* Parent must keep the default frozen host and this optional owner separate.
*/
function createBitcoinRefreshOwner(options) {
	const { transport } = options;
	const copy = async (url) => {
		const c = await transport(url);
		return {
			url: c.url,
			status: c.status,
			raw: c.raw,
			receivedAt: c.receivedAt,
			sha256: c.sha256
		};
	};
	return createRefreshOwner({
		...options,
		intervalMs: options.minimumIntervalMs ?? 6e4,
		acquire: async (previous) => {
			const [latest, history] = await collectRefreshCaptures([BITCOIN_LATEST_URL, BITCOIN_HISTORY_URL].map(copy));
			const state = await updateBitcoinState({
				release: previous,
				error: null
			}, latest, history);
			if (state.error || !state.release) throw new TypeError("bitcoin admission");
			return {
				release: state.release,
				sourceAsOf: state.release.quote.asOf,
				receivedAt: [latest.receivedAt, history.receivedAt],
				nextReleaseAt: Date.parse(state.release.quote.nextUpdateAt)
			};
		}
	});
}
function init_refresh$1() {
	return (init_refresh$1 = __esmMin((() => {
		init_adapter();
		init_refresh();
	})))();
}
/** A closed, browser-only GET port, never the app's general fetch replacement. */
function createBitcoinWebTransport(request) {
	const controllers = /* @__PURE__ */ new Set();
	let disposed = false;
	const transfer = async (url) => {
		if (disposed || url !== "https://api.alternative.me/fng/?limit=1&format=json" && url !== "https://api.alternative.me/fng/?limit=0&format=json") throw Error("bitcoin-endpoint");
		const controller = new AbortController();
		controllers.add(controller);
		const timer = setTimeout(() => controller.abort(), 1e4);
		let reader;
		try {
			const response = await request(url, {
				method: "GET",
				credentials: "omit",
				mode: "cors",
				redirect: "error",
				cache: "no-store",
				referrerPolicy: "no-referrer",
				signal: controller.signal
			});
			if (disposed || controller.signal.aborted) throw Error("bitcoin-aborted");
			if (response.status !== 200 || response.url !== url || response.redirected || !response.body) throw Error("bitcoin-response");
			const limit = url === "https://api.alternative.me/fng/?limit=1&format=json" ? 8192 : 4194304;
			let length = 0;
			const chunks = [];
			reader = response.body.getReader();
			while (true) {
				const part = await reader.read();
				if (disposed || controller.signal.aborted) throw Error("bitcoin-aborted");
				if (part.done) break;
				length += part.value.byteLength;
				if (length > limit) throw Error("bitcoin-body-limit");
				chunks.push(part.value);
			}
			const receivedAt = (/* @__PURE__ */ new Date()).toISOString(), bytes = new Uint8Array(length);
			let offset = 0;
			for (const chunk of chunks) {
				bytes.set(chunk, offset);
				offset += chunk.byteLength;
			}
			const raw = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
			const sha256 = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)), (b) => b.toString(16).padStart(2, "0")).join("");
			if (disposed || controller.signal.aborted) throw Error("bitcoin-aborted");
			return {
				url,
				status: response.status,
				raw,
				receivedAt,
				sha256
			};
		} finally {
			clearTimeout(timer);
			controllers.delete(controller);
			controller.abort();
			if (reader) {
				try {
					await reader.cancel();
				} catch {}
				reader.releaseLock();
			}
		}
	};
	return Object.assign(transfer, { dispose() {
		if (disposed) return;
		disposed = true;
		for (const controller of controllers) controller.abort();
		controllers.clear();
	} });
}
function init_webTransport() {
	return (init_webTransport = __esmMin((() => {
		init_adapter();
	})))();
}
/** Web-only caller: native/default frozen gauges never construct this transport. */
function WebBitcoinGauge({ request, active = true }) {
	const activeRef = (0, import_react.useRef)(active);
	activeRef.current = active;
	const actions = (0, import_react.useRef)(null);
	const [view, setView] = (0, import_react.useState)(() => ({
		snapshot: null,
		busy: false,
		now: Date.now()
	}));
	(0, import_react.useEffect)(() => {
		let closed = false, running = false;
		const transport = createBitcoinWebTransport(request);
		const owner = createBitcoinRefreshOwner({
			clock: () => Date.now(),
			transport
		});
		const publish = () => {
			if (!closed) setView({
				snapshot: owner.getSnapshot(),
				busy: running,
				now: Date.now()
			});
		};
		const refresh = (force = false) => {
			if (closed || running || !activeRef.current || document.visibilityState === "hidden") return;
			running = true;
			const pending = owner.refresh(force ? { force: true } : {});
			publish();
			pending.finally(() => {
				running = false;
				publish();
			});
		};
		const sync = () => {
			owner.setVisible(activeRef.current && document.visibilityState !== "hidden");
			publish();
			refresh();
		};
		actions.current = {
			sync,
			retry: () => refresh(true)
		};
		document.addEventListener("visibilitychange", sync);
		sync();
		const timer = setInterval(() => {
			if (activeRef.current && document.visibilityState !== "hidden") {
				publish();
				const state = owner.getSnapshot();
				if (state.nextAttemptAt !== null && Date.now() >= state.nextAttemptAt) refresh();
			}
		}, 1e3);
		return () => {
			closed = true;
			clearInterval(timer);
			document.removeEventListener("visibilitychange", sync);
			actions.current = null;
			owner.dispose();
			transport.dispose();
		};
	}, [request]);
	(0, import_react.useEffect)(() => {
		actions.current?.sync();
	}, [active]);
	const state = view.snapshot;
	const p = bitcoinProps({
		release: state?.release ?? null,
		error: state?.error ?? null
	}, new Date(view.now).toISOString());
	const quote = p.quote;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "public-market-gauge bitcoin-public-gauge",
		"data-supply-mode": "web-auto",
		"data-has-quote": !!quote,
		"data-source-asof": quote?.asOf,
		"data-received-at": state?.receivedAt[0],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "public-reference-heading-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: p.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketDataHelp, {
				floating: true,
				compact: true,
				label: p.title,
				brief: "비트코인 시장의 공포·탐욕 심리지표입니다.",
				asOf: quote?.asOf,
				receivedAt: p.receivedAt,
				sourceUrl: p.attribution.href,
				summary: [
					"비트코인 심리 · Alternative.me",
					quote ? `${quote.value}점 · ${FEAR_LABELS[quote.classification]}` : "현재 지표 미확인",
					p.error ? "수신 실패 · 자세히에서 재확인" : "일별 심리지표 · 가격이 아님"
				],
				description: "제작기관, 구성 기준, 출처와 자동 확인·수신 시점을 설명합니다.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Alternative.me의 비트코인 시장 심리 일별 지표입니다. 변동성·거래량/모멘텀·소셜미디어·비트코인 점유율·검색 동향 등을 종합하며, 설문 항목은 공급자 설명상 중단되어 있습니다. 현재의 정확한 가중치 적용 여부는 미확인입니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "가격이나 종가가 아닙니다. 공급자의 다음 발표 시각에 맞춰 자동 확인하며, 시장 화면이 비활성·숨김이면 확인을 쉽니다. 실시간 공급은 아닙니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"기준 ",
						quote?.asOf ?? "미확인",
						" · 수신 ",
						p.receivedAt ?? "미확인",
						". 이력 상세는 별도로 수집한 고정 보관본이며 자동 갱신하지 않습니다."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: p.attribution.href,
						target: "_blank",
						rel: "noopener noreferrer",
						referrerPolicy: "no-referrer",
						children: "Alternative.me 출처"
					}),
					p.stale && quote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "자료 지연 · 이전 관측값을 표시합니다." }),
					!quote && !p.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						children: "현재 지표 확인 중"
					}),
					p.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["갱신 실패", quote ? " · 이전 자료 유지" : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "비트코인 지표 다시 확인",
						disabled: view.busy || !active,
						onClick: () => actions.current?.retry(),
						children: "다시 확인"
					})] })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bitcoin-public-reading",
			"data-source-asof": quote?.asOf,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentimentDial, {
				value: quote?.value ?? null,
				sourceClassification: quote?.classification,
				label: p.title,
				stateHelp: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetricHistoryHelp, {
					label: p.title,
					history: loadMetricHistory("bitcoin"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "극도의 공포 → 공포 → 중립 → 탐욕 → 극도의 탐욕. 낮을수록 공포, 높을수록 탐욕입니다." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"현재 수신값: ",
							quote ? `${quote.value} / 100 · ${FEAR_LABELS[quote.classification]} · ${quote.asOf}` : "미확인",
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SENTIMENT_BAND_NOTE }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "아래 보관 이력의 끝일은 현재 수신값의 날짜와 다를 수 있습니다. 현재값을 이력에 추가하거나 대체하지 않습니다." })
					]
				})
			})
		})]
	});
}
var import_react, import_jsx_runtime;
function init_WebBitcoinGauge() {
	return (init_WebBitcoinGauge = __esmMin((() => {
		import_react = require_react();
		init_SentimentDial();
		init_fearGreed();
		init_MarketDataHelp();
		init_MetricHistoryDetail();
		init_metricHistoryRead();
		init_adapter();
		init_refresh$1();
		init_webTransport();
		init_BitcoinPublicGauge();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
init_WebBitcoinGauge();
export { WebBitcoinGauge };
