import type { KanjiIndexType } from "./kanji-index-type";

export type KanjiIndex = {
	type: KanjiIndexType;
	source: string;
	value: string;
};
