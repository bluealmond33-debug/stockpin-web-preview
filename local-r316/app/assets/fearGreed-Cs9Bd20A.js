import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function instant(v) {
	if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(v)) throw Error("invalid");
	const t = Date.parse(v);
	if (!Number.isFinite(t) || new Date(t).toISOString().replace(".000Z", "Z") !== v) throw Error("invalid");
	return t;
}
function parseFearQuote(value, now) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("invalid");
	const q = value;
	if (Object.keys(q).sort().join(",") !== "asOf,classification,kind,nextUpdateAt,observedAt,sourceUrl,value" || q.kind !== "alternative_bitcoin_fng_v1" || q.sourceUrl !== "https://alternative.me/crypto/fear-and-greed-index/" || !Number.isInteger(q.value) || Number(q.value) < 0 || Number(q.value) > 100 || typeof q.classification !== "string" || !Object.hasOwn(FEAR_LABELS, q.classification)) throw Error("invalid");
	const source = instant(q.asOf), observed = instant(q.observedAt), next = instant(q.nextUpdateAt);
	if (source > observed || observed > Date.parse(now) || !Number.isFinite(Date.parse(now)) || next < observed || next - observed > 1728e5) throw Error("invalid");
	return { ...q };
}
function coalescedFearRequest(load) {
	let flight = null;
	return () => {
		if (flight) return flight;
		flight = Promise.resolve().then(load).finally(() => {
			flight = null;
		});
		return flight;
	};
}
function fearQuoteIsStale(q, clock) {
	const now = Date.parse(clock);
	return now - Date.parse(q.asOf) > 1296e5 || now > Date.parse(q.nextUpdateAt) + 36e5;
}
var FEAR_KEY, FEAR_SOURCE, FEAR_LABELS, FearGreedReader;
function init_fearGreed() {
	return (init_fearGreed = __esmMin((() => {
		FEAR_KEY = "stockpin:bitcoin-fear-greed:v1";
		FEAR_SOURCE = "https://alternative.me/crypto/fear-and-greed-index/";
		FEAR_LABELS = {
			"Extreme Fear": "극단적 공포",
			Fear: "공포",
			Neutral: "중립",
			Greed: "탐욕",
			"Extreme Greed": "극단적 탐욕"
		};
		FearGreedReader = class {
			storage;
			fetchQuote;
			clock;
			state = {
				quote: null,
				busy: false,
				blocked: false,
				error: null
			};
			listeners = /* @__PURE__ */ new Set();
			disposed = false;
			floor;
			constructor(storage, fetchQuote, clock) {
				this.storage = storage;
				this.fetchQuote = fetchQuote;
				this.clock = clock;
				this.floor = Date.parse(clock());
				try {
					const raw = storage.getItem(FEAR_KEY);
					if (raw !== null) {
						if (raw.length > 4096) throw Error("invalid");
						this.state.quote = parseFearQuote(JSON.parse(raw), clock());
					}
				} catch {
					this.state = {
						...this.state,
						blocked: true,
						error: "저장된 시장 심리를 확인할 수 없습니다. 원본은 유지합니다."
					};
				}
			}
			subscribe(listener) {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			}
			update(state) {
				this.state = state;
				for (const listener of this.listeners) listener();
			}
			async refresh() {
				if (this.disposed || this.state.busy || this.state.blocked) return;
				if (!Number.isFinite(Date.parse(this.clock())) || Date.parse(this.clock()) < this.floor) {
					this.update({
						...this.state,
						error: "기기 시각을 확인해 주세요. 이전 값은 유지합니다."
					});
					return;
				}
				this.floor = Date.parse(this.clock());
				let expected;
				try {
					expected = this.storage.getItem(FEAR_KEY);
				} catch {
					this.update({
						...this.state,
						blocked: true,
						error: "저장값을 확인할 수 없습니다. 이전 값은 유지합니다."
					});
					return;
				}
				this.update({
					...this.state,
					busy: true,
					error: null
				});
				try {
					const wire = await this.fetchQuote();
					if (this.disposed) return;
					const quote = parseFearQuote(wire, this.clock());
					if (Date.parse(this.clock()) < this.floor) throw Error("clock");
					const old = this.state.quote;
					if (old && (Date.parse(quote.asOf) < Date.parse(old.asOf) || Date.parse(quote.observedAt) < Date.parse(old.observedAt))) throw Error("older");
					if (this.storage.getItem("stockpin:bitcoin-fear-greed:v1") !== expected) {
						this.update({
							...this.state,
							blocked: true,
							error: "다른 창에서 시장 자료가 바뀌었습니다. 페이지를 다시 열어 확인해 주세요."
						});
						return;
					}
					try {
						this.storage.setItem(FEAR_KEY, JSON.stringify(quote));
					} catch {
						this.update({
							...this.state,
							blocked: true,
							error: "시장 자료를 저장하지 못했습니다. 이전 값은 유지합니다."
						});
						return;
					}
					this.update({
						quote,
						busy: false,
						blocked: false,
						error: null
					});
				} catch {
					if (!this.disposed) this.update({
						...this.state,
						error: "시장 심리를 갱신하지 못했습니다. 이전 값은 유지합니다."
					});
				} finally {
					if (!this.disposed && this.state.busy) this.update({
						...this.state,
						busy: false
					});
				}
			}
			dispose() {
				this.disposed = true;
				this.listeners.clear();
			}
		};
	})))();
}
export { fearQuoteIsStale as a, coalescedFearRequest as i, FEAR_SOURCE as n, init_fearGreed as o, FearGreedReader as r, FEAR_LABELS as t };
