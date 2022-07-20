<template>
	<section class="z-10 flex gap-2 border bg-white p-2">
		<div
			v-show="proposals.length"
			class="grid grid-cols-2 content-start gap-2 text-center"
		>
			<button
				v-for="request of proposals"
				:key="request"
				type="button"
				class="basis-2/4 rounded bg-neutral-100 px-2 hover:opacity-50"
				@click="onSelect(request)"
			>
				{{ request }}
			</button>
		</div>

		<div class="flex flex-col gap-2">
			<canvas
				ref="element"
				class="h-80 w-80 cursor-crosshair border border-dotted bg-gray-50"
				@mousemove="hw.onDraw"
				@mousedown="hw.onStart"
				@mouseup="onEnd"
				@mouseleave="onEnd"
			/>

			<div class="flex items-center gap-4 px-4">
				<input
					v-show="hw.maxLineWidth > 0"
					v-model="lineWidth"
					class="w-full"
					type="range"
					:step="hw.step"
					:min="hw.minLineWidth"
					:max="hw.maxLineWidth"
				/>
				<button type="button" class="button hover:opacity-50" @click="hw.clear">
					<Eraser />
				</button>
				<button type="button" class="button hover:opacity-50" @click="undo">
					<ArrowULeftBottom />
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { debounce } from "lodash";
	import { computed, onMounted, ref, VNodeRef } from "vue";

	import { Canvas, Null } from "@/core/handwriting";
	import { useSearch } from "@/stores/search";

	import type { Handwriting } from "@/core/handwriting";

	import ArrowULeftBottom from "vue-material-design-icons/ArrowULeftBottom.vue";
	import Eraser from "vue-material-design-icons/Eraser.vue";

	const element = ref<VNodeRef | undefined>(undefined);
	const hw = ref<Handwriting>(new Null());
	const proposals = ref<string[]>([]);

	const updateProposals = debounce(
		async () => (proposals.value = (await hw.value.getProposals())[1][0][1]),
		100,
	);

	const store = useSearch();

	function onSelect(request: string) {
		store.request += request;

		proposals.value = [];
		hw.value.clear();
	}

	async function onEnd() {
		hw.value.onEnd();

		// if (hw.value.inAction)
		await updateProposals();
	}

	async function undo() {
		hw.value.undo();

		await updateProposals();
	}

	const lineWidth = computed({
		get: () => hw.value.lineWidth,
		set: value => (hw.value.lineWidth = value),
	});

	onMounted(() => {
		if (!(element.value instanceof HTMLCanvasElement)) {
			throw new Error("element must be a canvas");
		}

		hw.value = new Canvas(element.value);
	});
</script>
