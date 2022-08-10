import { SearchResultKanji } from "@/api/search-rest/types/search-result-kanji";
import type { SearchResultWord } from "@/api/search-rest/types/search-result-word";
import { SearchType } from "@/api/types/search/search-type";

export type State = {
	request: string;
	resultsJp: SearchResultWord;
	resultsKanji: SearchResultKanji;
	type?: SearchType;
};
