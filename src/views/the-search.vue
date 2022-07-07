<template>
	<section class="flex flex-col gap-10">
		<SearchInput />
		<RouterView />
	</section>
</template>

<script setup lang="ts">
	import SearchInput from "@/components/search-input.vue";
</script>

<style scoped></style>
