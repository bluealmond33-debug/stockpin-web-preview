import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { t as require_react_dom } from "./react-dom-Ci3FjRz5.js";
import { a as init_AppIcon, t as AppIcon } from "./AppIcon-Dk7ro4j9.js";
import { n as init_x, t as X } from "./x-xI4fqz6-.js";
import { n as init_WidgetMetricHelp, t as WidgetMetricHelp } from "./WidgetMetricHelp-DhpB0pAy.js";
function init_tooltip() {
	return (init_tooltip = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/ui/tooltip.css?v=source-build-r50019";
			document.head.appendChild(l);
		}
	})))();
}
/** Visual action hint only: the button's label already supplies its name. */
function Tooltip({ anchor, children, onDismiss }) {
	const panel = (0, import_react$3.useRef)(null);
	const button = anchor.current;
	const container = button?.closest("dialog") ?? button?.ownerDocument.body;
	(0, import_react$3.useLayoutEffect)(() => {
		const trigger = anchor.current, node = panel.current;
		const win = trigger?.ownerDocument.defaultView;
		if (!trigger || !node || !win) return;
		const doc = trigger.ownerDocument, viewport = win.visualViewport;
		const position = () => {
			const rect = trigger.getBoundingClientRect();
			const left = viewport?.offsetLeft ?? 0, top = viewport?.offsetTop ?? 0;
			const width = viewport?.width ?? win.innerWidth, height = viewport?.height ?? win.innerHeight;
			const margin = 16, gap = 8;
			node.style.maxWidth = `${Math.max(0, width - 32)}px`;
			const size = node.getBoundingClientRect();
			const x = Math.max(left + margin, Math.min(rect.right - size.width, left + width - margin - size.width));
			const below = rect.bottom + gap;
			const y = below + size.height <= top + height - margin ? below : rect.top - gap - size.height;
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
	if (!container) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
		ref: panel,
		className: "icon-tooltip shared-icon-tooltip",
		"aria-hidden": "true",
		style: { visibility: "hidden" },
		children
	}), container);
}
var import_react$3, import_react_dom, import_jsx_runtime$3;
function init_Tooltip() {
	return (init_Tooltip = __esmMin((() => {
		import_react$3 = require_react();
		import_react_dom = require_react_dom();
		init_tooltip();
		import_jsx_runtime$3 = require_jsx_runtime();
	})))();
}
function init_icon_button() {
	return (init_icon_button = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/ui/icon-button.css?v=source-build-r50019";
			document.head.appendChild(l);
		}
	})))();
}
var import_react$2, import_jsx_runtime$2, IconButton, CloseButton;
function init_IconButton() {
	return (init_IconButton = __esmMin((() => {
		import_react$2 = require_react();
		init_x();
		init_AppIcon();
		init_Tooltip();
		init_icon_button();
		import_jsx_runtime$2 = require_jsx_runtime();
		IconButton = (0, import_react$2.forwardRef)(function IconButton({ label, icon, tooltip, title, type = "button", className = "", disabled, onPointerEnter, onPointerLeave, onFocus, onBlur, children: _children, ...props }, ref) {
			const button = (0, import_react$2.useRef)(null);
			(0, import_react$2.useImperativeHandle)(ref, () => button.current, []);
			const [hovered, setHovered] = (0, import_react$2.useState)(false);
			const [focused, setFocused] = (0, import_react$2.useState)(false);
			const [dismissed, setDismissed] = (0, import_react$2.useState)(false);
			const dismiss = (0, import_react$2.useCallback)(() => setDismissed(true), []);
			const show = !!tooltip && !disabled && !dismissed && (hovered || focused);
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				...props,
				ref: button,
				type,
				disabled,
				className: `icon-button shared-icon-button ${className}`.trim(),
				"aria-label": label,
				title: tooltip ? void 0 : title,
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
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AppIcon, { icon })
			}), show && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Tooltip, {
				anchor: button,
				onDismiss: dismiss,
				children: tooltip
			})] });
		});
		CloseButton = (0, import_react$2.forwardRef)(function CloseButton({ tooltip = "닫기", ...props }, ref) {
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(IconButton, {
				...props,
				ref,
				icon: X,
				tooltip
			});
		});
	})))();
}
function init_market_named_panel() {
	return (init_market_named_panel = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-named-panel.css?v=source-build-r50019";
			document.head.appendChild(l);
		}
	})))();
}
/** Replaces native disclosure UI only;controlled consumers retain their existing owner.
* Children remain mounted like closed details,so drafts and nested reading state survive.
*/
function MarketNamedPanel({ title, children, className, open, defaultOpen = false, onOpenChange }) {
	const id = (0, import_react$1.useId)(), [localOpen, setLocalOpen] = (0, import_react$1.useState)(defaultOpen), expanded = open ?? localOpen;
	function toggle() {
		const next = !expanded;
		if (open === void 0) setLocalOpen(next);
		onOpenChange?.(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className: ["market-named-panel", className].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
			type: "button",
			className: "market-named-panel-toggle",
			"aria-expanded": expanded,
			"aria-controls": id,
			onClick: toggle,
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			id,
			className: "market-named-panel-content",
			hidden: !expanded,
			children
		})]
	});
}
var import_react$1, import_jsx_runtime$1;
function init_MarketNamedPanel() {
	return (init_MarketNamedPanel = __esmMin((() => {
		import_react$1 = require_react();
		init_market_named_panel();
		import_jsx_runtime$1 = require_jsx_runtime();
	})))();
}
function init_market_data_help() {
	return (init_market_data_help = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-data-help.css?v=source-build-r50019";
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
					marginTop: 14,
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
							title: dateOnly ? "원문 기준일 · 정확한 시각 미제공" : "원문 기준시각 · 한국시간(KST) 표시",
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
export { CloseButton as a, Tooltip as c, init_MarketNamedPanel as i, init_Tooltip as l, init_MarketDataHelp as n, IconButton as o, MarketNamedPanel as r, init_IconButton as s, MarketDataHelp as t };
