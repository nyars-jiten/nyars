import { createI18n } from "vue-i18n";
import { en, jp, ru } from "./langs";

export const locale = createI18n({
	locale: "ru",
	fallback: "ru",

	messages: { en, jp, ru },
});
