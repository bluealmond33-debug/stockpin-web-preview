import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D3ER87f6.js";
import { a as init_AppIcon, c as Info, l as init_info, t as AppIcon } from "./AppIcon-diqwIFgz.js";
import { a as Unlink, c as init_refresh_cw, i as init_x, l as Plus, n as init_ProviderGrid, o as init_unlink, r as X, s as RefreshCw, t as ProviderGrid, u as init_plus } from "./ProviderGrid-RfhjhiiH.js";
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
/** Pure wall-clock projection; injected milliseconds make delayed ticks testable. */
function webDemoCountdown(deadline, now) {
	if (deadline === null) return "자동 갱신 꺼짐";
	const seconds = Math.max(0, Math.ceil((deadline - now) / 1e3));
	return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
/** In-memory web timer only. No catch-up bursts after background/offline pauses. */
function startWebDemoClock(minutes, host, display, check) {
	let cancelTick;
	let disposed = false;
	let deadline = null;
	const reset = () => {
		cancelTick?.();
		cancelTick = void 0;
		if (disposed) return;
		if (!minutes) {
			display("자동 갱신 꺼짐");
			return;
		}
		if (!host.available()) {
			deadline = null;
			display("다음 확인 일시정지");
			return;
		}
		deadline = host.now() + minutes * 6e4;
		display(`다음 확인 ${webDemoCountdown(deadline, host.now())}`);
		cancelTick = host.everySecond(() => {
			if (disposed) return;
			if (!host.available()) {
				reset();
				return;
			}
			const now = host.now();
			if (deadline !== null && now >= deadline) {
				check(now);
				deadline = now + minutes * 6e4;
			}
			display(`다음 확인 ${webDemoCountdown(deadline, now)}`);
		});
	};
	const unsubscribe = host.subscribe(reset);
	reset();
	return () => {
		disposed = true;
		cancelTick?.();
		unsubscribe();
	};
}
function demoAccounts(provider) {
	return ["1001", "2002"].map((suffix) => ({
		id: `${provider}-${suffix}`,
		maskedLabel: `${demoProviderName(provider)} · ••••${suffix}`
	}));
}
function createWebDemoConnectionsState() {
	return {
		connections: [
			"never",
			"succeeded",
			"partial",
			"failed"
		].map((queryState, i) => ({
			id: `demo-${i}`,
			provider: i < 2 ? "kiwoom" : "toss",
			environment: "live",
			queryState,
			selectedAccountIds: [demoAccounts(i < 2 ? "kiwoom" : "toss")[0].id]
		})),
		view: "grid",
		activeId: null,
		provider: "kiwoom",
		environment: "live",
		consent: false,
		selectedAccountIds: [],
		nextId: 4,
		notice: "",
		lastCheckedAt: null
	};
}
function webDemoConnectionsReducer(state, action) {
	const active = state.connections.find((c) => c.id === state.activeId);
	switch (action.type) {
		case "scheduled-check": return Number.isFinite(new Date(action.now).getTime()) ? {
			...state,
			lastCheckedAt: new Date(action.now).toISOString()
		} : state;
		case "open": return state.view === "grid" && state.connections.some((c) => c.id === action.id) ? {
			...state,
			view: "details",
			activeId: action.id,
			notice: ""
		} : state;
		case "retry":
		case "example": {
			if (state.view !== "details" || !active) return state;
			const queryState = action.type === "example" ? action.queryState : "succeeded";
			return {
				...state,
				connections: state.connections.map((c) => c.id === active.id ? {
					...c,
					queryState
				} : c),
				notice: action.type === "retry" ? "가상 조회 예시를 완료했습니다. 실제 조회는 하지 않았습니다." : "가상 연결 상태 예시를 바꿨습니다."
			};
		}
		case "edit-accounts": return state.view === "details" && active ? {
			...state,
			view: "accounts",
			provider: active.provider,
			environment: active.environment,
			consent: true,
			selectedAccountIds: [...active.selectedAccountIds]
		} : state;
		case "disconnect": return state.view === "details" && active ? {
			...state,
			view: "disconnect"
		} : state;
		case "cancel-disconnect": return state.view === "disconnect" ? {
			...state,
			view: "details"
		} : state;
		case "confirm-disconnect": return state.view === "disconnect" && active ? {
			...state,
			connections: state.connections.filter((c) => c.id !== active.id),
			view: "grid",
			activeId: null,
			notice: "가상 연결을 해제했습니다. 실제 계좌에는 영향이 없습니다."
		} : state;
		case "close": return {
			...state,
			view: "grid",
			activeId: null,
			consent: false,
			selectedAccountIds: []
		};
		case "add": return state.view === "grid" ? {
			...state,
			view: "picker",
			consent: false,
			selectedAccountIds: []
		} : state;
		case "choose":
			if (state.view !== "picker") return state;
			if (action.environment !== "live") return {
				...state,
				notice: "실전 계좌만 연결할 수 있습니다"
			};
			return {
				...state,
				view: "consent",
				provider: action.provider,
				environment: "live",
				consent: false,
				selectedAccountIds: [],
				notice: ""
			};
		case "consent": return state.view === "consent" ? {
			...state,
			consent: action.checked
		} : state;
		case "continue": return state.view === "consent" && state.consent ? {
			...state,
			view: "accounts"
		} : state;
		case "toggle-account": {
			if (state.view !== "accounts" || !demoAccounts(state.provider).some((a) => a.id === action.id)) return state;
			const selectedAccountIds = state.selectedAccountIds.includes(action.id) ? state.selectedAccountIds.filter((id) => id !== action.id) : [...state.selectedAccountIds, action.id];
			return {
				...state,
				selectedAccountIds
			};
		}
		case "save": {
			if (state.view !== "accounts" || !state.consent || !state.selectedAccountIds.length) return state;
			if (active) return {
				...state,
				connections: state.connections.map((c) => c.id === active.id ? {
					...c,
					selectedAccountIds: [...state.selectedAccountIds],
					queryState: "never"
				} : c),
				view: "details",
				notice: "가상 조회 계좌를 바꿨습니다. 조회 전 상태입니다."
			};
			const id = `demo-${state.nextId}`;
			const connection = {
				id,
				provider: state.provider,
				environment: state.environment,
				queryState: "never",
				selectedAccountIds: [...state.selectedAccountIds]
			};
			return {
				...state,
				connections: [...state.connections, connection],
				nextId: state.nextId + 1,
				activeId: id,
				view: "details",
				notice: "가상 연결을 추가했습니다. 아직 조회하지 않았습니다."
			};
		}
	}
}
var WEB_DEMO_CONNECTIONS_NOW, demoProviderName;
function init_WebDemoConnectionsState() {
	return (init_WebDemoConnectionsState = __esmMin((() => {
		WEB_DEMO_CONNECTIONS_NOW = "2026-01-15T03:00:00Z";
		demoProviderName = (provider) => provider === "kiwoom" ? "키움증권" : "토스증권";
	})))();
}
/** Web-only in-memory connections; never an authentication or native IO owner. */
function WebDemoConnections({ refreshMinutes = 0 }) {
	const [state, dispatch] = (0, import_react.useReducer)(webDemoConnectionsReducer, void 0, createWebDemoConnectionsState);
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
	const title = state.view === "picker" ? "금융사 연결 추가" : state.view === "consent" ? `${demoProviderName(state.provider)} 연결 · 1/2` : state.view === "accounts" ? "계좌 선택 · 2/2" : state.view === "disconnect" ? "연결을 해제할까요?" : `${active ? demoProviderName(active.provider) : ""} 연결 상세`;
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "modal-copy",
					children: "웹 가상 연결 · 실제 키·계좌번호를 입력하지 마세요."
				}),
				state.view === "picker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderGrid, {
					compactWeb: true,
					now: "2026-01-15T03:00:00Z",
					items: [["kiwoom", "live"], ["toss", "live"]].map(([provider, environment]) => ({
						id: `choose-${provider}-${environment}`,
						provider,
						environment,
						state: "disconnected",
						onConnect: () => dispatch({
							type: "choose",
							provider,
							environment
						})
					}))
				}),
				state.view === "consent" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						children: "계좌 확인"
					})]
				})] }),
				state.view === "accounts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "계좌 · 하나 이상 선택" }), demoAccounts(state.provider).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "checkbox-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: state.selectedAccountIds.includes(a.id),
						onChange: () => dispatch({
							type: "toggle-account",
							id: a.id
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [a.maskedLabel, " · 실전"] })]
				}, a.id))] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				})] }),
				state.view === "details" && active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "connection-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "provider-summary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: demoProviderName(active.provider) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: queryNames[active.queryState] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: demoAccounts(active.provider).filter((a) => active.selectedAccountIds.includes(a.id)).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [a.maskedLabel, " · 실전"] }, a.id)) }),
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
				})
			]
		})]
	});
}
var import_react, import_jsx_runtime, queryNames;
function init_WebDemoConnections() {
	return (init_WebDemoConnections = __esmMin((() => {
		import_react = require_react();
		init_info(), init_plus(), init_refresh_cw(), init_unlink(), init_x();
		init_AppIcon();
		init_ProviderGrid();
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
init_WebDemoConnections();
export { WebDemoConnections };
