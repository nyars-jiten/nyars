<script setup lang="ts">
	import { useI18n } from "vue-i18n";
	import { useSearch } from "@/stores/search";

	import ExternalInTextLink from "@/components/ExternalInTextLink.vue";
	import { MessagesNames } from "@/locale/messages-names";

	const { searchJp } = useSearch();
	const { t, tm, rt } = useI18n();
</script>

<template>
	<section
		class="select-text border border-gray-100 bg-white p-10 shadow-md dark:border-gray-700 dark:bg-gray-800 md:rounded-md flex flex-col gap-4"
	>
		<div class="indent-10" v-text="t(MessagesNames.SearchInfoPre)" />

		<ul>
			<li v-for="info in tm(String(MessagesNames.SearchExamples))">
				👉
				{{ rt(info.message) }}

				<span
					class="before:text-gray-200 dark:before:text-gray-700 dark:after:text-gray-700 after:text-gray-200 before:content-['「'] after:content-['」・'] last:after:content-['」'] whitespace-nowrap"
					v-for="example in info.examples"
				>
					<button
						class="underline underline-offset-4 decoration-dotted hover:text-accent-500"
						@click="searchJp({ request: rt(example), userRequest: true })"
					>
						{{ rt(example) }}
					</button>
				</span>
			</li>
		</ul>

		<i18n-t
			class="indent-10"
			tag="div"
			:keypath="String(MessagesNames.SearchInfoPost)"
			scope="global"
		>
			<template #docs>
				<ExternalInTextLink href="https://docs.nyars.org">
					{{ t(MessagesNames.SearchInfoDocs) }}
				</ExternalInTextLink>
			</template>

			<template #discord>
				<ExternalInTextLink
					href="https://discord.gg/u7H5nsPWVB"
					class="text-indigo-600 dark:text-indigo-300 hover:text-accent-500 dark:hover:text-accent-500"
				>
					{{ t(MessagesNames.SearchInfoDiscord) }}
				</ExternalInTextLink>
			</template>
		</i18n-t>
	</section>
</template>
