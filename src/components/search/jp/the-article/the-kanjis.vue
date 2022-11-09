<script setup lang="ts">
	import { useI18n } from "vue-i18n";

	import { RoutesNames } from "@/router/routes-names";
	import { MessagesNames } from "@/locale/messages-names";

	import { type EntryKanji } from "@/api/dictionary/kanji/types";

	import TheTags from "@/components/Tags.vue";
	import { DeepReadonly } from "vue";

	type Props = { kanjis: DeepReadonly<EntryKanji[]> };

	defineProps<Props>();

	const { t } = useI18n();
</script>

<template>
	<div
		v-if="kanjis.length > 0"
		class="border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
	>
		<div class="pb-4 text-gray-400">
			{{ t(MessagesNames.WordKanjisTitle) }}
		</div>
		<div class="flex flex-col flex-wrap gap-8 select-text">
			<div v-for:="kanji of kanjis" class="flex flex-row items-center gap-8">
				<RouterLink
					:to="{
						name: RoutesNames.DictKanjiArticle,
						params: { articleId: kanji.kid },
					}"
				>
					<span class="text-7xl hover:opacity-75">
						{{ kanji.entry.general.literal }}
					</span>
				</RouterLink>
				<div class="flex flex-col gap-2">
					<TheTags :tags="kanji.entry.general.tags" class="text-xs" />
					<span class="break-words">
						{{ kanji.entry.general.shortMeans }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
