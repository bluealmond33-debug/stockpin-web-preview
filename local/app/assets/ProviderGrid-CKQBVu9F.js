import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CSsnt-5j.js";
import { d as init_createLucideIcon, u as createLucideIcon } from "./AppIcon-BQHbU-e9.js";
var __iconData$3, Plus;
function init_plus() {
	return (init_plus = __esmMin((() => {
		init_createLucideIcon();
		__iconData$3 = {
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
		__iconData$3.node;
		Plus = createLucideIcon(__iconData$3);
	})))();
}
var __iconData$2, RefreshCw;
function init_refresh_cw() {
	return (init_refresh_cw = __esmMin((() => {
		init_createLucideIcon();
		__iconData$2 = {
			name: "refresh-cw",
			size: 24,
			node: [
				["path", {
					d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
					key: "v9h5vc"
				}],
				["path", {
					d: "M21 3v5h-5",
					key: "1q7to0"
				}],
				["path", {
					d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
					key: "3uifl3"
				}],
				["path", {
					d: "M8 16H3v5",
					key: "1cv678"
				}]
			]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData$2.node;
		RefreshCw = createLucideIcon(__iconData$2);
	})))();
}
var __iconData$1, Unlink;
function init_unlink() {
	return (init_unlink = __esmMin((() => {
		init_createLucideIcon();
		__iconData$1 = {
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
		__iconData$1.node;
		Unlink = createLucideIcon(__iconData$1);
	})))();
}
var __iconData, X;
function init_x() {
	return (init_x = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "x",
			size: 24,
			node: [["path", {
				d: "M18 6 6 18",
				key: "1bl5f8"
			}], ["path", {
				d: "m6 6 12 12",
				key: "d8bk6v"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		X = createLucideIcon(__iconData);
	})))();
}
function init_provider_grid() {
	return (init_provider_grid = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/connections/provider-grid.css?v=source-build-r156";
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
function ProviderGrid({ items, now, compactWeb = false, compactBrandDisplayMode = "original", compactConnectionLabels, nextCheckLabel, lastCheckedAt }) {
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
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "provider-grid-item provider-grid-compact",
						"data-state": item.state,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
									compactBrandDisplayMode === "original" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `/local/app/logos/${item.provider}.png`,
										alt: "",
										width: 32,
										height: 32
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "provider-grid-name",
										children: typeof compactConnectionLabels?.[item.id] === "string" && compactConnectionLabels[item.id] ? `${compactConnectionLabels[item.id]} · ${name}` : name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "provider-grid-connection",
										children: item.state === "disconnected" ? "연결" : item.state === "error" ? "연결 오류" : "연결됨"
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
									children: item.queryState === "never" ? "자산 확인 전" : item.queryState === "failed" ? "자산 확인 실패" : item.queryState === "partial" ? "자산 부분 조회" : read?.complete ? "자산 확인 완료" : read?.stale ? "자산 마지막 성공 기록 · 오래됨" : "자산 확인 상태 미확인"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "provider-grid-time",
									title: "웹 체험 · 실제 금융 요청 없음",
									children: [
										"마지막 확인 ",
										stamp && stampMs != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: stamp,
											title: stamp,
											children: new Intl.DateTimeFormat("ko-KR", {
												timeZone: "Asia/Seoul",
												hour: "2-digit",
												minute: "2-digit",
												hourCycle: "h23"
											}).format(new Date(stampMs))
										}) : "—",
										" · ",
										nextCheckLabel || "자동 갱신 꺼짐"
									]
								})
							] })]
						})
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
		init_provider_grid();
		import_jsx_runtime = require_jsx_runtime();
		names = {
			toss: "토스증권",
			kiwoom: "키움증권"
		};
		staleAfterMs = 3e5;
	})))();
}
export { Unlink as a, init_refresh_cw as c, init_x as i, Plus as l, init_ProviderGrid as n, init_unlink as o, X as r, RefreshCw as s, ProviderGrid as t, init_plus as u };
