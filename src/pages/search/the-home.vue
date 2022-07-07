<template>
	<section
		class="bg-white p-10 leading-relaxed rounded-md shadow-xl border border-gray-100"
	>
		<div v-for="info in $tm(MessagesNames.SearchInfo)">📙 {{ info }}</div>
	</section>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
</script>

<style scoped></style>
