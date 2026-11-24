import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function createBackupSchema({ validateJournalState, readOpened }) {
	if (typeof validateJournalState !== "function" || typeof readOpened !== "function") throw TypeError("Explicit journal validation and source response reader required");
	const checked = (state) => {
		const valid = validateJournalState(state);
		if (valid === null) throw "corrupt";
		return valid;
	};
	function validateState(state) {
		checked(state);
		return true;
	}
	function toOpened(state) {
		const s = checked(state);
		return readOpened({
			kind: "opened",
			storeId: s.storeId,
			revision: s.revision,
			notes: s.notes.map(({ body, attachments, pdfs, content, ...summary }) => summary)
		});
	}
	function exportState(current) {
		const s = checked(current);
		return checked({
			...s,
			draftRevision: "0",
			lastMutationId: null,
			drafts: []
		});
	}
	function restoreState(imported, current, { storeId, revision }) {
		const portable = checked(imported), old = current === null ? null : checked(current);
		if (portable.drafts.length !== 0 || portable.draftRevision !== "0" || portable.lastMutationId !== null) throw "backup_invalid";
		return checked({
			version: 1,
			storeId,
			revision,
			notes: structuredClone(portable.notes),
			draftRevision: old?.draftRevision ?? "0",
			lastMutationId: old?.lastMutationId ?? null,
			drafts: structuredClone(old?.drafts ?? [])
		});
	}
	return Object.freeze({
		validateState,
		toOpened,
		exportState,
		restoreState
	});
}
function init_backup_codec() {
	return (init_backup_codec = __esmMin((() => {})))();
}
init_backup_codec();
export { createBackupSchema };
