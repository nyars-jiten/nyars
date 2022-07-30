import type { KanjiImage } from "./kanji-image";

export type General = {
	literal: string;
	ids: string;
	images: KanjiImage[];
	radical: string;
	shortMeans: string;
	strokeCount: number;
	jis: number;
	note: string;
	freq: number;
	tags: string[];
};
