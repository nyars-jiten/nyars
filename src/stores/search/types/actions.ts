export type Actions = {
	search(props: { request?: string; userRequest: boolean }): Promise<void>;
	clearResults(props: { withGrammar: boolean }): void;
};
