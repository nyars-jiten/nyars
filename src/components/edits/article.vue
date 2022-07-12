<template>
	<section>
		<div
			class="border-l-2 pl-2 cursor-pointer"
			:class="`border-status-variant-${article.status}`"
			@click="toggleChanges"
		>
			<div class="flex gap-4">
				<div class="grow whitespace-nowrap overflow-hidden overflow-ellipsis">
					<TextSplitted
						v-for="(title, value) in article.title"
						:key="`${title}-${value}`"
						class="font-header text-2xl"
					>
						{{ rStore.getByLiteral(value) }}
					</TextSplitted>
				</div>

				<span
					class="whitespace-nowrap"
					:class="`text-status-variant-${article.status}`"
				>
					{{ locale.t(`${MessagesNames.EditsStatus}.${article.status}`) }}
				</span>

				<UserProfile
					v-if="
						article.approver && article.status != StatusVariant.AutoAccepted
					"
					:user="article.approver"
				/>
			</div>

			<div class="flex">
				<div class="grow flex">
					<TextBetween> #{{ article.id }} </TextBetween>

					<span class="text-neutral-500 italic">
						{{
							locale.t(`${MessagesNames.EditsDictName}.${article.dictionary}`)
						}} </span
					>, &#8203;

					<span :class="`text-type-variant-${article.type}`" class="italic">
						{{ locale.t(`${MessagesNames.EditsType}.${article.type}`) }}
					</span>
				</div>

				<div class="flex gap-4">
					<span>
						создано {{ formatDistanceToNow(Date.parse(article.createdDate)) }}
					</span>

					<UserProfile :user="article.author" />
				</div>
			</div>
		</div>

		<div v-if="isChangesVisible" class="p-4 border-x border-gray-100 mt-2">
			<ChangesPreview :id="article.id" />
		</div>
	</section>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	import { StatusVariant } from "@/api/edits-rest/types/status-variant";
	import { formatDistanceToNow } from "@/locale/formatDistanceToNow";
	import { MessagesNames } from "@/locale/messages-names";
	import { useReadingsStorage } from "@/stores/readings";

	import TextBetween from "@/components/text-between.vue";
	import TextSplitted from "@/components/text-splitted.vue";
	import ChangesPreview from "./changes-preview.vue";
	import UserProfile from "./user-profile.vue";

	import type { Article } from "@/api/edits-rest/types";

	type Props = { article: Article };

	defineProps<Props>();

	const locale = useI18n();
	const rStore = useReadingsStorage();

	const isChangesVisible = ref(false);

	function toggleChanges() {
		isChangesVisible.value = !isChangesVisible.value;
	}
</script>
