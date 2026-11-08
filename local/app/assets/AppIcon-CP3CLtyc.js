import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-DGHTPpxp.js";
var toKebabCase;
function init_toKebabCase() {
	return (init_toKebabCase = __esmMin((() => {
		toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
	})))();
}
/**
* @license lucide-react v1.59.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide-react v1.59.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function toLucideIconData(iconName, iconNode, aliases = []) {
	if (iconNode == null) throw new Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: toKebabCase(iconName),
		size: 24,
		node: iconNode,
		...aliases.length > 0 ? { aliases } : {}
	};
}
function init_toLucideIconData() {
	return (init_toLucideIconData = __esmMin((() => {
		init_toKebabCase();
	})))();
}
var toCamelCase;
function init_toCamelCase() {
	return (init_toCamelCase = __esmMin((() => {
		toCamelCase = (string) => {
			/**
			* @license lucide-react v1.59.0 - ISC
			*
			* This source code is licensed under the ISC license.
			* See the LICENSE file in the root directory of this source tree.
			*/
			let out = "";
			let upperNext = false;
			for (const ch of string) {
				if (ch === "-" || ch === "_" || ch <= " ") {
					upperNext = out.length > 0;
					continue;
				}
				if (out.length === 0) out += ch.toLowerCase();
				else out += upperNext ? ch.toUpperCase() : ch;
				upperNext = false;
			}
			return out;
		};
	})))();
}
var toPascalCase;
function init_toPascalCase() {
	return (init_toPascalCase = __esmMin((() => {
		init_toCamelCase();
		toPascalCase = (string) => {
			/**
			* @license lucide-react v1.59.0 - ISC
			*
			* This source code is licensed under the ISC license.
			* See the LICENSE file in the root directory of this source tree.
			*/
			const camelCase = toCamelCase(string);
			return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
		};
	})))();
}
var mergeClasses;
function init_mergeClasses() {
	return (init_mergeClasses = __esmMin((() => {
		mergeClasses = (...classes) => classes.filter((className, index, array) => {
			/**
			* @license lucide-react v1.59.0 - ISC
			*
			* This source code is licensed under the ISC license.
			* See the LICENSE file in the root directory of this source tree.
			*/
			return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
		}).join(" ").trim();
	})))();
}
var defaultAttributes;
function init_defaultAttributes() {
	return (init_defaultAttributes = __esmMin((() => {
		defaultAttributes = {
			xmlns: "http://www.w3.org/2000/svg",
			width: 24,
			height: 24,
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": 2,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		};
	})))();
}
/**
* @license lucide-react v1.59.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide-react v1.59.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function isDefined(value) {
	return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
	const attributeNames = params.attributeNames ?? {};
	const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
	const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
	const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
	const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
	const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
	const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
	const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
	const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
				attrs[getAttributeName(attrName)] = value;
				return attrs;
			}, {}),
			..."color" in params && params.color && { [getAttributeName("stroke")]: params.color },
			..."size" in params && isDefined(params.size) && {
				[getAttributeName("width")]: params.size,
				[getAttributeName("height")]: params.size
			},
			..."width" in params && isDefined(params.width) && { [getAttributeName("width")]: params.width },
			..."height" in params && isDefined(params.height) && { [getAttributeName("height")]: params.height },
			[getAttributeName("stroke-width")]: calculatedStrokeWidth,
			...className && { [getAttributeName("class")]: className },
			[getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
			...params.hasA11yProp === false ? { [getAttributeName("aria-hidden")]: "true" } : {},
			..."attributes" in params && params.attributes
		},
		icon.node.map((child) => {
			const [name, attrs, children] = child;
			const nextAttrs = params.nonScalingStroke ? {
				[getAttributeName("vector-effect")]: "non-scaling-stroke",
				...attrs
			} : attrs;
			return children ? [
				name,
				nextAttrs,
				children
			] : [name, nextAttrs];
		})
	];
}
function init_buildLucideIconNode() {
	return (init_buildLucideIconNode = __esmMin((() => {
		init_defaultAttributes();
		init_mergeClasses();
	})))();
}
/**
* @license lucide-react v1.59.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function buildLucideIconForReact(icon, params = {}) {
	return buildLucideIconNode(icon, {
		...params,
		attributeNames: {
			...params.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
function init_buildLucideIconForReact() {
	return (init_buildLucideIconForReact = __esmMin((() => {
		init_buildLucideIconNode();
	})))();
}
var hasA11yProp;
function init_hasA11yProp() {
	return (init_hasA11yProp = __esmMin((() => {
		hasA11yProp = (props) => {
			/**
			* @license lucide-react v1.59.0 - ISC
			*
			* This source code is licensed under the ISC license.
			* See the LICENSE file in the root directory of this source tree.
			*/
			for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
			return false;
		};
	})))();
}
var import_react$2, LucideContext, useLucideContext;
function init_context() {
	return (init_context = __esmMin((() => {
		import_react$2 = require_react();
		LucideContext = (0, import_react$2.createContext)({});
		useLucideContext = () => (0, import_react$2.useContext)(LucideContext);
	})))();
}
/**
* @license lucide-react v1.59.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var import_react$1, Icon;
function init_Icon() {
	return (init_Icon = __esmMin((() => {
		import_react$1 = require_react();
		init_mergeClasses();
		init_buildLucideIconForReact();
		init_hasA11yProp();
		init_context();
		Icon = (0, import_react$1.forwardRef)(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
			node: iconNode,
			aliases: [],
			size: 24
		}, ...rest }, ref) => {
			/**
			* @license lucide-react v1.59.0 - ISC
			*
			* This source code is licensed under the ISC license.
			* See the LICENSE file in the root directory of this source tree.
			*/
			const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
			const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);
			const [name, svgAttributes, builtIconNode = []] = buildLucideIconForReact(icon, {
				color: color ?? contextColor,
				width: width ?? size ?? contextSize,
				height: height ?? size ?? contextSize,
				strokeWidth: strokeWidth ?? contextStrokeWidth,
				absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
				nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
				className: mergeClasses(contextClass, className),
				hasA11yProp: hasAccessibleProp,
				attributes: rest
			});
			return (0, import_react$1.createElement)(name, {
				ref,
				...svgAttributes
			}, [...builtIconNode.map(([tag, attrs]) => (0, import_react$1.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
		});
	})))();
}
/**
* @license lucide-react v1.59.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
	const iconData = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		icon: iconData,
		className,
		...props
	}));
	if (iconData.name) Component.displayName = toPascalCase(iconData.name);
	return Component;
}
var import_react;
function init_createLucideIcon() {
	return (init_createLucideIcon = __esmMin((() => {
		import_react = require_react();
		init_toLucideIconData();
		init_toPascalCase();
		init_Icon();
	})))();
}
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
export { init_AppIcon as a, Info as c, init_createLucideIcon as d, WonSign as i, init_info as l, SidebarCloseIcon as n, TriangleAlert as o, SidebarOpenIcon as r, init_triangle_alert as s, AppIcon as t, createLucideIcon as u };
