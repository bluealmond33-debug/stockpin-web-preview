import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { t as require_jsx_runtime } from "./jsx-runtime-D-QAa1jW.js";
import { n as init_createLucideIcon, t as createLucideIcon } from "./createLucideIcon-l6BxyEwt.js";
var __iconData$1, Info;
function init_info() {
	return (init_info = __esmMin((() => {
		init_createLucideIcon();
		__iconData$1 = {
			name: "info",
			size: 24,
			node: [
				["circle", {
					cx: "12",
					cy: "12",
					r: "10",
					key: "1mglay"
				}],
				["path", {
					d: "M12 16v-4",
					key: "1dtifu"
				}],
				["path", {
					d: "M12 8h.01",
					key: "e9boi3"
				}]
			]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData$1.node;
		Info = createLucideIcon(__iconData$1);
	})))();
}
var __iconData, TriangleAlert;
function init_triangle_alert() {
	return (init_triangle_alert = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "triangle-alert",
			size: 24,
			node: [
				["path", {
					d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
					key: "wmoenq"
				}],
				["path", {
					d: "M12 9v4",
					key: "juzpu7"
				}],
				["path", {
					d: "M12 17h.01",
					key: "p32p05"
				}]
			],
			aliases: ["alert-triangle"]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		TriangleAlert = createLucideIcon(__iconData);
	})))();
}
function AppIcon({ icon: Icon, size = 16, strokeWidth = 1.75, className = "" }) {
	const dotY = Icon === TriangleAlert ? 17 : Icon === Info ? 8 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		size,
		strokeWidth,
		strokeLinecap: "butt",
		strokeLinejoin: "miter",
		strokeMiterlimit: 2,
		className: `app-icon ${className}`.trim(),
		"aria-hidden": "true",
		focusable: "false",
		children: dotY !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12.005",
			cy: dotY,
			r: strokeWidth / 2,
			stroke: "none",
			fill: "currentColor"
		})
	});
}
var import_jsx_runtime, WonSign, SidebarOpenIcon, SidebarCloseIcon;
function init_AppIcon() {
	return (init_AppIcon = __esmMin((() => {
		init_createLucideIcon(), init_info(), init_triangle_alert();
		import_jsx_runtime = require_jsx_runtime();
		WonSign = createLucideIcon("StockPinWon", [["path", {
			d: "m3 5 4 14 5-11 5 11 4-14",
			key: "won"
		}], ["path", {
			d: "M2 10h20M2 14h20",
			key: "bars"
		}]]);
		SidebarOpenIcon = createLucideIcon("StockPinSidebarOpen", [["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "1",
			key: "panel"
		}], ["path", {
			d: "M9 3v18m5-12 3 3-3 3",
			key: "open"
		}]]);
		SidebarCloseIcon = createLucideIcon("StockPinSidebarClose", [["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "1",
			key: "panel"
		}], ["path", {
			d: "M9 3v18m7-12-3 3 3 3",
			key: "close"
		}]]);
	})))();
}
export { init_AppIcon as a, Info as c, WonSign as i, init_info as l, SidebarCloseIcon as n, TriangleAlert as o, SidebarOpenIcon as r, init_triangle_alert as s, AppIcon as t };
