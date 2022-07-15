<template>
	<section
		class="focus-within:shadow-2xl relative duration-150 ease-in-out border border-gray-100 shadow-sm bg-white flex items-center p-4 gap-4"
	>
		<SearchIcon />

		<div class="relative grow focus-within:visible">
			<input
				v-model="store.request"
				type="text"
				class="peer text-center outline-none w-full text-2xl"
				:placeholder="locale.t(MessagesNames.SearchInput)"
				@keydown.enter="() => searchImmediately()"
				@input="onInputRequest"
			/>

			<div
				v-if="sugg.length > 0"
				class="invisible peer-focus:visible hover:visible z-10 left-0 right-0 absolute top-[calc(100%+2rem)] shadow-2xl bg-white px-4 py-2 rounded"
			>
				<button
					v-for="sug of sugg"
					:key="sug"
					type="button"
					class="text-left block min-w-full border-b border-gray-100 pb-2 pt-2 last:border-none last:pb-0 first:pt-0 hover:translate-x-1"
					@click="selectSugg(sug)"
				>
					{{ sug }}
				</button>
			</div>
		</div>

		<button
			class="opacity-100 hover:opacity-50 duration-75 ease-in-out"
			@click="showDrawPanel = !showDrawPanel"
		>
			<DrawIcon />
		</button>

		<Transition
			enter-active-class="duration-150 ease-out"
			enter-from-class="transform opacity-0 translate-y-2"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="duration-150 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="transform opacity-0 translate-y-2"
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
	import { api } from "@/api";
	import { debounce } from "lodash";
	import { onBeforeMount, ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute, useRouter } from "vue-router";

	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useSearch } from "@/stores/search";

	import DrawIcon from "vue-material-design-icons/Draw.vue";
	import SearchIcon from "vue-material-design-icons/Magnify.vue";
	import TheHandwriting from "./the-handwriting.vue";

	const showDrawPanel = ref(false);
	const store = useSearch();
	const router = useRouter();
	const locale = useI18n();

	const search = debounce(store.search, 300);
	const searchSugg = debounce(updateSugg, 300);
	const sugg = ref<string[]>([]);

	async function searchImmediately(request?: string) {
		search.cancel();
		await store.search({ request, userRequest: true });
	}

	async function onInputRequest(e: Event) {
		const { target } = e;
		if (!(target instanceof HTMLInputElement)) return;

		await onRequest(target.value);
	}

	async function updateSugg(request: string) {
		sugg.value = await api.search.sugg({ request });
	}

	async function onRequest(request: string) {
		if (request == "") await router.push({ name: RoutesNames.SearchHome });
		else {
			await searchSugg(request);
			await search({ userRequest: true });
		}
	}

	async function selectSugg(value: string) {
		await searchImmediately(value);
	}

	onBeforeMount(async () => {
		const { query } = useRoute();
		const { request } = query;

		if (typeof request == "string") {
			await updateSugg(request);
			await store.search({ request, userRequest: true });
		}
	});

	// https://youtu.be/ERa9y6daDFY
	// https://youtu.be/laEn1BsYJlc
</script>
