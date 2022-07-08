<template>
	<section
		class="group focus-within:shadow-2xl relative duration-150 ease-in-out border border-gray-100 text-lg shadow-sm bg-white flex items-center p-4 gap-4"
	>
		<span>🔎</span>

		<input
			v-model="store.request"
			type="text"
			class="text-center outline-none w-full"
			:placeholder="locale.t(MessagesNames.SearchInput)"
			@keydown.enter="searchImmediately"
		/>

		<button
			class="opacity-100 hover:opacity-50 duration-75 ease-in-out"
			@click="showDrawPanel = !showDrawPanel"
		>
			✍️
		</button>

		<Transition
			enter-active-class="duration-150 ease-out"
			enter-from-class="transform opacity-0 -translate-y-2"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="duration-150 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="transform opacity-0 -translate-y-2"
			mode="out-in"
		>
			<TheHandwriting
				v-if="showDrawPanel"
				class="shadow-2xl absolute right-0 top-[calc(100%+1rem)] border-gray-100"
			/>
		</Transition>
	</section>
</template>

<script setup lang="ts">
	import { debounce } from "lodash";
	import { onBeforeMount, ref, watch } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute, useRouter } from "vue-router";

	import { MessagesNames } from "@/locale/messages-names";
	import { RouteName } from "@/rotuer/route-name";
	import { useSearch } from "@/stores/search";

	import TheHandwriting from "./the-handwriting.vue";

	const showDrawPanel = ref(false);
	const store = useSearch();
	const router = useRouter();
	const locale = useI18n();

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
	// https://youtu.be/laEn1BsYJlc
</script>
