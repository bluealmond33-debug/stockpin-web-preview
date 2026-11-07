import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { a as init_validation, f as validateRequest } from "./validation-nVnSDgLx.js";
/** Web-only adapter; the underlying journal retains explicit initialization.
* @param {import('./protocol.mjs').Command} command
* @returns {import('./protocol.mjs').Command}
*/
function createInitializedBrowserJournal(command) {
	return async (request) => {
		const validated = validateRequest(request);
		const result = await command(validated);
		if ((validated.op === "open" || validated.op === "open_cached") && result.kind === "uninitialized") return command({ op: "initialize" });
		return result;
	};
}
function init_initialize_on_open() {
	return (init_initialize_on_open = __esmMin((() => {
		init_validation();
	})))();
}
init_initialize_on_open();
export { createInitializedBrowserJournal };
