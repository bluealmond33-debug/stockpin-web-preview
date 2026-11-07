import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D3ER87f6.js";
import { a as init_AppIcon } from "./AppIcon-DTp6b6Wl.js";
import { a as init_portfolio, i as decimalRatioPercent, r as compareDecimalStrings } from "./portfolio-UGXOnruG.js";
import { C as isOldFx, S as init_referenceFx, T as writeFx, _ as decodeReferenceHistory, a as init_WebDemoMarketModel, b as readReferenceRates, c as init_ReferenceRatesTable, d as REFERENCE_YEAR_HISTORY_KEY, f as init_referenceYearHistory, g as REFERENCE_HISTORY_KEY, i as decodeWebDemoMarket, l as displayReferenceRate, m as writeReferenceYearHistory, n as init_WebDemoMarketDetails, o as ReferenceRateRows, p as readReferenceYearHistory, r as WEB_DEMO_CAPTION, s as ReferenceRatesTable, t as WebDemoMarketDetails, v as init_referenceHistory, w as readFx, x as writeReferenceRates, y as init_referenceRates } from "./WebDemoMarketDetails-nn3iSZk5.js";
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
/**
* Stores the callback in a known location, and returns an identifier that can be passed to the backend.
* The backend uses the identifier to `eval()` the callback.
*
* @return An unique identifier associated with the callback function.
*
* @since 1.0.0
*/
function transformCallback(callback, once = false) {
	return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
/**
* Sends a message to the backend.
* @example
* ```typescript
* import { invoke } from '@tauri-apps/api/core';
* await invoke('login', { user: 'tauri', password: 'poiwe3h4r5ip3yrhtew9ty' });
* ```
*
* @param cmd The command name.
* @param args The optional arguments to pass to the command.
* @param options The request options.
* @return A promise resolving or rejecting to the backend response.
*
* @since 1.0.0
*/
async function invoke(cmd, args = {}, options) {
	return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
/**
* Checks whether the code is running inside a Tauri webview.
*
* Useful for frontends that are also served on the web, to guard calls to APIs
* that only exist inside the application.
*
* @example
* ```typescript
* import { isTauri } from '@tauri-apps/api/core';
* import { getVersion } from '@tauri-apps/api/app';
*
* const version = isTauri() ? await getVersion() : 'web';
* ```
*
* @returns `true` when running inside a Tauri app, `false` otherwise (e.g. in a
* browser or in unit tests).
*
* @since 2.0.0
*/
function isTauri() {
	return !!(globalThis || window).isTauri;
}
var _Channel_instances, _Channel_onmessage, _Channel_nextMessageIndex, _Channel_pendingMessages, _Channel_messageEndIndex, _Channel_deliver, _Resource_rid, SERIALIZE_TO_IPC_FN, Channel, Resource;
function init_core() {
	return (init_core = __esmMin((() => {
		SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
		Channel = class {
			constructor(onmessage) {
				_Channel_instances.add(this);
				_Channel_onmessage.set(this, void 0);
				_Channel_nextMessageIndex.set(this, 0);
				_Channel_pendingMessages.set(this, []);
				_Channel_messageEndIndex.set(this, void 0);
				__classPrivateFieldSet(this, _Channel_onmessage, onmessage || (() => {}), "f");
				this.id = transformCallback((rawMessage) => {
					const index = rawMessage.index;
					if ("end" in rawMessage) {
						if (index == __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")) this.cleanupCallback();
						else __classPrivateFieldSet(this, _Channel_messageEndIndex, index, "f");
						return;
					}
					const message = rawMessage.message;
					if (index == __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")) {
						__classPrivateFieldGet(this, _Channel_instances, "m", _Channel_deliver).call(this, message);
						__classPrivateFieldSet(this, _Channel_nextMessageIndex, __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") + 1, "f");
						while (__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") in __classPrivateFieldGet(this, _Channel_pendingMessages, "f")) {
							const message = __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")];
							__classPrivateFieldGet(this, _Channel_instances, "m", _Channel_deliver).call(this, message);
							delete __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f")];
							__classPrivateFieldSet(this, _Channel_nextMessageIndex, __classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") + 1, "f");
						}
						if (__classPrivateFieldGet(this, _Channel_nextMessageIndex, "f") === __classPrivateFieldGet(this, _Channel_messageEndIndex, "f")) this.cleanupCallback();
					} else __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[index] = message;
				});
			}
			cleanupCallback() {
				window.__TAURI_INTERNALS__.unregisterCallback(this.id);
			}
			/**
			* The handler called for every message sent by the Rust side of this channel.
			*
			* Assigning a new handler replaces the previous one; messages that arrived
			* before a handler was set are not replayed, so set it (or pass it to the
			* constructor) before sending the channel to the backend.
			*/
			set onmessage(handler) {
				__classPrivateFieldSet(this, _Channel_onmessage, handler, "f");
			}
			get onmessage() {
				return __classPrivateFieldGet(this, _Channel_onmessage, "f");
			}
			[(_Channel_onmessage = /* @__PURE__ */ new WeakMap(), _Channel_nextMessageIndex = /* @__PURE__ */ new WeakMap(), _Channel_pendingMessages = /* @__PURE__ */ new WeakMap(), _Channel_messageEndIndex = /* @__PURE__ */ new WeakMap(), _Channel_instances = /* @__PURE__ */ new WeakSet(), _Channel_deliver = function _Channel_deliver(message) {
				try {
					__classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message);
				} catch (error) {
					queueMicrotask(() => {
						throw error;
					});
				}
			}, SERIALIZE_TO_IPC_FN)]() {
				return `__CHANNEL__:${this.id}`;
			}
			toJSON() {
				return this[SERIALIZE_TO_IPC_FN]();
			}
		};
		Resource = class {
			get rid() {
				return __classPrivateFieldGet(this, _Resource_rid, "f");
			}
			constructor(rid) {
				_Resource_rid.set(this, void 0);
				__classPrivateFieldSet(this, _Resource_rid, rid, "f");
			}
			/**
			* Destroys and cleans up this resource from memory.
			* **You should not call any method on this object anymore and should drop any reference to it.**
			*
			* @remarks Uses the `core:resources:allow-close` permission, which is part of
			* the `core:resources:default` permission set enabled by default.
			*/
			async close() {
				return invoke("plugin:resources|close", { rid: this.rid });
			}
			async [(_Resource_rid = /* @__PURE__ */ new WeakMap(), Symbol.asyncDispose)]() {
				await this.close();
			}
		};
	})))();
}
function formatDecimal(value) {
	const negative = value.startsWith("-");
	const [whole, fraction] = (negative ? value.slice(1) : value).split(".");
	const grouped = new Intl.NumberFormat("ko-KR").format(BigInt(whole));
	return `${negative && !/^-?0(?:\.0+)?$/.test(value) ? "-" : ""}${grouped}${fraction ? `.${fraction}` : ""}`;
}
function formatMoney(money, signed = false, maxFractionDigits) {
	if (!money) return "—";
	if (maxFractionDigits !== void 0) {
		const sign = money.amount.startsWith("-") ? "-" : "";
		const [whole, fraction = ""] = money.amount.replace(/^-/, "").split(".");
		const digits = Math.max(0, Math.min(12, maxFractionDigits));
		const scale = 10n ** BigInt(digits);
		const n = BigInt(whole) * scale + BigInt(fraction.slice(0, digits).padEnd(digits, "0") || "0") + (Number(fraction[digits] ?? "0") >= 5 ? 1n : 0n);
		if (n === 0n && !/^-?0(?:\.0+)?$/.test(money.amount)) return formatMoney(money, signed);
		const tail = digits ? (n % scale).toString().padStart(digits, "0").replace(/0+$/, "") : "";
		money = {
			...money,
			amount: sign + (n / scale).toString() + (tail ? "." + tail : "")
		};
	}
	const zero = /^-?0(?:\.0+)?$/.test(money.amount);
	return `${money.amount.startsWith("-") && !zero ? "-" : signed && !zero ? "+" : ""}${money.currency === "USD" ? "$" : ""}${formatDecimal(money.amount.replace(/^-/, ""))}${money.currency === "KRW" ? "원" : ""}`;
}
function localTime(value) {
	return new Intl.DateTimeFormat("ko-KR", {
		timeZone: "Asia/Seoul",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(new Date(value));
}
function init_format() {
	return (init_format = __esmMin((() => {})))();
}
function defaultMarketPrefs() {
	return {
		version: 1,
		order: [...ids],
		enabled: []
	};
}
function checked$1(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("시장 표시 설정 형식 오류");
	const p = value;
	const list = (v) => Array.isArray(v) && v.length <= ids.length && v.every((x) => ids.includes(x)) && new Set(v).size === v.length;
	if (Object.keys(p).sort().join(",") !== "enabled,order,version" || p.version !== 1 || !list(p.order) || p.order.length !== ids.length || !list(p.enabled)) throw Error("시장 표시 설정 형식 오류");
	return {
		version: 1,
		order: [...p.order],
		enabled: [...p.enabled]
	};
}
function readMarketPrefs(storage) {
	const raw = storage.getItem(MARKET_PREFS_KEY);
	if (raw === null) return defaultMarketPrefs();
	if (raw.length > 4096) throw Error("시장 표시 설정 형식 오류");
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		throw Error("시장 표시 설정 형식 오류");
	}
	return checked$1(parsed);
}
var MARKET_WIDGETS, MARKET_PREFS_KEY, ids;
function init_preferences() {
	return (init_preferences = __esmMin((() => {
		MARKET_WIDGETS = [
			{
				id: "kospi",
				label: "코스피"
			},
			{
				id: "kosdaq",
				label: "코스닥"
			},
			{
				id: "sp500",
				label: "S&P 500"
			},
			{
				id: "nasdaq",
				label: "나스닥 종합"
			},
			{
				id: "dow",
				label: "다우존스"
			},
			{
				id: "usdkrw",
				label: "달러/원"
			},
			{
				id: "vix",
				label: "VIX"
			}
		];
		MARKET_PREFS_KEY = "stockpin:market-widgets:v1";
		ids = MARKET_WIDGETS.map((w) => w.id);
	})))();
}
function init_market_widgets() {
	return (init_market_widgets = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-widgets.css";
			document.head.appendChild(l);
		}
	})))();
}
function load$1() {
	try {
		return {
			quote: readFx(window.localStorage),
			error: null,
			blocked: false
		};
	} catch {
		return {
			quote: null,
			error: "참고환율 저장값을 읽지 못했습니다. 원본은 변경하지 않았습니다.",
			blocked: true
		};
	}
}
function useReferenceFx() {
	const [state, setState] = (0, import_react$10.useState)(load$1);
	const [busy, setBusy] = (0, import_react$10.useState)(false);
	const active = (0, import_react$10.useRef)(false), epoch = (0, import_react$10.useRef)(0);
	(0, import_react$10.useLayoutEffect)(() => {
		const current = ++epoch.current;
		return () => {
			epoch.current = current + 1;
		};
	}, []);
	async function refresh() {
		if (!isTauri() || state.blocked || active.current) return;
		active.current = true;
		setBusy(true);
		const generation = epoch.current;
		try {
			const payload = await invoke("fetch_ecb_fx_reference");
			if (epoch.current !== generation) return;
			const quote = writeFx(window.localStorage, payload);
			setState({
				quote,
				error: null,
				blocked: false
			});
		} catch {
			if (epoch.current === generation) setState((old) => ({
				...old,
				error: "참고환율을 불러오거나 저장하지 못했습니다. 이전 표시와 저장값을 유지합니다."
			}));
		} finally {
			active.current = false;
			if (epoch.current === generation) setBusy(false);
		}
	}
	return {
		...state,
		busy,
		refresh,
		native: isTauri(),
		reload: () => setState(load$1())
	};
}
function ReferenceFxCaption({ quote }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("small", {
		className: "market-fx-caption",
		title: `출처: ECB ${quote.sourceUrl}\n1 EUR = ${quote.eurUsd} USD / ${quote.eurKrw} KRW\nKRW/EUR ÷ USD/EUR로 계산, 소수 8자리 반올림\n불러온 시각: ${quote.observedAt}\n실시간·거래용 환율이 아니며 자산 환산에 자동 적용하지 않습니다.`,
		children: [
			isOldFx(quote) ? "오래된 자료 · " : "",
			"ECB · ",
			quote.sourceDate,
			" · 계산 참고율 · 거래용 아님"
		]
	});
}
var import_react$10, import_jsx_runtime$10;
function init_ReferenceFxView() {
	return (init_ReferenceFxView = __esmMin((() => {
		import_react$10 = require_react();
		init_core();
		init_referenceFx();
		import_jsx_runtime$10 = require_jsx_runtime();
	})))();
}
function date(raw) {
	if (!/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) throw fail$1();
	const [m, d, y] = raw.split("/").map(Number);
	if (y < 1990) throw fail$1();
	const t = new Date(Date.UTC(y, m - 1, d));
	if (t.getUTCFullYear() !== y || t.getUTCMonth() !== m - 1 || t.getUTCDate() !== d) throw fail$1();
	return `${raw.slice(6)}-${raw.slice(0, 2)}-${raw.slice(3, 5)}`;
}
function price(raw) {
	return typeof raw === "string" && raw.length <= 64 && /^(?:0|[1-9]\d*)(?:\.\d{1,8})?$/.test(raw);
}
function day$1(now) {
	if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(now) || new Date(now).toISOString() !== now) throw fail$1();
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).formatToParts(new Date(now));
	const get = (type) => parts.find((p) => p.type === type).value;
	return `${get("year")}-${get("month")}-${get("day")}`;
}
function parseVixFile(text, importedAt) {
	const today = day$1(importedAt);
	if (new TextEncoder().encode(text).length > 2097152) throw fail$1();
	const rows = text.replace(/^\uFEFF/, "").split(/\r?\n/);
	while (rows.at(-1) === "") rows.pop();
	if (rows.shift() !== "DATE,OPEN,HIGH,LOW,CLOSE" || !rows.length || rows.length > 2e4) throw fail$1();
	let latest = null, previous = null;
	for (const line of rows) {
		const parts = line.split(",");
		if (parts.length !== 5 || !parts.slice(1).every(price)) throw fail$1();
		const [raw, open, high, low, close] = parts, sourceDate = date(raw);
		if (sourceDate > today || latest && sourceDate <= latest.sourceDate || compareDecimalStrings(low, high) > 0 || [open, close].some((v) => compareDecimalStrings(v, low) < 0 || compareDecimalStrings(v, high) > 0)) throw fail$1();
		previous = latest;
		latest = {
			sourceDate,
			sourceDateRaw: raw,
			close
		};
	}
	return {
		kind: "user_vix_csv_v1",
		sourceVerified: false,
		latest,
		previous,
		importedAt
	};
}
function checked(value, now) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw fail$1();
	const p = value;
	if (Object.keys(p).sort().join(",") !== "importedAt,kind,latest,previous,sourceVerified" || p.kind !== "user_vix_csv_v1" || p.sourceVerified !== false || typeof p.importedAt !== "string") throw fail$1();
	day$1(p.importedAt);
	if (p.importedAt > now) throw fail$1();
	const today = day$1(now);
	function row(value) {
		if (!value || typeof value !== "object" || Array.isArray(value)) throw fail$1();
		const r = value;
		if (Object.keys(r).sort().join(",") !== "close,sourceDate,sourceDateRaw" || !price(r.close) || typeof r.sourceDateRaw !== "string" || r.sourceDate !== date(r.sourceDateRaw) || String(r.sourceDate) > today) throw fail$1();
		return {
			sourceDate: String(r.sourceDate),
			sourceDateRaw: r.sourceDateRaw,
			close: r.close
		};
	}
	const latest = row(p.latest), previous = p.previous === null ? null : row(p.previous);
	if (previous && previous.sourceDate >= latest.sourceDate) throw fail$1();
	return {
		kind: "user_vix_csv_v1",
		sourceVerified: false,
		latest,
		previous,
		importedAt: p.importedAt
	};
}
function readVixFile(storage, now) {
	const raw = storage.getItem(VIX_FILE_KEY);
	if (raw === null) return null;
	if (raw.length > 8192) throw fail$1();
	return checked(JSON.parse(raw), now);
}
function writeVixFile(storage, quote, now) {
	const value = checked(quote, now), previous = readVixFile(storage, now);
	if (previous && previous.latest.sourceDate > value.latest.sourceDate) throw fail$1();
	storage.setItem(VIX_FILE_KEY, JSON.stringify(value));
	return value;
}
var VIX_FILE_KEY, fail$1;
function init_vixFile() {
	return (init_vixFile = __esmMin((() => {
		init_portfolio();
		VIX_FILE_KEY = "stockpin:vix-file:v1";
		fail$1 = () => /* @__PURE__ */ new Error("VIX 파일 형식을 확인해 주세요.");
	})))();
}
function init_vix_file() {
	return (init_vix_file = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/vix-file.css";
			document.head.appendChild(l);
		}
	})))();
}
function load() {
	try {
		return {
			quote: readVixFile(window.localStorage, (/* @__PURE__ */ new Date()).toISOString()),
			error: null,
			blocked: false
		};
	} catch {
		return {
			quote: null,
			error: "가져온 VIX 저장값을 읽지 못했습니다. 원본은 변경하지 않았습니다.",
			blocked: true
		};
	}
}
function VixFileQuoteView() {
	const [state, setState] = (0, import_react$9.useState)(load), [busy, setBusy] = (0, import_react$9.useState)(false), [clock, setClock] = (0, import_react$9.useState)(() => Date.now());
	const input = (0, import_react$9.useRef)(null), epoch = (0, import_react$9.useRef)(0), active = (0, import_react$9.useRef)(false);
	(0, import_react$9.useLayoutEffect)(() => {
		const lifetime = epoch;
		lifetime.current++;
		const timer = setInterval(() => setClock(Date.now()), 6e4);
		return () => {
			lifetime.current++;
			clearInterval(timer);
		};
	}, []);
	async function importFile(file) {
		if (active.current || state.blocked) return;
		active.current = true;
		setBusy(true);
		const ticket = ++epoch.current;
		try {
			if (!Number.isSafeInteger(file.size) || file.size === 0 || file.size > 2097152) throw Error("size");
			const text = await file.text();
			if (epoch.current !== ticket) return;
			const now = (/* @__PURE__ */ new Date()).toISOString(), quote = parseVixFile(text, now);
			if (epoch.current !== ticket) return;
			const saved = writeVixFile(window.localStorage, quote, now);
			setState({
				quote: saved,
				error: null,
				blocked: false
			});
		} catch {
			if (epoch.current === ticket) setState((old) => ({
				...old,
				error: "VIX 파일을 읽거나 저장하지 못했습니다. 이전 표시와 저장값을 유지합니다."
			}));
		} finally {
			active.current = false;
			if (epoch.current === ticket) setBusy(false);
		}
	}
	const old = state.quote && clock - Date.parse(state.quote.latest.sourceDate + "T00:00:00Z") > 6048e5;
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", {
			className: "market-vix-meaning",
			children: "S&P 500 옵션 · 약 30일 예상 변동성 (연율 %)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("strong", {
			"data-market-value": true,
			children: state.quote ? formatMoney({
				amount: state.quote.latest.close,
				currency: "INDEX"
			}, false, 2) : "—"
		}),
		state.quote && /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("small", {
			className: "market-vix-caption",
			title: `사용자가 VIX로 지정해 가져온 파일입니다. 원본의 출처·진위를 검증하지 않았습니다.\n파일 날짜 원문: ${state.quote.latest.sourceDateRaw}\n가져온 시각: ${state.quote.importedAt}\n종가의 확정 시각을 추정하지 않으며 실시간 지수가 아닙니다.`,
			children: [
				old ? "오래된 파일 · " : "",
				state.quote.latest.sourceDate,
				" · 파일 종가 · 출처 미검증"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("input", {
			ref: input,
			className: "market-vix-input",
			type: "file",
			accept: ".csv,text/csv",
			tabIndex: -1,
			"aria-hidden": "true",
			onChange: (e) => {
				const file = e.currentTarget.files?.[0];
				e.currentTarget.value = "";
				if (file) importFile(file);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
			type: "button",
			className: "market-vix-import",
			disabled: busy || state.blocked,
			onClick: () => input.current?.click(),
			children: busy ? "파일 읽는 중" : "VIX 파일 가져오기"
		}),
		state.error && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("p", {
			role: "alert",
			className: "market-vix-error",
			children: state.error
		}),
		state.blocked && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
			type: "button",
			onClick: () => setState(load()),
			children: "VIX 저장값 다시 읽기"
		})
	] });
}
var import_react$9, import_jsx_runtime$9;
function init_VixFileQuoteView() {
	return (init_VixFileQuoteView = __esmMin((() => {
		import_react$9 = require_react();
		init_vixFile();
		init_vix_file();
		import_jsx_runtime$9 = require_jsx_runtime();
	})))();
}
function MarketWidgetStrip({ prefs }) {
	const fx = useReferenceFx();
	const visible = prefs.order.filter((id) => prefs.enabled.includes(id));
	if (!visible.length) return null;
	const hasFx = visible.includes("usdkrw");
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("section", {
		className: "market-indicators",
		"aria-label": "시장 지표",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("h2", { children: "시장 지표" }),
				/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: hasFx && fx.quote ? visible.some((id) => id !== "usdkrw") ? "일부 공급 미연결" : "ECB 참고환율" : "공급 미연결" }),
				hasFx && fx.native && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
					disabled: fx.busy || fx.blocked,
					onClick: () => void fx.refresh(),
					children: fx.busy ? "참고환율 불러오는 중" : "ECB 참고환율 불러오기"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "market-indicator-values",
				children: visible.map((id) => /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					"data-market-id": id,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("span", { children: MARKET_WIDGETS.find((w) => w.id === id).label }),
						id === "vix" ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(VixFileQuoteView, {}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("strong", {
							"data-market-value": true,
							children: id === "usdkrw" && fx.quote ? new Intl.NumberFormat("ko-KR", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}).format(Number(fx.quote.krwPerUsd)) : "—"
						}),
						id === "usdkrw" && fx.quote && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ReferenceFxCaption, { quote: fx.quote })
					]
				}, id))
			}),
			hasFx && fx.error && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("p", {
				role: "alert",
				className: "market-fx-error",
				children: fx.error
			}),
			hasFx && fx.blocked && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
				onClick: fx.reload,
				children: "참고환율 저장값 다시 읽기"
			})
		]
	});
}
function MarketWidgetCard({ id }) {
	const fx = useReferenceFx(), label = MARKET_WIDGETS.find((w) => w.id === id).label, hasFx = id === "usdkrw";
	return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("section", {
		className: "market-indicators",
		"aria-label": label,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("h3", { children: label }), hasFx && fx.native && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
				disabled: fx.busy || fx.blocked,
				onClick: () => void fx.refresh(),
				children: fx.busy ? "참고환율 불러오는 중" : "ECB 참고환율 불러오기"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "market-indicator-values",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
					"data-market-id": id,
					children: [id === "vix" ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(VixFileQuoteView, {}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("strong", {
						"data-market-value": true,
						children: hasFx && fx.quote ? new Intl.NumberFormat("ko-KR", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						}).format(Number(fx.quote.krwPerUsd)) : "—"
					}), hasFx && fx.quote ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ReferenceFxCaption, { quote: fx.quote }) : id !== "vix" && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("small", {
						className: "scope-copy",
						children: "공급 미연결"
					})]
				})
			}),
			hasFx && fx.error && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("p", {
				role: "alert",
				className: "market-fx-error",
				children: fx.error
			}),
			hasFx && fx.blocked && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
				onClick: fx.reload,
				children: "참고환율 저장값 다시 읽기"
			})
		]
	});
}
var import_jsx_runtime$8;
function init_MarketWidgets() {
	return (init_MarketWidgets = __esmMin((() => {
		require_react();
		init_AppIcon();
		init_preferences();
		init_market_widgets();
		init_ReferenceFxView();
		init_VixFileQuoteView();
		import_jsx_runtime$8 = require_jsx_runtime();
	})))();
}
function init_fear_greed_details() {
	return (init_fear_greed_details = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/fear-greed-details.css";
			document.head.appendChild(l);
		}
	})))();
}
function init_WebDemoMarket() {
	return (init_WebDemoMarket = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/WebDemoMarket.css";
			document.head.appendChild(l);
		}
	})))();
}
function presentation(row) {
	return {
		id: row.id,
		label: row.label,
		value: row.displayValue,
		valueTitle: row.value === null ? "미확인" : row.category === "fx" ? `${row.baseAmount} ${row.base} = ${row.value} ${row.quote} · 가상` : `${row.value} ${row.unit} · 가상`,
		unit: row.unit,
		segments: row.mini.segments,
		trendTitle: `${WEB_DEMO_CAPTION} · 최근 30일 가상 표본`,
		direction: row.direction,
		change: row.change === null ? "등락 미확인" : `${row.change} ${row.unit} (${row.percent})`,
		comparison: row.comparisonDate ? `${row.comparisonDate} 대비` : null
	};
}
/** Index hierarchy is deliberately separate from the left-trend/right-value FX rows. */
function WebDemoIndexRows({ rows, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("dl", {
		className: "web-demo-index-rows",
		children: rows.map((row) => {
			const known = row.status === "ready" && row.value !== null;
			const compared = known && row.change !== null && row.percent !== null && row.comparisonDate !== null;
			const direction = compared ? row.direction : "unknown";
			const provenance = `${row.provenance.label} · ${row.provenance.source} · 기준일 ${row.sourceDate ?? "미확인"}`;
			const valueTitle = `${provenance} · ${row.value ?? "미확인"} ${row.unit}`;
			const comparisonTitle = `${provenance} · ${row.comparisonDate ?? "미확인"} 대비 · ${compared ? `${row.change} ${row.unit} (${row.percent})` : "등락 미확인"}`;
			const trendTitle = `${provenance} · ${row.mini.points.map((point) => `${point.date}: ${point.value} ${row.unit}`).join(" · ")}`;
			return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				"data-index-id": row.id,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
						type: "button",
						"aria-haspopup": "dialog",
						"aria-label": `${row.label} 상세 추이`,
						onClick: (event) => onOpen(row.id, event.currentTarget),
						children: row.label
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("dd", {
						className: "web-demo-index-quote",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("strong", {
							title: valueTitle,
							children: known ? row.displayValue : "미확인"
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
							className: "web-demo-index-change",
							"data-direction": direction,
							title: comparisonTitle,
							children: compared ? `${row.change} (${row.percent})` : "등락 미확인"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("dd", {
						className: "web-demo-index-trend",
						"data-direction": direction,
						children: known && row.mini.segments.length ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
							viewBox: "0 0 96 32",
							role: "img",
							"aria-label": `${row.label} 일별 추이`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("title", { children: trendTitle }), row.mini.segments.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("polyline", { points }, i))]
						}) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", { children: "추이 미확인" })
					})
				]
			}, row.id);
		})
	});
}
/** Uses the native gauge geometry/styles without forging a provider FearQuote. */
function WebDemoMarketGauge({ row }) {
	const label = row.category === "stocksSentiment" ? "주식 공포·탐욕" : row.label;
	const meaning = row.category === "stocksSentiment" ? "주식 심리 · 0–100점 · 매매 신호 아님" : row.meaning;
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		className: "fear-gauge",
		children: [row.value !== null && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("svg", {
			viewBox: "0 0 72 72",
			width: "72",
			height: "72",
			role: "meter",
			"aria-label": `${row.label} 가상 점수`,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": Number(row.value),
			"aria-valuetext": `${row.value}점 · 가상 기준일 2024-03-31`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("circle", {
					className: "fear-gauge-track",
					cx: "36",
					cy: "36",
					r: "32"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("circle", {
					className: "fear-gauge-progress",
					cx: "36",
					cy: "36",
					r: "32",
					pathLength: "100",
					strokeDasharray: `${row.value} 100`,
					transform: "rotate(-90 36 36)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("text", {
					x: "36",
					y: "36",
					dy: ".35em",
					textAnchor: "middle",
					className: "fear-gauge-score",
					children: row.value
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "fear-gauge-info",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h3", {
					title: row.label,
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", {
					className: "fear-gauge-state",
					children: row.value === null ? "값 미확인" : `${row.value} / 100점`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", {
					className: "fear-meta",
					title: `${row.meaning} · ${WEB_DEMO_CAPTION}`,
					children: meaning
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("dl", {
					className: "web-demo-sentiment-comparisons",
					children: row.comparisons?.map((comparison) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("dt", { children: comparison.label }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("dd", {
						title: comparison.value === null ? "미확인" : `${comparison.value}점`,
						children: [comparison.value === null ? "미확인" : `${displayReferenceRate(comparison.value)}점`, /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("time", {
							dateTime: comparison.date,
							children: comparison.date
						})]
					})] }, comparison.key))
				})
			]
		})]
	});
}
function WebDemoMarketPanels({ view, group }) {
	const [detail, setDetail] = (0, import_react$7.useState)(null), opener = (0, import_react$7.useRef)(null);
	const market = view.market, selected = [
		...market.fx,
		...market.indices,
		market.stocksSentiment,
		market.bitcoinSentiment,
		market.vix
	].find((row) => row.id === detail);
	const open = (id, button) => {
		opener.current = button;
		setDetail(id);
	};
	const close = () => {
		setDetail(null);
		if (opener.current?.isConnected) opener.current.focus();
	};
	const indexGroups = [{
		name: "한국",
		rows: market.indices.filter((row) => ["kospi", "kosdaq"].includes(row.id))
	}, {
		name: "미국",
		rows: market.indices.filter((row) => !["kospi", "kosdaq"].includes(row.id))
	}].filter((item) => group === "all" || (group === "kr" ? item.name === "한국" : group === "us" && item.name === "미국"));
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
		market.status !== "ready" && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", {
			role: market.status === "error" ? "alert" : "status",
			children: market.status === "error" ? "가상 자료 확인 실패" : market.status === "empty" ? "가상 자료 없음" : "가상 자료 미조회"
		}),
		group !== "fx" && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("section", {
			className: "market-indicators reference-rates-table web-demo-market-indices",
			"aria-label": "가상 시장 지수",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("header", {
				className: "reference-rates-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h2", { children: "시장 지수" })
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "reference-rate-groups",
				children: indexGroups.map((item) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "reference-rate-group",
					role: "group",
					"aria-label": item.name,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h3", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WebDemoIndexRows, {
						rows: item.rows,
						onOpen: open
					})]
				}, item.name))
			})]
		}),
		(group === "all" || group === "fx") && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("section", {
			className: "market-indicators reference-rates-table web-demo-market-fx",
			"aria-label": "가상 환율",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("header", {
				className: "reference-rates-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h2", { children: "환율" })
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "reference-rate-groups",
				children: [{
					name: "원화 기준",
					rows: market.fx.filter((row) => row.quote === "KRW")
				}, {
					name: "교차환율",
					rows: market.fx.filter((row) => row.quote !== "KRW")
				}].map((item) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "reference-rate-group",
					role: "group",
					"aria-label": item.name,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h3", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReferenceRateRows, {
						rows: item.rows.map(presentation),
						onOpen: open
					})]
				}, item.name))
			})]
		}),
		(group === "all" || group === "us") && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("section", {
			className: "market-mood",
			"aria-label": "미국 주식 변동성·심리",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("h2", { children: "미국 주식 변동성·심리" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				className: "market-mood-values",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "reference-rates-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ReferenceRateRows, {
						rows: [presentation(market.vix)],
						onOpen: open
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", { children: market.vix.meaning })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "web-demo-market-stocks",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WebDemoMarketGauge, { row: market.stocksSentiment }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
						type: "button",
						"aria-haspopup": "dialog",
						onClick: (event) => open(market.stocksSentiment.id, event.currentTarget),
						children: "주식 심리 상세 추이"
					})]
				})]
			})]
		}),
		group === "all" && /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("section", {
			className: "market-crypto bitcoin-sentiment web-demo-market-bitcoin",
			"aria-label": "가상자산 심리",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WebDemoMarketGauge, { row: market.bitcoinSentiment }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
				type: "button",
				"aria-haspopup": "dialog",
				onClick: (event) => open(market.bitcoinSentiment.id, event.currentTarget),
				children: "비트코인 심리 상세 추이"
			})]
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(WebDemoMarketDetails, {
			row: selected,
			series: view.series[selected.id],
			onClose: close
		}, selected.id)
	] });
}
var import_react$7, import_jsx_runtime$7;
function init_WebDemoMarketPanels() {
	return (init_WebDemoMarketPanels = __esmMin((() => {
		import_react$7 = require_react();
		init_ReferenceRatesTable();
		init_WebDemoMarketDetails();
		init_WebDemoMarketModel();
		init_fear_greed_details();
		init_WebDemoMarket();
		import_jsx_runtime$7 = require_jsx_runtime();
	})))();
}
var import_react$6, MarketDataContext;
function init_marketDataContext() {
	return (init_marketDataContext = __esmMin((() => {
		import_react$6 = require_react();
		MarketDataContext = (0, import_react$6.createContext)({});
	})))();
}
function exact(v, keys) {
	if (Object.keys(v).sort().join(",") !== keys.sort().join(",")) throw fail();
}
function text(v, max) {
	if (typeof v !== "string" || !v.trim() || v.length > max || [...v].some((c) => c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127)) throw fail();
	return v;
}
/** Structural admission only; a provider must separately verify universe membership and data rights. */
function parseMarketSnapshot(input, market, now) {
	const v = object(input);
	exact(v, [
		"market",
		"asOf",
		"sourceLabel",
		"sourceUrl",
		"universeSize",
		"rows"
	]);
	if (![
		"kospi",
		"kosdaq",
		"sp500",
		"nasdaq"
	].includes(market) || v.market !== market) throw fail();
	const asOf = text(v.asOf, 40), date = Date.parse(asOf), clock = Date.parse(now);
	if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(asOf) || !Number.isFinite(date) || !Number.isFinite(clock) || date > clock || new Date(date).toISOString().slice(0, 19) !== asOf.slice(0, 19)) throw fail();
	const sourceLabel = text(v.sourceLabel, 100), sourceUrl = text(v.sourceUrl, 600);
	let url;
	try {
		url = new URL(sourceUrl);
	} catch {
		throw fail();
	}
	if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) throw fail();
	if (!Number.isSafeInteger(v.universeSize) || Number(v.universeSize) < 1 || Number(v.universeSize) > 5e3 || !Array.isArray(v.rows) || v.rows.length > Number(v.universeSize)) throw fail();
	const seen = /* @__PURE__ */ new Set();
	const rows = v.rows.map((raw) => {
		const row = object(raw);
		exact(row, [
			"symbol",
			"name",
			"sector",
			"marketCap",
			"changePct"
		]);
		const symbol = text(row.symbol, 24);
		if (!/^[A-Z0-9^._-]+$/.test(symbol) || seen.has(symbol)) throw fail();
		seen.add(symbol);
		if (row.marketCap !== null && (typeof row.marketCap !== "string" || !/^[1-9]\d{0,29}$/.test(row.marketCap))) throw fail();
		if (row.changePct !== null && (typeof row.changePct !== "string" || !/^-?(?:0|[1-9]\d{0,5})(?:\.\d{1,12})?$/.test(row.changePct))) throw fail();
		return {
			symbol,
			name: text(row.name, 120),
			sector: text(row.sector, 80),
			marketCap: row.marketCap,
			changePct: row.changePct
		};
	});
	return {
		market,
		asOf,
		sourceLabel,
		sourceUrl,
		universeSize: Number(v.universeSize),
		rows
	};
}
function marketBreadth(snapshot) {
	let up = 0, down = 0, flat = 0;
	for (const row of snapshot.rows) {
		if (row.changePct === null) continue;
		const sign = compareDecimalStrings(row.changePct, "0");
		if (sign > 0) up++;
		else if (sign < 0) down++;
		else flat++;
	}
	const unknown = snapshot.universeSize - up - down - flat;
	return {
		up,
		down,
		flat,
		unknown,
		advancePct: unknown === 0 ? decimalRatioPercent(String(up), String(snapshot.universeSize)) : null
	};
}
/** Floating point is used for geometry only. Original monetary strings are never rounded. */
function marketRectangles(rows) {
	const sorted = rows.filter((row) => row.marketCap !== null).slice().sort((a, b) => {
		const ac = BigInt(a.marketCap), bc = BigInt(b.marketCap);
		return ac === bc ? a.symbol.localeCompare(b.symbol) : ac > bc ? -1 : 1;
	});
	const rectangles = [];
	function split(items, x, y, width, height) {
		if (!items.length) return;
		if (items.length === 1) {
			rectangles.push({
				row: items[0],
				x,
				y,
				width,
				height
			});
			return;
		}
		const total = items.reduce((sum, row) => sum + BigInt(row.marketCap), 0n);
		let amount = 0n, at = 0;
		while (at < items.length - 1 && amount * 2n < total) {
			amount += BigInt(items[at].marketCap);
			at++;
		}
		const fraction = Number(amount) / Number(total);
		if (width >= height) {
			const first = width * fraction;
			split(items.slice(0, at), x, y, first, height);
			split(items.slice(at), x + first, y, width - first, height);
		} else {
			const first = height * fraction;
			split(items.slice(0, at), x, y, width, first);
			split(items.slice(at), x, y + first, width, height - first);
		}
	}
	split(sorted, 0, 0, 100, 100);
	return rectangles;
}
var fail, object;
function init_marketSnapshot() {
	return (init_marketSnapshot = __esmMin((() => {
		init_portfolio();
		fail = () => Error("시장 자료 형식 또는 범위를 확인할 수 없습니다.");
		object = (v) => {
			if (!v || typeof v !== "object" || Array.isArray(v)) throw fail();
			return v;
		};
	})))();
}
function MarketHeatmap({ market, input }) {
	const [now, setNow] = (0, import_react$5.useState)(() => (/* @__PURE__ */ new Date()).toISOString());
	(0, import_react$5.useEffect)(() => {
		const timer = setInterval(() => setNow((/* @__PURE__ */ new Date()).toISOString()), 6e4);
		return () => clearInterval(timer);
	}, []);
	const [sectorChoice, setSector] = (0, import_react$5.useState)(null);
	const [selected, setSelected] = (0, import_react$5.useState)(null), [focused, setFocused] = (0, import_react$5.useState)(null);
	let data;
	try {
		data = input == null ? null : parseMarketSnapshot(input, market, now);
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
			role: "alert",
			children: "시장 자료를 확인할 수 없습니다. 수치는 표시하지 않습니다."
		});
	}
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
		className: "market-empty",
		children: "시장 자료 미연결"
	});
	const breadth = marketBreadth(data), sectors = [...new Set(data.rows.map((row) => row.sector))].sort();
	const sector = sectorChoice?.market === market && sectors.includes(sectorChoice.value) ? sectorChoice.value : null;
	const rows = sector ? data.rows.filter((row) => row.sector === sector) : data.rows, rects = marketRectangles(rows);
	const key = (symbol) => market + ":" + symbol, detail = rows.find((row) => key(row.symbol) === selected), tab = rects.find((rect) => key(rect.row.symbol) === focused)?.row.symbol ?? rects[0]?.row.symbol;
	function keyboard(event) {
		const buttons = [...event.currentTarget.parentElement.querySelectorAll("[data-heatmap-symbol]")], i = buttons.indexOf(event.currentTarget);
		if (event.key === "Escape") {
			setSelected(null);
			return;
		}
		const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : event.key === "ArrowRight" || event.key === "ArrowDown" ? (i + 1) % buttons.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (i + buttons.length - 1) % buttons.length : null;
		if (next !== null) {
			event.preventDefault();
			buttons[next]?.focus({ preventScroll: true });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(import_jsx_runtime$6.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "market-breadth",
			"aria-label": "시장 전체 등락",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", { children: ["상승 ", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("b", { children: breadth.up })] }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", { children: ["하락 ", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("b", { children: breadth.down })] }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", { children: ["보합 ", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("b", { children: breadth.flat })] }),
				breadth.unknown > 0 && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", { children: ["미확인 ", /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("b", { children: breadth.unknown })] }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: breadth.advancePct === null ? "전체 상승 비율 미확인" : `상승 비율 ${breadth.advancePct}%` })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			className: "market-sector-choices",
			role: "group",
			"aria-label": "히트맵 업종 확대",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
				type: "button",
				"aria-pressed": !sector,
				onClick: () => setSector(null),
				children: "전체"
			}), sectors.map((value) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
				type: "button",
				"aria-pressed": sector === value,
				onClick: () => setSector({
					market,
					value
				}),
				children: value
			}, value))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("p", {
			className: "market-map-key",
			children: ["면적 · 시가총액 / 색 · 전일 대비", sector && ` · ${sector}`]
		}),
		rects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			className: "market-treemap",
			role: "group",
			"aria-label": `${MARKET_UNIVERSES.find((u) => u.id === market).label} 시가총액 히트맵`,
			children: rects.map((rect) => {
				const row = rect.row, sign = row.changePct === null ? null : compareDecimalStrings(row.changePct, "0");
				const change = row.changePct === null ? "등락 미확인" : `${sign === 1 ? "+" : ""}${row.changePct}%`;
				return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("button", {
					type: "button",
					"data-heatmap-symbol": row.symbol,
					"data-direction": sign === null ? "unknown" : sign === 1 ? "up" : sign === -1 ? "down" : "flat",
					"aria-pressed": selected === key(row.symbol),
					"aria-label": `${row.name} · ${row.sector} · ${change}`,
					title: `${row.name} (${row.symbol})\n${row.sector}\n전일 대비 ${change}`,
					tabIndex: tab === row.symbol ? 0 : -1,
					onFocus: () => setFocused(key(row.symbol)),
					onKeyDown: keyboard,
					onClick: () => setSelected(key(row.symbol)),
					style: {
						left: `${rect.x}%`,
						top: `${rect.y}%`,
						width: `${rect.width}%`,
						height: `${rect.height}%`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("strong", { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: change })]
				}, row.symbol);
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
			className: "market-empty",
			children: "표시할 시가총액 자료가 없습니다."
		}),
		rows.some((row) => row.marketCap === null) && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("p", {
			className: "market-map-missing",
			children: [
				"시가총액 미확인 ",
				rows.filter((row) => row.marketCap === null).length,
				"종목은 면적에서 제외"
			]
		}),
		detail && /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("section", {
			className: "market-stock-detail",
			"aria-label": "선택 종목 정보",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("h3", { children: [
					detail.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: detail.symbol })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", { children: detail.sector }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", { children: ["시가총액 ", detail.marketCap === null ? "미확인" : `${BigInt(detail.marketCap).toLocaleString("ko-KR")} ${market === "kospi" || market === "kosdaq" ? "KRW" : "USD"}`] }),
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("span", { children: ["전일 대비 ", detail.changePct === null ? "미확인" : detail.changePct + "%"] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("p", {
			className: "market-source",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("a", {
					href: data.sourceUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: data.sourceLabel
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("time", {
					dateTime: data.asOf,
					children: [new Intl.DateTimeFormat("ko-KR", {
						timeZone: "Asia/Seoul",
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						hourCycle: "h23"
					}).format(new Date(data.asOf)), " KST"]
				}),
				" · 구성 ",
				data.rows.length,
				"/",
				data.universeSize,
				"종목",
				Date.parse(now) - Date.parse(data.asOf) > 1296e5 && " · 기준시각 36시간 경과"
			]
		})
	] });
}
var import_react$5, import_jsx_runtime$6, MARKET_UNIVERSES;
function init_MarketHeatmap() {
	return (init_MarketHeatmap = __esmMin((() => {
		import_react$5 = require_react();
		init_portfolio();
		init_marketSnapshot();
		import_jsx_runtime$6 = require_jsx_runtime();
		MARKET_UNIVERSES = [
			{
				id: "kospi",
				label: "코스피"
			},
			{
				id: "kosdaq",
				label: "코스닥"
			},
			{
				id: "sp500",
				label: "S&P 500"
			},
			{
				id: "nasdaq",
				label: "나스닥 종합"
			}
		];
	})))();
}
function createReferenceRatesLoader(options) {
	let disposed = false;
	let state = {
		quote: null,
		busy: false,
		blocked: false,
		error: null
	};
	const snapshot = () => ({
		...state,
		quote: state.quote ? structuredClone(state.quote) : null
	});
	const publish = () => {
		if (!disposed) options.changed?.(snapshot());
	};
	function reload() {
		if (disposed || state.busy) return;
		try {
			state = {
				...state,
				quote: readReferenceRates(options.storage(), options.now()),
				blocked: false,
				error: null
			};
		} catch {
			state = {
				...state,
				blocked: true,
				error: "참고환율 저장값 확인 필요"
			};
		}
		publish();
	}
	async function refresh() {
		if (disposed || state.busy || state.blocked) return;
		state = {
			...state,
			busy: true
		};
		publish();
		try {
			const payload = await options.fetch();
			if (disposed) return;
			const quote = writeReferenceRates(options.storage(), payload, options.now());
			state = {
				...state,
				quote,
				error: null,
				blocked: false
			};
		} catch {
			if (!disposed) state = {
				...state,
				error: state.quote ? "환율 갱신 실패 · 이전 자료 유지" : "환율을 불러오지 못했습니다"
			};
		} finally {
			if (!disposed) {
				state = {
					...state,
					busy: false
				};
				publish();
			}
		}
	}
	reload();
	return {
		snapshot,
		refresh,
		reload,
		dispose: () => {
			disposed = true;
		}
	};
}
function init_referenceRatesLoader() {
	return (init_referenceRatesLoader = __esmMin((() => {
		init_referenceRates();
	})))();
}
function createReferenceHistoryLoader(options) {
	let disposed = false, floor = options.now();
	let state = {
		history: null,
		busy: false,
		blocked: false,
		error: null
	};
	const snapshot = () => structuredClone(state);
	const publish = () => {
		if (!disposed) options.changed?.(snapshot());
	};
	function read(raw) {
		if (raw === null) return null;
		if (new TextEncoder().encode(raw).length > 262144) throw Error();
		return decodeReferenceHistory(JSON.parse(raw), options.now());
	}
	function reload() {
		if (disposed || state.busy) return;
		try {
			state = {
				...state,
				history: read(options.storage().getItem(REFERENCE_HISTORY_KEY)),
				blocked: false,
				error: null
			};
		} catch {
			state = {
				...state,
				blocked: true,
				error: "환율 과거 저장값 확인 필요"
			};
		}
		publish();
	}
	async function refresh() {
		if (disposed || state.busy || state.blocked) return;
		state = {
			...state,
			busy: true,
			error: null
		};
		publish();
		try {
			const start = options.now();
			if (!Number.isFinite(start) || start < floor) throw Error();
			floor = start;
			let storage, expected, stored;
			try {
				storage = options.storage();
				expected = storage.getItem(REFERENCE_HISTORY_KEY);
				stored = read(expected);
			} catch {
				state = {
					...state,
					blocked: true
				};
				throw Error();
			}
			const payload = await options.fetch();
			if (disposed) return;
			const end = options.now();
			if (!Number.isFinite(end) || end < floor) throw Error();
			floor = end;
			const history = decodeReferenceHistory(payload, end);
			const storedNewer = stored && (!state.history || stored.observedAt > state.history.observedAt || stored.observations.at(-1).sourceDate > state.history.observations.at(-1).sourceDate);
			for (const old of [state.history, stored]) if (old && (history.observedAt < old.observedAt || history.observations.at(-1).sourceDate < old.observations.at(-1).sourceDate)) {
				if (storedNewer) state = {
					...state,
					blocked: true
				};
				throw Error();
			}
			if (storage.getItem("stockpin:ecb-reference-history:v1") !== expected) {
				state = {
					...state,
					blocked: true
				};
				throw Error();
			}
			try {
				storage.setItem(REFERENCE_HISTORY_KEY, JSON.stringify(history));
			} catch {
				state = {
					...state,
					blocked: true
				};
				throw Error();
			}
			state = {
				...state,
				history,
				error: null
			};
		} catch {
			if (!disposed) state = {
				...state,
				error: state.history ? "환율 추이 갱신 실패 · 이전 자료 유지" : "환율 추이를 불러오지 못했습니다"
			};
		} finally {
			if (!disposed) {
				state = {
					...state,
					busy: false
				};
				publish();
			}
		}
	}
	reload();
	return {
		snapshot,
		reload,
		refresh,
		dispose: () => {
			disposed = true;
		}
	};
}
function init_referenceHistoryLoader() {
	return (init_referenceHistoryLoader = __esmMin((() => {
		init_referenceHistory();
	})))();
}
/** Explicit public-data owner. Construction/reload are read-only. */
function createReferenceYearHistoryLoader(options) {
	let disposed = false, generation = 0;
	let baseline = null, baselineRaw = null;
	let state = {
		history: null,
		busy: false,
		blocked: false,
		error: null
	};
	const snapshot = () => structuredClone(state);
	const publish = () => {
		if (!disposed) options.changed?.(snapshot());
	};
	function reload() {
		if (disposed || state.busy) return;
		try {
			const storage = options.storage(), raw = storage.getItem(REFERENCE_YEAR_HISTORY_KEY);
			const history = readReferenceYearHistory({ getItem: () => raw }, options.now());
			baseline = storage;
			baselineRaw = raw;
			state = {
				...state,
				history,
				blocked: false,
				error: null
			};
		} catch {
			state = {
				...state,
				blocked: true,
				error: "연간 환율 저장값 확인 필요"
			};
		}
		publish();
	}
	async function refresh() {
		if (disposed || state.busy || state.blocked) return;
		const lease = generation;
		state = {
			...state,
			busy: true,
			error: null
		};
		publish();
		try {
			let storage, expected;
			try {
				storage = options.storage();
				expected = storage.getItem(REFERENCE_YEAR_HISTORY_KEY);
				if (storage !== baseline || expected !== baselineRaw) throw Error();
				readReferenceYearHistory({ getItem: () => expected }, options.now());
			} catch {
				state = {
					...state,
					blocked: true
				};
				throw Error();
			}
			const payload = await options.fetch();
			if (disposed || lease !== generation) return;
			try {
				if (options.storage() !== storage || storage.getItem("stockpin:ecb-reference-history-year:v1") !== expected) throw Error();
			} catch {
				state = {
					...state,
					blocked: true
				};
				throw Error();
			}
			const history = writeReferenceYearHistory({
				getItem: (key) => storage.getItem(key),
				setItem: (key, value) => {
					try {
						storage.setItem(key, value);
						baselineRaw = value;
					} catch {
						state = {
							...state,
							blocked: true
						};
						throw Error();
					}
				}
			}, payload, options.now());
			state = {
				...state,
				history,
				error: null
			};
		} catch {
			if (!disposed) state = {
				...state,
				error: state.history ? "연간 환율 갱신 실패 · 이전 자료 유지" : "연간 환율 불러오기 실패"
			};
		} finally {
			if (!disposed) {
				state = {
					...state,
					busy: false
				};
				publish();
			}
		}
	}
	reload();
	return {
		snapshot,
		reload,
		refresh,
		cancel: () => {
			generation++;
		},
		dispose: () => {
			disposed = true;
		}
	};
}
function init_referenceYearHistoryLoader() {
	return (init_referenceYearHistoryLoader = __esmMin((() => {
		init_referenceYearHistory();
	})))();
}
function MarketReferenceRates() {
	const pending = (0, import_react$4.useRef)(false);
	const [yearState, setYearState] = (0, import_react$4.useState)({
		history: null,
		busy: false,
		blocked: false,
		error: null
	});
	const yearOwner = (0, import_react$4.useRef)(null);
	(0, import_react$4.useLayoutEffect)(() => {
		const current = createReferenceYearHistoryLoader({
			storage: () => window.localStorage,
			fetch: () => invoke("fetch_ecb_reference_year_history"),
			now: () => Date.now(),
			changed: setYearState
		});
		yearOwner.current = current;
		setYearState(current.snapshot());
		return () => {
			if (yearOwner.current === current) yearOwner.current = null;
			current.dispose();
		};
	}, []);
	const [historyState, setHistoryState] = (0, import_react$4.useState)({
		history: null,
		busy: false,
		blocked: false,
		error: null
	});
	const historyOwner = (0, import_react$4.useRef)(null);
	(0, import_react$4.useLayoutEffect)(() => {
		const current = createReferenceHistoryLoader({
			storage: () => window.localStorage,
			fetch: () => invoke("fetch_ecb_reference_history"),
			now: () => Date.now(),
			changed: setHistoryState
		});
		historyOwner.current = current;
		setHistoryState(current.snapshot());
		return () => {
			if (historyOwner.current === current) historyOwner.current = null;
			current.dispose();
		};
	}, []);
	const [state, setState] = (0, import_react$4.useState)({
		quote: null,
		busy: false,
		blocked: false,
		error: null
	});
	const owner = (0, import_react$4.useRef)(null);
	(0, import_react$4.useLayoutEffect)(() => {
		const current = createReferenceRatesLoader({
			storage: () => window.localStorage,
			fetch: () => invoke("fetch_ecb_reference_rates"),
			now: () => Date.now(),
			changed: setState
		});
		owner.current = current;
		setState(current.snapshot());
		return () => {
			if (owner.current === current) owner.current = null;
			current.dispose();
		};
	}, []);
	const native = isTauri(), busy = state.busy || historyState.busy || yearState.busy;
	const request = async (loader) => {
		if (!native || pending.current || busy || !loader) return;
		pending.current = true;
		try {
			await loader.refresh();
		} finally {
			pending.current = false;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "market-reference-rates",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ReferenceRatesTable, {
				quote: state.quote,
				now: Date.now(),
				error: state.error,
				history: historyState.history,
				yearHistory: yearState.history,
				yearActions: {
					canFetch: native,
					busy,
					blocked: yearState.blocked,
					error: yearState.error,
					load: () => {
						request(yearOwner.current);
					},
					reload: () => yearOwner.current?.reload(),
					cancel: () => yearOwner.current?.cancel()
				}
			}),
			native && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				disabled: busy || state.blocked,
				onClick: () => void request(owner.current),
				children: state.busy ? "참고환율 불러오는 중" : "ECB 참고환율 불러오기"
			}),
			native && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				disabled: busy || historyState.blocked,
				onClick: () => void request(historyOwner.current),
				children: historyState.busy ? "환율 추이 불러오는 중" : "최근 90일 추이 불러오기"
			}),
			historyState.error && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
				role: "alert",
				children: historyState.error
			}),
			historyState.blocked && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				onClick: () => historyOwner.current?.reload(),
				children: "과거 저장값 다시 읽기"
			}),
			state.blocked && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				onClick: () => owner.current?.reload(),
				children: "저장값 다시 읽기"
			})
		]
	});
}
var import_react$4, import_jsx_runtime$5;
function init_MarketReferenceRates() {
	return (init_MarketReferenceRates = __esmMin((() => {
		import_react$4 = require_react();
		init_core();
		init_ReferenceRatesTable();
		init_referenceRatesLoader();
		init_referenceHistoryLoader();
		init_referenceYearHistoryLoader();
		import_jsx_runtime$5 = require_jsx_runtime();
	})))();
}
function instant(v) {
	if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(v)) throw Error("invalid");
	const t = Date.parse(v);
	if (!Number.isFinite(t) || new Date(t).toISOString().replace(".000Z", "Z") !== v) throw Error("invalid");
	return t;
}
function parseFearQuote(value, now) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("invalid");
	const q = value;
	if (Object.keys(q).sort().join(",") !== "asOf,classification,kind,nextUpdateAt,observedAt,sourceUrl,value" || q.kind !== "alternative_bitcoin_fng_v1" || q.sourceUrl !== "https://alternative.me/crypto/fear-and-greed-index/" || !Number.isInteger(q.value) || Number(q.value) < 0 || Number(q.value) > 100 || typeof q.classification !== "string" || !Object.hasOwn(FEAR_LABELS, q.classification)) throw Error("invalid");
	const source = instant(q.asOf), observed = instant(q.observedAt), next = instant(q.nextUpdateAt);
	if (source > observed || observed > Date.parse(now) || !Number.isFinite(Date.parse(now)) || next < observed || next - observed > 1728e5) throw Error("invalid");
	return { ...q };
}
function coalescedFearRequest(load) {
	let flight = null;
	return () => {
		if (flight) return flight;
		flight = Promise.resolve().then(load).finally(() => {
			flight = null;
		});
		return flight;
	};
}
function fearQuoteIsStale(q, clock) {
	const now = Date.parse(clock);
	return now - Date.parse(q.asOf) > 1296e5 || now > Date.parse(q.nextUpdateAt) + 36e5;
}
var FEAR_KEY, FEAR_SOURCE, FEAR_LABELS, FearGreedReader;
function init_fearGreed() {
	return (init_fearGreed = __esmMin((() => {
		FEAR_KEY = "stockpin:bitcoin-fear-greed:v1";
		FEAR_SOURCE = "https://alternative.me/crypto/fear-and-greed-index/";
		FEAR_LABELS = {
			"Extreme Fear": "극단적 공포",
			Fear: "공포",
			Neutral: "중립",
			Greed: "탐욕",
			"Extreme Greed": "극단적 탐욕"
		};
		FearGreedReader = class {
			storage;
			fetchQuote;
			clock;
			state = {
				quote: null,
				busy: false,
				blocked: false,
				error: null
			};
			listeners = /* @__PURE__ */ new Set();
			disposed = false;
			floor;
			constructor(storage, fetchQuote, clock) {
				this.storage = storage;
				this.fetchQuote = fetchQuote;
				this.clock = clock;
				this.floor = Date.parse(clock());
				try {
					const raw = storage.getItem(FEAR_KEY);
					if (raw !== null) {
						if (raw.length > 4096) throw Error("invalid");
						this.state.quote = parseFearQuote(JSON.parse(raw), clock());
					}
				} catch {
					this.state = {
						...this.state,
						blocked: true,
						error: "저장된 시장 심리를 확인할 수 없습니다. 원본은 유지합니다."
					};
				}
			}
			subscribe(listener) {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			}
			update(state) {
				this.state = state;
				for (const listener of this.listeners) listener();
			}
			async refresh() {
				if (this.disposed || this.state.busy || this.state.blocked) return;
				if (!Number.isFinite(Date.parse(this.clock())) || Date.parse(this.clock()) < this.floor) {
					this.update({
						...this.state,
						error: "기기 시각을 확인해 주세요. 이전 값은 유지합니다."
					});
					return;
				}
				this.floor = Date.parse(this.clock());
				let expected;
				try {
					expected = this.storage.getItem(FEAR_KEY);
				} catch {
					this.update({
						...this.state,
						blocked: true,
						error: "저장값을 확인할 수 없습니다. 이전 값은 유지합니다."
					});
					return;
				}
				this.update({
					...this.state,
					busy: true,
					error: null
				});
				try {
					const wire = await this.fetchQuote();
					if (this.disposed) return;
					const quote = parseFearQuote(wire, this.clock());
					if (Date.parse(this.clock()) < this.floor) throw Error("clock");
					const old = this.state.quote;
					if (old && (Date.parse(quote.asOf) < Date.parse(old.asOf) || Date.parse(quote.observedAt) < Date.parse(old.observedAt))) throw Error("older");
					if (this.storage.getItem("stockpin:bitcoin-fear-greed:v1") !== expected) {
						this.update({
							...this.state,
							blocked: true,
							error: "다른 창에서 시장 자료가 바뀌었습니다. 페이지를 다시 열어 확인해 주세요."
						});
						return;
					}
					try {
						this.storage.setItem(FEAR_KEY, JSON.stringify(quote));
					} catch {
						this.update({
							...this.state,
							blocked: true,
							error: "시장 자료를 저장하지 못했습니다. 이전 값은 유지합니다."
						});
						return;
					}
					this.update({
						quote,
						busy: false,
						blocked: false,
						error: null
					});
				} catch {
					if (!this.disposed) this.update({
						...this.state,
						error: "시장 심리를 갱신하지 못했습니다. 이전 값은 유지합니다."
					});
				} finally {
					if (!this.disposed && this.state.busy) this.update({
						...this.state,
						busy: false
					});
				}
			}
			dispose() {
				this.disposed = true;
				this.listeners.clear();
			}
		};
	})))();
}
function canonicalInstant(value) {
	const time = Date.parse(value);
	if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) || !Number.isFinite(time) || new Date(time).toISOString().replace(".000Z", "Z") !== value) throw Error("자료 시각을 확인할 수 없습니다.");
	return time;
}
/** Display clocks may use Date.toISOString(); provider instants still use canonicalInstant. */
function displayClockInstant(value) {
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
		const time = Date.parse(value);
		if (Number.isFinite(time) && new Date(time).toISOString() === value) return time;
		throw Error("기기 시각을 확인해 주세요.");
	}
	return canonicalInstant(value);
}
function day(row) {
	return Math.floor(canonicalInstant(row.asOf) / DAY);
}
/** Copies and orders supplied observations; never fills missing days or reads storage/network. */
function validateHistory(input, now) {
	const clock = displayClockInstant(now);
	if (!Array.isArray(input) || input.length > 3e4) throw Error("과거 자료를 확인할 수 없습니다.");
	const dates = /* @__PURE__ */ new Set();
	return input.map((row) => {
		if (!row || typeof row.asOf !== "string" || !Number.isInteger(row.value) || row.value < 0 || row.value > 100 || !Object.hasOwn(FEAR_LABELS, row.classification)) throw Error("과거 자료를 확인할 수 없습니다.");
		if (canonicalInstant(row.asOf) > clock) throw Error("미래 원천시각을 확인해 주세요.");
		const date = day(row);
		if (dates.has(date)) throw Error("같은 UTC 날짜의 자료가 중복됐습니다.");
		dates.add(date);
		return { ...row };
	}).sort((a, b) => canonicalInstant(a.asOf) - canonicalInstant(b.asOf));
}
/** Input is validated by the caller. Comparisons are 1/7/30 UTC days, never calendar months. */
function historySummary(rows) {
	if (!rows.length) return [
		null,
		null,
		null,
		null
	];
	const latest = rows.reduce((a, b) => day(a) > day(b) ? a : b);
	return [
		0,
		1,
		7,
		30
	].map((offset) => rows.find((row) => day(row) === day(latest) - offset) ?? null);
}
/** Selected calendar domain is independent of missing observations inside it. */
function historyBounds(rows, period) {
	const sorted = [...rows].sort((a, b) => day(a) - day(b));
	if (!sorted.length) return null;
	const latest = day(sorted[sorted.length - 1]);
	if (period === "all") return {
		start: day(sorted[0]) * DAY,
		end: latest * DAY
	};
	const start = /* @__PURE__ */ new Date(latest * DAY);
	if (period === "7d") start.setUTCDate(start.getUTCDate() - 6);
	else {
		const originalDay = start.getUTCDate();
		start.setUTCDate(1);
		start.setUTCMonth(start.getUTCMonth() - (period === "1m" ? 1 : period === "3m" ? 3 : 12));
		const lastDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)).getUTCDate();
		start.setUTCDate(Math.min(originalDay, lastDay));
	}
	return {
		start: start.getTime(),
		end: latest * DAY
	};
}
function historyWindow(rows, period) {
	const bounds = historyBounds(rows, period);
	if (!bounds) return [];
	return [...rows].filter((row) => day(row) * DAY >= bounds.start && day(row) * DAY <= bounds.end).sort((a, b) => day(a) - day(b));
}
function historySegments(rows) {
	const segments = [];
	for (const row of historyWindow(rows, "all")) {
		const last = segments[segments.length - 1];
		if (last && day(row) - day(last[last.length - 1]) === 1) last.push(row);
		else segments.push([row]);
	}
	return segments;
}
function quoteProblem(quote, now) {
	try {
		displayClockInstant(now);
		if (!quote) return null;
		validateHistory([quote], now);
		if (canonicalInstant(quote.observedAt) > displayClockInstant(now) || canonicalInstant(quote.asOf) > canonicalInstant(quote.observedAt)) return "미래 원천시각을 확인해 주세요.";
		canonicalInstant(quote.nextUpdateAt);
		return null;
	} catch (error) {
		return error instanceof Error ? error.message : "자료를 확인할 수 없습니다.";
	}
}
var FEAR_PERIODS, DAY;
function init_fearGreedHistory() {
	return (init_fearGreedHistory = __esmMin((() => {
		init_fearGreed();
		FEAR_PERIODS = [
			["7d", "7일"],
			["1m", "1개월"],
			["3m", "3개월"],
			["1y", "1년"],
			["all", "전체"]
		];
		DAY = 864e5;
	})))();
}
/** UTF-8 serialized JSON limit; cache whitespace counts, and bytes are never repaired. */
function checkSize(raw) {
	if (raw.length > 4194304 || new TextEncoder().encode(raw).byteLength > 4194304) throw Error("history too large");
}
function exactRecord(value, keys) {
	if (!value || typeof value !== "object" || Array.isArray(value) || Reflect.ownKeys(value).some((key) => typeof key !== "string") || Object.getOwnPropertyNames(value).sort().join(",") !== keys) throw Error("invalid history");
	return value;
}
/** Rejects invalid wire order rather than sorting or repairing provider data. */
function parseFearHistory(value, now) {
	const clock = displayClockInstant(now);
	const wire = exactRecord(value, "kind,observedAt,rows,sourceUrl");
	if (wire.kind !== "alternative_bitcoin_fng_history_v1" || wire.sourceUrl !== "https://alternative.me/crypto/fear-and-greed-index/" || typeof wire.observedAt !== "string" || !Array.isArray(wire.rows) || !wire.rows.length || wire.rows.length > 2e4) throw Error("invalid history");
	const observed = canonicalInstant(wire.observedAt);
	if (observed > clock) throw Error("future history");
	let previous = Infinity;
	const days = /* @__PURE__ */ new Set();
	const rows = [];
	for (const item of wire.rows) {
		const row = exactRecord(item, "asOf,classification,value");
		if (typeof row.asOf !== "string" || typeof row.value !== "number" || !Number.isInteger(row.value) || row.value < 0 || row.value > 100 || typeof row.classification !== "string" || !Object.hasOwn(FEAR_LABELS, row.classification)) throw Error("invalid history row");
		const time = canonicalInstant(row.asOf);
		const day = row.asOf.slice(0, 10);
		if (time > observed || time >= previous || days.has(day)) throw Error("invalid history order");
		days.add(day);
		previous = time;
		rows.push({
			asOf: row.asOf,
			value: row.value,
			classification: row.classification
		});
	}
	return {
		kind: wire.kind,
		sourceUrl: FEAR_SOURCE,
		observedAt: wire.observedAt,
		rows
	};
}
var FEAR_HISTORY_KEY, FearHistoryReader;
function init_fearHistoryReader() {
	return (init_fearHistoryReader = __esmMin((() => {
		init_fearGreed();
		init_fearGreedHistory();
		FEAR_HISTORY_KEY = "stockpin:bitcoin-fear-history:v1";
		FearHistoryReader = class {
			storage;
			fetchHistory;
			clock;
			state = {
				history: null,
				busy: false,
				blocked: false,
				error: null
			};
			listeners = /* @__PURE__ */ new Set();
			disposed = false;
			floor = -Infinity;
			expected = null;
			constructor(storage, fetchHistory, clock) {
				this.storage = storage;
				this.fetchHistory = fetchHistory;
				this.clock = clock;
				try {
					const now = this.readClock();
					const raw = storage.getItem(FEAR_HISTORY_KEY);
					this.expected = raw;
					if (raw !== null) {
						checkSize(raw);
						this.state.history = parseFearHistory(JSON.parse(raw), now);
					}
				} catch {
					this.state = {
						...this.state,
						blocked: true,
						error: "저장된 과거 시장 심리를 확인할 수 없습니다. 원본은 유지합니다."
					};
				}
			}
			subscribe(listener) {
				if (!this.disposed) this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			}
			update(state) {
				if (this.disposed) return;
				this.state = state;
				for (const listener of this.listeners) {
					if (this.disposed) break;
					listener();
				}
			}
			readClock() {
				const now = this.clock();
				const time = displayClockInstant(now);
				if (time < this.floor) throw Error("clock regressed");
				this.floor = time;
				return now;
			}
			unchanged() {
				try {
					if (this.storage.getItem("stockpin:bitcoin-fear-history:v1") === this.expected) return true;
				} catch {}
				this.update({
					...this.state,
					blocked: true,
					error: "다른 창의 과거 시장 자료를 확인할 수 없습니다. 페이지를 다시 열어 주세요."
				});
				return false;
			}
			async refresh() {
				if (this.disposed || this.state.busy || this.state.blocked) return;
				try {
					this.readClock();
					if (!this.unchanged()) return;
					this.update({
						...this.state,
						busy: true,
						error: null
					});
					if (this.disposed) return;
					const wire = await this.fetchHistory();
					if (this.disposed) return;
					const history = parseFearHistory(wire, this.readClock());
					const old = this.state.history;
					if (old && (canonicalInstant(history.observedAt) < canonicalInstant(old.observedAt) || canonicalInstant(history.rows[0].asOf) < canonicalInstant(old.rows[0].asOf))) throw Error("older history");
					const raw = JSON.stringify(history);
					checkSize(raw);
					if (!this.unchanged() || this.disposed) return;
					try {
						this.storage.setItem(FEAR_HISTORY_KEY, raw);
					} catch {
						this.update({
							...this.state,
							blocked: true,
							error: "과거 시장 자료를 저장하지 못했습니다. 이전 값은 유지합니다."
						});
						return;
					}
					this.expected = raw;
					this.update({
						history,
						busy: false,
						blocked: false,
						error: null
					});
				} catch {
					this.update({
						...this.state,
						error: "과거 시장 심리를 갱신하지 못했습니다. 이전 값은 유지합니다."
					});
				} finally {
					if (!this.disposed && this.state.busy) this.update({
						...this.state,
						busy: false
					});
				}
			}
			dispose() {
				this.disposed = true;
				this.listeners.clear();
			}
		};
	})))();
}
/** Uses the provider deadline; the display clock never triggers a network request. */
function fearUpdateCountdown(nextUpdateAt, clock) {
	const next = Date.parse(nextUpdateAt), now = Date.parse(clock);
	if (!Number.isFinite(next) || !Number.isFinite(now)) return "업데이트 시각 미확인";
	const remaining = next - now;
	if (remaining <= 0) return "업데이트 대기";
	const seconds = Math.ceil(remaining / 1e3);
	return [
		Math.floor(seconds / 3600),
		Math.floor(seconds % 3600 / 60),
		seconds % 60
	].map((value) => String(value).padStart(2, "0")).join(":") + " 후 업데이트";
}
/** Local display clock only: it cannot fetch, invalidate caches or invent a deadline. */
function BitcoinUpdateCountdown({ nextUpdateAt, now }) {
	const [clock, setClock] = (0, import_react$3.useState)(now);
	(0, import_react$3.useEffect)(() => {
		const update = () => {
			if (document.visibilityState === "visible") setClock((/* @__PURE__ */ new Date()).toISOString());
		};
		const timer = window.setInterval(update, 1e3);
		document.addEventListener("visibilitychange", update);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", update);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("time", {
		dateTime: nextUpdateAt,
		"aria-live": "off",
		title: nextUpdateAt,
		children: fearUpdateCountdown(nextUpdateAt, clock)
	});
}
var import_react$3, import_jsx_runtime$4;
function init_BitcoinUpdateCountdown() {
	return (init_BitcoinUpdateCountdown = __esmMin((() => {
		import_react$3 = require_react();
		import_jsx_runtime$4 = require_jsx_runtime();
	})))();
}
/** Pure presentation of an existing Bitcoin quote; no owner, timer or transport. */
function FearGreedGauge({ quote, now, previous = false }) {
	const problem = quoteProblem(quote, now);
	const usable = !problem && quote;
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "fear-gauge",
		"data-sentiment": usable ? quote.classification : void 0,
		children: [usable && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("svg", {
			viewBox: "0 0 72 72",
			width: "72",
			height: "72",
			role: "meter",
			"aria-label": `비트코인 공포·탐욕 점수${previous ? " · 이전 값" : ""}`,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": quote.value,
			"aria-valuetext": `${quote.value} · ${FEAR_LABELS[quote.classification]} · ${quote.asOf.slice(0, 10)} UTC${previous ? " · 이전 값" : ""}${previous || fearQuoteIsStale(quote, now) ? " · 오래된 자료" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
					className: "fear-gauge-track",
					cx: "36",
					cy: "36",
					r: "32"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("circle", {
					className: "fear-gauge-progress",
					cx: "36",
					cy: "36",
					r: "32",
					pathLength: "100",
					strokeDasharray: `${quote.value} 100`,
					transform: "rotate(-90 36 36)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("text", {
					x: "36",
					y: "36",
					dy: ".35em",
					textAnchor: "middle",
					className: "fear-gauge-score",
					children: quote.value
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "fear-gauge-info",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h3", { children: "비트코인 공포·탐욕" }), usable ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
				className: "fear-gauge-state",
				children: FEAR_LABELS[quote.classification]
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("p", {
				className: "fear-meta",
				children: [
					previous ? "이전 값 · " : "",
					/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("time", {
						dateTime: quote.asOf,
						children: [quote.asOf.slice(0, 10), " UTC"]
					}),
					previous || fearQuoteIsStale(quote, now) ? " · 오래된 자료" : ""
				]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
				role: problem ? "alert" : void 0,
				children: problem ?? "아직 불러온 값이 없습니다."
			})]
		})]
	});
}
var import_jsx_runtime$3;
function init_FearGreedGauge() {
	return (init_FearGreedGauge = __esmMin((() => {
		init_fearGreed();
		init_fearGreedHistory();
		init_fear_greed_details();
		import_jsx_runtime$3 = require_jsx_runtime();
	})))();
}
function FearGreedHistoryChart({ rows, period = "all" }) {
	const bounds = historyBounds(rows, period);
	if (!bounds) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", { children: "선택한 기간의 자료가 없습니다." });
	const visible = historyWindow(rows, period);
	const dateLabel = (time) => new Date(time).toISOString().slice(0, 10);
	const x = (r) => 12 + (Math.floor(canonicalInstant(r.asOf) / 864e5) * 864e5 - bounds.start) / Math.max(864e5, bounds.end - bounds.start) * 456;
	const y = (r) => 112 - r.value;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
		className: "fear-history-plot",
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
			className: "fear-history-chart",
			viewBox: "-36 0 516 136",
			role: "img",
			"aria-label": "비트코인 일별 공포·탐욕 추이. 값 0–100. 0은 극도의 공포, 100은 극도의 탐욕. 누락 날짜는 선을 끊어 표시합니다.",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("title", { children: "값 0–100 · 0은 극도의 공포, 100은 극도의 탐욕" }),
				[
					0,
					50,
					100
				].map((value) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("line", {
					className: "fear-history-grid",
					x1: "12",
					x2: "468",
					y1: 112 - value,
					y2: 112 - value
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("text", {
					x: "4",
					y: 117 - value,
					textAnchor: "end",
					children: value
				})] }, value)),
				historySegments(visible).map((segment) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("polyline", { points: segment.map((r) => `${x(r)},${y(r)}`).join(" ") }, segment[0].asOf)),
				visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
					cx: x(r),
					cy: y(r),
					r: "2",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("title", { children: `${r.asOf} · ${r.value} · ${FEAR_LABELS[r.classification]}` })
				}, r.asOf)),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("text", {
					x: "12",
					y: "132",
					textAnchor: "start",
					children: dateLabel(bounds.start)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("text", {
					x: "468",
					y: "132",
					textAnchor: "end",
					children: dateLabel(bounds.end)
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("details", {
		className: "fear-history-values",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("summary", { children: "날짜별 값 · UTC" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", {
			"aria-label": "원천 날짜별 공포·탐욕 값",
			children: visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("time", {
				dateTime: r.asOf,
				children: r.asOf
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", { children: [
				r.value,
				" · ",
				FEAR_LABELS[r.classification]
			] })] }, r.asOf))
		})]
	})] });
}
/** Transport failures retain validated cached graphs; invalid data is never plotted. */
function historyGraphAvailable(cachedRows, transportError, invalid) {
	return !invalid && (!transportError || cachedRows > 0);
}
/** Integrator supplies validated public props. This component has no IPC, storage or HTTP. */
function FearGreedDetails({ quote, rows, now, error, historyError }) {
	const [expanded, setExpanded] = (0, import_react$2.useState)(false), [period, setPeriod] = (0, import_react$2.useState)("7d");
	const id = (0, import_react$2.useId)();
	let history, invalid = null;
	const problem = quoteProblem(quote, now);
	try {
		history = validateHistory(rows, now);
		if (quote && !problem) {
			const sameDay = history.find((row) => row.asOf.slice(0, 10) === quote.asOf.slice(0, 10));
			if (sameDay && (sameDay.asOf !== quote.asOf || sameDay.value !== quote.value || sameDay.classification !== quote.classification)) throw Error("현재 값과 과거 자료가 일치하지 않습니다.");
			if (!sameDay) history = validateHistory([...history, {
				asOf: quote.asOf,
				value: quote.value,
				classification: quote.classification
			}], now);
		}
	} catch (e) {
		history = [];
		invalid = e instanceof Error ? e.message : "과거 자료를 확인할 수 없습니다.";
	}
	const summary = historySummary(history);
	const anchor = summary[0];
	const stale = anchor && displayClockInstant(now) - canonicalInstant(anchor.asOf) > 1296e5;
	const behindHistory = !!(!problem && quote && anchor && canonicalInstant(quote.asOf) < canonicalInstant(anchor.asOf));
	const usableQuote = !problem && !behindHistory && quote;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("section", {
		className: "fear-details",
		"aria-label": "비트코인 공포·탐욕 상세",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "fear-overview",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FearGreedGauge, {
					quote,
					now,
					previous: behindHistory
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "fear-comparisons",
					children: [
						(!quote || problem) && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
							className: "fear-meta",
							children: "현재 미확인"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dl", {
							className: "fear-summary",
							children: [
								anchor && !usableQuote ? "최근 자료" : "현재",
								"어제",
								"지난주",
								"지난달"
							].map((label, index) => index === 0 && usableQuote ? null : /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("dt", { children: [label, index === 3 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("small", { children: " · 30일 전" })] }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dd", { children: summary[index] ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("strong", { children: summary[index].value }),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: FEAR_LABELS[summary[index].classification] }),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("time", {
									dateTime: summary[index].asOf,
									children: [summary[index].asOf.slice(0, 10), " UTC"]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: "미확인" }) })] }, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
							className: "fear-meta",
							children: usableQuote ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(BitcoinUpdateCountdown, {
								nextUpdateAt: quote.nextUpdateAt,
								now
							}) : "다음 업데이트 · 미확인"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							type: "button",
							"aria-expanded": expanded,
							"aria-controls": id,
							onClick: () => setExpanded(!expanded),
							children: expanded ? "추이 닫기" : "추이 보기"
						})
					]
				})]
			}),
			behindHistory && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				role: "alert",
				children: "현재 값과 과거 자료를 함께 갱신해 주세요."
			}),
			stale && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				role: "status",
				children: "오래된 자료 · 최신 원천일 기준"
			}),
			[...new Set([
				error,
				historyError,
				invalid
			].filter(Boolean))].map((message) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				role: "alert",
				children: message
			}, message)),
			expanded && /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				id,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "fear-periods",
						role: "group",
						"aria-label": "과거 그래프 기간",
						children: FEAR_PERIODS.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							type: "button",
							"aria-pressed": period === value,
							onClick: () => setPeriod(value),
							children: label
						}, value))
					}),
					historyGraphAvailable(rows.length, historyError, invalid) ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FearGreedHistoryChart, {
						rows: history,
						period
					}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", { children: "과거 그래프를 확인할 수 없습니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "fear-meta",
						children: "최신 원천일 기준 · 누락 날짜는 연결하지 않습니다. 지난달 비교는 30일 전입니다."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
						href: "https://alternative.me/crypto/fear-and-greed-index/",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Alternative.me · 비트코인 지표"
					})
				]
			})
		]
	});
}
var import_react$2, import_jsx_runtime$2;
function init_FearGreedDetails() {
	return (init_FearGreedDetails = __esmMin((() => {
		import_react$2 = require_react();
		init_BitcoinUpdateCountdown();
		init_fearGreed();
		init_FearGreedGauge();
		init_fearGreedHistory();
		init_fear_greed_details();
		import_jsx_runtime$2 = require_jsx_runtime();
	})))();
}
/** Minute checks control HTTP; the nested countdown owns its independent display-only clock. */
function BitcoinFearGreedView() {
	const [state, setState] = (0, import_react$1.useState)(empty), [history, setHistory] = (0, import_react$1.useState)(emptyHistory);
	const [clock, setClock] = (0, import_react$1.useState)(() => (/* @__PURE__ */ new Date()).toISOString());
	const manual = (0, import_react$1.useRef)(null);
	(0, import_react$1.useEffect)(() => {
		if (!isTauri()) return;
		const storage = {
			getItem: (key) => window.localStorage.getItem(key),
			setItem: (key, value) => window.localStorage.setItem(key, value)
		};
		const now = () => (/* @__PURE__ */ new Date()).toISOString();
		const current = new FearGreedReader(storage, loadPublicQuote, now);
		const past = new FearHistoryReader(storage, loadPublicHistory, now);
		const unsubscribe = current.subscribe(() => setState(current.state));
		const unsubscribePast = past.subscribe(() => setHistory(past.state));
		let active = true, lastQuoteAttempt = null, lastHistoryAttempt = null;
		queueMicrotask(() => {
			if (active) {
				setState(current.state);
				setHistory(past.state);
			}
		});
		const refresh = () => {
			if (!active) return;
			const tick = Date.now();
			if (!current.state.busy && !current.state.blocked) {
				lastQuoteAttempt = tick;
				current.refresh();
			}
			if (!past.state.busy && !past.state.blocked) {
				lastHistoryAttempt = tick;
				past.refresh();
			}
		};
		manual.current = refresh;
		const poll = () => {
			if (!active) return;
			const tick = Date.now();
			setClock(new Date(tick).toISOString());
			if (document.visibilityState !== "visible") return;
			const quote = current.state.quote, latest = past.state.history?.rows[0];
			const due = !quote || tick >= Date.parse(quote.nextUpdateAt) || fearQuoteIsStale(quote, new Date(tick).toISOString());
			const quoteBehind = !!(quote && latest && Date.parse(latest.asOf) > Date.parse(quote.asOf));
			if (!current.state.blocked && !current.state.busy && (due || quoteBehind) && (lastQuoteAttempt === null || tick - lastQuoteAttempt >= RETRY_MS)) {
				lastQuoteAttempt = tick;
				current.refresh();
			}
			const historyBehind = !!(quote && latest && Date.parse(latest.asOf) < Date.parse(quote.asOf));
			if (!past.state.blocked && !past.state.busy && (!latest || due || historyBehind) && (lastHistoryAttempt === null || tick - lastHistoryAttempt >= RETRY_MS)) {
				lastHistoryAttempt = tick;
				past.refresh();
			}
		};
		poll();
		const timer = window.setInterval(poll, 6e4);
		document.addEventListener("visibilitychange", poll);
		return () => {
			active = false;
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", poll);
			unsubscribe();
			unsubscribePast();
			current.dispose();
			past.dispose();
			if (manual.current === refresh) manual.current = null;
		};
	}, []);
	const quote = state.quote, overdue = quote && fearQuoteIsStale(quote, clock), busy = state.busy || history.busy;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "bitcoin-sentiment",
		children: [
			busy && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
				role: "status",
				children: "불러오는 중"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FearGreedDetails, {
				quote,
				rows: history.history?.rows ?? [],
				now: clock,
				error: state.error,
				historyError: history.error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
				className: "bitcoin-sentiment-source",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
					href: FEAR_SOURCE,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "Alternative.me"
				}), quote && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("time", {
						dateTime: quote.asOf,
						children: [quote.asOf.slice(0, 10), " UTC"]
					}),
					" · 일별",
					overdue ? " · 갱신 지연" : ""
				] })]
			}),
			isTauri() && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				disabled: busy || state.blocked && history.blocked,
				onClick: () => manual.current?.(),
				children: busy ? "갱신 중" : "새로고침"
			})
		]
	});
}
var import_react$1, import_jsx_runtime$1, loadPublicQuote, loadPublicHistory, empty, emptyHistory, RETRY_MS;
function init_BitcoinFearGreedView() {
	return (init_BitcoinFearGreedView = __esmMin((() => {
		import_react$1 = require_react();
		init_core();
		init_fearGreed();
		init_fearHistoryReader();
		init_FearGreedDetails();
		import_jsx_runtime$1 = require_jsx_runtime();
		loadPublicQuote = coalescedFearRequest(() => invoke("fetch_bitcoin_fear_greed"));
		loadPublicHistory = coalescedFearRequest(() => invoke("fetch_bitcoin_fear_greed_history"));
		empty = {
			quote: null,
			busy: false,
			blocked: false,
			error: null
		};
		emptyHistory = {
			history: null,
			busy: false,
			blocked: false,
			error: null
		};
		RETRY_MS = 9e5;
	})))();
}
function init_market_page() {
	return (init_market_page = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-page.css";
			document.head.appendChild(l);
		}
	})))();
}
function MarketPage({ active = true, snapshots, demoPresentation }) {
	const [group, setGroup] = (0, import_react.useState)("all"), [universe, setUniverse] = (0, import_react.useState)("kospi");
	const context = (0, import_react.useContext)(MarketDataContext);
	const demo = (0, import_react.useMemo)(() => {
		if (demoPresentation === void 0) return null;
		try {
			return decodeWebDemoMarket(demoPresentation);
		} catch {
			return null;
		}
	}, [demoPresentation]);
	const sources = demoPresentation !== void 0 ? demo ? demoPresentation.snapshots ?? {} : {} : snapshots ?? context;
	const available = MARKET_UNIVERSES.filter((u) => group === "all" || (group === "kr" ? u.id === "kospi" || u.id === "kosdaq" : u.id === "sp500" || u.id === "nasdaq"));
	const selected = available.find((u) => u.id === universe)?.id ?? available[0].id;
	const prefs = {
		...defaultMarketPrefs(),
		enabled: groups.find((g) => g.id === group).items.filter((id) => id !== "vix" && id !== "usdkrw")
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "market-page",
		"aria-label": "시장",
		"data-market-demo": demoPresentation !== void 0 ? "synthetic" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "market-page-filters",
			role: "group",
			"aria-label": "시장 분류",
			children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": group === g.id,
				onClick: () => setGroup(g.id),
				children: g.label
			}, g.id))
		}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [demoPresentation !== void 0 ? demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebDemoMarketPanels, {
			view: demo,
			group
		}, group) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			children: "가상 시장 자료 확인 필요 · 실제 데이터로 대체하지 않습니다."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketWidgetStrip, { prefs }),
			(group === "all" || group === "fx") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketReferenceRates, {}),
			(group === "all" || group === "us") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "market-mood",
				"aria-label": "미국 주식 변동성·심리",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "미국 주식 변동성·심리" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "market-mood-values",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "VIX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VixFileQuoteView, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "주식 공포·탐욕" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "공급 미연결" })] })]
				})]
			}),
			group === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "market-crypto",
				"aria-label": "가상자산 심리",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BitcoinFearGreedView, {})
			})
		] }), group !== "fx" && (demoPresentation === void 0 || demo !== null) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "market-map",
			"aria-label": "시장 히트맵",
			onClickCapture: (event) => {
				if (demoPresentation !== void 0 && event.target.closest("a")) event.preventDefault();
			},
			onAuxClickCapture: (event) => {
				if (demoPresentation !== void 0 && event.target.closest("a")) event.preventDefault();
			},
			onContextMenu: (event) => {
				if (demoPresentation !== void 0 && event.target.closest("a")) event.preventDefault();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "시장 히트맵" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "market-universe-choices",
					role: "group",
					"aria-label": "히트맵 시장 선택",
					children: available.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": selected === u.id,
						onClick: () => setUniverse(u.id),
						children: u.label
					}, u.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketHeatmap, {
					market: selected,
					input: sources[selected]
				})
			]
		})] })]
	});
}
var import_react, import_jsx_runtime, groups;
function init_MarketPage() {
	return (init_MarketPage = __esmMin((() => {
		import_react = require_react();
		init_WebDemoMarketPanels();
		init_WebDemoMarketModel();
		init_marketDataContext();
		init_MarketHeatmap();
		init_MarketReferenceRates();
		init_MarketWidgets();
		init_VixFileQuoteView();
		init_BitcoinFearGreedView();
		init_preferences();
		init_market_page();
		import_jsx_runtime = require_jsx_runtime();
		groups = [
			{
				id: "all",
				label: "전체",
				items: [
					"kospi",
					"kosdaq",
					"sp500",
					"nasdaq",
					"dow",
					"usdkrw",
					"vix"
				]
			},
			{
				id: "kr",
				label: "한국",
				items: ["kospi", "kosdaq"]
			},
			{
				id: "us",
				label: "미국",
				items: [
					"sp500",
					"nasdaq",
					"dow",
					"vix"
				]
			},
			{
				id: "fx",
				label: "환율",
				items: ["usdkrw"]
			}
		];
	})))();
}
export { invoke as _, init_MarketWidgets as a, readMarketPrefs as c, init_format as d, localTime as f, init_core as g, SERIALIZE_TO_IPC_FN as h, MarketWidgetCard as i, formatDecimal as l, Resource as m, init_MarketPage as n, MARKET_WIDGETS as o, Channel as p, init_market_page as r, init_preferences as s, MarketPage as t, formatMoney as u, isTauri as v, transformCallback as y };
