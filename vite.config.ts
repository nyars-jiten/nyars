import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";

import locals from "@intlify/unplugin-vue-i18n/vite";
import components from "unplugin-vue-components/vite";
import auto from "unplugin-auto-import/vite";
import icons from "unplugin-icons/vite";
import resolver from "unplugin-icons/resolver";

import {
	VueUseComponentsResolver,
	HeadlessUiResolver,
} from "unplugin-vue-components/resolvers";

import { defineConfig } from "vite";
import { fileURLToPath } from "url";

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("src", import.meta.url)),
		},
	},
	build: {
		target: "esnext",
	},
	server: {
		port: 25565,
		strictPort: true,
	},
	plugins: [
		vue(),
		wasm(),
		icons({ autoInstall: true }),
		components({
			dts: "./src/typings/components.d.ts",
			resolvers: [
				VueUseComponentsResolver(),
				HeadlessUiResolver(),
				resolver({ prefix: "i" }),
			],
		}),
		auto({
			imports: ["vue", "vue-router", "pinia", "vue-i18n"],
			dts: "./src/typings/auto-imports.d.ts",
		}),
		locals({
			compositionOnly: true,
			fullInstall: true,
		}),
	],
});
