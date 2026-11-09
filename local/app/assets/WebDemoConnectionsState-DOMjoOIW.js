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
export { demoAccounts as a, startWebDemoClock as c, createWebDemoConnectionsState as i, webDemoConnectionsReducer as l, WEB_DEMO_CONNECTIONS_NOW as n, demoProviderName as o, createDemoAliasStore as r, init_WebDemoConnectionsState as s, DEMO_ALIAS_KEY as t, webDemoCountdown as u };
