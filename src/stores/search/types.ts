import type { DeepReadonly } from "vue";
import type { SearchType } from "@/api/types/search/search-type";

export type ReadOnlyRequest = DeepReadonly<{
	request: string;
	mode?: SearchType;
}>;
