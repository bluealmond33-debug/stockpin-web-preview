import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CSsnt-5j.js";
function init_WidgetMetricHelp() {
	return (init_WidgetMetricHelp = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/portfolio/WidgetMetricHelp.css?v=source-build-r156";
			document.head.appendChild(l);
		}
	})))();
}
/** Pure local disclosure; no data, provider or web-only dependencies. */
function WidgetMetricHelp({ label, children, disabled = false, description }) {
	const [open, setOpen] = (0, import_react.useState)(false), root = (0, import_react.useRef)(null), trigger = (0, import_react.useRef)(null), pinned = (0, import_react.useRef)(false), dismissed = (0, import_react.useRef)(false), id = (0, import_react.useId)();
	const close = () => {
		setOpen(false);
		pinned.current = false;
	};
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const outside = (event) => {
			if (!root.current?.contains(event.target)) {
				setOpen(false);
				pinned.current = false;
			}
		};
		const escape = (event) => {
			if (event.key !== "Escape") return;
			const active = document.activeElement, ownsFocus = !!root.current?.contains(active);
			if (!ownsFocus && active !== document.body) return;
			event.preventDefault();
			event.stopPropagation();
			setOpen(false);
			pinned.current = false;
			dismissed.current = true;
			if (ownsFocus) trigger.current?.focus();
		};
		document.addEventListener("pointerdown", outside);
		document.addEventListener("focusin", outside);
		document.addEventListener("keydown", escape);
		return () => {
			document.removeEventListener("pointerdown", outside);
			document.removeEventListener("focusin", outside);
			document.removeEventListener("keydown", escape);
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		className: "widget-metric-help",
		onKeyDown: (event) => {
			if (event.key === "Escape" && open) {
				event.preventDefault();
				event.stopPropagation();
				dismissed.current = true;
				close();
				trigger.current?.focus();
			}
		},
		onMouseEnter: () => {
			if (disabled) return;
			dismissed.current = false;
			setOpen(true);
		},
		onMouseLeave: () => {
			dismissed.current = false;
			if (!pinned.current && !root.current?.contains(document.activeElement)) close();
		},
		onBlur: (event) => {
			if (!event.currentTarget.contains(event.relatedTarget)) {
				dismissed.current = false;
				close();
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: trigger,
				type: "button",
				disabled,
				className: "widget-metric-help-trigger",
				"aria-label": `${label} 의미 도움말`,
				"aria-expanded": open && !disabled,
				"aria-describedby": description ? `${id}-description` : id,
				onFocus: () => {
					if (!disabled && !dismissed.current) setOpen(true);
				},
				onClick: () => {
					if (disabled) return;
					if (pinned.current) {
						dismissed.current = true;
						close();
					} else {
						dismissed.current = false;
						pinned.current = true;
						setOpen(true);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "i"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id,
				role: "region",
				"aria-label": `${label} 안내`,
				tabIndex: 0,
				className: "widget-metric-help-panel",
				hidden: !open || disabled,
				children
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: `${id}-description`,
				hidden: true,
				children: description
			})
		]
	});
}
var import_react, import_jsx_runtime;
function init_WidgetMetricHelp$1() {
	return (init_WidgetMetricHelp$1 = __esmMin((() => {
		import_react = require_react();
		init_WidgetMetricHelp();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
export { init_WidgetMetricHelp$1 as n, WidgetMetricHelp as t };
