import "./index.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
import { locale } from "./locale";
import { router } from "./router";

import app from "./app.vue";

createApp(app).use(locale).use(createPinia()).use(router).mount("#app");
