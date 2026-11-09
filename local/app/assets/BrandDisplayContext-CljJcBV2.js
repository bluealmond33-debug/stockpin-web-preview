import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CSsnt-5j.js";
/** Presentation only: opt public surfaces in without changing native defaults. */
function BrandDisplayProvider({ mode, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandDisplayContext.Provider, {
		value: mode,
		children
	});
}
function useBrandDisplayMode() {
	return (0, import_react.useContext)(BrandDisplayContext);
}
var import_react, import_jsx_runtime, BrandDisplayContext;
function init_BrandDisplayContext() {
	return (init_BrandDisplayContext = __esmMin((() => {
		import_react = require_react();
		import_jsx_runtime = require_jsx_runtime();
		BrandDisplayContext = (0, import_react.createContext)("original");
	})))();
}
export { init_BrandDisplayContext as n, useBrandDisplayMode as r, BrandDisplayProvider as t };
