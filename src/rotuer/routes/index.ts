import { RouteRecordRaw } from "vue-router";
import { RouteName } from "../route-name";

export const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		redirect: RouteName.SearchHome,
		component: () => import("@/views/search-view.vue"),
		children: [
			{
				name: RouteName.SearchHome,
				component: () => import("@/pages/search/search-home.vue"),
				path: RouteName.SearchHome,
			},
			{
				name: RouteName.SearchResults,
				component: () => import("@/pages/search/search-results.vue"),
				path: RouteName.SearchResults,
			},
		],
	},
];
