import { KanjiFormType } from "@/api/dictionary/kanji/types";
import { KanjiImageStyle } from "@/api/dictionary/kanji/types/kanji-image-style";
import { KanjiIndexType } from "@/api/dictionary/kanji/types/kanji-index-type";
import { StatusVariant } from "@/api/edits-rest/types/status-variant";
import { TypeVariant } from "@/api/edits-rest/types/type-variant";
import { SearchType } from "@/api/types/search/search-type";
import { MessagesNames } from "../messages-names";

import rinf from "./tags/rinf";

export const ru = {
	[MessagesNames.HeaderHome]: "Главная",
	[MessagesNames.HeaderEdits]: "Правки",
	[MessagesNames.HeaderBugTracker]: "Багтрекер",
	[MessagesNames.HeaderDownload]: "Скачать",

	[MessagesNames.SearchIn]: "Искать",
	[MessagesNames.SearchInput]: {
		[SearchType.Jpn]: "Японское, русское или английское слово",
		[SearchType.Kan]: "Японское слово или кандзи",
	},

	[MessagesNames.SearchWhat]: {
		[SearchType.Kan]: { badge: "字", short: "кандзи" },
		[SearchType.Jpn]: { badge: "詞", short: "слова" },
	},
	[MessagesNames.SearchInfoPre]:
		"НЯРС — редактируемый японско-русский(-английский) словарь. Для начала работы со словарём введите поисковой запрос в строку выше. Вот несколько примеров:",
	[MessagesNames.SearchInfoPost]:
		"Подробно функционал сайта описан в {docs}, также присоединяйтесь к нашему сообществу в {discord} — там можно будет спросить все непонятные моменты, а также внести предложения по сайту.",
	[MessagesNames.SearchInfoDocs]: "документации",
	[MessagesNames.SearchInfoDiscord]: "Discord",
	[MessagesNames.SearchExamples]: [
		{
			message: "Поиск по японским словам: ",
			examples: ["遷都", "メカニズム"],
		},
		{
			message: "Поиск по русским и английским словам: ",
			examples: ["разряжаться", "sugar acid"],
		},
		{
			message: "Поиск по транскрипции: ",
			examples: ["сэйка", "ikimashii", "itizyou", "hiku"],
		},
		{
			message: "Парсинг форм слова, предложений и текстов: ",
			examples: ["いきなりブックマークが増えて驚きました。"],
		},
		{
			message: "Поиск по шаблону: ",
			examples: ["*動詞", "交通?関"],
		},
	],
	[MessagesNames.SearchShortLangName]: {
		rus: "рус",
		jpn: "япо",
		eng: "анг",
		lat: "лат",
	},

	[MessagesNames.WordKanjisTitle]: "Кандзи в этом слове",

	[MessagesNames.Radical]: "Ключ",
	[MessagesNames.Ids]: "IDS",
	[MessagesNames.StrokeCount]: "Черты",
	[MessagesNames.Frequency]: "Частотность",
	[MessagesNames.Unicode]: "Unicode",
	[MessagesNames.JIS]: "JIS",
	[MessagesNames.KanjiForm]: "Иные формы",
	[MessagesNames.KanjiFormTypeName]: {
		[KanjiFormType.Kyuujitai]: { short: "Kyuujitai", full: "Kyuujitai" },
		[KanjiFormType.Shinjitai]: { short: "Shinjitai", full: "Shinjitai" },
		[KanjiFormType.Hyoujunjitai]: {
			short: "Hyoujunjitai",
			full: "Hyoujunjitai",
		},
		[KanjiFormType.Kyoyoujitai]: { short: "Kyoyoujitai", full: "Kyoyoujitai" },
		[KanjiFormType.Itaiji]: { short: "Itaiji", full: "Itaiji" },
		[KanjiFormType.Rare]: { short: "Rare", full: "Rare" },
		[KanjiFormType.Popular]: { short: "Popular", full: "Popular" },
		[KanjiFormType.Japanese]: { short: "Japanese", full: "Japanese" },
		[KanjiFormType.Nonjapanese]: { short: "Nonjapanese", full: "Nonjapanese" },
		[KanjiFormType.Kankan]: { short: "Kankan", full: "Kankan" },
		[KanjiFormType.Inhyou]: { short: "Inhyou", full: "Inhyou" },
		[KanjiFormType.Seiji]: { short: "Seiji", full: "Seiji" },
		[KanjiFormType.Ryakuji]: { short: "Ryakuji", full: "Ryakuji" },
	},
	[MessagesNames.StandaloneMeanings]: "Самостоятельные значения",
	[MessagesNames.ComposedMeanings]: "Составные значения",
	[MessagesNames.KanbunMeanings]: "Камбун",
	[MessagesNames.MeaningsEmpty]: "Данные о значениях отсутствуют",
	[MessagesNames.Note]: "Примечание",
	[MessagesNames.KanjiStyle]: "Стили написания",
	[MessagesNames.KanjiStyleName]: {
		[KanjiImageStyle.Kyoukasyo]: "",
		[KanjiImageStyle.Mincho]: "",
		[KanjiImageStyle.Gothic]: "",
		[KanjiImageStyle.Kaisyo]: "",
		[KanjiImageStyle.Gyousyo]: "",
		[KanjiImageStyle.Sousyo]: "",
		[KanjiImageStyle.Sousyo]: "",
		[KanjiImageStyle.Other]: "",
	},
	[MessagesNames.KanjiReadingTypeName]: {
		onyomi: { badge: "音", full: "Онъёми" },
		kunyomi: { badge: "訓", full: "Кунъёми" },
		nanori: { badge: "名", full: "Нанори" },
		other: { badge: "他", full: "Прочие варианты чтения" },
	},
	[MessagesNames.KanjiReadingTagName]: {
		shou: { badge: "小", full: "" },
		chuu: { badge: "中", full: "" },
		kou: { badge: "高", full: "" },
		kanon: { badge: "漢", full: "" },
		touon: { badge: "唐", full: "" },
		goon: { badge: "呉", full: "" },
		kanyoon: { badge: "慣", full: "" },
		souon: { badge: "宋", full: "" },
		gai: { badge: "外", full: "" },
	},
	[MessagesNames.Index]: "Индекс",
	[MessagesNames.Source]: "Источник",
	[MessagesNames.KanjiIndexTypeName]: {
		[KanjiIndexType.Dictionary]: "Индексы в словарях",
		[KanjiIndexType.Classification]: "Регистры",
		[KanjiIndexType.Codepoint]: "Кодировки",
	},
	[MessagesNames.IndexSourceAbbr]: {
		nelson_c:
			"Modern Reader's Japanese-English Character Dictionary (A. Nelson)",
		nelson_n: "New Nelson Japanese-English Character Dictionary (A. Nelson)",
		halpern_njecd: "New Japanese-English Character Dictionary (J. Halpern)",
		halpern_kkd: "Kodansha Kanji Dictionary (J. Halpern)",
		halpern_kkld: "Kodansha Kanji Learner's Dictionary (J. Halpern)",
		halpern_kkld_2ed:
			"Kodansha Kanji Learner's Dictionary, 2nd Edition (J. Halpern)",
		heisig: "Remembering The Kanji (J. Heisig)",
		heisig6: "Remembering The Kanji, 6th edition (J. Heisig)",
		gakken: "A  New Dictionary of Kanji Usage (Gakken)",
		oneill_names: "Japanese Names (P.G. O'Neill)",
		oneill_kk: "Essential Kanji (P.G. O'Neill)",
		moro: "Dai Kan-Wa Jiten (T. Morohashi)",
		henshall:
			"A Guide To Remembering Japanese Characters (Kenneth G. Henshall)",
		henshall3:
			"A Guide To Reading and Writing Japanese 3rd edition (Henshall, Seele, De Groot)",
		sh_kk: "Kanji and Kana (M. Spahn, W. Hadamitzky)",
		sh_kk2: "Kanji and Kana, Revised edition (M. Spahn, W. Hadamitzky)",
		sakade: "A Guide To Reading and Writing Japanese (F. Sakade)",
		jf_cards: "Japanese Kanji Flashcards (M. Hodges, T. Okazaki",
		tutt_cards: "Tuttle Kanji Cards (A. Kask)",
		crowley: "The Kanji Way to Japanese Language Power (D. Crowley)",
		kanji_in_context: "Kanji in Context",
		busy_people: "Japanese For Busy People",
		kodansha_compact: "Kodansha Compact Kanji Guide",
		maniette: "Les Kanjis dans la tete (Y. Maniette)",
		skip: "Halpern's SKIP",
		sh_desc: "The Kanji Dictionary descriptor",
		four_corner: "Four Corner",
		deroo: "2001 Kanji (J. De Roo)",
		misclass: "Misclass",
		jis208: "JIS X 0208-1997",
		jis212: "JIS X 0212-1990",
		jis213: "JIS X 0213-2000",
		ucs: "Unicode 4.0",
	},

	[MessagesNames.ArticleTagName]: {
		common: { short: "common" },
		jyouyou: { short: "jōyō" },
		insatsu: { short: "insatsu" },
		jinmeiyou: { short: "jinmeiyō" },
		kanken: { short: "kanken" },
		jlpt: { short: "JLPT" },
		grade: { short: "Класс" },
		pos: {
			"adv-to": { short: "adv-to", full: "adverb taking the `to' particle" },
			"n-adv": { short: "n-adv", full: "adverbial noun (fukushitekimeishi)" },
			"adj-nari": {
				short: "adj-nari",
				full: "archaic/formal form of na-adjective",
			},
			aux: { short: "aux", full: "auxiliary" },
			"aux-adj": { short: "aux-adj", full: "auxiliary adjective" },
			"aux-v": { short: "aux-v", full: "auxiliary verb" },
			conj: { short: "conj", full: "conjunction" },
			ctr: { short: "ctr", full: "counter" },
			exp: { short: "exp", full: "expressions (phrases, clauses, etc.)" },
			v5aru: { short: "v5aru", full: "Godan verb - -aru special class" },
			"v5k-s": { short: "v5k-s", full: "Godan verb - Iku/Yuku special class" },
			v5uru: {
				short: "v5uru",
				full: "Godan verb - Uru old class verb (old form of Eru)",
			},
			v5b: { short: "v5b", full: "Godan verb with `bu' ending" },
			v5g: { short: "v5g", full: "Godan verb with `gu' ending" },
			v5k: { short: "v5k", full: "Godan verb with `ku' ending" },
			v5m: { short: "v5m", full: "Godan verb with `mu' ending" },
			v5n: { short: "v5n", full: "Godan verb with `nu' ending" },
			v5r: { short: "v5r", full: "Godan verb with `ru' ending" },
			"v5r-i": {
				short: "v5r-i",
				full: "Godan verb with `ru' ending (irregular verb)",
			},
			v5s: { short: "v5s", full: "Godan verb with `su' ending" },
			v5t: { short: "v5t", full: "Godan verb with `tsu' ending" },
			v5u: { short: "v5u", full: "Godan verb with `u' ending" },
			"v5u-s": {
				short: "v5u-s",
				full: "Godan verb with `u' ending (special class)",
			},
			v1: { short: "v1", full: "Ichidan verb" },
			"v1-s": { short: "v1-s", full: "Ichidan verb - kureru special class" },
			vz: {
				short: "vz",
				full: "Ichidan verb - zuru verb (alternative form of -jiru verbs)",
			},
			int: { short: "int", full: "interjection (kandoushi)" },
			vn: { short: "vn", full: "irregular nu verb" },
			vr: { short: "vr", full: "irregular ru verb, plain form ends with -ri" },
			vk: { short: "vk", full: "Kuru verb - special class" },
			"v2b-s": {
				short: "v2b-s",
				full: "Nidan verb (lower class) with `bu' ending (archaic)",
			},
			"v2d-s": {
				short: "v2d-s",
				full: "Nidan verb (lower class) with `dzu' ending (archaic)",
			},
			"v2g-s": {
				short: "v2g-s",
				full: "Nidan verb (lower class) with `gu' ending (archaic)",
			},
			"v2h-s": {
				short: "v2h-s",
				full: "Nidan verb (lower class) with `hu/fu' ending (archaic)",
			},
			"v2k-s": {
				short: "v2k-s",
				full: "Nidan verb (lower class) with `ku' ending (archaic)",
			},
			"v2m-s": {
				short: "v2m-s",
				full: "Nidan verb (lower class) with `mu' ending (archaic)",
			},
			"v2n-s": {
				short: "v2n-s",
				full: "Nidan verb (lower class) with `nu' ending (archaic)",
			},
			"v2r-s": {
				short: "v2r-s",
				full: "Nidan verb (lower class) with `ru' ending (archaic)",
			},
			"v2s-s": {
				short: "v2s-s",
				full: "Nidan verb (lower class) with `su' ending (archaic)",
			},
			"v2t-s": {
				short: "v2t-s",
				full: "Nidan verb (lower class) with `tsu' ending (archaic)",
			},
			"v2w-s": {
				short: "v2w-s",
				full: "Nidan verb (lower class) with `u' ending and `we' conjugation (archaic)",
			},
			"v2y-s": {
				short: "v2y-s",
				full: "Nidan verb (lower class) with `yu' ending (archaic)",
			},
			"v2z-s": {
				short: "v2z-s",
				full: "Nidan verb (lower class) with `zu' ending (archaic)",
			},
			"v2b-k": {
				short: "v2b-k",
				full: "Nidan verb (upper class) with `bu' ending (archaic)",
			},
			"v2d-k": {
				short: "v2d-k",
				full: "Nidan verb (upper class) with `dzu' ending (archaic)",
			},
			"v2g-k": {
				short: "v2g-k",
				full: "Nidan verb (upper class) with `gu' ending (archaic)",
			},
			"v2h-k": {
				short: "v2h-k",
				full: "Nidan verb (upper class) with `hu/fu' ending (archaic)",
			},
			"v2k-k": {
				short: "v2k-k",
				full: "Nidan verb (upper class) with `ku' ending (archaic)",
			},
			"v2m-k": {
				short: "v2m-k",
				full: "Nidan verb (upper class) with `mu' ending (archaic)",
			},
			"v2r-k": {
				short: "v2r-k",
				full: "Nidan verb (upper class) with `ru' ending (archaic)",
			},
			"v2t-k": {
				short: "v2t-k",
				full: "Nidan verb (upper class) with `tsu' ending (archaic)",
			},
			"v2y-k": {
				short: "v2y-k",
				full: "Nidan verb (upper class) with `yu' ending (archaic)",
			},
			"v2a-s": { short: "v2a-s", full: "Nidan verb with 'u' ending (archaic)" },
			"n-t": { short: "n-t", full: "noun (temporal) (jisoumeishi)" },
			vs: {
				short: "vs",
				full: "noun or participle which takes the aux. verb suru",
			},
			"adj-f": { short: "adj-f", full: "noun or verb acting prenominally" },
			"n-pref": { short: "n-pref", full: "noun, used as a prefix" },
			"n-suf": { short: "n-suf", full: "noun, used as a suffix" },
			"adj-no": {
				short: "adj-no",
				full: "nouns which may take the genitive case particle `no'",
			},
			"adj-pn": { short: "adj-pn", full: "pre-noun adjectival (rentaishi)" },
			"vs-c": { short: "vs-c", full: "su verb - precursor to the modern suru" },
			"vs-i": { short: "vs-i", full: "suru verb - included" },
			"vs-s": { short: "vs-s", full: "suru verb - special class" },
			"v-unspec": { short: "v-unspec", full: "verb unspecified" },
			v4b: { short: "v4b", full: "Yodan verb with `bu' ending (archaic)" },
			v4g: { short: "v4g", full: "Yodan verb with `gu' ending (archaic)" },
			v4h: { short: "v4h", full: "Yodan verb with `hu/fu' ending (archaic)" },
			v4k: { short: "v4k", full: "Yodan verb with `ku' ending (archaic)" },
			v4m: { short: "v4m", full: "Yodan verb with `mu' ending (archaic)" },
			v4n: { short: "v4n", full: "Yodan verb with `nu' ending (archaic)" },
			v4r: { short: "v4r", full: "Yodan verb with `ru' ending (archaic)" },
			v4s: { short: "v4s", full: "Yodan verb with `su' ending (archaic)" },
			v4t: { short: "v4t", full: "Yodan verb with `tsu' ending (archaic)" },
			"adj-ix": {
				short: "ий-прил.",
				full: "и-прилагательное (предикативное) ёй/ий",
			},
			"n-pr": { short: "сущ.-собств.", full: "имя собственное" },
			"adj-kari": {
				short: "кари-прил.",
				full: "кари-прилагательное (предикативное вспомогательное архаичное)",
			},
			"adj-ku": {
				short: "ку-прил.",
				full: "ку-прилагательное (предикативное архаичное)",
			},
			pn: { short: "местоим.", full: "местоимение" },
			"adj-na": {
				short: "на-прил.",
				full: "на-прилагательное (полупредикативное)",
			},
			adv: { short: "нар.", full: "наречие" },
			unc: { short: "некл.", full: "не классифицировано" },
			vi: { short: "неперех.-глаг.", full: "непереходный глагол" },
			vt: { short: "перех.-глаг.", full: "переходный глагол" },
			"adj-i": { short: "и-прил.", full: "прилагательное" },
			pref: { short: "прист.", full: "приставка" },
			"cop-da": { short: "связка", full: "связка" },
			"adj-shiku": {
				short: "сику-прил.",
				full: "сику-прилагательное (предикативное архаичное)",
			},
			suf: { short: "суфф.", full: "суффикс" },
			n: { short: "сущ.", full: "существительное (общее, нарицательное)" },
			"adj-t": {
				short: "тари-прил.",
				full: "тари-прилагательное (полупредикативное архаичное / непредикативное)",
			},
			prt: { short: "частица", full: "частица" },
			num: { short: "числ.", full: "число" },
		},
		fld: {
			"audio-visual": { short: "audio-visual", full: "audvid" },
			horse: { short: "horse", full: "horse-racing" },
			aviat: { short: "авиа.", full: "авиация" },
			auto: { short: "авто.", full: "автомобильный термин" },
			alp: { short: "альп.", full: "альпинизм" },
			anat: { short: "анат.", full: "анатомия" },
			archeol: { short: "археол.", full: "археология" },
			archit: { short: "архит.", full: "архитектура и строительство" },
			astron: { short: "астр.", full: "астрономия" },
			baseb: { short: "бейс.", full: "бейсбол" },
			biol: { short: "биол.", full: "биология" },
			biochem: { short: "биохим.", full: "биохимия" },
			exch: { short: "бирж.", full: "биржевой термин" },
			MA: { short: "б.и.", full: "боевые искусства" },
			bot: { short: "бот.", full: "ботаника" },
			buddh: { short: "буд.", full: "буддизм" },
			bkpg: { short: "бухг.", full: "бухгалтерский учёт" },
			vet: { short: "вет.", full: "ветеринария" },
			mil: { short: "воен.", full: "военный термин" },
			aero: { short: "возд.", full: "воздухоплавание" },
			volcan: { short: "вулк.", full: "вулканология" },
			comp: { short: "выч.", full: "вычислительная техника" },
			genet: { short: "ген.", full: "генетика" },
			geogr: { short: "геогр.", full: "география" },
			geol: { short: "геол.", full: "геология" },
			geom: { short: "геом.", full: "геометрия" },
			go: { short: "го", full: "го (игра)" },
			mining: { short: "горн.", full: "горное дело" },
			gramm: { short: "грам.", full: "грамматика" },
			bus: { short: "бизн.", full: "деловая лексика" },
			grmyth: { short: "гр.миф.", full: "древнегреческая мифология" },
			rail: { short: "ж.-д.", full: "железнодорожный термин" },
			zool: { short: "зоол.", full: "зоология" },
			art: { short: "иск.", full: "искусство, эстетика" },
			hyst: { short: "ист.", full: "история" },
			hystjp: { short: "ист.яп.", full: "история Японии" },
			ichth: { short: "ихт.", full: "ихтиология" },
			"chn-hyst": { short: "история Китая", full: "кит.ист." },
			China: { short: "кит.", full: "Китай" },
			vidg: { short: "игр.", full: "компьютерные игры" },
			cond: { short: "конд.", full: "кондиционирование" },
			shipbuild: {
				short: "корабл.",
				full: "кораблестроение и судостроение, устройство корабля [судна]",
			},
			cosm: { short: "косм.", full: "космонавтика" },
			cryst: { short: "крист.", full: "кристаллография" },
			food: { short: "кул.", full: "кулинария" },
			kyūdō: { short: "кюдо", full: "кюдо" },
			ling: { short: "лингв.", full: "лингвистика" },
			lit: { short: "лит.", full: "литература" },
			logic: { short: "лог.", full: "логика" },
			mahj: { short: "мадж.", full: "маджонг" },
			math: { short: "мат.", full: "математика" },
			mech: { short: "машин.", full: "машиностроение" },
			med: { short: "мед.", full: "медицина" },
			metall: { short: "мет.", full: "металлургия" },
			met: { short: "метео", full: "метеорология, климат, погода" },
			mycol: { short: "микол.", full: "микология" },
			mineral: { short: "мин.", full: "минералогия" },
			myth: { short: "миф.", full: "мифология" },
			nav: { short: "мор.", full: "морской термин" },
			music: { short: "муз.", full: "музыка" },
			petroleum: { short: "нефт.пром.", full: "нефтепромысловое дело" },
			optics: { short: "опт.", full: "оптика" },
			ornith: { short: "орнит.", full: "орнитология" },
			paleo: { short: "палеонт.", full: "палеонтология" },
			pathol: { short: "патол.", full: "патология" },
			print: { short: "полигр.", full: "полиграфия, типография" },
			polit: { short: "полит.", full: "политика" },
			psych: { short: "псих.", full: "психология, психиатрия" },
			bee: { short: "пчел.", full: "пчеловодство" },
			radio: { short: "радио", full: "радио" },
			rlc: { short: "рлк", full: "радиолокация" },
			relig: { short: "рел.", full: "религия" },
			rhetor: { short: "ритор", full: "риторика" },
			fish: { short: "рыб.", full: "рыболовство" },
			gardn: { short: "сад.", full: "садоводство" },
			comm: { short: "свз.", full: "связь" },
			shogi: { short: "сёги", full: "сёги" },
			agric: { short: "с/х.", full: "сельское хозяйство" },
			Shinto: { short: "синт.", full: "синтоизм" },
			sports: { short: "спорт.", full: "спортивный термин" },
			stat: { short: "стат.", full: "статистика" },
			sumo: { short: "сумо", full: "сумо" },
			theatre: { short: "театр", full: "театр" },
			Jptheatre: { short: "театр.яп.", full: "театр Японии" },
			textile: { short: "текст.", full: "текстильная промышленность" },
			telec: { short: "телеком.", full: "телекоммуникации" },
			engr: { short: "тех.", full: "техника" },
			tradem: { short: "торг.", full: "торговый знак" },
			"chn-med": { short: "кит.мед.", full: "традиционная китайская медицина" },
			fantasy: { short: "фант.", full: "фантастика, фэнтези" },
			pharm: { short: "фарм.", full: "фармацевтика" },
			physics: { short: "физ.", full: "физика" },
			physiol: { short: "физиол.", full: "физиология" },
			phil: { short: "филос.", full: "философия" },
			finc: { short: "фин.", full: "финансы" },
			photo: { short: "фото", full: "фотография" },
			hanaf: { short: "ханафуда", full: "ханафуда" },
			chem: { short: "хим.", full: "химия" },
			Christn: { short: "христ.", full: "христианство" },
			paper: { short: "целл.бум.", full: "целлюлозно-бумажная промышленность" },
			chess: { short: "шахм.", full: "шахматы" },
			ecol: { short: "экол.", full: "экология" },
			econ: { short: "экон.", full: "экономика" },
			electr: { short: "элн.", full: "электроника" },
			elec: { short: "эл.", full: "электротехника" },
			embryo: { short: "эмбриол.", full: "эмбриология" },
			ent: { short: "энт.", full: "энтомология" },
			law: { short: "юр.", full: "юридический термин" },
			nucl: { short: "ядрн", full: "ядерная физика, ядерная энергия" },
		},
		misc: {
			ama: { short: "ама", full: "Диалект Амакуса" },
			ktb: { short: "кант.", full: "Диалект Канто" },
			kyb: { short: "киот.", full: "Диалект Киото" },
			kyu: { short: "кюсю", full: "Диалект Кюсю" },
			nab: { short: "наг.", full: "Диалект Нагано" },
			tsb: { short: "тоса", full: "Диалект Тоса" },
			thb: { short: "тох.", full: "Диалект Тохоку" },
			hob: { short: "хок.", full: "Диалект Хоккайдо" },
			tsug: { short: "цуг.", full: "Диалект Цугару" },
			ksb: { short: "канс.", full: "Кансайский диалект" },
			osb: { short: "ос.", full: "Осакский диалект" },
			rkb: { short: "рюкю", full: "Рюкюский язык (диалект)" },
			"net-sl": { short: "net-sl", full: "Internet slang" },
			arch: { short: "арх.", full: "архаизм" },
			wasei: { short: "васэй", full: "васэй" },
			pol: { short: "вежл.", full: "вежливое" },
			vulg: { short: "вульг.", full: "вульгарное" },
			X: { short: "18+", full: "грубое или пошлое" },
			chn: { short: "дет.", full: "детское" },
			yoji: { short: "ёдзи", full: "ёдзидзюкуго" },
			fem: { short: "жен.", full: "женское" },
			id: { short: "ид.", full: "идиома" },
			kigo: { short: "киго", full: "киго" },
			"kigo-spring": { short: "киго-весна", full: "киго-весна" },
			"kigo-winter": { short: "киго-зима", full: "киго-зима" },
			"kigo-summer": { short: "киго-лето", full: "киго-лето" },
			"kigo-autumn": { short: "киго-осень", full: "киго-осень" },
			literary: { short: "кн.", full: "книжное" },
			obsc: { short: "мал.изв.", full: "малоизвестное" },
			"m-sl": { short: "манга", full: "манга" },
			male: { short: "муж.", full: "мужское" },
			"male-sl": { short: "муж-сленг", full: "мужской сленг" },
			"unc-misc": { short: "некл.", full: "неклассифицированное" },
			sens: { short: "обид.", full: "обидное" },
			uk: { short: "об.к.", full: "обычно записывается каной" },
			"on-mim": { short: "оном.", full: "ономатопея" },
			derog: { short: "оск.", full: "оскорбительное" },
			figur: { short: "перен.", full: "переносное значение" },
			proverb: { short: "посл.", full: "пословица" },
			hon: { short: "почтит.", full: "почтительное" },
			poet: { short: "поэт.", full: "поэтичное" },
			col: { short: "разг.", full: "разговорное" },
			rare: { short: "редк.", full: "редкое" },
			court: {
				short: "придвор.",
				full: "секретный язык придворных дам периода Муромати",
			},
			hum: { short: "скром.", full: "скромное" },
			sl: { short: "сленг", full: "сленговое" },
			abbr: { short: "сокр.", full: "сокращение" },
			ek: { short: "тк", full: "только кана" },
			eK: { short: "тК", full: "только кандзи" },
			obs: { short: "уст.", full: "устаревшее" },
			fam: { short: "фам.", full: "фамильярное" },
			quote: { short: "цит.", full: "цитата" },
			joc: { short: "шутл.", full: "шутливое" },
			euph: { short: "эвф.", full: "эвфемизм" },
			epist: { short: "эпист.", full: "эпистолярный стиль" },
		},
		rinf,
		kinf: {
			ateji: {
				short: "атэдзи",
				full: "атэдзи (фонетическое использование кандзи)",
			},
			jK: {
				short: "дзк",
				full: "дзюкудзикун (подобранный по смыслу кандзи с нестандартным чтением)",
			},
			mK: { short: "ошиб", full: "неправильное, ошибочное написание" },
			io: { short: "н.ок.", full: "нестандартная запись окуриганы" },
			iK: { short: "△", full: "нестандартная/редкая запись кандзи" },
			oK: { short: "◇", full: "устаревшее написание, кюдзитай формы" },
		},
	},
	[MessagesNames.ArticleAbbr]: ["см.", "см. также", "ант.", "ср.", "сокр. от"],

	[MessagesNames.EditsType]: {
		[TypeVariant.New]: "новая",
		[TypeVariant.Edit]: "исправление",
		[TypeVariant.Delete]: "удаление",
		[TypeVariant.Transfer]: "перенос",
		[TypeVariant.Reverted]: "восстановлено",
	},
	[MessagesNames.EditsStatus]: {
		[StatusVariant.New]: "не проверено",
		[StatusVariant.Declined]: "отклонено",
		[StatusVariant.Accepted]: "принято",
		[StatusVariant.AutoAccepted]: "принято автоматически",
		[StatusVariant.Reverted]: "восстановлено",
	},
	[MessagesNames.EditsCreated]: "создано",

	[MessagesNames.EditsDictName]: [
		"яп-ру",
		"ру-яп",
		"кандзи",
		"имя",
		"яп-ру (авто)",
		"пример",
	],

	[MessagesNames.SearchOpenFull]: "открыть полную версию",
	[MessagesNames.SearchShowMore]: "показать детали",
	[MessagesNames.SearchShowLess]: "скрыть детали",

	[MessagesNames.UserWeekRating]: "рейтинг",
	[MessagesNames.UserSummaryNew]: "новых статей",
	[MessagesNames.UserSummaryEdit]: "исправлений",

	[MessagesNames.Statistics]: {
		added: "добавлено статей",
		verified: "исправлено статей",
	},

	[MessagesNames.ShowMore2]: "Раскрыть",
	[MessagesNames.ShowLess2]: "Свернуть",

	[MessagesNames.ShowMore]: "подробнее",
	[MessagesNames.ShowLess]: "скрыть",
	[MessagesNames.CopyLink]: "ссылка",
};
