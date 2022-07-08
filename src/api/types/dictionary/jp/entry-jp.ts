export type EntryJp = {
	wid: string;
	entry: InternalEntryJp;
	externalEntry: string;
	isReviewed: boolean;
	isUnconfirmed: boolean;
	// accent:,
	picturesId: number;
	// conjugations:[]
	// references:[]
};

type InternalEntryJp = {
	words: Word[];
	meanings: Meaning[];
	externalEntry: string;
};

type Word = {
	writings: Writing[];
	readings: Reading[];
};

type Writing = {
	value: string;
	// tag:,
};

type Reading = {
	value: string;
	// tag:,
	pitch: string;
	// pitchedReading:,
};

type Meaning = {
	pos: string[];
	langMeanings: LangMeaning[];
};

type LangMeaning = {
	lang: "rus" | "jpn" | "eng" | "lat";
	note: string;
	senses: Sense[];
};

type Sense = {
	// tags:,
	value: string;
	// examples: ,
	isRare: boolean;
	// references: ,
	// loanSources: ,
};
