import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { n as init_createLucideIcon, t as createLucideIcon } from "./createLucideIcon-l6BxyEwt.js";
import { n as init_SingleChoice, t as SingleChoice } from "./SingleChoice-Ci_JhDU8.js";
import { C as init_reference_rate_details, F as createMarketInterestStore, G as Heart, K as init_heart, S as init_ReferenceRatesTable, U as readRefreshMinutes, V as init_market_widgets, _ as init_SentimentDial, a as init_WebDemoMarketPanels, b as ReferenceRateRows, d as init_fearGreed, g as VolatilityDial, h as SentimentDial, n as MARKET_INDEX_ITEMS, o as FEAR_LABELS$1, r as MarketRegionIndexGroups, t as init_market_page, v as MarketMetricNote, y as init_MarketMetricNote } from "./market-page-XWQs8cN1.js";
import { a as init_AppIcon, t as AppIcon } from "./AppIcon-Dgh8IQ7s.js";
import { i as init_refresh_cw, n as init_x, r as RefreshCw, t as X } from "./x-Hx8U-97z.js";
import { t as formatDecimal } from "./format-YPogjQOT.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-zPVG1zqJ.js";
var __iconData, RotateCcw;
function init_rotate_ccw() {
	return (init_rotate_ccw = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "rotate-ccw",
			size: 24,
			node: [["path", {
				d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
				key: "1357e3"
			}], ["path", {
				d: "M3 3v5h5",
				key: "1xhq8a"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		RotateCcw = createLucideIcon(__iconData);
	})))();
}
/** Display-only: retain nonzero direction when two decimal places cannot show magnitude.
* Source numbers and provider comparison dates are never changed by this formatter.
*/
function signedReferenceChange(value) {
	if (!Number.isFinite(value)) return "미확인";
	const absolute = Math.abs(value);
	return (value > 0 ? "+" : value < 0 ? "-" : "") + (absolute > 0 && absolute < .01 ? "<0.01" : new Intl.NumberFormat("ko-KR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(absolute));
}
/** KRW current values are integral; other pairs have two places, with honest sub-unit labels. */
function referenceCurrentValue(value, digits) {
	if (!Number.isFinite(value) || value < 0) return "미확인";
	if (value > 0 && value < (digits === 0 ? 1 : .01)) return digits === 0 ? "<1" : "<0.01";
	return new Intl.NumberFormat("ko-KR", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(value);
}
function init_referenceChangeDisplay() {
	return (init_referenceChangeDisplay = __esmMin((() => {})))();
}
function snapshot(bytes) {
	if (!(bytes instanceof Uint8Array) || !bytes.length || bytes.length > 1048576) return null;
	return new Uint8Array(bytes);
}
async function verifyOwned(bytes) {
	try {
		new TextDecoder("utf-8", {
			fatal: true,
			ignoreBOM: true
		}).decode(bytes);
	} catch {
		return false;
	}
	if (await digest(bytes) === LEGACY_SHA) return true;
	const matches = (at, part) => at + part.length <= bytes.length && part.every((v, i) => bytes[at + i] === v);
	let start = -1, count = 0;
	for (let i = 0; i < bytes.length; i++) if (matches(i, prefix)) {
		start = i + prefix.length;
		count++;
	}
	if (count !== 1 || !matches(start + 10, suffix)) return false;
	for (let i = 0; i < 10; i++) if (bytes[start + i] < 48 || bytes[start + i] > 57) return false;
	const masked = new Uint8Array(bytes.length - 9);
	masked.set(bytes.subarray(0, start));
	masked[start] = 48;
	masked.set(bytes.subarray(start + 10), start + 1);
	return await digest(masked) === MASKED_SHA;
}
/** Only verified raw bytes mint this in-memory authority; JSON cannot recreate it. */
async function admitReviewedEcbLicense(input) {
	const bytes = snapshot(input.bytes), { url, status, observedAt, byteLength, sha256 } = input;
	if (!bytes || url !== TERMS_URL || status !== 200 || byteLength !== bytes.length || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(observedAt) || !Number.isFinite(Date.parse(observedAt)) || new Date(observedAt).toISOString().replace(".000Z", "Z") !== observedAt.replace(".000Z", "Z") || !/^[a-f0-9]{64}$/.test(sha256)) throw new TypeError("ECB terms capture rejected");
	if (await digest(bytes) !== sha256 || !await verifyOwned(bytes)) throw new TypeError("ECB terms bytes rejected");
	const license = Object.freeze({
		termsUrl: TERMS_URL,
		observedAt,
		sha256,
		status: "conditional-reuse"
	});
	admitted.add(license);
	return license;
}
function isAdmittedReviewedEcbLicense(value) {
	return typeof value === "object" && value !== null && admitted.has(value);
}
function fail() {
	throw Error("공개 참고환율 자료 확인 필요");
}
function record(x, keys) {
	if (!x || typeof x !== "object" || Array.isArray(x) || ![Object.prototype, null].includes(Object.getPrototypeOf(x))) return fail();
	const ds = Object.getOwnPropertyDescriptors(x), own = Reflect.ownKeys(x);
	if (own.some((k) => typeof k !== "string" || !("value" in ds[k]) || !ds[k].enumerable)) return fail();
	if (keys && (own.length !== keys.length || keys.some((k) => !Object.hasOwn(ds, k)))) return fail();
	return x;
}
function date(x) {
	if (typeof x !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(x) || !Number.isFinite(Date.parse(x)) || new Date(x).toISOString().slice(0, 10) !== x) return fail();
	return x;
}
function instant(x) {
	if (typeof x !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|\+00:00)$/.test(x) || !Number.isFinite(Date.parse(x))) return fail();
	date(x.slice(0, 10));
	if (x.slice(11, 19) !== new Date(x).toISOString().slice(11, 19)) return fail();
	return x;
}
function hash(x) {
	if (typeof x !== "string" || !/^[a-f0-9]{64}$/.test(x)) return fail();
	return x;
}
function decimal(x) {
	if (typeof x !== "string" || !/^\d{1,9}(?:\.\d{1,12})?$/.test(x) || Number(x) <= 0 || !Number.isFinite(Number(x))) return fail();
	return x;
}
function observation(x) {
	const r = record(x, ["date", "rates"]), rates = record(r.rates), clean = {};
	const keys = Object.keys(rates);
	if (keys.length < 2 || keys.length > 64 || !keys.includes("USD") || !keys.includes("KRW")) return fail();
	for (const k of keys) {
		if (!/^[A-Z]{3}$/.test(k) || k === "EUR") return fail();
		clean[k] = decimal(rates[k]);
	}
	return {
		date: date(r.date),
		rates: clean
	};
}
function observations(x, max = 100) {
	if (!Array.isArray(x) || x.length === 0 || x.length > max) return fail();
	if (Reflect.ownKeys(x).length !== x.length + 1) return fail();
	for (let i = 0; i < x.length; i++) {
		const d = Object.getOwnPropertyDescriptor(x, String(i));
		if (!d || !("value" in d)) return fail();
	}
	const result = x.map(observation);
	for (let i = 1; i < result.length; i++) if (result[i - 1].date >= result[i].date) return fail();
	return result;
}
function source(x, url) {
	const r = record(x, [
		"sourceUrl",
		"observedAt",
		"sha256",
		"sourceAsOfInstant",
		"interval",
		"observations"
	]);
	if (r.sourceUrl !== url || r.sourceAsOfInstant !== null || r.interval !== "daily-reference") return fail();
	const rows = observations(r.observations), observedAt = instant(r.observedAt);
	if (rows.at(-1).date > observedAt.slice(0, 10) || url === "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml" && rows.length !== 1) return fail();
	if (url === "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml" && (Date.parse(rows.at(-1).date) - Date.parse(rows[0].date)) / 864e5 > 90) return fail();
	return {
		sourceUrl: url,
		observedAt,
		sha256: hash(r.sha256),
		sourceAsOfInstant: null,
		interval: "daily-reference",
		observations: rows
	};
}
/** v2 preserves the full original URL/hash separately from bounded derived rows.
* Like v1, this is structural admission, not remote JSON authentication. */
function decodeExtendedReference(input) {
	const r = record(input, [
		"kind",
		"mode",
		"daily",
		"history",
		"license",
		"market",
		"coverage"
	]);
	const isCurrent = r.kind === "ecb-public-reference-extended-v3", isVerified = r.kind === "ecb-public-reference-extended-v4";
	if (!isCurrent && !isVerified && r.kind !== "ecb-public-reference-extended-v2" || r.coverage !== "unverified" || isVerified && !isAdmittedReviewedEcbLicense(r.license)) return fail();
	const d = record(r.daily, [
		"sourceUrl",
		"observedAt",
		"sha256",
		"byteLength",
		"sourceAsOfInstant",
		"interval",
		"observations"
	]);
	const bounded = (x, max) => {
		if (typeof x !== "number" || !Number.isSafeInteger(x) || x < 1 || x > max) return fail();
		return x;
	};
	const dailyBytes = bounded(d.byteLength, 262144);
	const base = decodePublicReferenceRelease({
		kind: "ecb-public-reference-v1",
		mode: r.mode,
		daily: {
			sourceUrl: d.sourceUrl,
			observedAt: d.observedAt,
			sha256: d.sha256,
			sourceAsOfInstant: d.sourceAsOfInstant,
			interval: d.interval,
			observations: d.observations
		},
		history: null,
		license: r.license,
		market: r.market
	});
	if (!isVerified && base.license.sha256 !== (isCurrent ? "bd32968b3a6413a325db0b120eddc6995c9eadc338d5a160fcf61e4d69ffdb8a" : "326739b84154f132fdaf57b0f183792ab858f04e483d5532ac4e75d2e3142221")) return fail();
	const h = record(r.history, [
		"sourceUrl",
		"observedAt",
		"sha256",
		"byteLength",
		"sourceAsOfInstant",
		"interval",
		"baseCurrency",
		"rateUnit",
		"fullRange",
		"extraction",
		"observations"
	]);
	if (h.sourceUrl !== (isCurrent ? "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml" : "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml?c9f643aaf3c0366fa38e615a51f7b960") || h.sourceAsOfInstant !== null || h.interval !== "daily-reference" || h.baseCurrency !== "EUR" || h.rateUnit !== "currency units per 1 EUR") return fail();
	const rows = observations(h.observations, 107), observedAt = instant(h.observedAt), current = base.daily.observations[0], latest = rows.at(-1);
	if (rows.length < 2 || latest.date !== current.date || latest.date > observedAt.slice(0, 10)) return fail();
	const decimalKey = (v) => {
		const [w, f = ""] = v.split(".");
		return `${BigInt(w)}.${f.replace(/0+$/, "")}`;
	};
	if (Object.keys(latest.rates).length !== Object.keys(current.rates).length || Object.keys(latest.rates).some((k) => current.rates[k] === void 0 || decimalKey(latest.rates[k]) !== decimalKey(current.rates[k]))) return fail();
	if (rows.some((row) => [
		"USD",
		"JPY",
		"GBP",
		"CNY",
		"KRW"
	].some((c) => row.rates[c] === void 0))) return fail();
	const f = record(h.fullRange, [
		"start",
		"end",
		"count"
	]), e = record(h.extraction, [
		"derived",
		"method",
		"requestedStart",
		"start",
		"end",
		"count",
		"sha256",
		"encoding"
	]);
	const cutoff = (/* @__PURE__ */ new Date(Date.parse(latest.date) - 91584e5)).toISOString().slice(0, 10);
	if (e.derived !== true || e.method !== "latest-minus-106-calendar-days-inclusive" || e.encoding !== "UTF-8 JSON.stringify(observations)" || date(e.requestedStart) !== cutoff || date(e.start) !== rows[0].date || date(e.end) !== latest.date || e.count !== rows.length || rows[0].date < cutoff) return fail();
	const fullStart = date(f.start), fullEnd = date(f.end), fullCount = bounded(f.count, 2e4);
	if (fullStart > rows[0].date || fullEnd !== latest.date || fullCount < rows.length || fullCount === rows.length && fullStart !== rows[0].date || fullCount > rows.length && fullStart >= cutoff) return fail();
	return {
		...base,
		license: isVerified ? r.license : base.license,
		kind: isVerified ? "ecb-public-reference-extended-v4" : isCurrent ? "ecb-public-reference-extended-v3" : "ecb-public-reference-extended-v2",
		coverage: "unverified",
		daily: {
			...base.daily,
			byteLength: dailyBytes
		},
		history: {
			sourceUrl: h.sourceUrl,
			observedAt,
			sha256: hash(h.sha256),
			byteLength: bounded(h.byteLength, 16777216),
			sourceAsOfInstant: null,
			interval: "daily-reference",
			baseCurrency: "EUR",
			rateUnit: "currency units per 1 EUR",
			fullRange: {
				start: fullStart,
				end: fullEnd,
				count: fullCount
			},
			extraction: {
				derived: true,
				method: "latest-minus-106-calendar-days-inclusive",
				requestedStart: cutoff,
				start: rows[0].date,
				end: latest.date,
				count: rows.length,
				sha256: hash(e.sha256),
				encoding: "UTF-8 JSON.stringify(observations)"
			},
			observations: rows
		}
	};
}
function decodePublicReferenceRelease(input) {
	const header = record(input);
	if (header.kind === "ecb-public-reference-extended-v2" || header.kind === "ecb-public-reference-extended-v3" || header.kind === "ecb-public-reference-extended-v4") return decodeExtendedReference(input);
	const r = record(input, [
		"kind",
		"mode",
		"daily",
		"history",
		"license",
		"market"
	]);
	if (r.kind !== "ecb-public-reference-v1" || r.mode !== "public") return fail();
	const market = record(r.market, Object.keys(PUBLIC_MARKET_AVAILABILITY));
	if (Object.values(market).some((v) => v !== "unconnected")) return fail();
	const l = record(r.license, [
		"termsUrl",
		"observedAt",
		"sha256",
		"status"
	]);
	if (l.termsUrl !== "https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html" || l.status !== "conditional-reuse") return fail();
	const daily = source(r.daily, ECB_DAILY_URL), history = r.history === null ? null : source(r.history, ECB_HISTORY_URL);
	if (history) {
		const a = daily.observations[0], b = history.observations.at(-1);
		if (a.date !== b.date || Object.keys(a.rates).length !== Object.keys(b.rates).length || Object.keys(a.rates).some((k) => Number(a.rates[k]) !== Number(b.rates[k]))) return fail();
	}
	return {
		kind: "ecb-public-reference-v1",
		mode: "public",
		daily,
		history,
		license: {
			termsUrl: ECB_TERMS_URL,
			observedAt: instant(l.observedAt),
			sha256: hash(l.sha256),
			status: "conditional-reuse"
		},
		market: { ...PUBLIC_MARKET_AVAILABILITY }
	};
}
function projectPublicReference(input, pairId, period) {
	const r = decodePublicReferenceRelease(input), pair = PUBLIC_REFERENCE_PAIRS.find((p) => p.id === pairId);
	if (!pair) return fail();
	const valueOf = (row) => {
		const a = pair.base === "EUR" ? 1 : Number(row.rates[pair.base]), b = Number(row.rates[pair.quote]);
		return Number.isFinite(a) && Number.isFinite(b) ? b / a * pair.amount : null;
	};
	const current = r.daily.observations[0], value = valueOf(current), prev = r.history?.observations.at(-2), previous = prev ? valueOf(prev) : null;
	const change = value !== null && previous !== null ? value - previous : null;
	const supported = [
		"7d",
		"30d",
		"90d"
	].includes(period), days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
	const cutoff = Date.parse(current.date) - (days - 1) * 864e5;
	const points = supported ? (r.history?.observations ?? [current]).filter((o) => Date.parse(o.date) >= cutoff).flatMap((o) => {
		const v = valueOf(o);
		return v === null ? [] : [{
			date: o.date,
			value: v
		}];
	}) : [];
	return {
		status: supported ? "ready" : "unsupported",
		value,
		comparisonDate: change === null ? null : prev.date,
		change,
		percent: change === null ? null : change / previous * 100,
		points,
		start: points[0]?.date ?? null,
		end: points.at(-1)?.date ?? null
	};
}
var LEGACY_SHA, MASKED_SHA, TERMS_URL, prefix, suffix, admitted, digest, ECB_DAILY_URL, ECB_HISTORY_URL, ECB_TERMS_URL, PUBLIC_MARKET_AVAILABILITY, PUBLIC_REFERENCE_PAIRS;
function init_contract() {
	return (init_contract = __esmMin((() => {
		LEGACY_SHA = "326739b84154f132fdaf57b0f183792ab858f04e483d5532ac4e75d2e3142221";
		MASKED_SHA = "76c4c7442cadbef225b5dd23c797ee63037b920d31336a7bef9d82d0b026c2f2";
		TERMS_URL = "https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html";
		prefix = new TextEncoder().encode("ECB.clientTimeError = ");
		suffix = new TextEncoder().encode(" - (new Date().getTime());");
		admitted = /* @__PURE__ */ new WeakSet();
		digest = async (bytes) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))).map((v) => v.toString(16).padStart(2, "0")).join("");
		ECB_DAILY_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
		ECB_HISTORY_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";
		ECB_TERMS_URL = "https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html";
		PUBLIC_MARKET_AVAILABILITY = Object.freeze({
			indices: "unconnected",
			sentiment: "unconnected",
			heatmap: "unconnected",
			bonds: "unconnected",
			commodities: "unconnected"
		});
		PUBLIC_REFERENCE_PAIRS = [
			{
				id: "usdkrw",
				label: "달러/원",
				base: "USD",
				quote: "KRW",
				amount: 1,
				unit: "원"
			},
			{
				id: "jpykrw100",
				label: "100엔/원",
				base: "JPY",
				quote: "KRW",
				amount: 100,
				unit: "원"
			},
			{
				id: "cnykrw",
				label: "위안/원",
				base: "CNY",
				quote: "KRW",
				amount: 1,
				unit: "원"
			},
			{
				id: "eurkrw",
				label: "유로/원",
				base: "EUR",
				quote: "KRW",
				amount: 1,
				unit: "원"
			},
			{
				id: "gbpkrw",
				label: "파운드/원",
				base: "GBP",
				quote: "KRW",
				amount: 1,
				unit: "원"
			},
			{
				id: "eurusd",
				label: "유로/달러",
				base: "EUR",
				quote: "USD",
				amount: 1,
				unit: "달러"
			},
			{
				id: "usdjpy",
				label: "달러/엔",
				base: "USD",
				quote: "JPY",
				amount: 1,
				unit: "엔"
			}
		];
	})))();
}
/** Rolling (calendar anniversary, latest source date], not a 90-day alias.
* No calendar/holiday classification is inferred from absent observations.
*/
function rateWindowAverage(input, pairId, period, displayDigits = 2) {
	const release = decodePublicReferenceRelease(input), pair = PUBLIC_REFERENCE_PAIRS.find((p) => p.id === pairId);
	if (!pair || !["7d", "3m"].includes(period)) throw new TypeError("참고환율 항목·기간 확인 필요");
	const end = release.daily.observations[0].date, t = Date.parse(end), date = new Date(t);
	const month = date.getUTCMonth() - 3;
	const last = new Date(Date.UTC(date.getUTCFullYear(), month + 1, 0)).getUTCDate();
	const start = period === "7d" ? iso$1(t - 6 * day$2) : iso$1(Date.UTC(date.getUTCFullYear(), month, Math.min(date.getUTCDate(), last)) + day$2);
	const all = release.history?.observations ?? release.daily.observations;
	const rows = all.filter((row) => row.date >= start && row.date <= end);
	const present = rows.filter((row) => (pair.base === "EUR" || row.rates[pair.base] !== void 0) && row.rates[pair.quote] !== void 0);
	const result = {
		period,
		start,
		end,
		count: present.length,
		observedStart: present[0]?.date ?? null,
		observedEnd: present.at(-1)?.date ?? null,
		status: "insufficient",
		display: null,
		coverage: "unverified",
		unit: `${pair.amount} ${pair.base}당 ${pair.quote}`
	};
	if (!release.history || all[0].date > start || !present.length || present.length !== rows.length) return result;
	let numerator = 0n, denominator = 1n;
	for (const row of present) {
		const [bn, bd] = fraction(pair.base === "EUR" ? "1" : row.rates[pair.base]);
		const [qn, qd] = fraction(row.rates[pair.quote]);
		const n = qn * bd * BigInt(pair.amount), d = qd * bn;
		numerator = numerator * d + n * denominator;
		denominator *= d;
		const divisor = gcd(numerator, denominator);
		numerator /= divisor;
		denominator /= divisor;
	}
	denominator *= BigInt(present.length);
	const scaled = (numerator * (displayDigits === 0 ? 1n : 100n) * 2n + denominator) / (2n * denominator);
	const display = scaled === 0n ? displayDigits === 0 ? "<1" : "<0.01" : displayDigits === 0 ? formatDecimal(scaled.toString()) : formatDecimal(`${scaled / 100n}.${(scaled % 100n).toString().padStart(2, "0")}`);
	const plotValue = Number(numerator * 100000000n / denominator) / 1e8;
	return {
		...result,
		status: "observations",
		display,
		...displayDigits === 0 ? { plotValue } : {}
	};
}
var day$2, iso$1, fraction, gcd;
function init_rateWindowAverage() {
	return (init_rateWindowAverage = __esmMin((() => {
		init_contract();
		day$2 = 864e5;
		iso$1 = (date) => new Date(date).toISOString().slice(0, 10);
		fraction = (value) => {
			const [whole, tail = ""] = value.split(".");
			return [BigInt(whole + tail), 10n ** BigInt(tail.length)];
		};
		gcd = (a, b) => {
			while (b) [a, b] = [b, a % b];
			return a;
		};
	})))();
}
function init_public_reference_detail_layout() {
	return (init_public_reference_detail_layout = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-reference/public-reference-detail-layout.css?v=source-build-r294";
			document.head.appendChild(l);
		}
	})))();
}
function referenceLineSegments(points, dates) {
	const valid = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s;
	const indices = /* @__PURE__ */ new Map();
	let previous = "";
	for (const [index, date] of dates.entries()) {
		if (!valid(date) || date <= previous) throw TypeError("관측 날짜 확인 필요");
		indices.set(date, index);
		previous = date;
	}
	const segments = [];
	let last = -2;
	previous = "";
	for (const point of points) {
		const index = indices.get(point.date);
		if (!valid(point.date) || point.date <= previous || index === void 0 || !Number.isFinite(point.value) || point.value <= 0) throw TypeError("참고환율 관측 확인 필요");
		if (index !== last + 1) segments.push([]);
		segments.at(-1).push({
			time: point.date,
			value: point.value
		});
		last = index;
		previous = point.date;
	}
	return segments;
}
/** Engine/style lineage: legacy useChartEngine + chart-colors; only LineSeries is admitted.
* The legacy network/events/compare/trade hooks and OHLC/volume contract are not reused.
*/
function createReferenceLineChart(container, points, dates, options, load = () => import("./lightweight-charts.standalone.production-CsaZVIvn.js")) {
	const segments = referenceLineSegments(points, dates);
	let disposed = false, chart = null;
	const destroy = () => {
		if (disposed) return;
		disposed = true;
		chart?.remove();
		chart = null;
	};
	return {
		ready: load().then((engine) => {
			if (disposed) return false;
			try {
				chart = engine.createChart(container, {
					autoSize: true,
					layout: {
						background: { color: options.dark ? "#111111" : "#F8F8F9" },
						textColor: options.dark ? "#C1C1C1" : "#3E3E3F",
						fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
						fontSize: 12,
						attributionLogo: true
					},
					grid: {
						vertLines: { visible: false },
						horzLines: { visible: false }
					},
					rightPriceScale: {
						borderVisible: false,
						entireTextOnly: true,
						scaleMargins: {
							top: .08,
							bottom: .08
						}
					},
					timeScale: {
						borderVisible: false,
						timeVisible: false,
						rightOffset: 0
					},
					crosshair: { mode: engine.CrosshairMode.Magnet },
					localization: { locale: "ko-KR" },
					handleScale: {
						mouseWheel: true,
						pinch: true,
						axisPressedMouseMove: {
							time: true,
							price: false
						}
					},
					handleScroll: {
						mouseWheel: true,
						pressedMouseMove: true,
						horzTouchDrag: true,
						vertTouchDrag: false
					}
				});
				segments.forEach((data, index) => {
					chart.addSeries(engine.LineSeries, {
						color: options.direction === "up" ? "#e05a5a" : options.direction === "down" ? "#5a7fe0" : options.dark ? "#C1C1C1" : "#01A525",
						lineWidth: 2,
						lineVisible: data.length > 1,
						priceLineVisible: false,
						lastValueVisible: index === segments.length - 1,
						pointMarkersVisible: data.length === 1,
						priceFormat: {
							type: "custom",
							minMove: 1e-8,
							formatter: (value) => {
								if (value > 0 && value < (options.digits === 0 ? 1 : .01)) return options.digits === 0 ? "<1" : "<0.01";
								return new Intl.NumberFormat("ko-KR", {
									minimumFractionDigits: options.digits,
									maximumFractionDigits: options.digits
								}).format(value);
							}
						}
					}).setData(data);
				});
				chart.timeScale().fitContent();
				return true;
			} catch (error) {
				chart?.remove();
				chart = null;
				throw error;
			}
		}),
		destroy,
		fit: () => chart?.timeScale().fitContent()
	};
}
var tradingViewNotice, tradingViewLicense, fancyCanvasLicense;
function init_licenseTexts() {
	return (init_licenseTexts = __esmMin((() => {
		tradingViewNotice = "TradingView Lightweight Charts™\nCopyright (с) 2025 TradingView, Inc. https://www.tradingview.com/\n";
		tradingViewLicense = "                                 Apache License\n                           Version 2.0, January 2004\n                        http://www.apache.org/licenses/\n\n   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION\n\n   1. Definitions.\n\n      \"License\" shall mean the terms and conditions for use, reproduction,\n      and distribution as defined by Sections 1 through 9 of this document.\n\n      \"Licensor\" shall mean the copyright owner or entity authorized by\n      the copyright owner that is granting the License.\n\n      \"Legal Entity\" shall mean the union of the acting entity and all\n      other entities that control, are controlled by, or are under common\n      control with that entity. For the purposes of this definition,\n      \"control\" means (i) the power, direct or indirect, to cause the\n      direction or management of such entity, whether by contract or\n      otherwise, or (ii) ownership of fifty percent (50%) or more of the\n      outstanding shares, or (iii) beneficial ownership of such entity.\n\n      \"You\" (or \"Your\") shall mean an individual or Legal Entity\n      exercising permissions granted by this License.\n\n      \"Source\" form shall mean the preferred form for making modifications,\n      including but not limited to software source code, documentation\n      source, and configuration files.\n\n      \"Object\" form shall mean any form resulting from mechanical\n      transformation or translation of a Source form, including but\n      not limited to compiled object code, generated documentation,\n      and conversions to other media types.\n\n      \"Work\" shall mean the work of authorship, whether in Source or\n      Object form, made available under the License, as indicated by a\n      copyright notice that is included in or attached to the work\n      (an example is provided in the Appendix below).\n\n      \"Derivative Works\" shall mean any work, whether in Source or Object\n      form, that is based on (or derived from) the Work and for which the\n      editorial revisions, annotations, elaborations, or other modifications\n      represent, as a whole, an original work of authorship. For the purposes\n      of this License, Derivative Works shall not include works that remain\n      separable from, or merely link (or bind by name) to the interfaces of,\n      the Work and Derivative Works thereof.\n\n      \"Contribution\" shall mean any work of authorship, including\n      the original version of the Work and any modifications or additions\n      to that Work or Derivative Works thereof, that is intentionally\n      submitted to Licensor for inclusion in the Work by the copyright owner\n      or by an individual or Legal Entity authorized to submit on behalf of\n      the copyright owner. For the purposes of this definition, \"submitted\"\n      means any form of electronic, verbal, or written communication sent\n      to the Licensor or its representatives, including but not limited to\n      communication on electronic mailing lists, source code control systems,\n      and issue tracking systems that are managed by, or on behalf of, the\n      Licensor for the purpose of discussing and improving the Work, but\n      excluding communication that is conspicuously marked or otherwise\n      designated in writing by the copyright owner as \"Not a Contribution.\"\n\n      \"Contributor\" shall mean Licensor and any individual or Legal Entity\n      on behalf of whom a Contribution has been received by Licensor and\n      subsequently incorporated within the Work.\n\n   2. Grant of Copyright License. Subject to the terms and conditions of\n      this License, each Contributor hereby grants to You a perpetual,\n      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\n      copyright license to reproduce, prepare Derivative Works of,\n      publicly display, publicly perform, sublicense, and distribute the\n      Work and such Derivative Works in Source or Object form.\n\n   3. Grant of Patent License. Subject to the terms and conditions of\n      this License, each Contributor hereby grants to You a perpetual,\n      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\n      (except as stated in this section) patent license to make, have made,\n      use, offer to sell, sell, import, and otherwise transfer the Work,\n      where such license applies only to those patent claims licensable\n      by such Contributor that are necessarily infringed by their\n      Contribution(s) alone or by combination of their Contribution(s)\n      with the Work to which such Contribution(s) was submitted. If You\n      institute patent litigation against any entity (including a\n      cross-claim or counterclaim in a lawsuit) alleging that the Work\n      or a Contribution incorporated within the Work constitutes direct\n      or contributory patent infringement, then any patent licenses\n      granted to You under this License for that Work shall terminate\n      as of the date such litigation is filed.\n\n   4. Redistribution. You may reproduce and distribute copies of the\n      Work or Derivative Works thereof in any medium, with or without\n      modifications, and in Source or Object form, provided that You\n      meet the following conditions:\n\n      (a) You must give any other recipients of the Work or\n          Derivative Works a copy of this License; and\n\n      (b) You must cause any modified files to carry prominent notices\n          stating that You changed the files; and\n\n      (c) You must retain, in the Source form of any Derivative Works\n          that You distribute, all copyright, patent, trademark, and\n          attribution notices from the Source form of the Work,\n          excluding those notices that do not pertain to any part of\n          the Derivative Works; and\n\n      (d) If the Work includes a \"NOTICE\" text file as part of its\n          distribution, then any Derivative Works that You distribute must\n          include a readable copy of the attribution notices contained\n          within such NOTICE file, excluding those notices that do not\n          pertain to any part of the Derivative Works, in at least one\n          of the following places: within a NOTICE text file distributed\n          as part of the Derivative Works; within the Source form or\n          documentation, if provided along with the Derivative Works; or,\n          within a display generated by the Derivative Works, if and\n          wherever such third-party notices normally appear. The contents\n          of the NOTICE file are for informational purposes only and\n          do not modify the License. You may add Your own attribution\n          notices within Derivative Works that You distribute, alongside\n          or as an addendum to the NOTICE text from the Work, provided\n          that such additional attribution notices cannot be construed\n          as modifying the License.\n\n      You may add Your own copyright statement to Your modifications and\n      may provide additional or different license terms and conditions\n      for use, reproduction, or distribution of Your modifications, or\n      for any such Derivative Works as a whole, provided Your use,\n      reproduction, and distribution of the Work otherwise complies with\n      the conditions stated in this License.\n\n   5. Submission of Contributions. Unless You explicitly state otherwise,\n      any Contribution intentionally submitted for inclusion in the Work\n      by You to the Licensor shall be under the terms and conditions of\n      this License, without any additional terms or conditions.\n      Notwithstanding the above, nothing herein shall supersede or modify\n      the terms of any separate license agreement you may have executed\n      with Licensor regarding such Contributions.\n\n   6. Trademarks. This License does not grant permission to use the trade\n      names, trademarks, service marks, or product names of the Licensor,\n      except as required for reasonable and customary use in describing the\n      origin of the Work and reproducing the content of the NOTICE file.\n\n   7. Disclaimer of Warranty. Unless required by applicable law or\n      agreed to in writing, Licensor provides the Work (and each\n      Contributor provides its Contributions) on an \"AS IS\" BASIS,\n      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or\n      implied, including, without limitation, any warranties or conditions\n      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A\n      PARTICULAR PURPOSE. You are solely responsible for determining the\n      appropriateness of using or redistributing the Work and assume any\n      risks associated with Your exercise of permissions under this License.\n\n   8. Limitation of Liability. In no event and under no legal theory,\n      whether in tort (including negligence), contract, or otherwise,\n      unless required by applicable law (such as deliberate and grossly\n      negligent acts) or agreed to in writing, shall any Contributor be\n      liable to You for damages, including any direct, indirect, special,\n      incidental, or consequential damages of any character arising as a\n      result of this License or out of the use or inability to use the\n      Work (including but not limited to damages for loss of goodwill,\n      work stoppage, computer failure or malfunction, or any and all\n      other commercial damages or losses), even if such Contributor\n      has been advised of the possibility of such damages.\n\n   9. Accepting Warranty or Additional Liability. While redistributing\n      the Work or Derivative Works thereof, You may choose to offer,\n      and charge a fee for, acceptance of support, warranty, indemnity,\n      or other liability obligations and/or rights consistent with this\n      License. However, in accepting such obligations, You may act only\n      on Your own behalf and on Your sole responsibility, not on behalf\n      of any other Contributor, and only if You agree to indemnify,\n      defend, and hold each Contributor harmless for any liability\n      incurred by, or claims asserted against, such Contributor by reason\n      of your accepting any such warranty or additional liability.\n\n   END OF TERMS AND CONDITIONS\n\n   APPENDIX: How to apply the Apache License to your work.\n\n      To apply the Apache License to your work, attach the following\n      boilerplate notice, with the fields enclosed by brackets \"[]\"\n      replaced with your own identifying information. (Don't include\n      the brackets!)  The text should be enclosed in the appropriate\n      comment syntax for the file format. We also recommend that a\n      file or class name and description of purpose be included on the\n      same \"printed page\" as the copyright notice for easier\n      identification within third-party archives.\n\n   Copyright 2023 TradingView, Inc.\n\n   Licensed under the Apache License, Version 2.0 (the \"License\");\n   you may not use this file except in compliance with the License.\n   You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n   Unless required by applicable law or agreed to in writing, software\n   distributed under the License is distributed on an \"AS IS\" BASIS,\n   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n   See the License for the specific language governing permissions and\n   limitations under the License.\n";
		fancyCanvasLicense = "Copyright (c) 2019 TradingView, Inc\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n";
	})))();
}
function init_reference_line_chart() {
	return (init_reference_line_chart = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-reference/reference-line-chart.css?v=source-build-r294";
			document.head.appendChild(l);
		}
	})))();
}
function ChartSoftwareNotices() {
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("details", {
		className: "reference-chart-licenses",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("summary", { children: "차트 소프트웨어 고지" }),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("a", {
				href: "https://www.tradingview.com/",
				target: "_blank",
				rel: "noreferrer",
				children: "TradingView Lightweight Charts™ 5.1.0"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("pre", {
				tabIndex: 0,
				children: tradingViewNotice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("summary", { children: "Apache License 2.0" }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("pre", {
				tabIndex: 0,
				children: tradingViewLicense
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("summary", { children: "fancy-canvas · MIT License" }), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("pre", {
				tabIndex: 0,
				children: fancyCanvasLicense
			})] })
		]
	});
}
/** Actual legacy canvas engine. Values and observed dates come only from the decoded release. */
function PublicReferenceLineChart({ points, dates, label, digits, kind = "fx", direction }) {
	const root = (0, import_react$5.useRef)(null), handle = (0, import_react$5.useRef)(null);
	const [dark, setDark] = (0, import_react$5.useState)(true), [status, setStatus] = (0, import_react$5.useState)("loading");
	(0, import_react$5.useEffect)(() => {
		const read = () => setDark(getComputedStyle(root.current).colorScheme !== "light");
		read();
		const observer = new MutationObserver(read);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: [
				"data-theme",
				"class",
				"style"
			]
		});
		return () => observer.disconnect();
	}, []);
	(0, import_react$5.useEffect)(() => {
		if (!root.current) return;
		let alive = true;
		setStatus("loading");
		const chart = createReferenceLineChart(root.current, points, dates, {
			dark,
			digits,
			...direction ? { direction } : {}
		});
		handle.current = chart;
		chart.ready.then((ready) => {
			if (alive) setStatus(ready ? "ready" : "unavailable");
		}).catch(() => {
			if (alive) setStatus("unavailable");
		});
		return () => {
			alive = false;
			chart.destroy();
			handle.current = null;
		};
	}, [
		points,
		dates,
		dark,
		digits,
		direction
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		className: "reference-line-wrap",
		"data-reference-line-engine": "5.1.0",
		"data-chart-state": status,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				ref: root,
				className: "reference-line-canvas",
				role: "img",
				"aria-label": `${label} 일별 ${kind === "index" ? "지수" : "참고환율"} 차트 · 확대·이동 가능 · 거래 캔들 아님`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
				type: "button",
				className: "reference-line-reset",
				"aria-label": "차트 범위 초기화",
				title: "차트 범위 초기화",
				onClick: () => handle.current?.fit(),
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(RotateCcw, {
					size: 14,
					"aria-hidden": "true"
				})
			}),
			status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
				className: "reference-line-status",
				role: "status",
				children: "차트 준비 중"
			}),
			status === "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", {
				className: "reference-line-status",
				role: "alert",
				children: "차트를 표시하지 못했습니다. 날짜별 값은 아래에서 확인할 수 있습니다."
			})
		]
	});
}
var import_react$5, import_jsx_runtime$6;
function init_PublicReferenceLineChart() {
	return (init_PublicReferenceLineChart = __esmMin((() => {
		import_react$5 = require_react();
		init_rotate_ccw();
		init_licenseTexts();
		init_reference_line_chart();
		import_jsx_runtime$6 = require_jsx_runtime();
	})))();
}
function Attribution({ release: r }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(WidgetMetricHelp, {
		label: "ECB 출처·이용조건",
		description: "자료 출처·관측 범위와 차트 소프트웨어 이용조건",
		floating: true,
		compact: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "market-source",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "출처: European Central Bank (ECB) · 정보용 일별 참고환율 · 거래용 아님" }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "StockPin 계산 참고율: 같은 날짜 EUR 기준 원천율로 계산합니다. 달러/원 = KRW/EUR ÷ USD/EUR. 다른 교차율도 같은 날짜의 원천율 비율이며 100엔/원은 100배입니다." }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("a", {
						href: r.daily.sourceUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "ECB 무료 원본 · 일별"
					}),
					r.history && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("a", {
						href: r.history.sourceUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						children: ["ECB 무료 원본 · ", r.kind !== "ecb-public-reference-v1" ? "장기이력" : "90일"]
					})] }),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("a", {
						href: r.license.termsUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "ECB 재사용 조건"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [
					"일별 원본 수신: ",
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
						dateTime: r.daily.observedAt,
						children: r.daily.observedAt
					}),
					r.history && /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [" · 과거 원본 수신: ", /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
						dateTime: r.history.observedAt,
						children: r.history.observedAt
					})] }),
					" · 수신시각은 자료 기준시각이 아닙니다. 원본은 날짜만 제공하며 정확한 발표시각·다음 갱신시각은 미제공입니다."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ChartSoftwareNotices, {})
			]
		})
	});
}
function RateWindowAverages({ release, pairId }) {
	const digits = PUBLIC_REFERENCE_PAIRS.find((p) => p.id === pairId)?.quote === "KRW" ? 0 : 2;
	const windows = ["7d", "3m"].map((period) => rateWindowAverage(release, pairId, period, digits));
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("section", {
		className: "reference-rate-averages",
		"aria-label": "기간별 참고율 평균",
		children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("dl", { children: windows.map((w) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			"data-average-period": w.period,
			"data-average-status": w.status,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("dt", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: w.period === "7d" ? "1주 평균" : "3개월 평균" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(WidgetMetricHelp, {
					label: `${w.period === "7d" ? "1주" : "3개월"} 평균 관측 기간`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
								dateTime: w.observedStart ?? w.start,
								children: w.observedStart ?? w.start
							}),
							"–",
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
								dateTime: w.observedEnd ?? w.end,
								children: w.observedEnd ?? w.end
							}),
							" · ",
							w.count,
							"개 관측"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [w.period === "7d" ? "최근 7개 달력일" : "달력 기준 3개월", "에 확인한 관측값의 단순평균입니다. 없는 날짜는 보간하지 않습니다."] }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "고시 일정·공식 휴일·누락 사유 미확인" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: w.display ?? "자료 부족" }) }),
				w.status === "insufficient" && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("dd", { children: release.history && release.history.observations[0].date > w.start ? release.kind === "ecb-public-reference-v1" ? "90일 원천으로 요청 범위를 채우지 못했습니다." : "보유 이력으로 요청 범위를 채우지 못했습니다." : "통화·기간 자료가 부족합니다." })
			]
		}, w.period)) })
	});
}
function PublicReferenceDetail({ release, pairId, onClose }) {
	const [period, setPeriod] = (0, import_react$4.useState)("90d"), dialog = (0, import_react$4.useRef)(null), id = (0, import_react$4.useId)(), closing = (0, import_react$4.useRef)(false);
	(0, import_react$4.useEffect)(() => {
		const node = dialog.current;
		if (node && !node.open) node.showModal();
		return () => {
			if (node?.open) node.close();
		};
	}, []);
	const close = () => {
		if (closing.current) return;
		closing.current = true;
		if (dialog.current?.open) dialog.current.close();
		onClose();
	};
	let r;
	try {
		r = decodePublicReferenceRelease(release);
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
			role: "alert",
			children: "공개 참고환율 자료 확인 필요"
		});
	}
	const pair = PUBLIC_REFERENCE_PAIRS.find((p) => p.id === pairId);
	if (!pair) return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
		role: "alert",
		children: "참고환율 항목 확인 필요"
	});
	const v = projectPublicReference(r, pairId, period), coverage = r.history?.observations ?? r.daily.observations;
	const unit = `${pair.quote}/${pair.amount === 1 ? "" : `${pair.amount} `}${pair.base}`;
	const change = v.points.length > 1 && v.points[0].value > 0 ? (v.points.at(-1).value / v.points[0].value - 1) * 100 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("dialog", {
		className: "reference-rate-details",
		ref: dialog,
		"aria-labelledby": id,
		onCancel: (e) => {
			e.preventDefault();
			close();
		},
		onClose: () => {
			if (!dialog.current?.open) close();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h2", {
			id,
			children: pair.quote === "KRW" ? pair.label.replace("/원", "") : pair.label
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
			type: "button",
			autoFocus: true,
			onClick: close,
			"aria-label": "상세 닫기",
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(X, {
				size: 18,
				"aria-hidden": "true"
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: "reference-detail-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(RateWindowAverages, {
				release: r,
				pairId
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("section", {
				className: "reference-detail-trend",
				"aria-label": "선택기간 추이",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
						className: "reference-rate-periods",
						role: "group",
						"aria-label": "환율 추이 기간",
						children: [
							["7d", "7일"],
							["30d", "30일"],
							["90d", "90일"],
							["1y", "1년"],
							["intraday", "일중"]
						].map(([p, label]) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
							type: "button",
							"aria-pressed": period === p,
							disabled: p === "1y" || p === "intraday" || !r.history,
							onClick: () => {
								if (r.history && p !== "1y" && p !== "intraday") setPeriod(p);
							},
							children: label
						}, p))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(WidgetMetricHelp, {
						label: "원천 제공 범위",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [
							r.history ? r.kind !== "ecb-public-reference-v1" ? "선별 이력 실제 제공 범위" : "90일 원천 실제 제공 범위" : "일별 원천만 제공",
							" · ",
							coverage[0].date,
							"–",
							coverage.at(-1).date,
							" · ",
							coverage.length,
							"개 관측 · 1년·일중 미제공"
						] }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "선택기간 변동률은 선택 범위의 첫 실제 관측값 대비 마지막 실제 관측값의 변화입니다. 전일 대비 변동률이 아닙니다." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", {
						className: "reference-detail-change",
						children: ["선택기간 변동률 ", /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: change !== null && Number.isFinite(change) ? `${signedReferenceChange(change)}%` : "변동률 미확인" })]
					}),
					v.points.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PublicReferenceLineChart, {
						points: v.points,
						dates: referenceObservationDates(r),
						label: pair.label,
						digits: pair.quote === "KRW" ? 0 : 2
					}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: v.points.length === 0 ? "해당 통화 참고율 미제공" : "관측 1개 · 추이 미확인" }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(WidgetMetricHelp, {
						label: "추이 읽는 법",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "원천 관측값을 이은 선 · 관측 없는 날짜 값은 미제공 · 보간 없음. 가격 캔들이 아닌 일별 참고율입니다." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("details", {
						className: "reference-detail-values",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("summary", { children: "날짜별 계산 참고율" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("ul", { children: v.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
							dateTime: p.date,
							children: p.date
						}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", { children: [
							p.value,
							" ",
							unit
						] })] }, p.date)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Attribution, { release: r })
				]
			})]
		})]
	});
}
var import_react$4, import_jsx_runtime$5;
function init_PublicReferenceDetail() {
	return (init_PublicReferenceDetail = __esmMin((() => {
		import_react$4 = require_react();
		init_x();
		init_WidgetMetricHelp();
		init_contract();
		init_PublicReferenceMarket();
		init_rateWindowAverage();
		init_public_reference_detail_layout();
		init_PublicReferenceLineChart();
		import_jsx_runtime$5 = require_jsx_runtime();
	})))();
}
/** The new namespace becomes authoritative after the first explicit write. */
function createMarketWatchlist(storage, allowedIds, legacyFxIds) {
	if (!storage) return createMarketInterestStore(null, allowedIds);
	let migrating = false;
	let initialized = false;
	let legacyRaw = null;
	return createMarketInterestStore({
		getItem() {
			const current = storage.getItem(KEY);
			if (!initialized) {
				initialized = true;
				migrating = current === null;
				if (migrating) {
					legacyRaw = storage.getItem(LEGACY_KEY);
					if (createMarketInterestStore({
						getItem: () => legacyRaw,
						setItem: () => {
							throw new Error("Read-only legacy validation");
						}
					}, legacyFxIds).getSnapshot().error === "corrupt") return "{";
				}
			} else if (migrating) {
				if (current !== null || storage.getItem(LEGACY_KEY) !== legacyRaw) return `${legacyRaw ?? ""}\n#migration-conflict`;
			}
			return migrating ? legacyRaw : current;
		},
		setItem(_key, value) {
			storage.setItem(KEY, value);
			migrating = false;
		}
	}, allowedIds);
}
var KEY, LEGACY_KEY;
function init_marketWatchlist() {
	return (init_marketWatchlist = __esmMin((() => {
		KEY = "stockpin.market.watchlist.v1";
		LEGACY_KEY = "stockpin.market.interests.v1";
	})))();
}
function useMarketWatchlist(allowedIds, legacyFxIds) {
	const [store] = (0, import_react$3.useState)(() => {
		let storage = null;
		try {
			if (typeof window !== "undefined") storage = window.localStorage;
		} catch {}
		return createMarketWatchlist(storage, allowedIds, legacyFxIds);
	});
	const snapshot = (0, import_react$3.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getSnapshot);
	const [attempted, setAttempted] = (0, import_react$3.useState)(false);
	const onToggle = (id) => {
		setAttempted(true);
		store.toggle(id);
	};
	const message = snapshot.error && (attempted || snapshot.error !== "unavailable" || typeof window !== "undefined") ? {
		future: "새 버전의 관심 목록입니다. 저장된 목록은 그대로 유지합니다.",
		corrupt: "관심 목록을 읽지 못했습니다. 저장된 내용은 그대로 유지합니다.",
		unavailable: "관심 저장소를 사용할 수 없습니다. 선택은 이번 화면에만 적용됩니다.",
		conflict: "다른 창에서 관심 목록이 바뀌었습니다. 이번 선택은 저장하지 않았습니다.",
		write_failed: "관심 목록 저장을 확인하지 못했습니다. 이번 선택은 저장 완료가 아닙니다."
	}[snapshot.error] : null;
	return {
		snapshot,
		interest: {
			ids: snapshot.ids,
			onToggle
		},
		message
	};
}
var import_react$3;
function init_useMarketWatchlist() {
	return (init_useMarketWatchlist = __esmMin((() => {
		import_react$3 = require_react();
		init_marketWatchlist();
	})))();
}
function init_public_reference() {
	return (init_public_reference = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-reference/public-reference.css?v=source-build-r294";
			document.head.appendChild(l);
		}
	})))();
}
function receiptTime(s) {
	const n = Date.parse(s);
	if (!Number.isFinite(n) || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(s) || ![new Date(n).toISOString(), iso(n)].includes(s)) bad();
	return n;
}
function strictJson(raw) {
	let i = 0;
	const space = () => {
		while (i < raw.length && /[\x20\t\r\n]/.test(raw[i])) i++;
	};
	const string = () => {
		const start = i++;
		while (i < raw.length) {
			const c = raw[i++];
			if (c === "\\") i++;
			else if (c === "\"") return JSON.parse(raw.slice(start, i));
		}
		return bad();
	};
	const value = (depth) => {
		if (depth > 12) bad();
		space();
		const c = raw[i];
		if (c === "\"") {
			string();
			return;
		}
		if (c === "{" || c === "[") {
			i++;
			space();
			const end = c === "{" ? "}" : "]", keys = /* @__PURE__ */ new Set();
			if (raw[i] === end) {
				i++;
				return;
			}
			while (i < raw.length) {
				if (c === "{") {
					if (raw[i] !== "\"") bad();
					const k = string();
					if (keys.has(k)) bad();
					keys.add(k);
					space();
					if (raw[i++] !== ":") bad();
				}
				value(depth + 1);
				space();
				if (raw[i] === end) {
					i++;
					return;
				}
				if (raw[i++] !== ",") bad();
				space();
			}
			bad();
		}
		const m = /^(?:null|true|false|-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)/.exec(raw.slice(i));
		if (!m) bad();
		i += m[0].length;
	};
	value(0);
	space();
	if (i !== raw.length) bad();
	return JSON.parse(raw);
}
function object$1(v, keys) {
	if (!v || typeof v !== "object" || Array.isArray(v) || Object.keys(v).sort().join(",") !== keys.sort().join(",")) bad();
	return v;
}
function uint(v, max) {
	if (typeof v !== "string" || !/^(0|[1-9][0-9]*)$/.test(v) || v.length > 12) bad();
	const n = Number(v);
	if (!Number.isSafeInteger(n) || n > max) bad();
	return n;
}
function parseBitcoinResponse(raw, received, mode) {
	const now = receiptTime(received);
	if (typeof raw !== "string" || new TextEncoder().encode(raw).length > (mode === "latest" ? 8192 : 4194304)) bad();
	const p = object$1(strictJson(raw), [
		"name",
		"data",
		"metadata"
	]);
	if (p.name !== "Fear and Greed Index" || object$1(p.metadata, ["error"]).error !== null || !Array.isArray(p.data) || p.data.length < 1 || p.data.length > (mode === "latest" ? 1 : 2e4)) bad();
	let previous = "9999-99-99", nextUpdateAt = null;
	const rows = p.data.map((v, index) => {
		const hasTtl = !!v && typeof v === "object" && Object.hasOwn(v, "time_until_update");
		const r = object$1(v, [
			"value",
			"value_classification",
			"timestamp",
			...hasTtl ? ["time_until_update"] : []
		]);
		const value = uint(r.value, 100), seconds = uint(r.timestamp, 253402300799);
		if (seconds === 0 || seconds * 1e3 > now || typeof r.value_classification !== "string" || !Object.hasOwn(FEAR_LABELS, r.value_classification)) bad();
		const asOf = iso(seconds * 1e3), day = asOf.slice(0, 10);
		if (day >= previous) bad();
		previous = day;
		if (hasTtl) {
			if (index !== 0) bad();
			const ttl = uint(r.time_until_update, 172800);
			nextUpdateAt = iso(Math.floor(now / 1e3) * 1e3 + ttl * 1e3);
		} else if (mode === "latest") bad();
		return Object.freeze({
			value,
			classification: r.value_classification,
			asOf
		});
	});
	return Object.freeze({
		rows: Object.freeze(rows),
		observedAt: received,
		nextUpdateAt
	});
}
var FEAR_LABELS, bad, iso;
function init_parser() {
	return (init_parser = __esmMin((() => {
		FEAR_LABELS = {
			"Extreme Fear": true,
			Fear: true,
			Neutral: true,
			Greed: true,
			"Extreme Greed": true
		};
		bad = () => {
			throw Error("invalid-bitcoin-response");
		};
		iso = (ms) => new Date(ms).toISOString().replace(".000Z", "Z");
	})))();
}
async function verified(c, url, mode) {
	if (c.url !== url) throw Error("source-url");
	if (c.status !== 200) throw Error("HTTP " + c.status);
	receiptTime(c.receivedAt);
	const bytes = new TextEncoder().encode(c.raw);
	if (bytes.length > (mode === "latest" ? 8192 : 4194304)) throw Error("body-limit");
	const digest = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)), (b) => b.toString(16).padStart(2, "0")).join("");
	if (!/^[a-f0-9]{64}$/.test(c.sha256) || digest !== c.sha256) throw Error("sha256-mismatch");
	return parseBitcoinResponse(c.raw, c.receivedAt, mode);
}
/** Official terms permit attributed display/commercial use, not impersonation.
* Runtime owns no broker/credentials/storage or scheduler. Receipt is capture time,
* never browser mount time. Full source responses are admitted atomically. */
async function assembleBitcoinRelease(latest, history) {
	const [q, h] = await Promise.all([verified(latest, BITCOIN_LATEST_URL, "latest"), verified(history, BITCOIN_HISTORY_URL, "history")]);
	const current = q.rows[0], matching = h.rows.find((r) => r.asOf === current.asOf);
	if (!matching || matching.value !== current.value || matching.classification !== current.classification || h.rows[0].asOf !== current.asOf) throw Error("inconsistent-latest-history");
	const quote = Object.freeze({
		kind: "alternative_bitcoin_fng_v1",
		sourceUrl: BITCOIN_SOURCE,
		...current,
		observedAt: new Date(receiptTime(q.observedAt)).toISOString().replace(/\.\d{3}Z$/, "Z"),
		nextUpdateAt: q.nextUpdateAt
	});
	return Object.freeze({
		kind: "bitcoin-public-frozen-v1",
		quote,
		rows: h.rows,
		latestSha256: latest.sha256,
		historySha256: history.sha256,
		historyReceivedAt: history.receivedAt
	});
}
/** Failed candidate never destroys the previously admitted release. */
async function updateBitcoinState(previous, latest, history) {
	try {
		const release = await assembleBitcoinRelease(latest, history), old = previous.release;
		if (old && (release.quote.asOf < old.quote.asOf || release.quote.observedAt < old.quote.observedAt || receiptTime(release.historyReceivedAt) < receiptTime(old.historyReceivedAt))) throw Error("older-release");
		return {
			release,
			error: null
		};
	} catch (e) {
		return {
			release: previous.release,
			error: e instanceof Error ? e.message : "bitcoin-supply-failed"
		};
	}
}
/** Feed quote/rows/now/error/historyError to existing FearGreedDetails.
* Attribution and frozen/stale indicator must remain visibly adjacent. */
function bitcoinProps(state, now) {
	const t = receiptTime(now), q = state.release?.quote ?? null;
	const future = !!q && (Date.parse(q.observedAt) > t || Date.parse(q.asOf) > t || Date.parse(state.release.historyReceivedAt) > t);
	const stale = !!q && (future || t - Date.parse(q.asOf) > 1296e5 || t > Date.parse(q.nextUpdateAt) + 3e5);
	return {
		quote: future ? null : q,
		rows: future ? [] : state.release?.rows ?? [],
		now,
		error: future ? "기기 시각보다 미래인 자료입니다." : state.error,
		historyError: state.error,
		stale,
		frozen: true,
		attribution: BITCOIN_ATTRIBUTION,
		title: "비트코인 공포·탐욕",
		receivedAt: state.release?.quote.observedAt ?? null
	};
}
var BITCOIN_SOURCE, BITCOIN_LATEST_URL, BITCOIN_HISTORY_URL, BITCOIN_ATTRIBUTION;
function init_adapter() {
	return (init_adapter = __esmMin((() => {
		init_parser();
		BITCOIN_SOURCE = "https://alternative.me/crypto/fear-and-greed-index/";
		BITCOIN_LATEST_URL = "https://api.alternative.me/fng/?limit=1&format=json";
		BITCOIN_HISTORY_URL = "https://api.alternative.me/fng/?limit=0&format=json";
		BITCOIN_ATTRIBUTION = Object.freeze({
			label: "Alternative.me",
			href: BITCOIN_SOURCE,
			placement: "immediately-next-to-data",
			scope: "Bitcoin only; 0 Extreme Fear – 100 Extreme Greed"
		});
	})))();
}
function loadFrozenBitcoinState(previous = {
	release: null,
	error: null
}) {
	return updateBitcoinState(previous, latest, history);
}
var latest, history;
function init_frozen() {
	return (init_frozen = __esmMin((() => {
		init_adapter();
		latest = {
			"url": "https://api.alternative.me/fng/?limit=1&format=json",
			"status": 200,
			"sha256": "544d772f79b9d720cc7aed1d17ee31605125c24eb336c9d13c7edf919cff5b70",
			"receivedAt": "2026-11-15T13:37:02.629Z",
			"raw": "{\n	\"name\": \"Fear and Greed Index\",\n	\"data\": [\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1794700800\",\n			\"time_until_update\": \"37378\"\n		}\n	],\n	\"metadata\": {\n		\"error\": null\n	}\n}"
		};
		history = {
			"url": "https://api.alternative.me/fng/?limit=0&format=json",
			"status": 200,
			"sha256": "204d950a670e666cdca91275bfc2bb8090338bc6a13b0816bfcc08c186dcb11e",
			"receivedAt": "2026-11-15T13:37:03.944Z",
			"raw": "{\n	\"name\": \"Fear and Greed Index\",\n	\"data\": [\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1794700800\",\n			\"time_until_update\": \"37377\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1794614400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1794528000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1794441600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1794355200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1794268800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1794182400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1794096000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1794009600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1793923200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1793836800\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1793750400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1793664000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1793577600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1793491200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1793404800\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1793318400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1793232000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1793145600\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1793059200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1792972800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1792886400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1792800000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1792713600\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1792627200\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1792540800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1792454400\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1792368000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1792281600\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1792195200\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1792108800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1792022400\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791936000\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791849600\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791763200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791676800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791590400\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791504000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791417600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791331200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791244800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791158400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1791072000\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790985600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790899200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790812800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790726400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790640000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790553600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790467200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790380800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790294400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790208000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1790121600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1790035200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789948800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789862400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789776000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789689600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1789603200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1789516800\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789430400\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789344000\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789257600\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789171200\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1789084800\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788998400\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788912000\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788825600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788739200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788652800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788566400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788480000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788393600\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788307200\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788220800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788134400\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1788048000\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787961600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787875200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787788800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787702400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787616000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787529600\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787443200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787356800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787270400\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1787184000\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1787097600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1787011200\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786924800\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786838400\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786752000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786665600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786579200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786492800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786406400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786320000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786233600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786147200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1786060800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1785974400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785888000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1785801600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785715200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785628800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785542400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1785456000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785369600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785283200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785196800\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785110400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1785024000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1784937600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1784851200\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1784764800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1784678400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1784592000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1784505600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1784419200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1784332800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1784246400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1784160000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1784073600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783987200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1783900800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1783814400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1783728000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783641600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783555200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783468800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1783382400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783296000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783209600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783123200\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1783036800\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782950400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782864000\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782777600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782691200\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782604800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782518400\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782432000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782345600\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782259200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782172800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782086400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1782000000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781913600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781827200\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781740800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781654400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781568000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781481600\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781395200\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781308800\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781222400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781136000\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1781049600\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780963200\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780876800\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780790400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780704000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780617600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780531200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780444800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780358400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1780272000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1780185600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780099200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1780012800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1779926400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1779840000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1779753600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1779667200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1779580800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1779494400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1779408000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1779321600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1779235200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1779148800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1779062400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778976000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778889600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778803200\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778716800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778630400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1778544000\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1778457600\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1778371200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778284800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778198400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1778112000\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1778025600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1777939200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777852800\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1777766400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777680000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777593600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777507200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777420800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777334400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1777248000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777161600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1777075200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1776988800\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1776902400\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1776816000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1776729600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1776643200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1776556800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1776470400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1776384000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1776297600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1776211200\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1776124800\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1776038400\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775952000\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775865600\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775779200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775692800\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775606400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775520000\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775433600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775347200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775260800\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775174400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775088000\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1775001600\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774915200\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774828800\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774742400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774656000\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774569600\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774483200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774396800\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774310400\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774224000\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774137600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1774051200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773964800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773878400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1773792000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1773705600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773619200\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773532800\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773446400\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773360000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773273600\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773187200\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773100800\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1773014400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772928000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772841600\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772755200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772668800\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772582400\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772496000\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772409600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772323200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772236800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772150400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1772064000\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771977600\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771891200\"\n		},\n		{\n			\"value\": \"5\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771804800\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771718400\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771632000\"\n		},\n		{\n			\"value\": \"7\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771545600\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771459200\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771372800\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771286400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771200000\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771113600\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1771027200\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770940800\"\n		},\n		{\n			\"value\": \"5\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770854400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770768000\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770681600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770595200\"\n		},\n		{\n			\"value\": \"7\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770508800\"\n		},\n		{\n			\"value\": \"6\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770422400\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770336000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770249600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770163200\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1770076800\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769990400\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769904000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769817600\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769731200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1769644800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1769558400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1769472000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769385600\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769299200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769212800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769126400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1769040000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1768953600\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1768867200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1768780800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1768694400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1768608000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1768521600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1768435200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1768348800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1768262400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1768176000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1768089600\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1768003200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1767916800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1767830400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1767744000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1767657600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1767571200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1767484800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1767398400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1767312000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1767225600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1767139200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1767052800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766966400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766880000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766793600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766707200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766620800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766534400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766448000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766361600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766275200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766188800\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766102400\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1766016000\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765929600\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765843200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765756800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765670400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765584000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1765497600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1765411200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1765324800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765238400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765152000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1765065600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1764979200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1764892800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1764806400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1764720000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1764633600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1764547200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1764460800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1764374400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1764288000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1764201600\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1764115200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1764028800\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763942400\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763856000\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763769600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763683200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763596800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763510400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763424000\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763337600\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763251200\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763164800\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1763078400\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1762992000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1762905600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1762819200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1762732800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1762646400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1762560000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1762473600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1762387200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1762300800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1762214400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1762128000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1762041600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761955200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761868800\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761782400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1761696000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1761609600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1761523200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761436800\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761350400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761264000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761177600\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1761091200\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1761004800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1760918400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1760832000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1760745600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1760659200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1760572800\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1760486400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1760400000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1760313600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1760227200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1760140800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1760054400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759968000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759881600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759795200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759708800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759622400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759536000\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759449600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1759363200\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1759276800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1759190400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1759104000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1759017600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1758931200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1758844800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1758758400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1758672000\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1758585600\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1758499200\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1758412800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1758326400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1758240000\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1758153600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1758067200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757980800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757894400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1757808000\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757721600\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1757635200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757548800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757462400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757376000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757289600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1757203200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757116800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1757030400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756944000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1756857600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756771200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1756684800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756598400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1756512000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756425600\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756339200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756252800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756166400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1756080000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1755993600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755907200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1755820800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1755734400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1755648000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755561600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755475200\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755388800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755302400\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755216000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755129600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1755043200\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754956800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754870400\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754784000\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754697600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754611200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754524800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1754438400\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754352000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754265600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1754179200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754092800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1754006400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753920000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753833600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753747200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753660800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753574400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753488000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753401600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753315200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753228800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753142400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1753056000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752969600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752883200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752796800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752710400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752624000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752537600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752451200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752364800\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1752278400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752192000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752105600\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1752019200\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751932800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751846400\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751760000\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751673600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751587200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751500800\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751414400\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751328000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751241600\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751155200\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1751068800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1750982400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1750896000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1750809600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1750723200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1750636800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1750550400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1750464000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1750377600\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1750291200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1750204800\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1750118400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1750032000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749945600\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749859200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749772800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749686400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749600000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749513600\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749427200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749340800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1749254400\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1749168000\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1749081600\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748995200\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748908800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748822400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748736000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1748649600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748563200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748476800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748390400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748304000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748217600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748131200\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1748044800\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1747958400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747872000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747785600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747699200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747612800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747526400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747440000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747353600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747267200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747180800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747094400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1747008000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746921600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746835200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746748800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746662400\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746576000\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746489600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1746403200\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746316800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746230400\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1746144000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1746057600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1745971200\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1745884800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1745798400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1745712000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1745625600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1745539200\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1745452800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1745366400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1745280000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1745193600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1745107200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1745020800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744934400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744848000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744761600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744675200\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744588800\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744502400\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744416000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1744329600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1744243200\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1744156800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1744070400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1743984000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743897600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743811200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743724800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1743638400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743552000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743465600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743379200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743292800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743206400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743120000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1743033600\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1742947200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742860800\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742774400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742688000\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742601600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742515200\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1742428800\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742342400\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742256000\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742169600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1742083200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1741996800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1741910400\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1741824000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1741737600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1741651200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1741564800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1741478400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1741392000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1741305600\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1741219200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1741132800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1741046400\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1740960000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1740873600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1740787200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1740700800\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1740614400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1740528000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1740441600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1740355200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1740268800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1740182400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1740096000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1740009600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1739923200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1739836800\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1739750400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1739664000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1739577600\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1739491200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1739404800\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1739318400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1739232000\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1739145600\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1739059200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1738972800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1738886400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1738800000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1738713600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1738627200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1738540800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1738454400\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1738368000\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1738281600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1738195200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1738108800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1738022400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1737936000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1737849600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1737763200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1737676800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1737590400\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1737504000\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1737417600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1737331200\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1737244800\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1737158400\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1737072000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736985600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736899200\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736812800\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736726400\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736640000\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736553600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1736467200\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736380800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736294400\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1736208000\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1736121600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1736035200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735948800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735862400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735776000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735689600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735603200\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735516800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735430400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735344000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735257600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1735171200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1735084800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1734998400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1734912000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1734825600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1734739200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1734652800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1734566400\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1734480000\"\n		},\n		{\n			\"value\": \"87\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1734393600\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1734307200\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1734220800\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1734134400\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1734048000\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733961600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1733875200\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733788800\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733702400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733616000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1733529600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1733443200\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733356800\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733270400\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733184000\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733097600\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1733011200\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732924800\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732838400\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732752000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1732665600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732579200\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732492800\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732406400\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732320000\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732233600\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732147200\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1732060800\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731974400\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731888000\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731801600\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731715200\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731628800\"\n		},\n		{\n			\"value\": \"88\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731542400\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731456000\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731369600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731283200\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1731196800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1731110400\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1731024000\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1730937600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730851200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730764800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730678400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730592000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730505600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730419200\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1730332800\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1730246400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730160000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1730073600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729987200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729814400\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729728000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729641600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729555200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729468800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729382400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729296000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729209600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729123200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1729036800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1728950400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728864000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728777600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728691200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1728604800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1728518400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728432000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728345600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728259200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728172800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1728086400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1728000000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1727913600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1727827200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1727740800\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1727654400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1727568000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1727481600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1727395200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1727308800\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1727222400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1727136000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1727049600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1726963200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1726876800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1726790400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1726704000\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1726617600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1726531200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1726444800\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1726358400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1726272000\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1726185600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1726099200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1726012800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725926400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725840000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725753600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1725667200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1725580800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725494400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725408000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725321600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725235200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725148800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1725062400\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724976000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724889600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724803200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1724716800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1724630400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1724544000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1724457600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724371200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724284800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724198400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724112000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1724025600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1723939200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1723852800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1723766400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1723680000\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1723593600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1723507200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1723420800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1723334400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1723248000\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1723161600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1723075200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1722988800\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1722902400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1722816000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1722729600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1722643200\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1722556800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1722470400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1722384000\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1722297600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1722211200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1722124800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1722038400\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721952000\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721865600\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721779200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721692800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721606400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721520000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721433600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721347200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721260800\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721174400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1721088000\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1721001600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720915200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1720828800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1720742400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720656000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720569600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720483200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720396800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720310400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720224000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720137600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1720051200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1719964800\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1719878400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1719792000\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1719705600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1719619200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1719532800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1719446400\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1719360000\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1719273600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1719187200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1719100800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1719014400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718928000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718841600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718755200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718668800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718582400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718496000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718409600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718323200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718236800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718150400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1718064000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717977600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717891200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717804800\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1717718400\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1717632000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717545600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717459200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717372800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717286400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717200000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717113600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1717027200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1716940800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1716854400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1716768000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1716681600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1716595200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1716508800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1716422400\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1716336000\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1716249600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1716163200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1716076800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715990400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715904000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715817600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715731200\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715644800\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715558400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715472000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1715385600\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715299200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715212800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715126400\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1715040000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714953600\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714867200\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714780800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1714694400\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1714608000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1714521600\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714435200\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714348800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714262400\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714176000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714089600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1714003200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713916800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713830400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713744000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713657600\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713571200\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713484800\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713398400\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713312000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713225600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713139200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1713052800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1712966400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712880000\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712793600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712707200\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712620800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712534400\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712448000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1712361600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712275200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1712188800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1712102400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1712016000\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1711929600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1711843200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1711756800\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1711670400\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1711584000\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1711497600\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1711411200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1711324800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1711238400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1711152000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1711065600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710979200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1710892800\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710806400\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710720000\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710633600\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710547200\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710460800\"\n		},\n		{\n			\"value\": \"88\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710374400\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710288000\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710201600\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710115200\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1710028800\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709942400\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709856000\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709769600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1709683200\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709596800\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709510400\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709424000\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709337600\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709251200\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709164800\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1709078400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1708992000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708905600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708819200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708732800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1708646400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708560000\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1708473600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708387200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708300800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708214400\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1708128000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1708041600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707955200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707868800\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1707782400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707696000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707609600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707523200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707436800\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707350400\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707264000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707177600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707091200\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1707004800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1706918400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1706832000\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1706745600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1706659200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1706572800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1706486400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1706400000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1706313600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1706227200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1706140800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1706054400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1705968000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705881600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705795200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1705708800\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1705622400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705536000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705449600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705363200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1705276800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705190400\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705104000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1705017600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1704931200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704844800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1704758400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704672000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704585600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704499200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704412800\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704326400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704240000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704153600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1704067200\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703980800\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703894400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703808000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703721600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703635200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703548800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703462400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703376000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703289600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703203200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703116800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1703030400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702944000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702857600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702771200\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702684800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702598400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702512000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702425600\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702339200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702252800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702166400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1702080000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701993600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701907200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701820800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701734400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701648000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701561600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701475200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701388800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701302400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701216000\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701129600\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1701043200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700956800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700870400\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700784000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700697600\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700611200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700524800\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700438400\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700352000\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700265600\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700179200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700092800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1700006400\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699920000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699833600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699747200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699660800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699574400\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699488000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699401600\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699315200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699228800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699142400\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1699056000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698969600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698883200\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698796800\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698710400\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698624000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698537600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698451200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698364800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698278400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698192000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1698105600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1698019200\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1697932800\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1697846400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1697760000\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1697673600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1697587200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1697500800\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1697414400\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1697328000\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1697241600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1697155200\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1697068800\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696982400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696896000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696809600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696723200\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696636800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696550400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696464000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696377600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696291200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696204800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696118400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1696032000\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1695945600\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1695859200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1695772800\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1695686400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1695600000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1695513600\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1695427200\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1695340800\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1695254400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1695168000\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1695081600\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694995200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694908800\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694822400\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694736000\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694649600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694563200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694476800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694390400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694304000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694217600\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694131200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1694044800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693958400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693872000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693785600\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693699200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693612800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693526400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1693440000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1693353600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693267200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693180800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693094400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1693008000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692921600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692835200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692748800\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692662400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692576000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692489600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692403200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1692316800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1692230400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1692144000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1692057600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691971200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691884800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691798400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691712000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691625600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691539200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691452800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691366400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691280000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691193600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691107200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1691020800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690934400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690848000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690761600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690675200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690588800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690502400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690416000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690329600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690243200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1690156800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1690070400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1689984000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1689897600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689811200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1689724800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689638400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1689552000\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689465600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689379200\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689292800\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689206400\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689120000\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1689033600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688947200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688860800\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688774400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688688000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688601600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688515200\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688428800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688342400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688256000\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688169600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1688083200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1687996800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687910400\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687824000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687737600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687651200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687564800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687478400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687392000\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1687305600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1687219200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1687132800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1687046400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686960000\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686873600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1686787200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1686700800\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1686614400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686528000\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686441600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686355200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686268800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686182400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1686096000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1686009600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685923200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685836800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685750400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685664000\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685577600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685491200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685404800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685318400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685232000\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685145600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1685059200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684972800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684886400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684800000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684713600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684627200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684540800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684454400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684368000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684281600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684195200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684108800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1684022400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1683936000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1683849600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1683763200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1683676800\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1683590400\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1683504000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1683417600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1683331200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1683244800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1683158400\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1683072000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682985600\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682899200\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682812800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682726400\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682640000\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682553600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682467200\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1682380800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1682294400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1682208000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1682121600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1682035200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1681948800\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681862400\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681776000\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681689600\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681603200\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681516800\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681430400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681344000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681257600\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681171200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1681084800\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680998400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680912000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680825600\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680739200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680652800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680566400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680480000\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680393600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680307200\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680220800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680134400\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1680048000\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679961600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679875200\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679788800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679702400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679616000\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679529600\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679443200\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679356800\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679270400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679184000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1679097600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1679011200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1678924800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1678838400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1678752000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1678665600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1678579200\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1678492800\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1678406400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1678320000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1678233600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1678147200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1678060800\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677974400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677888000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677801600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677715200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677628800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677542400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677456000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677369600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677283200\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1677196800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1677110400\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1677024000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1676937600\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1676851200\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1676764800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1676678400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1676592000\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1676505600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1676419200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1676332800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1676246400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1676160000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1676073600\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1675987200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675900800\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675814400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1675728000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675641600\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675555200\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675468800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675382400\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675296000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675209600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1675123200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1675036800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1674950400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674864000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1674777600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674691200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674604800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674518400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674432000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674345600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674259200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674172800\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1674086400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1674000000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1673913600\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1673827200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1673740800\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1673654400\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1673568000\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1673481600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1673395200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1673308800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1673222400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1673136000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1673049600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672963200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672876800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672790400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672704000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672617600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672531200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1672444800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672358400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672272000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672185600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672099200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1672012800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671926400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671840000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671753600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671667200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671580800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671494400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671408000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671321600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671235200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671148800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1671062400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670976000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670889600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670803200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670716800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670630400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670544000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1670457600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670371200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1670284800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670198400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670112000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1670025600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1669939200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1669852800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1669766400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1669680000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1669593600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1669507200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1669420800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1669334400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1669248000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1669161600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1669075200\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668988800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668902400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668816000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668729600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668643200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668556800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668470400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668384000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668297600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668211200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668124800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1668038400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667952000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667865600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667779200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667692800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667606400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667520000\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667433600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667347200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667260800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667174400\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667088000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1667001600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1666915200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1666828800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1666742400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666656000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666569600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666483200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666396800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666310400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666224000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666137600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1666051200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665964800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665878400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665792000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665705600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665619200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665532800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665446400\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665360000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665273600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665187200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1665100800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1665014400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664928000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664841600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664755200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664668800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664582400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664496000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664409600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664323200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664236800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664150400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1664064000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663977600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663891200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663804800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663718400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663632000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663545600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1663459200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663372800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1663286400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1663200000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1663113600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1663027200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662940800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1662854400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1662768000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662681600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662595200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662508800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662422400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662336000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662249600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662163200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1662076800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1661990400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1661904000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1661817600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1661731200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1661644800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1661558400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1661472000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1661385600\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1661299200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1661212800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1661126400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1661040000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660953600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660867200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660780800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660694400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660608000\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660521600\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1660435200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660348800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660262400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660176000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660089600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1660003200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659916800\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659830400\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659744000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659657600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659571200\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659484800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659398400\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659312000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659225600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659139200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1659052800\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658966400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658880000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658793600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658707200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658620800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658534400\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658448000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658361600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658275200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1658188800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1658102400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1658016000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657929600\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657843200\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657756800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657670400\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657584000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657497600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657411200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657324800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657238400\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657152000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1657065600\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656979200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656892800\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656806400\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656720000\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656633600\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656547200\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656460800\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656374400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656288000\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656201600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656115200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1656028800\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655942400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655856000\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655769600\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655683200\"\n		},\n		{\n			\"value\": \"6\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655596800\"\n		},\n		{\n			\"value\": \"6\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655510400\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655424000\"\n		},\n		{\n			\"value\": \"7\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655337600\"\n		},\n		{\n			\"value\": \"7\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655251200\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655164800\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1655078400\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654992000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654905600\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654819200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654732800\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654646400\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654560000\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654473600\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654387200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654300800\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654214400\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654128000\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1654041600\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653955200\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653868800\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653782400\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653696000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653609600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653523200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653436800\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653350400\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653264000\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653177600\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653091200\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1653004800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652918400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652832000\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652745600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652659200\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652572800\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652486400\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652400000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652313600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652227200\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652140800\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1652054400\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651968000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651881600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651795200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1651708800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651622400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1651536000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1651449600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651363200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651276800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651190400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651104000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1651017600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1650931200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1650844800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1650758400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1650672000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1650585600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1650499200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1650412800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1650326400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1650240000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1650153600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1650067200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1649980800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1649894400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1649808000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1649721600\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1649635200\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1649548800\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1649462400\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1649376000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1649289600\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1649203200\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1649116800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1649030400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1648944000\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1648857600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1648771200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1648684800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1648598400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1648512000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1648425600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1648339200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1648252800\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1648166400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1648080000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1647993600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1647907200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1647820800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1647734400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1647648000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1647561600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1647475200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1647388800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1647302400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1647216000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1647129600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1647043200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1646956800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1646870400\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1646784000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1646697600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1646611200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1646524800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1646438400\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1646352000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1646265600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1646179200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1646092800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1646006400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1645920000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1645833600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1645747200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1645660800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1645574400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1645488000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1645401600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1645315200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1645228800\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1645142400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1645056000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1644969600\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1644883200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1644796800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1644710400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1644624000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1644537600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1644451200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1644364800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1644278400\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1644192000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1644105600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1644019200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643932800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643846400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1643760000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1643673600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643587200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1643500800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643414400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643328000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643241600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643155200\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1643068800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642982400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642896000\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642809600\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642723200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642636800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642550400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642464000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642377600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642291200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642204800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642118400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1642032000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641945600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641859200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641772800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641686400\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641600000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641513600\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641427200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641340800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1641254400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1641168000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1641081600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1640995200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640908800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1640822400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640736000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640649600\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640563200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640476800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640390400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640304000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640217600\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640131200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1640044800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1639958400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1639872000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1639785600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1639699200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1639612800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1639526400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1639440000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1639353600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1639267200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1639180800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1639094400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1639008000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1638921600\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1638835200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1638748800\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1638662400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1638576000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1638489600\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1638403200\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1638316800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1638230400\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1638144000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1638057600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1637971200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1637884800\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1637798400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1637712000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1637625600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1637539200\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1637452800\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1637366400\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1637280000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1637193600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1637107200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1637020800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636934400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636848000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636761600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636675200\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1636588800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636502400\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1636416000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636329600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636243200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636156800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1636070400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635984000\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1635897600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635811200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635724800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635638400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635552000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635465600\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635379200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635292800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1635206400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635120000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1635033600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1634947200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1634860800\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1634774400\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1634688000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1634601600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1634515200\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1634428800\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1634342400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1634256000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1634169600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1634083200\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1633996800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1633910400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1633824000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1633737600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1633651200\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1633564800\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1633478400\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1633392000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1633305600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1633219200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1633132800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1633046400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1632960000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1632873600\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1632787200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1632700800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1632614400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1632528000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1632441600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1632355200\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1632268800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1632182400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1632096000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1632009600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1631923200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1631836800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1631750400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1631664000\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1631577600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1631491200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1631404800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1631318400\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1631232000\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1631145600\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1631059200\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1630972800\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1630886400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630800000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630713600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630627200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630540800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630454400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630368000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630281600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630195200\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1630108800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1630022400\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1629936000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1629849600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1629763200\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1629676800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1629590400\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1629504000\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1629417600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1629331200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1629244800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1629158400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1629072000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628985600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1628899200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628812800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628726400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628640000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628553600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628467200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628380800\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1628294400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1628208000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1628121600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1628035200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1627948800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1627862400\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1627776000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1627689600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1627603200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1627516800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1627430400\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1627344000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1627257600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1627171200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1627084800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626998400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626912000\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626825600\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626739200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626652800\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626566400\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626480000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626393600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626307200\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626220800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626134400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1626048000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1625961600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1625875200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1625788800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1625702400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1625616000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1625529600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1625443200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1625356800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1625270400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1625184000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1625097600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1625011200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624924800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624838400\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624752000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624665600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1624579200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624492800\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624406400\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624320000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624233600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624147200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1624060800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1623974400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1623888000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1623801600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1623715200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1623628800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1623542400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1623456000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1623369600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1623283200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1623196800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1623110400\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1623024000\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622937600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622851200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1622764800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622678400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622592000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622505600\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622419200\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622332800\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622246400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1622160000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1622073600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621987200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621900800\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621814400\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621728000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621641600\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621555200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621468800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621382400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621296000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1621209600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1621123200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1621036800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1620950400\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1620864000\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620777600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620691200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620604800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620518400\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620432000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620345600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620259200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1620172800\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620086400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1620000000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1619913600\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1619827200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1619740800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1619654400\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1619568000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1619481600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1619395200\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1619308800\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1619222400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1619136000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1619049600\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1618963200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1618876800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1618790400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1618704000\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1618617600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1618531200\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1618444800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1618358400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1618272000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1618185600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1618099200\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1618012800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617926400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617840000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617753600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617667200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617580800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617494400\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617408000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617321600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617235200\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1617148800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1617062400\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616976000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616889600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616803200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1616716800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616630400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616544000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616457600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616371200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616284800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616198400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616112000\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1616025600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1615939200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1615852800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1615766400\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1615680000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1615593600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1615507200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1615420800\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1615334400\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1615248000\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1615161600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1615075200\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614988800\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614902400\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614816000\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614729600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614643200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1614556800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1614470400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1614384000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1614297600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614211200\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614124800\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1614038400\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613952000\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613865600\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613779200\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613692800\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613606400\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613520000\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613433600\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613347200\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613260800\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613174400\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613088000\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1613001600\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612915200\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612828800\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612742400\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612656000\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612569600\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612483200\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612396800\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612310400\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612224000\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612137600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1612051200\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1611964800\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1611878400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1611792000\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1611705600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1611619200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1611532800\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1611446400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1611360000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1611273600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1611187200\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1611100800\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1611014400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610928000\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610841600\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610755200\"\n		},\n		{\n			\"value\": \"88\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610668800\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610582400\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610496000\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610409600\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610323200\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610236800\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610150400\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1610064000\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609977600\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609891200\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609804800\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609718400\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609632000\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609545600\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609459200\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609372800\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609286400\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609200000\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609113600\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1609027200\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608940800\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608854400\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608768000\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608681600\"\n		},\n		{\n			\"value\": \"88\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608595200\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608508800\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608422400\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608336000\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608249600\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608163200\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1608076800\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607990400\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607904000\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607817600\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607731200\"\n		},\n		{\n			\"value\": \"89\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607644800\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607558400\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607472000\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607385600\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607299200\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607212800\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607126400\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1607040000\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606953600\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606867200\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606780800\"\n		},\n		{\n			\"value\": \"88\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606694400\"\n		},\n		{\n			\"value\": \"89\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606608000\"\n		},\n		{\n			\"value\": \"87\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606521600\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606435200\"\n		},\n		{\n			\"value\": \"93\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606348800\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606262400\"\n		},\n		{\n			\"value\": \"88\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606176000\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606089600\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1606003200\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605916800\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605830400\"\n		},\n		{\n			\"value\": \"94\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605744000\"\n		},\n		{\n			\"value\": \"91\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605657600\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605571200\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605484800\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605398400\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605312000\"\n		},\n		{\n			\"value\": \"89\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605225600\"\n		},\n		{\n			\"value\": \"87\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605139200\"\n		},\n		{\n			\"value\": \"86\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1605052800\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1604966400\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1604880000\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1604793600\"\n		},\n		{\n			\"value\": \"88\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1604707200\"\n		},\n		{\n			\"value\": \"90\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1604620800\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1604534400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1604448000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1604361600\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1604275200\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1604188800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1604102400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1604016000\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603929600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603843200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603756800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603670400\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1603584000\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603497600\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603411200\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603324800\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603238400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603152000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1603065600\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1602979200\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1602892800\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1602806400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1602720000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1602633600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1602547200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1602460800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1602374400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1602288000\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1602201600\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1602115200\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1602028800\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1601942400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601856000\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601769600\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601683200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601596800\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601510400\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1601424000\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601337600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601251200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1601164800\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1601078400\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1600992000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1600905600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1600819200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1600732800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1600646400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1600560000\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1600473600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1600387200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1600300800\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1600214400\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1600128000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1600041600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599955200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599868800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599782400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599696000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599609600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599523200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599436800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599350400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599264000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1599177600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1599091200\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1599004800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1598918400\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1598832000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1598745600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1598659200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1598572800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1598486400\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1598400000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1598313600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1598227200\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1598140800\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1598054400\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597968000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1597881600\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597795200\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597708800\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597622400\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597536000\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597449600\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597363200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1597276800\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1597190400\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597104000\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1597017600\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1596931200\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1596844800\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1596758400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1596672000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1596585600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1596499200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1596412800\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1596326400\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1596240000\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1596153600\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1596067200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1595980800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1595894400\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1595808000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1595721600\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1595635200\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1595548800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1595462400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1595376000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1595289600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1595203200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1595116800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1595030400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594944000\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594857600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594771200\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594684800\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594598400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594512000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594425600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594339200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594252800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594166400\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1594080000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593993600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593907200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593820800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593734400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593648000\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593561600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593475200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593388800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593302400\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593216000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593129600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1593043200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1592956800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592870400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592784000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592697600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592611200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592524800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592438400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592352000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592265600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592179200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592092800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1592006400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1591920000\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591833600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591747200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591660800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591574400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591488000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591401600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591315200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591228800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1591142400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1591056000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1590969600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1590883200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1590796800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1590710400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1590624000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1590537600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1590451200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1590364800\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1590278400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1590192000\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1590105600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1590019200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1589932800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1589846400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1589760000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1589673600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1589587200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1589500800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1589414400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1589328000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1589241600\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1589155200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1589068800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1588982400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1588896000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1588809600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588723200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588636800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588550400\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588464000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588377600\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588291200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588204800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588118400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1588032000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1587945600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587859200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587772800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587686400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587600000\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587513600\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587427200\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587340800\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587254400\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587168000\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1587081600\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586995200\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586908800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586822400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586736000\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586649600\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586563200\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586476800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586390400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586304000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586217600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586131200\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1586044800\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585958400\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585872000\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585785600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585699200\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585612800\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585526400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585440000\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585353600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585267200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585180800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585094400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1585008000\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584921600\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584835200\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584748800\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584662400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584576000\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584489600\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584403200\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584316800\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584230400\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584144000\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1584057600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1583971200\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1583884800\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1583798400\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1583712000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583625600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583539200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583452800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583366400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583280000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583193600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583107200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1583020800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582934400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582848000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582761600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582675200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582588800\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582502400\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582416000\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582329600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582243200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1582156800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1582070400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1581984000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1581897600\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581811200\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581724800\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581638400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581552000\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581465600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1581379200\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581292800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581206400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581120000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1581033600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580947200\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1580860800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580774400\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580688000\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580601600\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580515200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580428800\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580342400\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1580256000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1580169600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1580083200\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1579996800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1579910400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1579824000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579737600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579651200\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579564800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579478400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579392000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579305600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579219200\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1579132800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1579046400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1578960000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1578873600\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578787200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1578700800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578614400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578528000\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1578441600\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578355200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578268800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578182400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578096000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1578009600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577923200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577836800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577750400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577664000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577577600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577491200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577404800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577318400\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1577232000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1577145600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1577059200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576972800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576886400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576800000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576713600\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576627200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576540800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576454400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576368000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1576281600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576195200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576108800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1576022400\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575936000\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575849600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575763200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575676800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575590400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1575504000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1575417600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575331200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575244800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1575158400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1575072000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1574985600\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1574899200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1574812800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1574726400\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1574640000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1574553600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1574467200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1574380800\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1574294400\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1574208000\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1574121600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1574035200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573948800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573862400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573776000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573689600\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573603200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573516800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573430400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573344000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573257600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1573171200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1573084800\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572998400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572912000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572825600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1572739200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572652800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572566400\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572480000\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572393600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572307200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572220800\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572134400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1572048000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1571961600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1571875200\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571788800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571702400\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571616000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571529600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571443200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571356800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571270400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571184000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571097600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1571011200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570924800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570838400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570752000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570665600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570579200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570492800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570406400\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570320000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570233600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570147200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1570060800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569974400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569888000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569801600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569715200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569628800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1569542400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1569456000\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1569369600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569283200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569196800\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569110400\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1569024000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568937600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568851200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568764800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568678400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568592000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568505600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568419200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568332800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568246400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568160000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1568073600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567987200\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567900800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567814400\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567728000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567641600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567555200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567468800\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1567382400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1567296000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1567209600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1567123200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1567036800\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566950400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566864000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566777600\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566691200\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566604800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566518400\"\n		},\n		{\n			\"value\": \"5\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1566432000\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1566345600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566259200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1566172800\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1566086400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1566000000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1565913600\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1565827200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1565740800\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1565654400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1565568000\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1565481600\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1565395200\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1565308800\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1565222400\"\n		},\n		{\n			\"value\": \"45\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1565136000\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1565049600\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1564963200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1564876800\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1564790400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1564704000\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1564617600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1564531200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1564444800\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1564358400\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1564272000\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1564185600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1564099200\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1564012800\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1563926400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1563840000\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1563753600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1563667200\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1563580800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1563494400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1563408000\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1563321600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1563235200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1563148800\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1563062400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1562976000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1562889600\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1562803200\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1562716800\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1562630400\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1562544000\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1562457600\"\n		},\n		{\n			\"value\": \"72\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1562371200\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1562284800\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1562198400\"\n		},\n		{\n			\"value\": \"79\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1562112000\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1562025600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1561939200\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561852800\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1561766400\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1561680000\"\n		},\n		{\n			\"value\": \"92\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561593600\"\n		},\n		{\n			\"value\": \"95\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561507200\"\n		},\n		{\n			\"value\": \"87\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561420800\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561334400\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561248000\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561161600\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1561075200\"\n		},\n		{\n			\"value\": \"81\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1560988800\"\n		},\n		{\n			\"value\": \"82\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1560902400\"\n		},\n		{\n			\"value\": \"83\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1560816000\"\n		},\n		{\n			\"value\": \"84\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1560729600\"\n		},\n		{\n			\"value\": \"80\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1560643200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1560556800\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1560470400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1560384000\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1560297600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1560211200\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1560124800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1560038400\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559952000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1559865600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1559779200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1559692800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1559606400\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559520000\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559433600\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559347200\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559260800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559174400\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559088000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1559001600\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558915200\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558828800\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558742400\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558656000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558569600\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558483200\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558396800\"\n		},\n		{\n			\"value\": \"73\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558310400\"\n		},\n		{\n			\"value\": \"70\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558224000\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558137600\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1558051200\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557964800\"\n		},\n		{\n			\"value\": \"77\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1557878400\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1557792000\"\n		},\n		{\n			\"value\": \"78\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1557705600\"\n		},\n		{\n			\"value\": \"75\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557619200\"\n		},\n		{\n			\"value\": \"76\",\n			\"value_classification\": \"Extreme Greed\",\n			\"timestamp\": \"1557532800\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557446400\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557360000\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557273600\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557187200\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557100800\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1557014400\"\n		},\n		{\n			\"value\": \"66\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1556928000\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1556841600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1556755200\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1556668800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1556582400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1556496000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1556409600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1556323200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1556236800\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1556150400\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1556064000\"\n		},\n		{\n			\"value\": \"68\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555977600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555891200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555804800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555718400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555632000\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555545600\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555459200\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1555372800\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555286400\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1555200000\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1555113600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1555027200\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554940800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554854400\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554768000\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554681600\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554595200\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554508800\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554422400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554336000\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554249600\"\n		},\n		{\n			\"value\": \"60\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554163200\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1554076800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1553990400\"\n		},\n		{\n			\"value\": \"57\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1553904000\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1553817600\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1553731200\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1553644800\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1553558400\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1553472000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1553385600\"\n		},\n		{\n			\"value\": \"50\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1553299200\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1553212800\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1553126400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1553040000\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552953600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552867200\"\n		},\n		{\n			\"value\": \"58\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552780800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1552694400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552608000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552521600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1552435200\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552348800\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552262400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552176000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1552089600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1552003200\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1551916800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551830400\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551744000\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551657600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551571200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551484800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551398400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551312000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551225600\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1551139200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1551052800\"\n		},\n		{\n			\"value\": \"69\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1550966400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1550880000\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1550793600\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1550707200\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1550620800\"\n		},\n		{\n			\"value\": \"65\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1550534400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1550448000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1550361600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1550275200\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1550188800\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1550102400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1550016000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1549929600\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1549843200\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1549756800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1549670400\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1549584000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1549497600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1549411200\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1549324800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1549238400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1549152000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1549065600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1548979200\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1548892800\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1548806400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1548720000\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548633600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548547200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548460800\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548374400\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548288000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548201600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548115200\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1548028800\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1547942400\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1547856000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1547769600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1547683200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1547596800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1547510400\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1547424000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1547337600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1547251200\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1547164800\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1547078400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546992000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546905600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546819200\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546732800\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546646400\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1546560000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546473600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546387200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1546300800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1546214400\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1546128000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1546041600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1545955200\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1545868800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1545782400\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1545696000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1545609600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1545523200\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1545436800\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1545350400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1545264000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1545177600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1545091200\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1545004800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544918400\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544832000\"\n		},\n		{\n			\"value\": \"10\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544745600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544659200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544572800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544486400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544400000\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544313600\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544227200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544140800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1544054400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543968000\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543881600\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543795200\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543708800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543622400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543536000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543449600\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543363200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543276800\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543190400\"\n		},\n		{\n			\"value\": \"9\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543104000\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1543017600\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1542931200\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1542844800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1542758400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1542672000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1542585600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1542499200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1542412800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1542326400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1542240000\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1542153600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1542067200\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1541980800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1541894400\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1541808000\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1541721600\"\n		},\n		{\n			\"value\": \"51\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1541635200\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1541548800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1541462400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1541376000\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1541289600\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1541203200\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1541116800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1541030400\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1540944000\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1540857600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1540771200\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1540684800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1540598400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1540512000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1540425600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1540339200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1540252800\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1540166400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1540080000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539993600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539907200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1539820800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539734400\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539648000\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539561600\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539475200\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539388800\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539302400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1539216000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1539129600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1539043200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538956800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538870400\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538784000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538697600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538611200\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538524800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538438400\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538352000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538265600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538179200\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538092800\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1538006400\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1537920000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1537833600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1537747200\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1537660800\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1537574400\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1537488000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1537401600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1537315200\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1537228800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1537142400\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1537056000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536969600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536883200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536796800\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536710400\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536624000\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536537600\"\n		},\n		{\n			\"value\": \"13\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536451200\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536364800\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536278400\"\n		},\n		{\n			\"value\": \"14\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536192000\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1536105600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1536019200\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535932800\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535846400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535760000\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535673600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535587200\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535500800\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535414400\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535328000\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535241600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535155200\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1535068800\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534982400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534896000\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534809600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1534723200\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1534636800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534550400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534464000\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534377600\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534291200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534204800\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534118400\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1534032000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1533945600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1533859200\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1533772800\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1533686400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1533600000\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1533513600\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1533427200\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1533340800\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1533254400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1533168000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1533081600\"\n		},\n		{\n			\"value\": \"48\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532995200\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532908800\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532822400\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532736000\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532649600\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532563200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532476800\"\n		},\n		{\n			\"value\": \"49\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532390400\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1532304000\"\n		},\n		{\n			\"value\": \"46\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1532217600\"\n		},\n		{\n			\"value\": \"43\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1532131200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1532044800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531958400\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531872000\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531785600\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531699200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531612800\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531526400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531440000\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531353600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531267200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531180800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531094400\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1531008000\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1530921600\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1530835200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1530748800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1530662400\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1530576000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1530489600\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1530403200\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1530316800\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1530230400\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1530144000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1530057600\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1529971200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1529884800\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1529798400\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1529712000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1529625600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1529539200\"\n		},\n		{\n			\"value\": \"34\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1529452800\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1529366400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1529280000\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1529193600\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1529107200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1529020800\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1528934400\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1528848000\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1528761600\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1528675200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1528588800\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1528502400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1528416000\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1528329600\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1528243200\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1528156800\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1528070400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1527984000\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1527897600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1527811200\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1527724800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1527638400\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1527552000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1527465600\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1527379200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1527292800\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1527206400\"\n		},\n		{\n			\"value\": \"27\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1527120000\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1527033600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526947200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526860800\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526774400\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526688000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526601600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526515200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526428800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526342400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526256000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526169600\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1526083200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1525996800\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525910400\"\n		},\n		{\n			\"value\": \"53\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1525824000\"\n		},\n		{\n			\"value\": \"62\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525737600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525651200\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525564800\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525478400\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525392000\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525305600\"\n		},\n		{\n			\"value\": \"52\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1525219200\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525132800\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1525046400\"\n		},\n		{\n			\"value\": \"61\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1524960000\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1524873600\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1524787200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1524700800\"\n		},\n		{\n			\"value\": \"64\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1524614400\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1524528000\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1524441600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1524355200\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1524268800\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1524182400\"\n		},\n		{\n			\"value\": \"25\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1524096000\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1524009600\"\n		},\n		{\n			\"value\": \"26\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1523923200\"\n		},\n		{\n			\"value\": \"23\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1523577600\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1523491200\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1523404800\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1523318400\"\n		},\n		{\n			\"value\": \"21\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1523232000\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1523145600\"\n		},\n		{\n			\"value\": \"20\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1523059200\"\n		},\n		{\n			\"value\": \"19\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522972800\"\n		},\n		{\n			\"value\": \"17\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522886400\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522800000\"\n		},\n		{\n			\"value\": \"22\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522713600\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522627200\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522540800\"\n		},\n		{\n			\"value\": \"16\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522454400\"\n		},\n		{\n			\"value\": \"12\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522368000\"\n		},\n		{\n			\"value\": \"18\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522281600\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522195200\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1522108800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1522022400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521936000\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521849600\"\n		},\n		{\n			\"value\": \"28\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521763200\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521676800\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521590400\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521504000\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521417600\"\n		},\n		{\n			\"value\": \"29\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521331200\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521244800\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521158400\"\n		},\n		{\n			\"value\": \"32\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1521072000\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520985600\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520899200\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520812800\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520726400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520640000\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520553600\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520467200\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520380800\"\n		},\n		{\n			\"value\": \"59\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1520294400\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1520208000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1520121600\"\n		},\n		{\n			\"value\": \"56\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1520035200\"\n		},\n		{\n			\"value\": \"47\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1519948800\"\n		},\n		{\n			\"value\": \"38\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519862400\"\n		},\n		{\n			\"value\": \"41\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519776000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519689600\"\n		},\n		{\n			\"value\": \"37\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519603200\"\n		},\n		{\n			\"value\": \"33\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519516800\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519430400\"\n		},\n		{\n			\"value\": \"39\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519344000\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1519257600\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1519171200\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1519084800\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1518998400\"\n		},\n		{\n			\"value\": \"63\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1518912000\"\n		},\n		{\n			\"value\": \"74\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1518825600\"\n		},\n		{\n			\"value\": \"67\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1518739200\"\n		},\n		{\n			\"value\": \"71\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1518652800\"\n		},\n		{\n			\"value\": \"55\",\n			\"value_classification\": \"Greed\",\n			\"timestamp\": \"1518566400\"\n		},\n		{\n			\"value\": \"35\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1518480000\"\n		},\n		{\n			\"value\": \"42\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1518393600\"\n		},\n		{\n			\"value\": \"31\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1518307200\"\n		},\n		{\n			\"value\": \"54\",\n			\"value_classification\": \"Neutral\",\n			\"timestamp\": \"1518220800\"\n		},\n		{\n			\"value\": \"44\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1518134400\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1518048000\"\n		},\n		{\n			\"value\": \"36\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1517961600\"\n		},\n		{\n			\"value\": \"8\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1517875200\"\n		},\n		{\n			\"value\": \"11\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1517788800\"\n		},\n		{\n			\"value\": \"24\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1517702400\"\n		},\n		{\n			\"value\": \"40\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1517616000\"\n		},\n		{\n			\"value\": \"15\",\n			\"value_classification\": \"Extreme Fear\",\n			\"timestamp\": \"1517529600\"\n		},\n		{\n			\"value\": \"30\",\n			\"value_classification\": \"Fear\",\n			\"timestamp\": \"1517443200\"\n		}\n	],\n	\"metadata\": {\n		\"error\": null\n	}\n}"
		};
	})))();
}
function init_BitcoinPublicGauge() {
	return (init_BitcoinPublicGauge = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-reference/bitcoin-public/BitcoinPublicGauge.css?v=source-build-r294";
			document.head.appendChild(l);
		}
	})))();
}
/** Local frozen admission only. The display clock never reloads the supply. */
function BitcoinPublicGauge({ load = loadFrozenBitcoinState } = {}) {
	const [state, setState] = (0, import_react$2.useState)(empty);
	const [clock, setClock] = (0, import_react$2.useState)(() => (/* @__PURE__ */ new Date()).toISOString());
	const admitted = (0, import_react$2.useRef)(state);
	(0, import_react$2.useEffect)(() => {
		let active = true;
		const previous = admitted.current;
		const commit = (candidate) => {
			if (!active) return;
			const next = candidate.error ? {
				release: previous.release,
				error: candidate.error
			} : candidate;
			admitted.current = next;
			setState(next);
		};
		(async () => {
			try {
				const candidate = await load(previous);
				commit(candidate);
			} catch (error) {
				commit({
					release: previous.release,
					error: error instanceof Error ? error.message : "bitcoin-supply-failed"
				});
			}
		})();
		return () => {
			active = false;
		};
	}, [load]);
	(0, import_react$2.useEffect)(() => {
		const timer = globalThis.setInterval(() => setClock((/* @__PURE__ */ new Date()).toISOString()), 6e4);
		return () => globalThis.clearInterval(timer);
	}, []);
	const p = bitcoinProps(state, clock);
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "public-market-gauge bitcoin-public-gauge",
		"data-has-quote": !!p.quote,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("header", {
				className: "public-reference-heading-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", { children: p.title }),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
						className: "bitcoin-public-attribution",
						href: p.attribution.href,
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Alternative.me"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(WidgetMetricHelp, {
						floating: true,
						compact: true,
						label: p.title,
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MarketMetricNote, {
							meaning: "비트코인 시장의 공포와 탐욕을 0~100으로 나타내는 지표입니다.",
							observedAt: p.receivedAt,
							source: p.attribution.href
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "bitcoin-public-reading",
				"data-source-asof": p.quote?.asOf,
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(SentimentDial, {
					value: p.quote?.value ?? null,
					label: p.title
				})
			}),
			p.quote && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
				className: "bitcoin-public-classification",
				children: FEAR_LABELS$1[p.quote.classification]
			}),
			!p.quote && !p.error && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
				role: "status",
				children: "고정 자료 확인 중 · 수치 미확인"
			}),
			p.error && /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("p", {
				role: "alert",
				children: [
					"공급 확인 실패 · ",
					p.error,
					p.quote ? " · 이전 성공 고정본 유지" : ""
				]
			})
		]
	});
}
var import_react$2, import_jsx_runtime$4, empty;
function init_BitcoinPublicGauge$1() {
	return (init_BitcoinPublicGauge$1 = __esmMin((() => {
		import_react$2 = require_react();
		init_SentimentDial();
		init_fearGreed();
		init_WidgetMetricHelp();
		init_adapter();
		init_frozen();
		init_BitcoinPublicGauge();
		init_MarketMetricNote();
		import_jsx_runtime$4 = require_jsx_runtime();
		empty = {
			release: null,
			error: null
		};
	})))();
}
/** These three overview indicators always stay above the selected market tab. */
function MarketOverview(_props = {}) {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("section", {
		className: "public-market-overview",
		"aria-label": "시장 심리 요약",
		children: [[{
			id: "cnn",
			label: "CNN 공포·탐욕",
			source: "https://www.cnn.com/markets/fear-and-greed",
			meaning: "주가·거래량 등 7개 지표로 미국 주식시장의 투자심리를 나타냅니다."
		}, {
			id: "vix",
			label: "VIX",
			source: "https://www.cboe.com/tradable_products/vix/vix_historical_data/",
			meaning: "S&P 500 옵션 가격에 반영된 향후 30일 예상 변동성입니다."
		}].map((metric) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "public-market-gauge",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("header", {
					className: "public-reference-heading-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h2", { children: metric.label }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(WidgetMetricHelp, {
						floating: true,
						compact: true,
						label: metric.label,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(MarketMetricNote, {
							meaning: metric.meaning,
							source: metric.source
						})
					})]
				}),
				metric.id === "vix" ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(VolatilityDial, {
					value: null,
					label: metric.label
				}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SentimentDial, {
					value: null,
					label: metric.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
					className: "public-market-status",
					children: "미연결"
				})
			]
		}, metric.id)), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(BitcoinPublicGauge, {})]
	});
}
var import_jsx_runtime$3;
function init_MarketOverview() {
	return (init_MarketOverview = __esmMin((() => {
		init_SentimentDial();
		init_WidgetMetricHelp();
		init_MarketMetricNote();
		init_BitcoinPublicGauge$1();
		import_jsx_runtime$3 = require_jsx_runtime();
	})))();
}
function browserStorage() {
	try {
		return typeof localStorage === "undefined" ? void 0 : localStorage;
	} catch {
		return;
	}
}
/** Read only. Inherit an existing asset preference until explicitly changed here. */
function readTreasuryRefreshMode(storage = browserStorage()) {
	try {
		const raw = storage?.getItem("stockpin:treasury-refresh-minutes") ?? storage?.getItem("stockpin:asset-refresh-minutes") ?? null, n = readRefreshMinutes(raw);
		return n === 0 ? "off" : n === 3 ? "3" : "5";
	} catch {
		return "5";
	}
}
/** Never overwrite the asset preference; acknowledge only the exact read-back. */
function saveTreasuryRefreshMode(mode, storage = browserStorage()) {
	if (![
		"off",
		"3",
		"5"
	].includes(mode) || !storage) return false;
	try {
		storage.setItem(TREASURY_REFRESH_KEY, mode);
		return storage.getItem(TREASURY_REFRESH_KEY) === mode;
	} catch {
		return false;
	}
}
var TREASURY_REFRESH_KEY;
function init_refreshPreferences() {
	return (init_refreshPreferences = __esmMin((() => {
		TREASURY_REFRESH_KEY = "stockpin:treasury-refresh-minutes";
	})))();
}
var curve_release_default;
function init_curve_release() {
	return (init_curve_release = __esmMin((() => {
		curve_release_default = {
			schema: "stockpin.treasury.nominal-curve.v1",
			unit: "percent-per-annum",
			license: "http://creativecommons.org/publicdomain/zero/1.0/",
			rightsSource: "https://catalog.data.gov/dataset/interest-rate-statistics-daily-treasury-yield-curve-rates",
			range: {
				"from": "2026-08-16",
				"through": "2026-11-13"
			},
			months: [
				{
					"title": "DailyTreasuryYieldCurveRateData",
					"sourceUpdatedAt": "2026-11-15T01:02:18Z",
					"rowCount": 21,
					"raw": {
						"name": "202608",
						"url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202608",
						"finalUrl": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202608",
						"status": 200,
						"bytes": 33118,
						"sha256": "d7c1031ab47e78d0771dd6f4e2a2feb39c540335920633317b2ae653b0d2e805",
						"startedAt": "2026-11-15T14:15:31.118Z",
						"observedAt": "2026-11-15T14:15:32.104Z",
						"httpDate": "Sun, 15 Nov 2026 14:15:32 GMT",
						"contentType": "text/xml; charset=UTF-8",
						"file": "202608.raw"
					},
					"rows": [
						{
							"date": "2026-08-03",
							"values": {
								"BC_1YEAR": "4.07",
								"BC_3YEAR": "4.32",
								"BC_5YEAR": "4.40",
								"BC_10YEAR": "4.70",
								"BC_30YEAR": "5.23"
							}
						},
						{
							"date": "2026-08-04",
							"values": {
								"BC_1YEAR": "4.04",
								"BC_3YEAR": "4.25",
								"BC_5YEAR": "4.33",
								"BC_10YEAR": "4.63",
								"BC_30YEAR": "5.18"
							}
						},
						{
							"date": "2026-08-05",
							"values": {
								"BC_1YEAR": "4.03",
								"BC_3YEAR": "4.24",
								"BC_5YEAR": "4.33",
								"BC_10YEAR": "4.63",
								"BC_30YEAR": "5.17"
							}
						},
						{
							"date": "2026-08-06",
							"values": {
								"BC_1YEAR": "4.06",
								"BC_3YEAR": "4.31",
								"BC_5YEAR": "4.40",
								"BC_10YEAR": "4.69",
								"BC_30YEAR": "5.22"
							}
						},
						{
							"date": "2026-08-07",
							"values": {
								"BC_1YEAR": "4.01",
								"BC_3YEAR": "4.25",
								"BC_5YEAR": "4.35",
								"BC_10YEAR": "4.65",
								"BC_30YEAR": "5.19"
							}
						},
						{
							"date": "2026-08-10",
							"values": {
								"BC_1YEAR": "4.04",
								"BC_3YEAR": "4.31",
								"BC_5YEAR": "4.41",
								"BC_10YEAR": "4.72",
								"BC_30YEAR": "5.25"
							}
						},
						{
							"date": "2026-08-11",
							"values": {
								"BC_1YEAR": "4.03",
								"BC_3YEAR": "4.27",
								"BC_5YEAR": "4.39",
								"BC_10YEAR": "4.70",
								"BC_30YEAR": "5.24"
							}
						},
						{
							"date": "2026-08-12",
							"values": {
								"BC_1YEAR": "4.00",
								"BC_3YEAR": "4.25",
								"BC_5YEAR": "4.38",
								"BC_10YEAR": "4.68",
								"BC_30YEAR": "5.24"
							}
						},
						{
							"date": "2026-08-13",
							"values": {
								"BC_1YEAR": "3.97",
								"BC_3YEAR": "4.20",
								"BC_5YEAR": "4.32",
								"BC_10YEAR": "4.63",
								"BC_30YEAR": "5.21"
							}
						},
						{
							"date": "2026-08-14",
							"values": {
								"BC_1YEAR": "3.98",
								"BC_3YEAR": "4.24",
								"BC_5YEAR": "4.36",
								"BC_10YEAR": "4.68",
								"BC_30YEAR": "5.25"
							}
						},
						{
							"date": "2026-08-17",
							"values": {
								"BC_1YEAR": "4.00",
								"BC_3YEAR": "4.25",
								"BC_5YEAR": "4.38",
								"BC_10YEAR": "4.72",
								"BC_30YEAR": "5.31"
							}
						},
						{
							"date": "2026-08-18",
							"values": {
								"BC_1YEAR": "3.99",
								"BC_3YEAR": "4.26",
								"BC_5YEAR": "4.37",
								"BC_10YEAR": "4.71",
								"BC_30YEAR": "5.28"
							}
						},
						{
							"date": "2026-08-19",
							"values": {
								"BC_1YEAR": "4.00",
								"BC_3YEAR": "4.25",
								"BC_5YEAR": "4.35",
								"BC_10YEAR": "4.65",
								"BC_30YEAR": "5.19"
							}
						},
						{
							"date": "2026-08-20",
							"values": {
								"BC_1YEAR": "3.99",
								"BC_3YEAR": "4.26",
								"BC_5YEAR": "4.39",
								"BC_10YEAR": "4.69",
								"BC_30YEAR": "5.23"
							}
						},
						{
							"date": "2026-08-21",
							"values": {
								"BC_1YEAR": "4.03",
								"BC_3YEAR": "4.31",
								"BC_5YEAR": "4.43",
								"BC_10YEAR": "4.74",
								"BC_30YEAR": "5.27"
							}
						},
						{
							"date": "2026-08-24",
							"values": {
								"BC_1YEAR": "4.04",
								"BC_3YEAR": "4.31",
								"BC_5YEAR": "4.41",
								"BC_10YEAR": "4.70",
								"BC_30YEAR": "5.23"
							}
						},
						{
							"date": "2026-08-25",
							"values": {
								"BC_1YEAR": "4.01",
								"BC_3YEAR": "4.25",
								"BC_5YEAR": "4.35",
								"BC_10YEAR": "4.64",
								"BC_30YEAR": "5.17"
							}
						},
						{
							"date": "2026-08-26",
							"values": {
								"BC_1YEAR": "4.02",
								"BC_3YEAR": "4.29",
								"BC_5YEAR": "4.37",
								"BC_10YEAR": "4.66",
								"BC_30YEAR": "5.18"
							}
						},
						{
							"date": "2026-08-27",
							"values": {
								"BC_1YEAR": "4.04",
								"BC_3YEAR": "4.30",
								"BC_5YEAR": "4.38",
								"BC_10YEAR": "4.67",
								"BC_30YEAR": "5.19"
							}
						},
						{
							"date": "2026-08-28",
							"values": {
								"BC_1YEAR": "4.15",
								"BC_3YEAR": "4.41",
								"BC_5YEAR": "4.48",
								"BC_10YEAR": "4.73",
								"BC_30YEAR": "5.22"
							}
						},
						{
							"date": "2026-08-31",
							"values": {
								"BC_1YEAR": "4.16",
								"BC_3YEAR": "4.40",
								"BC_5YEAR": "4.49",
								"BC_10YEAR": "4.75",
								"BC_30YEAR": "5.25"
							}
						}
					]
				},
				{
					"title": "DailyTreasuryYieldCurveRateData",
					"sourceUpdatedAt": "2026-11-15T01:02:19Z",
					"rowCount": 21,
					"raw": {
						"name": "202609",
						"url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202609",
						"finalUrl": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202609",
						"status": 200,
						"bytes": 33118,
						"sha256": "62fb673bcb0deac35e6cafae29e6cf966f470566b6e15feb7e9a3197964ba90e",
						"startedAt": "2026-11-15T14:15:32.108Z",
						"observedAt": "2026-11-15T14:15:33.435Z",
						"httpDate": "Sun, 15 Nov 2026 14:15:33 GMT",
						"contentType": "text/xml; charset=UTF-8",
						"file": "202609.raw"
					},
					"rows": [
						{
							"date": "2026-09-01",
							"values": {
								"BC_1YEAR": "4.18",
								"BC_3YEAR": "4.46",
								"BC_5YEAR": "4.55",
								"BC_10YEAR": "4.79",
								"BC_30YEAR": "5.27"
							}
						},
						{
							"date": "2026-09-02",
							"values": {
								"BC_1YEAR": "4.16",
								"BC_3YEAR": "4.45",
								"BC_5YEAR": "4.54",
								"BC_10YEAR": "4.79",
								"BC_30YEAR": "5.27"
							}
						},
						{
							"date": "2026-09-03",
							"values": {
								"BC_1YEAR": "4.11",
								"BC_3YEAR": "4.41",
								"BC_5YEAR": "4.52",
								"BC_10YEAR": "4.77",
								"BC_30YEAR": "5.25"
							}
						},
						{
							"date": "2026-09-04",
							"values": {
								"BC_1YEAR": "4.13",
								"BC_3YEAR": "4.45",
								"BC_5YEAR": "4.54",
								"BC_10YEAR": "4.78",
								"BC_30YEAR": "5.24"
							}
						},
						{
							"date": "2026-09-08",
							"values": {
								"BC_1YEAR": "4.15",
								"BC_3YEAR": "4.44",
								"BC_5YEAR": "4.57",
								"BC_10YEAR": "4.80",
								"BC_30YEAR": "5.25"
							}
						},
						{
							"date": "2026-09-09",
							"values": {
								"BC_1YEAR": "4.17",
								"BC_3YEAR": "4.49",
								"BC_5YEAR": "4.61",
								"BC_10YEAR": "4.83",
								"BC_30YEAR": "5.28"
							}
						},
						{
							"date": "2026-09-10",
							"values": {
								"BC_1YEAR": "4.28",
								"BC_3YEAR": "4.63",
								"BC_5YEAR": "4.75",
								"BC_10YEAR": "4.95",
								"BC_30YEAR": "5.37"
							}
						},
						{
							"date": "2026-09-11",
							"values": {
								"BC_1YEAR": "4.35",
								"BC_3YEAR": "4.69",
								"BC_5YEAR": "4.78",
								"BC_10YEAR": "4.96",
								"BC_30YEAR": "5.35"
							}
						},
						{
							"date": "2026-09-14",
							"values": {
								"BC_1YEAR": "4.37",
								"BC_3YEAR": "4.73",
								"BC_5YEAR": "4.80",
								"BC_10YEAR": "4.97",
								"BC_30YEAR": "5.34"
							}
						},
						{
							"date": "2026-09-15",
							"values": {
								"BC_1YEAR": "4.39",
								"BC_3YEAR": "4.76",
								"BC_5YEAR": "4.83",
								"BC_10YEAR": "5.00",
								"BC_30YEAR": "5.36"
							}
						},
						{
							"date": "2026-09-16",
							"values": {
								"BC_1YEAR": "4.45",
								"BC_3YEAR": "4.82",
								"BC_5YEAR": "4.86",
								"BC_10YEAR": "5.01",
								"BC_30YEAR": "5.35"
							}
						},
						{
							"date": "2026-09-17",
							"values": {
								"BC_1YEAR": "4.40",
								"BC_3YEAR": "4.75",
								"BC_5YEAR": "4.78",
								"BC_10YEAR": "4.94",
								"BC_30YEAR": "5.29"
							}
						},
						{
							"date": "2026-09-18",
							"values": {
								"BC_1YEAR": "4.44",
								"BC_3YEAR": "4.83",
								"BC_5YEAR": "4.86",
								"BC_10YEAR": "5.01",
								"BC_30YEAR": "5.34"
							}
						},
						{
							"date": "2026-09-21",
							"values": {
								"BC_1YEAR": "4.45",
								"BC_3YEAR": "4.82",
								"BC_5YEAR": "4.83",
								"BC_10YEAR": "4.96",
								"BC_30YEAR": "5.29"
							}
						},
						{
							"date": "2026-09-22",
							"values": {
								"BC_1YEAR": "4.43",
								"BC_3YEAR": "4.81",
								"BC_5YEAR": "4.83",
								"BC_10YEAR": "4.96",
								"BC_30YEAR": "5.29"
							}
						},
						{
							"date": "2026-09-23",
							"values": {
								"BC_1YEAR": "4.49",
								"BC_3YEAR": "4.97",
								"BC_5YEAR": "4.99",
								"BC_10YEAR": "5.11",
								"BC_30YEAR": "5.40"
							}
						},
						{
							"date": "2026-09-24",
							"values": {
								"BC_1YEAR": "4.51",
								"BC_3YEAR": "4.99",
								"BC_5YEAR": "5.03",
								"BC_10YEAR": "5.18",
								"BC_30YEAR": "5.47"
							}
						},
						{
							"date": "2026-09-25",
							"values": {
								"BC_1YEAR": "4.50",
								"BC_3YEAR": "4.94",
								"BC_5YEAR": "4.98",
								"BC_10YEAR": "5.17",
								"BC_30YEAR": "5.49"
							}
						},
						{
							"date": "2026-09-28",
							"values": {
								"BC_1YEAR": "4.59",
								"BC_3YEAR": "5.01",
								"BC_5YEAR": "5.06",
								"BC_10YEAR": "5.24",
								"BC_30YEAR": "5.56"
							}
						},
						{
							"date": "2026-09-29",
							"values": {
								"BC_1YEAR": "4.58",
								"BC_3YEAR": "4.98",
								"BC_5YEAR": "5.06",
								"BC_10YEAR": "5.26",
								"BC_30YEAR": "5.59"
							}
						},
						{
							"date": "2026-09-30",
							"values": {
								"BC_1YEAR": "4.54",
								"BC_3YEAR": "5.00",
								"BC_5YEAR": "5.09",
								"BC_10YEAR": "5.29",
								"BC_30YEAR": "5.64"
							}
						}
					]
				},
				{
					"title": "DailyTreasuryYieldCurveRateData",
					"sourceUpdatedAt": "2026-11-15T01:02:08Z",
					"rowCount": 21,
					"raw": {
						"name": "202610",
						"url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202610",
						"finalUrl": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202610",
						"status": 200,
						"bytes": 33118,
						"sha256": "7093adad69ca8545e3a75d9458b5006d50e257de1b6c861b090d1171a16f3842",
						"startedAt": "2026-11-15T14:15:33.437Z",
						"observedAt": "2026-11-15T14:15:34.316Z",
						"httpDate": "Sun, 15 Nov 2026 14:15:34 GMT",
						"contentType": "text/xml; charset=UTF-8",
						"file": "202610.raw"
					},
					"rows": [
						{
							"date": "2026-10-01",
							"values": {
								"BC_1YEAR": "4.44",
								"BC_3YEAR": "4.91",
								"BC_5YEAR": "5.01",
								"BC_10YEAR": "5.24",
								"BC_30YEAR": "5.61"
							}
						},
						{
							"date": "2026-10-02",
							"values": {
								"BC_1YEAR": "4.46",
								"BC_3YEAR": "4.96",
								"BC_5YEAR": "5.06",
								"BC_10YEAR": "5.28",
								"BC_30YEAR": "5.63"
							}
						},
						{
							"date": "2026-10-05",
							"values": {
								"BC_1YEAR": "4.47",
								"BC_3YEAR": "4.97",
								"BC_5YEAR": "5.06",
								"BC_10YEAR": "5.31",
								"BC_30YEAR": "5.66"
							}
						},
						{
							"date": "2026-10-06",
							"values": {
								"BC_1YEAR": "4.46",
								"BC_3YEAR": "4.88",
								"BC_5YEAR": "5.03",
								"BC_10YEAR": "5.27",
								"BC_30YEAR": "5.64"
							}
						},
						{
							"date": "2026-10-07",
							"values": {
								"BC_1YEAR": "4.42",
								"BC_3YEAR": "4.87",
								"BC_5YEAR": "5.03",
								"BC_10YEAR": "5.28",
								"BC_30YEAR": "5.67"
							}
						},
						{
							"date": "2026-10-08",
							"values": {
								"BC_1YEAR": "4.44",
								"BC_3YEAR": "4.85",
								"BC_5YEAR": "4.99",
								"BC_10YEAR": "5.22",
								"BC_30YEAR": "5.60"
							}
						},
						{
							"date": "2026-10-09",
							"values": {
								"BC_1YEAR": "4.47",
								"BC_3YEAR": "4.89",
								"BC_5YEAR": "5.02",
								"BC_10YEAR": "5.24",
								"BC_30YEAR": "5.60"
							}
						},
						{
							"date": "2026-10-13",
							"values": {
								"BC_1YEAR": "4.48",
								"BC_3YEAR": "4.90",
								"BC_5YEAR": "5.00",
								"BC_10YEAR": "5.21",
								"BC_30YEAR": "5.56"
							}
						},
						{
							"date": "2026-10-14",
							"values": {
								"BC_1YEAR": "4.53",
								"BC_3YEAR": "4.92",
								"BC_5YEAR": "5.00",
								"BC_10YEAR": "5.19",
								"BC_30YEAR": "5.52"
							}
						},
						{
							"date": "2026-10-15",
							"values": {
								"BC_1YEAR": "4.49",
								"BC_3YEAR": "4.85",
								"BC_5YEAR": "4.91",
								"BC_10YEAR": "5.10",
								"BC_30YEAR": "5.43"
							}
						},
						{
							"date": "2026-10-16",
							"values": {
								"BC_1YEAR": "4.46",
								"BC_3YEAR": "4.82",
								"BC_5YEAR": "4.89",
								"BC_10YEAR": "5.09",
								"BC_30YEAR": "5.43"
							}
						},
						{
							"date": "2026-10-19",
							"values": {
								"BC_1YEAR": "4.50",
								"BC_3YEAR": "4.85",
								"BC_5YEAR": "4.94",
								"BC_10YEAR": "5.15",
								"BC_30YEAR": "5.48"
							}
						},
						{
							"date": "2026-10-20",
							"values": {
								"BC_1YEAR": "4.51",
								"BC_3YEAR": "4.86",
								"BC_5YEAR": "4.94",
								"BC_10YEAR": "5.12",
								"BC_30YEAR": "5.42"
							}
						},
						{
							"date": "2026-10-21",
							"values": {
								"BC_1YEAR": "4.52",
								"BC_3YEAR": "4.89",
								"BC_5YEAR": "4.95",
								"BC_10YEAR": "5.13",
								"BC_30YEAR": "5.42"
							}
						},
						{
							"date": "2026-10-22",
							"values": {
								"BC_1YEAR": "4.41",
								"BC_3YEAR": "4.72",
								"BC_5YEAR": "4.78",
								"BC_10YEAR": "4.96",
								"BC_30YEAR": "5.29"
							}
						},
						{
							"date": "2026-10-23",
							"values": {
								"BC_1YEAR": "4.44",
								"BC_3YEAR": "4.75",
								"BC_5YEAR": "4.82",
								"BC_10YEAR": "5.00",
								"BC_30YEAR": "5.33"
							}
						},
						{
							"date": "2026-10-26",
							"values": {
								"BC_1YEAR": "4.47",
								"BC_3YEAR": "4.79",
								"BC_5YEAR": "4.84",
								"BC_10YEAR": "5.00",
								"BC_30YEAR": "5.31"
							}
						},
						{
							"date": "2026-10-27",
							"values": {
								"BC_1YEAR": "4.50",
								"BC_3YEAR": "4.80",
								"BC_5YEAR": "4.82",
								"BC_10YEAR": "4.99",
								"BC_30YEAR": "5.30"
							}
						},
						{
							"date": "2026-10-28",
							"values": {
								"BC_1YEAR": "4.47",
								"BC_3YEAR": "4.80",
								"BC_5YEAR": "4.85",
								"BC_10YEAR": "5.05",
								"BC_30YEAR": "5.37"
							}
						},
						{
							"date": "2026-10-29",
							"values": {
								"BC_1YEAR": "4.42",
								"BC_3YEAR": "4.73",
								"BC_5YEAR": "4.78",
								"BC_10YEAR": "4.98",
								"BC_30YEAR": "5.32"
							}
						},
						{
							"date": "2026-10-30",
							"values": {
								"BC_1YEAR": "4.36",
								"BC_3YEAR": "4.65",
								"BC_5YEAR": "4.71",
								"BC_10YEAR": "4.94",
								"BC_30YEAR": "5.31"
							}
						}
					]
				},
				{
					"title": "DailyTreasuryYieldCurveRateData",
					"sourceUpdatedAt": "2026-11-15T01:02:07Z",
					"rowCount": 9,
					"raw": {
						"name": "202611",
						"url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202611",
						"finalUrl": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=202611",
						"status": 200,
						"bytes": 14578,
						"sha256": "17425fadde4b5da77dfeb1abd9ad90beaba4ecfab6368ab1291ea4c5bf50d83b",
						"startedAt": "2026-11-15T14:15:34.317Z",
						"observedAt": "2026-11-15T14:15:34.798Z",
						"httpDate": "Sun, 15 Nov 2026 14:15:34 GMT",
						"contentType": "text/xml; charset=UTF-8",
						"file": "202611.raw"
					},
					"rows": [
						{
							"date": "2026-11-02",
							"values": {
								"BC_1YEAR": "4.38",
								"BC_3YEAR": "4.65",
								"BC_5YEAR": "4.70",
								"BC_10YEAR": "4.91",
								"BC_30YEAR": "5.28"
							}
						},
						{
							"date": "2026-11-03",
							"values": {
								"BC_1YEAR": "4.40",
								"BC_3YEAR": "4.68",
								"BC_5YEAR": "4.74",
								"BC_10YEAR": "4.95",
								"BC_30YEAR": "5.32"
							}
						},
						{
							"date": "2026-11-04",
							"values": {
								"BC_1YEAR": "4.39",
								"BC_3YEAR": "4.64",
								"BC_5YEAR": "4.69",
								"BC_10YEAR": "4.90",
								"BC_30YEAR": "5.28"
							}
						},
						{
							"date": "2026-11-05",
							"values": {
								"BC_1YEAR": "4.28",
								"BC_3YEAR": "4.53",
								"BC_5YEAR": "4.59",
								"BC_10YEAR": "4.84",
								"BC_30YEAR": "5.25"
							}
						},
						{
							"date": "2026-11-06",
							"values": {
								"BC_1YEAR": "4.33",
								"BC_3YEAR": "4.59",
								"BC_5YEAR": "4.64",
								"BC_10YEAR": "4.86",
								"BC_30YEAR": "5.26"
							}
						},
						{
							"date": "2026-11-09",
							"values": {
								"BC_1YEAR": "4.38",
								"BC_3YEAR": "4.58",
								"BC_5YEAR": "4.67",
								"BC_10YEAR": "4.88",
								"BC_30YEAR": "5.26"
							}
						},
						{
							"date": "2026-11-10",
							"values": {
								"BC_1YEAR": "4.56",
								"BC_3YEAR": "4.74",
								"BC_5YEAR": "4.81",
								"BC_10YEAR": "4.98",
								"BC_30YEAR": "5.35"
							}
						},
						{
							"date": "2026-11-12",
							"values": {
								"BC_1YEAR": "4.65",
								"BC_3YEAR": "4.90",
								"BC_5YEAR": "4.95",
								"BC_10YEAR": "5.10",
								"BC_30YEAR": "5.43"
							}
						},
						{
							"date": "2026-11-13",
							"values": {
								"BC_1YEAR": "4.65",
								"BC_3YEAR": "4.92",
								"BC_5YEAR": "4.98",
								"BC_10YEAR": "5.15",
								"BC_30YEAR": "5.47"
							}
						}
					]
				}
			]
		};
	})))();
}
function valid(ok) {
	if (!ok) throw new Error("Invalid Treasury curve snapshot");
}
function copyWire(input) {
	let nodes = 0;
	const seen = /* @__PURE__ */ new Set();
	function copy(v, depth) {
		valid(++nodes <= 4096 && depth <= 8);
		if (v === null || typeof v === "boolean") return v;
		if (typeof v === "string") {
			valid(v.length <= 2048);
			return v;
		}
		if (typeof v === "number") {
			valid(Number.isFinite(v));
			return v;
		}
		valid(typeof v === "object" && v !== null && !seen.has(v));
		const array = Array.isArray(v);
		valid(Object.getPrototypeOf(v) === (array ? Array.prototype : Object.prototype));
		const keys = Reflect.ownKeys(v);
		valid(keys.length <= 128);
		seen.add(v);
		const out = array ? [] : {};
		if (array) {
			const length = Object.getOwnPropertyDescriptor(v, "length");
			valid(length && "value" in length && Number.isSafeInteger(length.value) && length.value <= 124);
			valid(keys.length === length.value + 1);
			for (let i = 0; i < length.value; i++) valid(Object.hasOwn(v, String(i)));
		}
		for (const key of keys) {
			valid(typeof key === "string");
			if (array && key === "length") continue;
			valid(key !== "__proto__" && key !== "constructor" && key !== "prototype");
			const descriptor = Object.getOwnPropertyDescriptor(v, key);
			valid(descriptor && "value" in descriptor && descriptor.enumerable);
			Object.defineProperty(out, key, {
				value: copy(descriptor.value, depth + 1),
				enumerable: true,
				writable: true,
				configurable: true
			});
		}
		seen.delete(v);
		return out;
	}
	return copy(input, 0);
}
function keys(v, expected) {
	valid(v && typeof v === "object" && !Array.isArray(v));
	valid(Object.keys(v).length === expected.length && expected.every((k) => Object.hasOwn(v, k)));
}
function day$1(v) {
	valid(typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v));
	valid(Number.isFinite(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v);
}
function stamp(v) {
	valid(typeof v === "string" && /^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|\+00:00)$/.test(v));
	day$1(v.slice(0, 10));
	valid(Number.isFinite(Date.parse(v)));
	return Date.parse(v);
}
/** Validates metadata, not the claimed bytes/hash against an absent XML body. */
function decodeTreasuryCurve(input, now) {
	const r = copyWire(input);
	const nowMs = stamp(now);
	keys(r, [
		"schema",
		"unit",
		"license",
		"rightsSource",
		"range",
		"months"
	]);
	valid(r.schema === "stockpin.treasury.nominal-curve.v1" && r.unit === "percent-per-annum");
	valid(r.license === "http://creativecommons.org/publicdomain/zero/1.0/" && r.rightsSource === "https://catalog.data.gov/dataset/interest-rate-statistics-daily-treasury-yield-curve-rates");
	keys(r.range, ["from", "through"]);
	day$1(r.range.from);
	day$1(r.range.through);
	valid(r.range.from <= r.range.through && Date.parse(r.range.through) <= nowMs && Date.parse(r.range.through) - Date.parse(r.range.from) < 7776e6);
	valid(Array.isArray(r.months) && r.months.length > 0 && r.months.length <= 4);
	const expected = /* @__PURE__ */ new Set();
	for (let d = Date.parse(r.range.from); d <= Date.parse(r.range.through); d += 864e5) expected.add(new Date(d).toISOString().slice(0, 7).replace("-", ""));
	valid(expected.size === r.months.length);
	let previous = "";
	let previousMonth = "";
	let inRange = false;
	for (const m of r.months) {
		keys(m, [
			"title",
			"sourceUpdatedAt",
			"rowCount",
			"raw",
			"rows"
		]);
		valid(m.title === "DailyTreasuryYieldCurveRateData");
		const raw = m.raw;
		keys(raw, [
			"name",
			"url",
			"finalUrl",
			"status",
			"bytes",
			"sha256",
			"observedAt",
			"startedAt",
			"httpDate",
			"contentType",
			"file"
		]);
		valid(typeof raw.name === "string" && /^\d{6}$/.test(raw.name) && raw.name > previousMonth && expected.delete(raw.name));
		previousMonth = raw.name;
		const url = `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value_month=${raw.name}`;
		valid(raw.url === url && raw.finalUrl === url && raw.status === 200 && raw.contentType === "text/xml; charset=UTF-8");
		valid(typeof raw.sha256 === "string" && /^[a-f0-9]{64}$/.test(raw.sha256) && Number.isSafeInteger(raw.bytes) && raw.bytes > 0);
		valid(typeof raw.file === "string" && raw.file.length > 0);
		const observed = stamp(raw.observedAt);
		valid(stamp(raw.startedAt) <= observed && observed <= nowMs && stamp(m.sourceUpdatedAt) <= observed);
		valid(typeof raw.httpDate === "string" && Number.isFinite(Date.parse(raw.httpDate)) && new Date(raw.httpDate).toUTCString() === raw.httpDate && Date.parse(raw.httpDate) - observed < 1e3);
		valid(Array.isArray(m.rows) && Number.isInteger(m.rowCount) && m.rowCount > 0 && m.rowCount <= 31 && m.rows.length === m.rowCount);
		for (const row of m.rows) {
			keys(row, ["date", "values"]);
			day$1(row.date);
			valid(row.date > previous && row.date.slice(0, 7).replace("-", "") === raw.name && Date.parse(row.date) <= observed);
			keys(row.values, TREASURY_CURVE_IDS);
			for (const id of TREASURY_CURVE_IDS) {
				const v = row.values[id];
				valid(v === null || typeof v === "string" && v.length <= 128 && /^-?\d+\.\d+$/.test(v));
			}
			previous = row.date;
			if (row.date >= r.range.from && row.date <= r.range.through) inRange = true;
		}
	}
	valid(expected.size === 0 && inRange);
	return r;
}
function difference(current, previous) {
	const scale = Math.max(current.split(".")[1].length, previous.split(".")[1].length);
	const integer = (s) => {
		const [whole, fraction] = s.split(".");
		return BigInt(whole + fraction.padEnd(scale, "0"));
	};
	const delta = integer(current) - integer(previous);
	const direction = delta > 0n ? "up" : delta < 0n ? "down" : "flat";
	const digits = (delta < 0n ? -delta : delta).toString().padStart(scale + 1, "0");
	const fraction = digits.slice(-scale).replace(/0+$/, "");
	const text = digits.slice(0, -scale) + (fraction ? `.${fraction}` : "");
	return {
		direction,
		changeText: `${delta > 0n ? "+" : delta < 0n ? "-" : ""}${text}%p`
	};
}
/** Pure projection of an admitted snapshot. Numeric chart approximation belongs to the UI. */
function projectTreasuryCurve(decoded) {
	const all = decoded.months.flatMap((m) => m.rows);
	const points = all.filter((row) => row.date >= decoded.range.from && row.date <= decoded.range.through);
	const latest = points.at(-1);
	const predecessor = all[all.indexOf(latest) - 1];
	const latestStamp = (values) => values.reduce((a, b) => stamp(a) >= stamp(b) ? a : b);
	return {
		asOf: latest.date,
		observedAt: latestStamp(decoded.months.map((m) => m.raw.observedAt)),
		sourceUpdatedAt: latestStamp(decoded.months.map((m) => m.sourceUpdatedAt)),
		range: { ...decoded.range },
		sources: decoded.months.map((m) => ({ ...m.raw })),
		rows: TREASURY_CURVE_IDS.map((id) => {
			const rawValue = latest.values[id];
			const before = predecessor?.values[id];
			const comparable = rawValue !== null && before !== null && before !== void 0;
			const change = comparable ? difference(rawValue, before) : {
				changeText: "등락 미확인",
				direction: "unknown"
			};
			return {
				id,
				label: `미국 국채 ${id.slice(3, -4)}년`,
				valueText: rawValue === null ? "자료 없음" : `${rawValue}%`,
				rawValue,
				...change,
				comparisonDate: comparable ? predecessor.date : null,
				points: points.map((row) => ({
					date: row.date,
					value: row.values[id]
				}))
			};
		})
	};
}
var TREASURY_CURVE_IDS;
function init_curve() {
	return (init_curve = __esmMin((() => {
		TREASURY_CURVE_IDS = [
			"BC_1YEAR",
			"BC_3YEAR",
			"BC_5YEAR",
			"BC_10YEAR",
			"BC_30YEAR"
		];
	})))();
}
function init_treasury_curve() {
	return (init_treasury_curve = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-treasury/treasury-curve.css?v=source-build-r294";
			document.head.appendChild(l);
		}
	})))();
}
function miniSegments(points) {
	const numeric = points.flatMap((p) => p.value === null ? [] : [Number(p.value)]);
	if (!numeric.length) return [];
	const lo = Math.min(...numeric), hi = Math.max(...numeric), start = Date.parse(points[0].date), end = Date.parse(points.at(-1).date);
	const segments = [];
	let previous = false;
	for (const p of points) {
		if (p.value === null) {
			previous = false;
			continue;
		}
		if (!previous) segments.push([]);
		segments.at(-1).push({
			x: 4 + (end === start ? .5 : (Date.parse(p.date) - start) / (end - start)) * 88,
			y: 4 + (hi === lo ? .5 : (hi - Number(p.value)) / (hi - lo)) * 24
		});
		previous = true;
	}
	return segments;
}
/** Public, credential-free captured observations; rendering performs no fetch. */
function PublicTreasuryCurve({ snapshot = curve_release_default, actions, supply, active = true, interest, onlyInterest = false } = {}) {
	if (onlyInterest && !TREASURY_INTEREST_IDS.some((id) => interest?.ids.includes(id))) return null;
	if (supply) return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LiveTreasury, {
		supply,
		active,
		interest,
		onlyInterest
	});
	let view;
	try {
		view = projectTreasuryCurve(decodeTreasuryCurve(snapshot, (/* @__PURE__ */ new Date()).toISOString()));
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("section", {
			"aria-label": "채권",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", { children: "미국 국채" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				role: "alert",
				children: "공개 국채자료 확인 필요 · 대체 자료 없음"
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TreasuryCurveReading, {
		view,
		actions,
		interest,
		onlyInterest
	});
}
/** Render-only view from the already admitted shared curve owner. */
function TreasuryCurveReading({ view, actions, interest, onlyInterest = false }) {
	const rows = view.rows.filter((row) => !onlyInterest || interest?.ids.includes(`treasury-us:${row.id}`));
	if (!rows.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("section", {
		className: "public-treasury-curve",
		"aria-label": "채권",
		"data-treasury-curve-asof": view.asOf,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("header", {
			className: "public-reference-heading-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", { children: "미국 국채" }),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(WidgetMetricHelp, {
					floating: true,
					compact: true,
					label: "미국 국채",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MarketMetricNote, {
						meaning: "미국 정부가 자금을 빌리기 위해 발행하는 채권입니다.",
						observedAt: view.observedAt,
						source: view.sources.at(-1).url
					})
				}),
				actions
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dl", {
			className: "public-treasury-curve-list",
			children: rows.map((row) => {
				const segments = miniSegments(row.points);
				return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					"data-treasury-tenor": row.id,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dt", { children: row.label }),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("dd", {
							className: "treasury-curve-trend",
							"data-direction": row.direction,
							children: segments.length ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
								viewBox: "0 0 96 32",
								role: "img",
								"aria-label": `${row.label} 일별 수익률 추이`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("title", { children: `${view.range.from}–${view.range.through} · 연율 % · 원천 제공 관측 ${row.points.filter((p) => p.value !== null).length}개 · 미제공값 단절` }), segments.map((s, i) => s.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("polyline", { points: s.map((p) => `${p.x},${p.y}`).join(" ") }, i) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
									cx: s[0].x,
									cy: s[0].y,
									r: "1.5"
								}, i))]
							}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: "추이 자료 없음" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("dd", {
							className: interest ? "treasury-curve-quote" : void 0,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
									className: "treasury-curve-value",
									title: `${view.asOf} · ${row.rawValue ?? "미제공"} · 연율 %`,
									children: row.valueText
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
									className: "treasury-curve-change",
									"data-direction": row.direction,
									title: row.comparisonDate ? `${row.comparisonDate} 대비 · 퍼센트포인트` : "이전 관측 비교 미확인",
									children: row.changeText
								}),
								interest && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
									type: "button",
									className: "treasury-curve-interest",
									"aria-pressed": interest.ids.includes(`treasury-us:${row.id}`),
									"aria-label": `${row.label} 관심 ${interest.ids.includes(`treasury-us:${row.id}`) ? "해제" : "추가"}`,
									onClick: () => interest.onToggle(`treasury-us:${row.id}`),
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AppIcon, {
										icon: Heart,
										size: 18
									})
								})
							]
						})
					]
				}, row.id);
			})
		})]
	});
}
function LiveTreasury({ supply, active, interest, onlyInterest }) {
	const snapshot = (0, import_react$1.useSyncExternalStore)(supply.subscribe, supply.getSnapshot, supply.getSnapshot);
	const [minutes, setMinutes] = (0, import_react$1.useState)(() => readTreasuryRefreshMode()), [ready, setReady] = (0, import_react$1.useState)(false), [preferenceSaved, setPreferenceSaved] = (0, import_react$1.useState)(true);
	const refresh = async () => {
		if (await supply.refresh()) setReady(true);
	};
	(0, import_react$1.useEffect)(() => {
		let timer, disposed = false, generation = 0;
		const clear = () => {
			if (timer !== void 0) {
				clearTimeout(timer);
				timer = void 0;
			}
		};
		const schedule = () => {
			clear();
			if (!disposed && active && ready && minutes !== "off" && document.visibilityState === "visible") {
				const owner = generation;
				timer = setTimeout(async () => {
					if (disposed || !active || owner !== generation || document.visibilityState !== "visible") return;
					timer = void 0;
					try {
						await supply.refresh();
					} finally {
						if (owner === generation) schedule();
					}
				}, Number(minutes) * 6e4);
			}
		};
		const visibility = () => {
			generation++;
			if (active && document.visibilityState === "visible") schedule();
			else {
				clear();
				supply.cancel();
			}
		};
		const hide = () => {
			generation++;
			clear();
			supply.cancel();
		};
		const leave = () => {
			disposed = true;
			hide();
		};
		if (!active) hide();
		schedule();
		document.addEventListener("visibilitychange", visibility);
		window.addEventListener("pagehide", hide);
		window.addEventListener("pageshow", visibility);
		return () => {
			leave();
			document.removeEventListener("visibilitychange", visibility);
			window.removeEventListener("pagehide", hide);
			window.removeEventListener("pageshow", visibility);
		};
	}, [
		supply,
		minutes,
		ready,
		active
	]);
	(0, import_react$1.useEffect)(() => () => {
		supply.cancel();
	}, [supply]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(TreasuryCurveReading, {
		view: snapshot.view,
		interest,
		onlyInterest,
		actions: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "treasury-live-actions",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					type: "button",
					"aria-label": "국채 새로고침",
					disabled: !active || snapshot.pending,
					onClick: () => {
						refresh();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AppIcon, {
						icon: RefreshCw,
						size: 16
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(SingleChoice, {
					label: "국채 자동 갱신",
					value: minutes,
					options: [
						{
							value: "off",
							label: "끔"
						},
						{
							value: "3",
							label: "3분"
						},
						{
							value: "5",
							label: "5분"
						}
					],
					onChange: (value) => {
						if (value !== "off" && value !== "3" && value !== "5") return;
						setMinutes(value);
						setPreferenceSaved(saveTreasuryRefreshMode(value));
					}
				}),
				!preferenceSaved ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					role: "status",
					children: "이 화면만 적용"
				}) : null,
				snapshot.pending ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					role: "status",
					children: "확인 중"
				}) : snapshot.error ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
					role: "status",
					children: "이전 자료 유지"
				}) : null
			]
		})
	});
}
var import_react$1, import_jsx_runtime$2, TREASURY_INTEREST_IDS;
function init_PublicTreasuryCurve() {
	return (init_PublicTreasuryCurve = __esmMin((() => {
		import_react$1 = require_react();
		init_refreshPreferences();
		init_refresh_cw(), init_heart();
		init_AppIcon();
		init_SingleChoice();
		init_MarketMetricNote();
		init_curve_release();
		init_curve();
		init_WidgetMetricHelp();
		init_treasury_curve();
		import_jsx_runtime$2 = require_jsx_runtime();
		TREASURY_INTEREST_IDS = TREASURY_CURVE_IDS.map((id) => `treasury-us:${id}`);
	})))();
}
var release_default;
function init_release() {
	return (init_release = __esmMin((() => {
		release_default = {
			version: 2,
			dataset: "3075133",
			license: "KOGL-1",
			transport: "official-page-confirmation",
			start: "2026-11-01",
			end: "2026-11-08",
			correctionsVerified: false,
			reportingPeriodsVerified: false,
			totals: {
				"005930": 11,
				"005380": 2
			},
			records: [
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261106000440",
					"date": "2026-11-06"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261106000410",
					"date": "2026-11-06"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261106000193",
					"date": "2026-11-06"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261106000100",
					"date": "2026-11-06"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261106000098",
					"date": "2026-11-06"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261106000093",
					"date": "2026-11-06"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261106000022",
					"date": "2026-11-06"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261105000566",
					"date": "2026-11-05"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "최대주주등소유주식변동신고서",
					"receiptNo": "20261104800612",
					"date": "2026-11-04"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "자기주식처분결과보고서",
					"receiptNo": "20261104000325",
					"date": "2026-11-04"
				},
				{
					"stockCode": "005930",
					"company": "삼성전자",
					"title": "임원ㆍ주요주주특정증권등소유상황보고서",
					"receiptNo": "20261103000167",
					"date": "2026-11-03"
				},
				{
					"stockCode": "005380",
					"company": "현대자동차",
					"title": "기업설명회(IR)개최(안내공시)",
					"receiptNo": "20261104800225",
					"date": "2026-11-04"
				},
				{
					"stockCode": "005380",
					"company": "현대자동차",
					"title": "영업(잠정)실적(공정공시)",
					"receiptNo": "20261102800520",
					"date": "2026-11-02"
				}
			],
			confirmationBatchCompletedAt: "2026-11-07T21:31:16.029299+00:00",
			selectionComplete: false
		};
	})))();
}
function init_public_disclosures() {
	return (init_public_disclosures = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-disclosures/public-disclosures.css?v=source-build-r294";
			document.head.appendChild(l);
		}
	})))();
}
function object(value, keys) {
	if (!value || typeof value !== "object" || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw Error("disclosure object");
	const d = Object.getOwnPropertyDescriptors(value), own = Reflect.ownKeys(d);
	if (own.length !== keys.length || own.some((k) => typeof k !== "string" || !keys.includes(k)) || keys.some((k) => !d[k] || !("value" in d[k]))) throw Error("disclosure fields");
	return value;
}
function array(value, max) {
	if (!Array.isArray(value) || value.length > max) throw Error("disclosure array");
	const d = Object.getOwnPropertyDescriptors(value);
	if (Reflect.ownKeys(d).length !== value.length + 1 || Array.from({ length: value.length }, (_, i) => String(i)).some((k) => !d[k] || !("value" in d[k]))) throw Error("disclosure dense array");
	return value;
}
/** Offline official-page-confirmed selection, not a period query or upstream API response. */
function decodeDisclosures(value, now = (/* @__PURE__ */ new Date()).toISOString()) {
	const r = object(value, [
		"version",
		"dataset",
		"license",
		"transport",
		"start",
		"end",
		"confirmationBatchCompletedAt",
		"selectionComplete",
		"correctionsVerified",
		"reportingPeriodsVerified",
		"totals",
		"records"
	]);
	if (r.version !== 2 || r.dataset !== "3075133" || r.license !== "KOGL-1" || r.transport !== "official-page-confirmation" || r.selectionComplete !== false || r.correctionsVerified !== false || r.reportingPeriodsVerified !== false || !day(r.start) || !day(r.end) || r.start > r.end) throw Error("disclosure scope");
	const t = [r.confirmationBatchCompletedAt];
	if (t.some((x) => typeof x !== "string" || !/^\d{4}-\d\d-\d\dT(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|\+00:00)$/.test(x) || !day(x.slice(0, 10)) || !Number.isFinite(Date.parse(x)))) throw Error("disclosure observation");
	if (!Number.isFinite(Date.parse(now)) || Date.parse(t[0]) > Date.parse(now)) throw Error("disclosure observation order");
	const observedDay = new Date(Date.parse(t[0]) + 324e5).toISOString().slice(0, 10);
	if (r.end > observedDay) throw Error("disclosure future query scope");
	const totals = object(r.totals, Object.keys(companies));
	if (Object.values(totals).some((x) => typeof x !== "number" || !Number.isInteger(x) || x < 0 || x > 100)) throw Error("disclosure total");
	if (r.start !== confirmedStart || r.end !== confirmedEnd || r.confirmationBatchCompletedAt !== confirmedBatch) throw Error("disclosure fixed scope");
	const rows = array(r.records, 200), seen = /* @__PURE__ */ new Set(), counts = {
		"005930": 0,
		"005380": 0
	};
	for (const row of rows) {
		const p = object(row, [
			"stockCode",
			"company",
			"title",
			"receiptNo",
			"date"
		]);
		if (typeof p.stockCode !== "string" || !Object.hasOwn(companies, p.stockCode) || p.company !== companies[p.stockCode] || typeof p.title !== "string" || !p.title.trim() || p.title.length > 300 || typeof p.receiptNo !== "string" || !/^\d{14}$/.test(p.receiptNo) || !day(p.date) || p.date < r.start || p.date > r.end || p.date > observedDay || p.date.replaceAll("-", "") !== p.receiptNo.slice(0, 8) || seen.has(p.receiptNo)) throw Error("disclosure receipt");
		const confirmed = confirmedRows.get(p.receiptNo);
		if (!confirmed || confirmed.stockCode !== p.stockCode || confirmed.company !== p.company || confirmed.title !== p.title || confirmed.date !== p.date) throw Error("disclosure unconfirmed receipt");
		seen.add(p.receiptNo);
		counts[p.stockCode]++;
	}
	if (rows.length !== 13 || confirmedRows.size !== 13 || Object.keys(companies).some((k) => counts[k] !== totals[k])) throw Error("disclosure incomplete");
	return value;
}
function PublicDisclosures({ release = release_default }) {
	let r;
	try {
		r = decodeDisclosures(release);
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
			className: "public-disclosures",
			"aria-label": "공시 접수 목록",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", { children: "공시" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
				role: "alert",
				children: "공시 목록 확인 필요 · 대체 자료 없음"
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
		className: "public-disclosures",
		"aria-label": "공시 접수 목록",
		"data-disclosures-mode": "offline-official-page-confirmed",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", {
				className: "public-reference-heading-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", { children: "공시" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WidgetMetricHelp, {
					label: "공시 출처·범위",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
						className: "market-source",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", { children: [
								r.start.slice(0, 4),
								"년 금융감독원 OpenDART 「금융감독원_공시정보_공시검색」 최소 공시 metadata 발췌·정규화 · ",
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
									href: "https://www.data.go.kr/data/3075133/openapi.do",
									target: "_blank",
									rel: "noopener noreferrer",
									children: "공식 데이터셋 3075133"
								}),
								" · ",
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
									href: "https://www.kogl.or.kr/info/licenseType1.do",
									target: "_blank",
									rel: "noopener noreferrer",
									children: "공공누리 제1유형 · 출처표시"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "정정·철회 상태와 보고 대상기간은 미확인입니다. 접수일은 실적 대상기간이나 행사일이 아닙니다. 각 DART 원문에서 확인하세요." }),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", { children: [
								"공식 DART 페이지의 회사·제목·접수일을 독립 확인한 선택한 13건입니다. 확인 배치 종료: ",
								/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("time", {
									dateTime: r.confirmationBatchCompletedAt,
									children: r.confirmationBatchCompletedAt
								}),
								". 개별 수신 시각은 미기록이며 원천 발표 시각이 아닙니다. MCP 최초 탐색 이력과 별개로 확인했으며 API 키 소유·권한 미확인 상태는 해결되지 않았습니다. 이 고정 자료는 API를 사용하지 않으며 무키 API 제공을 뜻하지 않습니다. 실시간·자동 갱신 아님."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "두 회사의 현재 확인된 고정 선택목록이며 전체기간 접수목록 아님. 페이지 접근 성공은 재사용 허가가 아닙니다. 저작권 근거는 위 데이터셋의 최소 목록 metadata 범위에 한정합니다. 공시 전문·첨부의 재배포 허가를 뜻하지 않습니다. 금융감독원이 StockPin을 후원·보증하지 않으며 공시정보의 정확성·완전성을 보장하지 않습니다." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
				className: "market-fx-caption",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("time", {
						dateTime: r.start,
						children: r.start
					}),
					"–",
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("time", {
						dateTime: r.end,
						children: r.end
					}),
					" · 선택한 13건 · 전체기간 접수목록 아님 · 정정 상태 미확인 · 고정 목록"
				]
			}),
			Object.entries(companies).map(([code, name]) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
				className: "public-disclosure-company",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("h3", { children: [
					name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: [r.totals[code], "건"] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", { children: r.records.filter((p) => p.stockCode === code).map((p) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("time", {
					dateTime: p.date,
					children: p.date
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("a", {
					href: `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${p.receiptNo}`,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `${name} · ${p.date} · ${p.title} · 접수번호 ${p.receiptNo}`,
					children: [p.title, /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("small", { children: p.receiptNo })]
				})] }, p.receiptNo)) })]
			}, code))
		]
	});
}
var import_jsx_runtime$1, companies, confirmedRows, confirmedBatch, confirmedStart, confirmedEnd, day;
function init_PublicDisclosures() {
	return (init_PublicDisclosures = __esmMin((() => {
		init_release();
		init_WidgetMetricHelp();
		init_public_disclosures();
		import_jsx_runtime$1 = require_jsx_runtime();
		companies = {
			"005930": "삼성전자",
			"005380": "현대자동차"
		};
		confirmedRows = new Map(release_default.records.map((row) => [row.receiptNo, Object.freeze({ ...row })]));
		confirmedBatch = release_default.confirmationBatchCompletedAt;
		confirmedStart = release_default.start;
		confirmedEnd = release_default.end;
		day = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v + "T00:00:00Z")) && (/* @__PURE__ */ new Date(v + "T00:00:00Z")).toISOString().slice(0, 10) === v;
	})))();
}
function referenceGeometry(points, width, height, sourceObservationDates) {
	const validDate = (d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) && Number.isFinite(Date.parse(d)) && new Date(d).toISOString().slice(0, 10) === d;
	let sourceOrder = null;
	if (Array.isArray(sourceObservationDates) && sourceObservationDates.length > 0) {
		const dates = [];
		for (let i = 0; i < sourceObservationDates.length; i++) {
			const descriptor = Object.getOwnPropertyDescriptor(sourceObservationDates, String(i));
			if (!descriptor || !("value" in descriptor) || !validDate(descriptor.value) || i > 0 && descriptor.value <= dates[i - 1]) break;
			dates.push(descriptor.value);
		}
		if (dates.length === sourceObservationDates.length && Reflect.ownKeys(sourceObservationDates).length === dates.length + 1) {
			const order = new Map(dates.map((d, i) => [d, i]));
			if (points.every((p, i) => order.has(p.date) && (i === 0 || p.date > points[i - 1].date))) sourceOrder = order;
		}
	}
	const values = points.map((p) => p.value), min = Math.min(...values), max = Math.max(...values);
	const start = points[0] ? Date.parse(points[0].date) : 0, end = points.at(-1) ? Date.parse(points.at(-1).date) : 0;
	const dots = points.map((p) => ({
		...p,
		x: 4 + (end === start ? .5 : (Date.parse(p.date) - start) / (end - start)) * (width - 8),
		y: 4 + (max === min ? .5 : (max - p.value) / (max - min)) * (height - 8)
	}));
	const segments = [];
	dots.forEach((p, i) => {
		const previous = dots[i - 1], gap = previous ? Date.parse(p.date) - Date.parse(previous.date) : NaN;
		if (!(previous && (sourceOrder ? sourceOrder.get(p.date) === sourceOrder.get(previous.date) + 1 : gap > 0 && gap <= 864e5))) segments.push([]);
		segments.at(-1).push(`${p.x},${p.y}`);
	});
	return {
		dots,
		segments: segments.filter((s) => s.length > 1).map((s) => s.join(" ")),
		min,
		max
	};
}
function referenceObservationDates(release) {
	return [...new Set([...release.history?.observations ?? [], ...release.daily.observations].map((p) => p.date))].sort();
}
function UnconnectedIndices({ interest, onlyInterest = false }) {
	const [region, setRegion] = (0, import_react.useState)("all");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "public-market-indices",
		"aria-label": "시장 지수",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "public-reference-heading-title",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: onlyInterest ? "지수" : "지수 · 환율" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketRegionIndexGroups, {
			region,
			onRegionChange: setRegion,
			interest,
			onlyInterest
		})]
	});
}
/** Host must choose this instead of the native/demo MarketPage, never alongside it. */
function PublicReferenceMarket({ release, heatmapView, treasuryView, indexView }) {
	const fxIds = PUBLIC_REFERENCE_PAIRS.map((p) => p.id);
	const interests = useMarketWatchlist([
		...fxIds,
		...MARKET_INDEX_ITEMS.map((p) => p.id),
		...TREASURY_INTEREST_IDS,
		"cnn",
		"vix",
		"bitcoin"
	], fxIds);
	const interestFilter = (0, import_react.useRef)(null), retiredFocus = (0, import_react.useRef)(null);
	const toggleInterest = (id) => {
		if (onlyInterest && typeof document !== "undefined") retiredFocus.current = document.activeElement;
		interests.interest.onToggle(id);
	};
	(0, import_react.useLayoutEffect)(() => {
		const old = retiredFocus.current;
		retiredFocus.current = null;
		if (old && !old.isConnected && old.ownerDocument.activeElement === old.ownerDocument.body) interestFilter.current?.focus({ preventScroll: true });
	}, [interests.snapshot]);
	const interest = {
		ids: interests.snapshot.ids.filter((id) => ![
			"cnn",
			"vix",
			"bitcoin"
		].includes(id)),
		onToggle: toggleInterest
	};
	const marketTabs = [
		["watchlist", "관심"],
		...baseMarketTabs,
		...heatmapView ? [["heatmap", "히트맵"]] : [],
		["disclosures", "공시"]
	];
	const [detail, setDetail] = (0, import_react.useState)(null), opener = (0, import_react.useRef)(null);
	const [requestedTab, setTab] = (0, import_react.useState)("indices"), tabId = (0, import_react.useId)();
	const tab = requestedTab === "heatmap" && !heatmapView ? "indices" : requestedTab;
	const onlyInterest = tab === "watchlist";
	const renderTreasury = () => typeof treasuryView === "function" ? treasuryView({
		interest,
		onlyInterest
	}) : onlyInterest && treasuryView != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "status",
		children: "이 채권 보기의 관심 필터는 미지원입니다."
	}) : treasuryView ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicTreasuryCurve, {
		interest,
		onlyInterest
	});
	const select = (next) => {
		setDetail(null);
		setTab(next);
	};
	let r = null;
	try {
		r = decodePublicReferenceRelease(release);
	} catch {}
	const rows = r ? PUBLIC_REFERENCE_PAIRS.map((p) => {
		const v = projectPublicReference(r, p.id, "90d");
		const averages = ["3m", "7d"].map((period) => rateWindowAverage(r, p.id, period, p.quote === "KRW" ? 0 : 2));
		const window = averages[0];
		const points = (r.history?.observations ?? r.daily.observations).filter((o) => o.date >= window.start && o.date <= window.end).flatMap((o) => {
			const base = p.base === "EUR" ? 1 : Number(o.rates[p.base]), quote = Number(o.rates[p.quote]);
			return Number.isFinite(base) && base > 0 && Number.isFinite(quote) ? [{
				date: o.date,
				value: quote / base * p.amount
			}] : [];
		});
		const chart = referenceGeometry(points, 96, 32, referenceObservationDates(r));
		const averageLines = averages.flatMap((w) => {
			const value = w.plotValue ?? Number(w.display?.replaceAll(",", ""));
			if (w.status !== "observations" || !Number.isFinite(value) || !points.length) return [];
			const y = chart.max === chart.min ? 16 : 4 + (chart.max - Math.max(chart.min, Math.min(chart.max, value))) / (chart.max - chart.min) * 24;
			return [{
				period: w.period,
				y
			}];
		});
		return {
			id: p.id,
			label: p.label,
			value: v.value === null ? "—" : referenceCurrentValue(v.value, p.quote === "KRW" ? 0 : 2),
			valueTitle: v.value === null ? "미제공" : `${p.amount} ${p.base} = ${v.value} ${p.quote}`,
			unit: p.unit,
			segments: chart.segments,
			trendTitle: `${window.start}–${window.end} · 달력 3개월 · 실제 ${points.length}개 일별 관측 · 원천 관측값을 이은 선 · 보간 없음`,
			direction: v.change === null ? "unknown" : v.change > 0 ? "up" : v.change < 0 ? "down" : "flat",
			change: v.change === null ? "등락 미확인" : `${signedReferenceChange(v.change)} ${p.unit} (${signedReferenceChange(v.percent)}%)`,
			comparison: v.comparisonDate ? `${v.comparisonDate} 발표 대비` : null,
			averages,
			averageLines
		};
	}) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "market-page",
		"aria-label": "시장",
		"data-market-mode": "public",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketOverview, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "market-page-filters public-market-tabs",
				role: "tablist",
				"aria-label": "시장 보기",
				children: marketTabs.map(([key, label], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					ref: key === "watchlist" ? interestFilter : void 0,
					"aria-label": key === "watchlist" ? "관심 지표 보기" : void 0,
					type: "button",
					id: `${tabId}-${key}`,
					role: "tab",
					"aria-selected": tab === key,
					"aria-controls": tab === key ? `${tabId}-panel-${key}` : void 0,
					tabIndex: tab === key ? 0 : -1,
					onClick: () => select(key),
					onKeyDown: (event) => {
						const next = event.key === "ArrowRight" ? (index + 1) % marketTabs.length : event.key === "ArrowLeft" ? (index + marketTabs.length - 1) % marketTabs.length : event.key === "Home" ? 0 : event.key === "End" ? marketTabs.length - 1 : null;
						if (next === null) return;
						event.preventDefault();
						select(marketTabs[next][0]);
						event.currentTarget.parentElement?.querySelectorAll("[role=\"tab\"]")[next]?.focus();
					},
					children: [label, key === "watchlist" && interests.snapshot.durable ? ` ${interest.ids.length}` : null]
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "tabpanel",
				id: `${tabId}-panel-${tab}`,
				"aria-labelledby": `${tabId}-${tab}`,
				tabIndex: 0,
				className: "public-market-panel",
				children: [
					interests.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						children: interests.message
					}),
					(tab === "indices" || onlyInterest) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						(!onlyInterest || MARKET_INDEX_ITEMS.some((item) => interest.ids.includes(item.id))) && (indexView ? indexView({
							interest,
							onlyInterest
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnconnectedIndices, {
							interest,
							onlyInterest
						})),
						r && (!onlyInterest || fxIds.some((id) => interest.ids.includes(id))) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "market-indicators reference-rates-table",
							"aria-label": "ECB 참고환율",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
								className: "reference-rates-heading",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "public-reference-heading-title",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "환율" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
										floating: true,
										compact: true,
										label: "환율",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketMetricNote, {
											meaning: "엔/원은 100엔당 원화, 나머지는 앞 통화 1단위 기준입니다.",
											observedAt: r.daily.observedAt,
											source: r.daily.sourceUrl
										})
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "reference-rate-groups",
								children: [{
									name: "원화 기준",
									rows: rows.slice(0, 5)
								}, {
									name: "교차환율",
									rows: rows.slice(5)
								}].map((g) => ({
									...g,
									rows: g.rows.filter((p) => !onlyInterest || interest.ids.includes(p.id))
								})).filter((g) => g.rows.length).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "reference-rate-group",
									role: "group",
									"aria-label": g.name,
									children: [g.name !== "원화 기준" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: g.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceRateRows, {
										interest,
										rows: g.rows,
										onOpen: (id, button) => {
											opener.current = button;
											setDetail(id);
										}
									})]
								}, g.name))
							})]
						}) : !r ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							children: "공개 참고환율 자료 확인 필요 · 대체 데이터 없음"
						}) : null,
						onlyInterest && !interest.ids.length && interests.snapshot.durable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "market-empty",
							children: "관심 지표가 없습니다. 하트를 눌러 추가하세요."
						})
					] }),
					tab === "disclosures" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "public-market-disclosures",
						"aria-label": "공시",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicDisclosures, {})
					}),
					(tab === "bonds" || onlyInterest && TREASURY_INTEREST_IDS.some((id) => interest.ids.includes(id))) && renderTreasury(),
					tab === "heatmap" && heatmapView,
					tab === "commodities" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-label": "원자재",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "public-reference-heading-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "원자재" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
								label: "원자재",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "공개 표시 가능한 실제 공급 미연결. 원천·상품·단위·통화·기준시각·지연 및 재배포 조건 확인이 필요합니다. 참고환율이나 국채 수익률을 원자재 가격으로 대체하지 않습니다." })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "market-empty",
							children: "공급 미연결"
						})]
					})
				]
			}),
			detail && r && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicReferenceDetail, {
				release: r,
				pairId: detail,
				onClose: () => {
					setDetail(null);
					opener.current?.focus();
				}
			}, detail)
		]
	});
}
var import_jsx_runtime, import_react, baseMarketTabs;
function init_PublicReferenceMarket() {
	return (init_PublicReferenceMarket = __esmMin((() => {
		init_PublicReferenceDetail();
		import_jsx_runtime = require_jsx_runtime();
		import_react = require_react();
		init_useMarketWatchlist();
		init_WidgetMetricHelp();
		init_public_reference();
		init_MarketMetricNote();
		init_MarketOverview();
		init_rateWindowAverage();
		init_WebDemoMarketPanels();
		init_PublicTreasuryCurve();
		init_PublicDisclosures();
		init_ReferenceRatesTable();
		init_contract();
		init_market_page();
		init_market_widgets();
		init_reference_rate_details();
		baseMarketTabs = [
			["indices", "지수 · 환율"],
			["bonds", "채권"],
			["commodities", "원자재"]
		];
	})))();
}
export { referenceCurrentValue as _, PublicReferenceDetail as a, ECB_HISTORY_URL as c, PUBLIC_REFERENCE_PAIRS as d, admitReviewedEcbLicense as f, init_referenceChangeDisplay as g, projectPublicReference as h, referenceObservationDates as i, ECB_TERMS_URL as l, init_contract as m, init_PublicReferenceMarket as n, init_PublicReferenceDetail as o, decodePublicReferenceRelease as p, referenceGeometry as r, ECB_DAILY_URL as s, PublicReferenceMarket as t, PUBLIC_MARKET_AVAILABILITY as u, signedReferenceChange as v };
