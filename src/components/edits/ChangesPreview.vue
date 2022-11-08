<script setup lang="ts">
	import { api } from "@/api";
	import { onMounted, ref } from "vue";

	import { type Compare } from "@/api/edits-rest/types";

	import PanelBody from "../search/PanelBody.vue";

	type Props = { id: number };

	const props = defineProps<Props>();
	const changes = ref<Compare>({ comment: "", result: [], source: [] });

	onMounted(async () => {
		changes.value = await api.edits.compare({ id: props.id });
	});
</script>

<template>
	<section class="flex gap-4 flex-col">
		<div class="grid grid-cols-[1fr_auto_1fr] gap-4 px-2">
			<PanelBody>
				<span
					v-for="v of changes.source"
					class="select-text whitespace-pre-wrap"
					:class="{ 'text-red-500': v.isDiffered }"
				>
					{{ v.value }}
				</span>
			</PanelBody>

			<div class="flex flex-col justify-evenly">
				<div>⟶</div>
			</div>

			<PanelBody>
				<span
					v-for="(v, i) of changes.result"
					class="select-text whitespace-pre-wrap"
					:class="{ 'text-green-500': v.isDiffered }"
				>
					{{ v.value }}
				</span>
			</PanelBody>
		</div>

		<div
			class="select-text px-4 border-l-2 border-gray-200 dark:border-gray-700 mx-2 overflow-hidden"
		>
			{{ changes.comment }}
		</div>
	</section>
</template>
