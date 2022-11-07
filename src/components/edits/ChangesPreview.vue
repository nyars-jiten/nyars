<script setup lang="ts">
	import { api } from "@/api";
	import { onMounted, ref } from "vue";

	import { type Compare } from "@/api/edits-rest/types";

	import Panel from "../search/Panel.vue";
	import PanelBody from "../search/PanelBody.vue";

	type Props = { id: number };

	const props = defineProps<Props>();
	const changes = ref<Compare>({ comment: "", result: [], source: [] });

	onMounted(async () => {
		changes.value = await api.edits.compare({ id: props.id });
	});
</script>

<template>
	<div class="grid grid-cols-[1fr_auto_1fr] gap-4">
		<Panel>
			<PanelBody>
				<span
					v-for="v of changes.source"
					class="select-text whitespace-pre-wrap"
					:class="{ 'text-red-500': v.isDiffered }"
				>
					{{ v.value }}
				</span>
			</PanelBody>
		</Panel>

		<div class="flex flex-col justify-evenly">
			<div>⟶</div>
		</div>

		<Panel>
			<PanelBody>
				<span
					v-for="(v, i) of changes.result"
					class="select-text whitespace-pre-wrap"
					:class="{ 'text-green-500': v.isDiffered }"
				>
					{{ v.value }}
				</span>
			</PanelBody>
		</Panel>

		<div class="col-span-full px-4 border-l-2 mx-2 overflow-hidden">
			{{ changes.comment }}
		</div>
	</div>
</template>
