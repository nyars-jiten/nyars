<script setup lang="ts">
	import { useI18n } from "vue-i18n";

	import { EntryJp } from "@/api/dictionary/jp/types";
	import { MessagesNames } from "@/locale/messages-names";
	import { convert_to_kana as convert } from "@nyars-jiten/jp-transcript";

	import TheTags from "@/components/Tags.vue";

	type Props = { article: EntryJp };

	defineProps<Props>();

	const { t } = useI18n();
</script>

<template>
	<header class="flex items-start gap-4">
		<div class="grow flex flex-col">
			<span v-for="word of article.entry.words" class="font-header text-2xl">
				<span
					v-show="word.writings.length > 0"
					class="before:text-gray-200 dark:before:text-gray-700 dark:after:text-gray-700 after:text-gray-200 before:content-['【'] after:content-['】']"
				>
					<span
						v-for="(w) of word.writings"
						class="before:text-gray-200 after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-700"
					>
						{{ w.value }}
						<span
							v-for="tag of w.tag?.values"
							class="align-text-bottom text-sm italic text-fuchsia-700"
						>
							{{ t(`${MessagesNames.ArticleTagName}.kinf.${tag}.short`) }}
						</span>
					</span>
				</span>

				<span
					v-for="read of word.readings"
					class="after:text-gray-200 after:content-['・'] last:after:content-none dark:after:text-gray-700"
				>
					{{ convert(read.value) }}

					<span
						v-for="tag of read.tag?.values"
						class="align-text-top text-sm italic text-fuchsia-700"
					>
						{{ t(`${MessagesNames.ArticleTagName}.rinf.${tag}.short`) }}
					</span>
				</span>
			</span>
		</div>

		<TheTags :tags="article.entry.tags" />
	</header>
</template>
