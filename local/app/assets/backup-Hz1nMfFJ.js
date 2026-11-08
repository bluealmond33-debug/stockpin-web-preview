import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function available(crypto) {
	if (!crypto?.subtle || !crypto?.getRandomValues) throw "unsupported";
}
function validBrowserBackupPassword(value) {
	return typeof value === "string" && /[^\p{White_Space}]/u.test(value) && encoder.encode(value).length <= 1024 && [...value].length >= 12 && [...value].every((c) => {
		const n = c.codePointAt(0);
		return n < 55296 || n > 57343;
	});
}
function passwordCheck(p) {
	if (!validBrowserBackupPassword(p)) throw "invalid_request";
}
function exact(o, keys) {
	if (!o || typeof o !== "object" || Array.isArray(o) || Reflect.ownKeys(o).length !== keys.length) throw "backup_invalid";
	const d = Object.getOwnPropertyDescriptors(o);
	for (const k of keys) if (!d[k]?.enumerable || !("value" in d[k])) throw "backup_invalid";
}
function parse(wire) {
	const o = JSON.parse(wire);
	if (JSON.stringify(o) !== wire) throw "backup_invalid";
	return o;
}
function un64(text) {
	if (typeof text !== "string" || text.length % 4 !== 0 || /[^A-Za-z0-9+/=]/.test(text)) throw "backup_invalid";
	const bytes = Uint8Array.from(atob(text), (c) => c.charCodeAt(0));
	if (b64(bytes) !== text) throw "backup_invalid";
	return bytes;
}
async function keyFor(password, salt, crypto) {
	const bytes = encoder.encode(password);
	try {
		const base = await crypto.subtle.importKey("raw", bytes, "PBKDF2", false, ["deriveKey"]);
		return await crypto.subtle.deriveKey({
			name: "PBKDF2",
			salt,
			iterations: ITERATIONS,
			hash: "SHA-256"
		}, base, {
			name: "AES-GCM",
			length: 256
		}, false, ["encrypt", "decrypt"]);
	} finally {
		bytes.fill(0);
	}
}
async function encryptBackup(state, password, { crypto = globalThis.crypto, validateState } = {}) {
	available(crypto);
	passwordCheck(password);
	let plain;
	try {
		if (typeof validateState !== "function" || validateState(state) !== true) throw "corrupt";
		plain = encoder.encode(JSON.stringify(state));
		if (plain.length > 16777216) throw "limit_exceeded";
		const salt = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)), iv = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12)), key = await keyFor(password, salt, crypto);
		const ciphertext = await crypto.subtle.encrypt({
			name: "AES-GCM",
			iv,
			additionalData: aad,
			tagLength: 128
		}, key, plain);
		return JSON.stringify({
			magic: FORMAT,
			version: 1,
			kdf: "PBKDF2-SHA256",
			iterations: ITERATIONS,
			cipher: "AES-256-GCM",
			salt: b64(salt),
			iv: b64(iv),
			ciphertext: b64(new Uint8Array(ciphertext))
		});
	} catch (e) {
		throw ["corrupt", "limit_exceeded"].includes(e) ? e : "unavailable";
	} finally {
		plain?.fill(0);
	}
}
function requestCopy(request) {
	const op = Object.getOwnPropertyDescriptor(request ?? {}, "op")?.value;
	const keys = {
		open: ["op"],
		backup_export: [
			"op",
			"storeId",
			"expectedRevision",
			"password"
		],
		backup_prepare: ["op", "password"],
		backup_restore: ["op", "ticket"],
		backup_cancel: ["op", "ticket"]
	}[op];
	if (!keys) throw "unsupported";
	try {
		exact(request, keys);
	} catch {
		throw "invalid_request";
	}
	const r = Object.fromEntries(keys.map((k) => [k, Object.getOwnPropertyDescriptor(request, k).value]));
	if ("password" in r) passwordCheck(r.password);
	if ("ticket" in r && (typeof r.ticket !== "string" || !UUID.test(r.ticket)) || op === "backup_export" && (typeof r.storeId !== "string" || !UUID.test(r.storeId) || !revision(r.expectedRevision))) throw "invalid_request";
	return r;
}
function createBrowserBackupCommand({ repository, transport, validateState, toOpened, restoreState, exportState, crypto = globalThis.crypto, now = () => performance.now(), ticketTtlMs = 3e5 }) {
	if (!repository?.transact || !transport?.pick || !transport?.save || typeof validateState !== "function" || typeof toOpened !== "function" || typeof restoreState !== "function" || typeof exportState !== "function" || !Number.isFinite(ticketTtlMs) || ticketTtlMs <= 0 || ticketTtlMs > 3e5) throw "invalid_request";
	let pending = null, busy = false, disposed = false;
	const live = () => {
		if (disposed) throw "unavailable";
	};
	const checked = (s) => {
		if (validateState(s) !== true) throw "corrupt";
		const o = toOpened(structuredClone(s));
		if (o?.kind !== "opened" || !UUID.test(o.storeId) || !revision(o.revision) || !Array.isArray(o.notes) || o.notes.length > 256) throw "corrupt";
		return o;
	};
	const read = () => repository.transact((s) => ({
		state: s,
		response: s === null ? null : {
			state: s,
			opened: checked(s)
		}
	}));
	async function execute(request) {
		if (request.op === "open") return (await read())?.opened ?? { kind: "uninitialized" };
		if (request.op === "backup_export") {
			const s = await read();
			if (!s) throw "uninitialized";
			if (s.opened.storeId !== request.storeId || s.opened.revision !== request.expectedRevision) throw "conflict";
			const portable = exportState(structuredClone(s.state)), summary = checked(portable);
			if (JSON.stringify(summary) !== JSON.stringify(s.opened)) throw "corrupt";
			const wire = await encryptBackup(portable, request.password, {
				crypto,
				validateState
			});
			live();
			return await transport.save(wire) ? {
				kind: "backup_exported",
				noteCount: s.opened.notes.length
			} : { kind: "backup_cancelled" };
		}
		if (request.op === "backup_prepare") {
			pending = null;
			const wire = await transport.pick();
			if (wire === null) return { kind: "backup_cancelled" };
			const state = await decryptBackup(wire, request.password, {
				crypto,
				validateState
			}), opened = checked(state), current = await read();
			const target = current ? {
				storeId: current.opened.storeId,
				revision: current.opened.revision
			} : null;
			live();
			const ticket = crypto.randomUUID();
			pending = {
				ticket,
				state,
				target,
				created: now()
			};
			return {
				kind: "backup_preview",
				ticket,
				noteCount: opened.notes.length,
				linkedCount: opened.notes.filter((n) => n.tradeLink).length,
				currentNoteCount: current?.opened.notes.length ?? 0,
				target
			};
		}
		if (request.op === "backup_cancel" || request.op === "backup_restore") {
			if (!pending || pending.ticket !== request.ticket) throw "conflict";
			const candidate = pending;
			pending = null;
			const age = now() - candidate.created;
			if (!Number.isFinite(age) || age < 0 || age >= ticketTtlMs) throw "conflict";
			if (request.op === "backup_cancel") return { kind: "backup_cancelled" };
			return repository.transact((current) => {
				live();
				const age = now() - candidate.created;
				if (!Number.isFinite(age) || age < 0 || age >= ticketTtlMs) throw "conflict";
				const opened = current === null ? null : checked(current), target = candidate.target;
				if (target ? opened?.storeId !== target.storeId || opened?.revision !== target.revision : opened !== null) throw "conflict";
				if (target?.revision === "18446744073709551615") throw "limit_exceeded";
				const next = {
					storeId: target?.storeId ?? crypto.randomUUID(),
					revision: target ? String(BigInt(target.revision) + 1n) : "1"
				};
				const state = restoreState(structuredClone(candidate.state), structuredClone(current), next), result = checked(state);
				if (encoder.encode(JSON.stringify(state)).length > 16777216) throw "limit_exceeded";
				if (result.storeId !== next.storeId || result.revision !== next.revision) throw "corrupt";
				return {
					state,
					response: {
						...result,
						kind: "backup_restored"
					}
				};
			});
		}
		throw "unsupported";
	}
	const command = async (request) => {
		live();
		if (busy) throw "busy";
		const r = requestCopy(request);
		available(crypto);
		busy = true;
		try {
			const result = await execute(r);
			live();
			return result;
		} catch (e) {
			throw [
				"invalid_request",
				"unsupported",
				"backup_invalid",
				"conflict",
				"corrupt",
				"uninitialized",
				"limit_exceeded",
				"busy",
				"unavailable"
			].includes(e) ? e : "unavailable";
		} finally {
			busy = false;
		}
	};
	command.dispose = () => {
		disposed = true;
		pending = null;
		transport.cancel?.();
	};
	return command;
}
async function decryptBackup(wire, password, { crypto = globalThis.crypto, validateState } = {}) {
	available(crypto);
	passwordCheck(password);
	if (typeof wire !== "string") throw "backup_invalid";
	if (wire.length > 24117248 || encoder.encode(wire).length > 24117248) throw "limit_exceeded";
	let plain;
	try {
		const e = parse(wire);
		exact(e, [
			"magic",
			"version",
			"kdf",
			"iterations",
			"cipher",
			"salt",
			"iv",
			"ciphertext"
		]);
		if (e.magic !== "StockPin-Browser-Backup" || e.version !== 1 || e.kdf !== "PBKDF2-SHA256" || e.iterations !== 6e5 || e.cipher !== "AES-256-GCM") throw "backup_invalid";
		const salt = un64(e.salt), iv = un64(e.iv), ciphertext = un64(e.ciphertext);
		if (salt.length !== 16 || iv.length !== 12 || ciphertext.length < 16 || ciphertext.length > 16777232) throw "backup_invalid";
		const key = await keyFor(password, salt, crypto);
		plain = new Uint8Array(await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv,
			additionalData: aad,
			tagLength: 128
		}, key, ciphertext));
		const state = parse(new TextDecoder("utf-8", { fatal: true }).decode(plain));
		if (typeof validateState !== "function" || validateState(state) !== true) throw "backup_invalid";
		return state;
	} catch {
		throw "backup_invalid";
	} finally {
		plain?.fill(0);
	}
}
var FORMAT, ITERATIONS, MAX_PLAIN_BYTES, MAX_FILE_BYTES, encoder, b64, aad, UUID, revision;
function init_backup() {
	return (init_backup = __esmMin((() => {
		FORMAT = "StockPin-Browser-Backup";
		ITERATIONS = 6e5;
		MAX_PLAIN_BYTES = 16777216;
		MAX_FILE_BYTES = 24117248;
		encoder = new TextEncoder();
		b64 = (bytes) => {
			const chunks = [];
			for (let i = 0; i < bytes.length; i += 8192) chunks.push(String.fromCharCode(...bytes.subarray(i, i + 8192)));
			return btoa(chunks.join(""));
		};
		aad = encoder.encode(`${FORMAT}:1:PBKDF2-SHA256:${ITERATIONS}:AES-256-GCM`);
		UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
		revision = (v) => typeof v === "string" && /^(0|[1-9][0-9]{0,19})$/.test(v) && BigInt(v) <= 18446744073709551615n;
	})))();
}
export { createBrowserBackupCommand as a, init_backup as c, MAX_PLAIN_BYTES as i, validBrowserBackupPassword as l, ITERATIONS as n, decryptBackup as o, MAX_FILE_BYTES as r, encryptBackup as s, FORMAT as t };
