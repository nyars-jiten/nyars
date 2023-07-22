<template>
	<span class="flex items-center gap-2 leading-none">
		<img class="h-6 rounded-full shadow" :src="avatarUrl(user.avatar).href" />

		<span class="whitespace-nowrap">
			{{ user.username }}
		</span>
	</span>
</template>

<script setup lang="ts">
	import { avatarUrl } from "@/utils/avatar-url";

	import type { UserEntry } from "@/api/edits-rest/types";

	type Props = { user: UserEntry };

	defineProps<Props>();
</script>
