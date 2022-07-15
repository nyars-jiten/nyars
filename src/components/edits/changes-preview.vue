<template>
	<div>
		<div class="grid grid-cols-[1fr_auto_1fr] gap-4">
			<div class="py-4">
				<span
					v-for="(v, i) of changes.source"
					:key="`${i}-${v}`"
					class="whitespace-pre-wrap select-text"
					:class="{ 'text-red-500': v.isDiffered }"
				>
					{{ v.value }}
				</span>
			</div>

			<div class="p-4 border-x border-gray-400 flex flex-col justify-evenly">
				<div>⟶</div>
				<div>⟶</div>
				<div>⟶</div>
			</div>

			<div class="py-4">
				<span
					v-for="(v, i) of changes.result"
					:key="`${i}-${v}`"
					class="whitespace-pre-wrap select-text"
					:class="{ 'text-green-500': v.isDiffered }"
				>
					{{ v.value }}
				</span>
			</div>
		</div>

		<div>{{ changes.comment }}</div>
	</div>
</template>

<script setup lang="ts">
	import { api } from "@/api";

	type Props = { id: number };

	const props = defineProps<Props>();
	const changes = await api.edits.compare({ id: props.id });
</script>
