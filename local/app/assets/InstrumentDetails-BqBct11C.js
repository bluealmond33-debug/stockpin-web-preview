import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
import { t as require_react_dom } from "./react-dom-CQGKlpf1.js";
function validateHistory(input, query) {
	if (!input || typeof input !== "object") return fail();
	const s = input;
	if (s.instrumentId !== query.instrument.id || s.range !== query.range || s.actualInterval !== query.interval || s.currency !== query.instrument.currency) return fail();
	if (typeof s.source !== "string" || !s.source.trim() || !iso(s.fetchedAt) || s.sourceAsOf !== null && !iso(s.sourceAsOf)) return fail();
	try {
		if (typeof s.exchangeTimezone !== "string") return fail();
		new Intl.DateTimeFormat("en", { timeZone: s.exchangeTimezone });
	} catch {
		return fail();
	}
	if (![
		"adjusted",
		"unadjusted",
		"unknown"
	].includes(s.adjustment) || ![
		"regular",
		"extended",
		"mixed",
		"unknown"
	].includes(s.session) || ![
		"realtime",
		"delayed",
		"end-of-day",
		"unknown"
	].includes(s.delayStatus)) return fail();
	const intraday = [
		"5m",
		"15m",
		"1h"
	].includes(s.actualInterval);
	const timeValid = (t) => intraday ? typeof t === "number" && Number.isSafeInteger(t) && t > 0 && t < 1e11 : typeof t === "string" && /^\d{4}-\d{2}-\d{2}$/.test(t) && Number.isFinite(Date.parse(t)) && new Date(t).toISOString().slice(0, 10) === t;
	if (!s.coverage || ![
		"complete",
		"partial",
		"unknown"
	].includes(s.coverage.status) || !Array.isArray(s.candles) || s.candles.length > 2e4) return fail();
	if (s.candles.length) {
		if (!timeValid(s.coverage.from) || !timeValid(s.coverage.to) || s.coverage.from > s.coverage.to) return fail();
	} else if (s.coverage.from !== null && !timeValid(s.coverage.from) || s.coverage.to !== null && !timeValid(s.coverage.to)) return fail();
	let previous;
	for (const c of s.candles) {
		if (!c || !timeValid(c.time) || previous !== void 0 && c.time <= previous) return fail();
		if (![
			c.open,
			c.high,
			c.low,
			c.close
		].every((v) => decimal(v)) || c.volume != null && !decimal(c.volume, true)) return fail();
		if (Number(c.low) > Math.min(Number(c.open), Number(c.close)) || Number(c.high) < Math.max(Number(c.open), Number(c.close))) return fail();
		if (c.time < s.coverage.from || c.time > s.coverage.to) return fail();
		previous = c.time;
	}
	return {
		...s,
		coverage: { ...s.coverage },
		candles: s.candles.map((c) => ({ ...c }))
	};
}
function projectSeries(snapshot, mode) {
	return snapshot.candles.map((c) => mode === "line" ? {
		time: c.time,
		value: Number(c.close)
	} : {
		time: c.time,
		open: Number(c.open),
		high: Number(c.high),
		low: Number(c.low),
		close: Number(c.close)
	});
}
var fail, decimal, iso;
function init_history() {
	return (init_history = __esmMin((() => {
		fail = () => {
			throw new Error("공급 자료 형식 불일치");
		};
		decimal = (v, zero = false) => typeof v === "string" && /^\d+(\.\d+)?$/.test(v) && Number.isFinite(Number(v)) && (zero ? Number(v) >= 0 : Number(v) > 0);
		iso = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(v) && Number.isFinite(Date.parse(v));
	})))();
}
function createHistorySession(loader, publish) {
	let generation = 0;
	let controller;
	let disposed = false;
	return {
		async load(query) {
			if (disposed) return;
			controller?.abort();
			const own = ++generation;
			const active = new AbortController();
			controller = active;
			if (!loader) {
				publish({ status: "unavailable" });
				return;
			}
			publish({ status: "loading" });
			try {
				const raw = await loader({
					...query,
					signal: active.signal,
					generation: own
				});
				if (disposed || own !== generation || active.signal.aborted) return;
				const snapshot = validateHistory(raw, query);
				publish({
					status: snapshot.candles.length ? "ready" : "empty",
					snapshot
				});
			} catch {
				if (!disposed && own === generation && !active.signal.aborted) publish({ status: "error" });
			}
		},
		dispose() {
			disposed = true;
			generation++;
			controller?.abort();
		}
	};
}
function init_historySession() {
	return (init_historySession = __esmMin((() => {
		init_history();
	})))();
}
function mountStockChart(container, library, snapshot, mode, onHover, theme = "light") {
	const dark = theme === "dark";
	const chart = library.createChart(container, {
		width: container.clientWidth,
		height: container.clientHeight > 0 ? container.clientHeight : 320,
		layout: {
			background: { color: dark ? "#141719" : "#ffffff" },
			textColor: dark ? "#c5cbd0" : "#59636d",
			attributionLogo: true
		},
		grid: {
			vertLines: { visible: false },
			horzLines: { visible: false }
		},
		handleScale: false,
		handleScroll: false,
		rightPriceScale: {
			visible: true,
			borderVisible: false,
			scaleMargins: {
				top: .08,
				bottom: .05
			}
		},
		timeScale: {
			visible: true,
			borderVisible: false,
			timeVisible: [
				"5m",
				"15m",
				"1h"
			].includes(snapshot.actualInterval)
		},
		localization: { timeFormatter: (time) => typeof time === "number" ? new Intl.DateTimeFormat("ko-KR", {
			timeZone: snapshot.exchangeTimezone,
			dateStyle: "short",
			timeStyle: "short"
		}).format(/* @__PURE__ */ new Date(time * 1e3)) : String(time) }
	});
	let series;
	const setMode = (next) => {
		if (series) chart.removeSeries(series);
		series = chart.addSeries(next === "line" ? library.LineSeries : library.CandlestickSeries, next === "line" ? {
			color: "#21a37a",
			lineWidth: 2,
			lastValueVisible: false,
			priceLineVisible: false
		} : {
			upColor: "#d95050",
			downColor: "#427ace",
			borderVisible: false,
			wickUpColor: "#d95050",
			wickDownColor: "#427ace",
			lastValueVisible: false,
			priceLineVisible: false
		});
		series.setData(projectSeries(snapshot, next));
	};
	const crosshair = (event) => {
		const t = event.time;
		const key = t && typeof t === "object" ? `${t.year}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}` : t;
		onHover(event.point ? snapshot.candles.find((c) => c.time === key) ?? null : null);
	};
	try {
		setMode(mode);
		chart.timeScale().fitContent();
		chart.subscribeCrosshairMove(crosshair);
	} catch (error) {
		chart.remove();
		throw error;
	}
	let disposed = false;
	const observer = typeof ResizeObserver === "undefined" ? void 0 : new ResizeObserver((entries) => {
		const rect = entries[0]?.contentRect;
		if (!disposed && rect && rect.width > 0 && rect.height > 0) chart.applyOptions({
			width: rect.width,
			height: rect.height
		});
	});
	observer?.observe(container);
	return {
		setMode,
		dispose() {
			if (disposed) return;
			disposed = true;
			observer?.disconnect();
			chart.unsubscribeCrosshairMove(crosshair);
			chart.remove();
		}
	};
}
function init_stockChartRenderer() {
	return (init_stockChartRenderer = __esmMin((() => {
		init_history();
	})))();
}
function init_instrument() {
	return (init_instrument = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/instrument/instrument.css?v=source-build-r125";
			document.head.appendChild(l);
		}
	})))();
}
function InstrumentDetails(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "instrument-details",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: props.instrument.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				props.instrument.ticker,
				" · ",
				props.instrument.market,
				" · ",
				props.instrument.currency
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockChart, { ...props }, JSON.stringify(props.instrument)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "회사정보",
				className: "instrument-facts",
				children: props.facts?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: props.facts.slice(0, 4).map((fact, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: fact.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [fact.value, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
					fact.source,
					" · ",
					fact.asOf ?? "기준시각 미제공"
				] })] })] }, i)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "회사정보 미공급" })
			}),
			props.holding != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "instrument-holding",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "내 보유" }), props.holding]
			})
		]
	});
}
function StockChart(props) {
	const [range, setRange] = (0, import_react.useState)("3mo");
	const [mode, setMode] = (0, import_react.useState)("line");
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const dialog = (0, import_react.useRef)(null);
	const opener = (0, import_react.useRef)(null);
	const closeButton = (0, import_react.useRef)(null);
	const close = () => {
		const element = dialog.current;
		if (!element?.open) return;
		element.close();
		setExpanded(false);
		if (opener.current?.isConnected && !opener.current.disabled) opener.current.focus({ preventScroll: true });
	};
	(0, import_react.useLayoutEffect)(() => {
		const element = dialog.current;
		if (expanded && element && !element.open) {
			element.showModal();
			closeButton.current?.focus();
		}
		return () => {
			if (element?.open) element.close();
		};
	}, [expanded]);
	const supported = props.supportedRanges ?? [];
	const available = Boolean(props.loadHistory && supported.includes(range));
	const [target, setTarget] = (0, import_react.useState)(null);
	const toolbar = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "instrument-toolbar",
		role: "group",
		"aria-label": "차트 기간과 형태",
		children: [["3mo", "1y"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: !props.loadHistory || !supported.includes(value),
			"aria-pressed": range === value,
			onClick: () => setRange(value),
			children: value === "3mo" ? "3개월" : "1년"
		}, value)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: !available || !props.chartLibrary,
			"aria-pressed": mode === "candle",
			onClick: () => setMode(mode === "line" ? "candle" : "line"),
			children: mode === "line" ? "캔들" : "라인"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "instrument-chart",
		"aria-label": "가격 차트",
		children: [
			expanded && target ? (0, import_react_dom.createPortal)(toolbar, target) : toolbar,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: opener,
				className: "instrument-expand",
				type: "button",
				"aria-label": "차트 확대",
				"aria-haspopup": "dialog",
				onClick: () => {
					setTarget(dialog.current);
					setExpanded(true);
				},
				children: "↗"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryChart, {
				...props,
				range,
				mode,
				target: expanded ? target : null,
				loadHistory: available ? props.loadHistory : void 0
			}, `${range}:${available}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dialog", {
				ref: dialog,
				onKeyDown: (event) => {
					if (event.key !== "Tab" || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
					const items = Array.from(event.currentTarget.querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])")).filter((node) => !node.hidden && node.checkVisibility?.() !== false);
					const first = items[0], last = items.at(-1), current = event.currentTarget.ownerDocument.activeElement;
					if (first && (event.shiftKey && current === first || !event.shiftKey && current === last)) {
						event.preventDefault();
						(event.shiftKey ? last : first)?.focus({ preventScroll: true });
					}
				},
				className: "instrument-expanded",
				"data-theme": props.theme,
				"aria-label": `${props.instrument.name} · ${props.instrument.ticker} 확대 차트`,
				onCancel: (event) => {
					event.preventDefault();
					close();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					props.instrument.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						props.instrument.ticker,
						" · ",
						props.instrument.currency
					] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: closeButton,
					type: "button",
					"aria-label": "확대 차트 닫기",
					onClick: close,
					children: "×"
				})] })
			})
		]
	});
}
function HistoryChart({ instrument, range, loadHistory, chartLibrary, mode, theme, target }) {
	const [owned, setOwned] = (0, import_react.useState)({
		loader: loadHistory,
		state: { status: "unavailable" }
	});
	const state = owned.loader === loadHistory ? owned.state : { status: "loading" };
	(0, import_react.useEffect)(() => {
		const session = createHistorySession(loadHistory, (state) => setOwned({
			loader: loadHistory,
			state
		}));
		session.load({
			instrument,
			range,
			interval: "1d"
		});
		return () => session.dispose();
	}, [
		instrument,
		range,
		loadHistory
	]);
	const content = state.status === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCanvas, {
		snapshot: state.snapshot,
		library: chartLibrary,
		mode,
		theme
	}, `${state.snapshot.instrumentId}:${range}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provenance, { snapshot: state.snapshot })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "instrument-chart-empty",
		role: "status",
		children: state.status === "loading" ? "차트 불러오는 중" : state.status === "error" ? "차트 자료를 확인할 수 없음" : state.status === "empty" ? "해당 기간 자료 없음" : "차트 자료 미공급"
	});
	return target ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "instrument-expanded-content",
		children: content
	}), target) : content;
}
function ChartCanvas({ snapshot, library, mode, theme }) {
	const container = (0, import_react.useRef)(null);
	const handle = (0, import_react.useRef)(null);
	const [hover, setHover] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHover(null);
		setFailed(false);
		if (!library || !container.current) return;
		try {
			handle.current = mountStockChart(container.current, library, snapshot, "line", setHover, theme);
		} catch {
			setFailed(true);
		}
		return () => {
			handle.current?.dispose();
			handle.current = null;
		};
	}, [
		library,
		snapshot,
		theme
	]);
	(0, import_react.useEffect)(() => {
		try {
			handle.current?.setMode(mode);
		} catch {
			setFailed(true);
		}
	}, [
		mode,
		library,
		snapshot,
		theme
	]);
	const time = hover ? typeof hover.time === "number" ? new Intl.DateTimeFormat("ko-KR", {
		timeZone: snapshot.exchangeTimezone,
		dateStyle: "short",
		timeStyle: "short"
	}).format(/* @__PURE__ */ new Date(hover.time * 1e3)) : hover.time : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: container,
			className: "instrument-chart-canvas",
			role: "img",
			"aria-label": `${snapshot.actualInterval} 가격 차트 · ${snapshot.currency}`
		}),
		(!library || failed) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "status",
			children: "차트 렌더러 미연결"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
			className: "instrument-crosshair",
			children: hover ? `${time} · 시가 ${hover.open} / 고가 ${hover.high} / 저가 ${hover.low} / 종가 ${hover.close} ${snapshot.currency}` : "차트 위에서 날짜와 가격 확인"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "instrument-attribution",
			href: "https://www.tradingview.com/",
			target: "_blank",
			rel: "noreferrer",
			children: "TradingView Lightweight Charts™"
		})
	] });
}
function Provenance({ snapshot: s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "instrument-provenance",
		children: [
			s.source,
			" · ",
			s.currency,
			" · ",
			s.actualInterval,
			" · ",
			s.exchangeTimezone,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"자료시각 ",
			s.sourceAsOf ?? "미제공",
			" · 조회 ",
			s.fetchedAt,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"범위 ",
			s.coverage.status,
			" · ",
			s.coverage.from ?? "미제공",
			" – ",
			s.coverage.to ?? "미제공",
			" · 조정 ",
			s.adjustment,
			" · 지연 ",
			s.delayStatus,
			" · 세션 ",
			s.session
		]
	});
}
var import_react, import_react_dom, import_jsx_runtime;
function init_InstrumentDetails() {
	return (init_InstrumentDetails = __esmMin((() => {
		import_react = require_react();
		import_react_dom = require_react_dom();
		init_historySession();
		init_stockChartRenderer();
		init_instrument();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
init_InstrumentDetails();
export { InstrumentDetails };
