import vue from "@vitejs/plugin-vue";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": new URL("src", import.meta.url).pathname,
		},
	},
	server: {
		port: 8080,
	},
	plugins: [
		vue(),
		wasm(),
		topLevelAwait({
			// The export name of top-level await promise for each chunk module
			promiseExportName: "__tla",
			// The function to generate import names of top-level await promise in each chunk module
			promiseImportName: i => `__tla_${i}`,
		}),
	],
	define: {
		__VUE_I18N_LEGACY_API__: false,
		__VUE_I18N_FULL_INSTALL__: false,
	},
});
