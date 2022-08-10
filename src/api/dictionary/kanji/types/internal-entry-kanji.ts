import type { General } from "./general";
import type { KanjiForm } from "./kanji-form";
import type { KanjiIndex } from "./kanji-index";
import { KanjiWord } from "./kanji-word";
import type { Meaning } from "./meaning";
import type { Readings } from "./readings";

export type InternalEntryKanji = {
	general: General;
	readings: Readings;
	forms: KanjiForm[];
	standaloneMeanings: KanjiWord[];
	composedMeanings: Meaning[];
	kanbunMeanings: Meaning[];
	indices: KanjiIndex[];
};
