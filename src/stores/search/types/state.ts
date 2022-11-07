import { type SearchResultKanji } from "@/api/search-rest/types/search-result-kanji";
import { type SearchResultWord } from "@/api/search-rest/types/search-result-word";
import { type SearchType } from "@/api/types/search/search-type";

export type State = {
	suggs: string[];
	request: string;
	resultsJp: SearchResultWord;
	resultsKanji: SearchResultKanji;
	type?: SearchType;
};
