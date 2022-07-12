<template>
	<span class="flex gap-2 items-center">
		<img class="rounded-full h-6 shadow" :src="avatarUrl(user.avatar).href" />

		<TextBetween class="whitespace-nowrap">
			{{ user.username }}
		</TextBetween>
	</span>
</template>

<script setup lang="ts">
	import { avatarUrl } from "@/core/avatar-url";

	import type { User } from "@/api/edits-rest/types";

	import TextBetween from "@/components/text-between.vue";

	type Props = { user: User };

	defineProps<Props>();
</script>
