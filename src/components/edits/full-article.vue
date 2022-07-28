<template>
	<section
		class="border-l-2"
		:class="`border-status-variant-${article.status}`"
	>
		<div class="p-2">
			<div class="flex items-center gap-4">
				<component
					:is="isLink() ? 'router-link' : 'div'"
					:to="{
						name: RoutesNames.DictJpArticle,
						params: { wid: article.identifier },
					}"
					class="overflow-hidden text-ellipsis whitespace-nowrap"
				>
					<TextSplitted
						v-for="(title, value) in article.title"
						:key="`${title}-${value}`"
						class="font-header text-2xl"
					>
						{{ convert_to_kana(value) }}
					</TextSplitted>
				</component>

				<span
					class="grow whitespace-nowrap text-right"
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

			<div class="flex pt-2">
				<div class="flex grow">
					<button
						type="button"
						class="rounded-md bg-neutral-100 px-2 hover:opacity-50 dark:bg-gray-700"
						@click="toggleChanges"
					>
						<Component
							:is="
								isChangesVisible
									? FormatFontSizeIncrease
									: FormatFontSizeDecrease
							"
							:size="16"
						/>
					</button>
					<TextBetween> #{{ article.id }} </TextBetween>

					<span class="italic text-neutral-500">
						{{
							locale.t(`${MessagesNames.EditsDictName}.${article.dictionary}`)
						}}, &#8203;
					</span>

					<span :class="`text-type-variant-${article.type}`" class="italic">
						{{ locale.t(`${MessagesNames.EditsType}.${article.type}`) }}
					</span>
				</div>

				<div class="flex gap-4">
					<span>
						{{ locale.t(MessagesNames.EditsCreated) }}
						{{ formatDistanceToNow(Date.parse(article.createdDate)) }}
					</span>

					<UserProfile :user="article.author" />
				</div>
			</div>
		</div>

		<ChangesPreview
			v-if="isChangesVisible"
			:id="article.id"
			class="m-2 rounded-md border border-gray-200 dark:border-gray-600"
		/>
	</section>
</template>

<script setup lang="ts">
	import { RoutesNames } from "@/router/routes-names";
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	import { StatusVariant } from "@/api/edits-rest/types/status-variant";
	import { formatDistanceToNow } from "@/locale/formatDistanceToNow";
	import { MessagesNames } from "@/locale/messages-names";
	import { convert_to_kana } from "@nyars-jiten/jp-transcript";

	import TextBetween from "@/components/text-between.vue";
	import TextSplitted from "@/components/text-splitted.vue";
	import ChangesPreview from "./changes-preview.vue";
	import UserProfile from "./user-profile.vue";

	import FormatFontSizeDecrease from "vue-material-design-icons/FormatFontSizeDecrease.vue";
	import FormatFontSizeIncrease from "vue-material-design-icons/FormatFontSizeIncrease.vue";

	import type { Article } from "@/api/edits-rest/types";
	import { TypeVariant } from "@/api/edits-rest/types/type-variant";

	type Props = { article: Article };

	const props = defineProps<Props>();

	const locale = useI18n();

	const isChangesVisible = ref(false);

	function isLink() {
		return (
			props.article.identifier &&
			!(
				props.article.type == TypeVariant.Delete &&
				(props.article.status == StatusVariant.AutoAccepted ||
					props.article.status == StatusVariant.Accepted)
			)
		);
	}

	function toggleChanges() {
		isChangesVisible.value = !isChangesVisible.value;
	}
</script>
