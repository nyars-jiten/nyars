import type { Axios } from "axios";

export class UsersRest {
	public constructor(endpoint: Axios) {
		this.#endpoint = endpoint;
	}

	#endpoint;
}
