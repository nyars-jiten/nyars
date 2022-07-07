<template>
	<section
		class="focus-within:scale-105 focus-within:shadow-2xl duration-150 ease-in-out border border-gray-100 text-lg shadow-sm bg-white flex items-center p-4"
	>
		<span class="select-none">🔎</span>
		<input
			v-model="store.request"
			type="text"
			class="text-center outline-none w-full"
			:placeholder="$t(MessagesNames.SearchInput)"
			@keydown.enter="searchImmediately"
		/>
	</section>
</template>

<script setup lang="ts">
	import { debounce } from "lodash";
	import { onBeforeMount, watch } from "vue";
	import { useRoute, useRouter } from "vue-router";

	import { RouteName } from "@/rotuer/route-name";
	import { useSearch } from "@/stores/search";
	import { MessagesNames } from "@/locale/messages-names";

	const store = useSearch();
	const router = useRouter();

	const search = debounce(store.search, 300);

	async function onRequest(request: string) {
		if (request == "") await router.push({ name: RouteName.SearchHome });
		else {
			await router.push({
				name: RouteName.SearchResults,
				query: { request: request },
			});

			await search();
		}
	}

	async function searchImmediately() {
		search.cancel();
		await search();
	}

	watch(() => store.request, onRequest);

	onBeforeMount(() => {
		const { query } = useRoute();
		const { request } = query;

		if (typeof request == "string") store.request = request;
	});

	// https://youtu.be/ERa9y6daDFY
</script>

<style scoped></style>
