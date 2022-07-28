import type { General } from "./general";
import type { KanjiForm } from "./kanji-form";
import type { KanjiIndex } from "./kanji-index";
import { KanjiWord } from "./kanji-word";
import type { Meaning } from "./meaning";
import type { Reading } from "./reading";

export type InternalEntryKanji = {
	general: General;
	forms: KanjiForm[];
	standaloneMeaning: KanjiWord[];
	composedMeanings: Meaning[];
	indices: KanjiIndex[];
	onyomi: Reading[];
	kunyomi: Reading[];
	nanori: Reading[];
};
