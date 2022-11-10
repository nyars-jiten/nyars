import { RoutesNames } from "../routes-names";

import type { RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		component: () => import("@/views/TheSearch.vue"),
		children: [
			{
				name: RoutesNames.SearchHome,
				path: RoutesNames.SearchHome,
				component: () => import("@/pages/search/TheHome.vue"),
			},
			{
				name: RoutesNames.SearchJapResults,
				path: RoutesNames.SearchJapResults,
				component: () => import("@/pages/search/TheJapResults.vue"),
			},
			{
				name: RoutesNames.SearchKanResults,
				path: RoutesNames.SearchKanResults,
				component: () => import("@/pages/search/TheKanResults.vue"),
			},
			{
				name: RoutesNames.DictJpArticle,
				path: `/${RoutesNames.DictJpArticle}/:articleId`,
				component: () => import("@/pages/dict/jp/the-article.vue"),
				props: { standalone: true },
			},
			{
				name: RoutesNames.DictKanjiArticle,
				path: `/${RoutesNames.DictKanjiArticle}/:articleId`,
				component: () => import("@/pages/dict/kanji/the-article.vue"),
				props: { standalone: true },
			},
			{
				name: RoutesNames.Edits,
				path: `/${RoutesNames.Edits}`,
				component: () => import("@/pages/edits/the-articles.vue"),
			},
		],
	},
];
