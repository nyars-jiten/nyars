import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

import { defineConfig } from "vite";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
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
