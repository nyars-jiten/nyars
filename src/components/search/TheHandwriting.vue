<script setup lang="ts">
	import { debounce } from "lodash";
	import { computed, onMounted, ref } from "vue";

	import { Canvas, Null } from "@/utils/handwriting";
	import { useSearch } from "@/stores/search";

	import { type Handwriting } from "@/utils/handwriting";

	import ArrowULeftBottom from "vue-material-design-icons/ArrowULeftBottom.vue";
	import Eraser from "vue-material-design-icons/Eraser.vue";
	import Panel from "./Panel.vue";
	import { storeToRefs } from "pinia";

	const canvas = ref<HTMLCanvasElement>();
	const hw = ref<Handwriting>(new Null());
	const proposals = ref<string[]>([]);

	const update = debounce(
		async () => (proposals.value = (await hw.value.getProposals())[1][0][1]),
		100,
	);

	const { request } = storeToRefs(useSearch());
	const { searchSuggestions } = useSearch();

	async function clear() {
		proposals.value = [];
		hw.value.clear();
	}

	async function onSelect(q: string) {
		request.value += q;
		await searchSuggestions({ request: request.value });

		clear();
	}

	async function onEnd() {
		hw.value.onEnd();

		await update();
	}
	async function undo() {
		hw.value.undo();

		await update();
	}

	const lineWidth = computed({
		get: () => hw.value.lineWidth,
		set: value => (hw.value.lineWidth = value),
	});

	onMounted(() => {
		if (!canvas.value) {
			throw new Error("element must be a canvas");
		}

		hw.value = new Canvas(canvas.value);
	});
</script>

<template>
	<Panel class="flex gap-2">
		<div
			v-show="proposals.length"
			class="grid grid-cols-2 content-start gap-2 text-center"
		>
			<button
				v-for="request of proposals"
				type="button"
				class="basis-2/4 rounded border border-dotted border-gray-300 bg-white px-2 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-gray-700"
				@click="onSelect(request)"
			>
				{{ request }}
			</button>
		</div>

		<div class="flex flex-col gap-2">
			<canvas
				ref="canvas"
				class="h-80 w-80 cursor-crosshair border border-dotted bg-white dark:border-gray-700 dark:bg-gray-800"
				@mousemove="hw.onDraw"
				@mousedown="hw.onStart"
				@mouseup="onEnd"
				@mouseleave="onEnd"
			/>

			<div class="flex items-center gap-4">
				<input
					v-show="hw.maxLineWidth > 0"
					v-model="lineWidth"
					class="h-2 w-full appearance-none rounded bg-white dark:bg-gray-600"
					type="range"
					:step="hw.step"
					:min="hw.minLineWidth"
					:max="hw.maxLineWidth"
				/>

				<button type="button" class="hover:opacity-75" @click="clear">
					<Eraser />
				</button>

				<button type="button" class="hover:opacity-75" @click="undo">
					<ArrowULeftBottom />
				</button>
			</div>
		</div>
	</Panel>
</template>
