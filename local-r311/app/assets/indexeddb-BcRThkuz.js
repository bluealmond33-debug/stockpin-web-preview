import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function createIndexedDBRepository({ indexedDB = globalThis.indexedDB } = {}) {
	let connection;
	function open() {
		if (!indexedDB) return Promise.reject("unsupported");
		if (!connection) connection = new Promise((resolve, reject) => {
			let request, settled = false;
			try {
				request = indexedDB.open(DATABASE_NAME, 1);
			} catch (e) {
				reject(errorCode(e));
				return;
			}
			request.onupgradeneeded = () => {
				if (!request.result.objectStoreNames.contains("journal")) request.result.createObjectStore("journal");
			};
			request.onerror = () => {
				settled = true;
				connection = void 0;
				reject(errorCode(request.error));
			};
			request.onblocked = () => {
				settled = true;
				connection = void 0;
				reject("busy");
			};
			request.onsuccess = () => {
				const db = request.result;
				if (settled) {
					db.close();
					return;
				}
				db.onversionchange = () => {
					db.close();
					connection = void 0;
				};
				resolve(db);
			};
		});
		return connection;
	}
	return {
		async transact(update) {
			const db = await open();
			return new Promise((resolve, reject) => {
				let tx, response, failure;
				try {
					tx = db.transaction("journal", "readwrite");
					tx.onabort = () => reject(failure ?? errorCode(tx.error));
					tx.onerror = () => {};
					tx.oncomplete = () => resolve(response);
					const store = tx.objectStore("journal"), request = store.get("state");
					request.onsuccess = () => {
						try {
							const before = request.result === void 0 ? null : request.result;
							const result = update(structuredClone(before));
							if (!result || typeof result.then === "function") throw "invalid_request";
							response = structuredClone(result.response);
							if (JSON.stringify(before) !== JSON.stringify(result.state)) store.put(result.state, "state");
						} catch (e) {
							failure = typeof e === "string" ? e : errorCode(e);
							tx.abort();
						}
					};
				} catch (e) {
					reject(errorCode(e));
				}
			});
		},
		async close() {
			if (connection) {
				(await connection).close();
				connection = void 0;
			}
		}
	};
}
var DATABASE_NAME, errorCode;
function init_indexeddb() {
	return (init_indexeddb = __esmMin((() => {
		DATABASE_NAME = "stockpin-web-next-journal-v1";
		errorCode = (e) => e?.name === "QuotaExceededError" ? "limit_exceeded" : e?.name === "VersionError" ? "corrupt" : "unavailable";
	})))();
}
init_indexeddb();
export { createIndexedDBRepository };
