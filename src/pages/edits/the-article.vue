<template>
	<section>
		<div class="flex gap-4">
			<div class="grow">
				<TextSplitted
					v-for="(title, value) in article.title"
					:key="`${title}-${value}`"
					class="font-header text-2xl"
				>
					{{ rStore.getByLiteral(value) }}
				</TextSplitted>
			</div>
			<span class="text-neutral-500 whitespace-nowrap">
				{{ locale.t(`${MessagesNames.EditsStatus}.${article.status}`) }}
			</span>
			<UserProfile :user="article.approver" />
		</div>

		<div class="flex">
			<div class="grow flex">
				<TextBetween> #{{ article.id }} </TextBetween>

				<span class="text-neutral-500">
					{{
						locale.t(`${MessagesNames.EditsDictName}.${article.dictionary}`)
					}} </span
				>, &#8203;

				<span class="text-blue-700">
					{{ locale.t(`${MessagesNames.EditsType}.${article.type}`) }}
				</span>
			</div>

			<div class="flex gap-4">
				<span>
					{{ formatDistanceToNow(Date.parse(article.createdDate)) }}
				</span>

				<UserProfile :user="article.author" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { formatDistanceToNow } from "date-fns";
	import { useI18n } from "vue-i18n";

	import { MessagesNames } from "@/locale/messages-names";
	import { useReadingsStorage } from "@/stores/readings";

	import type { Article } from "@/api/edits-rest/types";

	import TextBetween from "@/components/text-between.vue";
	import TextSplitted from "@/components/text-splitted.vue";
	import UserProfile from "./user-profile.vue";

	type Props = { article: Article };

	defineProps<Props>();

	const locale = useI18n();
	const rStore = useReadingsStorage();
</script>
