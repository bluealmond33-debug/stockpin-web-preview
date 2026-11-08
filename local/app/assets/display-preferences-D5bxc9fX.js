import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function createDisplayPreferences(storage) {
	let value = {
		version: 1,
		currency: "KRW",
		privacy: true
	}, writable = true;
	const valid = (x) => x && Object.getPrototypeOf(x) === Object.prototype && Object.keys(x).sort().join(",") === "currency,privacy,version" && x.version === 1 && [
		"original",
		"KRW",
		"USD"
	].includes(x.currency) && typeof x.privacy === "boolean";
	try {
		const raw = storage?.getItem(DISPLAY_KEY);
		if (raw !== null && raw !== void 0) {
			const parsed = JSON.parse(raw);
			if (valid(parsed)) value = parsed;
			else writable = false;
		}
	} catch {
		writable = false;
	}
	return Object.freeze({
		currency: value.currency,
		privacy: value.privacy,
		onChange({ currency, privacy }) {
			const next = {
				version: 1,
				currency,
				privacy
			};
			if (!writable || !valid(next) || !storage) return false;
			try {
				const raw = storage.getItem(DISPLAY_KEY);
				if (raw !== null && !valid(JSON.parse(raw))) return false;
				const encoded = JSON.stringify(next);
				if (raw !== encoded) storage.setItem(DISPLAY_KEY, encoded);
				return true;
			} catch {
				return false;
			}
		}
	});
}
var DISPLAY_KEY;
function init_display_preferences() {
	return (init_display_preferences = __esmMin((() => {
		DISPLAY_KEY = "stockpin-web-preview-display-v1";
	})))();
}
init_display_preferences();
export { createDisplayPreferences };
