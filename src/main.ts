import "./index.css";

import { createPinia } from "pinia";
import { createApp, markRaw } from "vue";
import { locale } from "./locale";
import { router } from "./router";

import app from "./app.vue";

const pinia = createPinia();
pinia.use(({ store }) => {
	store.router = markRaw(router);
});

createApp(app).use(locale).use(pinia).use(router).mount("#app");
