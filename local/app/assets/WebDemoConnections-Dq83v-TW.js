import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
import { a as init_AppIcon, c as Info, d as init_createLucideIcon, l as init_info, t as AppIcon, u as createLucideIcon } from "./AppIcon-HxmRgjk4.js";
import { a as Unlink, c as init_refresh_cw, i as init_x, l as Plus, n as init_ProviderGrid, o as init_unlink, r as X, s as RefreshCw, t as ProviderGrid, u as init_plus } from "./ProviderGrid-B7Y_PoOR.js";
import { n as init_BrandDisplayContext, r as useBrandDisplayMode } from "./BrandDisplayContext-CHYVtE8_.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-Cjf5qekk.js";
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
			l.href = "/local/app/css-source/src/features/connections/WebDemoConnections.css?v=source-build-r99";
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
			l.href = "/local/app/css-source/src/features/connections/connections-hub.css?v=source-build-r99";
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
function validAliases(value) {
	return !!value && typeof value === "object" && !Array.isArray(value) && Object.entries(value).every(([id, alias]) => /^(kiwoom|toss)-(1001|2002)$/.test(id) && typeof alias === "string" && alias.length <= 32 && !/[\u0000-\u001f\u007f]/.test(alias));
}
/** Only aliases for four fixed example IDs persist; connections/auth/selection never do.
* Exact pre-write comparison detects sequential stale tabs, not atomic cross-tab CAS. */
function createDemoAliasStore(storage) {
	let expected = null;
	let writable = !!storage;
	let aliases = {};
	try {
		expected = storage?.getItem("stockpin.web-demo.account-aliases.v1") ?? null;
		if (expected !== null) {
			const parsed = JSON.parse(expected);
			if (!parsed || Object.keys(parsed).sort().join(",") !== "aliases,version" || parsed.version !== 1 || !validAliases(parsed.aliases)) writable = false;
			else aliases = { ...parsed.aliases };
		}
	} catch {
		writable = false;
	}
	return {
		aliases,
		save(value) {
			if (!writable || !storage || !validAliases(value)) return false;
			try {
				if (storage.getItem("stockpin.web-demo.account-aliases.v1") !== expected) {
					writable = false;
					return false;
				}
				const raw = JSON.stringify({
					version: 1,
					aliases: value
				});
				storage.setItem(DEMO_ALIAS_KEY, raw);
				if (storage.getItem("stockpin.web-demo.account-aliases.v1") !== raw) {
					writable = false;
					return false;
				}
				expected = raw;
				return true;
			} catch {
				writable = false;
				return false;
			}
		}
	};
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
		aliases: {},
		draftAliases: {},
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
		case "alias": return state.view === "accounts" && demoAccounts(state.provider).some((a) => a.id === action.id) && action.value.length <= 32 && !/[\u0000-\u001f\u007f]/.test(action.value) ? {
			...state,
			draftAliases: {
				...state.draftAliases,
				[action.id]: action.value
			}
		} : state;
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
			selectedAccountIds: [...active.selectedAccountIds],
			draftAliases: { ...state.aliases }
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
			selectedAccountIds: [],
			notice: ""
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
				draftAliases: { ...state.aliases },
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
			const aliases = { ...state.aliases };
			for (const id of state.selectedAccountIds) {
				const value = state.draftAliases[id]?.trim();
				if (value) aliases[id] = value;
				else delete aliases[id];
			}
			if (active) return {
				...state,
				aliases,
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
				aliases,
				connections: [...state.connections, connection],
				nextId: state.nextId + 1,
				activeId: id,
				view: "details",
				notice: "가상 연결을 추가했습니다. 아직 조회하지 않았습니다."
			};
		}
	}
}
var DEMO_ALIAS_KEY, WEB_DEMO_CONNECTIONS_NOW, demoProviderName;
function init_WebDemoConnectionsState() {
	return (init_WebDemoConnectionsState = __esmMin((() => {
		DEMO_ALIAS_KEY = "stockpin.web-demo.account-aliases.v1";
		WEB_DEMO_CONNECTIONS_NOW = "2026-01-15T03:00:00Z";
		demoProviderName = (provider) => provider === "kiwoom" ? "키움증권" : "토스증권";
	})))();
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
function WebDemoConnections({ refreshMinutes = 0 }) {
	const brandDisplayMode = useBrandDisplayMode();
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
			if (next !== state) setStorageNotice(aliasStore.save(next.aliases) ? "별명을 이 브라우저에 저장했습니다." : "별명은 이번 화면에서만 적용됩니다. 저장을 확인하지 못했습니다. 다른 창의 변경·저장소 설정을 확인한 뒤 다시 여세요.");
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "connections-hub",
				"aria-label": "연결 범주",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "연결 범주" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "connections-hub-categories",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "증권·계좌" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "키움·토스 가상 체험" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "시장정보·공시" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "외부 서비스 앱 연결 미지원" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "도구·MCP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "앱 연결 미지원" })] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
						compactBrandDisplayMode: brandDisplayMode,
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dialog", {
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
									children: [
										brandDisplayMode === "original" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: `/local/app/logos/${provider}.png`,
											alt: "",
											width: 32,
											height: 32
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: demoProviderName(provider) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "connection-service-status",
											children: "앱 지원 · 웹 체험"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											"가상 계좌 ",
											new Set(state.connections.filter((c) => c.provider === provider).flatMap((c) => c.selectedAccountIds)).size,
											"개"
										] })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
									label: demoProviderName(provider),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "앱에서는 지원 금융사의 인증·조회 기능을 사용합니다. 여기서는 실제 인증 없이 가상 계좌 여러 개를 선택하는 흐름만 체험합니다. 실제 지원 범위와 조회 결과는 앱에서 확인하세요." })
								})]
							}, provider)), unsupportedConnectionGroups.flatMap((group) => group.services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "connection-service-row",
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
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "공식 로고가 없어 중립 서비스 기호를 사용합니다. 이 항목은 웹 체험이나 실제 연결을 제공하지 않습니다." })]
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["가상 계좌 별명", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								maxLength: 32,
								autoComplete: "off",
								placeholder: "예: 장기 연습 · 실제 개인정보 제외",
								disabled: !state.selectedAccountIds.includes(a.id),
								value: state.draftAliases[a.id] ?? "",
								onChange: (event) => dispatch({
									type: "alias",
									id: a.id,
									value: event.target.value
								})
							})] })]
						}, a.id))] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
							label: "별명 보관",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "별명만 이 브라우저에 저장합니다. 암호화되지 않으므로 실제 계좌번호·키·개인정보를 적지 마세요. 연결과 계좌 선택은 화면을 나가면 초기화됩니다. 브라우저 자료 삭제나 주소 변경 시 별명은 이어지지 않습니다. 같은 가상 계좌는 같은 별명을 씁니다." })
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
								state.aliases[a.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [state.aliases[a.id], " · "] }),
								a.maskedLabel,
								" · 실전"
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
			})
		]
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
		init_BrandDisplayContext();
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
