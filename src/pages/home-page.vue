<script setup lang="ts">
	import { useI18n } from "vue-i18n";
	import { storeToRefs } from "pinia";

	import { useSearch } from "@/stores/search";
	import { MessagesNames } from "@/locale/messages-names";
	import { ReadOnlyRequest } from "@/stores/search/types";
	import { SearchType } from "@/api/types/search/search-type";

	import ExternalInTextLink from "@/components/external-intext-link.vue";

	const { t, tm, rt } = useI18n();
	const { searchResults } = useSearch();
	const { mode } = storeToRefs(useSearch());

	async function search(params: ReadOnlyRequest) {
		mode.value = SearchType.Jpn;
		return await searchResults(params);
	}
</script>

<template>
	<section
		class="flex select-text flex-col gap-4 border border-gray-100 bg-white p-10 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
	>
		<div class="indent-10" v-text="t(MessagesNames.SearchInfoPre)" />

		<ul>
			<li v-for="info in tm(String(MessagesNames.SearchExamples))">
				※
				{{ rt(info.message) }}

				<span
					class="whitespace-nowrap before:text-gray-200 before:content-['「'] after:text-gray-200 after:content-['」・'] last:after:content-['」'] dark:before:text-gray-700 dark:after:text-gray-700"
					v-for="example in info.examples"
				>
					<button
						class="hover:text-accent-500 underline decoration-dotted underline-offset-4"
						@click="search({ request: rt(example) })"
					>
						{{ rt(example) }}
					</button>
				</span>
			</li>
		</ul>

		<i18n-t
			class="indent-10"
			tag="div"
			:keypath="String(MessagesNames.SearchInfoPost)"
			scope="global"
		>
			<template #docs>
				<ExternalInTextLink href="https://docs.nyars.org">
					{{ t(MessagesNames.SearchInfoDocs) }}
				</ExternalInTextLink>
			</template>

			<template #discord>
				<ExternalInTextLink
					href="https://discord.gg/u7H5nsPWVB"
					class="hover:text-accent-500 dark:hover:text-accent-500 text-indigo-600 dark:text-indigo-300"
				>
					{{ t(MessagesNames.SearchInfoDiscord) }}
				</ExternalInTextLink>
			</template>
		</i18n-t>
	</section>
</template>
