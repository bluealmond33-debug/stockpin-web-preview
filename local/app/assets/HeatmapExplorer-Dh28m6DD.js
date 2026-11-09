import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CSsnt-5j.js";
import { a as init_portfolio, i as decimalRatioPercent, r as compareDecimalStrings } from "./portfolio-D4DZrqNf.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-wNLfWwOx.js";
function exact$1(v, keys) {
	if (Object.keys(v).sort().join(",") !== keys.sort().join(",")) throw fail();
}
function text(v, max) {
	if (typeof v !== "string" || !v.trim() || v.length > max || [...v].some((c) => c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127)) throw fail();
	return v;
}
/** Structural admission only; a provider must separately verify universe membership and data rights. */
function parseMarketSnapshot(input, market, now) {
	const v = object(input);
	exact$1(v, [
		"market",
		"asOf",
		"sourceLabel",
		"sourceUrl",
		"universeSize",
		"rows"
	]);
	if (![
		"kospi",
		"kosdaq",
		"sp500",
		"nasdaq"
	].includes(market) || v.market !== market) throw fail();
	const asOf = text(v.asOf, 40), date = Date.parse(asOf), clock = Date.parse(now);
	if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(asOf) || !Number.isFinite(date) || !Number.isFinite(clock) || date > clock || new Date(date).toISOString().slice(0, 19) !== asOf.slice(0, 19)) throw fail();
	const sourceLabel = text(v.sourceLabel, 100), sourceUrl = text(v.sourceUrl, 600);
	let url;
	try {
		url = new URL(sourceUrl);
	} catch {
		throw fail();
	}
	if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) throw fail();
	if (!Number.isSafeInteger(v.universeSize) || Number(v.universeSize) < 1 || Number(v.universeSize) > 5e3 || !Array.isArray(v.rows) || v.rows.length > Number(v.universeSize)) throw fail();
	const seen = /* @__PURE__ */ new Set();
	const rows = v.rows.map((raw) => {
		const row = object(raw);
		exact$1(row, [
			"symbol",
			"name",
			"sector",
			"marketCap",
			"changePct"
		]);
		const symbol = text(row.symbol, 24);
		if (!/^[A-Z0-9^._-]+$/.test(symbol) || seen.has(symbol)) throw fail();
		seen.add(symbol);
		if (row.marketCap !== null && (typeof row.marketCap !== "string" || !/^[1-9]\d{0,29}$/.test(row.marketCap))) throw fail();
		if (row.changePct !== null && (typeof row.changePct !== "string" || !/^-?(?:0|[1-9]\d{0,5})(?:\.\d{1,12})?$/.test(row.changePct))) throw fail();
		return {
			symbol,
			name: text(row.name, 120),
			sector: text(row.sector, 80),
			marketCap: row.marketCap,
			changePct: row.changePct
		};
	});
	return {
		market,
		asOf,
		sourceLabel,
		sourceUrl,
		universeSize: Number(v.universeSize),
		rows
	};
}
function marketBreadth(snapshot) {
	let up = 0, down = 0, flat = 0;
	for (const row of snapshot.rows) {
		if (row.changePct === null) continue;
		const sign = compareDecimalStrings(row.changePct, "0");
		if (sign > 0) up++;
		else if (sign < 0) down++;
		else flat++;
	}
	const unknown = snapshot.universeSize - up - down - flat;
	return {
		up,
		down,
		flat,
		unknown,
		advancePct: unknown === 0 ? decimalRatioPercent(String(up), String(snapshot.universeSize)) : null
	};
}
/** Floating point is used for geometry only. Original monetary strings are never rounded. */
function marketRectangles(rows) {
	const sorted = rows.filter((row) => row.marketCap !== null).slice().sort((a, b) => {
		const ac = BigInt(a.marketCap), bc = BigInt(b.marketCap);
		return ac === bc ? a.symbol.localeCompare(b.symbol) : ac > bc ? -1 : 1;
	});
	const rectangles = [];
	function split(items, x, y, width, height) {
		if (!items.length) return;
		if (items.length === 1) {
			rectangles.push({
				row: items[0],
				x,
				y,
				width,
				height
			});
			return;
		}
		const total = items.reduce((sum, row) => sum + BigInt(row.marketCap), 0n);
		let amount = 0n, at = 0;
		while (at < items.length - 1 && amount * 2n < total) {
			amount += BigInt(items[at].marketCap);
			at++;
		}
		const fraction = Number(amount) / Number(total);
		if (width >= height) {
			const first = width * fraction;
			split(items.slice(0, at), x, y, first, height);
			split(items.slice(at), x + first, y, width - first, height);
		} else {
			const first = height * fraction;
			split(items.slice(0, at), x, y, width, first);
			split(items.slice(at), x, y + first, width, height - first);
		}
	}
	split(sorted, 0, 0, 100, 100);
	return rectangles;
}
var fail, object;
function init_marketSnapshot() {
	return (init_marketSnapshot = __esmMin((() => {
		init_portfolio();
		fail = () => Error("시장 자료 형식 또는 범위를 확인할 수 없습니다.");
		object = (v) => {
			if (!v || typeof v !== "object" || Array.isArray(v)) throw fail();
			return v;
		};
	})))();
}
/** Sector weights share one admitted market/currency/time. Never merges indices. */
function heatmapSectors(rows) {
	const groups = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const group = groups.get(row.sector) ?? [];
		group.push(row);
		groups.set(row.sector, group);
	}
	return marketRectangles([...groups].map(([sector, members], i) => ({
		symbol: String(i),
		name: sector,
		sector,
		changePct: null,
		marketCap: members.reduce((sum, row) => sum + BigInt(row.marketCap ?? "0"), 0n).toString()
	})).filter((row) => row.marketCap !== "0")).map((rect) => ({
		...rect,
		sector: rect.row.sector,
		tiles: marketRectangles(groups.get(rect.row.sector))
	}));
}
function init_heatmapSectors() {
	return (init_heatmapSectors = __esmMin((() => {
		init_marketSnapshot();
	})))();
}
function init_heatmap_sectors() {
	return (init_heatmap_sectors = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/heatmap-sectors.css?v=source-build-r156";
			document.head.appendChild(l);
		}
	})))();
}
function MarketHeatmap({ market, input, zoom: controlledZoom }) {
	const [now, setNow] = (0, import_react$1.useState)(() => (/* @__PURE__ */ new Date()).toISOString());
	(0, import_react$1.useEffect)(() => {
		const timer = setInterval(() => setNow((/* @__PURE__ */ new Date()).toISOString()), 6e4);
		return () => clearInterval(timer);
	}, []);
	const [sectorChoice, setSector] = (0, import_react$1.useState)(null);
	const [selected, setSelected] = (0, import_react$1.useState)(null), [focused, setFocused] = (0, import_react$1.useState)(null);
	let data;
	try {
		data = input == null ? null : parseMarketSnapshot(input, market, now);
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
			role: "alert",
			children: "시장 자료를 확인할 수 없습니다. 수치는 표시하지 않습니다."
		});
	}
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
		className: "market-empty",
		children: "시장 자료 미연결"
	});
	const breadth = marketBreadth(data), sectors = [...new Set(data.rows.map((row) => row.sector))].sort();
	const sector = controlledZoom ? controlledZoom.sector : sectorChoice?.market === market && sectors.includes(sectorChoice.value) ? sectorChoice.value : null;
	const rows = sector ? data.rows.filter((row) => row.sector === sector) : data.rows, blocks = heatmapSectors(rows), rects = blocks.flatMap((block) => block.tiles);
	function zoom(value) {
		setSelected(null);
		setFocused(null);
		if (controlledZoom) controlledZoom.onChange(value);
		else setSector(value ? {
			market,
			value
		} : null);
	}
	const key = (symbol) => market + ":" + symbol, detail = rows.find((row) => key(row.symbol) === selected), tab = rects.find((rect) => key(rect.row.symbol) === focused)?.row.symbol ?? rects[0]?.row.symbol;
	function keyboard(event) {
		const buttons = [...event.currentTarget.closest(".market-sector-map").querySelectorAll("[data-heatmap-symbol]")], i = buttons.indexOf(event.currentTarget);
		if (event.key === "Escape") {
			setSelected(null);
			return;
		}
		const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : event.key === "ArrowRight" || event.key === "ArrowDown" ? (i + 1) % buttons.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (i + buttons.length - 1) % buttons.length : null;
		if (next !== null) {
			event.preventDefault();
			buttons[next]?.focus({ preventScroll: true });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "market-breadth",
			"aria-label": "시장 전체 등락",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: ["상승 ", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("b", { children: breadth.up })] }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: ["하락 ", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("b", { children: breadth.down })] }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: ["보합 ", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("b", { children: breadth.flat })] }),
				breadth.unknown > 0 && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: ["미확인 ", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("b", { children: breadth.unknown })] }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: breadth.advancePct === null ? "전체 상승 비율 미확인" : `상승 비율 ${breadth.advancePct}%` })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "market-sector-choices",
			role: "group",
			"aria-label": "히트맵 업종 확대",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				"aria-pressed": !sector,
				onClick: () => zoom(null),
				children: sector ? "전체 보기" : "전체"
			}), sectors.map((value) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				type: "button",
				"aria-pressed": sector === value,
				onClick: () => zoom(value),
				children: value
			}, value))]
		}),
		controlledZoom && sector && !sectors.includes(sector) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
			role: "status",
			children: [
				sector,
				" · ",
				data.rows.length < data.universeSize ? "업종 미확인 · 구성 자료 불완전" : "업종 없음 · 현재 자료 기준",
				" · 확대 유지"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
			className: "market-map-key",
			children: ["면적 · 시가총액 / 색 · 전일 대비", sector && ` · ${sector}`]
		}),
		rects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "market-sector-map",
			role: "group",
			"aria-label": `${MARKET_UNIVERSES.find((u) => u.id === market).label} 시가총액 히트맵`,
			children: blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
				"data-heatmap-sector": block.sector,
				className: "market-sector-block",
				style: {
					left: `${block.x}%`,
					top: `${block.y}%`,
					width: `${block.width}%`,
					height: `${block.height}%`
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", {
					title: block.sector,
					children: block.sector
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
					type: "button",
					"aria-label": `${block.sector} ${sector ? "전체 보기" : "확대"}`,
					onClick: () => zoom(sector ? null : block.sector),
					children: sector ? "↙" : "확대 ↗"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "market-treemap",
					children: block.tiles.map((rect) => {
						const row = rect.row, sign = row.changePct === null ? null : compareDecimalStrings(row.changePct, "0");
						const change = row.changePct === null ? "등락 미확인" : `${sign === 1 ? "+" : ""}${row.changePct}%`;
						return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
							type: "button",
							"data-heatmap-symbol": row.symbol,
							"data-direction": sign === null ? "unknown" : sign === 1 ? "up" : sign === -1 ? "down" : "flat",
							"aria-pressed": selected === key(row.symbol),
							"aria-label": `${row.name} · ${row.sector} · ${change}`,
							title: `${row.name} (${row.symbol})\n${row.sector}\n전일 대비 ${change}`,
							tabIndex: tab === row.symbol ? 0 : -1,
							onFocus: () => setFocused(key(row.symbol)),
							onKeyDown: keyboard,
							onClick: () => setSelected(key(row.symbol)),
							style: {
								left: `${rect.x}%`,
								top: `${rect.y}%`,
								width: `${rect.width}%`,
								height: `${rect.height}%`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("strong", { children: row.symbol }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: change })]
						}, row.symbol);
					})
				})]
			}, block.sector))
		}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", {
			className: "market-empty",
			children: "표시할 시가총액 자료가 없습니다."
		}),
		rows.some((row) => row.marketCap === null) && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
			className: "market-map-missing",
			children: [
				"시가총액 미확인 ",
				rows.filter((row) => row.marketCap === null).length,
				"종목은 면적에서 제외"
			]
		}),
		detail && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("section", {
			className: "market-stock-detail",
			"aria-label": "선택 종목 정보",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("h3", { children: [
					detail.name,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: detail.symbol })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: detail.sector }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: ["시가총액 ", detail.marketCap === null ? "미확인" : `${BigInt(detail.marketCap).toLocaleString("ko-KR")} ${market === "kospi" || market === "kosdaq" ? "KRW" : "USD"}`] }),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: ["전일 대비 ", detail.changePct === null ? "미확인" : detail.changePct + "%"] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
			className: "market-source",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
					href: data.sourceUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: data.sourceLabel
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("time", {
					dateTime: data.asOf,
					children: [new Intl.DateTimeFormat("ko-KR", {
						timeZone: "Asia/Seoul",
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						hourCycle: "h23"
					}).format(new Date(data.asOf)), " KST"]
				}),
				" · 구성 ",
				data.rows.length,
				"/",
				data.universeSize,
				"종목",
				Date.parse(now) - Date.parse(data.asOf) > 1296e5 && " · 기준시각 36시간 경과"
			]
		})
	] });
}
var import_react$1, import_jsx_runtime$1, MARKET_UNIVERSES;
function init_MarketHeatmap() {
	return (init_MarketHeatmap = __esmMin((() => {
		import_react$1 = require_react();
		init_portfolio();
		init_marketSnapshot();
		init_heatmapSectors();
		init_heatmap_sectors();
		import_jsx_runtime$1 = require_jsx_runtime();
		MARKET_UNIVERSES = [
			{
				id: "kospi",
				label: "코스피"
			},
			{
				id: "kosdaq",
				label: "코스닥"
			},
			{
				id: "sp500",
				label: "S&P 500"
			},
			{
				id: "nasdaq",
				label: "나스닥 종합"
			}
		];
	})))();
}
function validHeatmapPanelId(id) {
	return /^[A-Za-z0-9_-]{1,64}$/.test(id);
}
function valid(value) {
	if (!obj(value) || !exact(value, ["version", "panels"]) || value.version !== 1 || !Array.isArray(value.panels) || value.panels.length > 16) return false;
	const ids = /* @__PURE__ */ new Set();
	return value.panels.every((p) => {
		if (!obj(p) || !exact(p, [
			"id",
			"market",
			"period",
			"zooms"
		]) || typeof p.id !== "string" || !validHeatmapPanelId(p.id) || ids.has(p.id) || !(p.market === null || markets.includes(p.market)) || ![
			"day",
			"week",
			"month",
			"year"
		].includes(p.period) || !Array.isArray(p.zooms) || p.zooms.length > 4) return false;
		ids.add(p.id);
		const seen = /* @__PURE__ */ new Set();
		return p.zooms.every((z) => {
			if (!obj(z) || !exact(z, ["market", "sector"]) || !markets.includes(z.market) || seen.has(z.market) || typeof z.sector !== "string" || !z.sector.trim() || z.sector.length > 80 || /[\x00-\x1f\x7f]/.test(z.sector)) return false;
			seen.add(z.market);
			return true;
		});
	});
}
function readHeatmapPreferences(storage) {
	const empty = {
		version: 1,
		panels: []
	};
	try {
		if (!storage) return {
			raw: null,
			preferences: empty,
			writable: false
		};
		const raw = storage.getItem(HEATMAP_PREFERENCES_KEY);
		if (raw === null) return {
			raw,
			preferences: empty,
			writable: true
		};
		if (raw.length > MAX_RAW) return {
			raw,
			preferences: empty,
			writable: false
		};
		const value = JSON.parse(raw);
		return {
			raw,
			preferences: valid(value) ? value : empty,
			writable: valid(value)
		};
	} catch {
		return {
			raw: null,
			preferences: empty,
			writable: false
		};
	}
}
function writeHeatmapPreferences(storage, previous, preferences) {
	try {
		if (!storage || !previous.writable || !valid(preferences)) return { ok: false };
		const raw = JSON.stringify(preferences);
		if (raw.length > MAX_RAW || storage.getItem("stockpin.heatmap-ui.v1") !== previous.raw) return { ok: false };
		storage.setItem(HEATMAP_PREFERENCES_KEY, raw);
		if (storage.getItem("stockpin.heatmap-ui.v1") !== raw) return { ok: false };
		return {
			ok: true,
			read: {
				raw,
				preferences,
				writable: true
			}
		};
	} catch {
		return { ok: false };
	}
}
var HEATMAP_PREFERENCES_KEY, MAX_RAW, markets, exact, obj;
function init_heatmap_preferences() {
	return (init_heatmap_preferences = __esmMin((() => {
		HEATMAP_PREFERENCES_KEY = "stockpin.heatmap-ui.v1";
		MAX_RAW = 16384;
		markets = [
			"kospi",
			"kosdaq",
			"sp500",
			"nasdaq"
		];
		exact = (v, keys) => Object.keys(v).sort().join(",") === keys.sort().join(",");
		obj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
	})))();
}
function HeatmapExplorer({ available, sources, panels, preferenceStorage, periodSources }) {
	const [choice, setChoice] = (0, import_react.useState)("kospi");
	const [kr, setKr] = (0, import_react.useState)("kospi"), [us, setUs] = (0, import_react.useState)("sp500");
	if (panels) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndependentHeatmapPanels, {
		panels,
		sources,
		preferenceStorage,
		periodSources
	});
	if (!available.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "market-empty",
		children: "선택 가능한 시장 없음"
	});
	const canCompare = available.some((u) => u.id === "kospi") && available.some((u) => u.id === "sp500");
	const compare = choice === "compare" && canCompare;
	const selected = available.find((u) => u.id === choice)?.id ?? available[0].id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "market-heatmap-explorer",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-universe-choices",
				role: "group",
				"aria-label": "히트맵 시장 선택",
				children: [canCompare && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": compare,
					onClick: () => setChoice("compare"),
					children: "전체 · 한국/미국 비교"
				}), available.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": !compare && selected === u.id,
					"aria-label": u.label,
					onClick: () => setChoice(u.id),
					children: u.id === "nasdaq" ? "나스닥" : u.label
				}, u.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "market-heatmap-help",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "히트맵 도움말" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "면적은 시가총액, 색은 전일 대비 등락입니다. 미확인 값은 상승·하락으로 해석하지 않습니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "한국/미국 비교는 동일 면적이며 국가별 시총 비중이 아닙니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "나스닥은 나스닥 종합(Nasdaq Composite)을 뜻하며 나스닥 100과 다릅니다. 실제 구성 여부와 기준시각은 각 자료 출처를 확인하세요." })
				]
			}),
			compare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "market-heatmap-comparison",
				children: [{
					country: "한국",
					market: kr,
					options: ["kospi", "kosdaq"],
					set: setKr
				}, {
					country: "미국",
					market: us,
					options: ["sp500", "nasdaq"],
					set: setUs
				}].map((panel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": `${panel.country} 히트맵 비교`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: panel.country }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "market-universe-choices",
							role: "group",
							"aria-label": `${panel.country} 비교 지수`,
							children: MARKET_UNIVERSES.filter((u) => panel.options.includes(u.id)).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": panel.market === u.id,
								"aria-label": u.label,
								onClick: () => panel.set(u.id),
								children: u.id === "nasdaq" ? "나스닥" : u.label
							}, u.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketHeatmap, {
							market: panel.market,
							input: sources[panel.market]
						}, panel.market)
					]
				}, panel.country))
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketHeatmap, {
				market: selected,
				input: sources[selected]
			}, selected)
		]
	});
}
/** Separate renderer prevents the legacy daily map's labels from misrepresenting period data. */
function PeriodHeatmap({ market, period, supply, sector, onZoom }) {
	const [selected, setSelected] = (0, import_react.useState)(null);
	let data;
	try {
		if (supply.period !== period || Object.keys(supply).sort().join(",") !== "period,snapshot") throw Error("period");
		data = parseMarketSnapshot(supply.snapshot, market, (/* @__PURE__ */ new Date()).toISOString());
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			children: "기간별 시장 자료를 확인할 수 없습니다. 수치는 표시하지 않습니다."
		});
	}
	const sectors = [...new Set(data.rows.map((r) => r.sector))].sort(), rows = sector ? data.rows.filter((r) => r.sector === sector) : data.rows, blocks = heatmapSectors(rows), detail = rows.find((r) => r.symbol === selected);
	function zoom(value) {
		setSelected(null);
		onZoom(value);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [PERIOD_LABELS[period], " 등락 · 면적은 시가총액"] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "group",
			"aria-label": "히트맵 업종 확대",
			className: "market-sector-choices",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": sector === null,
				onClick: () => zoom(null),
				children: sector ? "전체 보기" : "전체"
			}), sectors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": s === sector,
				onClick: () => zoom(s),
				children: s
			}, s))]
		}),
		sector && !sectors.includes(sector) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			role: "status",
			children: [
				sector,
				" · ",
				data.rows.length < data.universeSize ? "업종 미확인 · 구성 자료 불완전" : "업종 없음 · 현재 자료 기준",
				" · 확대 유지"
			]
		}),
		blocks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "market-sector-map",
			role: "group",
			"aria-label": `${PERIOD_LABELS[period]} 시가총액 히트맵`,
			children: blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "market-sector-block",
				"data-heatmap-sector": block.sector,
				style: {
					left: `${block.x}%`,
					top: `${block.y}%`,
					width: `${block.width}%`,
					height: `${block.height}%`
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: block.sector }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => zoom(sector ? null : block.sector),
					children: sector ? "전체 보기" : "확대"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "market-treemap",
					children: block.tiles.map((rect) => {
						const row = rect.row, sign = row.changePct === null ? null : compareDecimalStrings(row.changePct, "0"), change = row.changePct === null ? "등락 미확인" : `${sign === 1 ? "+" : ""}${row.changePct}%`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-heatmap-symbol": row.symbol,
							"data-direction": sign === null ? "unknown" : sign === 1 ? "up" : sign === -1 ? "down" : "flat",
							"aria-label": `${row.name} · ${row.sector} · ${PERIOD_LABELS[period]} ${change}`,
							"aria-pressed": selected === row.symbol,
							onClick: () => setSelected(row.symbol),
							onKeyDown: (event) => {
								if (event.key === "Escape") setSelected(null);
							},
							style: {
								left: `${rect.x}%`,
								top: `${rect.y}%`,
								width: `${rect.width}%`,
								height: `${rect.height}%`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.symbol }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: change })]
						}, row.symbol);
					})
				})]
			}, block.sector))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "표시할 시가총액 자료가 없습니다." }),
		rows.some((r) => r.marketCap === null) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: `시가총액 미확인 ${rows.filter((r) => r.marketCap === null).length}종목은 면적에서 제외` }),
		detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "market-stock-detail",
			"aria-label": "선택 종목 정보",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
					detail.name,
					" ",
					detail.symbol
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: detail.sector }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["시가총액 ", detail.marketCap === null ? "미확인" : `${BigInt(detail.marketCap).toLocaleString("ko-KR")} ${market === "kospi" || market === "kosdaq" ? "KRW" : "USD"}`] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					PERIOD_LABELS[period],
					" 등락 ",
					detail.changePct === null ? "미확인" : detail.changePct + "%"
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "market-source",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: data.sourceUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: data.sourceLabel
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					dateTime: data.asOf,
					children: data.asOf
				}),
				" · 구성 ",
				data.rows.length,
				"/",
				data.universeSize,
				"종목"
			]
		})
	] });
}
function browserStorage() {
	try {
		return typeof window === "undefined" ? void 0 : window.localStorage;
	} catch {
		return;
	}
}
/** Stable IDs are host-owned UI identifiers, never account IDs or names. */
function IndependentHeatmapPanels({ panels, sources, preferenceStorage, periodSources }) {
	const [storage] = (0, import_react.useState)(() => preferenceStorage ?? browserStorage());
	const [state, setState] = (0, import_react.useState)(() => ({
		read: readHeatmapPreferences(storage),
		error: false
	}));
	if (!(panels.length <= 16 && new Set(panels.map((p) => p.id)).size === panels.length && panels.every((p) => validHeatmapPanelId(p.id)))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		children: "히트맵 패널 ID 또는 개수를 확인하세요."
	});
	function preference(panel) {
		return state.read.preferences.panels.find((p) => p.id === panel.id) ?? {
			id: panel.id,
			market: panel.initialMarket && panel.available.some((m) => m.id === panel.initialMarket) ? panel.initialMarket : null,
			period: "day",
			zooms: []
		};
	}
	function change(panel, patch) {
		const next = {
			...preference(panel),
			...patch
		};
		const preferences = {
			version: 1,
			panels: [...state.read.preferences.panels.filter((p) => p.id !== panel.id), next]
		};
		const result = writeHeatmapPreferences(storage, state.read, preferences);
		setState({
			read: result.read ?? {
				...state.read,
				preferences
			},
			error: !result.ok
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "market-heatmap-explorer",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "public-reference-heading-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "히트맵" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetMetricHelp, {
					label: "히트맵",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "패널별 시장·기간 선택 · 면적은 시가총액 · 미확인 값은 0이 아닙니다. 나스닥은 나스닥 종합(Nasdaq Composite)입니다." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "시장·기간·확대 선택만 이 브라우저에 저장합니다. 자료는 저장하지 않으며 저장 실패 시 현재 화면에만 적용됩니다. 자동 삭제 기한은 없으며 사이트 데이터를 삭제하면 설정도 사라집니다." })]
				})]
			}),
			state.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: "설정을 저장하지 못했습니다. 현재 화면에만 적용됩니다. 기존 저장 원문은 자동으로 초기화하지 않습니다."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "market-heatmap-comparison",
				children: panels.map((panel) => {
					const pref = preference(panel), market = panel.available.some((m) => m.id === pref.market) ? pref.market : null;
					const sector = market ? pref.zooms.find((z) => z.market === market)?.sector ?? null : null;
					const onZoom = (value) => {
						if (market) change(panel, { zooms: [...pref.zooms.filter((z) => z.market !== market), ...value === null ? [] : [{
							market,
							sector: value
						}]] });
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-label": `${panel.label} 히트맵`,
						"data-heatmap-panel": panel.id,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: panel.label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "market-heatmap-panel-controls",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["시장 ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": `${panel.label} 시장`,
									value: market ?? "",
									onChange: (e) => {
										const selected = panel.available.find((m) => m.id === e.target.value);
										if (selected) change(panel, { market: selected.id });
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: panel.available.length ? "시장 선택 필요" : "선택 가능한 시장 없음"
									}), panel.available.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: m.id,
										children: m.label
									}, m.id))]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["기간 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									"aria-label": `${panel.label} 기간`,
									value: pref.period,
									onChange: (e) => {
										if (Object.hasOwn(PERIOD_LABELS, e.target.value)) change(panel, { period: e.target.value });
									},
									children: Object.keys(PERIOD_LABELS).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p,
										children: PERIOD_LABELS[p]
									}, p))
								})] })]
							}),
							sector && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"확대 고정 · ",
								sector,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onZoom(null),
									children: "전체 보기"
								})
							] }),
							sector && market && (pref.period === "day" ? sources[market] == null : periodSources?.[market]?.[pref.period] == null) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								children: "업종 미확인 · 자료 미연결"
							}),
							!market ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "시장 선택 필요 · 시장 추정 안 함" }) : pref.period === "day" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketHeatmap, {
								market,
								input: sources[market],
								zoom: {
									sector,
									onChange: onZoom
								}
							}, market) : periodSources?.[market]?.[pref.period] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodHeatmap, {
								market,
								period: pref.period,
								supply: periodSources[market][pref.period],
								sector,
								onZoom
							}, `${market}:${pref.period}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: `${PERIOD_LABELS[pref.period]} 자료 미연결` })
						]
					}, panel.id);
				})
			})
		]
	});
}
var import_react, import_jsx_runtime, PERIOD_LABELS;
function init_HeatmapExplorer() {
	return (init_HeatmapExplorer = __esmMin((() => {
		import_react = require_react();
		init_WidgetMetricHelp();
		init_MarketHeatmap();
		init_marketSnapshot();
		init_heatmapSectors();
		init_portfolio();
		init_heatmap_preferences();
		import_jsx_runtime = require_jsx_runtime();
		PERIOD_LABELS = {
			day: "일간",
			week: "주간",
			month: "월간",
			year: "연간"
		};
	})))();
}
export { init_MarketHeatmap as a, MARKET_UNIVERSES as i, IndependentHeatmapPanels as n, init_marketSnapshot as o, init_HeatmapExplorer as r, parseMarketSnapshot as s, HeatmapExplorer as t };
