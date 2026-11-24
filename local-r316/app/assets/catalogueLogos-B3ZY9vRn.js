import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { d as init_createLucideIcon, u as createLucideIcon } from "./AppIcon-DSKI6a1U.js";
var __iconData$2, Pencil;
function init_pencil() {
	return (init_pencil = __esmMin((() => {
		init_createLucideIcon();
		__iconData$2 = {
			name: "pencil",
			size: 24,
			node: [["path", {
				d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
				key: "1a8usu"
			}], ["path", {
				d: "m15 5 4 4",
				key: "1mk7zo"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData$2.node;
		Pencil = createLucideIcon(__iconData$2);
	})))();
}
var __iconData$1, Plus;
function init_plus() {
	return (init_plus = __esmMin((() => {
		init_createLucideIcon();
		__iconData$1 = {
			name: "plus",
			size: 24,
			node: [["path", {
				d: "M5 12h14",
				key: "1ays0h"
			}], ["path", {
				d: "M12 5v14",
				key: "s699le"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData$1.node;
		Plus = createLucideIcon(__iconData$1);
	})))();
}
var __iconData, Unlink;
function init_unlink() {
	return (init_unlink = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "unlink",
			size: 24,
			node: [
				["path", {
					d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",
					key: "yqzxt4"
				}],
				["path", {
					d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
					key: "4qinb0"
				}],
				["line", {
					x1: "8",
					x2: "8",
					y1: "2",
					y2: "5",
					key: "1041cp"
				}],
				["line", {
					x1: "2",
					x2: "5",
					y1: "8",
					y2: "8",
					key: "14m1p5"
				}],
				["line", {
					x1: "16",
					x2: "16",
					y1: "19",
					y2: "22",
					key: "rzdirn"
				}],
				["line", {
					x1: "19",
					x2: "22",
					y1: "16",
					y2: "16",
					key: "ox905f"
				}]
			]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		Unlink = createLucideIcon(__iconData);
	})))();
}
function hasControls(value) {
	return [...value].some((char) => {
		const code = char.codePointAt(0);
		return code <= 31 || code >= 127 && code <= 159;
	});
}
function token(value) {
	return typeof value === "string" && value.length > 0 && value.length <= ALIAS_LIMITS.tokenCodeUnits && !/\s/u.test(value) && !hasControls(value) && !forbidden.has(value);
}
/** Capture own data descriptors before use; accessors/symbols/custom prototypes fail. */
function record(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== Object.prototype && prototype !== null) return null;
	const result = Object.create(null);
	for (const key of Reflect.ownKeys(value)) {
		if (typeof key !== "string" || forbidden.has(key)) return null;
		const descriptor = Object.getOwnPropertyDescriptor(value, key);
		if (!descriptor || !descriptor.enumerable || !("value" in descriptor)) return null;
		result[key] = descriptor.value;
	}
	return result;
}
function exact(value, keys) {
	return Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}
function readContext(value) {
	const data = record(value);
	if (!data || !exact(data, ["scope", "accountIds"]) || !token(data.scope)) return null;
	const ids = data.accountIds;
	if (!Array.isArray(ids) || Object.getPrototypeOf(ids) !== Array.prototype || ids.length > ALIAS_LIMITS.accounts || Reflect.ownKeys(ids).length !== ids.length + 1) return null;
	const result = /* @__PURE__ */ new Set();
	for (let i = 0; i < ids.length; i++) {
		const item = Object.getOwnPropertyDescriptor(ids, String(i));
		if (!item || !("value" in item) || !token(item.value) || result.has(item.value)) return null;
		result.add(item.value);
	}
	return {
		scope: data.scope,
		ids: result
	};
}
function aliasText(value) {
	return typeof value === "string" && value.length > 0 && value.trim() === value && !hasControls(value) && [...value].length <= ALIAS_LIMITS.aliasCodePoints && !/[\ud800-\udfff]/u.test(value);
}
function parseAliasEditRequest(value, context) {
	try {
		const trusted = readContext(context), data = record(value);
		if (!trusted || !data || data.version !== 1 || data.scope !== trusted.scope || !token(data.requestId) || !token(data.expectedRevision) || !token(data.accountId) || !trusted.ids.has(data.accountId)) return null;
		const keys = [
			"version",
			"scope",
			"requestId",
			"expectedRevision",
			"accountId",
			"operation"
		];
		if (data.operation === "set") {
			if (!exact(data, [...keys, "alias"]) || !aliasText(data.alias)) return null;
		} else if (data.operation !== "clear" || !exact(data, keys)) return null;
		return Object.freeze({ ...data });
	} catch {
		return null;
	}
}
function parseAliasSnapshot(value, context) {
	try {
		const trusted = readContext(context), data = record(value);
		if (!trusted || !data || !exact(data, [
			"version",
			"scope",
			"revision",
			"aliases"
		]) || data.version !== 1 || data.scope !== trusted.scope || !token(data.revision)) return null;
		const aliases = record(data.aliases);
		if (!aliases || Object.keys(aliases).length > ALIAS_LIMITS.accounts) return null;
		const copy = Object.create(null);
		for (const [id, name] of Object.entries(aliases)) {
			if (!trusted.ids.has(id) || !aliasText(name)) return null;
			copy[id] = name;
		}
		const snapshot = {
			version: 1,
			scope: trusted.scope,
			revision: data.revision,
			aliases: Object.freeze(copy)
		};
		if (new TextEncoder().encode(JSON.stringify(snapshot)).length > ALIAS_LIMITS.snapshotBytes) return null;
		return Object.freeze(snapshot);
	} catch {
		return null;
	}
}
function unavailable(data) {
	return exact(data, ["status", "reason"]) && data.status === "unavailable" && (data.reason === "not_implemented" || data.reason === "storage_unavailable");
}
function parseAliasLoadResult(value, context) {
	const invalid = Object.freeze({
		status: "unknown",
		reason: "invalid_snapshot"
	});
	try {
		if (!readContext(context)) return invalid;
		const data = record(value);
		if (!data) return invalid;
		if (unavailable(data)) return Object.freeze({
			status: "unavailable",
			reason: data.reason
		});
		if (data.status === "loaded" && exact(data, ["status", "snapshot"])) {
			const snapshot = parseAliasSnapshot(data.snapshot, context);
			if (snapshot) return Object.freeze({
				status: "loaded",
				snapshot
			});
		}
		if (data.status === "unknown" && exact(data, ["status", "reason"]) && (data.reason === "transport" || data.reason === "corrupt" || data.reason === "invalid_snapshot")) return Object.freeze({
			status: "unknown",
			reason: data.reason
		});
		return invalid;
	} catch {
		return invalid;
	}
}
/** Structural validation of a backend acknowledgement, NOT proof of durable save.
* Only a verified protected adapter may produce status:saved in normal mode.
*/
function parseAliasSaveResult(value, request, context) {
	const invalid = Object.freeze({
		status: "unknown",
		reason: "invalid_ack"
	});
	try {
		const edit = parseAliasEditRequest(request, context), data = record(value);
		if (!edit || !data) return invalid;
		if (data.status === "saved" && exact(data, [
			"status",
			"scope",
			"requestId",
			"baseRevision",
			"snapshot"
		])) {
			const snapshot = parseAliasSnapshot(data.snapshot, context);
			if (!snapshot || data.scope !== edit.scope || data.requestId !== edit.requestId || data.baseRevision !== edit.expectedRevision || snapshot.revision === edit.expectedRevision) return invalid;
			if (edit.operation === "set" ? snapshot.aliases[edit.accountId] !== edit.alias : Object.hasOwn(snapshot.aliases, edit.accountId)) return invalid;
			return Object.freeze({
				status: "saved",
				scope: edit.scope,
				requestId: edit.requestId,
				baseRevision: edit.expectedRevision,
				snapshot
			});
		}
		if (data.status === "stale" && exact(data, ["status"])) return Object.freeze({ status: "stale" });
		if (data.status === "validation" && exact(data, ["status", "code"]) && (data.code === "invalid_request" || data.code === "invalid_alias" || data.code === "unknown_account")) return Object.freeze({
			status: "validation",
			code: data.code
		});
		if (unavailable(data)) return Object.freeze({
			status: "unavailable",
			reason: data.reason
		});
		if (data.status === "failed" && exact(data, ["status", "reason"]) && data.reason === "not_committed") return Object.freeze({
			status: "failed",
			reason: "not_committed"
		});
		if (data.status === "unknown" && exact(data, ["status", "reason"]) && (data.reason === "lost_ack" || data.reason === "transport" || data.reason === "invalid_ack")) return Object.freeze({
			status: "unknown",
			reason: data.reason
		});
		return invalid;
	} catch {
		return invalid;
	}
}
/** Pure display projection, no draft mutation, retry, I/O or revision ordering.
* Consumer must also fence its current context/session generation after awaits.
*/
function acceptAliasSaveSnapshot(current, request, result, context) {
	const base = parseAliasSnapshot(current, context);
	const edit = parseAliasEditRequest(request, context);
	if (!base || !edit || base.revision !== edit.expectedRevision) return current;
	const accepted = parseAliasSaveResult(result, edit, context);
	return accepted.status === "saved" ? accepted.snapshot : current;
}
var ALIAS_LIMITS, forbidden, UNAVAILABLE_ALIAS_CALLBACKS;
function init_accountAliases() {
	return (init_accountAliases = __esmMin((() => {
		ALIAS_LIMITS = Object.freeze({
			aliasCodePoints: 80,
			tokenCodeUnits: 256,
			accounts: 256,
			snapshotBytes: 65536
		});
		forbidden = /* @__PURE__ */ new Set([
			"__proto__",
			"prototype",
			"constructor"
		]);
		UNAVAILABLE_ALIAS_CALLBACKS = Object.freeze({
			load: async () => Object.freeze({
				status: "unavailable",
				reason: "not_implemented"
			}),
			save: async () => Object.freeze({
				status: "unavailable",
				reason: "not_implemented"
			})
		});
	})))();
}
function init_provider_grid() {
	return (init_provider_grid = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/connections/provider-grid.css?v=source-build-r50089";
			document.head.appendChild(l);
		}
	})))();
}
function accountLabels(item) {
	const environment = item.environment === "paper" ? "모의" : "실전";
	const pattern = new RegExp(`^${names[item.provider]} · ••••(?=[0-9-]*[0-9])[0-9-]{1,4}(?: · ${environment})?$`);
	if (!Array.isArray(item.maskedAccounts)) return "계좌 표시 확인 필요";
	if (!item.maskedAccounts.length) return "선택 계좌 없음";
	return item.maskedAccounts.map((label) => typeof label === "string" && pattern.test(label) ? label : "계좌 표시 확인 필요").join(" · ");
}
/** Match by opaque ID; rejected metadata never enters optional text or attributes. */
function compactAccountDisplay(item, presentation) {
	const name = names[item.provider], environment = item.environment === "paper" ? "모의" : "실전";
	const compact = (label) => label.replaceAll(`${name} · `, "").replaceAll(` · ${environment}`, "").replace(/••••[0-9-]{1,4}/g, (suffix) => `${suffix} · ${environment}`);
	const fallback = compact(accountLabels(item));
	if (!presentation) return fallback;
	const snapshot = parseAliasSnapshot(presentation.snapshot, presentation.context);
	const actual = item.selectedAccountMetadata, supplied = presentation.accountsByConnection?.[item.id];
	if (!snapshot || !Array.isArray(actual) || !actual.length || !Array.isArray(supplied) || !Array.isArray(item.maskedAccounts) || actual.length !== item.maskedAccounts.length || actual.length !== supplied.length) return fallback;
	if (actual.some((meta) => !meta || typeof meta.accountId !== "string" || !meta.accountId || accountLabels({
		...item,
		maskedAccounts: [meta.maskedLabel]
	}) !== meta.maskedLabel)) return fallback;
	const actualById = new Map(actual.map((meta) => [meta.accountId, meta]));
	if (actualById.size !== actual.length || new Set(supplied.map((meta) => meta?.accountId)).size !== supplied.length) return fallback;
	if (JSON.stringify(actual.map((meta) => meta.maskedLabel).sort()) !== JSON.stringify([...item.maskedAccounts].sort())) return fallback;
	if (supplied.some((meta) => !meta || typeof meta.accountId !== "string" || actualById.get(meta.accountId)?.maskedLabel !== meta.maskedLabel)) return fallback;
	return actual.map((meta) => {
		const alias = snapshot.aliases[meta.accountId], masked = compact(meta.maskedLabel);
		return alias ? `${alias} · ${masked}` : masked;
	}).join(" · ");
}
function utcTimestamp(value) {
	if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return null;
	const date = new Date(value);
	const canonical = value.includes(".") ? value : value.replace("Z", ".000Z");
	return Number.isFinite(date.getTime()) && date.toISOString() === canonical ? date.getTime() : null;
}
function observation(item, now) {
	const at = utcTimestamp(item.lastSuccessAt), current = utcTimestamp(now);
	const future = at != null && current != null && at > current;
	const valid = at != null && current != null && !future;
	const stale = valid && current - at >= staleAfterMs;
	const complete = item.state === "connected" && item.queryState === "succeeded" && valid && !stale;
	return {
		at,
		valid,
		stale,
		future,
		complete,
		query: {
			never: "조회 전",
			succeeded: complete ? "조회 완료" : item.state === "connected" && stale ? "마지막 성공 기록" : "현재 조회 상태 확인 필요",
			partial: "부분 조회",
			failed: "조회 오류"
		}[item.queryState]
	};
}
function compactCheckTime(at, current) {
	const calendar = new Intl.DateTimeFormat("en-US", {
		timeZone: "Asia/Seoul",
		calendar: "gregory",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	});
	const parts = (value) => Object.fromEntries(calendar.formatToParts(new Date(value)).map((part) => [part.type, part.value]));
	const checked = parts(at), today = parts(current);
	const time = new Intl.DateTimeFormat("ko-KR", {
		timeZone: "Asia/Seoul",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(new Date(at));
	if (checked.year === today.year && checked.month === today.month && checked.day === today.day) return time;
	return `${checked.year === today.year ? "" : checked.year + "."}${checked.month}.${checked.day} ${time}`;
}
/** Pure default-grid UI. Callback ownership and all auth/account gates stay in the parent. */
function ProviderGrid({ items, now, emptyMessage = "표시할 금융사가 없습니다.", compactWeb = false, compactContext = "web-demo", compactBrandDisplayMode = "original", compactConnectionLabels, compactAccountAliasPresentation, compactOnEditAccounts, lastCheckedAt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "provider-grid",
		"aria-label": "금융사 연결",
		children: items.length === 0 ? emptyMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "provider-grid-empty",
			children: emptyMessage
		}) : null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "provider-grid-list",
			children: items.map((item) => {
				if (item.state === "planned") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "provider-grid-item",
					"data-state": "planned",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "provider-grid-status",
						children: "지원 예정"
					})]
				}, item.id);
				const name = names[item.provider];
				const environment = item.environment === "paper" ? "모의" : "실전";
				const read = item.state === "disconnected" ? null : observation(item, now);
				if (compactWeb) {
					const labels = item.state === "disconnected" ? "" : compactAccountDisplay(item, compactAccountAliasPresentation);
					const wrapConfirmedAccountNames = item.state !== "disconnected" && labels !== compactAccountDisplay(item, void 0);
					const dotState = item.state === "disconnected" || item.authenticationRequired === true || item.connectionEstablished === false ? "disconnected" : item.connectionEstablished === true || item.state === "connected" ? "connected" : "disconnected";
					const problem = item.authenticationRequired === true ? compactContext === "app" ? "인증 필요" : "재인증 필요" : item.state === "disconnected" ? null : item.queryState === "failed" || item.state === "error" ? "확인 실패" : item.queryState === "partial" ? "일부 자료 확인 필요" : null;
					const sharedWebCheck = compactContext === "web-demo" && item.state !== "disconnected" && item.authenticationRequired !== true && item.connectionEstablished !== false;
					const candidate = item.state !== "disconnected" && item.queryState !== "never" ? (sharedWebCheck ? lastCheckedAt : null) ?? (read?.valid ? item.lastSuccessAt : null) : null;
					const candidateMs = utcTimestamp(candidate);
					const currentMs = utcTimestamp(now);
					const stamp = candidateMs != null && currentMs != null && candidateMs <= currentMs ? candidate : null;
					const stampMs = stamp ? candidateMs : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "provider-grid-item provider-grid-compact",
						"data-connection-id": item.id,
						"data-state": item.state,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "provider-grid-card",
							"aria-label": `${name} · ${item.state === "disconnected" ? "미연결 · 연결하기" : item.authenticationRequired === true ? "인증 필요" : dotState === "connected" ? "연결됨" : "연결 미확인"}${labels ? " · " + labels : ""}${problem ? " · " + problem : ""} · ${item.state === "disconnected" ? "연결하기" : "상세 보기"}`,
							onClick: (event) => {
								event.currentTarget.focus();
								if (item.state === "disconnected") item.onConnect();
								else item.onDetails();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "provider-grid-heading",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "provider-grid-logo",
										children: [compactBrandDisplayMode === "original" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: `/local/app/logos/${item.provider}.png`,
											alt: "",
											width: 32,
											height: 32
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "provider-grid-state-dot",
											"data-state": dotState,
											"aria-hidden": "true"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "provider-grid-name",
										children: typeof compactConnectionLabels?.[item.id] === "string" && compactConnectionLabels[item.id] ? `${compactConnectionLabels[item.id]} · ${name}` : name
									}),
									item.state === "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "provider-grid-connection",
										children: "연결하기"
									})
								]
							}), item.state !== "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "provider-grid-accounts",
								"aria-description": labels,
								style: wrapConfirmedAccountNames ? {
									whiteSpace: "normal",
									overflowWrap: "anywhere",
									textOverflow: "clip"
								} : void 0,
								children: labels
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "provider-grid-time",
								"aria-description": compactContext === "web-demo" ? "웹 체험 · 실제 금융 요청 없음" : "마지막 성공 조회 시각. 최근 실패 시각을 뜻하지 않습니다.",
								children: ["마지막 확인 ", stamp && stampMs != null && currentMs != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: stamp,
									"aria-description": stamp,
									children: compactCheckTime(stampMs, currentMs)
								}) : "—"]
							})] })]
						}), item.state !== "disconnected" && compactOnEditAccounts && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "provider-grid-edit",
							"aria-label": `${compactConnectionLabels?.[item.id] || name} 계좌 이름 편집`,
							onClick: (event) => {
								event.currentTarget.focus();
								compactOnEditAccounts(item.id);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
								size: 15,
								"aria-hidden": "true"
							})
						})]
					}, item.id);
				}
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "provider-grid-item",
					"data-state": item.state,
					"data-tone": read?.complete ? "success" : "neutral",
					"data-query-complete": read?.complete ? "true" : "false",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "provider-grid-heading",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `/local/app/logos/${item.provider}.png`,
									alt: "",
									width: 32,
									height: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "provider-grid-environment",
									children: environment
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "provider-grid-status",
							children: [
								read?.complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "provider-grid-check",
									"aria-hidden": "true",
									children: "✓"
								}),
								item.authenticationRequired === true ? "인증 필요" : item.state === "disconnected" ? "미연결" : item.state === "error" ? "연결 오류" : "연결됨",
								read && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", read.query] })
							]
						}),
						item.state !== "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "provider-grid-accounts",
							children: accountLabels(item)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "provider-grid-time",
							children: read?.valid && item.queryState !== "never" && item.lastSuccessAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "마지막 성공 조회 " }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: item.lastSuccessAt,
									"aria-description": item.lastSuccessAt,
									children: new Intl.DateTimeFormat("ko-KR", {
										timeZone: "Asia/Seoul",
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										hourCycle: "h23"
									}).format(new Date(read.at))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " 한국 표준시(KST)" }),
								read.stale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " · 오래됨" })
							] }) : item.queryState === "never" ? "아직 조회하지 않았습니다" : read?.future ? "조회 시각 확인 필요" : "조회 시각 미확인"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "provider-grid-action",
							type: "button",
							onClick: item.state === "disconnected" ? item.onConnect : item.onDetails,
							"aria-label": `${name} ${environment} ${item.state === "disconnected" ? "연결" : "연결 상세"}`,
							children: [item.state === "disconnected" ? "연결" : "상세", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: " ↗"
							})]
						})
					]
				}, item.id);
			})
		})
	});
}
var import_jsx_runtime, names, staleAfterMs;
function init_ProviderGrid() {
	return (init_ProviderGrid = __esmMin((() => {
		init_accountAliases();
		init_pencil();
		init_provider_grid();
		import_jsx_runtime = require_jsx_runtime();
		names = {
			toss: "토스증권",
			kiwoom: "키움증권"
		};
		staleAfterMs = 3e5;
	})))();
}
var unsupportedConnectionGroups;
function init_connections_catalog() {
	return (init_connections_catalog = __esmMin((() => {
		unsupportedConnectionGroups = [
			{
				category: "증권·계좌",
				services: [
					{
						name: "Robinhood",
						requirement: "이용 자격·조회 권한 확인과 StockPin 인증·조회 어댑터 구현이 필요합니다."
					},
					{
						name: "한국투자증권",
						requirement: "조회 권한 확인과 StockPin 인증·조회 어댑터 구현이 필요합니다."
					},
					{
						name: "Binance",
						requirement: "암호화폐 거래소. 공식 조회 방식·권한·보안 보관과 앱 어댑터 검토가 필요합니다."
					}
				]
			},
			{
				category: "시장정보·공시",
				services: [{
					name: "DART",
					requirement: "공시 공급 방식·요청 한도·출처 표시와 앱 연동 구현이 필요합니다. 이곳에서는 공시를 가져오지 않습니다."
				}, {
					name: "TradingView",
					requirement: "허용된 데이터 제공 방식·이용·재배포 조건 확인과 앱 연동 구현이 필요합니다. 차트 열람과 계좌 연결은 다릅니다."
				}]
			},
			{
				category: "도구·MCP",
				services: [{
					name: "MCP",
					requirement: "앱 전용 MCP 클라이언트·허용 서버·도구 권한·보안 검토가 필요합니다. 외부 도구의 지원과 StockPin 앱의 연결 지원은 다릅니다."
				}]
			}
		];
	})))();
}
/** Web-only dialog keyboard boundary. Native cancellation stays owned by onCancel. */
function keepWebDemoTabInside(dialog, event) {
	if (event.key !== "Tab") return false;
	const controls = [...dialog.querySelectorAll("button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],details > summary:first-of-type,[tabindex=\"0\"]")].filter((node) => !node.hidden && node.getAttribute("aria-hidden") !== "true" && node.getClientRects().length > 0);
	const current = controls.indexOf(dialog.ownerDocument.activeElement);
	const index = current < 0 ? event.shiftKey ? controls.length - 1 : 0 : (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
	event.preventDefault();
	(controls[index] ?? dialog).focus({ preventScroll: true });
	return true;
}
function init_webDemoFocus() {
	return (init_webDemoFocus = __esmMin((() => {})))();
}
var catalogueLogos;
function init_catalogueLogos() {
	return (init_catalogueLogos = __esmMin((() => {
		catalogueLogos = {
			"Robinhood": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjYzFjMWMxIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+Um9iaW5ob29kPC90aXRsZT48cGF0aCBkPSJNMi44NCAyNGguNTNjLjA5NiAwIC4xOTItLjA0OC4yMjQtLjEyOEM3LjU5MSAxMy42OTYgMTEuOTQgOC42NTYgMTQuNjcgNS42MzhjLjExMi0uMTI4LjA2NC0uMjI1LS4wOTYtLjIyNWgtNC44OGEuNTUuNTUgMCAwIDAtLjQ1LjIyNUw1Ljc0NiA5Ljk3MmMtLjUxNC42NDItLjY0MiAxLjIzNi0uNjQyIDIuMDg2djQuNDNjLTEuMTQgMy4xOTQtMS44NjIgNS4zNjEtMi4zOTIgNy4zMi0uMDMyLjEyNS4wMTYuMTkyLjEyOS4xOTJNMjAuNDQ3LjY0NmMtLjc1NC0uODAyLTQuMTU3LS44MzQtNS43My0uMjI0YTMgMyAwIDAgMC0uNzg2LjQ2NSA0MSA0MSAwIDAgMC0zLjMyMyAzLjE3OGMtLjExMi4xMTMtLjA2NC4yMjUuMDk3LjIyNWg1LjQwOWMuNDk3IDAgLjc4Ni4yODkuNzg2Ljc4NnY2LjFjMCAuMTYuMTI4LjIwOC4yMjUuMDY0bDMuMjU4LTQuMjU0Yy41My0uNjkuNjktLjg5OC44MzUtMS44NjEuMTkyLTEuNDEzLjA4LTMuNTgtLjc3LTQuNDc5bS02Ljk4MiAxNi4xOCAyLjIzMS0zLjY3NmEuNy43IDAgMCAwIC4wNjQtLjI5VjYuNzNjMC0uMTYtLjExMi0uMjI1LS4yMjQtLjA5Ny0zLjM1NSAzLjc0LTUuOTcxIDcuNjcyLTguMzk1IDEyLjQwNy0uMDYuMTIuMDE2LjIyNS4xNi4xNzdsNS4wMDktMS41NGMuNTY1LS4xNzQuODgyLS40MDIgMS4xNTUtLjg1MiIvPjwvc3ZnPg==",
			"Binance": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjYzFjMWMxIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+QmluYW5jZTwvdGl0bGU+PHBhdGggZD0iTTE2LjYyNCAxMy45MjAybDIuNzE3NSAyLjcxNTQtNy4zNTMgNy4zNTMtNy4zNTMtNy4zNTIgMi43MTc1LTIuNzE2NCA0LjYzNTUgNC42NTk1IDQuNjM1Ni00LjY1OTV6bTQuNjM2Ni00LjYzNjZMMjQgMTJsLTIuNzE1NCAyLjcxNjRMMTguNTY4MiAxMmwyLjY5MjQtMi43MTY0em0tOS4yNzIuMDAxbDIuNzE2MyAyLjY5MTQtMi43MTY0IDIuNzE3NHYtLjAwMUw5LjI3MjEgMTJsMi43MTY0LTIuNzE1NHptLTkuMjcyMi0uMDAxTDUuNDA4OCAxMmwtMi42OTE0IDIuNjkyNEwwIDEybDIuNzE2NC0yLjcxNjR6TTExLjk4ODUuMDExNWw3LjM1MyA3LjMyOS0yLjcxNzQgMi43MTU0LTQuNjM1Ni00LjYzNTYtNC42MzU1IDQuNjU5NS0yLjcxNzQtMi43MTU0IDcuMzUzLTcuMzUzeiIvPjwvc3ZnPg==",
			"TradingView": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjYzFjMWMxIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHJhZGluZ1ZpZXc8L3RpdGxlPjxwYXRoIGQ9Ik0xNS44NjU0IDguMjc4OWMwIDEuMzU0MS0xLjA5NzggMi40NTE5LTIuNDUyIDIuNDUxOS0xLjM1NCAwLTIuNDUxOS0xLjA5NzgtMi40NTE5LTIuNDUyIDAtMS4zNTQgMS4wOTc4LTIuNDUxOCAyLjQ1Mi0yLjQ1MTggMS4zNTQxIDAgMi40NTE5IDEuMDk3NyAyLjQ1MTkgMi40NTE5ek05Ljc1IDZIMHY0LjkwMzhoNC44NDYydjcuMjY5Mkg5Ljc1Wm04LjU5NjIgMEgyNGwtNS4xMDU4IDEyLjE3M2gtNS42NTM4eiIvPjwvc3ZnPg==",
			"MCP": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjYzFjMWMxIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+TW9kZWwgQ29udGV4dCBQcm90b2NvbDwvdGl0bGU+PHBhdGggZD0iTTEzLjg1IDBhNC4xNiA0LjE2IDAgMCAwLTIuOTUgMS4yMTdMMS40NTYgMTAuNjZhLjgzNS44MzUgMCAwIDAgMCAxLjE4LjgzNS44MzUgMCAwIDAgMS4xOCAwbDkuNDQyLTkuNDQyYTIuNDkgMi40OSAwIDAgMSAzLjU0MSAwIDIuNDkgMi40OSAwIDAgMSAwIDMuNTQxTDguNTkgMTIuOTdsLS4xLjFhLjgzNS44MzUgMCAwIDAgMCAxLjE4LjgzNS44MzUgMCAwIDAgMS4xOCAwbC4xLS4wOTggNy4wMy03LjAzNGEyLjQ5IDIuNDkgMCAwIDEgMy41NDIgMGwuMDQ5LjA1YTIuNDkgMi40OSAwIDAgMSAwIDMuNTRsLTguNTQgOC41NGExLjk2IDEuOTYgMCAwIDAgMCAyLjc1NWwxLjc1MyAxLjc1M2EuODM1LjgzNSAwIDAgMCAxLjE4IDAgLjgzNS44MzUgMCAwIDAgMC0xLjE4bC0xLjc1My0xLjc1M2EuMjY2LjI2NiAwIDAgMSAwLS4zOTRsOC41NC04LjU0YTQuMTg1IDQuMTg1IDAgMCAwIDAtNS45bC0uMDUtLjA1YTQuMTYgNC4xNiAwIDAgMC0yLjk1LTEuMjE4Yy0uMiAwLS40MDEuMDItLjYuMDQ4YTQuMTcgNC4xNyAwIDAgMC0xLjE3LTMuNTUyQTQuMTYgNC4xNiAwIDAgMCAxMy44NSAwbTAgMy4zMzNhLjg0Ljg0IDAgMCAwLS41OS4yNDVMNi4yNzUgMTAuNTZhNC4xODYgNC4xODYgMCAwIDAgMCA1LjkwMiA0LjE4NiA0LjE4NiAwIDAgMCA1LjkwMiAwTDE5LjE2IDkuNDhhLjgzNS44MzUgMCAwIDAgMC0xLjE4LjgzNS44MzUgMCAwIDAtMS4xOCAwbC02Ljk4NSA2Ljk4NGEyLjQ5IDIuNDkgMCAwIDEtMy41NCAwIDIuNDkgMi40OSAwIDAgMSAwLTMuNTRsNi45ODMtNi45ODVhLjgzNS44MzUgMCAwIDAgMC0xLjE4Ljg0Ljg0IDAgMCAwLS41OS0uMjQ1Ii8+PC9zdmc+",
			"한국투자증권": "data:image/jpeg;base64,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",
			"DART": "data:image/png;base64,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"
		};
	})))();
}
export { init_unlink as _, init_connections_catalog as a, Pencil as b, init_ProviderGrid as c, init_accountAliases as d, parseAliasEditRequest as f, Unlink as g, parseAliasSnapshot as h, keepWebDemoTabInside as i, UNAVAILABLE_ALIAS_CALLBACKS as l, parseAliasSaveResult as m, init_catalogueLogos as n, unsupportedConnectionGroups as o, parseAliasLoadResult as p, init_webDemoFocus as r, ProviderGrid as s, catalogueLogos as t, acceptAliasSaveSnapshot as u, Plus as v, init_pencil as x, init_plus as y };
