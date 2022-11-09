<template>
	<input
		class="border border-dotted border-neutral-600 dark:bg-neutral-800 px-2 w-full py-1 focus:outline-none"
		:value="modelValue"
		@input="$emit('update:modelValue', (<HTMLInputElement>$event.target).value)"
	/>
</template>

<script setup lang="ts">
	type Emits = {
		(event: "update:modelValue"): void;
	};

	type Props = { modelValue: string | number };

	defineEmits<Emits>();
	defineProps<Props>();
</script>
