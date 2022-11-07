export type Actions = {
	searchJp(props: { request?: string; userRequest: boolean }): Promise<void>;
	searchKanji(props: { request?: string; userRequest: boolean }): Promise<void>;
	clearResults(props: { withGrammar: boolean }): void;
	searchSuggs({ request }: { request?: string }): Promise<void>;
};
