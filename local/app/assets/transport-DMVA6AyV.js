import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { c as init_backup } from "./backup-BojUGG1a.js";
function createBrowserFileTransport({ document = globalThis.document, navigator = globalThis.navigator, URL = globalThis.URL, Blob = globalThis.Blob, setTimeout = globalThis.setTimeout } = {}) {
	let disposed = false, operation = null, snapshot = Object.freeze({
		picking: false,
		downloadReady: false
	});
	const listeners = /* @__PURE__ */ new Set();
	const publish = () => {
		snapshot = Object.freeze({
			picking: operation?.kind === "pick",
			downloadReady: operation?.kind === "save"
		});
		for (const fn of listeners) try {
			fn();
		} catch {}
	};
	const live = () => {
		if (disposed) throw "unavailable";
	};
	const gesture = () => {
		live();
		if (!document?.body || navigator?.userActivation?.isActive !== true) throw "unsupported";
	};
	const finish = (op, value, error) => {
		if (operation !== op) return;
		operation = null;
		op.input?.remove();
		publish();
		if (error) op.reject(error);
		else op.resolve(value);
	};
	const api = {
		getSnapshot: () => snapshot,
		subscribe(fn) {
			listeners.add(fn);
			return () => listeners.delete(fn);
		},
		pick() {
			try {
				gesture();
				if (operation) throw "busy";
			} catch (e) {
				return Promise.reject(e);
			}
			return new Promise((resolve, reject) => {
				const op = {
					kind: "pick",
					resolve,
					reject
				};
				operation = op;
				try {
					const input = document.createElement("input");
					op.input = input;
					if (!("oncancel" in input)) throw "unsupported";
					input.type = "file";
					input.accept = ".stockpin-web-backup";
					input.multiple = false;
					input.hidden = true;
					input.style.display = "none";
					input.addEventListener("cancel", () => finish(op, null));
					input.addEventListener("change", async () => {
						try {
							if (operation !== op) return;
							if (input.files?.length === 0) {
								finish(op, null);
								return;
							}
							if (input.files?.length !== 1) throw "backup_invalid";
							const file = input.files[0];
							if (!Number.isSafeInteger(file.size) || file.size < 1) throw "backup_invalid";
							if (file.size > 24117248) throw "limit_exceeded";
							const bytes = await file.arrayBuffer();
							if (operation !== op) return;
							if (bytes.byteLength !== file.size || bytes.byteLength > 24117248) throw "backup_invalid";
							const wire = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
							finish(op, wire);
						} catch (e) {
							finish(op, null, ["limit_exceeded", "backup_invalid"].includes(e) ? e : "backup_invalid");
						}
					});
					document.body.append(input);
					publish();
					input.click();
				} catch (e) {
					finish(op, null, e === "unsupported" ? e : "unavailable");
				}
			});
		},
		save(wire) {
			try {
				live();
				if (operation) throw "busy";
				if (typeof wire !== "string") throw "invalid_request";
				if (new TextEncoder().encode(wire).length > 24117248) throw "limit_exceeded";
				if (!URL?.createObjectURL || !URL?.revokeObjectURL || !Blob) throw "unsupported";
			} catch (e) {
				return Promise.reject(e);
			}
			return new Promise((resolve, reject) => {
				operation = {
					kind: "save",
					wire,
					resolve,
					reject
				};
				publish();
			});
		},
		download() {
			gesture();
			const op = operation;
			if (op?.kind !== "save") throw "invalid_request";
			let url, anchor;
			try {
				url = URL.createObjectURL(new Blob([op.wire], { type: "application/octet-stream" }));
				anchor = document.createElement("a");
				anchor.href = url;
				anchor.download = "stockpin-browser.stockpin-web-backup";
				anchor.hidden = true;
				anchor.style.display = "none";
				document.body.append(anchor);
				anchor.click();
				finish(op, true);
			} catch {
				finish(op, false, "unavailable");
			} finally {
				anchor?.remove();
				if (url) setTimeout(() => URL.revokeObjectURL(url), 6e4);
			}
		},
		cancel() {
			if (operation) finish(operation, operation.kind === "pick" ? null : false);
		},
		dispose() {
			api.cancel();
			disposed = true;
			listeners.clear();
		}
	};
	return api;
}
function init_transport() {
	return (init_transport = __esmMin((() => {
		init_backup();
	})))();
}
init_transport();
export { createBrowserFileTransport };
