import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function parseDecimal(value) {
	if (value.length > MAX_DECIMAL_LENGTH || !DECIMAL.test(value)) throw new Error("Invalid decimal string");
	const negative = value.startsWith("-");
	const [whole = "0", fraction = ""] = (negative ? value.slice(1) : value).split(".");
	return {
		coefficient: BigInt(`${negative ? "-" : ""}${whole}${fraction}`),
		scale: fraction.length
	};
}
function renderDecimal(coefficient, scale) {
	if (coefficient === 0n) return "0";
	const negative = coefficient < 0n;
	const digits = (negative ? -coefficient : coefficient).toString().padStart(scale + 1, "0");
	const unsigned = scale === 0 ? digits : `${digits.slice(0, -scale)}.${digits.slice(-scale)}`.replace(/\.?0+$/, "");
	return `${negative ? "-" : ""}${unsigned}`;
}
/** Exact base-ten addition, including amounts larger than Number.MAX_SAFE_INTEGER. */
function addDecimalStrings(left, right) {
	const a = parseDecimal(left);
	const b = parseDecimal(right);
	const scale = Math.max(a.scale, b.scale);
	return renderDecimal(a.coefficient * 10n ** BigInt(scale - a.scale) + b.coefficient * 10n ** BigInt(scale - b.scale), scale);
}
/** Exact comparator for sorting; unknown amounts must be handled separately. */
function compareDecimalStrings(left, right) {
	const a = parseDecimal(left);
	const b = parseDecimal(right);
	const scale = Math.max(a.scale, b.scale);
	const delta = a.coefficient * 10n ** BigInt(scale - a.scale) - b.coefficient * 10n ** BigInt(scale - b.scale);
	return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}
