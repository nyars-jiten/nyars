<template>
	<header class="sticky top-0 z-50 shadow-md bg-white">
		<div
			class="max-w-4xl container mx-auto flex flex-wrap py-5 flex-row items-center"
		>
			<div class="mr-4 py-1 pr-4 border-r border-gray-100">
				<a
					class="flex title-font font-medium items-center bg-logo w-10 h-10 rounded-full bg-cover"
				/>
			</div>

			<nav class="flex flex-wrap items-center text-base justify-center gap-5">
				<RouterLink
					:to="{ name: RoutesNames.SearchHome }"
					class="hover:text-red-900"
				>
					{{ locale.t(MessagesNames.HeaderHome) }}
				</RouterLink>
				<a href="#" class="hover:text-red-900">{{
					locale.t(MessagesNames.HeaderBugTracker)
				}}</a>
				<a href="#" class="hover:text-red-900">{{
					locale.t(MessagesNames.HeaderDownload)
				}}</a>
			</nav>
		</div>
	</header>
</template>

<script setup lang="ts">
	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useI18n } from "vue-i18n";

	const locale = useI18n();
</script>
