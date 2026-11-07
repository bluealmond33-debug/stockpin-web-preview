import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D3ER87f6.js";
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
			l.href = "/local/app/css-source/src/features/market/reference-rates-table.css?v=source-build-r46";
			document.head.appendChild(l);
		}
	})))();
}
function readReferenceRates(s, now = Date.now()) {
	const raw = s.getItem(REFERENCE_RATES_KEY);
	if (raw === null) return null;
	try {
		if (raw.length > 16384) throw Error();
		const envelope = object$1(JSON.parse(raw));
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
function object$1(x) {
	if (!x || typeof x !== "object" || Array.isArray(x) || Object.getPrototypeOf(x) !== Object.prototype && Object.getPrototypeOf(x) !== null) throw Error();
	for (const d of Object.values(Object.getOwnPropertyDescriptors(x))) if (!("value" in d)) throw Error();
	return x;
}
function exact(x, keys) {
	if (Object.keys(x).length !== keys.length || keys.some((k) => !Object.hasOwn(x, k))) throw Error();
}
function decimal$3(x) {
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
		const x = object$1(input);
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
		const rates = object$1(x.rates), keys = Object.keys(rates);
		if (keys.length > 64 || !Object.hasOwn(rates, "USD") || !Object.hasOwn(rates, "KRW")) throw Error();
		const parsed = /* @__PURE__ */ new Map();
		for (const k of keys) {
			if (!/^[A-Z]{3}$/.test(k)) throw Error();
			const rate = decimal$3(rates[k]);
			if (k === "EUR" && rate !== 10n ** 12n) throw Error();
			parsed.set(k, rate);
		}
		parsed.set("EUR", 10n ** 12n);
		if (!Array.isArray(x.pairs) || x.pairs.length !== REFERENCE_PAIRS.length) throw Error();
		const pairs = x.pairs.map((raw, i) => {
			const p = object$1(raw);
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
			} else if (decimal$3(p.value) !== roundedRatio(b * BigInt(baseAmount), a)) throw Error();
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
function date$1(input) {
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
		const observed = Date.parse(x.observedAt), start = date$1(x.requestedStart), end = date$1(x.requestedEnd);
		if (!Number.isFinite(now) || !Number.isFinite(observed) || new Date(observed).toISOString().replace(".000Z", "Z") !== x.observedAt || observed > now || start > end || (end - start) / 864e5 >= 400 || end > observed) throw Error();
		let last = "";
		const observations = dense(x.observations, 400).map((raw) => {
			const row = record(raw, [
				"sourceDate",
				"rates",
				"pairs"
			]);
			const day = date$1(row.sourceDate);
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
	const latestDate = rows.at(-1).sourceDate, latest = new Date(date$1(latestDate));
	const boundary = new Date(date$1(latestDate));
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
		const after = selected[i - 1].sourceDate, before = selected[i].sourceDate, unobservedCalendarDays = (date$1(before) - date$1(after)) / 864e5 - 1;
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
		if (current.sourceDate !== latest.sourceDate || !useYear && keys.length !== Object.keys(current.rates).length || keys.some((k) => current.rates[k] === void 0 || decimal$2(current.rates[k]) !== decimal$2(latest.rates[k])) || current.pairs.some((p, i) => p.value === null ? latest.pairs[i].value !== null : latest.pairs[i].value === null || decimal$2(p.value) !== decimal$2(latest.pairs[i].value))) return {
			...result,
			status: "mismatch"
		};
		const index = current.pairs.findIndex((p) => p.id === pairId);
		if (index < 0) throw Error();
		result.pair = current.pairs[index];
		result.availableStart = history.observations[0].sourceDate;
		result.availableEnd = latest.sourceDate;
		const end = day(latest.sourceDate);
		if (now - end >= 7 * DAY$1) return {
			...result,
			status: "stale"
		};
		const coverage = useYear && period === "1y" ? sourceAnchoredYearCoverage(history, now) : null;
		if (coverage && !coverage.pairs[pairId]?.eligible) return result;
		const start = coverage ? day(coverage.anchorDate) : period === "7d" ? end - 6 * DAY$1 : period === "1m" ? monthStart(end, 1) : period === "3m" ? monthStart(end, 3) : -Infinity;
		const rows = history.observations.filter((row) => day(row.sourceDate) >= start);
		const valid = rows.filter((row) => row.pairs[index].value !== null);
		if (!valid.length) return result;
		result.start = valid[0].sourceDate;
		result.end = valid.at(-1).sourceDate;
		const values = valid.map((row) => row.pairs[index].value);
		result.minimum = values.reduce((a, b) => decimal$2(a) < decimal$2(b) ? a : b);
		result.maximum = values.reduce((a, b) => decimal$2(a) > decimal$2(b) ? a : b);
		const min = decimal$2(result.minimum), max = decimal$2(result.maximum), first = day(result.start), last = day(result.end);
		let segment = [], previous = -Infinity;
		const flush = () => {
			if (segment.length > 1) result.segments.push(segment.join(" "));
			segment = [];
		};
		for (const row of rows) {
			const value = row.pairs[index].value, t = day(row.sourceDate);
			if (value === null) {
				flush();
				previous = -Infinity;
				continue;
			}
			if (t - previous !== DAY$1) flush();
			const x = 24 + (t - first) / Math.max(DAY$1, last - first) * 592;
			const y = max === min ? 140 : 248 - Number((decimal$2(value) - min) * 216000n / (max - min)) / 1e3;
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
var REFERENCE_RATE_PERIODS, DAY$1, SCALE$1, decimal$2, day;
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
		DAY$1 = 864e5;
		SCALE$1 = 10n ** 12n;
		decimal$2 = (value) => {
			const [a, b = ""] = value.split(".");
			return BigInt(a) * SCALE$1 + BigInt(b.padEnd(12, "0"));
		};
		day = (date) => Date.parse(date + "T00:00:00Z");
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
			l.href = "/local/app/css-source/src/features/market/reference-rate-details.css?v=source-build-r46";
			document.head.appendChild(l);
		}
	})))();
}
/** Mounted only by an explicit row action; no transport or cache writes. */
function ReferenceRateDetails({ pairId, label, quote, history, now, onClose, yearHistory, yearActions }) {
	const dialog = (0, import_react$2.useRef)(null), closing = (0, import_react$2.useRef)(false), id = (0, import_react$2.useId)();
	const close = () => {
		if (closing.current) return;
		closing.current = true;
		if (dialog.current?.open) dialog.current.close();
		onClose();
	};
	const [period, setPeriod] = (0, import_react$2.useState)("7d");
	const chart = projectReferenceRatePeriod(quote, history, pairId, period, now, yearHistory), pair = chart.pair;
	const yearEnabled = yearHistory != null || !!yearActions?.canFetch;
	const roundedMaximum = chart.maximum === null ? "" : displayReferenceRate(chart.maximum), roundedMinimum = chart.minimum === null ? "" : displayReferenceRate(chart.minimum);
	const axisCollision = chart.maximum !== null && chart.minimum !== null && chart.maximum !== chart.minimum && roundedMaximum === roundedMinimum;
	(0, import_react$2.useEffect)(() => {
		const node = dialog.current;
		if (node && !node.open) node.showModal();
		return () => {
			if (node?.open) node.close();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("dialog", {
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
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("h2", {
				id,
				children: [label, " 상세 추이"]
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				type: "button",
				onClick: close,
				autoFocus: true,
				"aria-label": "환율 상세 닫기",
				children: "닫기"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "reference-rate-periods",
				role: "group",
				"aria-label": "환율 추이 기간",
				children: REFERENCE_RATE_PERIODS.map(([value, text]) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
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
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
				id: `${id}-limit`,
				className: "reference-detail-meta",
				children: [chart.source === "year" ? "연간 원천 · 실제 제공 범위" : period === "1y" ? "연간 자료 미조회" : "90일 원천만 제공", chart.availableStart && ` · ${chart.availableStart}–${chart.availableEnd}`]
			}),
			period === "1y" && yearActions?.busy && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				role: "status",
				children: "연간 추이 불러오는 중"
			}),
			period === "1y" && yearActions?.error && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				role: "alert",
				children: yearActions.error
			}),
			period === "1y" && yearActions?.blocked ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				type: "button",
				disabled: yearActions.busy,
				onClick: yearActions.reload,
				children: "연간 저장값 다시 읽기"
			}) : period === "1y" && yearActions?.canFetch && (yearActions.error || [
				"history_behind",
				"stale",
				"empty",
				"unsupported"
			].includes(chart.status)) && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				type: "button",
				disabled: yearActions.busy,
				onClick: yearActions.load,
				children: "연간 추이 다시 불러오기"
			}),
			chart.status !== "ready" ? chart.status === "unsupported" && period === "1y" && yearActions?.canFetch ? null : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
				role: "status",
				children: period === "1y" && chart.status === "unsupported" ? "선택한 기간의 자료가 없습니다." : messages[chart.status]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
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
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "reference-detail-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("time", {
							dateTime: chart.start,
							children: chart.start
						}),
						"–",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("time", {
							dateTime: chart.end,
							children: chart.end
						}),
						" · UTC"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("svg", {
					className: "reference-rate-detail-chart",
					viewBox: "0 0 640 280",
					role: "img",
					"aria-label": `${label} 상세 일별 추이`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("title", { children: `${pair.baseAmount} ${pair.base}당 ${pair.quote} · ${chart.start}–${chart.end} · 누락일 연결 없음` }),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("text", {
							x: "24",
							y: "18",
							children: [
								axisCollision ? chart.maximum : roundedMaximum,
								" ",
								pair.quote
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("text", {
							x: "24",
							y: "274",
							children: [
								axisCollision ? chart.minimum : roundedMinimum,
								" ",
								pair.quote
							]
						}),
						chart.segments.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("polyline", { points }, i)),
						chart.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("circle", {
							cx: point.x,
							cy: point.y,
							r: "2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("title", { children: `${point.date} · ${pair.baseAmount} ${pair.base} = ${point.value} ${pair.quote}` })
						}, point.date))
					]
				}),
				chart.points.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					role: "status",
					children: "관측 1개 · 추이 미확인"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "reference-detail-meta",
					children: "누락 날짜는 연결하지 않습니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("details", {
					className: "reference-detail-values",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("summary", { children: "날짜별 원문 값" }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", { children: chart.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("time", {
						dateTime: point.date,
						children: point.date
					}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", { children: [
						point.value,
						" ",
						pair.quote
					] })] }, point.date)) })]
				})
			] })
		]
	});
}
var import_react$2, import_jsx_runtime$2, messages;
function init_ReferenceRateDetails() {
	return (init_ReferenceRateDetails = __esmMin((() => {
		import_react$2 = require_react();
		init_referenceRatePeriod();
		init_reference_rate_details();
		import_jsx_runtime$2 = require_jsx_runtime();
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
			if (point.sourceDate === quote.sourceDate && point.pairs.some((p, i) => p.value === null ? quote.pairs[i].value !== null : quote.pairs[i].value === null || decimal$1(p.value) !== decimal$1(quote.pairs[i].value))) throw Error();
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
			const difference = decimal$1(pair.value) - decimal$1(previous), abs = difference < 0n ? -difference : difference;
			result.direction = difference > 0n ? "gain" : difference < 0n ? "loss" : "flat";
			const sign = difference > 0n ? "+" : difference < 0n ? "−" : "";
			result.change = sign + (abs === 0n ? "0" : displayReferenceRate(raw(abs)));
			const denominator = decimal$1(previous), numerator = abs * 10000n;
			let hundredths = numerator / denominator;
			const remainder = numerator % denominator;
			if (remainder * 2n > denominator || remainder * 2n === denominator && hundredths % 2n !== 0n) hundredths++;
			result.percent = sign + (abs > 0n && hundredths === 0n ? "<0.01" : `${hundredths / 100n}.${(hundredths % 100n).toString().padStart(2, "0")}`) + "%";
		}
		const points = history.filter((p) => Date.parse(p.sourceDate + "T00:00:00Z") >= day - 29 * DAY);
		const values = points.flatMap((p) => p.pairs[index].value === null ? [] : [decimal$1(p.pairs[index].value)]);
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
				if (t - last !== DAY) flush();
				const x = 2 + (t - start) / Math.max(DAY, day - start) * 92;
				const y = max === min ? 16 : 28 - Number((decimal$1(value) - min) * 24000n / (max - min)) / 1e3;
				segment.push(`${x},${y}`);
				result.dates.push(point.sourceDate);
				last = t;
			}
			flush();
		}
		return [pair.id, result];
	}));
}
var DAY, SCALE, decimal$1, raw;
function init_referenceRateHistory() {
	return (init_referenceRateHistory = __esmMin((() => {
		init_referenceHistory();
		DAY = 864e5;
		SCALE = 10n ** 12n;
		decimal$1 = (value) => {
			const [a, b = ""] = value.split(".");
			return BigInt(a) * SCALE + BigInt(b.padEnd(12, "0"));
		};
		raw = (value) => `${value / SCALE}.${(value % SCALE).toString().padStart(12, "0")}`;
	})))();
}
/** Shared passive layout only. Provider admission remains in ReferenceRatesTable. */
function ReferenceRateRows({ rows, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("dl", {
		className: "reference-rates",
		children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			"data-reference-pair": p.id,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("dt", { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				"aria-haspopup": "dialog",
				"aria-label": `${p.label} 상세 추이`,
				onClick: (event) => onOpen(p.id, event.currentTarget),
				children: p.label
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
				className: "reference-rate-trend",
				children: p.segments.length ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("svg", {
					viewBox: "0 0 96 32",
					role: "img",
					"aria-label": `${p.label} 일별 추이`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("title", { children: p.trendTitle }), p.segments.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("polyline", { points }, i))]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: "추이 미확인" })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("dd", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", {
					className: "reference-rate-current",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("strong", {
						title: p.valueTitle,
						children: p.value
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "reference-rate-unit",
						children: p.unit
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "reference-rate-change",
					"data-direction": p.direction,
					children: p.change
				}),
				p.comparison !== null && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "reference-rate-comparison",
					children: p.comparison
				})
			] })]
		}, p.id))
	});
}
/** Passive public-data view. Rendering never fetches or accesses a financial account. */
function ReferenceRatesTable({ quote, now, error, history, yearHistory, yearActions }) {
	const [detail, setDetail] = (0, import_react$1.useState)(null), opener = (0, import_react$1.useRef)(null);
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
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
		className: "market-indicators reference-rates-table",
		"aria-label": "ECB 참고환율",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", {
				className: "reference-rates-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", { children: "환율" }), data ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
					className: "market-fx-caption",
					title: `출처 ${data.sourceUrl}\nEUR 기준 원천율로 계산 · 거래용 아님\n관측 ${data.observedAt}`,
					children: [
						"ECB · ",
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("time", {
							dateTime: data.sourceDate,
							children: data.sourceDate
						}),
						" 기준 · 일별 참고율",
						now - Date.parse(data.sourceDate + "T00:00:00Z") >= 6048e5 ? " · 오래된 자료" : ""
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
					className: "market-fx-caption",
					children: invalid ? "참고환율 확인 필요" : "참고환율 미조회"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: "reference-rate-groups",
				children: [{
					name: "원화 기준",
					pairs: pairs.filter((p) => p.quote === "KRW")
				}, {
					name: "교차환율",
					pairs: pairs.filter((p) => p.quote !== "KRW")
				}].map((group) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "reference-rate-group",
					role: "group",
					"aria-label": group.name,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", { children: group.name }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ReferenceRateRows, {
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
			error && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
				role: "alert",
				children: error
			}),
			detail && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ReferenceRateDetails, {
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
var import_react$1, import_jsx_runtime$1, labels, units;
function init_ReferenceRatesTable() {
	return (init_ReferenceRatesTable = __esmMin((() => {
		init_reference_rates_table();
		import_react$1 = require_react();
		init_ReferenceRateDetails();
		init_referenceRates();
		init_referenceRateHistory();
		init_referenceHistory();
		import_jsx_runtime$1 = require_jsx_runtime();
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
function object(input) {
	if (!input || typeof input !== "object" || Array.isArray(input)) throw fail();
	return input;
}
function text(input) {
	if (typeof input !== "string" || input.length > 160 || /[\u0000-\u001f]/.test(input)) throw fail();
	return input;
}
function decimal(input) {
	if (typeof input !== "string" || !/^-?\d{1,18}(?:\.\d{1,12})?$/.test(input)) throw fail();
	return input;
}
function date(input) {
	const s = text(input);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || !Number.isFinite(Date.parse(s)) || new Date(s).toISOString().slice(0, 10) !== s || s > "2024-03-31") throw fail();
	return s;
}
function provenance(input) {
	const p = object(input);
	if (p.kind !== "synthetic" || p.source !== "stockpin-web-demo-v1" || p.fixedAsOf !== "2024-03-31" || p.live !== false || p.observedAt !== null || p.nextUpdateAt !== null || p.label !== "데모 · 고정 가상 자료") throw fail();
	return {
		kind: "synthetic",
		source: "stockpin-web-demo-v1",
		fixedAsOf: "2024-03-31",
		label: p.label,
		live: false,
		observedAt: null,
		nextUpdateAt: null
	};
}
function status(input) {
	if (![
		"ready",
		"empty",
		"error",
		"unqueried"
	].includes(String(input))) throw fail();
	return input;
}
function chart(input, small = false) {
	const c = object(input);
	if (!Array.isArray(c.points) || c.points.length > 500 || !Array.isArray(c.segments) || c.segments.length > 500) throw fail();
	let previous = "";
	return {
		points: c.points.map((raw) => {
			const p = object(raw), d = date(p.date);
			if (d <= previous) throw fail();
			previous = d;
			if (typeof p.x !== "number" || !Number.isFinite(p.x) || p.x < 0 || p.x > (small ? 96 : 640) || typeof p.y !== "number" || !Number.isFinite(p.y) || p.y < 0 || p.y > (small ? 32 : 280)) throw fail();
			return {
				date: d,
				value: decimal(p.value),
				x: p.x,
				y: p.y
			};
		}),
		segments: c.segments.map((s) => {
			if (typeof s !== "string" || s.length > 4e4 || !/^\d+(?:\.\d+)?,\d+(?:\.\d+)?(?: \d+(?:\.\d+)?,\d+(?:\.\d+)?)+$/.test(s)) throw fail();
			return s;
		}),
		minimum: c.minimum === null ? null : decimal(c.minimum),
		maximum: c.maximum === null ? null : decimal(c.maximum)
	};
}
function row(input, id, expected) {
	const r = object(input), spec = specs[id];
	if (r.id !== id || JSON.stringify([
		r.category,
		r.base,
		r.quote,
		r.baseAmount,
		r.unit
	]) !== JSON.stringify(spec) || status(r.status) !== expected) throw fail();
	if (id === "synthetic-stocks-fear-greed" && (r.label !== "주식 공포·탐욕 · 가상" || r.meaning !== "고정 가상 주식 심리 · 실제 주식 심리 아님 · 공급 미연결 · 매매 신호 아님")) throw fail();
	const comparisons = ["bitcoin-fear-greed", "synthetic-stocks-fear-greed"].includes(id) ? comparisonRows(r.comparisons, expected) : void 0;
	const value = r.value === null ? null : decimal(r.value), mini = chart(r.mini, true);
	if (expected === "ready" ? value === null || r.sourceDate !== "2024-03-31" || mini.points.at(-1)?.value !== value : value !== null || mini.points.length !== 0 || r.displayValue !== "—" || r.change !== null || r.percent !== null) throw fail();
	if (["bitcoin-fear-greed", "synthetic-stocks-fear-greed"].includes(id) && value !== null && (!/^\d+$/.test(value) || Number(value) > 100)) throw fail();
	if (![
		"gain",
		"loss",
		"flat",
		"unknown"
	].includes(String(r.direction))) throw fail();
	return {
		id,
		comparisons,
		label: text(r.label),
		category: spec[0],
		base: spec[1],
		quote: spec[2],
		baseAmount: spec[3],
		unit: spec[4],
		status: expected,
		value,
		displayValue: text(r.displayValue),
		sourceDate: r.sourceDate === null ? null : date(r.sourceDate),
		comparisonDate: r.comparisonDate === null ? null : date(r.comparisonDate),
		change: r.change === null ? null : text(r.change),
		percent: r.percent === null ? null : text(r.percent),
		direction: r.direction,
		mini,
		provenance: provenance(r.provenance),
		...r.meaning === void 0 ? {} : { meaning: text(r.meaning) }
	};
}
function comparisonRows(input, expected) {
	const specs = [
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
	];
	if (!Array.isArray(input) || input.length !== specs.length) throw fail();
	return specs.map(([key, label, date], i) => {
		const c = object(input[i]);
		if (c.key !== key || c.label !== label || c.date !== date) throw fail();
		const value = c.value === null ? null : decimal(c.value);
		if (expected === "ready" ? value === null || Number(value) < 0 || Number(value) > 100 : value !== null) throw fail();
		return {
			key,
			label,
			date,
			value
		};
	});
}
function decodeWebDemoMarket(input) {
	const m = object(input.market), s = status(m.status), p = provenance(m.provenance);
	for (const [market, raw] of Object.entries(input.snapshots ?? {})) {
		const snapshot = object(raw);
		if (![
			"kospi",
			"kosdaq",
			"sp500",
			"nasdaq"
		].includes(market) || snapshot.market !== market || snapshot.asOf !== "2024-03-31T00:00:00Z" || snapshot.sourceLabel !== "데모 · 가상 4종목 범위 (실제 지수 구성 아님)" || snapshot.sourceUrl !== "https://example.invalid/stockpin-web-demo") throw fail();
	}
	function rows(raw, ids) {
		if (!Array.isArray(raw) || raw.length !== ids.length) throw fail();
		return ids.map((id, i) => row(raw[i], id, s));
	}
	const fx = rows(m.fx, [
		"usdkrw",
		"jpykrw100",
		"cnykrw",
		"eurkrw",
		"gbpkrw",
		"eurusd",
		"usdjpy"
	]), indices = rows(m.indices, [
		"kospi",
		"kosdaq",
		"sp500",
		"nasdaq",
		"dow"
	]), stocksSentiment = row(m.stocksSentiment, "synthetic-stocks-fear-greed", s), bitcoinSentiment = row(m.bitcoinSentiment, "bitcoin-fear-greed", s), vix = row(m.vix, "vix", s);
	const series = {};
	for (const r of [
		...fx,
		...indices,
		stocksSentiment,
		bitcoinSentiment,
		vix
	]) {
		const supplied = object(input.series[r.id]);
		const periods = {};
		for (const [period] of WEB_DEMO_PERIODS) {
			const raw = object(supplied[period]), c = chart(raw);
			if (status(raw.status) !== s) throw fail();
			const pair = raw.pair === null ? null : object(raw.pair);
			if (pair && (pair.id !== r.id || pair.value !== r.value || pair.base !== r.base || pair.quote !== r.quote || pair.baseAmount !== r.baseAmount)) throw fail();
			if (s === "ready" ? c.points.length === 0 || raw.end !== p.fixedAsOf || c.points.at(-1)?.value !== r.value : c.points.length !== 0 || c.segments.length !== 0) throw fail();
			periods[period] = {
				...c,
				status: s,
				provenance: provenance(raw.provenance),
				start: raw.start === null ? null : date(raw.start),
				end: raw.end === null ? null : date(raw.end),
				availableStart: raw.availableStart === null ? null : date(raw.availableStart),
				availableEnd: raw.availableEnd === null ? null : date(raw.availableEnd)
			};
		}
		if (s === "ready") {
			for (const comparison of r.comparisons ?? []) if (periods.all.points.find((point) => point.date === comparison.date)?.value !== comparison.value) throw fail();
		}
		series[r.id] = periods;
	}
	return {
		market: {
			status: s,
			provenance: p,
			fx,
			indices,
			stocksSentiment,
			bitcoinSentiment,
			vix
		},
		series
	};
}
var WEB_DEMO_PERIODS, WEB_DEMO_CAPTION, fail, specs;
function init_WebDemoMarketModel() {
	return (init_WebDemoMarketModel = __esmMin((() => {
		WEB_DEMO_PERIODS = [
			["7d", "7일"],
			["1m", "1개월"],
			["3m", "3개월"],
			["1y", "1년"],
			["all", "전체"]
		];
		WEB_DEMO_CAPTION = "데모 · 고정 가상 자료 · 2024-03-31 가상 기준일";
		fail = () => /* @__PURE__ */ new TypeError("가상 시장 자료 확인 필요");
		specs = {
			usdkrw: [
				"fx",
				"USD",
				"KRW",
				"1",
				"원"
			],
			jpykrw100: [
				"fx",
				"JPY",
				"KRW",
				"100",
				"원"
			],
			cnykrw: [
				"fx",
				"CNY",
				"KRW",
				"1",
				"원"
			],
			eurkrw: [
				"fx",
				"EUR",
				"KRW",
				"1",
				"원"
			],
			gbpkrw: [
				"fx",
				"GBP",
				"KRW",
				"1",
				"원"
			],
			eurusd: [
				"fx",
				"EUR",
				"USD",
				"1",
				"달러"
			],
			usdjpy: [
				"fx",
				"USD",
				"JPY",
				"1",
				"엔"
			],
			kospi: [
				"index",
				null,
				null,
				null,
				"포인트"
			],
			kosdaq: [
				"index",
				null,
				null,
				null,
				"포인트"
			],
			sp500: [
				"index",
				null,
				null,
				null,
				"포인트"
			],
			nasdaq: [
				"index",
				null,
				null,
				null,
				"포인트"
			],
			dow: [
				"index",
				null,
				null,
				null,
				"포인트"
			],
			"bitcoin-fear-greed": [
				"sentiment",
				null,
				null,
				null,
				"점 / 100"
			],
			"synthetic-stocks-fear-greed": [
				"stocksSentiment",
				null,
				null,
				null,
				"점 / 100"
			],
			vix: [
				"volatility",
				null,
				null,
				null,
				"포인트"
			]
		};
	})))();
}
/** Only supplied presentation values; no source-bound decoder or request. */
function WebDemoMarketDetails({ row, series, onClose }) {
	const dialog = (0, import_react.useRef)(null), id = (0, import_react.useId)();
	const [period, setPeriod] = (0, import_react.useState)("7d");
	const chart = series[period];
	(0, import_react.useEffect)(() => {
		const node = dialog.current;
		if (node && !node.open) node.showModal();
		return () => {
			if (node?.open) node.close();
		};
	}, []);
	const close = () => {
		dialog.current?.close();
		onClose();
	};
	const displayUnit = row.unit === "포인트" ? "pt" : row.unit;
	const unit = row.category === "fx" ? `${row.baseAmount} ${row.base}당 ${row.quote}` : displayUnit;
	const maximum = chart.maximum === null ? "" : displayReferenceRate(chart.maximum), minimum = chart.minimum === null ? "" : displayReferenceRate(chart.minimum);
	const collision = chart.maximum !== chart.minimum && maximum === minimum;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dialog", {
		ref: dialog,
		className: "reference-rate-details web-demo-market-details",
		"aria-labelledby": id,
		onCancel: (event) => {
			event.preventDefault();
			close();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id,
				children: [row.label, " 상세 추이"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				autoFocus: true,
				onClick: close,
				"aria-label": `${row.label} 상세 닫기`,
				children: "닫기"
			})] }),
			row.meaning && !row.meaning.includes("고정 가상") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "reference-detail-meta",
				children: row.meaning
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "reference-rate-periods",
				role: "group",
				"aria-label": `${row.label} 추이 기간`,
				children: WEB_DEMO_PERIODS.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": period === value,
					onClick: () => setPeriod(value),
					children: label
				}, value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "reference-detail-unit",
				children: unit
			}),
			chart.status !== "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: chart.status === "error" ? "가상 자료 확인 실패" : chart.status === "unqueried" ? "가상 자료 미조회" : "선택한 기간의 가상 자료가 없습니다."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "reference-detail-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							dateTime: chart.start,
							children: chart.start
						}),
						"–",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							dateTime: chart.end,
							children: chart.end
						}),
						" · UTC"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "reference-rate-detail-chart",
					"data-direction": row.direction,
					viewBox: "0 0 640 280",
					role: "img",
					"aria-label": `${row.label} 일별 추이`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${row.label} · ${unit} · ${chart.start}–${chart.end} · ${WEB_DEMO_CAPTION}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: "24",
							y: "18",
							children: [
								collision ? chart.maximum : maximum,
								" ",
								displayUnit
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: "24",
							y: "274",
							children: [
								collision ? chart.minimum : minimum,
								" ",
								displayUnit
							]
						}),
						chart.segments.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points }, i)),
						chart.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: point.x,
							cy: point.y,
							r: "2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${point.date} · ${point.value} ${row.unit} · 가상` })
						}, point.date))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "reference-detail-values",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "날짜별 값" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: chart.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						dateTime: point.date,
						children: point.date
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						point.value,
						" ",
						displayUnit
					] })] }, point.date)) })]
				})
			] })
		]
	});
}
var import_react, import_jsx_runtime;
function init_WebDemoMarketDetails() {
	return (init_WebDemoMarketDetails = __esmMin((() => {
		import_react = require_react();
		init_WebDemoMarketModel();
		init_reference_rate_details();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
export { isOldFx as C, init_referenceFx as S, writeFx as T, decodeReferenceHistory as _, init_WebDemoMarketModel as a, readReferenceRates as b, init_ReferenceRatesTable as c, REFERENCE_YEAR_HISTORY_KEY as d, init_referenceYearHistory as f, REFERENCE_HISTORY_KEY as g, MAX_REFERENCE_HISTORY_BYTES as h, decodeWebDemoMarket as i, displayReferenceRate as l, writeReferenceYearHistory as m, init_WebDemoMarketDetails as n, ReferenceRateRows as o, readReferenceYearHistory as p, WEB_DEMO_CAPTION as r, ReferenceRatesTable as s, WebDemoMarketDetails as t, init_referenceRateDisplay as u, init_referenceHistory as v, readFx as w, writeReferenceRates as x, init_referenceRates as y };
