import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": new URL("src", import.meta.url).pathname,
		},
	},
	plugins: [vue()],
	define: {
		__VUE_I18N_LEGACY_API__: false,
		__VUE_I18N_FULL_INSTALL__: false,
	},
});
