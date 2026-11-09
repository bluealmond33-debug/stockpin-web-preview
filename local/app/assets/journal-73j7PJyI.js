import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { a as init_validation, f as validateRequest, i as increment } from "./validation-BCvVanxV.js";
import { i as validateState, n as init_state, t as checkedResult } from "./state-qgAUehTb.js";
function draftOperation(s, r, now, opened) {
	if (r.op === "draft_probe") return {
		kind: "draft_context",
		store: opened(s),
		drafts: response(s)
	};
	if (r.storeId !== s.storeId) throw "conflict";
	if (r.op === "draft_load") return response(s);
	const previous = s.drafts.find((d) => d.draftId === r.draftId), write = r.op === "draft_write";
	if (r.op === "draft_cleanup" && r.expectedCanonicalRevision !== s.revision) throw "conflict";
	if (write && BigInt(r.baseRevision) > BigInt(s.revision)) throw "conflict";
	if (s.lastMutationId === r.mutationId) {
		const same = write ? previous && previous.noteId === r.noteId && previous.baseRevision === r.baseRevision && previous.editRevision === r.editRevision && equal(previous.data, r.data) : !previous;
		if (BigInt(r.expectedRevision) + 1n === BigInt(s.draftRevision) && same) return response(s);
		throw "conflict";
	}
	if (r.expectedRevision !== s.draftRevision) throw "conflict";
	if (write) {
		if (previous && (previous.noteId !== r.noteId || previous.baseRevision !== r.baseRevision || BigInt(r.editRevision) <= BigInt(previous.editRevision))) throw "conflict";
		if (!previous && s.drafts.length >= 16) throw "limit_exceeded";
		const entry = {
			draftId: r.draftId,
			noteId: r.noteId,
			baseRevision: r.baseRevision,
			editRevision: r.editRevision,
			savedAt: now(),
			data: r.data
		};
		s.drafts = previous ? s.drafts.map((d) => d === previous ? entry : d) : [...s.drafts, entry];
	} else {
		if (!previous || previous.editRevision !== r.expectedEditRevision) throw "conflict";
		s.drafts = s.drafts.filter((d) => d !== previous);
	}
	s.draftRevision = increment(s.draftRevision);
	s.lastMutationId = r.mutationId;
	return response(s);
}
var response, equal;
function init_drafts() {
	return (init_drafts = __esmMin((() => {
		init_validation();
		response = (s) => ({
			kind: "drafts",
			storeId: s.storeId,
			revision: s.draftRevision,
			lastMutationId: s.lastMutationId,
			drafts: s.drafts
		});
		equal = (a, b) => {
			if (a === b) return true;
			if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
			const ks = Object.keys(a);
			return ks.length === Object.keys(b).length && ks.every((k) => Object.hasOwn(b, k) && equal(a[k], b[k]));
		};
	})))();
}
/**
* @param {{repository: import('./protocol.mjs').Repository, uuid?: ()=>string, now?: ()=>string}} options
* @returns {import('./protocol.mjs').Command}
*/
function createJournalCommand({ repository, uuid = () => globalThis.crypto.randomUUID(), now = () => (/* @__PURE__ */ new Date()).toISOString() }) {
	return async (request) => {
		const r = validateRequest(request);
		return repository.transact((stored) => checkedResult(run(validateState(stored))));
		function run(state) {
			if (r.op === "initialize" && !state) state = {
				version: 1,
				storeId: uuid(),
				revision: "0",
				notes: [],
				draftRevision: "0",
				lastMutationId: null,
				drafts: []
			};
			if ([
				"open",
				"open_cached",
				"initialize"
			].includes(r.op)) return {
				state,
				response: state ? opened(state) : { kind: "uninitialized" }
			};
			if (!state) throw "uninitialized";
			if (r.op.startsWith("draft_")) return {
				state,
				response: draftOperation(state, r, now, opened)
			};
			if (r.storeId !== state.storeId || r.expectedRevision !== state.revision) throw "conflict";
			if (r.op === "read") {
				const note = state.notes.find((n) => n.id === r.noteId);
				if (!note) throw "missing_note";
				return {
					state,
					response: {
						kind: "note",
						storeId: state.storeId,
						revision: state.revision,
						note
					}
				};
			}
			if (r.op === "set_bookmark") {
				const note = state.notes.find((n) => n.id === r.noteId);
				if (!note) throw "missing_note";
				if (!!note.bookmarked !== r.bookmarked) {
					note.bookmarked = r.bookmarked;
					state.revision = increment(state.revision);
				}
				return {
					state,
					response: opened(state)
				};
			}
			if ([
				"save",
				"save_rich",
				"save_calendar"
			].includes(r.op)) {
				if (r.calendarLink && state.notes.some((n) => n.calendarLink?.source === r.calendarLink.source && n.calendarLink?.eventId === r.calendarLink.eventId)) throw "duplicate_trade";
				const old = r.op === "save_calendar" || r.noteId === null ? null : state.notes.find((n) => n.id === r.noteId);
				if (r.op !== "save_calendar" && r.noteId !== null && !old) throw "missing_note";
				if (r.op === "save" && old?.content) throw "unsupported";
				const timestamp = now();
				const note = {
					id: old?.id ?? uuid(),
					title: r.title,
					...r.op === "save_rich" ? { content: r.content } : { body: r.body },
					recordDate: {
						value: r.recordDate,
						basis: "user_selected"
					},
					createdAt: old?.createdAt ?? timestamp,
					updatedAt: timestamp
				};
				if (old && Object.hasOwn(old, "bookmarked")) note.bookmarked = old.bookmarked;
				if (r.calendarLink ?? old?.calendarLink) note.calendarLink = r.calendarLink ?? old.calendarLink;
				if (r.attachments !== void 0) note.attachments = r.attachments;
				else if (r.op === "save" && old && Object.hasOwn(old, "attachments")) note.attachments = old.attachments;
				if (!old && state.notes.length >= 256) throw "limit_exceeded";
				state.notes = old ? state.notes.map((n) => n.id === old.id ? note : n) : [...state.notes, note];
				state.revision = increment(state.revision);
				return {
					state,
					response: r.op === "save_rich" ? {
						kind: "note",
						storeId: state.storeId,
						revision: state.revision,
						note
					} : {
						kind: "saved",
						storeId: state.storeId,
						revision: state.revision,
						note,
						notes: summaries(state)
					}
				};
			}
			throw "unsupported";
		}
	};
}
var summaries, opened;
function init_journal() {
	return (init_journal = __esmMin((() => {
		init_state();
		init_drafts();
		init_validation();
		summaries = (state) => state.notes.map(({ body, attachments, content, ...summary }) => summary);
		opened = (state) => ({
			kind: "opened",
			storeId: state.storeId,
			revision: state.revision,
			notes: summaries(state)
		});
	})))();
}
init_journal();
export { createJournalCommand };
