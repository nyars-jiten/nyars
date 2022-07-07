<template>
	<main class="my-20 max-w-4xl container mx-auto">
		<h1 class="text-4xl font-medium title-font text-center mb-10">
			На этой неделе
		</h1>
		<h2 class="text-3xl font-medium title-font text-center mb-20">
			Наибольший вклад внесли
		</h2>
		<Suspense>
			<template #default>
				<BestUsers class="mb-20" />
			</template>
			<template #fallback>loading...</template>
		</Suspense>

		<h1 class="text-4xl font-medium title-font text-center mb-10">
			За все время
		</h1>
		<h2 class="text-3xl font-medium title-font text-center mb-20">
			Оставили след в истории
		</h2>

		<Suspense>
			<template #default>
				<BestUsers class="mb-20" />
			</template>
			<template #fallback>loading...</template>
		</Suspense>

		<h1 class="text-3xl font-medium title-font text-center mb-10">Было</h1>

		<Suspense>
			<template #default>
				<TotalStats />
			</template>
			<template #fallback>loading...</template>
		</Suspense>
	</main>
</template>

<script setup lang="ts">
	import TotalStats from "@/components/total-stats.vue";
	import BestUsers from "@/components/best-users.vue";
</script>

<style scoped></style>
