<template>
	<div v-if="tags.length > 0" class="flex flex-wrap items-start gap-2">
		<button
			v-for="(tag, tagId) of tagsSplitted"
			:key="tagId"
			type="button"
			class="flex select-none items-stretch overflow-hidden whitespace-nowrap rounded-md border hover:opacity-75"
			:class="[
				tag.valueNum
					? `border-tag-level-${tag.valueNum}-500`
					: `border-tag-${tag.title}-500`,
			]"
			@click="
				sStore.type == SearchType.Kanji
					? sStore.searchKanji({ request: `#${tag.data}`, userRequest: false })
					: sStore.searchJap({ request: `#${tag.data}`, userRequest: false })
			"
		>
			<span
				class="px-2 capitalize"
				:class="[
					tag.valueNum
						? `text-tag-level-${tag.valueNum}-500`
						: `text-tag-${tag.title}-500`,
				]"
			>
				{{ locale.t(`${MessagesNames.ArticleTagName}.${tag.title}.short`) }}
			</span>
			<span
				v-if="tag.valueNum"
				class="border-l px-2 uppercase"
				:class="`border-tag-level-${tag.valueNum}-500 text-tag-level-${tag.valueNum}-500`"
			>
				<span>
					{{ tag.valueFull }}
				</span>
			</span>
		</button>
	</div>
</template>

<script setup lang="ts">
	import { SearchType } from "@/api/types/search/search-type";
	import { MessagesNames } from "@/locale/messages-names";
	import { useSearch } from "@/stores/search";
	import { useI18n } from "vue-i18n";

	type Props = { tags: string[] };
	const props = defineProps<Props>();

	const locale = useI18n();
	const sStore = useSearch();

	const tagsSplitted = props.tags.map(function (e) {
		const data = e.split(/(?:-n|-?)(\d+)/);
		return {
			data: e,
			title: data[0],
			valueNum: data.filter(Number).join(),
			valueFull: data
				.slice(1)
				.filter(el => el)
				.join("-"),
		};
	});
</script>
