import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { d as init_createLucideIcon, u as createLucideIcon } from "./AppIcon-5b8gNeaV.js";
var __iconData, Check;
function init_check() {
	return (init_check = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "check",
			size: 24,
			node: [["path", {
				d: "M20 6 9 17l-5-5",
				key: "1gmf2c"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		Check = createLucideIcon(__iconData);
	})))();
}
function init_single_choice() {
	return (init_single_choice = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/components/ui/single-choice.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
/** Compact UI-only selection. No storage, transport or inferred default value. */
function SingleChoice({ label, value, options, onChange, placeholder = "선택 필요" }) {
	const root = (0, import_react.useRef)(null), trigger = (0, import_react.useRef)(null), id = (0, import_react.useId)();
	const [open, setOpen] = (0, import_react.useState)(false), [active, setActive] = (0, import_react.useState)(null), [position, setPosition] = (0, import_react.useState)({
		left: 12,
		top: 12,
		bottom: void 0,
		width: 144,
		maxHeight: 240
	});
	const selected = options.findIndex((option) => option.value === value);
	const activeIndex = options.findIndex((option) => option.value === active);
	const current = activeIndex >= 0 ? activeIndex : Math.max(0, selected);
	const expanded = open && options.length > 0;
	const choose = (index) => {
		const option = options[index];
		if (!option) return;
		if (option.value !== value) onChange(option.value);
		setOpen(false);
		trigger.current?.focus({ preventScroll: true });
	};
	(0, import_react.useLayoutEffect)(() => {
		if (!expanded) return;
		const list = trigger.current?.ownerDocument.getElementById(`${id}-list`);
		const option = list?.querySelectorAll("[role=option]")[current];
		if (!list || !option) return;
		const top = option.offsetTop, bottom = top + option.offsetHeight;
		if (top < list.scrollTop) list.scrollTop = top;
		else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
	}, [
		expanded,
		current,
		options.length,
		position.maxHeight,
		id
	]);
	(0, import_react.useLayoutEffect)(() => {
		if (!options.length) {
			setOpen(false);
			return;
		}
		if (!expanded || !trigger.current) return;
		const button = trigger.current, doc = button.ownerDocument, win = doc.defaultView;
		if (!win) return;
		const place = () => {
			const r = button.getBoundingClientRect(), below = Math.max(0, win.innerHeight - r.bottom - 12), above = Math.max(0, r.top - 12), up = below < 160 && above > below, width = Math.max(0, Math.min(Math.max(r.width, 144), win.innerWidth - 24)), height = Math.min(240, up ? above : below);
			setPosition({
				left: Math.max(12, Math.min(r.left, win.innerWidth - width - 12)),
				top: up ? void 0 : r.bottom + 4,
				bottom: up ? win.innerHeight - r.top + 4 : void 0,
				width,
				maxHeight: height
			});
		};
		place();
		win.addEventListener("resize", place);
		doc.addEventListener("scroll", place, true);
		return () => {
			win.removeEventListener("resize", place);
			doc.removeEventListener("scroll", place, true);
		};
	}, [expanded, options.length]);
	(0, import_react.useEffect)(() => {
		if (!expanded || !root.current) return;
		const doc = root.current.ownerDocument;
		const outside = (event) => {
			if (!root.current?.contains(event.target)) setOpen(false);
		};
		doc.addEventListener("pointerdown", outside);
		doc.addEventListener("focusin", outside);
		return () => {
			doc.removeEventListener("pointerdown", outside);
			doc.removeEventListener("focusin", outside);
		};
	}, [expanded]);
	const keyDown = (event) => {
		if (event.key === "Tab") {
			setOpen(false);
			return;
		}
		if (event.key === "Escape") {
			if (expanded) {
				event.preventDefault();
				event.stopPropagation();
				setOpen(false);
			}
			return;
		}
		if (!options.length) return;
		if ([
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(event.key)) {
			event.preventDefault();
			const index = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : !expanded ? Math.max(0, selected) : (current + (event.key === "ArrowDown" ? 1 : options.length - 1)) % options.length;
			setActive(options[index]?.value ?? null);
			setOpen(true);
			return;
		}
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			if (expanded) choose(current);
			else {
				setActive(options[Math.max(0, selected)]?.value ?? null);
				setOpen(true);
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		className: "single-choice",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			ref: trigger,
			type: "button",
			role: "combobox",
			"aria-label": label,
			"aria-haspopup": "listbox",
			"aria-expanded": expanded,
			"aria-controls": expanded ? `${id}-list` : void 0,
			"aria-activedescendant": expanded && options[current] ? `${id}-option-${current}` : void 0,
			disabled: !options.length,
			className: "single-choice-trigger",
			onKeyDown: keyDown,
			onClick: () => {
				setActive(options[Math.max(0, selected)]?.value ?? null);
				setOpen(!expanded);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: options[selected]?.label ?? placeholder }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: expanded ? "닫기" : "선택"
			})]
		}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "listbox",
			id: `${id}-list`,
			"aria-label": label,
			className: "single-choice-list",
			style: {
				position: "fixed",
				...position
			},
			children: options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "option",
				id: `${id}-option-${index}`,
				"aria-selected": option.value === value,
				"data-active": current === index,
				tabIndex: -1,
				className: "single-choice-option",
				onMouseDown: (event) => event.preventDefault(),
				onMouseEnter: () => setActive(option.value),
				onClick: () => choose(index),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.label }), option.value === value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 14,
					"aria-hidden": "true"
				})]
			}, option.value))
		})]
	});
}
var import_react, import_jsx_runtime;
function init_SingleChoice() {
	return (init_SingleChoice = __esmMin((() => {
		import_react = require_react();
		init_check();
		init_single_choice();
		import_jsx_runtime = require_jsx_runtime();
	})))();
}
export { init_check as i, init_SingleChoice as n, Check as r, SingleChoice as t };
