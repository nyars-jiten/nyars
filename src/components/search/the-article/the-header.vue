<template>
	<header class="flex items-start border-b border-gray-100 pb-2 mb-2">
		<div class="grow" :class="headerStyle(article.entry.tags)">
			<component
				:is="standalone ? 'div' : 'RouterLink'"
				:class="[standalone ? '' : 'hover:opacity-50']"
				:to="{ name: RoutesNames.DictJpArticle, params: { wid: article.wid } }"
				class="inline"
			>
				<div
					v-for="(word, wordId) of article.entry.words"
					:key="wordId"
					class="flex-1 text-2xl font-header inline"
				>
					<span
						v-show="word.writings.length > 0"
						class="before:content-['【'] after:content-['】']"
					>
						<span
							v-for="(w, writingId) of word.writings"
							:key="writingId"
							class="after:content-['・'] last:after:content-none"
						>
							{{ w.value }}
						</span>
					</span>

					<span
						v-for="(r, readingId) of word.readings"
						:key="readingId"
						class="after:content-['・'] last:after:content-none"
					>
						{{ rStore.getByLiteral(r.value) }}
					</span>
				</div>
			</component>
		</div>

		<div v-show="article.entry.tags.length > 0" class="flex gap-2 items-start">
			<button
				v-for="tag of article.entry.tags"
				:key="tag"
				type="button"
				class="border rounded-xl px-2 hover:opacity-50 whitespace-nowrap"
				:class="[`text-tag-${tag}`, `border-tag-${tag}`]"
				@click="sStore.search({ request: `#${tag}`, userRequest: false })"
			>
				{{ locale.t(`${MessagesNames.ArticleTagName}.${tag}`) }}
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
	import { useI18n } from "vue-i18n";

	import { EntryJp } from "@/api/search-rest/types";
	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useReadingsStorage } from "@/stores/readings";
	import { useSearch } from "@/stores/search";

	type Props = { article: EntryJp; standalone: boolean };

	defineProps<Props>();

	const locale = useI18n();
	const sStore = useSearch();
	const rStore = useReadingsStorage();

	function headerStyle(tags: string[]) {
		if (tags.length < 1) return [];

		return ["border-r", "border-gray-100", "mr-2", "pr-2"];
	}
</script>

<style scoped></style>
