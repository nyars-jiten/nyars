<template>
	<section
		class="relative flex items-center items-stretch bg-white shadow-md duration-150 ease-in-out md:rounded-md"
	>
		<button
			class="p-4 opacity-100 duration-75 ease-in-out hover:opacity-50"
			@click="() => searchImmediately()"
		>
			<SearchIcon />
		</button>

		<div class="relative grow">
			<input
				v-model="store.request"
				type="text"
				class="peer leading-15 h-full w-full pb-px text-center text-2xl outline-none transition-colors duration-150 ease-in-out focus-within:border-b focus-within:bg-neutral-50 focus-within:pb-0"
				:placeholder="locale.t(MessagesNames.SearchInput)"
				@keydown.enter="() => searchImmediately()"
			/>
			<div
				v-if="sugg.length > 0"
				class="w-150 invisible absolute inset-x-0 top-[calc(100%)] z-10 rounded-b-md bg-neutral-50 shadow-xl hover:visible peer-focus:visible"
			>
				<button
					v-for="sug of sugg"
					:key="sug"
					type="button"
					class="block min-w-full border-b border-gray-100 py-2 px-4 text-left last:rounded-b-md last:border-none hover:bg-white"
					@click="selectSugg(sug)"
				>
					{{ sug }}
				</button>
			</div>
		</div>

		<button
			class="p-4 opacity-100 duration-75 ease-in-out hover:opacity-50"
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
				class="absolute right-0 top-[calc(100%+1rem)] border-gray-100 shadow-2xl"
			/>
		</Transition>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import { debounce, isEmpty } from "lodash";
	import { onBeforeMount, ref, watch } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute } from "vue-router";

	import { MessagesNames } from "@/locale/messages-names";
	import { useSearch } from "@/stores/search";

	import DrawIcon from "vue-material-design-icons/Draw.vue";
	import SearchIcon from "vue-material-design-icons/Magnify.vue";
	import TheHandwriting from "./the-handwriting.vue";

	const showDrawPanel = ref(false);
	const store = useSearch();
	const locale = useI18n();

	const searchSugg = debounce(updateSugg, 100);
	const sugg = ref<string[]>([]);

	watch(
		() => store.request,
		async () => {
			if (isEmpty(store.request)) {
				sugg.value = [];
				return;
			}

			await searchSugg();
		},
	);

	async function searchImmediately(request?: string) {
		searchSugg.cancel();
		await store.search({ request, userRequest: true });
	}

	async function updateSugg(request?: string) {
		const r = request ?? store.request;
		if (isEmpty(r)) return;

		sugg.value = await api.search.sugg({ request: r });
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
