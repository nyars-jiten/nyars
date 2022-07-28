import { KanjiImageStyle } from "./kanji-image-style";
import { KanjiImageType } from "./kanji-image-type";

export type KanjiImage = {
	type: KanjiImageType;
	style: KanjiImageStyle;
	data: string;
};
