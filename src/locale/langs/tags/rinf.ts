type Row = "rk" | "gikun" | "oik" | "uK" | "rm" | "ok";
type Value = { short: string; full: string };

export default {
	rk: { short: "rk", full: "" },
	gikun: { short: "gikun", full: "" },
	oik: { short: "oik", full: "" },
	uK: { short: "uK", full: "" },
	rm: { short: "rm", full: "" },
	ok: { short: "ok", full: "" },
} as { [key in Row]: Value };
