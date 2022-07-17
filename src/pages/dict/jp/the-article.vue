<template>
	<section class="flex flex-col gap-4">
		<TheArticle :article="article" :standalone="standalone" />

		<div
			v-if="images.length > 0"
			class="flex flex-wrap gap-2 rounded border border-gray-100 bg-white px-10 py-5 leading-relaxed shadow-xl"
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
			class="rounded border border-gray-100 bg-white px-10 py-5 leading-relaxed shadow-xl"
		>
			<div class="pb-4">
				<button
					class="rounded bg-neutral-100 px-2 hover:opacity-50"
					type="button"
					@click="toggleAllStatuses"
				>
					{{ allStatus ? "Показать всё" : "Скрыть всё" }}
				</button>
			</div>

			<div class="flex flex-col gap-4">
				<div
					v-for="satellite of satellites"
					:key="`${satellite.key}-${satellite.satellite.title}`"
					class="flex gap-4 border-b border-neutral-100 px-4 py-2 shadow"
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
			class="rounded border border-gray-100 bg-white px-10 py-5 leading-relaxed shadow-xl"
		>
			<ShortArticle
				v-for="value of articles"
				:key="value.id"
				:article="value"
				class="border-b border-gray-100 py-2 first:pt-0 last:border-none last:pb-0"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { computed, reactive } from "vue";
	import { useRoute } from "vue-router";

	import { api } from "@/api";

	import ShortArticle from "@/components/edits/short-article.vue";
	import TheArticle from "@/components/search/the-article.vue";

	type Props = { standalone: boolean };

	defineProps<Props>();

	const route = useRoute();

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
