import { RoutesNames } from "../routes-names";

import type { RouteRecordRaw } from "vue-router";
import { SearchType } from "@/api/types/search/search-type";
import { useSearch } from "@/stores/search";
import { storeToRefs } from "pinia";
import { pinia } from "@/stores";

export const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		component: () => import("@/pages/TheSearch.vue"),
		children: [
			{
				name: RoutesNames.SearchHome,
				path: RoutesNames.SearchHome,
				component: () => import("@/pages/search/TheHome.vue"),
			},
			{
				name: RoutesNames.SearchJapResults,
				path: RoutesNames.SearchJapResults,
				component: () => import("@/pages/search/TheJpnResults.vue"),
				beforeEnter() {
					const { mode } = storeToRefs(useSearch(pinia));
					mode.value = SearchType.Jap;
				},
			},
			{
				name: RoutesNames.SearchKanResults,
				path: RoutesNames.SearchKanResults,
				component: () => import("@/pages/search/TheKanResults.vue"),
				beforeEnter() {
					const { mode } = storeToRefs(useSearch(pinia));
					mode.value = SearchType.Kan;
				},
			},
			{
				name: RoutesNames.DictJpArticle,
				path: `/${RoutesNames.DictJpArticle}/:articleId`,
				component: () => import("@/pages/dict/jp/the-article.vue"),
				props: { standalone: true },
			},
			{
				name: RoutesNames.DictKanjiArticleEditor,
				path: `/${RoutesNames.DictKanjiArticle}/:articleId/editor`,
				component: () => import("@/pages/dict/kanji/the-article.vue"),
				props: { standalone: true, editor: true },
			},
			{
				name: RoutesNames.DictKanjiArticle,
				path: `/${RoutesNames.DictKanjiArticle}/:articleId`,
				component: () => import("@/pages/dict/kanji/the-article.vue"),
				props: { standalone: true, editor: false },
			},
			{
				name: RoutesNames.Edits,
				path: `/${RoutesNames.Edits}`,
				component: () => import("@/pages/edits/the-articles.vue"),
			},
		],
	},
];
