import { AxiosResponse } from "axios";

export abstract class BasicRest {
	protected async extractData<T>(response: Promise<AxiosResponse<T>>) {
		const { data } = await response;
		return data;
	}
}
