<script setup lang="ts">
	type Emits = {
		(event: "update:modelValue"): void;
	};
	type Props = { modelValue: string | number; rows: number };
	defineEmits<Emits>();
	defineProps<Props>();
</script>

<template>
	<textarea
		id="message"
		:rows="rows"
		class="block h-fit w-full rounded-lg border border-dotted border-neutral-600 px-2 py-1 focus:outline-none dark:bg-neutral-800"
		:value="modelValue"
		@input="$emit('update:modelValue', (<HTMLInputElement>$event.target).value)"
	/>
</template>
