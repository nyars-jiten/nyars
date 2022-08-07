<template>
	<section
		class="relative select-none rounded-md bg-white shadow-md dark:bg-gray-800"
	>
		<div
			class="relative flex items-stretch border dark:border-gray-700"
			:class="searchExpanded ? 'rounded-t-md' : 'rounded-md'"
		>
			<button
				class="flex items-center p-4 capitalize opacity-100 duration-75 ease-in-out hover:bg-gray-100 hover:opacity-75 dark:text-gray-400 dark:hover:bg-gray-700"
				@click="searchExpanded = !searchExpanded"
			>
				<span class="hidden md:block">{{
					locale.t(`${MessagesNames.SearchTypeName}.${searchType}.short`)
				}}</span>
				<ChevronUp v-show="searchExpanded" class="text-gray-400" />
				<ChevronDown v-show="!searchExpanded" class="text-gray-400" />
			</button>

			<div class="relative z-20 grow">
				<input
					v-model="store.request"
					type="text"
					class="peer h-full w-full pb-px text-center text-xl outline-none transition-colors duration-150 ease-in-out focus-within:border-b focus-within:bg-gray-100 focus-within:pb-0 dark:border-gray-600 dark:bg-gray-800 dark:focus-within:bg-gray-700"
					:placeholder="
						searchType == SearchType.Jap
							? locale.t(MessagesNames.SearchJapInput)
							: locale.t(MessagesNames.SearchKanjiInput)
					"
					@keydown.enter="() => searchImmediately()"
				/>
				<div
					v-if="sugg.length > 0"
					class="invisible absolute inset-x-0 top-[calc(100%)] z-10 overflow-hidden rounded-b-md bg-gray-100 shadow-xl hover:visible peer-focus:visible dark:bg-gray-700"
				>
					<button
						v-for="sug of sugg"
						:key="sug"
						type="button"
						class="block min-w-full border-b border-gray-100 py-2 px-4 text-left last:border-none dark:border-gray-600"
						@click="selectSugg(sug)"
					>
						{{ sug }}
					</button>
				</div>
			</div>

			<button
				class="p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-gray-100 hover:opacity-75 dark:hover:bg-gray-700"
				@click="() => searchImmediately()"
			>
				<SearchIcon />
			</button>

			<button
				class="p-4 text-xl opacity-100 duration-75 ease-in-out hover:bg-gray-100 hover:opacity-75 dark:hover:bg-gray-700"
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
				v-show="searchExpanded"
				class="flex w-full flex-col gap-2 rounded-b-md border-x border-b p-4 text-sm leading-relaxed dark:border-gray-700"
			>
				<span class="text-gray-500">Искать:</span>
				<RadioGroup v-model="searchType" class="flex flex-row gap-2">
					<RadioGroupOption v-slot="{ checked }" :value="SearchType.Jap">
						<span
							:class="
								checked
									? 'bg-accent-400 text-white dark:bg-accent-700'
									: 'bg-gray-100 dark:bg-gray-700'
							"
							class="flex select-none items-center gap-2 rounded-md py-1 px-3 capitalize hover:opacity-75"
						>
							{{
								locale.t(
									`${MessagesNames.SearchTypeName}.${SearchType.Jap}.short`,
								)
							}}
						</span>
					</RadioGroupOption>

					<RadioGroupOption v-slot="{ checked }" :value="SearchType.Kanji">
						<span
							:class="
								checked
									? 'bg-accent-400 text-white dark:bg-accent-700'
									: 'bg-gray-100 dark:bg-gray-700'
							"
							class="flex select-none items-center gap-2 rounded-md bg-gray-100 py-1 px-3 capitalize hover:opacity-75"
						>
							{{
								locale.t(
									`${MessagesNames.SearchTypeName}.${SearchType.Kanji}.short`,
								)
							}}
						</span>
					</RadioGroupOption>
				</RadioGroup>
			</div>
		</Transition>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import { debounce, isEmpty } from "lodash";
	import { onBeforeMount, ref, watch } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute } from "vue-router";

	import { SearchType } from "@/api/types/search/search-type";
	import { MessagesNames } from "@/locale/messages-names";
	import { useSearch } from "@/stores/search";

	import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
	import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
	import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
	import DrawIcon from "vue-material-design-icons/Draw.vue";
	import SearchIcon from "vue-material-design-icons/Magnify.vue";
	import TheHandwriting from "./the-handwriting.vue";

	const showDrawPanel = ref(false);
	const searchExpanded = ref(false);
	const store = useSearch();
	const locale = useI18n();

	const searchSugg = debounce(updateSugg, 100);
	const sugg = ref<string[]>([]);
	const searchType = ref(SearchType.Jap);

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
		if (searchType.value == SearchType.Jap) {
			await updateSugg(request);
			await store.searchJap({
				request,
				userRequest: true,
			});
		} else if (searchType.value == SearchType.Kanji) {
			await store.searchKanji({
				request,
				userRequest: true,
			});
		}
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
		const { type } = query;

		searchType.value = (type as SearchType) ?? SearchType.Jap;

		if (typeof request == "string") {
			if (type == SearchType.Kanji) {
				await store.searchKanji({
					request,
					userRequest: true,
				});
			} else {
				await updateSugg(request);
				await store.searchJap({
					request,
					userRequest: true,
				});
			}
		}
	});

	// https://youtu.be/ERa9y6daDFY
	// https://youtu.be/laEn1BsYJlc
</script>
