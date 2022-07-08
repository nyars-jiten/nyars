import { RouteRecordRaw } from "vue-router";
import { RouteName } from "../route-name";

export const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		redirect: RouteName.SearchHome,
		component: () => import("@/views/the-search.vue"),
		children: [
			{
				name: RouteName.SearchHome,
				component: () => import("@/pages/search/the-home.vue"),
				path: RouteName.SearchHome,
			},
			{
				name: RouteName.SearchResults,
				component: () => import("@/pages/search/the-results.vue"),
				path: RouteName.SearchResults,
			},
		],
	},
];
