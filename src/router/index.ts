import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export const useRouter = () =>
	createRouter({
		routes,
		history: createWebHistory(),
	});
