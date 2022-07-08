import { api, TransList, TransVariant } from "@/api";
import { defineStore, _GettersTree } from "pinia";

type State = {
	table: TransList;
};

type Getters = _GettersTree<State>;
type Actions = {
	getByLiteral(value: string): string;
	load(): Promise<void>;
};

export const useReadingsStorage = defineStore<string, State, Getters, Actions>(
	"readings",
	{
		state: () => {
			return {
				table: {},
			};
		},

		actions: {
			getByLiteral(value: string) {
				return transcriptionConvert(value, "hiragana", this.table);
			},

			async load() {
				this.table = (await api.kotoba.dicts()).transcriptionLists;
			},
		},
	},
);

const excludedStrs = ["-", " ", "'", "(", ")", "^"];
const excludedStrsLatK = ["'", "(", ")", "^"];

export function transcriptionConvert(
	raw: string,
	type: TransVariant,
	table: TransList,
) {
	if (type === "hiragana") return scriptConvert(raw, table);
	if (type === "katakana") return scriptConvert("!" + raw, table);

	const notChanged = raw;
	raw = raw.toLowerCase().trim();
	let result = "";

	for (let i = 0; i <= raw.length; i++) {
		let chunk = "";
		let j = 4;
		for (; j > 0; j--) {
			if (i + j > raw.length) continue;

			chunk = raw.substr(i, j);

			if (Object.prototype.hasOwnProperty.call(table, chunk)) {
				break;
			}
		}

		// result += transaltionList[chunkIndex];
		// i += chunk.length - 1;

		if (j != 0 && Object.prototype.hasOwnProperty.call(table, chunk)) {
			if (
				i + 1 < raw.length &&
				chunk == "n" &&
				"bpm".includes(raw[i + 1]) &&
				type === "kiriji"
			) {
				result += "м";
			} else {
				result += table[chunk][type];
			}
			i += chunk.length - 1;
		} else {
			if (chunk.length < 1) continue;

			if (chunk == ":" && i > 0) {
				// знак удлинения
				result += chunk;
			} else if (chunk == "!") {
				// смена хирагана - катакана
				if (result.length > 0 && result[i - 1] != " ") {
					result += " ";
				}
			} else if (i + 1 < raw.length && chunk == "\\") {
				i++;
				result += notChanged[i];
			} else if (
				i + 1 < raw.length &&
				((chunk[0] == raw[i + 1] &&
					"qwrtpsdfghkljzxcvbnm".includes(chunk[0])) ||
					(chunk[0] == "t" && raw[i + 1] == "c"))
			) {
				for (let jTemp = 4; jTemp > 0; jTemp--) {
					if (i + 1 + jTemp > raw.length) continue;

					const nextChunk = raw.substr(i + 1, jTemp);

					if (Object.prototype.hasOwnProperty.call(table, nextChunk)) {
						const nextTranslChunk = table[nextChunk][type];
						if (nextTranslChunk[0] == "ц") result += "т";
						else result += nextTranslChunk[0];
						break;
					}
				}
			} else if (excludedStrsLatK.indexOf(chunk) != -1) {
				//
			} else {
				result += chunk;
			}
		}
	}

	return result;
}

function scriptConvert(raw: string, table: TransList) {
	const notChanged = raw;
	raw = raw.toLowerCase();
	let type: TransVariant = "hiragana";
	let result = "";
	// let transaltionList = [];

	// latList = table.literal;
	// hirList = table.hiragana;
	// katList = table.katakana;

	// switch (type) {
	//   case 0:
	//     transaltionList = hirList;
	//     break;

	//   case 1:
	//     transaltionList = katList;
	//     break;

	//   default:
	//     transaltionList = hirList;
	//     break;
	// }

	for (let i = 0; i <= raw.length; i++) {
		let chunk = "";
		let j = 4;
		for (; j > 0; j--) {
			if (i + j > raw.length) continue;

			chunk = raw.substr(i, j);
			// let chunkIndex = latList.indexOf(chunk);

			if (Object.prototype.hasOwnProperty.call(table, chunk)) {
				result += table[chunk][type];
				i += chunk.length - 1;
				break;
			}
		}

		if (j == 0) {
			if (!chunk) continue;

			let skipI = 1;
			if (chunk == ":" && i >= skipI) {
				if (excludedStrs.indexOf(raw[i - 1]) != -1) skipI++;

				if (type == "hiragana") {
					switch (raw[i - skipI]) {
						case "o":
							result += "う";
							break;

						case "u":
							result += "う";
							break;

						case "a":
							result += "あ";
							break;

						case "i":
							result += "い";
							break;

						case "e":
							result += "え";
							break;

						default:
							result += ":";
							break;
					}
				} else {
					result += "ー";
				}
			} else if (chunk == "!") {
				type = type === "hiragana" ? "katakana" : "hiragana";
			} else if (
				i + 2 < raw.length &&
				chunk[0] == raw[i + 2] &&
				raw[i + 1] == "!"
			) {
				result += table["*tu"][type];
			} else if (i + 1 < raw.length && chunk == "\\") {
				i++;
				result += notChanged[i];
			} else if (
				i + 1 < raw.length &&
				((chunk[0] == raw[i + 1] &&
					"qwrtpsdfghkljzxcvbnm".includes(chunk[0])) ||
					(chunk[0] == "t" && raw[i + 1] == "c"))
			) {
				result += table["*tu"][type];
			} else if (excludedStrs.indexOf(chunk) != -1) {
				//
			} else {
				result += chunk;
			}
		}
	}

	return result;
}
