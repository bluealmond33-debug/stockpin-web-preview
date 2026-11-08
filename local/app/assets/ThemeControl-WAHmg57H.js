import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
import { a as init_AppIcon, d as init_createLucideIcon, t as AppIcon, u as createLucideIcon } from "./AppIcon-BEqGQdk8.js";
var __iconData$1, Moon;
function init_moon() {
	return (init_moon = __esmMin((() => {
		init_createLucideIcon();
		__iconData$1 = {
			name: "moon",
			size: 24,
			node: [["path", {
				d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
				key: "kfwtm"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData$1.node;
		Moon = createLucideIcon(__iconData$1);
	})))();
}
var __iconData, Sun;
function init_sun() {
	return (init_sun = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "sun",
			size: 24,
			node: [
				["circle", {
					cx: "12",
					cy: "12",
					r: "4",
					key: "4exip2"
				}],
				["path", {
					d: "M12 2v2",
					key: "tus03m"
				}],
				["path", {
					d: "M12 20v2",
					key: "1lh1kg"
				}],
				["path", {
					d: "m4.93 4.93 1.41 1.41",
					key: "149t6j"
				}],
				["path", {
					d: "m17.66 17.66 1.41 1.41",
					key: "ptbguv"
				}],
				["path", {
					d: "M2 12h2",
					key: "1t8f8n"
				}],
				["path", {
					d: "M20 12h2",
					key: "1q8mjw"
				}],
				["path", {
					d: "m6.34 17.66-1.41 1.41",
					key: "1m8zz5"
				}],
				["path", {
					d: "m19.07 4.93-1.41 1.41",
					key: "1shlcs"
				}]
			]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		Sun = createLucideIcon(__iconData);
	})))();
}
function initializeTheme() {
	let theme = "dark";
	try {
		if (localStorage.getItem(key) === "light") theme = "light";
	} catch {}
	document.documentElement.dataset.theme = theme;
	return theme;
}
function ThemeControl() {
	const [theme, setTheme] = (0, import_react.useState)(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "light" ? "light" : "dark");
	const [saveFailures, setSaveFailures] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "theme-control",
		role: "group",
		"aria-label": "테마 선택",
		children: [[
			"light",
			"라이트 테마",
			Sun
		], [
			"dark",
			"다크 테마",
			Moon
		]].map(([value, label, icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "icon-button",
			"aria-label": label,
			"aria-pressed": theme === value,
			onClick: () => {
				document.documentElement.dataset.theme = value;
				setTheme(value);
				try {
					localStorage.setItem(key, value);
					setSaveFailures(0);
				} catch {
					setSaveFailures((failures) => failures + 1);
				}
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppIcon, {
				icon,
				size: 18
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "icon-tooltip",
				"aria-hidden": "true",
				children: label
			})]
		}, value))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		"aria-live": "polite",
		"aria-atomic": "true",
		children: saveFailures > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "scope-copy",
			children: ["테마를 저장하지 못했습니다. 이번 실행에만 적용됩니다. 다시 선택하면 저장을 재시도합니다.", saveFailures > 1 && ` 저장 재시도 ${saveFailures - 1}회 실패.`]
		})
	})] });
}
var import_react, import_jsx_runtime, key;
function init_ThemeControl() {
	return (init_ThemeControl = __esmMin((() => {
		import_react = require_react();
		init_sun(), init_moon();
		init_AppIcon();
		import_jsx_runtime = require_jsx_runtime();
		key = "stockpin.display.theme";
	})))();
}
export { init_ThemeControl as n, initializeTheme as r, ThemeControl as t };
