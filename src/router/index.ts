import { pinia } from "@/stores";
import { Pinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export const router = createRouter({
	routes,
	history: createWebHistory(),
});

// router.pinia = pinia;

// declare module "vue-router" {
// 	export interface Router {
// 		pinia: Pinia;
// 	}
// }
