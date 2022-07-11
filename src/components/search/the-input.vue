<template>
	<section
		class="group focus-within:shadow-2xl relative duration-150 ease-in-out border border-gray-100 text-2xl shadow-sm bg-white flex items-center p-4 gap-4"
	>
		<SearchIcon />

		<input
			v-model="store.request"
			type="text"
			class="text-center outline-none w-full"
			:placeholder="locale.t(MessagesNames.SearchInput)"
			@keydown.enter="searchImmediately"
			@input="onInputRequest"
		/>

		<button
			class="opacity-100 hover:opacity-50 duration-75 ease-in-out"
			@click="showDrawPanel = !showDrawPanel"
		>
			<DrawIcon />
		</button>

		<Transition
			enter-active-class="duration-150 ease-out"
			enter-from-class="transform opacity-0 -translate-y-2"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="duration-150 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="transform opacity-0 -translate-y-2"
			mode="out-in"
		>
			<TheHandwriting
				v-if="showDrawPanel"
				class="shadow-2xl absolute right-0 top-[calc(100%+1rem)] border-gray-100"
			/>
		</Transition>
	</section>
</template>

<script setup lang="ts">
	import { debounce } from "lodash";
	import { onBeforeMount, ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute, useRouter } from "vue-router";

	import { MessagesNames } from "@/locale/messages-names";
	import { RoutesNames } from "@/router/routes-names";
	import { useSearch } from "@/stores/search";

	import DrawIcon from "vue-material-design-icons/Draw.vue";
	import SearchIcon from "vue-material-design-icons/Magnify.vue";
	import TheHandwriting from "./the-handwriting.vue";

	const showDrawPanel = ref(false);
	const store = useSearch();
	const router = useRouter();
	const locale = useI18n();

	const search = debounce(store.search, 300);

	async function searchImmediately() {
		search.cancel();
		await store.search({ userRequest: true });
	}

	async function onInputRequest(e: Event) {
		const { target } = e;
		if (!(target instanceof HTMLInputElement)) return;

		await onRequest(target.value);
	}

	async function onRequest(request: string) {
		if (request == "") await router.push({ name: RoutesNames.SearchHome });
		else {
			await search({ userRequest: true });
		}
	}

	onBeforeMount(async () => {
		const { query } = useRoute();
		const { request } = query;

		if (typeof request == "string") {
			await store.search({ request, userRequest: true });
		}
	});

	// https://youtu.be/ERa9y6daDFY
	// https://youtu.be/laEn1BsYJlc
</script>
