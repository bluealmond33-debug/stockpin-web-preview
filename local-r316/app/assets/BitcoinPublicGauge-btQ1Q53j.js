import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
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
	const expectedHistoryUrl = isCurrent ? "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml" : "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml?c9f643aaf3c0366fa38e615a51f7b960";
	if (h.sourceUrl !== expectedHistoryUrl || h.sourceAsOfInstant !== null || h.interval !== "daily-reference" || h.baseCurrency !== "EUR" || h.rateUnit !== "currency units per 1 EUR") return fail();
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
			sourceUrl: expectedHistoryUrl,
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
		digest = async (bytes) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(bytes)))).map((v) => v.toString(16).padStart(2, "0")).join("");
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
function object(v, keys) {
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
	const p = object(strictJson(raw), [
		"name",
		"data",
		"metadata"
	]);
	if (p.name !== "Fear and Greed Index" || object(p.metadata, ["error"]).error !== null || !Array.isArray(p.data) || p.data.length < 1 || p.data.length > (mode === "latest" ? 1 : 2e4)) bad();
	let previous = "9999-99-99", nextUpdateAt = null;
	const rows = p.data.map((v, index) => {
		const hasTtl = !!v && typeof v === "object" && Object.hasOwn(v, "time_until_update");
		const r = object(v, [
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
function init_BitcoinPublicGauge() {
	return (init_BitcoinPublicGauge = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/public-reference/bitcoin-public/BitcoinPublicGauge.css?v=source-build-r50080";
			document.head.appendChild(l);
		}
	})))();
}
export { init_adapter as a, ECB_HISTORY_URL as c, PUBLIC_REFERENCE_PAIRS as d, admitReviewedEcbLicense as f, projectPublicReference as h, bitcoinProps as i, ECB_TERMS_URL as l, init_contract as m, BITCOIN_HISTORY_URL as n, updateBitcoinState as o, decodePublicReferenceRelease as p, BITCOIN_LATEST_URL as r, ECB_DAILY_URL as s, init_BitcoinPublicGauge as t, PUBLIC_MARKET_AVAILABILITY as u };
