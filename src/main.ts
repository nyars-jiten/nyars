import "./index.css";

import { createPinia } from "pinia";
import { createApp, markRaw } from "vue";
import { router } from "./router";
import { locale } from "./locale";

import app from "./TheApp.vue";

const pinia = createPinia();

pinia.use(({ store }) => {
	store.router = markRaw(router);
});

createApp(app).use(locale).use(pinia).use(router).mount("#app");
