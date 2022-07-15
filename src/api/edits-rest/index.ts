import { BasicRest } from "../basic-rest";

import type { Axios } from "axios";
import type { Articles, Compare } from "./types";

export class EditsRest extends BasicRest {
	list(props: { n: number; p: number; statuses: number[] }) {
		return this.extractData(
			this.#endpoint.get<Articles>("edits", { params: props }),
		);
	}

	compare(props: { id: number }) {
		return this.extractData(
			this.#endpoint.get<Compare>(`edits/${props.id}/compare`),
		);
	}

	byEntry(props: { wid: string }) {
		return this.extractData(
			this.#endpoint.get<Articles>(`edits/by-entry/0/${props.wid}`),
		);
	}

	constructor(endpoint: Axios) {
		super();

		this.#endpoint = endpoint;
	}

	#endpoint;
}
