import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D3ER87f6.js";
function init_diary_trade_carousel() {
	return (init_diary_trade_carousel = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/journal/diary-trade-carousel.css?v=source-build-r59";
			document.head.appendChild(l);
		}
	})))();
}
function init_stock_logo() {
	return (init_stock_logo = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/portfolio/stock-logo.css?v=source-build-r59";
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
	if (securityBadge(p) || stockLogoTextFallback(p)) return null;
	const id = qualifiedIdentity(p);
	if (!id) return null;
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
	const badge = securityBadge(position);
	const src = badge ? null : officialCompanyLogo(position);
	const [failed, setFailed] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `instrument-icon stock-logo-frame${src && failed !== src ? " stock-icon-branded" : ""}`,
		"aria-hidden": "true",
		children: badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "stock-type-label",
			children: badge
		}) : src && failed !== src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			width: 20,
			height: 20,
			alt: "",
			draggable: false,
			onError: () => setFailed(src)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
export { init_StockLogo as n, init_diary_trade_carousel as r, StockLogo as t };
