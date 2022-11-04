import vue from "@vitejs/plugin-vue";
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
	plugins: [vue(), wasm()],
});
