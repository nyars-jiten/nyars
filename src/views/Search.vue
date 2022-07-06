<template>
	<section class="flex flex-col gap-10">
		<Search />
		<RouterView />
	</section>
</template>

<script setup lang="ts">
import Search from "@/components/search.vue";
</script>

<style scoped></style>
