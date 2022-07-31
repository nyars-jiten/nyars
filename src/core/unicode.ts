export function charUnicode(char: string) {
	const codePoint = char.codePointAt(0);
	if (typeof codePoint === "number") {
		const hex = codePoint.toString(16);
		return "U+" + "0000".substring(0, 4 - hex.length) + hex;
	}
}
