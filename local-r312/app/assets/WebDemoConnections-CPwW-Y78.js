import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { a as init_AppIcon, c as Info, l as init_info, t as AppIcon } from "./AppIcon-C8oRgvdw.js";
import { a as Plus, c as init_pencil, i as init_unlink, n as init_ProviderGrid, o as init_plus, r as Unlink, s as Pencil, t as ProviderGrid } from "./ProviderGrid-DohRXcQA.js";
import { i as init_refresh_cw, n as init_x, r as RefreshCw, t as X } from "./x-Hx8U-97z.js";
import { n as init_BrandDisplayContext, r as useBrandDisplayMode } from "./BrandDisplayContext-CP_A69l_.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-CER3ic0b.js";
import { c as init_WebDemoConnectionsState, d as webDemoCountdown, i as createWebDemoConnectionsState, l as startWebDemoClock, n as WEB_DEMO_CONNECTIONS_NOW, o as demoAccounts, r as createDemoAliasStore, s as demoProviderName, u as webDemoConnectionsReducer } from "./WebDemoConnectionsState-DbUzkw0_.js";
function init_WebDemoConnections() {
	return (init_WebDemoConnections = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/connections/WebDemoConnections.css?v=source-build-r303";
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
			l.href = "/local/app/css-source/src/features/connections/connections-hub.css?v=source-build-r303";
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
function WebDemoConnections({ refreshMinutes = 0, onAccountAliasesChange, accountDefaultAliases = {}, store, brandDisplayMode }) {
	const contextBrandDisplayMode = useBrandDisplayMode();
	const effectiveBrandDisplayMode = brandDisplayMode ?? contextBrandDisplayMode;
	const [localAliasStore] = (0, import_react.useState)(() => {
		try {
			return createDemoAliasStore(typeof window === "undefined" ? null : window.localStorage);
		} catch {
			return createDemoAliasStore(null);
		}
	});
	const aliasStore = store?.aliasStore ?? localAliasStore;
	const aliasFailureNotice = "별명 저장을 확인하지 못했습니다. 입력한 별명을 따로 보관한 뒤 페이지를 새로고침해 저장소를 다시 확인하세요.";
	const [storageNotice, setStorageNotice] = (0, import_react.useState)(() => aliasStore.writable ? "" : aliasFailureNotice);
	const [localState, localDispatch] = (0, import_react.useReducer)(webDemoConnectionsReducer, void 0, () => ({
		...createWebDemoConnectionsState(),
		aliases: aliasStore.aliases
	}));
	const state = (0, import_react.useSyncExternalStore)(store?.subscribe ?? noConnectionSubscription, store?.getSnapshot ?? (() => localState), store?.getSnapshot ?? (() => localState));
	const dispatch = store?.dispatch ?? localDispatch;
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
	const aliasAccount = state.view === "alias" ? demoAccounts(state.provider).find((a) => a.id === state.aliasAccountId) : void 0;
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
		if ([
			"close",
			"confirm-disconnect",
			"edit-accounts",
			"edit-alias"
		].includes(action.type) || action.type === "save" && state.view === "accounts") setStorageNotice("");
		if (action.type === "save" && state.view === "alias") {
			const next = webDemoConnectionsReducer(state, action);
			if (next !== state) {
				if (!aliasStore.save(next.aliases)) {
					setStorageNotice("별명을 저장하지 못했습니다. 입력은 이 화면에 유지되며 기존 이름은 바뀌지 않습니다. 입력한 별명을 따로 보관한 뒤 페이지를 새로고침해 저장소를 다시 확인하세요.");
					return;
				}
				onAccountAliasesChange?.({ ...next.aliases });
				setStorageNotice("별명을 이 브라우저에 저장했습니다.");
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
	const title = state.view === "picker" ? "연결 추가" : state.view === "consent" ? `${demoProviderName(state.provider)} 연결 · 1/2` : state.view === "accounts" ? "계좌 선택 · 2/2" : state.view === "alias" ? "별명 편집" : state.view === "disconnect" ? "연결을 해제할까요?" : `${active ? demoProviderName(active.provider) : ""} 연결 상세`;
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
					compactOnEditAccounts: (id) => {
						open({
							type: "open",
							id
						});
						const connection = state.connections.find((c) => c.id === id);
						if (connection?.selectedAccountIds.length === 1) dispatch({
							type: "edit-alias",
							id: connection.selectedAccountIds[0]
						});
					},
					compactBrandDisplayMode: effectiveBrandDisplayMode,
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connection-modal-title",
						children: [state.view !== "picker" && effectiveBrandDisplayMode === "original" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "connection-provider-logo",
							src: `/local/app/logos/${active?.provider ?? state.provider}.png`,
							alt: "",
							width: 36,
							height: 36
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [(state.view === "accounts" || state.view === "alias") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "connection-modal-provider",
							children: demoProviderName(state.provider)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: titleId,
							ref: modalHeading,
							tabIndex: -1,
							children: title
						})] })]
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
					children: unsupportedConnectionGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: group.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "connection-service-list",
						"aria-label": group.category,
						children: [group.category === "증권·계좌" && ["kiwoom", "toss"].map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "connection-service-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "connection-service-choose",
								onClick: () => dispatch({
									type: "choose",
									provider,
									environment: "live"
								}),
								children: [effectiveBrandDisplayMode === "original" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									className: "connection-provider-logo",
									src: `/local/app/logos/${provider}.png`,
									alt: "",
									width: 28,
									height: 28
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "connection-service-copy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "connection-service-name",
										children: demoProviderName(provider)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
										className: "connection-service-status",
										children: [
											"가상 계좌 ",
											new Set(state.connections.filter((c) => c.provider === provider).flatMap((c) => c.selectedAccountIds)).size,
											"개"
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
								label: demoProviderName(provider),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "앱에서는 지원 금융사의 인증·조회 기능을 사용합니다. 여기서는 실제 인증 없이 가상 계좌 여러 개를 선택하는 흐름만 체험합니다. 실제 지원 범위와 조회 결과는 앱에서 확인하세요." })
							})]
						}, provider)), group.services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "connection-service-row is-unsupported",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "connection-service-identity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "connection-service-copy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "connection-service-name",
										children: service.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "connection-service-status",
										children: "미지원"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetMetricHelp, {
								label: service.name,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									group.category,
									" · ",
									service.requirement
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "이 항목은 실제 연결을 제공하지 않습니다." })]
							})]
						}, service.name))]
					})] }, group.category))
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "connection-account-copy",
						children: "연결할 계좌를 선택해 주세요."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "connection-account-list",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
							"가상 계좌 · ",
							state.selectedAccountIds.length,
							"개 선택"
						] }), demoAccounts(state.provider).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "connection-account-editor",
							"data-selected": state.selectedAccountIds.includes(a.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "checkbox-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: state.selectedAccountIds.includes(a.id),
									onChange: () => dispatch({
										type: "toggle-account",
										id: a.id
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [a.maskedLabel, " · 실전"] })]
							})
						}, a.id))]
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
				state.view === "alias" && aliasAccount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "connection-alias-account",
						children: aliasAccount.maskedLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "connection-account-editor connection-alias-editor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "connection-alias-field",
							children: ["별명", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								maxLength: 32,
								autoComplete: "off",
								placeholder: accountDefaultAliases[aliasAccount.id] ?? aliasAccount.aliasPlaceholder,
								value: state.draftAliases[aliasAccount.id] ?? accountDefaultAliases[aliasAccount.id] ?? "",
								onChange: (event) => dispatch({
									type: "alias",
									id: aliasAccount.id,
									value: event.target.value
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
						label: "별명 보관",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "별명만 이 브라우저에 저장합니다. 암호화되지 않으므로 실제 계좌번호·키·개인정보를 적지 마세요. 연결과 계좌 선택은 웹페이지를 새로고침하면 예시 상태로 초기화됩니다. 브라우저 자료 삭제나 주소 변경 시 별명은 이어지지 않습니다. 같은 가상 계좌는 같은 별명을 씁니다. 비우면 기본 이름으로 표시합니다." })
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
							onClick: () => act({ type: "save" }),
							children: "저장"
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "text-button",
								"aria-label": `${a.maskedLabel} 별명 편집`,
								onClick: () => act({
									type: "edit-alias",
									id: a.id
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, { icon: Pencil }), "별명 편집"]
							})
						] }, a.id)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "connection-error-examples",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "오류 체험" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "provider-actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-button",
										disabled: !!active.failureKind,
										onClick: () => act({
											type: "failure-example",
											failureKind: "auth-expired",
											now: Date.now()
										}),
										children: "인증 만료 체험"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-button",
										disabled: !!active.failureKind,
										onClick: () => act({
											type: "failure-example",
											failureKind: "rate-limited",
											now: Date.now()
										}),
										children: "요청 제한(429) 체험"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "웹 가상 상태만 바뀝니다. 실제 서버 오류를 관측하거나 금융 요청을 보내지 않습니다." }),
								active.failureKind && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "계좌 선택·별명은 오류를 해제하지 않습니다. 연결 해제는 현재 웹 가상 연결만 제거하며 저장한 별명·개인 기록·실제 계좌에는 영향이 없습니다." })
							]
						}),
						active.failureKind === "auth-expired" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							children: "인증 만료 · 자동 재인증하지 않습니다. 연결 해제 후 연결 추가에서 명시적으로 다시 추가해 주세요."
						}),
						active.failureKind === "rate-limited" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							children: "요청 제한(429) · 체험 시작부터 데모 대기 30초 후 아래 다시 확인을 눌러 주세요. 대기 중에는 복구되지 않고, 시간이 지나도 자동 재시도하지 않습니다. 이 시간은 공식 한도나 서버 Retry-After가 아닙니다."
						}),
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
									disabled: active.failureKind === "auth-expired",
									onClick: () => act({
										type: "retry",
										now: Date.now()
									}),
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
				(state.view === "alias" || state.view === "details") && storageNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					children: storageNotice
				})
			]
		})]
	});
}
var import_react, import_jsx_runtime, queryNames, noConnectionSubscription;
function init_WebDemoConnections$1() {
	return (init_WebDemoConnections$1 = __esmMin((() => {
		import_react = require_react();
		init_info(), init_pencil(), init_plus(), init_refresh_cw(), init_unlink(), init_x();
		init_WidgetMetricHelp();
		init_WebDemoConnections();
		init_BrandDisplayContext();
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
		noConnectionSubscription = () => () => {};
	})))();
}
init_WebDemoConnections$1();
export { WebDemoConnections };
