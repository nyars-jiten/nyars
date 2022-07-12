import { formatDistanceToNow as func } from "date-fns";
import { useI18n } from "vue-i18n";

import ru from "date-fns/locale/ru";

const locales: { [key in string]: Locale } = { ru };

export function formatDistanceToNow(date: number) {
	const locale = useI18n();

	return func(date, { locale: locales[locale.locale.value] });
}
