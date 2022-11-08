import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";
import i18n from "@intlify/vite-plugin-vue-i18n";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": new URL("src", import.meta.url).pathname,
		},
	},
	build: {
    target: 'esnext'
	},
	server: {
		port: 8080,
	},
	plugins: [
		vue(),
		wasm(),
		i18n({
			compositionOnly: true,
			fullInstall: true,
		}),
	],
});
