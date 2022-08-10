<template>
	<div v-if="tags.length > 0" class="flex flex-wrap items-start gap-2">
		<button
			v-for="(tag, tagId) of tagsSplitted"
			:key="tagId"
			type="button"
			class="flex select-none items-stretch overflow-hidden whitespace-nowrap rounded-md border hover:opacity-75"
			:class="[`border-tag-${tag.title}-500`]"
			@click="
				sStore.type == SearchType.Kanji
					? sStore.searchKanji({ request: `#${tag.full}`, userRequest: false })
					: sStore.searchJp({ request: `#${tag.full}`, userRequest: false })
			"
		>
			<span class="px-2 capitalize" :class="[`text-tag-${tag.title}-500`]">
				{{ locale.t(`${MessagesNames.ArticleTagName}.${tag.title}.short`) }}
			</span>
			<span
				v-if="tag.value"
				class="border-l px-2 uppercase"
				:class="`border-tag-${tag.title}-500 text-tag-${tag.title}-500`"
			>
				<span>
					{{ tag.value }}
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
		const [key, ...rest] = e.split("-");
		return {
			title: key,
			value: rest.join("-"),
			full: e,
		};
	});
</script>
