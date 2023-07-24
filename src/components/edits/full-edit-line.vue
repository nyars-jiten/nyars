<script setup lang="ts">
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	import { RoutesNames } from "@/router/routes-names";
	import { StatusVariant } from "@/api/edits-rest/types/status-variant";
	import { formatDistanceToNow } from "@/locale/formatDistanceToNow";
	import { MessagesNames } from "@/locale/messages-names";
	import { TypeVariant } from "@/api/edits-rest/types/type-variant";

	import { DictionaryVariant, type EditEntry } from "@/api/edits-rest/types";

	import TextBetween from "@/components/text-between.vue";
	import TextSplitted from "@/components/text-splitted.vue";
	import ChangesPreview from "./changes-preview.vue";
	import UserProfile from "./user-profile.vue";
	import Button from "@/components/generic-button.vue";

	import FormatFontSizeDecrease from "vue-material-design-icons/FormatFontSizeDecrease.vue";
	import FormatFontSizeIncrease from "vue-material-design-icons/FormatFontSizeIncrease.vue";

	type Props = { article: EditEntry };

	defineProps<Props>();

	const { t } = useI18n();

	const isChangesVisible = ref(false);

	function isLink({ article }: { article: EditEntry }) {
		return (
			article.identifier &&
			!(
				article.type == TypeVariant.Delete &&
				(article.status == StatusVariant.AutoAccepted ||
					article.status == StatusVariant.Accepted)
			)
		);
	}

	function toggle() {
		isChangesVisible.value = !isChangesVisible.value;
	}

	function path({ article }: { article: EditEntry }) {
		switch (article.dictionary) {
			case DictionaryVariant.Kanji:
				return RoutesNames.DictKanjiArticle;

			default:
				return RoutesNames.DictJpArticle;
		}
	}
</script>

<template>
	<section
		class="border-l-2"
		:class="`border-status-variant-${article.status}`"
	>
		<div class="p-2">
			<div class="flex items-center gap-4">
				<Component
					:is="isLink({ article }) ? 'RouterLink' : 'div'"
					:to="{
						name: path({ article }),
						params: { articleId: article.identifier },
					}"
					class="overflow-hidden text-ellipsis whitespace-nowrap"
				>
					<TextSplitted
						v-for="(_, w) in article.title"
						:key="w"
						class="font-header text-2xl"
					>
						{{ w }}
					</TextSplitted>
				</Component>

				<span
					class="grow whitespace-nowrap text-right"
					:class="`text-status-variant-${article.status}`"
				>
					{{ t(`${MessagesNames.EditsStatus}.${article.status}`) }}
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
					<Button type="button" @click="toggle">
						<template #icon="{ size }">
							<Component
								:is="
									isChangesVisible
										? FormatFontSizeIncrease
										: FormatFontSizeDecrease
								"
								:size="size"
							/>
						</template>
					</Button>

					<TextBetween> #{{ article.id }} </TextBetween>

					<span class="italic text-neutral-500">
						{{ t(`${MessagesNames.EditsDictName}.${article.dictionary}`) }},
						&#8203;
					</span>

					<span :class="`text-type-variant-${article.type}`" class="italic">
						{{ t(`${MessagesNames.EditsType}.${article.type}`) }}
					</span>
				</div>

				<div class="flex gap-4">
					<span>
						{{ t(MessagesNames.EditsCreated) }}
						{{ formatDistanceToNow(Date.parse(article.createdDate)) }}
					</span>

					<UserProfile :user="article.author" />
				</div>
			</div>
		</div>

		<ChangesPreview
			v-if="isChangesVisible"
			:id="article.id"
			class="m-2 rounded-md"
		/>
	</section>
</template>
