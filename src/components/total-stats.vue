<template>
	<section>
		<div class="-m-4 flex flex-wrap text-center">
			<div class="w-1/4 p-4">
				<h2 class="text-3xl font-medium">
					{{ format(stats.added) }}
				</h2>
				<p class="leading-relaxed">Добавлено статей</p>
			</div>
			<div class="w-1/4 p-4">
				<h2 class="text-3xl font-medium">
					{{ format(stats.verified) }}
				</h2>
				<p class="leading-relaxed">Исправлено статей</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { api } from "@/api";
	import { reactive } from "vue";

	const stats = reactive(await api.statistics.total());

	function format(value: number) {
		const formatter = Intl.NumberFormat("en", { notation: "compact" });
		return formatter.format(value);
	}
</script>
