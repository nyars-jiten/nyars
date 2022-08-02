export type Actions = {
	searchJap(props: { request?: string; userRequest: boolean }): Promise<void>;
	searchKanji(props: { request?: string; userRequest: boolean }): Promise<void>;
	clearResults(props: { withGrammar: boolean }): void;
};
