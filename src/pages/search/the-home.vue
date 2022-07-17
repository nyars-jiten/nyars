<template>
	<section
		class="rounded border border-gray-100 bg-white p-10 leading-relaxed shadow-xl"
	>
		<div
			v-for="(info, infoId) in locale.tm(MessagesNames.SearchInfo)"
			:key="infoId"
		>
			📙 {{ info }}
		</div>
	</section>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
	import { useI18n } from "vue-i18n";

	const locale = useI18n();
</script>
