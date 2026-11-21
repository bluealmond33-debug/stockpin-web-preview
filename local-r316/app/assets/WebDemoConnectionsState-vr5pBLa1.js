import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
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
		get writable() {
			return writable;
		},
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
	return ["1001", "2002"].map((suffix, index) => ({
		id: `${provider}-${suffix}`,
		maskedLabel: `${demoProviderName(provider)} · ••••${suffix}`,
		aliasPlaceholder: provider === "kiwoom" ? ["국내주식", "해외배당·장기투자"][index] : ["해외주식", "해외 장기투자"][index]
	}));
}
function createWebDemoConnectionsState() {
	return {
		aliases: {},
		draftAliases: {},
		aliasAccountId: null,
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
			selectedAccountIds: [demoAccounts(i < 2 ? "kiwoom" : "toss")[i % 2].id]
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
/** App-lifetime web-only owner; neither authentication nor durable registrations. */
function createWebDemoConnectionsStore(aliases = {}, aliasStore = createDemoAliasStore(null)) {
	if (!validAliases(aliases)) throw new Error("Invalid web example aliases");
	const freeze = (value) => {
		const snapshot = {
			...value,
			aliases: { ...value.aliases },
			draftAliases: { ...value.draftAliases },
			selectedAccountIds: [...value.selectedAccountIds],
			connections: value.connections.map((c) => ({
				...c,
				selectedAccountIds: [...c.selectedAccountIds]
			}))
		};
		Object.freeze(snapshot.aliases);
		Object.freeze(snapshot.draftAliases);
		Object.freeze(snapshot.selectedAccountIds);
		for (const connection of snapshot.connections) {
			Object.freeze(connection.selectedAccountIds);
			Object.freeze(connection);
		}
		Object.freeze(snapshot.connections);
		return Object.freeze(snapshot);
	};
	let state = freeze({
		...createWebDemoConnectionsState(),
		aliases
	});
	const listeners = /* @__PURE__ */ new Set();
	return Object.freeze({
		aliasStore,
		getSnapshot: () => state,
		getConnectionCount: () => state.connections.length,
		subscribe: (listener) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		dispatch: (action) => {
			const next = webDemoConnectionsReducer(state, action);
			if (next === state) return;
			state = freeze(next);
			for (const listener of [...listeners]) listener();
		}
	});
}
function webDemoConnectionsReducer(state, action) {
	const active = state.connections.find((c) => c.id === state.activeId);
	const selectedFixedAccount = (id) => !!active && active.selectedAccountIds.includes(id) && demoAccounts(active.provider).some((a) => a.id === id);
	const clearAliasDraft = {
		aliasAccountId: null,
		draftAliases: {}
	};
	switch (action.type) {
		case "edit-alias": return state.view === "details" && active && selectedFixedAccount(action.id) ? {
			...state,
			view: "alias",
			provider: active.provider,
			aliasAccountId: action.id,
			draftAliases: { ...state.aliases }
		} : state;
		case "alias": return state.view === "alias" && state.aliasAccountId === action.id && selectedFixedAccount(action.id) && action.value.length <= 32 && !/[\u0000-\u001f\u007f]/.test(action.value) ? {
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
			...clearAliasDraft,
			view: "details",
			activeId: action.id,
			notice: ""
		} : state;
		case "failure-example":
			if (state.view !== "details" || !active || active.failureKind || !Number.isFinite(action.now) || !Number.isFinite(new Date(action.now + 3e4).getTime())) return state;
			return {
				...state,
				connections: state.connections.map((c) => c.id === active.id ? {
					...c,
					queryState: "failed",
					failureKind: action.failureKind,
					retryAvailableAt: action.failureKind === "rate-limited" ? action.now + 3e4 : void 0
				} : c),
				notice: action.failureKind === "rate-limited" ? "요청 제한(429) 체험입니다. 데모 대기 30초 후 다시 확인을 눌러 주세요. 자동 재시도하지 않습니다." : "인증 만료 체험입니다. 자동 재인증하지 않습니다. 연결 해제 후 연결 추가에서 명시적으로 다시 추가해 주세요. 실제 계좌에는 영향이 없습니다."
			};
		case "retry":
		case "example": {
			if (state.view !== "details" || !active) return state;
			if (active.failureKind === "auth-expired") return state;
			if (active.failureKind === "rate-limited" && (action.type !== "retry" || !Number.isFinite(action.now) || !Number.isFinite(active.retryAvailableAt) || action.now < active.retryAvailableAt)) return state;
			const queryState = action.type === "example" ? action.queryState : "succeeded";
			return {
				...state,
				connections: state.connections.map((c) => c.id === active.id ? {
					...c,
					queryState,
					failureKind: void 0,
					retryAvailableAt: void 0
				} : c),
				notice: action.type === "retry" ? "가상 조회 예시를 완료했습니다. 실제 조회는 하지 않았습니다." : "가상 연결 상태 예시를 바꿨습니다."
			};
		}
		case "edit-accounts": return state.view === "details" && active ? {
			...state,
			...clearAliasDraft,
			view: "accounts",
			provider: active.provider,
			environment: active.environment,
			consent: true,
			selectedAccountIds: [...active.selectedAccountIds]
		} : state;
		case "disconnect": return state.view === "details" && active ? {
			...state,
			...clearAliasDraft,
			view: "disconnect"
		} : state;
		case "cancel-disconnect": return state.view === "disconnect" ? {
			...state,
			...clearAliasDraft,
			view: "details"
		} : state;
		case "confirm-disconnect": return state.view === "disconnect" && active ? {
			...state,
			...clearAliasDraft,
			connections: state.connections.filter((c) => c.id !== active.id),
			view: "grid",
			activeId: null,
			notice: "가상 연결을 해제했습니다. 실제 계좌에는 영향이 없습니다."
		} : state;
		case "close": return {
			...state,
			...clearAliasDraft,
			view: "grid",
			activeId: null,
			consent: false,
			selectedAccountIds: []
		};
		case "add": return state.view === "grid" ? {
			...state,
			...clearAliasDraft,
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
				...clearAliasDraft,
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
			...clearAliasDraft,
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
			if (state.view === "alias") {
				const id = state.aliasAccountId;
				if (!id || !selectedFixedAccount(id)) return state;
				const aliases = { ...state.aliases };
				const value = state.draftAliases[id]?.trim();
				if (value) aliases[id] = value;
				else delete aliases[id];
				return {
					...state,
					...clearAliasDraft,
					aliases,
					view: "details"
				};
			}
			if (state.view !== "accounts" || !state.consent || !state.selectedAccountIds.length) return state;
			if (active) {
				const sameScope = active.selectedAccountIds.length === state.selectedAccountIds.length && active.selectedAccountIds.every((id) => state.selectedAccountIds.includes(id));
				return {
					...state,
					...clearAliasDraft,
					connections: state.connections.map((c) => c.id !== active.id || sameScope ? c : {
						...c,
						selectedAccountIds: [...state.selectedAccountIds],
						queryState: c.failureKind ? "failed" : "never"
					}),
					view: "details",
					notice: ""
				};
			}
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
				...clearAliasDraft,
				connections: [...state.connections, connection],
				nextId: state.nextId + 1,
				activeId: id,
				view: "details",
				notice: ""
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
export { createWebDemoConnectionsStore as a, init_WebDemoConnectionsState as c, webDemoCountdown as d, createWebDemoConnectionsState as i, startWebDemoClock as l, WEB_DEMO_CONNECTIONS_NOW as n, demoAccounts as o, createDemoAliasStore as r, demoProviderName as s, DEMO_ALIAS_KEY as t, webDemoConnectionsReducer as u };
