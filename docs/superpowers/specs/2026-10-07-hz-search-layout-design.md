# HzSearch horizontal layout — design

**Date:** 2026-10-07  
**Source:** `nyars-designs/project/HzSearch.dc.html`, `canvas.json` (board «1 · Поиск — Горизонтальная раскладка»)  
**Status:** draft for review

## Intent

Replace the current Japanese search chrome (default sidebar layout + left result list + auto-open first entry) with the horizontal HzSearch layout: header search bar, phrase tokenization panel, filter sidebar, and result articles — using existing palette tokens and real search data.

## Decisions (approved)

| Topic | Choice |
|--------|--------|
| Scope | Full horizontal layout matching HzSearch |
| Filters | Full UI; wire what the backend supports; rest visible + disabled / «скоро» |
| Approach | New `hz` layout for `/dict/jpn*` only; rest of site keeps `default` |
| Fonts on `hz` | Manrope (UI), Zen Old Mincho (JP heads), Zen Maru Gothic (readings) |
| Entry page | Keep current entry UI inside `hz` chrome for v1; full HzEntry is out of scope |

## Architecture

### Layout

- Add `app/layouts/hz.vue`:
  - Logo seal «辞» + «nyars»
  - Underlined search field (2px `ink` border-bottom), transparent input
  - Icon buttons: 筆 (handwriting), 部 (radicals/components), 篩 (filters — scroll/open filters on small screens)
  - Nav: Кандзи, Правки, Скачать, auth/profile (reuse palette switcher)
  - No left site sidebar
- Set `layout: 'hz'` for `dict/jpn` parent and children (`index`, `[wid]`, editor/new as applicable under that tree)

### Routing / behavior

- Search with `?q=` renders on the search page: conversions (if any) + phrase panel + filters + results
- **Remove** auto-`navigateTo` to the first hit
- Selecting a result / «Открыть статью →» navigates to `/dict/jpn/:wid` (existing entry page, `hz` chrome)
- Token click runs search by token `base` (same idea as current `inlineSearch`)
- Handwriting + radical panels: existing components, restyled to fit `hz` header

### API (unchanged)

```
POST search { query, limit, offset } → JpnSearchResponse
  result, request, parsed, unitConversions, eraConversions, timings
```

No new filter query params until the backend supports them.

## UI mapping

### Phrase panel

- Surface panel with caption «Разбор фразы · N токенов»
- Tokens: reading (optional via «Чтения» toggle) / surface / deinflect hint when available
- Selected token uses `acc` / `onacc`
- Punctuation / tokens without searchable `base`: non-interactive «ph» style
- MWE underline when data allows; otherwise omit

### Filters sidebar

Render the full HzSearch filter groups:

- Sort, match mode, POS, JLPT, frequency range, tags, title length, toggles (examples / hide unverified / search translations)

**Working in v1:** only client-side UI state that does not require API (e.g. reset local filter UI).  
**Disabled:** controls that need server params — visible, `disabled`, short «скоро» affordance where helpful.  
Do not invent client-only filtering that pretends to be server search.

### Results

- Heading: «Результаты для {current token/query}»
- Dictionary tabs: «Японско-русский» active + count; other tabs (Кандзи, РЯ β, Спутники, Сканы) disabled without API
- Article card: scalable headword, alternate spellings, reading, tags (`tag` / `sec` / `ghost`), numbered senses, footer (source if available · Править · Открыть статью →)

### Visual system

- Use existing palette CSS variables (`bg`, `surf`, `ink`, `muted`, `line`, `acc`, `strong`, `soft`, `sec`, `secsoft`, `onacc`)
- Unit/era conversions: compact strip above or below the phrase panel

## Components (expected)

| Piece | Role |
|--------|------|
| `layouts/hz.vue` | Chrome |
| Search field + 筆/部/篩 in hz header | Adapt `Search` / drawing / component panels |
| Phrase tokenizer panel | New or rewrite of current parser strip in `dict/jpn.vue` |
| Filters aside | New presentational + local state |
| Result article | New Hz-styled card (can wrap/adapt `SearchResult` data) |
| `dict/jpn.vue` | Orchestrates search data, token selection, layout regions |

Prefer small focused Vue SFCs under `app/components/search/` (or `jpn/`) over one mega-template.

## Out of scope (v1)

- Full HzEntry article redesign
- Server-backed filters / facets
- Enabling other dictionary tabs with real data
- Replacing `default` layout site-wide
- Prototype-only palette bar from the DC file (site already has palette switcher)

## Testing / acceptance

Manual:

1. Long Japanese phrase → tokens render → toggle readings → click token → results update  
2. Empty / no hits messaging  
3. 筆 and 部 panels open without breaking header  
4. Palette switch updates surfaces  
5. Open article from result; back/search still in `hz`  
6. Disabled filters are visible but do not send fake API params  
7. No automatic jump to first result on search

## Success criteria

A user searching on `/dict/jpn?q=…` sees a page that matches HzSearch structure and palette language, with real parse + result data, without the old sidebar split or auto-open-first-entry behavior.
