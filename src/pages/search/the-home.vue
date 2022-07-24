<template>
	<section
		class="border border-gray-100 bg-white p-10 leading-relaxed shadow-md dark:border-zinc-700 dark:bg-zinc-800 md:rounded-md"
	>
		<span
			class="whitespace-pre-wrap"
			v-text="locale.tm(MessagesNames.SearchInfoPre)"
		/>
		<div
			v-for="(info, infoId) in locale.tm(MessagesNames.SearchExamples)"
			:key="infoId"
		>
			👉 <span v-html="bbCodesProcess(info)" />
		</div>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<span
			class="whitespace-pre-wrap"
			v-html="locale.tm(MessagesNames.SearchInfoPost)"
		/>
	</section>
</template>

<script setup lang="ts">
	import { bbCodesProcess } from "@/core/text/bb-code";
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	const locale = useI18n();
</script>
