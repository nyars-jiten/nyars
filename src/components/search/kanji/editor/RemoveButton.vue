<script setup lang="ts">
	type Props = {
		index: number;
		values: Array<any>;
	};

	defineProps<Props>();
</script>

<template>
	<button
		type="button"
		class="focus:outline-none"
		@click="values.splice(index, 1)"
	>
		<v-slot />
	</button>
</template>
