import { BasicRest } from "../basic-rest";

import type { Axios } from "axios";
import type { Articles } from "./types";

export class EditsRest extends BasicRest {
	list(props: { n: number; p: number; statuses: any[] }) {
		return this.extractData(
			this.#endpoint.get<Articles>("edits", { params: props }),
		);
	}

	constructor(endpoint: Axios) {
		super();

		this.#endpoint = endpoint;
	}

	#endpoint;
}
