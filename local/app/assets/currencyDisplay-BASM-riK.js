import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
import { n as init_BrandDisplayContext, r as useBrandDisplayMode } from "./BrandDisplayContext-CTj18MEv.js";
function init_diary_trade_carousel() {
	return (init_diary_trade_carousel = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/journal/diary-trade-carousel.css?v=source-build-r125";
			document.head.appendChild(l);
		}
	})))();
}
function init_stock_logo() {
	return (init_stock_logo = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/portfolio/stock-logo.css?v=source-build-r125";
			document.head.appendChild(l);
		}
	})))();
}
/** Presentation-only lookup. Never changes the broker identity or sends it to a server. */
function bundledStockLogo(position) {
	let slug;
	const currency = typeof position.originalCurrency === "string" ? position.originalCurrency : position.currency;
	if (currency === "KRW" && position.market === "KRX") {
		const match = /^(?:A)?(\d{6})(?::credit:(?:00|03):loan:(?:\d{8})?)?$/.exec(position.instrumentId);
		if (match && Object.hasOwn(domestic, match[1])) slug = domestic[match[1]];
	} else if (currency === "USD" && [
		"US",
		"NASDAQ",
		"NYSE",
		"미국(거래소 미확인)"
	].includes(position.market)) {
		if (Object.hasOwn(us, position.instrumentId)) slug = us[position.instrumentId];
	}
	return slug ? `/local/app/logos/${slug}.svg` : null;
}
function qualifiedIdentity(p) {
	const currency = typeof p.originalCurrency === "string" ? p.originalCurrency : p.currency;
	if (currency === "KRW" && p.market === "KRX") {
		const m = /^(?:A)?(\d{6})(?::credit:(?:00|03):loan:(?:\d{8})?)?$/.exec(p.instrumentId);
		return m ? {
			market: "KRX",
			symbol: m[1]
		} : null;
	}
	return currency === "USD" && [
		"US",
		"NASDAQ",
		"NYSE",
		"미국(거래소 미확인)"
	].includes(p.market) ? {
		market: "US",
		symbol: p.instrumentId
	} : null;
}
/** Explicit display catalogue; never infer issuer or leverage from a company's name. */
function securityBadge(p) {
	const id = qualifiedIdentity(p);
	if (!id) return null;
	const badges = id.market === "KRX" ? {
		"069500": "ETF",
		"122630": "2*"
	} : {
		QQQ: "ETF",
		SPY: "ETF",
		VOO: "ETF",
		NVDL: "2*",
		TSLL: "2*"
	};
	return Object.hasOwn(badges, id.symbol) ? badges[id.symbol] : null;
}
/** Explicit text, not an issuer logo: wordmark rights remain unconfirmed. */
function stockLogoTextFallback(p) {
	const id = qualifiedIdentity(p);
	return id?.market === "KRX" && ["005930", "005935"].includes(id.symbol) ? "삼성" : null;
}
function officialCompanyLogo(p) {
	if (securityBadge(p)) return null;
	if (stockLogoTextFallback(p)) return "/local/app/logos/samsung-wordmark-r61.svg";
	const id = qualifiedIdentity(p);
	if (!id) return null;
	if (id.market === "KRX" && id.symbol === "005380") return "/local/app/logos/hyundai-symbol-r61.png";
	if (id.market === "KRX" && id.symbol === "000660") return "/local/app/logos/skhynix-official.png";
	if (id.market === "US" && id.symbol === "MSFT") return "/local/app/logos/microsoft-official.png";
	const old = bundledStockLogo(p);
	if (old && [
		"samsung",
		"hyundai",
		"apple",
		"nvidia"
	].some((slug) => old === `/local/app/logos/${slug}.svg`)) return old.replace(".svg", "-official.png");
	return old;
}
var domestic, us;
function init_stockLogos() {
	return (init_stockLogos = __esmMin((() => {
		domestic = {
			"005930": "samsung",
			"005935": "samsung",
			"005380": "hyundai"
		};
		us = {
			AAPL: "apple",
			NVDA: "nvidia",
			TSLA: "tesla",
			GOOG: "alphabet",
			GOOGL: "alphabet"
		};
	})))();
}
function StockLogo({ position }) {
	const mode = useBrandDisplayMode();
	const badge = securityBadge(position);
	const [failed, setFailed] = (0, import_react.useState)(null);
	if (mode === "text-only") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "stock-identity-text",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "stock-identity-symbol",
			children: position.instrumentId
		}), badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "stock-type-label",
			children: badge
		})]
	});
	const src = badge ? null : officialCompanyLogo(position);
	const brand = src === "/local/app/logos/samsung-wordmark-r61.svg" ? "samsung" : src === "/local/app/logos/hyundai-symbol-r61.png" ? "hyundai" : src === "/local/app/logos/microsoft-official.png" ? "microsoft" : null;
	const darkSrc = brand === "samsung" ? "/local/app/logos/samsung-wordmark-dark-r61.svg" : brand === "hyundai" ? "/local/app/logos/hyundai-symbol-dark-r61.png" : null;
	const available = src && failed !== src;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `instrument-icon stock-logo-frame${brand && available ? ` stock-logo-themed stock-logo-${brand}` : ""}${available ? " stock-icon-branded" : ""}`,
		"aria-hidden": "true",
		children: badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "stock-type-label",
			children: badge
		}) : available ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: darkSrc ? "stock-logo-light" : void 0,
			src,
			width: 20,
			height: 20,
			alt: "",
			draggable: false,
			onError: () => setFailed(src)
		}), darkSrc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "stock-logo-dark",
			src: darkSrc,
			width: 20,
			height: 20,
			alt: "",
			draggable: false,
			onError: () => setFailed(src)
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `stock-logo-fallback${stockLogoTextFallback(position) ? " stock-logo-text-fallback" : ""}`,
			children: stockLogoTextFallback(position) ?? Array.from(position.name.trim())[0] ?? "?"
		})
	});
}
var import_react, import_jsx_runtime;
function init_StockLogo() {
	return (init_StockLogo = __esmMin((() => {
		import_react = require_react();
		init_stock_logo();
		init_stockLogos();
		init_BrandDisplayContext();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
function formatDecimal(value) {
	const negative = value.startsWith("-");
	const [whole, fraction] = (negative ? value.slice(1) : value).split(".");
	const grouped = new Intl.NumberFormat("ko-KR").format(BigInt(whole));
	return `${negative && !/^-?0(?:\.0+)?$/.test(value) ? "-" : ""}${grouped}${fraction ? `.${fraction}` : ""}`;
}
function formatMoney(money, signed = false, maxFractionDigits) {
	if (!money) return "—";
	if (maxFractionDigits !== void 0) {
		const sign = money.amount.startsWith("-") ? "-" : "";
		const [whole, fraction = ""] = money.amount.replace(/^-/, "").split(".");
		const digits = Math.max(0, Math.min(12, maxFractionDigits));
		const scale = 10n ** BigInt(digits);
		const n = BigInt(whole) * scale + BigInt(fraction.slice(0, digits).padEnd(digits, "0") || "0") + (Number(fraction[digits] ?? "0") >= 5 ? 1n : 0n);
		if (n === 0n && !/^-?0(?:\.0+)?$/.test(money.amount)) return formatMoney(money, signed);
		const tail = digits ? (n % scale).toString().padStart(digits, "0").replace(/0+$/, "") : "";
		money = {
			...money,
			amount: sign + (n / scale).toString() + (tail ? "." + tail : "")
		};
	}
	const zero = /^-?0(?:\.0+)?$/.test(money.amount);
	return `${money.amount.startsWith("-") && !zero ? "-" : signed && !zero ? "+" : ""}${money.currency === "USD" ? "$" : ""}${formatDecimal(money.amount.replace(/^-/, ""))}${money.currency === "KRW" ? "원" : ""}`;
}
function localTime(value) {
	return new Intl.DateTimeFormat("ko-KR", {
		timeZone: "Asia/Seoul",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(new Date(value));
}
function init_format() {
	return (init_format = __esmMin((() => {})))();
}
function usableQuote(quote, now = (/* @__PURE__ */ new Date()).toISOString()) {
	const date = Date.parse(quote.date + "T00:00:00Z");
	const age = Date.parse(now) - date;
	return Number.isFinite(age) && age >= 0 && age <= 6048e5 && (fixed(quote.rate) ?? 0n) > 0n ? quote : null;
}
function fixed(value) {
	if (!/^-?\d{1,30}(\.\d{1,12})?$/.test(value)) return null;
	const negative = value.startsWith("-");
	const [whole, fraction = ""] = value.replace(/^-/, "").split(".");
	return (BigInt(whole) * SCALE + BigInt(fraction.padEnd(12, "0"))) * (negative ? -1n : 1n);
}
function decimal(value) {
	const sign = value < 0n ? "-" : "";
	const n = value < 0n ? -value : value;
	const tail = (n % SCALE).toString().padStart(12, "0").replace(/0+$/, "");
	return sign + (n / SCALE).toString() + (tail ? "." + tail : "");
}
function divide(n, d) {
	return (n < 0n ? -1n : 1n) * (((n < 0n ? -n : n) + d / 2n) / d);
}
function convertMoney(value, mode, quote) {
	if (!value) return null;
	if (mode === "original" || value.currency === mode) return { ...value };
	const amount = fixed(value.amount);
	const rate = quote ? fixed(quote.rate) : null;
	if (amount === null || rate === null || rate <= 0n || !["KRW", "USD"].includes(value.currency)) return null;
	return {
		currency: mode,
		amount: decimal(mode === "KRW" ? divide(amount * rate, SCALE) : divide(amount * SCALE, rate))
	};
}
function sum(values, currency) {
	if (!values.length || values.some((v) => v === null || fixed(v.amount) === null)) return null;
	return {
		currency,
		amount: decimal(values.reduce((a, v) => a + fixed(v.amount), 0n))
	};
}
/** Display projection only: never mutate the broker snapshot or invent FX/cash. */
function displaySnapshot(source, mode, quote) {
	if (mode === "original") return source;
	const convert = (value) => convertMoney(value, mode, quote);
	const balances = source.accounts.map((account) => {
		const rows = source.balances.filter((b) => b.accountId === account.id);
		return {
			accountId: account.id,
			currency: mode,
			settledCash: account.supportedCurrencies.some((c) => !rows.some((b) => b.currency === c)) ? null : sum(rows.map((b) => convert(b.settledCash)), mode),
			unsettledCash: sum(rows.map((b) => convert(b.unsettledCash)), mode),
			withdrawableCash: sum(rows.map((b) => convert(b.withdrawableCash)), mode),
			buyingPower: sum(rows.map((b) => convert(b.buyingPower)), mode)
		};
	});
	return {
		...source,
		accounts: source.accounts.map((a) => ({
			...a,
			supportedCurrencies: [mode]
		})),
		balances,
		positions: source.positions.map((p) => ({
			...p,
			originalCurrency: p.currency,
			currency: mode,
			avgCost: convert(p.avgCost),
			currentPrice: convert(p.currentPrice),
			marketValue: convert(p.marketValue),
			unrealizedPnl: convert(p.unrealizedPnl)
		}))
	};
}
var SCALE;
function init_currencyDisplay() {
	return (init_currencyDisplay = __esmMin((() => {
		SCALE = 10n ** 12n;
	})))();
}
export { formatDecimal as a, localTime as c, init_diary_trade_carousel as d, usableQuote as i, StockLogo as l, displaySnapshot as n, formatMoney as o, init_currencyDisplay as r, init_format as s, convertMoney as t, init_StockLogo as u };
