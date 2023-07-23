import { RoutesNames } from "../routes-names";

import type { RouteRecordRaw } from "vue-router";
import { SearchType } from "@/api/types/search/search-type";
import { useSearch } from "@/stores/search";
import { storeToRefs } from "pinia";
import { pinia } from "@/stores";

export const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		component: () => import("@/pages/search-bar.vue"),
		children: [
			{
				name: RoutesNames.SearchHome,
				path: RoutesNames.SearchHome,
				component: () => import("@/pages/home-page.vue"),
			},
			{
				name: RoutesNames.SearchJpnResults,
				path: RoutesNames.SearchJpnResults,
				component: () => import("@/pages/search/jpn-results.vue"),
				beforeEnter() {
					const { mode } = storeToRefs(useSearch(pinia));
					mode.value = SearchType.Jpn;
				},
			},
			{
				name: RoutesNames.SearchKanjiResults,
				path: RoutesNames.SearchKanjiResults,
				component: () => import("@/pages/search/kanji-results.vue"),
				beforeEnter() {
					const { mode } = storeToRefs(useSearch(pinia));
					mode.value = SearchType.Kanji;
				},
			},
			{
				name: RoutesNames.DictJpArticle,
				path: `/${RoutesNames.DictJpArticle}/:articleId`,
				component: () => import("@/pages/dict/jpn-article.vue"),
				props: { standalone: true },
			},
			{
				name: RoutesNames.DictKanjiArticleEditor,
				path: `/${RoutesNames.DictKanjiArticle}/:articleId/editor`,
				component: () => import("@/pages/dict/kanji-article.vue"),
				props: { standalone: true, editor: true },
			},
			{
				name: RoutesNames.DictKanjiArticle,
				path: `/${RoutesNames.DictKanjiArticle}/:articleId`,
				component: () => import("@/pages/dict/kanji-article.vue"),
				props: { standalone: true, editor: false },
			},
			{
				name: RoutesNames.Edits,
				path: `/${RoutesNames.Edits}`,
				component: () => import("@/pages/edits-page.vue"),
			},
		],
	},
];
