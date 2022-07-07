import { createI18n } from "vue-i18n";
import * as messages from "./langs";

export const locale = createI18n({ locale: "ru", fallback: "ru", messages });
