import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function isObservationDate(value) {
	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	const date = /* @__PURE__ */ new Date(value + "T00:00:00.000Z");
	return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
/** UTC only; reject overflow calendar days/hours instead of Date.parse normalization. */
function isUTCReceivedAt(value) {
	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,6})?(?:Z|\+00:00)$/.test(value) || !isObservationDate(value.slice(0, 10))) return false;
	const date = /* @__PURE__ */ new Date(value.slice(0, 19) + "Z");
	return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 19) === value.slice(0, 19);
}
function init_publicObservationTime() {
	return (init_publicObservationTime = __esmMin((() => {})))();
}
export { isObservationDate as n, isUTCReceivedAt as r, init_publicObservationTime as t };
