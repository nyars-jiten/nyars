<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<button
		class="inline-flex items-center gap-2 whitespace-nowrap rounded border border-gray-300 bg-white px-2 py-1 text-xs font-medium uppercase shadow hover:bg-gray-300 focus:outline-none dark:border-gray-600 dark:bg-gray-700 hover:dark:bg-gray-600"
	>
		<slot />
		<slot :size="16" class="opacity-50" name="icon" />
	</button>
</template>
