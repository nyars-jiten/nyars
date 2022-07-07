<template>
	<section class="flex flex-col gap-10">
		<TheInput />
		<RouterView />
	</section>
</template>

<script setup lang="ts">
	import TheInput from "@/components/search/the-input.vue";
</script>

<style scoped></style>
