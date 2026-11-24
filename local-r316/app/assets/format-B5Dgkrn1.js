import { n as __esmMin } from "./rolldown-runtime-CnFjIZqj.js";
function formatDecimal(value) {
	const negative = value.startsWith("-");
	const [whole, fraction] = (negative ? value.slice(1) : value).split(".");
	const grouped = new Intl.NumberFormat("ko-KR").format(BigInt(whole));
	return `${negative && !/^-?0(?:\.0+)?$/.test(value) ? "-" : ""}${grouped}${fraction ? `.${fraction}` : ""}`;
}
function formatMoney(money, signed = false, maxFractionDigits) {
	if (!money) return "—";
	if (maxFractionDigits !== void 0) {
		const sign = money.amount.startsWith("-") ? "-" : "";
		const [whole, fraction = ""] = money.amount.replace(/^-/, "").split(".");
		const digits = Math.max(0, Math.min(12, maxFractionDigits));
		const scale = 10n ** BigInt(digits);
		const n = BigInt(whole) * scale + BigInt(fraction.slice(0, digits).padEnd(digits, "0") || "0") + (Number(fraction[digits] ?? "0") >= 5 ? 1n : 0n);
		if (n === 0n && !/^-?0(?:\.0+)?$/.test(money.amount)) return formatMoney(money, signed);
		const tail = digits ? (n % scale).toString().padStart(digits, "0").replace(/0+$/, "") : "";
		money = {
			...money,
			amount: sign + (n / scale).toString() + (tail ? "." + tail : "")
		};
	}
	const zero = /^-?0(?:\.0+)?$/.test(money.amount);
	return `${money.amount.startsWith("-") && !zero ? "-" : signed && !zero ? "+" : ""}${money.currency === "USD" ? "$" : ""}${formatDecimal(money.amount.replace(/^-/, ""))}${money.currency === "KRW" ? "원" : ""}`;
}
function localTime(value) {
	return new Intl.DateTimeFormat("ko-KR", {
		timeZone: "Asia/Seoul",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(new Date(value));
}
function init_format() {
	return (init_format = __esmMin((() => {})))();
}
export { localTime as i, formatMoney as n, init_format as r, formatDecimal as t };
