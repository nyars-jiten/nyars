<template>
	<section class="flex flex-col gap-10">
		<article
			v-for="result of store.results.results"
			:key="result.uuid"
			class="bg-white p-10 leading-relaxed rounded-md shadow-xl border border-gray-100"
		>
			{{ result.name }}
		</article>
	</section>
</template>

<script setup lang="ts">
	import { useSearch } from "@/stores/search";

	const store = useSearch();
</script>

<style scoped></style>
