import type { Axios } from "axios";

export class KanjiRest {
	public constructor(endpoint: Axios) {
		this.#endpoint = endpoint;
	}

	#endpoint;
}
