/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<object, object, object>;
	export default component;
}

interface ImportMetaEnv {
	readonly VITE_APP_BASE: string;
	readonly VITE_APP_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
