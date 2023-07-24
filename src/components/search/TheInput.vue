<script setup lang="ts">
	import { useI18n } from "vue-i18n";
	import { storeToRefs } from "pinia";
	import { onMounted, reactive, ref } from "vue";
	import { RadioGroup, RadioGroupOption } from "@headlessui/vue";

	import { useSearch } from "@/stores/search";

	import { MessagesNames } from "@/locale/messages-names";
	import { SearchType } from "@/api/types/search/search-type";

	import DrawIcon from "vue-material-design-icons/Draw.vue";
	import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
	import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
	import SearchIcon from "vue-material-design-icons/Magnify.vue";

	import Button from "@/components/generic-button.vue";
	import TheSuggs from "./TheSuggs.vue";
	import TheHandwriting from "./TheHandwriting.vue";

	const state = reactive({
		draw: false,
		selector: false,
	});

	const { t, tm } = useI18n();
	const { request, mode } = storeToRefs(useSearch());
	const { searchResults } = useSearch();

	const searchInputElement = ref<HTMLInputElement>();

	async function searchImmediately() {
		if (await searchResults()) close();
	}

	function close() {
		searchInputElement.value?.blur();
	}

	onMounted(() => {
		searchInputElement.value?.focus();
	});
</script>

<template>
	<section class="relative rounded-md bg-white shadow-md dark:bg-gray-800">
		<div
			class="relative flex items-stretch border dark:border-gray-700"
			:class="state.selector ? 'rounded-t-md' : 'rounded-md'"
		>
			<button
				class="flex items-center p-4 capitalize opacity-100 duration-75 ease-in-out hover:bg-gray-100 hover:opacity-75 dark:text-gray-400 dark:hover:bg-gray-700"
				@click="state.selector = !state.selector"
			>
				<span class="hidden md:block">
					{{ t(`${MessagesNames.SearchWhat}.${mode}.short`) }}
				</span>

				<ChevronUp v-show="state.selector" class="text-gray-400" />
				<ChevronDown v-show="!state.selector" class="text-gray-400" />
			</button>

			<div class="group relative z-20 grow">
				<input
					ref="searchInputElement"
					v-model="request"
					type="text"
					class="peer h-full w-full text-center text-xl outline-none focus-within:bg-gray-100 group-focus-within:bg-gray-100 dark:bg-gray-800 dark:focus-within:bg-gray-700 dark:group-focus-within:bg-gray-700"
					:placeholder="t(`${MessagesNames.SearchInput}.${SearchType.Jpn}`)"
					@keydown.enter="searchImmediately"
					@keydown.escape="close"
				/>

				<TheSuggs @onSelected="searchImmediately" />
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

				<RadioGroup v-model="mode" class="flex flex-row gap-2">
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
