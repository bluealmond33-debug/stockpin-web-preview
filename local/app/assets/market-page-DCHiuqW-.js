import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
function init_market_widgets() {
	return (init_market_widgets = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-widgets.css?v=source-build-r123";
			document.head.appendChild(l);
		}
	})))();
}
function record$2(x) {
	return typeof x === "object" && x !== null && !Array.isArray(x);
}
function exact$1(x, keys) {
	return Object.keys(x).length === keys.length && keys.every((k) => Object.hasOwn(x, k));
}
function scaled(x) {
	if (typeof x !== "string" || x.length > 24 || !/^\d+(?:\.\d{1,12})?$/.test(x)) throw Error();
	const [a, b = ""] = x.split(".");
	const n = BigInt(a) * 10n ** 12n + BigInt(b.padEnd(12, "0"));
	if (n <= 0n || n > 10n ** 21n) throw Error();
	return n;
}
function cross(krw, usd) {
	const numerator = krw * 10n ** 8n;
	let q = numerator / usd;
	const r = numerator % usd;
	if (r * 2n > usd || r * 2n === usd && q % 2n !== 0n) q++;
	return `${q / 10n ** 8n}.${(q % 10n ** 8n).toString().padStart(8, "0")}`.replace(/\.?0+$/, "");
}
function decodeFx(x, now = Date.now()) {
	try {
		if (!record$2(x) || !exact$1(x, fields) || x.kind !== "ecb_reference_cross_v1" || x.sourceUrl !== "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?845827e3bb04489375cb124e9f374a8d" || typeof x.sourceDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(x.sourceDate) || typeof x.observedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(x.observedAt)) throw Error();
		const day = Date.parse(x.sourceDate + "T00:00:00Z"), observed = Date.parse(x.observedAt);
		if (!Number.isFinite(day) || !Number.isFinite(observed) || new Date(day).toISOString().slice(0, 10) !== x.sourceDate || new Date(observed).toISOString().replace(".000Z", "Z") !== x.observedAt || day > observed || observed > now + 3e5) throw Error();
		const usd = scaled(x.eurUsd), krw = scaled(x.eurKrw);
		scaled(x.krwPerUsd);
		if (x.krwPerUsd !== cross(krw, usd)) throw Error();
		return { ...x };
	} catch {
		throw Error("참고환율 형식 오류");
	}
}
function isOldFx(q, now = Date.now()) {
	return now - Date.parse(q.sourceDate + "T00:00:00Z") >= 6048e5;
}
function readFx(s, now = Date.now()) {
	try {
		const raw = s.getItem(FX_KEY);
		if (raw === null) return null;
		if (raw.length > 2048) throw Error();
		const x = JSON.parse(raw);
		if (!record$2(x) || !exact$1(x, ["version", "quote"]) || x.version !== 1) throw Error();
		return decodeFx(x.quote, now);
	} catch {
		throw Error("참고환율 저장값 오류");
	}
}
function writeFx(s, x, now = Date.now()) {
	const next = decodeFx(x, now), old = readFx(s, now);
	if (old && (next.sourceDate < old.sourceDate || next.observedAt < old.observedAt)) throw Error("이전 기준 자료는 덮어쓰지 않습니다");
	s.setItem(FX_KEY, JSON.stringify({
		version: 1,
		quote: next
	}));
	return next;
}
var FX_KEY, FX_SOURCE, fields;
function init_referenceFx() {
	return (init_referenceFx = __esmMin((() => {
		FX_KEY = "stockpin:ecb-reference:v1";
		FX_SOURCE = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?845827e3bb04489375cb124e9f374a8d";
		fields = [
			"kind",
			"sourceUrl",
			"sourceDate",
			"observedAt",
			"eurUsd",
			"eurKrw",
			"krwPerUsd"
		];
	})))();
}
function init_reference_rates_table() {
	return (init_reference_rates_table = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/reference-rates-table.css?v=source-build-r123";
			document.head.appendChild(l);
		}
	})))();
}
function readReferenceRates(s, now = Date.now()) {
	const raw = s.getItem(REFERENCE_RATES_KEY);
	if (raw === null) return null;
	try {
		if (raw.length > 16384) throw Error();
		const envelope = object(JSON.parse(raw));
		exact(envelope, ["version", "quote"]);
		if (envelope.version !== 1) throw Error();
		return decodeReferenceRates(envelope.quote, now);
	} catch {
		throw Error("참고환율 저장값 오류");
	}
}
function writeReferenceRates(s, x, now = Date.now()) {
	const next = decodeReferenceRates(x, now), old = readReferenceRates(s, now);
	if (old && (next.sourceDate < old.sourceDate || next.observedAt < old.observedAt)) throw Error("이전 기준 자료는 덮어쓰지 않습니다");
	s.setItem(REFERENCE_RATES_KEY, JSON.stringify({
		version: 1,
		quote: next
	}));
	return next;
}
function object(x) {
	if (!x || typeof x !== "object" || Array.isArray(x) || Object.getPrototypeOf(x) !== Object.prototype && Object.getPrototypeOf(x) !== null) throw Error();
	for (const d of Object.values(Object.getOwnPropertyDescriptors(x))) if (!("value" in d)) throw Error();
	return x;
}
function exact(x, keys) {
	if (Object.keys(x).length !== keys.length || keys.some((k) => !Object.hasOwn(x, k))) throw Error();
}
function decimal$2(x) {
	if (typeof x !== "string" || x.length > 24 || !/^\d+(?:\.\d{1,12})?$/.test(x)) throw Error();
	const [a, b = ""] = x.split("."), n = BigInt(a) * 10n ** 12n + BigInt(b.padEnd(12, "0"));
	if (n <= 0n || n > 10n ** 21n) throw Error();
	return n;
}
function roundedRatio(n, d) {
	const scaled = n * 10n ** 8n;
	let q = scaled / d;
	const r = scaled % d;
	if (r * 2n > d || r * 2n === d && q % 2n !== 0n) q++;
	return q * 10n ** 4n;
}
/** Public dated reference information only, never a portfolio valuation or trading FX. */
function decodeReferenceRates(input, now = Date.now()) {
	try {
		const x = object(input);
		exact(x, [
			"kind",
			"sourceUrl",
			"sourceDate",
			"observedAt",
			"rates",
			"pairs"
		]);
		if (x.kind !== "ecb_reference_rates_v1" || x.sourceUrl !== "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?845827e3bb04489375cb124e9f374a8d" || typeof x.sourceDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(x.sourceDate) || typeof x.observedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(x.observedAt)) throw Error();
		const date = Date.parse(x.sourceDate + "T00:00:00Z"), observed = Date.parse(x.observedAt);
		if (!Number.isFinite(now) || !Number.isFinite(date) || !Number.isFinite(observed) || new Date(date).toISOString().slice(0, 10) !== x.sourceDate || new Date(observed).toISOString().replace(".000Z", "Z") !== x.observedAt || date > observed || observed > now + 3e5) throw Error();
		const rates = object(x.rates), keys = Object.keys(rates);
		if (keys.length > 64 || !Object.hasOwn(rates, "USD") || !Object.hasOwn(rates, "KRW")) throw Error();
		const parsed = /* @__PURE__ */ new Map();
		for (const k of keys) {
			if (!/^[A-Z]{3}$/.test(k)) throw Error();
			const rate = decimal$2(rates[k]);
			if (k === "EUR" && rate !== 10n ** 12n) throw Error();
			parsed.set(k, rate);
		}
		parsed.set("EUR", 10n ** 12n);
		if (!Array.isArray(x.pairs) || x.pairs.length !== REFERENCE_PAIRS.length) throw Error();
		const pairs = x.pairs.map((raw, i) => {
			const p = object(raw);
			exact(p, [
				"id",
				"base",
				"quote",
				"baseAmount",
				"value"
			]);
			const [id, base, quote, baseAmount] = REFERENCE_PAIRS[i];
			if (p.id !== id || p.base !== base || p.quote !== quote || p.baseAmount !== baseAmount) throw Error();
			const a = parsed.get(base), b = parsed.get(quote);
			if (a === void 0 || b === void 0) {
				if (p.value !== null) throw Error();
			} else if (decimal$2(p.value) !== roundedRatio(b * BigInt(baseAmount), a)) throw Error();
			return {
				id,
				base,
				quote,
				baseAmount,
				value: p.value
			};
		});
		return {
			kind: "ecb_reference_rates_v1",
			sourceUrl: FX_SOURCE,
			sourceDate: x.sourceDate,
			observedAt: x.observedAt,
			rates: { ...rates },
			pairs
		};
	} catch {
		throw Error("참고환율 형식 오류");
	}
}
var REFERENCE_RATES_KEY, REFERENCE_PAIRS;
function init_referenceRates() {
	return (init_referenceRates = __esmMin((() => {
		init_referenceFx();
		REFERENCE_RATES_KEY = "stockpin:ecb-reference-rates:v1";
		REFERENCE_PAIRS = [
			[
				"usdkrw",
				"USD",
				"KRW",
				"1"
			],
			[
				"jpykrw100",
				"JPY",
				"KRW",
				"100"
			],
			[
				"cnykrw",
				"CNY",
				"KRW",
				"1"
			],
			[
				"eurkrw",
				"EUR",
				"KRW",
				"1"
			],
			[
				"gbpkrw",
				"GBP",
				"KRW",
				"1"
			],
			[
				"eurusd",
				"EUR",
				"USD",
				"1"
			],
			[
				"usdjpy",
				"USD",
				"JPY",
				"1"
			]
		];
	})))();
}
function dense$1(array) {
	const keys = Object.keys(array);
	return keys.length === array.length && keys.every((key, index) => key === String(index) && Object.hasOwn(Object.getOwnPropertyDescriptor(array, key), "value"));
}
function record$1(value, keys) {
	if (!value || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) throw Error();
	const descriptors = Object.getOwnPropertyDescriptors(value);
	if (Object.keys(descriptors).length !== keys.length || keys.some((k) => !Object.hasOwn(descriptors, k)) || Object.values(descriptors).some((d) => !("value" in d))) throw Error();
	return value;
}
function decodeReferenceHistory(input, now) {
	try {
		const x = record$1(input, [
			"kind",
			"sourceUrl",
			"observedAt",
			"observations"
		]);
		if (x.kind !== "ecb_reference_history_v1" || x.sourceUrl !== "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml?ec6928c4c79db931408b94ef3ca7b402" || !Array.isArray(x.observations) || x.observations.length === 0 || x.observations.length > 100) throw Error();
		if (!dense$1(x.observations)) throw Error();
		let last = "";
		const observations = x.observations.map((raw) => {
			const row = record$1(raw, [
				"sourceDate",
				"rates",
				"pairs"
			]);
			if (!Array.isArray(row.pairs) || !dense$1(row.pairs)) throw Error();
			const q = decodeReferenceRates({
				...row,
				kind: "ecb_reference_rates_v1",
				sourceUrl: FX_SOURCE,
				observedAt: x.observedAt
			}, now);
			if (q.sourceDate <= last) throw Error();
			last = q.sourceDate;
			return {
				sourceDate: q.sourceDate,
				rates: q.rates,
				pairs: q.pairs
			};
		});
		const result = {
			kind: "ecb_reference_history_v1",
			sourceUrl: REFERENCE_HISTORY_SOURCE,
			observedAt: x.observedAt,
			observations
		};
		if (new TextEncoder().encode(JSON.stringify(result)).length > 262144) throw Error();
		return result;
	} catch {
		throw Error("환율 과거 자료 확인 필요");
	}
}
function historyQuotes(history) {
	return history.observations.map((row) => ({
		...row,
		sourceUrl: history.sourceUrl,
		observedAt: history.observedAt
	}));
}
var REFERENCE_HISTORY_SOURCE, REFERENCE_HISTORY_KEY, MAX_REFERENCE_HISTORY_BYTES;
function init_referenceHistory() {
	return (init_referenceHistory = __esmMin((() => {
		init_referenceRates();
		init_referenceFx();
		REFERENCE_HISTORY_SOURCE = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml?ec6928c4c79db931408b94ef3ca7b402";
		REFERENCE_HISTORY_KEY = "stockpin:ecb-reference-history:v1";
		MAX_REFERENCE_HISTORY_BYTES = 262144;
	})))();
}
function record(input, keys) {
	if (!input || typeof input !== "object" || Array.isArray(input) || ![Object.prototype, null].includes(Object.getPrototypeOf(input))) throw Error();
	const names = Reflect.ownKeys(input);
	if (names.some((k) => typeof k !== "string") || keys && (names.length !== keys.length || keys.some((k) => !Object.hasOwn(input, k)))) throw Error();
	const copy = Object.create(null);
	for (const k of names) {
		const d = Object.getOwnPropertyDescriptor(input, k);
		if (!("value" in d) || !d.enumerable) throw Error();
		copy[k] = d.value;
	}
	return copy;
}
function dense(input, max) {
	if (!Array.isArray(input) || input.length > max || Reflect.ownKeys(input).length !== input.length + 1) throw Error();
	const copy = [];
	for (let i = 0; i < input.length; i++) {
		const d = Object.getOwnPropertyDescriptor(input, String(i));
		if (!d || !("value" in d) || !d.enumerable) throw Error();
		copy.push(d.value);
	}
	return copy;
}
function date(input) {
	if (typeof input !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(input)) throw Error();
	const n = Date.parse(input + "T00:00:00Z");
	if (!Number.isFinite(n) || new Date(n).toISOString().slice(0, 10) !== input) throw Error();
	return n;
}
function decodeReferenceYearHistory(input, now = Date.now()) {
	try {
		const x = record(input, [
			"kind",
			"sourceUrl",
			"observedAt",
			"requestedStart",
			"requestedEnd",
			"observations"
		]);
		if (x.kind !== "ecb_reference_history_year_v1" || x.sourceUrl !== "https://data-api.ecb.europa.eu/service/data/EXR/D.CNY+GBP+JPY+KRW+USD.EUR.SP00.A" || typeof x.observedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(x.observedAt)) throw Error();
		const observed = Date.parse(x.observedAt), start = date(x.requestedStart), end = date(x.requestedEnd);
		if (!Number.isFinite(now) || !Number.isFinite(observed) || new Date(observed).toISOString().replace(".000Z", "Z") !== x.observedAt || observed > now || start > end || (end - start) / 864e5 >= 400 || end > observed) throw Error();
		let last = "";
		const observations = dense(x.observations, 400).map((raw) => {
			const row = record(raw, [
				"sourceDate",
				"rates",
				"pairs"
			]);
			const day = date(row.sourceDate);
			if (day < start || day > end || row.sourceDate <= last) throw Error();
			last = row.sourceDate;
			const rates = record(row.rates);
			if (Object.keys(rates).some((k) => ![
				"CNY",
				"GBP",
				"JPY",
				"KRW",
				"USD"
			].includes(k))) throw Error();
			const pairs = dense(row.pairs, 7).map((p) => record(p, [
				"id",
				"base",
				"quote",
				"baseAmount",
				"value"
			]));
			const q = decodeReferenceRates({
				...row,
				rates,
				pairs,
				kind: "ecb_reference_rates_v1",
				sourceUrl: FX_SOURCE,
				observedAt: x.observedAt
			}, now);
			return {
				sourceDate: q.sourceDate,
				rates: q.rates,
				pairs: q.pairs
			};
		});
		if (!observations.length) throw Error();
		return {
			kind: REFERENCE_YEAR_HISTORY_KIND,
			sourceUrl: REFERENCE_YEAR_HISTORY_SOURCE,
			observedAt: x.observedAt,
			requestedStart: x.requestedStart,
			requestedEnd: x.requestedEnd,
			observations
		};
	} catch {
		throw Error("연간 참고환율 형식 오류");
	}
}
function readReferenceYearHistory(storage, now = Date.now()) {
	const raw = storage.getItem(REFERENCE_YEAR_HISTORY_KEY);
	if (raw === null) return null;
	try {
		if (raw.length > 2097152 || new TextEncoder().encode(raw).length > 2097152) throw Error();
		const envelope = record(JSON.parse(raw), ["version", "history"]);
		if (envelope.version !== 1) throw Error();
		return decodeReferenceYearHistory(envelope.history, now);
	} catch {
		throw Error("연간 참고환율 저장값 오류");
	}
}
function writeReferenceYearHistory(storage, input, now = Date.now()) {
	const next = decodeReferenceYearHistory(input, now), old = readReferenceYearHistory(storage, now);
	if (old) {
		if (next.observedAt < old.observedAt || next.observations.at(-1).sourceDate < old.observations.at(-1).sourceDate) throw Error("이전 기준 자료는 덮어쓰지 않습니다");
		const previous = new Map(old.observations.map((row) => [row.sourceDate, row]));
		for (const row of next.observations) {
			const prior = previous.get(row.sourceDate);
			if (prior) {
				if (Object.keys(prior.rates).length !== Object.keys(row.rates).length || Object.keys(prior.rates).some((k) => prior.rates[k] !== row.rates[k]) || prior.pairs.some((p, i) => p.value !== row.pairs[i].value)) throw Error("중복 날짜 자료 변경은 덮어쓰지 않습니다");
			}
		}
	}
	const raw = JSON.stringify({
		version: 1,
		history: next
	});
	if (new TextEncoder().encode(raw).length > 2097152) throw Error("연간 참고환율 저장 한도");
	storage.setItem(REFERENCE_YEAR_HISTORY_KEY, raw);
	return next;
}
/** Span eligibility only: gaps are not interpolated or classified as holidays/missing publications.
* Includes the last actual publication on/before the clamped calendar-year boundary.
* Consumers must render separate segments across publicationGaps, never a fabricated daily series.
*/
function sourceAnchoredYearCoverage(input, now = Date.now()) {
	const rows = decodeReferenceYearHistory(input, now).observations;
	const latestDate = rows.at(-1).sourceDate, latest = new Date(date(latestDate));
	const boundary = new Date(date(latestDate));
	boundary.setUTCDate(1);
	boundary.setUTCFullYear(latest.getUTCFullYear() - 1);
	boundary.setUTCMonth(latest.getUTCMonth() + 1, 0);
	boundary.setUTCDate(Math.min(latest.getUTCDate(), boundary.getUTCDate()));
	const boundaryDate = boundary.toISOString().slice(0, 10);
	let anchor = -1;
	rows.forEach((row, i) => {
		if (row.sourceDate <= boundaryDate) anchor = i;
	});
	const selected = rows.slice(Math.max(0, anchor));
	const pairs = {};
	for (const [i, [id]] of REFERENCE_PAIRS.entries()) {
		const missingDates = selected.filter((row) => row.pairs[i].value === null).map((row) => row.sourceDate);
		pairs[id] = {
			eligible: anchor >= 0 && missingDates.length === 0,
			missingDates
		};
	}
	const publicationGaps = [];
	for (let i = 1; i < selected.length; i++) {
		const after = selected[i - 1].sourceDate, before = selected[i].sourceDate, unobservedCalendarDays = (date(before) - date(after)) / 864e5 - 1;
		if (unobservedCalendarDays > 0) publicationGaps.push({
			after,
			before,
			unobservedCalendarDays
		});
	}
	return {
		latestDate,
		boundaryDate,
		anchorDate: anchor < 0 ? null : rows[anchor].sourceDate,
		eligible: Object.values(pairs).every((p) => p.eligible),
		observationCount: selected.length,
		pairs,
		publicationGaps
	};
}
var REFERENCE_YEAR_HISTORY_KIND, REFERENCE_YEAR_HISTORY_SOURCE, REFERENCE_YEAR_HISTORY_KEY;
function init_referenceYearHistory() {
	return (init_referenceYearHistory = __esmMin((() => {
		init_referenceRates();
		init_referenceFx();
		REFERENCE_YEAR_HISTORY_KIND = "ecb_reference_history_year_v1";
		REFERENCE_YEAR_HISTORY_SOURCE = "https://data-api.ecb.europa.eu/service/data/EXR/D.CNY+GBP+JPY+KRW+USD.EUR.SP00.A";
		REFERENCE_YEAR_HISTORY_KEY = "stockpin:ecb-reference-history-year:v1";
	})))();
}
/** UTC calendar months, clamped to the target month's final day (not 30/90-day aliases). */
function monthStart(end, months) {
	const d = new Date(end), target = new Date(end);
	target.setUTCDate(1);
	target.setUTCMonth(target.getUTCMonth() - months);
	const last = new Date(target);
	last.setUTCMonth(last.getUTCMonth() + 1);
	last.setUTCDate(0);
	target.setUTCDate(Math.min(d.getUTCDate(), last.getUTCDate()));
	return target.getTime();
}
/** Pure bounded projection. Existing decoders remain the only input admission contract.
* Both approved ECB endpoints use the same EUR reference; same-date rates/units must
* match before plotting. A newer validated year may stand alone in detail. No I/O.
*/
function projectReferenceRatePeriod(quote, input, pairId, period, now, yearInput) {
	const candidate = projectPeriodSource(quote, input, pairId, period, now, yearInput);
	if (period === "all" && yearInput != null && candidate.status !== "ready") {
		const fallback = projectPeriodSource(quote, input, pairId, period, now);
		if (fallback.status === "ready") return fallback;
	}
	return candidate;
}
function projectPeriodSource(quote, input, pairId, period, now, yearInput) {
	const useYear = yearInput != null && (period === "1y" || period === "all");
	const result = {
		source: useYear ? "year" : "90d",
		status: "empty",
		pair: null,
		start: null,
		end: null,
		availableStart: null,
		availableEnd: null,
		points: [],
		segments: [],
		minimum: null,
		maximum: null
	};
	if (period === "1y" && !useYear) return {
		...result,
		status: "unsupported"
	};
	if (![
		"7d",
		"1m",
		"3m",
		"1y",
		"all"
	].includes(period)) return {
		...result,
		status: "invalid"
	};
	if (!useYear && (input == null || quote === null)) return result;
	try {
		const history = useYear ? decodeReferenceYearHistory(yearInput, now) : decodeReferenceHistory(input, now);
		const latest = history.observations.at(-1);
		if (quote && quote.sourceUrl !== "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?845827e3bb04489375cb124e9f374a8d" && quote.sourceUrl !== "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml?ec6928c4c79db931408b94ef3ca7b402") throw Error();
		let current = quote === null ? latest : quote.sourceUrl === "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml?845827e3bb04489375cb124e9f374a8d" ? decodeReferenceRates({
			...quote,
			kind: "ecb_reference_rates_v1"
		}, now) : decodeReferenceHistory({
			kind: "ecb_reference_history_v1",
			sourceUrl: quote.sourceUrl,
			observedAt: quote.observedAt,
			observations: [{
				sourceDate: quote.sourceDate,
				rates: quote.rates,
				pairs: quote.pairs
			}]
		}, now).observations[0];
		if (current.sourceDate > latest.sourceDate) return {
			...result,
			status: "history_behind"
		};
		if (useYear && current.sourceDate < latest.sourceDate) current = latest;
		const keys = Object.keys(latest.rates);
		if (current.sourceDate !== latest.sourceDate || !useYear && keys.length !== Object.keys(current.rates).length || keys.some((k) => current.rates[k] === void 0 || decimal$1(current.rates[k]) !== decimal$1(latest.rates[k])) || current.pairs.some((p, i) => p.value === null ? latest.pairs[i].value !== null : latest.pairs[i].value === null || decimal$1(p.value) !== decimal$1(latest.pairs[i].value))) return {
			...result,
			status: "mismatch"
		};
		const index = current.pairs.findIndex((p) => p.id === pairId);
		if (index < 0) throw Error();
		result.pair = current.pairs[index];
		result.availableStart = history.observations[0].sourceDate;
		result.availableEnd = latest.sourceDate;
		const end = day$1(latest.sourceDate);
		if (now - end >= 7 * DAY$2) return {
			...result,
			status: "stale"
		};
		const coverage = useYear && period === "1y" ? sourceAnchoredYearCoverage(history, now) : null;
		if (coverage && !coverage.pairs[pairId]?.eligible) return result;
		const start = coverage ? day$1(coverage.anchorDate) : period === "7d" ? end - 6 * DAY$2 : period === "1m" ? monthStart(end, 1) : period === "3m" ? monthStart(end, 3) : -Infinity;
		const rows = history.observations.filter((row) => day$1(row.sourceDate) >= start);
		const valid = rows.filter((row) => row.pairs[index].value !== null);
		if (!valid.length) return result;
		result.start = valid[0].sourceDate;
		result.end = valid.at(-1).sourceDate;
		const values = valid.map((row) => row.pairs[index].value);
		result.minimum = values.reduce((a, b) => decimal$1(a) < decimal$1(b) ? a : b);
		result.maximum = values.reduce((a, b) => decimal$1(a) > decimal$1(b) ? a : b);
		const min = decimal$1(result.minimum), max = decimal$1(result.maximum), first = day$1(result.start), last = day$1(result.end);
		let segment = [], previous = -Infinity;
		const flush = () => {
			if (segment.length > 1) result.segments.push(segment.join(" "));
			segment = [];
		};
		for (const row of rows) {
			const value = row.pairs[index].value, t = day$1(row.sourceDate);
			if (value === null) {
				flush();
				previous = -Infinity;
				continue;
			}
			if (t - previous !== DAY$2) flush();
			const x = 24 + (t - first) / Math.max(DAY$2, last - first) * 592;
			const y = max === min ? 140 : 248 - Number((decimal$1(value) - min) * 216000n / (max - min)) / 1e3;
			result.points.push({
				date: row.sourceDate,
				value,
				x,
				y
			});
			segment.push(`${x},${y}`);
			previous = t;
		}
		flush();
		result.status = "ready";
		return result;
	} catch {
		return {
			...result,
			status: "invalid",
			points: [],
			segments: [],
			start: null,
			end: null,
			minimum: null,
			maximum: null
		};
	}
}
var REFERENCE_RATE_PERIODS, DAY$2, SCALE$1, decimal$1, day$1;
function init_referenceRatePeriod() {
	return (init_referenceRatePeriod = __esmMin((() => {
		init_referenceHistory();
		init_referenceRates();
		init_referenceFx();
		init_referenceYearHistory();
		REFERENCE_RATE_PERIODS = [
			["7d", "7일"],
			["1m", "1개월"],
			["3m", "3개월"],
			["1y", "1년"],
			["all", "전체(제공 범위)"]
		];
		DAY$2 = 864e5;
		SCALE$1 = 10n ** 12n;
		decimal$1 = (value) => {
			const [a, b = ""] = value.split(".");
			return BigInt(a) * SCALE$1 + BigInt(b.padEnd(12, "0"));
		};
		day$1 = (date) => Date.parse(date + "T00:00:00Z");
	})))();
}
/** Display-only decimal rounding: nearest hundredth, ties to even (as in the ECB decoder).
* Never use this presentation string for storage or financial calculations.
*/
function displayReferenceRate(raw) {
	if (typeof raw !== "string" || !/^\d+(?:\.\d+)?$/.test(raw) || /\s/.test(raw)) throw new Error("Invalid reference-rate decimal");
	const [whole, fraction = ""] = raw.split(".");
	const scale = 10n ** BigInt(fraction.length);
	const scaled = (BigInt(whole) * scale + BigInt(fraction || "0")) * 100n;
	let cents = scaled / scale;
	const remainder = scaled % scale;
	if (remainder * 2n > scale || remainder * 2n === scale && cents % 2n !== 0n) cents++;
	if (cents === 0n && scaled > 0n) return "<0.01";
	const integer = (cents / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	const decimal = (cents % 100n).toString().padStart(2, "0").replace(/0+$/, "");
	return integer + (decimal ? `.${decimal}` : "");
}
function init_referenceRateDisplay() {
	return (init_referenceRateDisplay = __esmMin((() => {})))();
}
function init_reference_rate_details() {
	return (init_reference_rate_details = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/reference-rate-details.css?v=source-build-r123";
			document.head.appendChild(l);
		}
	})))();
}
/** Mounted only by an explicit row action; no transport or cache writes. */
function ReferenceRateDetails({ pairId, label, quote, history, now, onClose, yearHistory, yearActions }) {
	const dialog = (0, import_react$3.useRef)(null), closing = (0, import_react$3.useRef)(false), id = (0, import_react$3.useId)();
	const close = () => {
		if (closing.current) return;
		closing.current = true;
		if (dialog.current?.open) dialog.current.close();
		onClose();
	};
	const [period, setPeriod] = (0, import_react$3.useState)("7d");
	const chart = projectReferenceRatePeriod(quote, history, pairId, period, now, yearHistory), pair = chart.pair;
	const yearEnabled = yearHistory != null || !!yearActions?.canFetch;
	const roundedMaximum = chart.maximum === null ? "" : displayReferenceRate(chart.maximum), roundedMinimum = chart.minimum === null ? "" : displayReferenceRate(chart.minimum);
	const axisCollision = chart.maximum !== null && chart.minimum !== null && chart.maximum !== chart.minimum && roundedMaximum === roundedMinimum;
	(0, import_react$3.useEffect)(() => {
		const node = dialog.current;
		if (node && !node.open) node.showModal();
		return () => {
			if (node?.open) node.close();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("dialog", {
		ref: dialog,
		className: "reference-rate-details",
		"aria-labelledby": id,
		onCancel: (event) => {
			event.preventDefault();
			close();
		},
		onClose: () => {
			if (!dialog.current?.open) close();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("h2", {
				id,
				children: [label, " 상세 추이"]
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				onClick: close,
				autoFocus: true,
				"aria-label": "환율 상세 닫기",
				children: "닫기"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "reference-rate-periods",
				role: "group",
				"aria-label": "환율 추이 기간",
				children: REFERENCE_RATE_PERIODS.map(([value, text]) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
					type: "button",
					"aria-pressed": period === value,
					"aria-describedby": value === "1y" ? `${id}-limit` : void 0,
					disabled: value === "1y" && !yearEnabled,
					onClick: () => {
						if (value === "1y" && !yearEnabled) return;
						setPeriod(value);
						if (value === "1y" && yearHistory == null && yearActions?.canFetch && !yearActions.busy && !yearActions.blocked && !yearActions.error) yearActions.load();
					},
					children: text
				}, value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", {
				id: `${id}-limit`,
				className: "reference-detail-meta",
				children: [chart.source === "year" ? "연간 원천 · 실제 제공 범위" : period === "1y" ? "연간 자료 미조회" : "90일 원천만 제공", chart.availableStart && ` · ${chart.availableStart}–${chart.availableEnd}`]
			}),
			period === "1y" && yearActions?.busy && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
				role: "status",
				children: "연간 추이 불러오는 중"
			}),
			period === "1y" && yearActions?.error && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
				role: "alert",
				children: yearActions.error
			}),
			period === "1y" && yearActions?.blocked ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				disabled: yearActions.busy,
				onClick: yearActions.reload,
				children: "연간 저장값 다시 읽기"
			}) : period === "1y" && yearActions?.canFetch && (yearActions.error || [
				"history_behind",
				"stale",
				"empty",
				"unsupported"
			].includes(chart.status)) && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("button", {
				type: "button",
				disabled: yearActions.busy,
				onClick: yearActions.load,
				children: "연간 추이 다시 불러오기"
			}),
			chart.status !== "ready" ? chart.status === "unsupported" && period === "1y" && yearActions?.canFetch ? null : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
				role: "status",
				children: period === "1y" && chart.status === "unsupported" ? "선택한 기간의 자료가 없습니다." : messages[chart.status]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", {
					className: "reference-detail-unit",
					children: [
						pair.baseAmount,
						" ",
						pair.base,
						"당 ",
						pair.quote,
						" · ECB 일별 참고율"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", {
					className: "reference-detail-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
							dateTime: chart.start,
							children: chart.start
						}),
						"–",
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
							dateTime: chart.end,
							children: chart.end
						}),
						" · UTC"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("svg", {
					className: "reference-rate-detail-chart",
					viewBox: "0 0 640 280",
					role: "img",
					"aria-label": `${label} 상세 일별 추이`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("title", { children: `${pair.baseAmount} ${pair.base}당 ${pair.quote} · ${chart.start}–${chart.end} · 누락일 연결 없음` }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("text", {
							x: "24",
							y: "18",
							children: [
								axisCollision ? chart.maximum : roundedMaximum,
								" ",
								pair.quote
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("text", {
							x: "24",
							y: "274",
							children: [
								axisCollision ? chart.minimum : roundedMinimum,
								" ",
								pair.quote
							]
						}),
						chart.segments.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("polyline", { points }, i)),
						chart.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("circle", {
							cx: point.x,
							cy: point.y,
							r: "2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("title", { children: `${point.date} · ${pair.baseAmount} ${pair.base} = ${point.value} ${pair.quote}` })
						}, point.date))
					]
				}),
				chart.points.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
					role: "status",
					children: "관측 1개 · 추이 미확인"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", {
					className: "reference-detail-meta",
					children: "누락 날짜는 연결하지 않습니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("details", {
					className: "reference-detail-values",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("summary", { children: "날짜별 원문 값" }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("ul", { children: chart.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("time", {
						dateTime: point.date,
						children: point.date
					}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("span", { children: [
						point.value,
						" ",
						pair.quote
					] })] }, point.date)) })]
				})
			] })
		]
	});
}
var import_react$3, import_jsx_runtime$5, messages;
function init_ReferenceRateDetails() {
	return (init_ReferenceRateDetails = __esmMin((() => {
		import_react$3 = require_react();
		init_referenceRatePeriod();
		init_reference_rate_details();
		import_jsx_runtime$5 = require_jsx_runtime();
		messages = {
			empty: "선택한 기간의 자료가 없습니다.",
			invalid: "과거 자료 확인 필요",
			mismatch: "현재 값과 과거 자료가 일치하지 않습니다.",
			history_behind: "과거 자료의 기준일이 더 이전입니다. 추이를 다시 불러오세요.",
			stale: "오래된 자료 · 최신 추이 미확인",
			unsupported: "90일 원천만 제공",
			ready: ""
		};
	})))();
}
/** Separate optional history; the v1 quote/cache contract remains unchanged.
* Each observation must pass the existing source/ratio/unit/date validator.
* Calendar-day gaps are not bridged, even across non-publication days.
*/
function referenceRateTrends(quote, input, now) {
	const day = Date.parse(quote.sourceDate + "T00:00:00Z");
	let comparisonDate = "";
	let history = [];
	try {
		history = historyQuotes(decodeReferenceHistory(input, now));
		if (!history.some((p) => p.sourceDate === quote.sourceDate)) throw Error();
		const seen = /* @__PURE__ */ new Set();
		for (const point of history) {
			if (seen.has(point.sourceDate) || point.sourceDate > quote.sourceDate) throw Error();
			seen.add(point.sourceDate);
			if (point.sourceDate === quote.sourceDate && point.pairs.some((p, i) => p.value === null ? quote.pairs[i].value !== null : quote.pairs[i].value === null || decimal(p.value) !== decimal(quote.pairs[i].value))) throw Error();
		}
		history = history.filter((p) => p.sourceDate !== quote.sourceDate).concat(quote).sort((a, b) => a.sourceDate.localeCompare(b.sourceDate));
	} catch {
		history = [];
	}
	comparisonDate = history.filter((p) => p.sourceDate < quote.sourceDate).at(-1)?.sourceDate ?? "";
	return Object.fromEntries(quote.pairs.map((pair, index) => {
		const previous = history.find((p) => p.sourceDate === comparisonDate)?.pairs[index].value;
		const result = {
			direction: "unknown",
			change: null,
			percent: null,
			comparisonDate,
			segments: [],
			dates: []
		};
		if (pair.value !== null && previous != null) {
			const difference = decimal(pair.value) - decimal(previous), abs = difference < 0n ? -difference : difference;
			result.direction = difference > 0n ? "gain" : difference < 0n ? "loss" : "flat";
			const sign = difference > 0n ? "+" : difference < 0n ? "−" : "";
			result.change = sign + (abs === 0n ? "0" : displayReferenceRate(raw(abs)));
			const denominator = decimal(previous), numerator = abs * 10000n;
			let hundredths = numerator / denominator;
			const remainder = numerator % denominator;
			if (remainder * 2n > denominator || remainder * 2n === denominator && hundredths % 2n !== 0n) hundredths++;
			result.percent = sign + (abs > 0n && hundredths === 0n ? "<0.01" : `${hundredths / 100n}.${(hundredths % 100n).toString().padStart(2, "0")}`) + "%";
		}
		const points = history.filter((p) => Date.parse(p.sourceDate + "T00:00:00Z") >= day - 29 * DAY$1);
		const values = points.flatMap((p) => p.pairs[index].value === null ? [] : [decimal(p.pairs[index].value)]);
		if (values.length >= 2) {
			const min = values.reduce((a, b) => a < b ? a : b), max = values.reduce((a, b) => a > b ? a : b);
			const start = Date.parse(points[0].sourceDate + "T00:00:00Z");
			let segment = [], last = -Infinity;
			const flush = () => {
				if (segment.length >= 2) result.segments.push(segment.join(" "));
				segment = [];
			};
			for (const point of points) {
				const value = point.pairs[index].value, t = Date.parse(point.sourceDate + "T00:00:00Z");
				if (value === null) {
					flush();
					last = -Infinity;
					continue;
				}
				if (t - last !== DAY$1) flush();
				const x = 2 + (t - start) / Math.max(DAY$1, day - start) * 92;
				const y = max === min ? 16 : 28 - Number((decimal(value) - min) * 24000n / (max - min)) / 1e3;
				segment.push(`${x},${y}`);
				result.dates.push(point.sourceDate);
				last = t;
			}
			flush();
		}
		return [pair.id, result];
	}));
}
var DAY$1, SCALE, decimal, raw;
function init_referenceRateHistory() {
	return (init_referenceRateHistory = __esmMin((() => {
		init_referenceHistory();
		DAY$1 = 864e5;
		SCALE = 10n ** 12n;
		decimal = (value) => {
			const [a, b = ""] = value.split(".");
			return BigInt(a) * SCALE + BigInt(b.padEnd(12, "0"));
		};
		raw = (value) => `${value / SCALE}.${(value % SCALE).toString().padStart(12, "0")}`;
	})))();
}
/** Shared passive layout only. Provider admission remains in ReferenceRatesTable. */
function ReferenceRateRows({ rows, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("dl", {
		className: "reference-rates",
		children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			"data-reference-pair": p.id,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("dt", { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("button", {
				type: "button",
				"aria-haspopup": "dialog",
				"aria-label": `${p.label} 상세 추이`,
				onClick: (event) => onOpen(p.id, event.currentTarget),
				children: p.label
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
				className: "reference-rate-trend",
				children: p.segments.length ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("svg", {
					viewBox: "0 0 96 32",
					role: "img",
					"aria-label": `${p.label} 일별 추이`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("title", { children: p.trendTitle }), p.segments.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("polyline", { points }, i))]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: "추이 미확인" })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("dd", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("span", {
					className: "reference-rate-current",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("strong", {
						title: p.valueTitle,
						children: p.value
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
						className: "reference-rate-unit",
						children: p.unit
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "reference-rate-change",
					"data-direction": p.direction,
					children: p.change
				}),
				p.comparison !== null && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "reference-rate-comparison",
					children: p.comparison
				})
			] })]
		}, p.id))
	});
}
/** Passive public-data view. Rendering never fetches or accesses a financial account. */
function ReferenceRatesTable({ quote, now, error, history, yearHistory, yearActions }) {
	const [detail, setDetail] = (0, import_react$2.useState)(null), opener = (0, import_react$2.useRef)(null);
	const closeDetails = () => {
		yearActions?.cancel();
		setDetail(null);
		opener.current?.focus();
	};
	let data = null, invalid = false;
	if (quote !== null) try {
		data = decodeReferenceRates(quote, now);
	} catch {
		invalid = true;
	}
	if (history != null) try {
		const latest = historyQuotes(decodeReferenceHistory(history, now)).at(-1);
		if (!data || latest.sourceDate > data.sourceDate) data = latest;
	} catch {}
	const trends = data ? referenceRateTrends(data, history, now) : {};
	const pairs = data?.pairs ?? REFERENCE_PAIRS.map(([id, base, quote, baseAmount]) => ({
		id,
		base,
		quote,
		baseAmount,
		value: null
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("section", {
		className: "market-indicators reference-rates-table",
		"aria-label": "ECB 참고환율",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("header", {
				className: "reference-rates-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", { children: "환율" }), data ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("p", {
					className: "market-fx-caption",
					title: `출처 ${data.sourceUrl}\nEUR 기준 원천율로 계산 · 거래용 아님\n관측 ${data.observedAt}`,
					children: [
						"ECB · ",
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("time", {
							dateTime: data.sourceDate,
							children: data.sourceDate
						}),
						" 기준 · 일별 참고율",
						now - Date.parse(data.sourceDate + "T00:00:00Z") >= 6048e5 ? " · 오래된 자료" : ""
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
					className: "market-fx-caption",
					children: invalid ? "참고환율 확인 필요" : "참고환율 미조회"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "reference-rate-groups",
				children: [{
					name: "원화 기준",
					pairs: pairs.filter((p) => p.quote === "KRW")
				}, {
					name: "교차환율",
					pairs: pairs.filter((p) => p.quote !== "KRW")
				}].map((group) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "reference-rate-group",
					role: "group",
					"aria-label": group.name,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h3", { children: group.name }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ReferenceRateRows, {
						rows: group.pairs.map((p) => ({
							id: p.id,
							label: labels[p.id],
							value: p.value === null ? "—" : displayReferenceRate(p.value),
							valueTitle: p.value === null ? "미확인" : `${p.baseAmount} ${p.base} = ${p.value} ${p.quote}`,
							unit: units[p.quote],
							segments: trends[p.id]?.segments ?? [],
							trendTitle: trends[p.id]?.segments.length ? `${trends[p.id].dates[0]}–${data.sourceDate} · 최근 30일 관측 · 누락일 연결 없음` : "",
							direction: trends[p.id]?.direction ?? "unknown",
							change: trends[p.id]?.change != null ? `${trends[p.id].change} ${units[p.quote]} (${trends[p.id].percent})` : "등락 미확인",
							comparison: trends[p.id]?.change != null ? `${trends[p.id].comparisonDate} 발표 대비` : null
						})),
						onOpen: (id, button) => {
							opener.current = button;
							setDetail(id);
						}
					})]
				}, group.name))
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("p", {
				role: "alert",
				children: error
			}),
			detail && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ReferenceRateDetails, {
				pairId: detail,
				label: labels[detail],
				quote: data,
				history,
				now,
				yearHistory,
				yearActions,
				onClose: closeDetails
			})
		]
	});
}
var import_react$2, import_jsx_runtime$4, labels, units;
function init_ReferenceRatesTable() {
	return (init_ReferenceRatesTable = __esmMin((() => {
		init_reference_rates_table();
		import_react$2 = require_react();
		init_ReferenceRateDetails();
		init_referenceRates();
		init_referenceRateHistory();
		init_referenceHistory();
		import_jsx_runtime$4 = require_jsx_runtime();
		labels = {
			usdkrw: "달러/원",
			jpykrw100: "100엔/원",
			cnykrw: "위안/원",
			eurkrw: "유로/원",
			gbpkrw: "파운드/원",
			eurusd: "유로/달러",
			usdjpy: "달러/엔"
		};
		units = {
			KRW: "원",
			USD: "달러",
			JPY: "엔"
		};
	})))();
}
function init_sentiment_dial() {
	return (init_sentiment_dial = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/sentiment-dial.css?v=source-build-r123";
			document.head.appendChild(l);
		}
	})))();
}
/** Shared geometry only: VIX retains its raw value and its own display scale. */
function Dial({ value, label, volatility = false, syntheticClassification = false }) {
	const known = value !== null && Number.isFinite(value) && value >= 0 && (volatility || value <= 100);
	const maximum = volatility ? 80 : 100;
	const overflow = known && value > maximum;
	const bands = volatility ? volatilityBands : sentimentBands;
	const band = known ? bands.findIndex((item) => item.inclusive ? Math.min(value, maximum) <= item.end : Math.min(value, maximum) < item.end) : -1;
	const active = band >= 0 ? bands[band] : null;
	const state = !known ? "미확인" : volatility ? overflow ? "척도 초과" : "변동성" : syntheticClassification ? active.label : "";
	const description = !known ? "미확인" : volatility ? `${value} · 표시 척도 0–80${overflow ? " · 척도 초과" : ""}` : `${value} / 100 · 0 공포, 100 탐욕${syntheticClassification ? ` · ${state} · 예시 구간, 공식 분류 아님` : ""}`;
	const [x, y] = point(known ? Math.min(value, maximum) / maximum * 100 : 0, 54);
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: `sentiment-dial-control${volatility ? " volatility-dial" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("svg", {
				className: "sentiment-dial",
				viewBox: "0 -26 180 112",
				tabIndex: 0,
				role: volatility || !known ? "img" : "meter",
				"aria-label": volatility || !known ? `${label}: ${description}` : label,
				"aria-valuemin": !volatility && known ? 0 : void 0,
				"aria-valuemax": !volatility && known ? 100 : void 0,
				"aria-valuenow": !volatility && known ? value : void 0,
				"aria-valuetext": !volatility && known ? description : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("g", {
					"aria-hidden": "true",
					children: [
						bands.map(({ start, end, color }, index) => {
							const [sx, sy] = point(start / maximum * 100, 64), [ex, ey] = point(end / maximum * 100, 64);
							return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("path", {
								className: `sentiment-dial__arc sentiment-dial__arc--${index}`,
								stroke: color,
								"data-start": start,
								"data-end": end,
								d: `M ${sx} ${sy} A 64 64 0 0 1 ${ex} ${ey}`
							}, start);
						}),
						ticks.map((tick) => {
							const [x1, y1] = point(tick, 59), [x2, y2] = point(tick, 69), [tx, ty] = point(tick, 80);
							return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
								className: "sentiment-dial__tick",
								x1,
								y1,
								x2,
								y2
							}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("text", {
								className: "sentiment-dial__scale",
								x: tx,
								y: ty + 3,
								children: tick / 100 * maximum
							})] }, tick);
						}),
						known && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("line", {
							className: "sentiment-dial__needle",
							stroke: active?.color,
							x1: 90,
							y1: 74,
							x2: x,
							y2: y
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "sentiment-dial__value",
				"aria-hidden": "true",
				children: known ? value : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "sentiment-dial-state",
				"data-band": !known ? "unknown" : volatility ? "volatility" : band,
				style: { color: active?.color },
				children: state
			})
		]
	});
}
/** Display-only 0–100 sentiment score. Not a VIX normalizer. */
function SentimentDial(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Dial, { ...props });
}
/** Raw volatility index on a display scale, not a bounded sentiment meter. */
function VolatilityDial(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Dial, {
		...props,
		volatility: true
	});
}
var import_jsx_runtime$3, ticks, sentimentBands, volatilityBands, point;
function init_SentimentDial() {
	return (init_SentimentDial = __esmMin((() => {
		init_sentiment_dial();
		import_jsx_runtime$3 = require_jsx_runtime();
		ticks = [
			0,
			25,
			50,
			75,
			100
		];
		sentimentBands = [
			{
				start: 0,
				end: 25,
				label: "극도 공포",
				color: "#5276d2"
			},
			{
				start: 25,
				end: 45,
				label: "공포",
				color: "#8299dc"
			},
			{
				start: 45,
				end: 55,
				label: "중립",
				color: "#c7ad75",
				inclusive: true
			},
			{
				start: 55,
				end: 75,
				label: "탐욕",
				color: "#df8a55"
			},
			{
				start: 75,
				end: 100,
				label: "극도 탐욕",
				color: "#dd5c61",
				inclusive: true
			}
		];
		volatilityBands = [
			"#8c9ca7",
			"#a6a49a",
			"#c3ad7c",
			"#d69a59"
		].map((color, index) => ({
			start: index * 20,
			end: (index + 1) * 20,
			color,
			label: "변동성",
			inclusive: index === 3
		}));
		point = (value, radius) => {
			const angle = value * Math.PI / 100;
			return [Number((90 - radius * Math.cos(angle)).toFixed(6)), Number((74 - radius * Math.sin(angle)).toFixed(6))];
		};
	})))();
}
function init_fear_greed_details() {
	return (init_fear_greed_details = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/fear-greed-details.css?v=source-build-r123";
			document.head.appendChild(l);
		}
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
	const [clock, setClock] = (0, import_react$1.useState)(now);
	(0, import_react$1.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("time", {
		dateTime: nextUpdateAt,
		"aria-live": "off",
		title: nextUpdateAt,
		children: fearUpdateCountdown(nextUpdateAt, clock)
	});
}
var import_react$1, import_jsx_runtime$2;
function init_BitcoinUpdateCountdown() {
	return (init_BitcoinUpdateCountdown = __esmMin((() => {
		import_react$1 = require_react();
		import_jsx_runtime$2 = require_jsx_runtime();
	})))();
}
/** Pure presentation of an existing Bitcoin quote; no owner, timer or transport. */
function FearGreedGauge({ quote, now, previous = false }) {
	const problem = quoteProblem(quote, now);
	const usable = !problem && quote;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: "fear-gauge",
		"data-sentiment": usable ? quote.classification : void 0,
		children: [usable && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
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
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
					className: "fear-gauge-track",
					cx: "36",
					cy: "36",
					r: "32"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
					className: "fear-gauge-progress",
					cx: "36",
					cy: "36",
					r: "32",
					pathLength: "100",
					strokeDasharray: `${quote.value} 100`,
					transform: "rotate(-90 36 36)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("text", {
					x: "36",
					y: "36",
					dy: ".35em",
					textAnchor: "middle",
					className: "fear-gauge-score",
					children: quote.value
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "fear-gauge-info",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", { children: "비트코인 공포·탐욕" }), usable ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
				className: "fear-gauge-state",
				children: FEAR_LABELS[quote.classification]
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
				className: "fear-meta",
				children: [
					previous ? "이전 값 · " : "",
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("time", {
						dateTime: quote.asOf,
						children: [quote.asOf.slice(0, 10), " UTC"]
					}),
					previous || fearQuoteIsStale(quote, now) ? " · 오래된 자료" : ""
				]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
				role: problem ? "alert" : void 0,
				children: problem ?? "아직 불러온 값이 없습니다."
			})]
		})]
	});
}
var import_jsx_runtime$1;
function init_FearGreedGauge() {
	return (init_FearGreedGauge = __esmMin((() => {
		init_fearGreed();
		init_fearGreedHistory();
		init_fear_greed_details();
		import_jsx_runtime$1 = require_jsx_runtime();
	})))();
}
function FearGreedHistoryChart({ rows, period = "all" }) {
	const bounds = historyBounds(rows, period);
	if (!bounds) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "선택한 기간의 자료가 없습니다." });
	const visible = historyWindow(rows, period);
	const dateLabel = (time) => new Date(time).toISOString().slice(0, 10);
	const x = (r) => 12 + (Math.floor(canonicalInstant(r.asOf) / 864e5) * 864e5 - bounds.start) / Math.max(864e5, bounds.end - bounds.start) * 456;
	const y = (r) => 112 - r.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fear-history-plot",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "fear-history-chart",
			viewBox: "-36 0 516 136",
			role: "img",
			"aria-label": "비트코인 일별 공포·탐욕 추이. 값 0–100. 0은 극도의 공포, 100은 극도의 탐욕. 누락 날짜는 선을 끊어 표시합니다.",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "값 0–100 · 0은 극도의 공포, 100은 극도의 탐욕" }),
				[
					0,
					50,
					100
				].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					className: "fear-history-grid",
					x1: "12",
					x2: "468",
					y1: 112 - value,
					y2: 112 - value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "4",
					y: 117 - value,
					textAnchor: "end",
					children: value
				})] }, value)),
				historySegments(visible).map((segment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: segment.map((r) => `${x(r)},${y(r)}`).join(" ") }, segment[0].asOf)),
				visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x(r),
					cy: y(r),
					r: "2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${r.asOf} · ${r.value} · ${FEAR_LABELS[r.classification]}` })
				}, r.asOf)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "12",
					y: "132",
					textAnchor: "start",
					children: dateLabel(bounds.start)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "468",
					y: "132",
					textAnchor: "end",
					children: dateLabel(bounds.end)
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "fear-history-values",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "날짜별 값 · UTC" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"aria-label": "원천 날짜별 공포·탐욕 값",
			children: visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
				dateTime: r.asOf,
				children: r.asOf
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
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
	const [expanded, setExpanded] = (0, import_react.useState)(false), [period, setPeriod] = (0, import_react.useState)("7d");
	const id = (0, import_react.useId)();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "fear-details",
		"aria-label": "비트코인 공포·탐욕 상세",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fear-overview",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FearGreedGauge, {
					quote,
					now,
					previous: behindHistory
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fear-comparisons",
					children: [
						(!quote || problem) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "fear-meta",
							children: "현재 미확인"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "fear-summary",
							children: [
								anchor && !usableQuote ? "최근 자료" : "현재",
								"어제",
								"지난주",
								"지난달"
							].map((label, index) => index === 0 && usableQuote ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [label, index === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: " · 30일 전" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: summary[index] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary[index].value }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: FEAR_LABELS[summary[index].classification] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
									dateTime: summary[index].asOf,
									children: [summary[index].asOf.slice(0, 10), " UTC"]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "미확인" }) })] }, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "fear-meta",
							children: usableQuote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BitcoinUpdateCountdown, {
								nextUpdateAt: quote.nextUpdateAt,
								now
							}) : "다음 업데이트 · 미확인"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-expanded": expanded,
							"aria-controls": id,
							onClick: () => setExpanded(!expanded),
							children: expanded ? "추이 닫기" : "추이 보기"
						})
					]
				})]
			}),
			behindHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: "현재 값과 과거 자료를 함께 갱신해 주세요."
			}),
			stale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "오래된 자료 · 최신 원천일 기준"
			}),
			[...new Set([
				error,
				historyError,
				invalid
			].filter(Boolean))].map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: message
			}, message)),
			expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fear-periods",
						role: "group",
						"aria-label": "과거 그래프 기간",
						children: FEAR_PERIODS.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": period === value,
							onClick: () => setPeriod(value),
							children: label
						}, value))
					}),
					historyGraphAvailable(rows.length, historyError, invalid) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FearGreedHistoryChart, {
						rows: history,
						period
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "과거 그래프를 확인할 수 없습니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fear-meta",
						children: "최신 원천일 기준 · 누락 날짜는 연결하지 않습니다. 지난달 비교는 30일 전입니다."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
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
var import_react, import_jsx_runtime;
function init_FearGreedDetails() {
	return (init_FearGreedDetails = __esmMin((() => {
		import_react = require_react();
		init_BitcoinUpdateCountdown();
		init_fearGreed();
		init_FearGreedGauge();
		init_fearGreedHistory();
		init_fear_greed_details();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
function init_market_page() {
	return (init_market_page = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-page.css?v=source-build-r123";
			document.head.appendChild(l);
		}
	})))();
}
export { init_referenceHistory as A, REFERENCE_YEAR_HISTORY_KEY as C, MAX_REFERENCE_HISTORY_BYTES as D, writeReferenceYearHistory as E, isOldFx as F, readFx as I, writeFx as L, readReferenceRates as M, writeReferenceRates as N, REFERENCE_HISTORY_KEY as O, init_referenceFx as P, init_market_widgets as R, init_referenceRateDisplay as S, readReferenceYearHistory as T, ReferenceRateRows as _, displayClockInstant as a, init_reference_rate_details as b, FEAR_SOURCE as c, fearQuoteIsStale as d, init_fearGreed as f, init_SentimentDial as g, VolatilityDial as h, canonicalInstant as i, init_referenceRates as j, decodeReferenceHistory as k, FearGreedReader as l, SentimentDial as m, FearGreedDetails as n, init_fearGreedHistory as o, init_fear_greed_details as p, init_FearGreedDetails as r, FEAR_LABELS as s, init_market_page as t, coalescedFearRequest as u, ReferenceRatesTable as v, init_referenceYearHistory as w, displayReferenceRate as x, init_ReferenceRatesTable as y };
