<template>
	<section class="flex flex-col gap-4">
		<TheArticle :article="article" :standalone="standalone" />

		<div
			v-if="images.length > 0"
			class="flex flex-wrap gap-2 border border-gray-100 bg-white px-10 py-5 leading-relaxed shadow-md dark:border-gray-600 md:rounded-md"
		>
			<img
				v-for="image of images"
				:key="image.link"
				:src="image.link"
				:alt="image.title"
				class="h-20 w-auto"
			/>
		</div>

		<div
			v-show="satellites.length > 0"
			class="border border-gray-100 bg-white p-8 leading-relaxed shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		>
			<div class="pb-4">
				<button
					v-show="allStatus"
					class="flex select-none items-center gap-2 rounded-md bg-gray-100 px-2 capitalize hover:opacity-75 dark:bg-gray-700"
					type="button"
					@click="toggleAllStatuses"
				>
					{{ locale.t(MessagesNames.ShowMore) }}
					<PlusIcon :size="16" />
				</button>
				<button
					v-show="!allStatus"
					class="flex select-none items-center gap-2 rounded-md bg-gray-100 px-2 capitalize hover:opacity-75 dark:bg-gray-700"
					type="button"
					@click="toggleAllStatuses"
				>
					{{ locale.t(MessagesNames.ShowLess) }}
					<MinusIcon :size="16" />
				</button>
			</div>

			<div class="flex flex-col gap-4">
				<div
					v-for="satellite of satellites"
					:key="`${satellite.key}-${satellite.satellite.title}`"
					class="flex gap-4 rounded-md border border-gray-200 px-4 py-2 dark:border-gray-600"
				>
					<div class="contents" @click="toggleStatus(satellite)">
						<div v-show="!satellite.status" class="grow">
							{{ satellite.title }}
						</div>
						<div v-show="satellite.status" class="grow whitespace-pre-wrap">
							{{ satellite.body }}
						</div>
					</div>

					<div class="italic">{{ satellite.satellite.title }}</div>
				</div>
			</div>
		</div>

		<div
			v-if="articles.length > 0"
			class="border border-gray-100 bg-white p-8 leading-relaxed shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
		>
			<ShortArticle
				v-for="value of articles"
				:key="value.id"
				:article="value"
				class="border-b border-gray-100 py-2 first:pt-0 last:border-none last:pb-0 dark:border-gray-700"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed, reactive } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute } from "vue-router";

	import { api } from "@/api";
	import { MessagesNames } from "@/locale/messages-names";

	import ShortArticle from "@/components/edits/short-article.vue";
	import TheArticle from "@/components/search/jp/the-article.vue";
	import MinusIcon from "vue-material-design-icons/Minus.vue";
	import PlusIcon from "vue-material-design-icons/Plus.vue";

	type Props = { standalone: boolean };

	defineProps<Props>();

	const route = useRoute();

	const locale = useI18n();

	const wid = route.params.wid;
	if (typeof wid !== "string") throw new Error("Bad component usage");

	const article = await api.dictionaryJapEntries({ wid });
	const images = await api.kotoba.entryImages({ wid });
	const articles = await api.edits.byEntry({ wid });
	const satellites = reactive(
		(await api.satellites({ wid })).map(e => ({
			...e,
			title: e.body.split(/\n/)[0],
			status: false,
		})),
	);

	const allStatus = computed(_ => !satellites.every(e => e.status));

	function toggleStatus(satellite: { status: boolean }) {
		satellite.status = !satellite.status;
	}

	function toggleAllStatuses() {
		const v = allStatus.value;
		for (const iterator of satellites) {
			iterator.status = v;
		}
	}
</script>
