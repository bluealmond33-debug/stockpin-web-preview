import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
import { a as init_AppIcon, c as Info, d as init_createLucideIcon, l as init_info, t as AppIcon, u as createLucideIcon } from "./AppIcon-BMyc19R-.js";
import { a as Unlink, c as init_refresh_cw, i as init_x, l as Plus, n as init_ProviderGrid, o as init_unlink, r as X, s as RefreshCw, t as ProviderGrid, u as init_plus } from "./ProviderGrid-RFDV0T7E.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-N2Usc85z.js";
import { a as demoAccounts, c as startWebDemoClock, i as createWebDemoConnectionsState, l as webDemoConnectionsReducer, n as WEB_DEMO_CONNECTIONS_NOW, o as demoProviderName, r as createDemoAliasStore, s as init_WebDemoConnectionsState, u as webDemoCountdown } from "./WebDemoConnectionsState-5SRAsGdv.js";
var __iconData, Blocks;
function init_blocks() {
	return (init_blocks = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "blocks",
			size: 24,
			node: [["path", {
				d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
				key: "1ah6g2"
			}], ["rect", {
				x: "14",
				y: "2",
				width: "8",
				height: "8",
				rx: "1",
				key: "88lufb"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		Blocks = createLucideIcon(__iconData);
	})))();
}
function init_WebDemoConnections() {
	return (init_WebDemoConnections = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/connections/WebDemoConnections.css?v=source-build-r137";
			document.head.appendChild(l);
		}
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
function init_connections_hub() {
	return (init_connections_hub = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/connections/connections-hub.css?v=source-build-r137";
			document.head.appendChild(l);
		}
	})))();
}
/** Web-only dialog keyboard boundary. Native cancellation stays owned by onCancel. */
function keepWebDemoTabInside(dialog, event) {
	if (event.key !== "Tab") return false;
	const controls = [...dialog.querySelectorAll("button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex=\"0\"]")].filter((node) => !node.hidden && node.getAttribute("aria-hidden") !== "true" && node.getClientRects().length > 0);
	const current = controls.indexOf(dialog.ownerDocument.activeElement);
	const index = current < 0 ? event.shiftKey ? controls.length - 1 : 0 : (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
	event.preventDefault();
	(controls[index] ?? dialog).focus({ preventScroll: true });
	return true;
}
function connectionPurposeLabel(accounts, selected, aliases, defaults) {
	const chosen = accounts.filter((a) => selected.includes(a.id));
	return chosen.map((a) => {
		const label = aliases[a.id] ?? defaults[a.id] ?? "";
		return chosen.length > 1 ? `${label ? label + " " : ""}(${a.maskedLabel})` : label;
	}).filter(Boolean).join(" / ");
}
function WebConnectionCredentialPreview({ provider }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "connection-credential-preview",
		"aria-label": "키 입력 화면 미리보기",
		children: [[provider === "toss" ? "Client ID" : "App Key", provider === "toss" ? "Client Secret" : "Secret Key"].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value: "",
			readOnly: true,
			disabled: true,
			autoComplete: "off",
			placeholder: "Mac 앱에서 입력"
		})] }, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "웹에서는 실제 키를 입력받지 않습니다." })]
	});
}
/** Web-only in-memory connections; never an authentication or native IO owner. */
function WebDemoConnections({ refreshMinutes = 0, onAccountAliasesChange, accountDefaultAliases = {} }) {
	const [aliasStore] = (0, import_react.useState)(() => {
		try {
			return createDemoAliasStore(typeof window === "undefined" ? null : window.localStorage);
		} catch {
			return createDemoAliasStore(null);
		}
	});
	const [storageNotice, setStorageNotice] = (0, import_react.useState)("");
	const [state, dispatch] = (0, import_react.useReducer)(webDemoConnectionsReducer, void 0, () => ({
		...createWebDemoConnectionsState(),
		aliases: aliasStore.aliases
	}));
	const [clock, setClock] = (0, import_react.useState)(null);
	const nextCheckLabel = clock?.minutes === refreshMinutes ? clock.label : refreshMinutes ? `다음 확인 ${webDemoCountdown(refreshMinutes * 6e4, 0)}` : "자동 갱신 꺼짐";
	(0, import_react.useEffect)(() => {
		return startWebDemoClock(refreshMinutes, {
			now: () => Date.now(),
			available: () => document.visibilityState === "visible" && navigator.onLine,
			subscribe: (changed) => {
				document.addEventListener("visibilitychange", changed);
				const events = ["online", "offline"];
				events.forEach((event) => window.addEventListener(event, changed));
				return () => {
					document.removeEventListener("visibilitychange", changed);
					events.forEach((event) => window.removeEventListener(event, changed));
				};
			},
			everySecond: (tick) => {
				const id = window.setInterval(tick, 1e3);
				return () => window.clearInterval(id);
			}
		}, (label) => setClock({
			minutes: refreshMinutes,
			label
		}), (now) => dispatch({
			type: "scheduled-check",
			now
		}));
	}, [refreshMinutes]);
	const dialog = (0, import_react.useRef)(null);
	const modalHeading = (0, import_react.useRef)(null);
	const gridHeading = (0, import_react.useRef)(null);
	const opener = (0, import_react.useRef)(null);
	const titleId = (0, import_react.useId)();
	const active = state.connections.find((c) => c.id === state.activeId);
	const opened = state.view !== "grid";
	const open = (action) => {
		opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		setStorageNotice("");
		dispatch(action);
	};
	(0, import_react.useLayoutEffect)(() => {
		const node = dialog.current;
		if (opened) {
			if (node && !node.open) node.showModal();
			modalHeading.current?.focus();
		} else if (node?.open) {
			node.close();
			if (opener.current?.isConnected) opener.current.focus();
			else gridHeading.current?.focus();
		}
	}, [opened, state.view]);
	const act = (action) => {
		modalHeading.current?.focus();
		if (action.type === "close" || action.type === "confirm-disconnect") setStorageNotice("");
		if (action.type === "save") {
			const next = webDemoConnectionsReducer(state, action);
			if (next !== state) {
				const saved = aliasStore.save(next.aliases);
				if (saved) onAccountAliasesChange?.({ ...next.aliases });
				setStorageNotice(saved ? "별명을 이 브라우저에 저장했습니다." : "별명은 이번 화면에서만 적용됩니다. 저장을 확인하지 못했습니다. 다른 창의 변경·저장소 설정을 확인한 뒤 다시 여세요.");
			}
		}
		dispatch(action);
	};
	const items = state.connections.map((c) => ({
		id: c.id,
		provider: c.provider,
		environment: c.environment,
		state: c.queryState === "failed" ? "error" : "connected",
		queryState: c.queryState,
		lastSuccessAt: c.queryState === "never" || c.queryState === "failed" ? null : WEB_DEMO_CONNECTIONS_NOW,
		maskedAccounts: demoAccounts(c.provider).filter((a) => c.selectedAccountIds.includes(a.id)).map((a) => a.maskedLabel),
		onDetails: () => open({
			type: "open",
			id: c.id
		})
	}));
	const title = state.view === "picker" ? "연결 추가" : state.view === "consent" ? `${demoProviderName(state.provider)} 연결 · 1/2` : state.view === "accounts" ? "계좌 선택 · 2/2" : state.view === "disconnect" ? "연결을 해제할까요?" : `${active ? demoProviderName(active.provider) : ""} 연결 상세`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "connections-layout connections-minimal connections-web-demo",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "saved-connections",
			"aria-label": "등록한 연결",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "connections-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						ref: gridHeading,
						tabIndex: -1,
						children: ["등록한 연결 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: state.connections.length })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-button",
						onClick: () => open({ type: "add" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { icon: Plus }), "연결 추가"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderGrid, {
					compactWeb: true,
					compactBrandDisplayMode: "text-only",
					compactConnectionLabels: Object.fromEntries(state.connections.map((c) => [c.id, connectionPurposeLabel(demoAccounts(c.provider), c.selectedAccountIds, state.aliases, accountDefaultAliases)])),
					items,
					now: WEB_DEMO_CONNECTIONS_NOW,
					nextCheckLabel,
					lastCheckedAt: state.lastCheckedAt
				}),
				!opened && state.notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					children: state.notice
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dialog", {
			ref: dialog,
			className: "credential-modal",
			"aria-labelledby": titleId,
			onKeyDown: (event) => {
				if (keepWebDemoTabInside(event.currentTarget, event)) event.stopPropagation();
			},
			onCancel: (event) => {
				event.preventDefault();
				act({ type: state.view === "disconnect" ? "cancel-disconnect" : "close" });
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "modal-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: titleId,
						ref: modalHeading,
						tabIndex: -1,
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-button",
						"aria-label": "연결 닫기",
						onClick: () => act({ type: "close" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { icon: X })
					})]
				}),
				state.view === "picker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "connections-picker",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "connection-service-list",
						children: [["kiwoom", "toss"].map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "connection-service-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "connection-service-choose",
								onClick: () => dispatch({
									type: "choose",
									provider,
									environment: "live"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: demoProviderName(provider) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									"가상 계좌 ",
									new Set(state.connections.filter((c) => c.provider === provider).flatMap((c) => c.selectedAccountIds)).size,
									"개"
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
								label: demoProviderName(provider),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "앱에서는 지원 금융사의 인증·조회 기능을 사용합니다. 여기서는 실제 인증 없이 가상 계좌 여러 개를 선택하는 흐름만 체험합니다. 실제 지원 범위와 조회 결과는 앱에서 확인하세요." })
							})]
						}, provider)), unsupportedConnectionGroups.flatMap((group) => group.services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "connection-service-row is-unsupported",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "connection-service-identity",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "connection-service-symbol",
										"aria-hidden": true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { icon: Blocks })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: service.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "connection-service-status",
										children: "미지원"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetMetricHelp, {
								label: service.name,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									group.category,
									" · ",
									service.requirement
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "이 항목은 실제 연결을 제공하지 않습니다." })]
							})]
						}, service.name)))]
					})
				}),
				state.view === "consent" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebConnectionCredentialPreview, { provider: state.provider }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "token-consent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "checkbox-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: state.consent,
								onChange: (e) => dispatch({
									type: "consent",
									checked: e.target.checked
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "실제 인증·조회가 아닌 웹 가상 연결에 동의합니다." })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "provider-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "secondary-button",
							onClick: () => act({ type: "close" }),
							children: "취소"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "primary-button",
							disabled: !state.consent,
							onClick: () => act({ type: "continue" }),
							children: "체험 시작"
						})]
					})
				] }),
				state.view === "accounts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "한 금융사에서 여러 가상 계좌를 선택할 수 있습니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
						"가상 계좌 · ",
						state.selectedAccountIds.length,
						"개 선택"
					] }), demoAccounts(state.provider).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connection-account-editor",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "checkbox-line",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: state.selectedAccountIds.includes(a.id),
								onChange: () => dispatch({
									type: "toggle-account",
									id: a.id
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [a.maskedLabel, " · 실전"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["계좌 별칭", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							maxLength: 32,
							autoComplete: "off",
							placeholder: accountDefaultAliases[a.id] ?? a.aliasPlaceholder,
							disabled: !state.selectedAccountIds.includes(a.id),
							value: state.draftAliases[a.id] ?? accountDefaultAliases[a.id] ?? "",
							onChange: (event) => dispatch({
								type: "alias",
								id: a.id,
								value: event.target.value
							})
						})] })]
					}, a.id))] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
						label: "별명 보관",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "별명만 이 브라우저에 저장합니다. 암호화되지 않으므로 실제 계좌번호·키·개인정보를 적지 마세요. 연결과 계좌 선택은 화면을 나가면 초기화됩니다. 브라우저 자료 삭제나 주소 변경 시 별명은 이어지지 않습니다. 같은 가상 계좌는 같은 별명을 씁니다. 비우면 기본 이름으로 표시합니다." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "provider-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "secondary-button",
							onClick: () => act({ type: "close" }),
							children: "취소"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "primary-button",
							disabled: !state.selectedAccountIds.length,
							onClick: () => act({ type: "save" }),
							children: "선택 완료"
						})]
					})
				] }),
				state.view === "details" && active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "connection-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "provider-summary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: demoProviderName(active.provider) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: queryNames[active.queryState] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: demoAccounts(active.provider).filter((a) => active.selectedAccountIds.includes(a.id)).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							(state.aliases[a.id] ?? accountDefaultAliases[a.id]) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [state.aliases[a.id] ?? accountDefaultAliases[a.id], " · "] }),
							a.maskedLabel,
							" · 실전 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-button",
								"aria-label": `${a.maskedLabel} 계좌 별칭 편집`,
								onClick: () => act({ type: "edit-accounts" }),
								children: "별칭 편집"
							})
						] }, a.id)) }),
						(active.queryState === "failed" || active.queryState === "partial") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "state-alert",
							role: "status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { icon: Info }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "자료를 확인하지 못했습니다. 자산 0원을 뜻하지 않습니다." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "provider-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "secondary-button",
									onClick: () => act({ type: "retry" }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { icon: RefreshCw }), active.queryState === "failed" || active.queryState === "partial" ? "다시 확인" : "확인"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-button",
									onClick: () => act({ type: "edit-accounts" }),
									children: "계좌 선택 변경"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "text-button",
									onClick: () => act({ type: "disconnect" }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { icon: Unlink }), "연결 해제"]
								})
							]
						})
					]
				}),
				state.view === "disconnect" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "disconnect-confirm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "이 화면의 연결만 제거합니다." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "provider-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "secondary-button",
							onClick: () => act({ type: "cancel-disconnect" }),
							children: "해제 취소"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "secondary-button small",
							onClick: () => act({ type: "confirm-disconnect" }),
							children: "연결 해제"
						})]
					})]
				}),
				opened && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					"aria-live": "polite",
					children: state.notice
				}),
				opened && storageNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					children: storageNotice
				})
			]
		})]
	});
}
var import_react, import_jsx_runtime, queryNames;
function init_WebDemoConnections$1() {
	return (init_WebDemoConnections$1 = __esmMin((() => {
		import_react = require_react();
		init_info(), init_plus(), init_refresh_cw(), init_unlink(), init_x(), init_blocks();
		init_WidgetMetricHelp();
		init_WebDemoConnections();
		init_AppIcon();
		init_ProviderGrid();
		init_connections_catalog();
		init_connections_hub();
		init_WebDemoConnectionsState();
		import_jsx_runtime = require_jsx_runtime();
		queryNames = {
			never: "자산 확인 전",
			succeeded: "정상",
			partial: "부분 조회",
			failed: "조회 오류"
		};
	})))();
}
init_WebDemoConnections$1();
export { WebDemoConnections };
