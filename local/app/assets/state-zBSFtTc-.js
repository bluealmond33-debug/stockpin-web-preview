import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { a as init_validation, c as revision, d as uuid, f as validateRequest, l as temporaryData, m as init_calendar, n as date, o as keys, p as calendarLink, r as fail, s as plainCopy, t as bytes, u as text } from "./validation-DoO4w2qL.js";
function timestamp(v) {
	text(v, 40);
	if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,9})?Z$/.test(v) || !Number.isFinite(Date.parse(v))) fail();
	date(v.slice(0, 10));
	const [h, m, s] = v.slice(11, 19).split(":").map(Number);
	if (h > 23 || m > 59 || s > 59) fail();
	return v;
}
function validateState(input) {
	if (input === null) return null;
	let s;
	try {
		s = plainCopy(input, 0, /* @__PURE__ */ new Set(), { nodes: 0 }, "state");
		keys(s, [
			"version",
			"storeId",
			"revision",
			"notes",
			"draftRevision",
			"lastMutationId",
			"drafts"
		]);
		if (s.version !== 1) fail();
		uuid(s.storeId);
		revision(s.revision);
		revision(s.draftRevision);
		if (s.lastMutationId !== null) uuid(s.lastMutationId);
		if (!Array.isArray(s.notes) || s.notes.length > 256 || !Array.isArray(s.drafts) || s.drafts.length > 16) fail();
		const ids = /* @__PURE__ */ new Set();
		for (const n of s.notes) {
			plainCopy(n);
			keys(n, [
				"id",
				"title",
				Object.hasOwn(n, "content") ? "content" : "body",
				"recordDate",
				"createdAt",
				"updatedAt"
			], Object.hasOwn(n, "content") ? ["calendarLink", "bookmarked"] : [
				"attachments",
				"calendarLink",
				"bookmarked"
			]);
			if (Object.hasOwn(n, "bookmarked") && typeof n.bookmarked !== "boolean") fail();
			if (Object.hasOwn(n, "calendarLink")) calendarLink(n.calendarLink);
			uuid(n.id);
			if (ids.has(n.id)) fail();
			ids.add(n.id);
			keys(n.recordDate, ["value", "basis"]);
			if (n.recordDate.basis !== "user_selected") fail();
			timestamp(n.createdAt);
			timestamp(n.updatedAt);
			if (Date.parse(n.updatedAt) < Date.parse(n.createdAt)) fail();
			validateRequest({
				op: Object.hasOwn(n, "content") ? "save_rich" : "save",
				storeId: s.storeId,
				expectedRevision: s.revision,
				noteId: n.id,
				title: n.title,
				...Object.hasOwn(n, "content") ? { content: n.content } : { body: n.body },
				recordDate: n.recordDate.value,
				...n.attachments !== void 0 ? { attachments: n.attachments } : {}
			});
		}
		ids.clear();
		for (const d of s.drafts) {
			plainCopy(d);
			keys(d, [
				"draftId",
				"noteId",
				"baseRevision",
				"editRevision",
				"savedAt",
				"data"
			]);
			uuid(d.draftId);
			if (ids.has(d.draftId)) fail();
			ids.add(d.draftId);
			if (d.noteId !== null) uuid(d.noteId);
			revision(d.baseRevision);
			if (BigInt(d.baseRevision) > BigInt(s.revision)) fail();
			revision(d.editRevision);
			timestamp(d.savedAt);
			temporaryData(d.data);
		}
	} catch {
		throw "corrupt";
	}
	if (bytes(JSON.stringify(s)) > 16777216) fail("limit_exceeded");
	return s;
}
function checkedResult(result) {
	if (result.state && bytes(JSON.stringify(result.state)) > 16777216) throw "limit_exceeded";
	validateState(result.state);
	return result;
}
function init_state() {
	return (init_state = __esmMin((() => {
		init_calendar();
		init_validation();
	})))();
}
export { validateState as i, init_state as n, timestamp as r, checkedResult as t };
