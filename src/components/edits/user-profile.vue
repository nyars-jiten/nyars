<template>
	<span class="flex items-center gap-2">
		<img class="h-6 rounded-full shadow" :src="avatarUrl(user.avatar).href" />

		<span class="whitespace-nowrap">
			{{ user.username }}
		</span>
	</span>
</template>

<script setup lang="ts">
	import { avatarUrl } from "@/core/avatar-url";

	import type { User } from "@/api/edits-rest/types";

	type Props = { user: User };

	defineProps<Props>();
</script>
