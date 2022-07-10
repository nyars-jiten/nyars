import { RouteRecordRaw } from "vue-router";
import { RoutesNames } from "../routes-names";

export const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		redirect: RoutesNames.SearchHome,
		component: () => import("@/views/the-search.vue"),
		children: [
			{
				name: RoutesNames.SearchHome,
				component: () => import("@/pages/search/the-home.vue"),
				path: RoutesNames.SearchHome,
			},
			{
				name: RoutesNames.SearchResults,
				component: () => import("@/pages/search/the-results.vue"),
				path: RoutesNames.SearchResults,
			},
		],
	},
	{
		name: RoutesNames.DictArticle,
		path: `/${RoutesNames.DictArticle}/:wid?`,
		component: () => import("@/pages/search/the-article.vue"),
		props: true,
	},
];
