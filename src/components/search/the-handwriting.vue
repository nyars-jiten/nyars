<template>
	<section class="flex flex-col gap-2 bg-white border p-2">
		<canvas
			ref="element"
			class="w-80 h-80 border border-dotted bg-gray-50 cursor-crosshair z-50"
			@mousemove="hw.onDraw"
			@mousedown="hw.onStart"
			@mouseup="hw.onEnd"
			@mouseleave="hw.onEnd"
		>
			handwriting
		</canvas>

		<div class="flex gap-4 px-4">
			<input
				v-show="hw.maxLineWidth > 0"
				v-model="lineWidth"
				class="w-full"
				type="range"
				:step="hw.step"
				:min="hw.minLineWidth"
				:max="hw.maxLineWidth"
			/>
			<button type="button" @click="hw.undo">🔙</button>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { Canvas, Null } from "@/core/handwriting";
	import { computed, onMounted, ref, VNodeRef } from "vue";

	import type { Handwriting } from "@/core/handwriting";

	const element = ref<VNodeRef | undefined>(undefined);
	const hw = ref<Handwriting>(new Null());

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
