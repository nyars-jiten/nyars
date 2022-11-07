<script setup lang="ts">
	import { SearchType } from "@/api/types/search/search-type";
	import { MessagesNames } from "@/locale/messages-names";
	import { useSearch } from "@/stores/search";
	import { useI18n } from "vue-i18n";

	type Props = { tags: string[] };

	const props = defineProps<Props>();
	const store = useSearch();

	const { t } = useI18n();

	const tags = props.tags.map(function (full) {
		const [title, ...rest] = full.split("-");
		const value = rest.join("-");

		return { title, value, full };
	});
</script>

<template>
	<div v-show="tags.length > 0" class="flex flex-wrap items-start gap-2">
		<button
			v-for="tag of tags"
			type="button"
			class="text-xs leading-6 flex select-none overflow-hidden whitespace-nowrap rounded-md border hover:opacity-75"
			:class="[`border-tag-${tag.title}-500`]"
			@click="
				store.type == SearchType.Kanji
					? store.searchKanji({ request: `#${tag.full}` })
					: store.searchJp({ request: `#${tag.full}`, userRequest: false })
			"
		>
			<span
				class="px-2 uppercase font-medium"
				:class="[`text-tag-${tag.title}-500`]"
			>
				{{ t(`${MessagesNames.ArticleTagName}.${tag.title}.short`) }}
			</span>

			<span
				v-show="tag.value"
				class="border-l px-2 uppercase"
				:class="`border-tag-${tag.title}-500 text-tag-${tag.title}-500`"
			>
				{{ tag.value }}
			</span>
		</button>
	</div>
</template>
