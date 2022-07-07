<template>
	<TransitionGroup
		tag="section"
		class="flex flex-col gap-10"
		enter-active-class="duration-500 ease-out"
		enter-from-class="transform opacity-0 translate-x-3"
		enter-to-class="opacity-100 translate-x-0"
		leave-active-class="duration-300 ease-in"
		leave-from-class="opacity-100 translate-x-0"
		leave-to-class="transform opacity-0 translate-x-3"
	>
		<article
			v-for="result of store.results.results"
			:key="result.uuid"
			class="bg-white p-10 leading-relaxed rounded-md shadow-md border border-gray-100"
		>
			{{ result.name }}
		</article>
	</TransitionGroup>
</template>

<script setup lang="ts">
	import { useSearch } from "@/stores/search";

	const store = useSearch();
</script>

<style scoped></style>
