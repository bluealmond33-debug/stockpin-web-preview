import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { t as require_react_dom } from "./react-dom-Ci3FjRz5.js";
import { a as init_AppIcon, t as AppIcon } from "./AppIcon-5b8gNeaV.js";
import { n as init_x, t as X } from "./x-CCKv1Aeb.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-ZxkmVh2C.js";
function init_market_named_panel() {
	return (init_market_named_panel = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-named-panel.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
/** Replaces native disclosure UI only;controlled consumers retain their existing owner.
* Children remain mounted like closed details,so drafts and nested reading state survive.
*/
function MarketNamedPanel({ title, children, className, open, defaultOpen = false, onOpenChange }) {
	const id = (0, import_react$3.useId)(), [localOpen, setLocalOpen] = (0, import_react$3.useState)(defaultOpen), expanded = open ?? localOpen;
	function toggle() {
		const next = !expanded;
		if (open === void 0) setLocalOpen(next);
		onOpenChange?.(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: ["market-named-panel", className].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
			type: "button",
			className: "market-named-panel-toggle",
			"aria-expanded": expanded,
			"aria-controls": id,
			onClick: toggle,
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			id,
			className: "market-named-panel-content",
			hidden: !expanded,
			children
		})]
	});
}
var import_react$3, import_jsx_runtime$3;
function init_MarketNamedPanel() {
	return (init_MarketNamedPanel = __esmMin((() => {
		import_react$3 = require_react();
		init_market_named_panel();
		import_jsx_runtime$3 = require_jsx_runtime();
	})))();
}
function init_tooltip() {
	return (init_tooltip = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/ui/tooltip.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
/** Visual action hint only: the button's label already supplies its name. */
function Tooltip({ anchor, children, onDismiss }) {
	const panel = (0, import_react$2.useRef)(null);
	const button = anchor.current;
	const container = button?.closest("dialog") ?? button?.ownerDocument.body;
	(0, import_react$2.useLayoutEffect)(() => {
		const trigger = anchor.current, node = panel.current;
		const win = trigger?.ownerDocument.defaultView;
		if (!trigger || !node || !win) return;
		const doc = trigger.ownerDocument, viewport = win.visualViewport;
		const position = () => {
			const rect = trigger.getBoundingClientRect();
			const left = viewport?.offsetLeft ?? 0, top = viewport?.offsetTop ?? 0;
			const width = viewport?.width ?? win.innerWidth, height = viewport?.height ?? win.innerHeight;
			const margin = 16, gap = 6;
			node.style.maxWidth = `${Math.max(0, width - 32)}px`;
			const size = node.getBoundingClientRect();
			const x = Math.max(left + margin, Math.min(rect.right - size.width, left + width - margin - size.width));
			const below = rect.bottom + gap;
			const side = below + size.height <= top + height - margin ? "bottom" : "top";
			const y = side === "bottom" ? below : rect.top - gap - size.height;
			node.dataset.side = side;
			node.style.left = `${x}px`;
			node.style.top = `${Math.max(top + margin, Math.min(y, top + height - margin - size.height))}px`;
			node.style.visibility = "visible";
		};
		const escape = (event) => {
			if (event.key === "Escape") onDismiss();
		};
		position();
		win.addEventListener("scroll", position, true);
		win.addEventListener("resize", position);
		viewport?.addEventListener("scroll", position);
		viewport?.addEventListener("resize", position);
		doc.addEventListener("keydown", escape);
		const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(position);
		observer?.observe(trigger);
		observer?.observe(node);
		return () => {
			win.removeEventListener("scroll", position, true);
			win.removeEventListener("resize", position);
			viewport?.removeEventListener("scroll", position);
			viewport?.removeEventListener("resize", position);
			doc.removeEventListener("keydown", escape);
			observer?.disconnect();
		};
	}, [
		anchor,
		onDismiss,
		children
	]);
	if (!container || !(button?.getAttribute("data-info-tooltip") === "true" || button?.getAttribute("data-supplemental-tooltip") === "true" || button?.getAttribute("data-icon-name-tooltip") === "true")) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
		ref: panel,
		className: "icon-tooltip shared-icon-tooltip",
		"aria-hidden": "true",
		style: { visibility: "hidden" },
		children
	}), container);
}
var import_react$2, import_react_dom, import_jsx_runtime$2;
function init_Tooltip() {
	return (init_Tooltip = __esmMin((() => {
		import_react$2 = require_react();
		import_react_dom = require_react_dom();
		init_tooltip();
		import_jsx_runtime$2 = require_jsx_runtime();
	})))();
}
function init_icon_button() {
	return (init_icon_button = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/ui/icon-button.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
function isSupplementalHint(label, tooltip) {
	return typeof tooltip === "string" && tooltip.trim().length > 0 && tooltip.trim() !== label.trim();
}
var import_react$1, import_jsx_runtime$1, IconButton, CloseButton;
function init_IconButton() {
	return (init_IconButton = __esmMin((() => {
		import_react$1 = require_react();
		init_x();
		init_AppIcon();
		init_Tooltip();
		init_icon_button();
		import_jsx_runtime$1 = require_jsx_runtime();
		IconButton = (0, import_react$1.forwardRef)(function IconButton({ label, icon, tooltip, tooltipKind, title, type = "button", className = "", disabled, onPointerEnter, onPointerLeave, onFocus, onBlur, children: _children, ...props }, ref) {
			const button = (0, import_react$1.useRef)(null);
			(0, import_react$1.useImperativeHandle)(ref, () => button.current, []);
			const [hovered, setHovered] = (0, import_react$1.useState)(false);
			const [focused, setFocused] = (0, import_react$1.useState)(false);
			const [dismissed, setDismissed] = (0, import_react$1.useState)(false);
			const dismiss = (0, import_react$1.useCallback)(() => setDismissed(true), []);
			const information = props["data-info-tooltip"] === "true";
			const iconName = tooltipKind === "icon-name" && typeof tooltip === "string" && tooltip.trim().length > 0;
			const supplemental = !iconName && isSupplementalHint(label, tooltip);
			const show = (information || supplemental || iconName) && !!tooltip && !disabled && !dismissed && (hovered || focused);
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
				...props,
				"data-icon-name-tooltip": iconName ? "true" : void 0,
				"data-supplemental-tooltip": supplemental ? "true" : void 0,
				ref: button,
				type,
				disabled,
				className: `icon-button shared-icon-button ${className}`.trim(),
				"aria-label": label,
				title: information && !tooltip ? title : void 0,
				onPointerEnter: (event) => {
					if (!disabled) {
						setHovered(true);
						setDismissed(false);
					}
					onPointerEnter?.(event);
				},
				onPointerLeave: (event) => {
					setHovered(false);
					onPointerLeave?.(event);
				},
				onFocus: (event) => {
					if (!disabled) {
						setFocused(true);
						setDismissed(false);
					}
					onFocus?.(event);
				},
				onBlur: (event) => {
					setFocused(false);
					onBlur?.(event);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppIcon, { icon })
			}), show && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				anchor: button,
				onDismiss: dismiss,
				children: tooltip
			})] });
		});
		CloseButton = (0, import_react$1.forwardRef)(function CloseButton({ tooltip = "닫기", ...props }, ref) {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
				...props,
				ref,
				icon: X,
				tooltip
			});
		});
	})))();
}
function init_market_data_help() {
	return (init_market_data_help = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-data-help.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
/** Keep the basis and receipt distinct; date-only observations never acquire invented times. */
function MarketDataHelp({ label, children, summary, brief, asOf, receivedAt, sourceUrl, disabled = false, description, floating = true, compact = true }) {
	const dialog = (0, import_react.useRef)(null), root = (0, import_react.useRef)(null);
	const lines = summary ?? [
		`${label} · 지표 설명`,
		"공급·기준·수신은 상세에서 확인",
		"미확인은 숫자로 채우지 않음"
	];
	const format = (value) => new Intl.DateTimeFormat("sv-SE", {
		timeZone: "Asia/Seoul",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(new Date(value)).replaceAll("-", ".");
	const validReceipt = !!receivedAt && Number.isFinite(Date.parse(receivedAt));
	const dateOnly = !!asOf && /^\d{4}-\d{2}-\d{2}$/.test(asOf);
	const validBasis = !!asOf && Number.isFinite(Date.parse(asOf)) && (!dateOnly || new Date(asOf).toISOString().slice(0, 10) === asOf);
	const basis = validBasis ? dateOnly ? asOf.replaceAll("-", ".") : format(asOf) : "미확인";
	const source = sourceUrl?.startsWith("https://") ? sourceUrl : null;
	const close = () => {
		dialog.current?.close();
		root.current?.querySelector(".widget-metric-help-trigger")?.focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "market-data-help",
		ref: root,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetMetricHelp, {
			label,
			disabled,
			description,
			floating,
			compact: brief ? false : compact,
			maxWidthPx: 280,
			children: brief ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "market-help-summary-line",
				style: {
					whiteSpace: "normal",
					display: "block"
				},
				children: brief
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "market-help-summary-line market-help-clock",
				style: {
					marginTop: 8,
					justifyContent: "flex-start",
					flexWrap: "wrap",
					rowGap: 4,
					whiteSpace: "normal"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "market-help-basis",
						children: ["기준 ", validBasis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							dateTime: asOf,
							"data-clock": "basis",
							"aria-description": dateOnly ? "원문 기준일 · 정확한 시각 미제공" : "원문 기준시각 · 한국시간(KST) 표시",
							children: basis
						}) : "미확인"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "market-help-links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							}),
							source ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								style: {
									color: "inherit",
									fontWeight: 400
								},
								href: source,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "출처"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "출처 미확인" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								style: { color: "inherit" },
								"aria-haspopup": "dialog",
								"aria-label": `${label} 자료 상세 열기`,
								onClick: () => dialog.current?.showModal(),
								children: "자료 상세"
							})
						]
					}),
					validReceipt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
						dateTime: receivedAt,
						"data-clock": "received",
						className: "sr-only",
						children: [
							"원문 수신 ",
							format(receivedAt),
							" 한국시간"
						]
					})
				]
			})] }) : lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "market-help-summary-line",
				children: [line, i === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-haspopup": "dialog",
					"aria-label": `${label} 자료 상세 열기`,
					onClick: () => dialog.current?.showModal(),
					children: "자세히"
				})]
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dialog", {
			className: "market-data-help-detail",
			"aria-label": `${label} 자료 상세`,
			ref: dialog,
			onCancel: (event) => {
				event.preventDefault();
				close();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [label, " · 자료 상세"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
				label: `${label} 자료 상세 닫기`,
				onClick: close
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children })]
		})]
	});
}
/** Read-only projection of the existing average result; no date or price calculation. */
function MarketAverageHelp({ label, windows, kind }) {
	if (!windows.length) return null;
	const explain = (w) => {
		const available = w.status === "observations" && w.display !== null;
		const period = w.period === "3m" ? "3개월" : "1주일";
		const actual = w.observedStart && w.observedEnd ? `${w.observedStart}–${w.observedEnd}` : "없음";
		const reason = available ? "" : ` · 자료 부족: ${w.count === 0 ? "유효 관측 없음" : kind === "yield" && w.count < 2 ? "유효 관측 2개 미만" : "요청 기간 원자료 범위 또는 결측 조건 미충족"}`;
		return `${period} 평균 ${available ? w.display : "자료 부족"} · ${kind === "yield" ? "연율 %" : w.unit ?? "단위 미확인"} · 요청 ${w.start}–${w.end} · 실제 ${actual} · 표본 n=${w.count} (${w.count}개 관측)${reason}`;
	};
	const lines = windows.map(explain);
	const basis = "원천 기준일에 따른 최근 7달력일 / 달력 3개월 평균입니다. 공통 차트 표시축과 평균의 원천 기준일·계산 기간은 다를 수 있습니다. 결측·휴장 완전성은 미확인입니다.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketDataHelp, {
		label: `${label} 평균`,
		summary: [
			lines[0],
			lines[1] ?? "제공된 평균 기간만 표시합니다.",
			basis
		],
		description: `${label} 평균의 요청 기간, 실제 관측 기간, 표본 수와 자료 부족 사유`,
		children: [
			lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [basis, " 1주일은 원천 기준일을 포함한 최근 7달력일이며, 3개월은 달력상 3개월 전 경계의 다음 날부터 원천 기준일까지입니다. 원자료를 보간하거나 휴일 값을 채우지 않습니다."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: kind === "yield" ? "연수익률 관측의 산술평균이며 채권 가격평균·투자수익률이 아닙니다." : "공급된 참고율 평균이며 거래용 환율·포트폴리오 환산값이 아닙니다." })
		]
	});
}
var import_react, import_jsx_runtime;
function init_MarketDataHelp() {
	return (init_MarketDataHelp = __esmMin((() => {
		import_react = require_react();
		init_WidgetMetricHelp();
		init_IconButton();
		init_market_data_help();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
export { IconButton as a, init_Tooltip as c, CloseButton as i, MarketNamedPanel as l, MarketDataHelp as n, init_IconButton as o, init_MarketDataHelp as r, Tooltip as s, MarketAverageHelp as t, init_MarketNamedPanel as u };
