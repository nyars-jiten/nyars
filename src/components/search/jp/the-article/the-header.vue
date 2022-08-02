<template>
	<header
		class="mb-2 flex items-start gap-4 border-b border-gray-100 pb-2 dark:border-gray-700"
	>
		<div class="grow">
			<component
				:is="standalone ? 'div' : 'RouterLink'"
				:class="[standalone ? '' : 'hover:opacity-75']"
				:to="{ name: RoutesNames.DictJpArticle, params: { wid: article.wid } }"
				class="inline-flex flex-col"
			>
				<div
					v-for="(word, wordId) of article.entry.words"
					:key="wordId"
					class="inline flex-1 font-header text-2xl"
				>
					<span
						v-show="word.writings.length > 0"
						class="before:text-gray-200 before:content-['【'] after:text-gray-200 after:content-['】'] dark:before:text-gray-500 dark:after:text-gray-500"
					>
						<span
							v-for="(w, writingId) of word.writings"
							:key="`${w.value}-${writingId}`"
							class="before:text-gray-200 after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-500"
						>
							{{ w.value }}
							<!---->
							<span
								v-for="tag of w.tag?.values"
								:key="tag"
								class="align-text-bottom text-sm italic text-fuchsia-700"
							>
								{{
									locale.t(`${MessagesNames.ArticleTagName}.kinf.${tag}.short`)
								}}
							</span>
						</span>
					</span>

					<span
						v-for="(r, readingId) of word.readings"
						:key="readingId"
						class="after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-500"
					>
						{{ convert_to_kana(r.value) }}

						<span
							v-for="tag of r.tag?.values"
							:key="tag"
							class="align-text-top text-sm italic text-fuchsia-700"
						>
							{{
								locale.t(`${MessagesNames.ArticleTagName}.rinf.${tag}.short`)
							}}
						</span>
					</span>
				</div>
			</component>
		</div>

		<div v-show="article.entry.tags.length > 0" class="flex items-start gap-2">
			<button
				v-for="tag of article.entry.tags"
				:key="tag"
				type="button"
				class="whitespace-nowrap rounded-md border px-2 hover:opacity-75"
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

	import { EntryJp } from "@/api/dictionary/jp/types";
	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useSearch } from "@/stores/search";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";

	type Props = { article: EntryJp; standalone: boolean };

	defineProps<Props>();

	const locale = useI18n();
	const sStore = useSearch();
</script>
