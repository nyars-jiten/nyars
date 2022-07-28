<template>
	<section
		class="border border-gray-100 bg-white p-10 leading-relaxed shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md"
	>
		<span
			class="whitespace-pre-wrap"
			v-text="locale.tm(MessagesNames.SearchInfoPre)"
		/>
		<!-- eslint-disable vue/no-v-html -->
		<div
			v-for="(info, infoId) in locale.tm(MessagesNames.SearchExamples)"
			:key="infoId"
		>
			👉 <span v-html="bbCodesProcess(info)" />
		</div>

		<span
			class="whitespace-pre-wrap"
			v-html="locale.tm(MessagesNames.SearchInfoPost)"
		/>
		<!-- eslint-enable vue/no-v-html -->
	</section>
</template>

<script setup lang="ts">
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	const locale = useI18n();
</script>
