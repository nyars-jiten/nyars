import { RoutesNames } from "../routes-names";

import type { RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		redirect: RoutesNames.SearchHome,
		component: () => import("@/views/the-search.vue"),
		children: [
			{
				name: RoutesNames.SearchHome,
				path: RoutesNames.SearchHome,
				component: () => import("@/pages/search/the-home.vue"),
			},
			{
				name: RoutesNames.SearchResults,
				path: RoutesNames.SearchResults,
				component: () => import("@/pages/search/the-results.vue"),
			},
			{
				name: RoutesNames.DictJpArticle,
				path: `/${RoutesNames.DictJpArticle}/:wid?`,
				component: () => import("@/pages/dict/jp/the-article.vue"),
				props: { standalone: true },
			},
			{
				name: RoutesNames.Edits,
				path: `/${RoutesNames.Edits}`,
				component: () => import("@/pages/edits/the-articles.vue"),
			},
			{
				name: RoutesNames.DictKanjiArticle,
				path: `/${RoutesNames.DictKanjiArticle}/:kid?`,
				component: () => import("@/pages/dict/kanji/the-article.vue"),
				props: { standalone: true },
			},
		],
	},
];
