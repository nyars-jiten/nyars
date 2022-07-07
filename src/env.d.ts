/// <reference types="vite/client" />

type PropsOrPropOptions = object;
type RawBindings = object;
type D = object;

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<PropsOrPropOptions, RawBindings, D>;
	export default component;
}

interface ImportMetaEnv {
	readonly VITE_APP_BASE: string;
	readonly VITE_APP_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
