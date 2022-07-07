<template>
	<section>
		<input
			v-model="store.request"
			type="text"
			class="w-full border border-gray-100 text-lg text-center p-4 shadow-sm"
			placeholder="Search request"
		/>
	</section>
</template>

<script setup lang="ts">
import { RouteName } from "@/rotuer/route-name";
import { useSearch } from "@/stores/search";
import { debounce } from "lodash";
import { onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useSearch();
const router = useRouter();

const search = debounce(store.search, 300);

async function onRequest(request: string) {
	if (request == "") await router.push({ name: RouteName.SearchHome });
	else {
		await router.push({ name: RouteName.SearchResults, query: { request: request } });
		await search();
	}
}

watch(() => store.request, onRequest);

onBeforeMount(() => {
	const { query } = useRoute();
	const { request } = query;

	if (typeof request == "string") store.request = request;
});
</script>

<style scoped></style>
