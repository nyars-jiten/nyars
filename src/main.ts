import "./index.css";

import { createApp } from "vue";
import { router } from "./router";
import { locale } from "./locale";
import { pinia } from "./stores";

import App from "./app.vue";

const app = createApp(App);
app.use(locale);
app.use(router);
app.use(pinia);
app.mount("#app");
