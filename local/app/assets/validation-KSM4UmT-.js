import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function calendarLink(v) {
	if (!v || !Object.hasOwn(v, "version")) fail("unsupported");
	keys(v, [
		"version",
		"source",
		"eventId",
		"title",
		"day",
		"when"
	]);
	if (v.version !== 1) fail("unsupported");
	for (const [k, max] of [
		["source", 80],
		["eventId", 2048],
		["title", 640]
	]) {
		text(v[k], max);
		if (!v[k].trim() || /[\x00-\x1f]/.test(v[k])) fail();
	}
	date(v.day);
	const w = v.when;
	if (w?.kind === "date") {
		keys(w, ["kind", "date"]);
		date(w.date);
	} else if (w?.kind === "instant") {
		keys(w, [
			"kind",
			"at",
			"timeZone"
		]);
		text(w.at, 40);
		text(w.timeZone, 320);
		if (w.timeZone.length > 80) fail();
		try {
			if (new Date(w.at).toISOString() !== w.at) fail();
			new Intl.DateTimeFormat("en", { timeZone: w.timeZone }).format(new Date(w.at));
		} catch {
			fail();
		}
	} else fail();
	return v;
}
function init_calendar() {
	return (init_calendar = __esmMin((() => {
		init_validation();
	})))();
}
function richBundle(v) {
	if (!v || !Object.hasOwn(v, "document")) fail("unsupported");
	keys(v, ["document", "assets"]);
	if (!Array.isArray(v.assets) || v.assets.length > 4) fail();
	const assets = /* @__PURE__ */ new Set();
	for (const a of v.assets) {
		keys(a, [
			"id",
			"name",
			"hex"
		]);
		identity(a.id);
		if (assets.has(a.id)) fail();
		assets.add(a.id);
		attachments([{
			name: a.name,
			hex: a.hex
		}]);
	}
	const d = v.document;
	keys(d, ["version", "blocks"], ["rows"]);
	if (d.version !== 1 && d.version !== 2) fail("unsupported");
	keys(d, d.version === 1 ? ["version", "blocks"] : [
		"version",
		"blocks",
		"rows"
	]);
	if (!Array.isArray(d.blocks) || d.blocks.length > 256) fail();
	const ids = /* @__PURE__ */ new Set(), used = /* @__PURE__ */ new Set();
	let length = 0;
	const add = (v) => {
		identity(v);
		if (ids.has(v)) fail();
		ids.add(v);
	};
	for (const b of d.blocks) {
		if (!b || typeof b !== "object" || Array.isArray(b)) fail();
		add(b.id);
		if (b.type === "text") {
			keys(b, [
				"id",
				"type",
				"text"
			]);
			text(b.text, 8e4);
			length += b.text.length;
		} else if (b.type === "image") {
			keys(b, [
				"id",
				"type",
				"assetId",
				"width",
				"align",
				"caption"
			]);
			identity(b.assetId);
			if (!assets.has(b.assetId) || !Number.isInteger(b.width) || b.width < 1 || b.width > 100 || ![
				"left",
				"center",
				"right"
			].includes(b.align)) fail();
			text(b.caption, 4e3);
			if (b.caption.length > 1e3) fail();
			length += b.caption.length;
			used.add(b.assetId);
		} else fail("unsupported");
	}
	if (length > 2e4 || [...assets].some((id) => !used.has(id))) fail();
	if (d.version === 2) {
		if (!Array.isArray(d.rows) || d.rows.length > 64) fail();
		const members = /* @__PURE__ */ new Set();
		let end = -1;
		for (const row of d.rows) {
			keys(row, [
				"id",
				"type",
				"columns"
			]);
			add(row.id);
			if (row.type !== "row" || !Array.isArray(row.columns) || row.columns.length !== 2) fail();
			const order = [];
			for (const col of row.columns) {
				keys(col, [
					"id",
					"type",
					"blockIds"
				]);
				add(col.id);
				if (col.type !== "column" || !Array.isArray(col.blockIds) || !col.blockIds.length || col.blockIds.length > 256) fail();
				for (const id of col.blockIds) {
					identity(id);
					if (members.has(id) || !d.blocks.some((b) => b.id === id)) fail();
					members.add(id);
					order.push(id);
				}
			}
			const start = d.blocks.findIndex((b) => b.id === order[0]);
			if (start <= end || order.some((id, i) => d.blocks[start + i]?.id !== id)) fail();
			end = start + order.length - 1;
		}
	}
	if (bytes(JSON.stringify(v)) > 3145728) fail("limit_exceeded");
	return v;
}
var identity, richText;
function init_rich() {
	return (init_rich = __esmMin((() => {
		init_validation();
		identity = (v) => {
			if (typeof v !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(v)) fail();
			return v;
		};
		richText = (v) => v.document.blocks.map((b) => b.type === "image" ? "￼" : b.text).join("\n");
	})))();
}
function text(v, max) {
	if (typeof v !== "string" || bytes(v) > max || [...v].some((c) => {
		const n = c.codePointAt(0);
		return n >= 55296 && n <= 57343;
	})) fail();
	return v;
}
function uuid(v) {
	if (typeof v !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v)) fail();
	return v;
}
function revision(v) {
	if (typeof v !== "string" || !/^(0|[1-9][0-9]{0,19})$/.test(v) || BigInt(v) > 18446744073709551615n) fail();
	return v;
}
function increment(v) {
	if (v === "18446744073709551615") fail("limit_exceeded");
	return String(BigInt(v) + 1n);
}
function date(v) {
	text(v, 10);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || v.slice(0, 4) === "0000") fail();
	const d = /* @__PURE__ */ new Date(v + "T00:00:00Z");
	if (!Number.isFinite(+d) || d.toISOString().slice(0, 10) !== v) fail();
	return v;
}
function keys(v, required, optional = []) {
	if (!v || typeof v !== "object" || Array.isArray(v)) fail();
	const ks = Reflect.ownKeys(v);
	if (required.some((k) => !Object.hasOwn(v, k)) || ks.some((k) => !required.includes(k) && !optional.includes(k))) fail();
}
function plainCopy(v, depth = 0, seen = /* @__PURE__ */ new Set(), budget = { nodes: 0 }, scope = "request") {
	const nodeLimit = scope === "state" ? 2720032 : 1e4;
	if (depth > 20 || ++budget.nodes > nodeLimit) fail();
	if (v === null || typeof v === "boolean") return v;
	if (typeof v === "string") {
		text(v, 655360);
		return v;
	}
	if (typeof v === "number") {
		if (!Number.isFinite(v)) fail();
		return v;
	}
	if (typeof v !== "object" || seen.has(v)) fail();
	const array = Array.isArray(v), proto = Object.getPrototypeOf(v);
	if (proto !== (array ? Array.prototype : Object.prototype) && !(proto === null && !array)) fail();
	const descriptors = Object.getOwnPropertyDescriptors(v), ks = Reflect.ownKeys(descriptors);
	if (array && (v.length > 1e4 || ks.length !== v.length + 1)) fail();
	seen.add(v);
	const out = array ? [] : {};
	for (const k of ks) {
		if (array && k === "length") continue;
		const d = descriptors[k];
		if (typeof k !== "string" || !d.enumerable || !Object.hasOwn(d, "value") || [
			"__proto__",
			"constructor",
			"prototype"
		].includes(k)) fail();
		if (array && (!/^(0|[1-9][0-9]*)$/.test(k) || Number(k) >= v.length)) fail();
		out[k] = plainCopy(d.value, depth + 1, seen, budget, scope);
	}
	seen.delete(v);
	return out;
}
function attachments(v) {
	if (!Array.isArray(v) || v.length > 1) fail();
	for (const p of v) {
		keys(p, ["name", "hex"]);
		text(p.name, 160);
		if (!p.name || /[\x00-\x1f\x7f-\x9f/\\]/.test(p.name)) fail();
		if (typeof p.hex !== "string" || p.hex.length > 524288 || !/^(?:[0-9a-f]{2})+$/.test(p.hex)) fail();
		const b = Uint8Array.from(p.hex.match(/../g), (s) => parseInt(s, 16));
		if (![
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		].every((n, i) => b[i] === n)) fail();
		const view = new DataView(b.buffer);
		let at = 8, header = false, pixels = false, ended = false;
		while (at + 12 <= b.length) {
			const n = view.getUint32(at);
			if (n > b.length - at - 12) fail();
			const kind = String.fromCharCode(...b.subarray(at + 4, at + 8));
			let crc = 4294967295;
			for (const x of b.subarray(at + 4, at + 8 + n)) {
				crc ^= x;
				for (let i = 0; i < 8; i++) crc = crc >>> 1 ^ (crc & 1 ? 3988292384 : 0);
			}
			if (~crc >>> 0 !== view.getUint32(at + 8 + n) || !header && kind !== "IHDR") fail();
			if (kind === "IHDR") {
				if (header || n !== 13) fail();
				const w = view.getUint32(at + 8), h = view.getUint32(at + 12);
				if (!w || !h || w > 2048 || h > 2048 || b[at + 16] !== 8 || ![2, 6].includes(b[at + 17]) || b[at + 18] || b[at + 19] || b[at + 20]) fail();
				header = true;
			} else if (kind === "IDAT") pixels = true;
			else if (kind === "IEND") {
				if (n || !pixels || at + 12 !== b.length) fail();
				ended = true;
			} else fail();
			at += n + 12;
		}
		if (!ended) fail();
	}
	return v;
}
function temporaryData(d) {
	keys(d, [
		"title",
		"body",
		"recordDate",
		"attachments",
		"pdfs",
		"content",
		"calendarLink",
		"tradeContext"
	]);
	text(d.title, 640);
	text(d.body, 8e4);
	text(d.recordDate, 64);
	attachments(d.attachments);
	if (!Array.isArray(d.pdfs)) fail();
	if (d.tradeContext !== null || d.pdfs.length) fail("unsupported");
	if (d.calendarLink !== null) calendarLink(d.calendarLink);
	if (d.content !== null) {
		richBundle(d.content);
		if (d.attachments.length) fail();
	}
}
function validateRequest(input) {
	const r = plainCopy(input);
	keys(r, ["op"], Object.keys(r ?? {}).filter((k) => k !== "op"));
	text(r.op, 64);
	if ([
		"open",
		"open_cached",
		"initialize"
	].includes(r.op)) keys(r, ["op"]);
	else if (r.op === "save_rich") {
		if (!Object.hasOwn(r, "content")) fail("unsupported");
		keys(r, [
			"op",
			"storeId",
			"expectedRevision",
			"noteId",
			"title",
			"recordDate",
			"content"
		], ["calendarLink"]);
		if (Object.hasOwn(r, "calendarLink")) {
			calendarLink(r.calendarLink);
			if (r.noteId !== null) fail();
		}
		uuid(r.storeId);
		revision(r.expectedRevision);
		if (r.noteId !== null) uuid(r.noteId);
		if (r.storeId === "00000000-0000-0000-0000-000000000000" || r.noteId === "00000000-0000-0000-0000-000000000000") fail();
		text(r.title, 640);
		date(r.recordDate);
		richBundle(r.content);
		const projected = richText(r.content);
		text(projected, 8e4);
		if (!r.title.trim() && !projected.trim()) fail();
	} else if (r.op === "set_bookmark") {
		keys(r, [
			"op",
			"storeId",
			"expectedRevision",
			"noteId",
			"bookmarked"
		]);
		uuid(r.storeId);
		revision(r.expectedRevision);
		uuid(r.noteId);
		if (typeof r.bookmarked !== "boolean") fail();
	} else if (r.op === "save_calendar") {
		keys(r, [
			"op",
			"storeId",
			"expectedRevision",
			"title",
			"body",
			"recordDate",
			"calendarLink"
		], ["attachments", "pdfs"]);
		calendarLink(r.calendarLink);
		const { calendarLink: link, ...plain } = r;
		validateRequest({
			...plain,
			op: "save",
			noteId: null
		});
	} else if (["save", "read"].includes(r.op)) {
		keys(r, [
			"op",
			"storeId",
			"expectedRevision",
			"noteId",
			...r.op === "save" ? [
				"title",
				"body",
				"recordDate"
			] : []
		], r.op === "save" ? ["attachments", "pdfs"] : []);
		uuid(r.storeId);
		revision(r.expectedRevision);
		if (r.noteId !== null || r.op === "read") uuid(r.noteId);
		if (r.op === "save") {
			text(r.title, 640);
			text(r.body, 8e4);
			date(r.recordDate);
			if (!r.title.trim() && !r.body.trim()) fail();
			if (Object.hasOwn(r, "attachments")) attachments(r.attachments);
			if (Object.hasOwn(r, "pdfs")) {
				if (!Array.isArray(r.pdfs)) fail();
				if (r.pdfs.length) fail("unsupported");
			}
		}
	} else if (r.op === "draft_probe") keys(r, ["op"]);
	else if (r.op === "draft_load") {
		keys(r, ["op", "storeId"]);
		uuid(r.storeId);
	} else if ([
		"draft_write",
		"draft_discard",
		"draft_cleanup"
	].includes(r.op)) {
		const write = r.op === "draft_write";
		keys(r, [
			"op",
			"storeId",
			"expectedRevision",
			"mutationId",
			"draftId",
			...write ? [
				"noteId",
				"baseRevision",
				"editRevision",
				"data"
			] : ["expectedEditRevision"],
			...r.op === "draft_cleanup" ? ["expectedCanonicalRevision"] : []
		]);
		uuid(r.storeId);
		revision(r.expectedRevision);
		uuid(r.mutationId);
		uuid(r.draftId);
		if (write) {
			if (r.noteId !== null) uuid(r.noteId);
			revision(r.baseRevision);
			revision(r.editRevision);
			temporaryData(r.data);
		} else {
			revision(r.expectedEditRevision);
			if (r.op === "draft_cleanup") revision(r.expectedCanonicalRevision);
		}
	} else fail("unsupported");
	if (bytes(JSON.stringify(r)) > (["save_rich", "draft_write"].includes(r.op) ? 3149824 : 655360)) fail("limit_exceeded");
	return r;
}
var fail, bytes;
function init_validation() {
	return (init_validation = __esmMin((() => {
		init_calendar();
		init_rich();
		fail = (code = "invalid_request") => {
			throw code;
		};
		bytes = (s) => new TextEncoder().encode(s).length;
	})))();
}
export { init_validation as a, revision as c, uuid as d, validateRequest as f, increment as i, temporaryData as l, init_calendar as m, date as n, keys as o, calendarLink as p, fail as r, plainCopy as s, bytes as t, text as u };
