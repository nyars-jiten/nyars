<template>
	<section>
		<div
			class="cursor-pointer border-l-2 pl-2"
			:class="`border-status-variant-${article.status}`"
			@click="toggleChanges"
		>
			<div class="flex gap-4">
				<TextBetween class="whitespace-nowrap"> #{{ article.id }} </TextBetween>

				<span :class="`text-status-variant-${article.status}`">
					{{ t(`${MessagesNames.EditsStatus}.${article.status}`) }}
				</span>

				<UserProfile v-if="isShowApprover" :user="article.approver!" />

				<span :class="`text-type-variant-${article.type}`" class="italic">
					{{ t(`${MessagesNames.EditsType}.${article.type}`) }}
				</span>

				<span class="grow overflow-hidden text-ellipsis whitespace-nowrap">
					{{ t(MessagesNames.EditsCreated) }}
					{{ formatDistanceToNow(Date.parse(article.createdDate)) }}
				</span>

				<UserProfile :user="article.author" />
			</div>
		</div>

		<div
			v-if="isChangesVisible"
			class="mt-4 mb-2 rounded-md border border-gray-200 dark:border-gray-600"
		>
			<ChangesPreview :id="article.id" />
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed, ref } from "vue";
	import { useI18n } from "vue-i18n";

	import { StatusVariant } from "@/api/edits-rest/types/status-variant";
	import { formatDistanceToNow } from "@/locale/formatDistanceToNow";
	import { MessagesNames } from "@/locale/messages-names";

	import TextBetween from "@/components/text-between.vue";
	import ChangesPreview from "./ChangesPreview.vue";
	import UserProfile from "./user-profile.vue";

	import type { EditEntry } from "@/api/edits-rest/types";

	type Props = { article: EditEntry };

	const props = defineProps<Props>();

	const { t } = useI18n();

	const isShowApprover = computed(
		() =>
			props.article.approver &&
			props.article.status != StatusVariant.AutoAccepted,
	);

	const isChangesVisible = ref(false);

	function toggleChanges() {
		isChangesVisible.value = !isChangesVisible.value;
	}
</script>
