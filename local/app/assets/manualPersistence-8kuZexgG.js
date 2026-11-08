import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { a as init_portfolio, r as compareDecimalStrings, t as addDecimalStrings } from "./portfolio-X9IQ81xQ.js";
function object$1(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function exactKeys(value, expected) {
	return Object.keys(value).length === expected.length && expected.every((key) => Object.hasOwn(value, key));
}
function date(value) {
	return typeof value === "string" && /^(?!0000)\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
function instant(value) {
	if (typeof value !== "string") return false;
	const match = /^(\d{4}-\d{2}-\d{2})T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.exec(value);
	return !!match && date(match[1]) && Number.isFinite(Date.parse(value));
}
function sourceClock(value) {
	return value === null || instant(value) || typeof value === "string" && /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value);
}
function timezone(value) {
	if (value === null) return true;
	if (typeof value !== "string" || value.length > 80) return false;
	try {
		new Intl.DateTimeFormat("en-US", { timeZone: value });
		return true;
	} catch {
		return false;
	}
}
function decimal(value) {
	if (value === null) return true;
	if (typeof value !== "string" || value.length > 256 || !/^(0|[1-9]\d*)(\.\d+)?$/.test(value)) return false;
	return compareDecimalStrings(value, "0") >= 0;
}
/** Rejects unknown/raw fields; validation does not prove an observation came from a broker. */
function assessTradeObservation(input) {
	const fail = (reason) => ({
		ok: false,
		reason
	});
	if (!object$1(input) || !exactKeys(input, keys)) return fail("invalid_shape");
	if (input.source !== "toss_orders" && input.source !== "kiwoom_kt00009") return fail("unsupported_source");
	if (input.unit !== (input.source === "toss_orders" ? "order_aggregate" : "unresolved")) return fail("source_unit_mismatch");
	if (![
		input.accountRef,
		input.recordRef,
		input.instrumentRef
	].every((v) => typeof v === "string" && uuid$1.test(v))) return fail("invalid_identity");
	if (!["live", "paper"].includes(input.environment) || !["KRW", "USD"].includes(input.currency) || !["BUY", "SELL"].includes(input.side)) return fail("invalid_shape");
	if (!decimal(input.filledQuantity) || !decimal(input.price)) return fail("invalid_decimal");
	if (!object$1(input.sourceTime) || !exactKeys(input.sourceTime, [
		"value",
		"meaning",
		"timezone"
	])) return fail("invalid_shape");
	const time = input.sourceTime;
	if (![
		"last_execution",
		"execution",
		"order_created",
		"processed",
		"unknown"
	].includes(time.meaning)) return fail("invalid_shape");
	if (input.unit === "order_aggregate" && time.meaning === "execution") return fail("source_time_mismatch");
	if (input.sourceBusinessDate !== null && !date(input.sourceBusinessDate) || !instant(input.observedAt) || !sourceClock(time.value) || !timezone(time.timezone)) return fail("invalid_time");
	const tradeId = `trade:v1:${JSON.stringify([
		input.source,
		input.unit,
		input.environment,
		input.accountRef,
		input.recordRef
	])}`;
	const observation = Object.freeze({
		...input,
		sourceTime: Object.freeze({ ...time })
	});
	return {
		ok: true,
		value: Object.freeze({
			tradeId,
			observation,
			fillState: observation.filledQuantity === null ? "unknown_fill" : compareDecimalStrings(observation.filledQuantity, "0") === 0 ? "no_fill" : "filled",
			sourceExecutionInstantPresent: ["last_execution", "execution"].includes(observation.sourceTime.meaning) && instant(observation.sourceTime.value)
		})
	};
}
function sameFacts(a, b) {
	const facts = ({ observation: o }) => JSON.stringify([
		o.source,
		o.unit,
		o.environment,
		o.accountRef,
		o.recordRef,
		o.instrumentRef,
		o.currency,
		o.side,
		o.filledQuantity === null ? null : addDecimalStrings(o.filledQuantity, "0"),
		o.price === null ? null : addDecimalStrings(o.price, "0"),
		o.sourceBusinessDate,
		o.sourceTime.meaning,
		o.sourceTime.value,
		o.sourceTime.timezone
	]);
	return facts(a) === facts(b);
}
/** Same-ID changed facts need a reviewed correction; receipt order never wins. */
function reconcileTradeObservation(records, incoming) {
	const result = assessTradeObservation(incoming);
	if (!result.ok) return {
		state: "invalid",
		reason: result.reason,
		records
	};
	const existing = records.filter((value) => value.tradeId === result.value.tradeId);
	if (!existing.length) return {
		state: "added",
		records: [...records, result.value]
	};
	return {
		state: existing.length === 1 && sameFacts(existing[0], result.value) ? "duplicate" : "conflict",
		records
	};
}
var keys, uuid$1;
function init_tradeProvenance() {
	return (init_tradeProvenance = __esmMin((() => {
		init_portfolio();
		keys = [
			"source",
			"unit",
			"environment",
			"accountRef",
			"recordRef",
			"instrumentRef",
			"currency",
			"side",
			"filledQuantity",
			"price",
			"sourceBusinessDate",
			"sourceTime",
			"observedAt"
		];
		uuid$1 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
	})))();
}
function draftBlock(row, context) {
	const checked = assessTradeObservation(row.trade.observation);
	if (!checked.ok || checked.value.tradeId !== row.trade.tradeId || checked.value.observation.source !== "toss_orders" || checked.value.observation.environment !== "live" || checked.value.observation.unit !== "order_aggregate" || !Number.isSafeInteger(row.conflictCount) || row.conflictCount < 0 || !Number.isSafeInteger(row.duplicateCount) || row.duplicateCount < 0) return "invalid_trade";
	if (row.conflictCount > 0) return "changed_facts";
	if (checked.value.fillState !== "filled") return "no_fill";
	if (context.linkedTradeIds.includes(checked.value.tradeId)) return "already_linked";
	if (context.coverage === "error") return "observation_error";
	return null;
}
function validRecordDate(value) {
	return /^(?!0000)\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
function prepareDraftCandidate(row, date, context) {
	const blocked = draftBlock(row, context);
	if (blocked) throw new Error(blocked);
	if (!validRecordDate(date)) throw new Error("invalid_date");
	const checked = assessTradeObservation(row.trade.observation);
	if (!checked.ok) throw new Error("invalid_trade");
	return Object.freeze({
		tradeId: checked.value.tradeId,
		observation: checked.value.observation,
		recordDate: Object.freeze({
			value: date,
			basis: "user_selected"
		})
	});
}
function init_draft() {
	return (init_draft = __esmMin((() => {
		init_tradeProvenance();
	})))();
}
/** Header preflight only. Full pixels must subsequently decode and normalize to PNG. */
function jpegDimensions(bytes) {
	if (bytes[0] !== 255 || bytes[1] !== 216) throw new Error("JPEG signature");
	for (let at = 2; at < bytes.length;) {
		if (bytes[at++] !== 255) throw new Error("JPEG marker");
		while (bytes[at] === 255) at++;
		const marker = bytes[at++];
		if (marker === void 0 || marker === 0 || marker === 218 || marker === 217 || marker === 216 || marker === 1 || marker >= 208 && marker <= 215) throw new Error("JPEG frame missing");
		if (at + 2 > bytes.length) throw new Error("JPEG segment");
		const length = bytes[at] << 8 | bytes[at + 1];
		if (length < 2 || at + length > bytes.length) throw new Error("JPEG segment");
		if (marker === 192 || marker === 194) {
			const h = bytes[at + 3] << 8 | bytes[at + 4], w = bytes[at + 5] << 8 | bytes[at + 6], components = bytes[at + 7];
			if (length < 11 || length !== 8 + 3 * components || bytes[at + 2] !== 8 || ![1, 3].includes(components) || !w || !h || w > 2048 || h > 2048) throw new Error("JPEG dimensions or format");
			return {
				w,
				h
			};
		}
		if (marker >= 192 && marker <= 207 && ![
			196,
			200,
			204
		].includes(marker)) throw new Error("JPEG frame format");
		at += length;
	}
	throw new Error("JPEG frame missing");
}
/** Conservative still-HEIC preflight, before any pixel decoder runs.
* Accept one primary hvc1 image only, not grids, sequences or derived images.
* Unknown containers are not recursively interpreted as boxes. No decompression.
*/
function heicDimensions(bytes) {
	if (bytes.length < 24 || bytes.length > 262144) throw new Error("HEIC size");
	const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	const text = (at, n) => String.fromCharCode(...bytes.subarray(at, at + n));
	const dimensions = [];
	let boxes = 0, meta = 0, images = 0;
	function walk(start, end, parent) {
		for (let at = start; at < end;) {
			if (++boxes > 256 || end - at < 8) throw new Error("HEIC boxes");
			let n = view.getUint32(at);
			const kind = text(at + 4, 4);
			if (n === 1 && parent === "root" && kind === "mdat" && end - at >= 16) {
				if (view.getUint32(at + 8) !== 0) throw new Error("HEIC box size");
				n = view.getUint32(at + 12);
				if (n < 16) throw new Error("HEIC box size");
			}
			if (n < 8 || n > end - at) throw new Error("HEIC box size");
			const next = at + n;
			if (parent === "root") {
				if (at === 0) {
					if (kind !== "ftyp" || n < 24 || n % 4) throw new Error("HEIC brand");
					const brands = [text(at + 8, 4)];
					for (let i = at + 16; i < next; i += 4) brands.push(text(i, 4));
					if (!brands.includes("heic") || brands.some((b) => [
						"hevc",
						"hevx",
						"msf1",
						"avis"
					].includes(b))) throw new Error("HEIC still required");
				} else if (kind === "meta") {
					if (++meta !== 1 || n < 12 || view.getUint32(at + 8) !== 0) throw new Error("HEIC meta");
					walk(at + 12, next, kind);
				} else if (![
					"mdat",
					"free",
					"skip"
				].includes(kind)) throw new Error("HEIC container");
			} else if (parent === "meta" && kind === "iprp" || parent === "iprp" && kind === "ipco") walk(at + 8, next, kind);
			else if (parent === "meta" && kind === "iinf") {
				if (n < 14 || view.getUint32(at + 8) !== 0) throw new Error("HEIC items");
				walk(at + 14, next, kind);
			} else if (parent === "iinf") {
				if (kind !== "infe" || n < 21 || bytes[at + 8] !== 2 || view.getUint16(at + 14) !== 0) throw new Error("HEIC item");
				const type = text(at + 16, 4);
				if (type === "hvc1") images++;
				else if (!["Exif", "mime"].includes(type)) throw new Error("HEIC derived image unsupported");
			} else if (parent === "ipco" && kind === "ispe") {
				if (n !== 20 || view.getUint32(at + 8) !== 0) throw new Error("HEIC dimensions");
				const w = view.getUint32(at + 12), h = view.getUint32(at + 16);
				if (!w || !h || w > 2048 || h > 2048) throw new Error("HEIC dimensions");
				dimensions.push({
					w,
					h
				});
			}
			at = next;
		}
	}
	walk(0, bytes.length, "root");
	if (meta !== 1 || images !== 1 || dimensions.length !== 1) throw new Error("HEIC single image required");
	return dimensions;
}
function pngDimensions(bytes) {
	if (bytes.length < 33 || ![
		137,
		80,
		78,
		71,
		13,
		10,
		26,
		10
	].every((b, i) => bytes[i] === b)) throw new Error("PNG required");
	const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	const w = view.getUint32(16), h = view.getUint32(20);
	if (!w || !h || w > 2048 || h > 2048) throw new Error("image dimensions");
	return {
		w,
		h
	};
}
/** Construct only local PNG data URLs, never a stored URL/path or HTML. */
function imageSource(image) {
	if (typeof image.hex !== "string" || image.hex.length > 524288 || !/^(?:[0-9a-f]{2})+$/.test(image.hex)) return;
	const bytes = Uint8Array.from(image.hex.match(/../g), (b) => parseInt(b, 16));
	try {
		pngDimensions(bytes);
	} catch {
		return;
	}
	let raw = "";
	for (const b of bytes) raw += String.fromCharCode(b);
	return `data:image/png;base64,${btoa(raw)}`;
}
/** Read only the explicitly selected bounded PNG/JPEG/still HEIC. Re-encode pixels, discard metadata. */
async function readImageFile(file, signal) {
	signal?.throwIfAborted();
	if (!file.size || file.size > 262144 || ![
		"image/png",
		"image/jpeg",
		"image/heic",
		"image/heif"
	].includes(file.type) && !(file.type === "" && /\.hei[cf]$/i.test(file.name))) throw new Error("image file");
	const bytes = new Uint8Array(await file.arrayBuffer());
	signal?.throwIfAborted();
	if (bytes.length !== file.size) throw new Error("image size");
	const jpeg = file.type === "image/jpeg";
	const heic = [
		"image/heic",
		"image/heif",
		""
	].includes(file.type);
	const { w, h } = heic ? heicDimensions(bytes)[0] : jpeg ? jpegDimensions(bytes) : pngDimensions(bytes);
	const inputView = new DataView(bytes.buffer);
	for (let at = 8; !jpeg && !heic && at + 12 <= bytes.length;) {
		const n = inputView.getUint32(at);
		if (n > bytes.length - at - 12) throw new Error("PNG chunk");
		if (String.fromCharCode(...bytes.slice(at + 4, at + 8)) === "acTL") throw new Error("animated PNG");
		at += 12 + n;
	}
	let selectedPixels = "";
	for (const b of bytes) selectedPixels += String.fromCharCode(b);
	{
		const image = new Image();
		const stopDecode = () => {
			image.src = "";
		};
		signal?.addEventListener("abort", stopDecode, { once: true });
		try {
			image.src = `data:${heic ? "image/heic" : file.type};base64,${btoa(selectedPixels)}`;
			await image.decode();
		} finally {
			signal?.removeEventListener("abort", stopDecode);
		}
		signal?.throwIfAborted();
		if (!(image.naturalWidth === w && image.naturalHeight === h) && !((jpeg || heic) && image.naturalWidth === h && image.naturalHeight === w)) throw new Error("image dimensions");
		const canvas = document.createElement("canvas");
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("image canvas");
		ctx.drawImage(image, 0, 0);
		const raw = atob(canvas.toDataURL("image/png").split(",")[1]);
		const encoded = Uint8Array.from(raw, (c) => c.charCodeAt(0));
		const parts = [...encoded.slice(0, 8)];
		const view = new DataView(encoded.buffer);
		for (let at = 8; at + 12 <= encoded.length;) {
			const n = view.getUint32(at);
			if (n > encoded.length - at - 12) throw new Error("PNG chunk");
			const kind = String.fromCharCode(...encoded.slice(at + 4, at + 8));
			if ([
				"IHDR",
				"IDAT",
				"IEND"
			].includes(kind)) {
				if (parts.length + n + 12 > 262144) throw new Error("normalized image size");
				for (const byte of encoded.subarray(at, at + 12 + n)) parts.push(byte);
			}
			at += 12 + n;
		}
		if (parts.length > 262144) throw new Error("normalized image size");
		return {
			name: Array.from(file.name).map((c) => c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127 || c === "/" || c === "\\" ? "_" : c).join("").slice(0, 40) || "image.png",
			hex: parts.map((b) => b.toString(16).padStart(2, "0")).join("")
		};
	}
}
function init_images() {
	return (init_images = __esmMin((() => {})))();
}
function readManualAttachments(value) {
	if (!Array.isArray(value) || value.length > 1) throw Error("attachment count");
	return Object.freeze(value.map((v) => {
		if (!v || typeof v !== "object" || Object.keys(v).length !== 2 || typeof v.name !== "string" || !v.name || new TextEncoder().encode(v.name).length > 160 || Array.from(v.name).some((c) => {
			const n = c.codePointAt(0);
			return n < 32 || n >= 127 && n <= 159 || c === "/" || c === "\\";
		}) || typeof v.hex !== "string" || v.hex.length > 524288 || !/^(?:[0-9a-f]{2})+$/.test(v.hex)) throw Error("attachment invalid");
		const bytes = Uint8Array.from(v.hex.match(/../g), (x) => parseInt(x, 16));
		if (!signature.every((b, i) => bytes[i] === b)) throw Error("attachment PNG");
		const view = new DataView(bytes.buffer);
		let at = 8, header = false, pixels = false, ended = false;
		while (at + 12 <= bytes.length) {
			const n = view.getUint32(at);
			if (n > bytes.length - at - 12) throw Error("attachment chunk");
			const kind = String.fromCharCode(...bytes.subarray(at + 4, at + 8));
			let crc = 4294967295;
			for (const b of bytes.subarray(at + 4, at + 8 + n)) {
				crc ^= b;
				for (let i = 0; i < 8; i++) crc = crc >>> 1 ^ (crc & 1 ? 3988292384 : 0);
			}
			if (~crc >>> 0 !== view.getUint32(at + 8 + n)) throw Error("attachment CRC");
			if (!header && kind !== "IHDR") throw Error("attachment header");
			if (kind === "IHDR") {
				if (header || n !== 13) throw Error("attachment header");
				const w = view.getUint32(at + 8), h = view.getUint32(at + 12);
				if (!w || !h || w > 2048 || h > 2048 || bytes[at + 16] !== 8 || ![2, 6].includes(bytes[at + 17]) || bytes[at + 18] || bytes[at + 19] || bytes[at + 20]) throw Error("attachment size");
				header = true;
			} else if (kind === "IDAT") pixels = true;
			else if (kind === "IEND") {
				if (n || !pixels || at + 12 !== bytes.length) throw Error("attachment end");
				ended = true;
			} else throw Error("attachment chunk");
			at += n + 12;
		}
		if (!ended) throw Error("attachment incomplete");
		return Object.freeze({
			name: v.name,
			hex: v.hex
		});
	}));
}
async function readManualImage(file) {
	return readManualAttachments([await readImageFile(file)])[0];
}
var signature, sameManualAttachments;
function init_manualAttachments() {
	return (init_manualAttachments = __esmMin((() => {
		init_images();
		signature = [
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		];
		sameManualAttachments = (a, b) => (a?.length ?? 0) === (b?.length ?? 0) && (a ?? []).every((v, i) => v.name === b[i].name && v.hex === b[i].hex);
	})))();
}
function readCalendarLink(value) {
	const fail = () => {
		throw Error("invalid_calendar_link");
	};
	if (!value || typeof value !== "object" || Array.isArray(value)) return fail();
	const v = value;
	if (Object.keys(v).sort().join(",") !== "day,eventId,source,title,version,when" || v.version !== 1) return fail();
	for (const [key, max] of [
		["source", 80],
		["eventId", 2048],
		["title", 640]
	]) {
		const s = v[key];
		if (typeof s !== "string" || !s.trim() || new TextEncoder().encode(s).length > max || Array.from(s).some((c) => c.charCodeAt(0) < 32)) return fail();
	}
	if (typeof v.day !== "string" || !validRecordDate(v.day)) return fail();
	if (!v.when || typeof v.when !== "object" || Array.isArray(v.when)) return fail();
	const w = v.when;
	if (w.kind === "date") {
		if (Object.keys(w).sort().join(",") !== "date,kind" || typeof w.date !== "string" || !validRecordDate(w.date)) return fail();
	} else if (w.kind === "instant") {
		if (Object.keys(w).sort().join(",") !== "at,kind,timeZone" || typeof w.at !== "string" || typeof w.timeZone !== "string" || w.timeZone.length > 80) return fail();
		try {
			if (new Date(w.at).toISOString() !== w.at) return fail();
			new Intl.DateTimeFormat("en", { timeZone: w.timeZone }).format(new Date(w.at));
		} catch {
			return fail();
		}
	} else return fail();
	return Object.freeze({
		version: 1,
		source: v.source,
		eventId: v.eventId,
		title: v.title,
		day: v.day,
		when: Object.freeze(w.kind === "date" ? {
			kind: "date",
			date: w.date
		} : {
			kind: "instant",
			at: w.at,
			timeZone: w.timeZone
		})
	});
}
var calendarLinkKey;
function init_calendarLink() {
	return (init_calendarLink = __esmMin((() => {
		init_draft();
		calendarLinkKey = (link) => JSON.stringify([link.source, link.eventId]);
	})))();
}
/** Opaque local preservation, not PDF parsing, sanitization or a safety scan.
* Never render the bytes or create a viewer URL. Metadata remains in the backup.
*/
async function readPdfFile(file) {
	if (!file.size || file.size > 262144 || !["", "application/pdf"].includes(file.type)) throw new Error("PDF file");
	const bytes = new Uint8Array(await file.arrayBuffer());
	if (bytes.length !== file.size || bytes.length < 14 || bytes.length > 262144) throw new Error("PDF size");
	if (!new TextDecoder().decode(bytes.subarray(0, 9)).match(/^%PDF-(?:1\.[0-7]|2\.0)[\r\n]$/)) throw new Error("PDF header");
	let end = bytes.length;
	while (end && [
		0,
		9,
		10,
		12,
		13,
		32
	].includes(bytes[end - 1])) end--;
	if (new TextDecoder().decode(bytes.subarray(end - 5, end)) !== "%%EOF") throw new Error("PDF end");
	return {
		name: Array.from(file.name).map((c) => c.charCodeAt(0) < 32 || c.charCodeAt(0) >= 127 && c.charCodeAt(0) <= 159 || c === "/" || c === "\\" ? "_" : c).slice(0, 40).join("") || "document.pdf",
		hex: Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
	};
}
function init_pdfs() {
	return (init_pdfs = __esmMin((() => {})))();
}
/** Opaque bytes only. No PDF parser, viewer URL, sanitization or metadata removal. */
function readManualPdfs(value) {
	if (!Array.isArray(value) || value.length > 1) throw Error("PDF count");
	return Object.freeze(value.map((v) => {
		if (!v || typeof v !== "object" || Array.isArray(v)) throw Error("PDF object");
		const r = v;
		if (Object.keys(r).length !== 2 || typeof r.name !== "string" || !r.name || new TextEncoder().encode(r.name).length > 160 || Array.from(r.name).some((c) => /[/\\]/.test(c) || c.codePointAt(0) < 32 || c.codePointAt(0) >= 127 && c.codePointAt(0) <= 159) || typeof r.hex !== "string" || r.hex.length > 524288 || !/^(?:[0-9a-f]{2})+$/.test(r.hex)) throw Error("PDF value");
		const bytes = Uint8Array.from(r.hex.match(/../g), (x) => parseInt(x, 16));
		if (bytes.length < 14 || !/^%PDF-(?:1\.[0-7]|2\.0)[\r\n]$/.test(new TextDecoder().decode(bytes.subarray(0, 9)))) throw Error("PDF header");
		let end = bytes.length;
		while (end && [
			0,
			9,
			10,
			12,
			13,
			32
		].includes(bytes[end - 1])) end--;
		if (new TextDecoder().decode(bytes.subarray(end - 5, end)) !== "%%EOF") throw Error("PDF end");
		return Object.freeze({
			name: r.name,
			hex: r.hex
		});
	}));
}
async function readManualPdf(file) {
	return readManualPdfs([await readPdfFile(file)])[0];
}
function checkManualMediaCount(images, pdfs) {
	if ((images?.length ?? 0) + (pdfs?.length ?? 0) > 1) throw Error("attachment count");
}
function init_manualPdfs() {
	return (init_manualPdfs = __esmMin((() => {
		init_pdfs();
	})))();
}
/** Existing journal plain strings/UTF-8 limits; no coercion, truncation or date inference. */
function manualDraftErrors(draft) {
	const errors = {};
	const encoder = new TextEncoder();
	if (encoder.encode(draft.title).length > 640) errors.title = "제목을 조금 줄여 주세요. 입력은 그대로 유지됩니다.";
	if (encoder.encode(draft.body).length > 8e4) errors.body = "본문이 너무 깁니다. 입력은 그대로 유지됩니다.";
	if (draft.recordDate && !validRecordDate(draft.recordDate)) errors.recordDate = "날짜를 YYYY-MM-DD 형식으로 확인해 주세요.";
	const { attachments, pdfs, ...text } = draft;
	if (encoder.encode(JSON.stringify(text)).length + 400 > 131072 || encoder.encode(JSON.stringify(draft)).length + 400 > 655360) errors.body = "본문 전송 한도(128KiB) 또는 첨부 포함 한도(640KiB)를 넘었습니다. 입력은 유지됩니다. 본문을 줄이거나 첨부를 제거해 주세요.";
	return errors;
}
function init_manualDraft() {
	return (init_manualDraft = __esmMin((() => {
		init_draft();
		init_manualAttachments();
	})))();
}
function readManualTradeLink(value) {
	const link = object(value, [
		"kind",
		"tradeId",
		"observation"
	]);
	const assessed = assessTradeObservation(link.observation);
	if (!assessed.ok || link.kind !== "toss_order_aggregate_v1" || link.tradeId !== assessed.value.tradeId || assessed.value.fillState !== "filled") return reject();
	const o = assessed.value.observation;
	if (o.source !== "toss_orders" || o.environment !== "live" || o.unit !== "order_aggregate" || o.sourceBusinessDate !== null || o.sourceTime.meaning !== "last_execution" || o.sourceTime.timezone !== "Asia/Seoul") return reject();
	return Object.freeze({
		kind: "toss_order_aggregate_v1",
		tradeId: assessed.value.tradeId,
		observation: o
	});
}
function sameTradeLink(a, b) {
	if (!a || !b) return a === b;
	return a.kind === b.kind && a.tradeId === b.tradeId && [
		"source",
		"unit",
		"environment",
		"accountRef",
		"recordRef",
		"instrumentRef",
		"currency",
		"side",
		"filledQuantity",
		"price",
		"sourceBusinessDate",
		"observedAt"
	].every((key) => a.observation[key] === b.observation[key]) && [
		"value",
		"meaning",
		"timezone"
	].every((key) => a.observation.sourceTime[key] === b.observation.sourceTime[key]);
}
function reject() {
	throw new Error("invalid_response");
}
function object(value, keys) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return reject();
	const record = value;
	if (Object.keys(record).length !== keys.length || keys.some((key) => !Object.hasOwn(record, key))) return reject();
	return record;
}
function wellFormed(value) {
	for (const character of value) {
		const point = character.codePointAt(0);
		if (point >= 55296 && point <= 57343) return false;
	}
	return true;
}
function text(value, max) {
	if (typeof value !== "string" || !wellFormed(value) || bytes(value) > max) return reject();
	return value;
}
function timestamp(value) {
	const v = text(value, 40);
	if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,9})?Z$/.test(v) || !validRecordDate(v.slice(0, 10)) || !Number.isFinite(Date.parse(v))) return reject();
	const [hour, minute, second] = v.slice(11, 19).split(":").map(Number);
	if (hour > 23 || minute > 59 || second > 59) return reject();
	return v;
}
function summary(value, withBody = false) {
	const r = object(value, [
		"id",
		"title",
		"recordDate",
		"createdAt",
		"updatedAt",
		...withBody ? ["body"] : [],
		...withBody && value && typeof value === "object" && Object.hasOwn(value, "attachments") ? ["attachments"] : [],
		...withBody && value && typeof value === "object" && Object.hasOwn(value, "pdfs") ? ["pdfs"] : [],
		...value && typeof value === "object" && Object.hasOwn(value, "bookmarked") ? ["bookmarked"] : [],
		...value && typeof value === "object" && Object.hasOwn(value, "calendarLink") ? ["calendarLink"] : [],
		...value && typeof value === "object" && Object.hasOwn(value, "tradeLink") ? ["tradeLink"] : []
	]);
	const d = object(r.recordDate, ["value", "basis"]);
	if (!uuid(r.id) || typeof d.value !== "string" || !validRecordDate(d.value) || d.basis !== "user_selected") return reject();
	if (Object.hasOwn(r, "bookmarked") && typeof r.bookmarked !== "boolean") return reject();
	const result = {
		id: r.id,
		...Object.hasOwn(r, "bookmarked") ? { bookmarked: r.bookmarked } : {},
		...Object.hasOwn(r, "calendarLink") ? { calendarLink: readCalendarLink(r.calendarLink) } : {},
		...Object.hasOwn(r, "tradeLink") ? { tradeLink: readManualTradeLink(r.tradeLink) } : {},
		title: text(r.title, 640),
		recordDate: Object.freeze({
			value: d.value,
			basis: "user_selected"
		}),
		createdAt: timestamp(r.createdAt),
		updatedAt: timestamp(r.updatedAt)
	};
	if (Date.parse(result.updatedAt) < Date.parse(result.createdAt)) return reject();
	if (withBody) {
		const body = text(r.body, 8e4);
		if (!result.title.trim() && !body.trim()) return reject();
		const attachments = Object.hasOwn(r, "attachments") ? readManualAttachments(r.attachments) : void 0;
		const pdfs = Object.hasOwn(r, "pdfs") ? readManualPdfs(r.pdfs) : void 0;
		checkManualMediaCount(attachments, pdfs);
		return Object.freeze({
			...result,
			body,
			...pdfs ? { pdfs } : {},
			...Object.hasOwn(r, "attachments") ? { attachments: readManualAttachments(r.attachments) } : {}
		});
	}
	return Object.freeze(result);
}
function readManualResponse(value) {
	try {
		if (bytes(JSON.stringify(value)) > 16777216) return reject();
	} catch {
		return reject();
	}
	if (!value || typeof value !== "object") return reject();
	const kind = value.kind;
	if (kind === "uninitialized") {
		object(value, ["kind"]);
		return Object.freeze({ kind });
	}
	if (kind !== "opened" && kind !== "note" && kind !== "saved" && kind !== "linked_saved") return reject();
	const r = object(value, [
		"kind",
		"storeId",
		"revision",
		...kind !== "note" ? ["notes"] : [],
		...kind !== "opened" ? ["note"] : [],
		...kind === "linked_saved" ? ["contextState"] : []
	]);
	if (!uuid(r.storeId) || !revision(r.revision)) return reject();
	const common = {
		storeId: r.storeId,
		revision: r.revision
	};
	const note = kind !== "opened" ? summary(r.note, true) : null;
	if (kind === "note") return Object.freeze({
		kind,
		...common,
		note
	});
	if (!Array.isArray(r.notes) || r.notes.length > 256) return reject();
	const notes = Object.freeze(r.notes.map((n) => summary(n)));
	if (new Set(notes.map((n) => n.id)).size !== notes.length) return reject();
	if (kind === "opened") return Object.freeze({
		kind,
		...common,
		notes
	});
	const match = notes.find((n) => n.id === note.id);
	if (!match || !sameSummary(match, note)) return reject();
	if (kind === "linked_saved") {
		if (!note.tradeLink || r.contextState !== "current" && r.contextState !== "changed") return reject();
		return Object.freeze({
			kind,
			...common,
			note,
			notes,
			contextState: r.contextState
		});
	}
	return Object.freeze({
		kind,
		...common,
		note,
		notes
	});
}
function sameSummary(a, b) {
	return a.id === b.id && a.title === b.title && a.recordDate.value === b.recordDate.value && a.recordDate.basis === b.recordDate.basis && a.createdAt === b.createdAt && a.updatedAt === b.updatedAt && !!a.bookmarked === !!b.bookmarked && JSON.stringify(a.calendarLink) === JSON.stringify(b.calendarLink) && sameTradeLink(a.tradeLink, b.tradeLink);
}
function validManualSave(draft) {
	try {
		if (draft.attachments !== void 0) readManualAttachments(draft.attachments);
		if (draft.pdfs !== void 0) readManualPdfs(draft.pdfs);
		checkManualMediaCount(draft.attachments, draft.pdfs);
	} catch {
		return false;
	}
	return !!(draft.title.trim() || draft.body.trim()) && validRecordDate(draft.recordDate) && Object.keys(manualDraftErrors(draft)).length === 0 && wellFormed(draft.title) && wellFormed(draft.body);
}
function manualRequestWire(value) {
	const op = value.op;
	if (op === "open" || op === "open_cached" || op === "initialize") object(value, ["op"]);
	else if (op === "set_bookmark") {
		const r = object(value, [
			"op",
			"storeId",
			"expectedRevision",
			"noteId",
			"bookmarked"
		]);
		if (!uuid(r.storeId) || !revision(r.expectedRevision) || !uuid(r.noteId) || typeof r.bookmarked !== "boolean") return reject();
	} else if (op === "save_calendar") {
		const r = object(value, [
			"op",
			"storeId",
			"expectedRevision",
			"title",
			"body",
			"recordDate",
			"calendarLink",
			...Object.hasOwn(value, "attachments") ? ["attachments"] : [],
			...Object.hasOwn(value, "pdfs") ? ["pdfs"] : []
		]);
		if (!uuid(r.storeId) || !revision(r.expectedRevision) || typeof r.title !== "string" || typeof r.body !== "string" || typeof r.recordDate !== "string" || !validManualSave({
			title: r.title,
			body: r.body,
			recordDate: r.recordDate
		})) return reject();
		readCalendarLink(r.calendarLink);
		if (Object.hasOwn(r, "attachments")) readManualAttachments(r.attachments);
		if (Object.hasOwn(r, "pdfs")) readManualPdfs(r.pdfs);
		checkManualMediaCount(r.attachments, r.pdfs);
	} else if (op === "read" || op === "save") {
		const r = object(value, [
			"op",
			"storeId",
			"expectedRevision",
			"noteId",
			...op === "save" ? [
				"title",
				"body",
				"recordDate"
			] : [],
			...op === "save" && Object.hasOwn(value, "attachments") ? ["attachments"] : [],
			...op === "save" && Object.hasOwn(value, "pdfs") ? ["pdfs"] : []
		]);
		if (!uuid(r.storeId) || !revision(r.expectedRevision) || !(uuid(r.noteId) || op === "save" && r.noteId === null)) return reject();
		if (op === "save") {
			if (Object.hasOwn(r, "attachments")) readManualAttachments(r.attachments);
			if (Object.hasOwn(r, "pdfs")) readManualPdfs(r.pdfs);
			checkManualMediaCount(r.attachments, r.pdfs);
			if (typeof r.title !== "string" || typeof r.body !== "string" || typeof r.recordDate !== "string" || !validManualSave({
				title: r.title,
				body: r.body,
				recordDate: r.recordDate
			})) return reject();
		}
	} else return reject();
	const wire = JSON.stringify(value);
	if (bytes(wire) > 655360) return reject();
	return wire;
}
function manualErrorCode(value) {
	const code = typeof value === "string" && value.startsWith("manual_journal_") ? value.slice(15) : value;
	const normalized = code === "invalid" ? "invalid_request" : code;
	return typeof normalized === "string" && codes.includes(normalized) ? normalized : "uncertain";
}
function manualErrorMessage(code, browserPreview = false) {
	if (browserPreview && [
		"corrupt",
		"limit_exceeded",
		"unavailable",
		"unsupported",
		"not_open",
		"uninitialized",
		"needs_recovery",
		"unsafe_storage",
		"uncertain"
	].includes(code)) return `${code === "corrupt" ? "이 브라우저의 일지 저장 상태를 읽지 못했습니다. 별도 웹 백업 파일이 있다면 다른 브라우저의 새 보관소에서 웹 백업을 복원해 확인하세요." : code === "limit_exceeded" ? "일지 저장 한도를 넘었습니다. 필요한 입력은 따로 보관하고 글·사진 크기를 확인하세요. 기존 글은 웹 백업으로 별도 보관할 수 있습니다." : code === "unsupported" ? "이 환경에서는 요청한 일지 작업을 지원하지 않습니다. 저장된 일지를 다시 확인하세요." : "이 브라우저의 일지 저장 상태를 읽지 못했습니다. 필요한 입력을 따로 보관한 뒤 다시 시도하세요."} 입력은 유지됩니다. 글·사진은 이 브라우저에만 비암호화로 보관됩니다. 사이트 데이터를 지우지 마세요.`;
	if (code === "invalid_request") return "입력을 처리하지 못했습니다. PNG/JPEG 파일 형식과 크기, HEIC 지원 여부 또는 PDF 형식·256KiB 한도를 확인해 주세요. 기존 초안과 첨부는 유지됩니다.";
	if (code === "duplicate_trade") return "이미 연결된 일지가 있습니다. 저장된 일지에서 확인하세요. 입력은 유지됩니다.";
	if (code === "conflict") return "다른 변경이 있습니다. 저장된 일지를 다시 확인하세요. 입력은 유지됩니다.";
	if (code === "missing_key" || code === "key_unavailable") return "일지 보관 키를 읽지 못했습니다. 입력은 유지됩니다.";
	if (code === "limit_exceeded") return "일지 저장 한도를 넘었습니다. 입력은 유지됩니다.";
	if (code === "unsupported") return "이 환경에서는 일지를 저장하거나 불러올 수 없습니다.";
	if (code === "busy") return "다른 일지 작업 중입니다. 입력은 유지됩니다. 잠시 뒤 다시 확인하세요.";
	return "저장 상태를 확인하지 못했습니다. 입력은 유지됩니다. 저장된 일지를 다시 확인하세요.";
}
var bytes, uuid, revision, codes;
function init_manualPersistence() {
	return (init_manualPersistence = __esmMin((() => {
		init_calendarLink();
		init_manualPdfs();
		init_manualAttachments();
		init_tradeProvenance();
		init_draft();
		init_manualDraft();
		bytes = (text) => new TextEncoder().encode(text).length;
		uuid = (v) => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v);
		revision = (v) => typeof v === "string" && /^(0|[1-9][0-9]{0,19})$/.test(v) && BigInt(v) <= 18446744073709551615n;
		codes = [
			"duplicate_trade",
			"unsupported",
			"invalid_request",
			"uninitialized",
			"not_open",
			"conflict",
			"missing_note",
			"missing_key",
			"key_unavailable",
			"unsafe_storage",
			"busy",
			"corrupt",
			"needs_recovery",
			"uncertain",
			"unavailable",
			"limit_exceeded"
		];
	})))();
}
export { reconcileTradeObservation as A, init_images as C, validRecordDate as D, prepareDraftCandidate as E, assessTradeObservation as O, imageSource as S, init_draft as T, readCalendarLink as _, readManualResponse as a, readManualImage as b, sameTradeLink as c, manualDraftErrors as d, init_manualPdfs as f, init_calendarLink as g, calendarLinkKey as h, manualRequestWire as i, init_tradeProvenance as k, validManualSave as l, readManualPdfs as m, manualErrorCode as n, readManualTradeLink as o, readManualPdf as p, manualErrorMessage as r, sameSummary as s, init_manualPersistence as t, init_manualDraft as u, init_manualAttachments as v, draftBlock as w, sameManualAttachments as x, readManualAttachments as y };