/** Exact price-return percentage; rounded half away from zero to two decimals. */
function decimalRatioPercent(numerator, denominator) {
	try {
		const a = parseDecimal(numerator), b = parseDecimal(denominator);
		if (b.coefficient <= 0n) return null;
		const negative = a.coefficient < 0n;
		const n = (negative ? -a.coefficient : a.coefficient) * 10n ** BigInt(b.scale) * 10000n;
		const d = b.coefficient * 10n ** BigInt(a.scale);
		const units = (2n * n + d) / (2n * d);
		const result = renderDecimal(negative ? -units : units, 2);
		return result.length <= MAX_DECIMAL_LENGTH ? result : null;
	} catch {
		return null;
	}
}
/**
* Rounded display ratios in 1/100 percentage points. Money remains exact;
* the largest-remainder method keeps the displayed circle at 100%.
* Negative positions need a different chart and are deliberately unsupported.
*/
function allocationBasisPoints(values, currency) {
	if (values.length === 0) return null;
	const parsed = [];
	for (const value of values) {
		if (value === null || value.currency !== currency) return null;
		try {
			const amount = parseDecimal(value.amount);
			if (amount.coefficient < 0n) return null;
			parsed.push(amount);
		} catch {
			return null;
		}
	}
	const scale = parsed.reduce((maximum, value) => Math.max(maximum, value.scale), 0);
	const coefficients = parsed.map((value) => value.coefficient * 10n ** BigInt(scale - value.scale));
	const total = coefficients.reduce((sum, value) => sum + value, 0n);
	if (total === 0n) return null;
	const ratios = coefficients.map((value, index) => ({
		index,
		units: Number(value * 10000n / total),
		remainder: value * 10000n % total
	}));
	const remaining = 1e4 - ratios.reduce((sum, ratio) => sum + ratio.units, 0);
	const priority = [...ratios].sort((left, right) => left.remainder === right.remainder ? left.index - right.index : left.remainder > right.remainder ? -1 : 1);
	for (let index = 0; index < remaining; index += 1) priority[index].units += 1;
	return ratios.map((ratio) => ratio.units);
}
/** No implicit FX conversion is permitted. */
function sumMoney(values, currency) {
	return values.reduce((total, value) => {
		if (value.currency !== currency) throw new Error("Money currency mismatch");
		return {
			amount: addDecimalStrings(total.amount, value.amount),
			currency
		};
	}, {
		amount: "0",
		currency
	});
}
function sumKnown(values, currency) {
	if (values.some((value) => value === null)) return null;
	return sumMoney(values, currency);
}
function assertMoney(value, expectedCurrency) {
	if (value === null) return;
	if (value.currency !== expectedCurrency) throw new Error("Money currency mismatch");
	parseDecimal(value.amount);
}
function validateSnapshot(snapshot) {
	const accounts = new Map(snapshot.accounts.map((account) => [account.id, account]));
	if (accounts.size !== snapshot.accounts.length) throw new Error("Duplicate account");
	const observationIds = /* @__PURE__ */ new Set();
	for (const observation of snapshot.accountObservations ?? []) {
		if (!accounts.has(observation.accountId) || observationIds.has(observation.accountId)) throw new Error("Invalid account observation");
		observationIds.add(observation.accountId);
	}
	const balanceKeys = /* @__PURE__ */ new Set();
	for (const balance of snapshot.balances) {
		if (!accounts.get(balance.accountId)?.supportedCurrencies.includes(balance.currency)) throw new Error("Unknown balance scope");
		const key = JSON.stringify([balance.accountId, balance.currency]);
		if (balanceKeys.has(key)) throw new Error("Duplicate balance");
		balanceKeys.add(key);
		for (const value of [
			balance.settledCash,
			balance.unsettledCash,
			balance.withdrawableCash,
			balance.buyingPower
		]) assertMoney(value, balance.currency);
	}
	const positionKeys = /* @__PURE__ */ new Set();
	for (const position of snapshot.positions) {
		const account = accounts.get(position.accountId);
		if (!account?.supportedCurrencies.includes(position.currency) || account.provider !== position.provider) throw new Error("Unknown position scope");
		const key = JSON.stringify([
			position.accountId,
			position.instrumentId,
			position.market,
			position.currency
		]);
		if (positionKeys.has(key)) throw new Error("Duplicate position");
		positionKeys.add(key);
		parseDecimal(position.quantity);
		for (const value of [
			position.avgCost,
			position.currentPrice,
			position.marketValue,
			position.unrealizedPnl
		]) assertMoney(value, position.currency);
	}
}
/**
* Subtotal of the supplied normalized rows in their original currency only.
* Call after account selection. It neither establishes whole-account coverage
* nor changes cached freshness; missing rows never establish a zero holding.
*/
function summarizeKnownHoldings(snapshot, currency) {
	const positions = snapshot?.positions.filter((position) => position.currency === currency) ?? [];
	const unknown = {
		positionCount: positions.length,
		marketValue: null,
		unrealizedPnl: null
	};
	if (!snapshot || positions.length === 0) return unknown;
	try {
		validateSnapshot(snapshot);
		return {
			positionCount: positions.length,
			marketValue: sumKnown(positions.map((position) => position.marketValue), currency),
			unrealizedPnl: sumKnown(positions.map((position) => position.unrealizedPnl), currency)
		};
	} catch {
		return unknown;
	}
}
function unknownTotals(currency) {
	return {
		currency,
		cash: null,
		holdings: null,
		totalAssets: null,
		unrealizedPnl: null
	};
}
function errorAffectsAccount(error, account) {
	if (error.accountId !== null) return error.accountId === account.id;
	return error.provider === null || error.provider === account.provider;
}
/** Filters data and errors together. Completeness is restored only from explicit account metadata. */
function selectAccountSnapshot(snapshot, accountId) {
	const account = snapshot.accounts.find((candidate) => candidate.id === accountId);
	if (!account) throw new Error("Unknown account filter");
	const errors = snapshot.errors.filter((error) => errorAffectsAccount(error, account));
	const observation = snapshot.accountObservations?.find((candidate) => candidate.accountId === accountId);
	return {
		...snapshot,
		accounts: [account],
		balances: snapshot.balances.filter((balance) => balance.accountId === accountId),
		positions: snapshot.positions.filter((position) => position.accountId === accountId),
		holdingTraces: snapshot.holdingTraces?.filter((trace) => trace.accountId === accountId),
		errors,
		completeness: errors.length > 0 ? "partial" : observation?.completeness ?? snapshot.completeness,
		freshness: observation?.freshness ?? snapshot.freshness,
		sourceAsOf: observation ? observation.sourceAsOf : snapshot.sourceAsOf,
		accountObservations: observation ? [observation] : []
	};
}
/** Display-only union of explicit accounts. Reuses the existing per-account
* error/freshness policy and never mutates or fetches a source snapshot. */
function selectAccountsSnapshot(snapshot, accountIds) {
	const ids = new Set(accountIds);
	if (!ids.size || ids.size !== accountIds.length || accountIds.some((id) => !snapshot.accounts.some((a) => a.id === id))) throw new Error("Invalid account selection");
	if (ids.size === snapshot.accounts.length) return snapshot;
	const scopes = snapshot.accounts.filter((a) => ids.has(a.id)).map((a) => selectAccountSnapshot(snapshot, a.id));
	const errors = [...new Set(scopes.flatMap((s) => s.errors))];
	const dates = [...new Set(scopes.map((s) => s.sourceAsOf))];
	return {
		...snapshot,
		accounts: snapshot.accounts.filter((a) => ids.has(a.id)),
		balances: snapshot.balances.filter((b) => ids.has(b.accountId)),
		positions: snapshot.positions.filter((p) => ids.has(p.accountId)),
		holdingTraces: snapshot.holdingTraces?.filter((t) => ids.has(t.accountId)),
		accountObservations: scopes.flatMap((s) => s.accountObservations ?? []),
		errors,
		completeness: scopes.some((s) => s.completeness === "partial") || errors.length ? "partial" : "complete",
		freshness: scopes.some((s) => s.freshness === "stale") ? "stale" : snapshot.freshness,
		sourceAsOf: dates.length === 1 ? dates[0] : null
	};
}
/**
* Summarizes a normalized snapshot, never an external broker response.
* Cash means settled cash only; API semantics must be verified before mapping.
* Missing values and incomplete account scope never become successful totals.
*/
function summarizePortfolio(snapshot, options = {}) {
	const base = {
		state: options.loading ? "loading" : "disconnected",
		mode: snapshot?.mode ?? null,
		fetchedAt: snapshot?.fetchedAt ?? null,
		sourceAsOf: snapshot?.sourceAsOf ?? null,
		totalsByCurrency: [],
		errors: snapshot ? [...snapshot.errors] : []
	};
	if (!snapshot) return base;
	const currencies = [...new Set(snapshot.accounts.flatMap((account) => account.supportedCurrencies))].sort();
	try {
		validateSnapshot(snapshot);
		const scopeIncomplete = snapshot.completeness === "partial" || snapshot.errors.length > 0 || snapshot.accountObservations?.some((observation) => observation.completeness === "partial") === true;
		const noSuccessfulRows = snapshot.balances.length === 0 && snapshot.positions.length === 0;
		if (scopeIncomplete && noSuccessfulRows) return {
			...base,
			state: options.loading ? "loading" : "error",
			totalsByCurrency: currencies.map(unknownTotals)
		};
		base.totalsByCurrency = currencies.map((currency) => {
			const expectedAccounts = snapshot.accounts.filter((account) => account.supportedCurrencies.includes(currency));
			if (snapshot.errors.some((error) => expectedAccounts.some((account) => errorAffectsAccount(error, account))) || snapshot.accountObservations?.some((observation) => observation.completeness === "partial" && expectedAccounts.some((account) => account.id === observation.accountId)) === true) return unknownTotals(currency);
			const balances = snapshot.balances.filter((balance) => balance.currency === currency);
			const positions = snapshot.positions.filter((position) => position.currency === currency);
			const cash = balances.length === expectedAccounts.length ? sumKnown(balances.map((balance) => balance.settledCash), currency) : null;
			const holdings = sumKnown(positions.map((position) => position.marketValue), currency);
			const unrealizedPnl = sumKnown(positions.map((position) => position.unrealizedPnl), currency);
			return {
				currency,
				cash,
				holdings,
				totalAssets: !scopeIncomplete && cash !== null && holdings !== null ? sumMoney([cash, holdings], currency) : null,
				unrealizedPnl
			};
		});
		const hasUnknownTotals = base.totalsByCurrency.some((total) => [
			total.cash,
			total.holdings,
			total.totalAssets,
			total.unrealizedPnl
		].some((value) => value === null));
		const isEmpty = snapshot.positions.length === 0 && snapshot.balances.every((balance) => balance.settledCash !== null && addDecimalStrings(balance.settledCash.amount, "0") === "0") && base.totalsByCurrency.every((total) => total.totalAssets?.amount === "0");
		base.state = options.loading ? "loading" : scopeIncomplete || hasUnknownTotals ? "partial" : snapshot.freshness === "stale" || snapshot.accountObservations?.some((observation) => observation.freshness === "stale") ? "stale" : isEmpty ? "empty" : "ready";
		return base;
	} catch {
		const invalid = {
			code: "invalid_response",
			provider: null,
			accountId: null,
			message: "조회 데이터 형식을 확인할 수 없습니다. 총액을 계산하지 않았습니다."
		};
		return {
			...base,
			state: options.loading ? "loading" : "error",
			totalsByCurrency: currencies.map(unknownTotals),
			errors: [...base.errors, invalid]
		};
	}
}
var DECIMAL, MAX_DECIMAL_LENGTH;
function init_portfolio() {
	return (init_portfolio = __esmMin((() => {
		DECIMAL = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;
		MAX_DECIMAL_LENGTH = 256;
	})))();
}
export { init_portfolio as a, summarizePortfolio as c, decimalRatioPercent as i, allocationBasisPoints as n, selectAccountsSnapshot as o, compareDecimalStrings as r, summarizeKnownHoldings as s, addDecimalStrings as t };
