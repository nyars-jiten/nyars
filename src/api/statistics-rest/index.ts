import type { Axios } from "axios";
import type { BestUsers, TotalStats } from "./types";

export class StatisticsRest {
	public total(): Promise<TotalStats> {
		return Promise.resolve({
			added: 2118481,
			verified: 28517,
		});
	}

	public bestUsers(): Promise<BestUsers> {
		return Promise.resolve({
			total: 0,
			results: [
				{
					name: "☦謙遜老翁☦",
					avatar:
						"https://nyars.org/upload/avatars/2e343574-e6ac-4c4a-8df2-c7929ee516de.png",
					statistics: {
						rating: 285,
						contents_edit: 7,
						contents_new: 112,
					},
				},
				{
					name: "Крылатый",
					avatar:
						"https://nyars.org/upload/avatars/5e7e21cb-5f10-4591-931f-c11ae23f4a55.jpg",
					statistics: {
						rating: 84,
						contents_edit: 0,
						contents_new: 42,
					},
				},
				{
					name: "Ёко",
					avatar:
						"https://nyars.org/upload/avatars/a0f6b925-d283-4394-bc6d-a6d02398e174.png",
					statistics: {
						rating: 20,
						contents_edit: 0,
						contents_new: 3,
					},
				},
				{
					name: "kawaiipotato",
					avatar:
						"https://nyars.org/upload/avatars/5b1be5cc-1805-4184-a795-fdf3b8c81592.jpg",
					statistics: {
						rating: 18,
						contents_edit: 0,
						contents_new: 9,
					},
				},
				{
					name: "петя",
					avatar:
						"https://nyars.org/upload/avatars/2a3bd837-5489-448b-adb7-92142d8dc7f8.jpg",
					statistics: {
						rating: 12,
						contents_edit: 0,
						contents_new: 4,
					},
				},
			],
		});
	}

	public constructor(endpoint: Axios) {
		this.#endpoint = endpoint;
	}

	#endpoint;
}
