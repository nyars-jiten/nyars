<script setup lang="ts">
	import { onBeforeMount, watch } from "vue";
	import { debounce, isEmpty } from "lodash";
	import { useSearch } from "@/stores/search";
	import { useRoute } from "vue-router";

	type Emits = { (event: "onSelected"): void };

	defineEmits<Emits>();

	const store = useSearch();

	const search = debounce(store.searchSuggs.bind(store), 100);

	watch(
		() => store.request,
		async () => {
			search.cancel();

			if (isEmpty(store.request)) {
				store.suggs = [];
				return;
			}

			await search({});
		},
	);

	onBeforeMount(async () => {
		const { query } = useRoute();
		const { request } = query;

		if (typeof request != "string") return;

		await store.searchSuggs({ request });
	});
</script>

<template>
	<div
		class="invisible peer-focus:visible absolute inset-x-0 top-[calc(100%)] z-10 overflow-hidden rounded-b-md bg-gray-100 shadow-xl hover:visible dark:bg-gray-700"
	>
		<button
			v-for="sugg of store.suggs"
			type="button"
			class="block min-w-full hover:bg-white dark:hover:bg-gray-600 border-t border-gray-300 dark:border-gray-600 dark:bg-gray-700 py-2 px-4 text-left"
			@click="
				() => {
					store.request = sugg;
					$emit('onSelected');
				}
			"
		>
			{{ sugg }}
		</button>
	</div>
</template>
