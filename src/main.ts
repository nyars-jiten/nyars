import "./index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./rotuer";

import app from "./app.vue";

createApp(app).use(createPinia()).use(router).mount("#app");
