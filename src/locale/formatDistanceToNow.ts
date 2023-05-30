import { formatDistanceToNowStrict } from "date-fns";

import ru from "date-fns/locale/ru";

const locales: { [key in string]: Locale } = { ru };

export function formatDistanceToNow(date: number) {
	const { locale } = useI18n();
	return formatDistanceToNowStrict(date, { locale: locales[locale.value] });
}
