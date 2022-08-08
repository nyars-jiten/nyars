<template>
	<div
		v-if="kanjis.length > 0"
		class="select-text border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
	>
		<div class="select-none pb-4 text-gray-400">
			{{ locale.t(MessagesNames.WordKanjisTitle) }}
		</div>
		<div class="flex flex-col flex-wrap gap-8">
			<div
				:key="kanji.kid"
				v-for:="kanji of kanjis"
				class="flex flex-row items-center gap-8"
			>
				<RouterLink
					:to="{
						name: RoutesNames.DictKanjiArticle,
						params: { kid: kanji.kid },
					}"
				>
					<span class="font-header text-7xl hover:opacity-75">
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

<script setup lang="ts">
	import { useI18n } from "vue-i18n";

	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";

	import { EntryKanji } from "@/api/dictionary/kanji/types";
	import TheTags from "@/components/the-tags.vue";

	type Props = { kanjis: EntryKanji[] };

	defineProps<Props>();

	const locale = useI18n();
</script>
