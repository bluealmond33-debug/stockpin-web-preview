import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function readRefreshMinutes(raw) {
	return raw === "off" ? 0 : raw === "3" ? 3 : 5;
}
/** No auth, storage or broker access here. Caller supplies one bounded read. */
function startAssetRefresh(minutes, read, available) {
	let stopped = false;
	let failures = 0;
	let timer;
	const schedule = () => {
		if (stopped) return;
		const delay = Math.min(minutes * 6e4 * 2 ** failures, 18e5);
		timer = setTimeout(() => {
			tick();
		}, delay);
	};
	const tick = async () => {
		if (stopped) return;
		if (available()) try {
			failures = await read() ? 0 : Math.min(failures + 1, 4);
		} catch {
			failures = Math.min(failures + 1, 4);
		}
		schedule();
	};
	schedule();
	return () => {
		stopped = true;
		clearTimeout(timer);
	};
}
function init_assetRefresh() {
	return (init_assetRefresh = __esmMin((() => {})))();
}
function init_market_widgets() {
	return (init_market_widgets = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-widgets.css?v=source-build-r50019";
			document.head.appendChild(l);
		}
	})))();
}
function init_market_page() {
	return (init_market_page = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-page.css?v=source-build-r50019";
			document.head.appendChild(l);
		}
	})))();
}
export { startAssetRefresh as a, readRefreshMinutes as i, init_market_widgets as n, init_assetRefresh as r, init_market_page as t };
