import type { Axios } from "axios";
import { BasicRest } from "../basic-rest";
import type { Dicts } from "./types";

export class KotobaRest extends BasicRest {
	dicts() {
		return this.extractData(
			this.#endpoint.get<Dicts>("kotoba/get-dictionaries"),
		);
	}

	constructor(endpoint: Axios) {
		super();

		this.#endpoint = endpoint;
	}

	#endpoint;
}
