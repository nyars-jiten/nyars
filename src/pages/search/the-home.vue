<template>
	<section
		class="bg-white p-10 leading-relaxed rounded-md shadow-xl border border-gray-100"
	>
		<div v-for="(info, i) in locale.tm(MessagesNames.SearchInfo)" :key="i">
			📙 {{ info }}
		</div>
	</section>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	const locale = useI18n();
</script>

<style scoped></style>
