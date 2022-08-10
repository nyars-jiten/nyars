<template>
	<section>
		<div class="-m-4 flex flex-wrap text-center">
			<div class="w-1/4 p-4">
				<h2 class="text-3xl font-medium">
					{{ format(stats.added) }}
				</h2>
				<p>
					{{ locale.t(`${MessagesNames.Statistics}.added`) }}
				</p>
			</div>
			<div class="w-1/4 p-4">
				<h2 class="text-3xl font-medium">
					{{ format(stats.verified) }}
				</h2>
				<p>
					{{ locale.t(`${MessagesNames.Statistics}.verified`) }}
				</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import { reactive } from "vue";
	import { useI18n } from "vue-i18n";

	import { MessagesNames } from "@/locale/messages-names";

	const stats = reactive(await api.statistics.total());

	const locale = useI18n();

	function format(value: number) {
		const formatter = Intl.NumberFormat("en", { notation: "compact" });
		return formatter.format(value);
	}
</script>
