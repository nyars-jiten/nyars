<script setup lang="ts">
	import { isEmpty } from "lodash";
	import { useI18n } from "vue-i18n";
	import { useRoute } from "vue-router";
	import { onBeforeMount, reactive } from "vue";
	import { RadioGroup, RadioGroupOption } from "@headlessui/vue";

	import { useSearch } from "@/stores/search";
	import { MessagesNames } from "@/locale/messages-names";
	import { SearchType } from "@/api/types/search/search-type";

	import DrawIcon from "vue-material-design-icons/Draw.vue";
	import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
	import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
	import SearchIcon from "vue-material-design-icons/Magnify.vue";

	import Button from "./Button.vue";
	import TheSuggs from "./TheSuggs.vue";
	import TheHandwriting from "./TheHandwriting.vue";

	const state = reactive({
		draw: false,
		mode: SearchType.Jp,
		selector: false,
	});

	const store = useSearch();
	const route = useRoute();

	const { t, tm } = useI18n();

	async function search() {
		if (state.mode == SearchType.Kanji) {
			await store.searchKanji({});
		} else {
			await store.searchJp({ userRequest: true });
		}
	}

	async function searchImmediately() {
		if (isEmpty(store.request) || store.request == route.query.request) return;

		await search();
	}

	onBeforeMount(async () => {
		const { query } = useRoute();
		const { request, type } = query;

		if (typeof request != "string") return;

		if (Object.values(SearchType).includes(<SearchType>type)) {
			state.mode = <SearchType>type;
		}

		store.request = request;
		await search();
	});

	// https://youtu.be/ERa9y6daDFY
	// https://youtu.be/laEn1BsYJlc
</script>

<template>
	<section
		class="relative  rounded-md bg-white shadow-md dark:bg-gray-800"
	>
		<div
			class="relative flex items-stretch border dark:border-gray-700"
			:class="state.selector ? 'rounded-t-md' : 'rounded-md'"
		>
			<button
				class="flex items-center p-4 capitalize opacity-100 duration-75 ease-in-out hover:bg-gray-100 hover:opacity-75 dark:text-gray-400 dark:hover:bg-gray-700"
				@click="state.selector = !state.selector"
			>
				<span class="hidden md:block">
					{{ t(`${MessagesNames.SearchWhat}.${state.mode}.short`) }}
				</span>

				<ChevronUp v-show="state.selector" class="text-gray-400" />
				<ChevronDown v-show="!state.selector" class="text-gray-400" />
			</button>

			<div class="group relative z-20 grow">
				<input
					v-model="store.request"
					type="text"
					class="peer h-full w-full text-center text-xl outline-none focus-within:bg-gray-100 dark:bg-gray-800 dark:focus-within:bg-gray-700 dark:group-focus-within:bg-gray-700 group-focus-within:bg-gray-100"
					:placeholder="t(`${MessagesNames.SearchInput}.${SearchType.Jp}`)"
					@keydown.enter="searchImmediately"
				/>

				<TheSuggs @onSelected="() => searchImmediately()" />
			</div>

			<button
				class="p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-gray-100 hover:opacity-75 dark:hover:bg-gray-700"
				@click="searchImmediately"
			>
				<SearchIcon />
			</button>

			<button
				class="p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-gray-100 hover:opacity-75 dark:hover:bg-gray-700"
				@click="state.draw = !state.draw"
			>
				<DrawIcon />
			</button>

			<Transition
				enter-active-class="duration-150 ease-out"
				enter-from-class="transform opacity-0 translate-y-2"
				enter-to-class="opacity-100"
				leave-active-class="duration-150 ease-in"
				leave-from-class="opacity-100"
				leave-to-class="transform opacity-0 translate-y-2"
				mode="out-in"
			>
				<TheHandwriting
					v-if="state.draw"
					class="absolute right-0 top-[calc(100%+1rem)] z-20 border-gray-100 shadow-2xl"
				/>
			</Transition>
		</div>

		<Transition
			enter-active-class="duration-200 ease-out"
			enter-from-class="max-h-0"
			enter-to-class="max-h-56"
			leave-active-class="duration-200 ease-in"
			leave-from-class="max-h-56"
			leave-to-class=" max-h-0"
			mode="in-out"
		>
			<div
				v-show="state.selector"
				class="flex w-full flex-col gap-2 rounded-b-md border-x border-b p-4 text-sm leading-relaxed dark:border-gray-700"
			>
				<span class="text-gray-500">{{ t(MessagesNames.SearchIn) }}:</span>

				<RadioGroup v-model="state.mode" class="flex flex-row gap-2">
					<div v-for="(value, key) in tm(String(MessagesNames.SearchWhat))">
						<RadioGroupOption v-slot="{ checked }" :value="key">
							<Button :disabled="checked">
								{{ value.short }}
							</Button>
						</RadioGroupOption>
					</div>
				</RadioGroup>
			</div>
		</Transition>
	</section>
</template>
