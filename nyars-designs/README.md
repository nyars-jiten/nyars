# nyars — дизайн-макеты

Исходники артбордов с холста Design (claude.ai).

Каждый `.dc.html` — артборд формата Design Component: он работает на рантайме холста
(`support.js`, шаблоны `{{ }}`, `<sc-for>`, `<sc-if>`), поэтому как обычная веб-страница в браузере не откроется.
Разметку, CSS и данные из `renderVals()` можно копировать напрямую. `canvas.json` — раскладка холста.

Для картинок/PDF используйте на холсте Share → Export.

## Базовый вариант

- `project/Header.dc.html` — 00 · Шапка, способы ввода, фильтры
- `project/Main.dc.html` — 01 · Главная
- `project/Search.dc.html` — 03 · Поиск и токенизатор
- `project/Entry.dc.html` — 04a · Статья ЯРС
- `project/Kanji.dc.html` — 04b · Статья кандзи
- `project/SearchWord.dc.html` — 03b · Поиск по слову: несколько результатов
- `project/Editor.dc.html` — 05 · Редактор
- `project/Moderation.dc.html` — 06 · Очередь модерации
- `project/User.dc.html` — 02 · Профиль участника
- `project/Downloads.dc.html` — 07 · Загрузки
- `project/MobileSearch.dc.html` — Mobile · Поиск + рукописный ввод
- `project/MobileEntry.dc.html` — Mobile · Статья
- `project/MobileReview.dc.html` — Mobile · Проверка правки

## 5 направлений

- `project/SumiHome.dc.html` — A · Тушь — главная
- `project/SumiSearch.dc.html` — A · Тушь — поиск かける
- `project/MangaHome.dc.html` — B · Манга — главная
- `project/MangaSearch.dc.html` — B · Манга — поиск かける
- `project/MangaEntry.dc.html` — B · Манга — статья 結構
- `project/NeonHome.dc.html` — C · Неон — главная
- `project/NeonSearch.dc.html` — C · Неон — поиск かける
- `project/NeonEntry.dc.html` — C · Неон — статья 結構
- `project/UkiyoHome.dc.html` — D · Гравюра — главная
- `project/UkiyoSearch.dc.html` — D · Гравюра — поиск かける
- `project/UkiyoEntry.dc.html` — D · Гравюра — статья 結構
- `project/NoteHome.dc.html` — E · Тетрадь — главная
- `project/NoteSearch.dc.html` — E · Тетрадь — поиск かける
- `project/NoteEntry.dc.html` — E · Тетрадь — статья 結構

## Доработка A·B·D + F·G

- `project/SumiSearch2.dc.html` — A2 · Тушь — поиск かける (спокойнее, информативнее)
- `project/SumiEntry2.dc.html` — A2 · Тушь — статья 結構
- `project/MangaSearch2.dc.html` — B2 · Манга — поиск かける
- `project/MangaEntry2.dc.html` — B2 · Манга — статья 結構
- `project/UkiyoSearch2.dc.html` — D2 · Гравюра — поиск かける
- `project/UkiyoEntry2.dc.html` — D2 · Гравюра — статья 結構
- `project/EkiHome.dc.html` — F · Станция — главная
- `project/EkiSearch.dc.html` — F · Станция — поиск かける
- `project/EkiEntry.dc.html` — F · Станция — статья 結構
- `project/SashiHome.dc.html` — G · Сасико — главная
- `project/SashiSearch.dc.html` — G · Сасико — поиск かける
- `project/SashiEntry.dc.html` — G · Сасико — статья 結構

## Новые стили H–L

- `project/TenkoHome.dc.html` — H · Тэнкоку — главная
- `project/TenkoSearch.dc.html` — H · Тэнкоку — поиск かける
- `project/TenkoEntry.dc.html` — H · Тэнкоку — статья 結構 + тест длины
- `project/MeijiHome.dc.html` — I · Мэйдзи-типография — главная
- `project/MeijiSearch.dc.html` — I · Мэйдзи-типография — поиск かける
- `project/MeijiEntry.dc.html` — I · Мэйдзи-типография — статья 結構 + тест длины
- `project/RetroHome.dc.html` — J · Ретро-аниме 80–90-х — главная
- `project/RetroSearch.dc.html` — J · Ретро-аниме 80–90-х — поиск かける
- `project/RetroEntry.dc.html` — J · Ретро-аниме 80–90-х — статья 結構 + тест длины
- `project/ModernHome.dc.html` — K · Японский модернизм 60–70-х — главная
- `project/ModernSearch.dc.html` — K · Японский модернизм 60–70-х — поиск かける
- `project/ModernEntry.dc.html` — K · Японский модернизм 60–70-х — статья 結構 + тест длины
- `project/TeikokuHome.dc.html` — L · Имперская Япония — главная
- `project/TeikokuSearch.dc.html` — L · Имперская Япония — поиск かける
- `project/TeikokuEntry.dc.html` — L · Имперская Япония — статья 結構 + тест длины

## Палитра · G + A2

- `project/PalSheet.dc.html` — Палитры вокруг #B7C7F7 — токены и контраст
- `project/HzSearch.dc.html` — 1 · Поиск — Горизонтальная раскладка
- `project/HzEntry.dc.html` — 1 · Статья — Горизонтальная раскладка
- `project/VtSearch.dc.html` — 2 · Поиск — Вертикальная раскладка (татэгаки)
- `project/VtEntry.dc.html` — 2 · Статья — Вертикальная раскладка (татэгаки)
- `project/FrogSearch.dc.html` — 3 · Поиск — Стилизация: маскот-лягушка Кавадзу (subtle)
- `project/FrogEntry.dc.html` — 3 · Статья — Стилизация: маскот-лягушка Кавадзу (subtle)
- `project/CatSearch.dc.html` — 4 · Поиск — Стилизация: кошачьи мотивы nya (subtle)
- `project/CatEntry.dc.html` — 4 · Статья — Стилизация: кошачьи мотивы nya (subtle)
