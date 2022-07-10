import { BasicRest } from "../basic-rest";

import type { Axios } from "axios";
import type { Dicts } from "./types";

type Image = {
	link: string;
	title: string;
};

type Images = Image[];

export class KotobaRest extends BasicRest {
	dicts() {
		return this.extractData(
			this.#endpoint.get<Dicts>("kotoba/get-dictionaries"),
		);
	}

	entryImages(props: { wid: string }) {
		return this.extractData(
			this.#endpoint.get<Images>("kotoba/entry-images", {
				params: { id: props.wid, dict: 0 },
			}),
		);
	}

	constructor(endpoint: Axios) {
		super();

		this.#endpoint = endpoint;
	}

	#endpoint;
}
