<template>
	<span class="flex items-center gap-2">
		<img class="h-6 rounded-full shadow" :src="avatarUrl(user.avatar).href" />

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
