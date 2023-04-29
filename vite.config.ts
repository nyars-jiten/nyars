import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": new URL("src", import.meta.url).pathname,
		},
	},
	build: {
		target: "esnext",
	},
	server: {
		port: 25565,
	},
	plugins: [
		vue(),
		wasm(),
		VueI18nPlugin({
			compositionOnly: true,
			fullInstall: true,
		}),
	],
});
