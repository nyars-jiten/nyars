import "./index.css";

import { createApp } from "vue";
import { router } from "./router";
import { locale } from "./locale";
import { pinia } from "./stores";

import app from "./TheApp.vue";

createApp(app).use(locale).use(pinia).use(router).mount("#app");
