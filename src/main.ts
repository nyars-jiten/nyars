import "./index.css";

import { useRouter } from "./router";
import { useLocale } from "./locale";
import { useStore } from "./stores";

import App from "./TheApp.vue";

const app = createApp(App);

app.use(useLocale());
app.use(useRouter());
app.use(useStore());

app.mount("#app");
