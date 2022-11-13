import type { KanjiWord } from "./kanji-word";

export type Meaning = {
	title: string;
	readings: string[];
	words: KanjiWord[];
	source: string;
};
