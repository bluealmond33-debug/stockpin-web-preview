import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
import { d as init_createLucideIcon, u as createLucideIcon } from "./AppIcon-5b8gNeaV.js";
var __iconData, RotateCcw;
function init_rotate_ccw() {
	return (init_rotate_ccw = __esmMin((() => {
		init_createLucideIcon();
		__iconData = {
			name: "rotate-ccw",
			size: 24,
			node: [["path", {
				d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
				key: "1357e3"
			}], ["path", {
				d: "M3 3v5h5",
				key: "1xhq8a"
			}]]
		};
		/**
		* @license lucide-react v1.59.0 - ISC
		*
		* This source code is licensed under the ISC license.
		* See the LICENSE file in the root directory of this source tree.
		*/
		__iconData.node;
		RotateCcw = createLucideIcon(__iconData);
	})))();
}
function readRefreshMinutes(raw) {
	return raw === "off" ? 0 : raw === "1" ? 1 : raw === "3" ? 3 : 5;
}
/** No auth, storage or broker access here. Caller supplies one bounded read. */
function startAssetRefresh(minutes, read, available, onSchedule) {
	let stopped = false;
	let failures = 0;
	let lastAttempt = "not-run";
	let timer;
	const observe = (snapshot) => {
		if (stopped) return;
		try {
			onSchedule?.(Object.freeze(snapshot));
		} catch {}
	};
	const schedule = () => {
		if (stopped) return;
		const delay = Math.min(minutes * 6e4 * 2 ** failures, 18e5);
		timer = setTimeout(() => {
			tick();
		}, delay);
		observe({
			phase: "scheduled",
			nextDelayMs: delay,
			failures,
			lastAttempt
		});
	};
	const tick = async () => {
		if (stopped) return;
		try {
			if (available()) {
				observe({
					phase: "read-pending",
					nextDelayMs: null,
					failures,
					lastAttempt
				});
				const returned = await read();
				failures = returned ? 0 : Math.min(failures + 1, 4);
				lastAttempt = returned ? "read-returned-true" : "read-returned-false";
			} else lastAttempt = "guard-blocked";
		} catch {
			failures = Math.min(failures + 1, 4);
			lastAttempt = "threw";
		} finally {
			schedule();
		}
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
function init_market_page() {
	return (init_market_page = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-page.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
function init_market_widgets() {
	return (init_market_widgets = __esmMin((() => {
		{
			const l = document.createElement("link");
			l.rel = "stylesheet";
			l.href = "/local/app/css-source/src/features/market/market-widgets.css?v=source-build-r50126010";
			document.head.appendChild(l);
		}
	})))();
}
export { startAssetRefresh as a, readRefreshMinutes as i, init_market_page as n, RotateCcw as o, init_assetRefresh as r, init_rotate_ccw as s, init_market_widgets as t };
