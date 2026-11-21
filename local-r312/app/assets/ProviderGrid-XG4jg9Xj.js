import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { n as init_createLucideIcon, t as createLucideIcon } from "./createLucideIcon-l6BxyEwt.js";
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
function init_provider_grid() {
	return (init_provider_grid = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/connections/provider-grid.css?v=source-build-r283";
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
/** Pure default-grid UI. Callback ownership and all auth/account gates stay in the parent. */
function ProviderGrid({ items, now, compactWeb = false, compactBrandDisplayMode = "original", compactConnectionLabels, compactOnEditAccounts, lastCheckedAt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "provider-grid",
		"aria-label": "금융사 연결",
		children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "provider-grid-empty",
			children: "표시할 금융사가 없습니다."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
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
					const labels = item.state === "disconnected" ? "" : accountLabels(item).replaceAll(`${name} · `, "").replaceAll(` · ${environment}`, "").replace(/••••[0-9-]{1,4}/g, (suffix) => `${suffix} · ${environment}`);
					const candidate = item.state !== "disconnected" && item.queryState !== "never" ? lastCheckedAt ?? (read?.valid ? item.lastSuccessAt : null) : null;
					const candidateMs = utcTimestamp(candidate);
					const currentMs = utcTimestamp(now);
					const stamp = candidateMs != null && currentMs != null && candidateMs <= currentMs ? candidate : null;
					const stampMs = stamp ? candidateMs : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "provider-grid-item provider-grid-compact",
						"data-state": item.state,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "provider-grid-card",
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
											"data-state": item.state,
											"aria-hidden": "true"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "provider-grid-name",
										children: typeof compactConnectionLabels?.[item.id] === "string" && compactConnectionLabels[item.id] ? `${compactConnectionLabels[item.id]} · ${name}` : name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "provider-grid-connection",
										children: item.state === "disconnected" ? "미연결 · 연결하기" : item.state === "error" ? "연결 오류" : "연결됨"
									})
								]
							}), item.state !== "disconnected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "provider-grid-accounts",
									title: labels,
									children: labels
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "provider-grid-query",
									children: item.queryState === "never" ? "자산 확인 전" : item.queryState === "failed" ? "자산 확인 실패" : item.queryState === "partial" ? "일부 자료 미확인" : read?.complete ? "선택 계좌 조회 완료" : read?.stale ? "자산 마지막 성공 기록 · 오래됨" : "자산 확인 상태 미확인"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "provider-grid-time",
									title: "웹 체험 · 실제 금융 요청 없음",
									children: ["마지막 확인 ", stamp && stampMs != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										dateTime: stamp,
										title: stamp,
										children: new Intl.DateTimeFormat("ko-KR", {
											timeZone: "Asia/Seoul",
											hour: "2-digit",
											minute: "2-digit",
											hourCycle: "h23"
										}).format(new Date(stampMs))
									}) : "—"]
								})
							] })]
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
								item.state === "disconnected" ? "미연결" : item.state === "error" ? "연결 오류" : "연결됨",
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
									title: item.lastSuccessAt,
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
export { Plus as a, init_unlink as i, init_ProviderGrid as n, init_plus as o, Unlink as r, ProviderGrid as t };
