import type { KanjiImage } from "./kanji-image";

export type General = {
	literal: string;
	ref: string;
	ids: string;
	images: KanjiImage[];
	radical: string;
	shortMeans: string;
	strokeCount: number;
	jis: string;
	note: string;
	tags: string[];
};
