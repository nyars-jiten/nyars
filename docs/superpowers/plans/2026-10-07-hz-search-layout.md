# HzSearch Horizontal Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the HzSearch horizontal search UI on `/dict/jpn*` via a dedicated `hz` layout, with real parse/results data and no auto-open-first-entry.

**Architecture:** New `layouts/hz.vue` chrome (logo, underlined search, 筆/部/篩, nav) only for Japanese dict routes. `dict/jpn.vue` orchestrates phrase panel + filters aside + result list. Pure display helpers live in `shared/` and are unit-tested with `node --test`. Search API stays `{ query, limit, offset }`.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, Tailwind v4 + existing palette tokens, `@nuxt/fonts`, Pinia search store, existing `useSearch` / DrawingPanel / ComponentPanel.

**Spec:** `docs/superpowers/specs/2026-10-07-hz-search-layout-design.md`

## Global Constraints

- Only `/dict/jpn*` uses layout `hz`; do not change `default` for the rest of the site.
- Do not add search filter query params or pretend client-side filtering is server search.
- Do not redesign the entry page (HzEntry out of scope); entry stays current UI inside `hz` chrome.
- Reuse palette CSS variables (`bg`, `surf`, `ink`, `muted`, `line`, `acc`, `onacc`, `strong`, `soft`, `sec`, `secsoft`).
- Fonts on `hz`: Manrope (UI), Zen Old Mincho (JP heads), Zen Maru Gothic (readings).
- Commits: Conventional Commits; only when the human asks or the execution skill requires per-task commits — never skip hooks.

## Review Focus

- Empty `parsed` / punctuation-only tokens: phrase panel still renders; non-searchable tokens are not clickable.
- Search with zero hits: show empty state; do not navigate away.
- Token click with empty `base`: ignored (ph style).
- Opening `/dict/jpn/:wid` without `q`: `hz` chrome works; results section absent or idle.
- Filter controls: visible, disabled where unsupported; resetting UI does not call `search` with fake params.

## File structure

| File | Responsibility |
|------|----------------|
| `nuxt.config.ts` | Register Manrope + Zen fonts |
| `app/assets/css/hz.css` | Hz-scoped utility classes (`.hz`, `.hz-jp`, `.hz-jm`, chips/tags/tabs) |
| `app/layouts/hz.vue` | Horizontal chrome + slot |
| `app/components/search/hz-search-bar.vue` | Underlined input + 筆/部/篩 + panels |
| `app/components/search/hz-phrase-panel.vue` | Token strip + readings toggle |
| `app/components/search/hz-filters.vue` | Filter aside (mostly disabled) |
| `app/components/search/hz-result-card.vue` | One result article |
| `app/components/search/hz-dict-tabs.vue` | Dictionary tabs |
| `shared/hz-search.ts` | Pure helpers: headword size, token view-models, deinflect label |
| `shared/hz-search.test.ts` | Node tests for helpers |
| `app/pages/dict/jpn.vue` | Wire layout regions; remove auto-navigate |
| `app/pages/dict/jpn/**` | `definePageMeta({ layout: 'hz' })` where needed (parent meta may inherit — verify) |

---

### Task 1: Fonts + Hz CSS shell

**Files:**
- Modify: `nuxt.config.ts` (fonts.families)
- Create: `app/assets/css/hz.css`
- Modify: `app/assets/css/tailwind.css` (import hz.css)

**Interfaces:**
- Consumes: existing palette vars
- Produces: classes usable under `.hz` — `.hz-jp`, `.hz-jm`, `.hz-chip`, `.hz-tag`, `.hz-tag-sec`, `.hz-tag-ghost`, `.hz-tab`, `.hz-tab-on`, `.hz-cap`, `.hz-ibtn`

- [ ] **Step 1: Add font families in `nuxt.config.ts`**

Add Manrope (latin/cyrillic), Zen Old Mincho (japanese), Zen Maru Gothic (japanese) alongside existing Exo 2 / Noto Sans JP.

- [ ] **Step 2: Create `app/assets/css/hz.css` and import it from `tailwind.css`**

Scope decorative utilities under `.hz` so `default` layout is unaffected. Map colors to `var(--palette-*)` / Tailwind theme colors already defined.

- [ ] **Step 3: Smoke-check prepare**

Run: `.\node_modules\.bin\nuxt prepare`  
Expected: exit 0

- [ ] **Step 4: Commit** (if execution mode requires per-task commits)

```bash
git add nuxt.config.ts app/assets/css/hz.css app/assets/css/tailwind.css
git commit -m "feat(hz): add fonts and scoped search UI styles"
```

---

### Task 2: Pure display helpers (TDD)

**Files:**
- Create: `shared/hz-search.ts`
- Create: `shared/hz-search.test.ts`
- Modify: `package.json` scripts.test to also run `shared/hz-search.test.ts` (or a glob)

**Interfaces:**
- Consumes: `Token` shape from `app/types/models/jpn/search.ts` (`surface`, `furigana`, `base`, `deinflect`)
- Produces:
  - `headwordFontSize(word: string): string` — px sizes: ≤2→36, ≤4→31, ≤8→26, ≤12→23, else 21 (from HzSearch)
  - `isSearchableToken(token: Pick<Token,'base'>): boolean` — true when `base` is non-empty after trim
  - `tokenReading(token: Token): string` — join furigana kana (or empty)
  - `deinflectHint(token: Token): string` — e.g. `← ${deinflect[0].target}` when present, else `''`
  - `toPhraseTokens(tokens: Token[], opts: { ruby: boolean; selectedIndex: number }): PhraseTokenVm[]` where `PhraseTokenVm = { surface, reading, hint, searchable, selected, ph }`

- [ ] **Step 1: Write failing tests in `shared/hz-search.test.ts`**

Cover: font-size buckets; empty base → not searchable; reading join; deinflect hint; `toPhraseTokens` sets `ph`/`selected`.

- [ ] **Step 2: Run tests — expect FAIL**

Run: `node --experimental-strip-types --test shared/hz-search.test.ts`  
Expected: FAIL (module missing)

- [ ] **Step 3: Implement `shared/hz-search.ts`**

- [ ] **Step 4: Run tests — expect PASS**

Run: `node --experimental-strip-types --test shared/hz-search.test.ts`  
Expected: all pass

- [ ] **Step 5: Commit** (if required)

```bash
git add shared/hz-search.ts shared/hz-search.test.ts package.json
git commit -m "feat(hz): add phrase/result display helpers"
```

---

### Task 3: `hz` layout chrome

**Files:**
- Create: `app/layouts/hz.vue`
- Modify: `app/pages/dict/jpn.vue` — `definePageMeta({ layout: 'hz' })` (and children if meta does not inherit)

**Interfaces:**
- Consumes: `ProfileMenu` (palette), route names `edits`, `downloads`, tags/kanji as available
- Produces: layout wrapping `<slot />` with header row; provides optional `hzFiltersOpen` via `provide`/`inject` or a tiny `useHzChrome()` composable for 篩 → scroll/open filters

- [ ] **Step 1: Create `app/layouts/hz.vue`**

Structure match HzSearch header: seal + brand, flex search slot area (placeholder `<slot name="search">` or embed `HzSearchBar` once Task 4 exists — if Task 4 not done, temporary stub input is OK then replace), nav links, `ProfileMenu`. Root: `class="hz min-h-dvh bg-bg text-ink"`.

- [ ] **Step 2: Point `dict/jpn` tree at `layout: 'hz'`**

Verify in browser/devtools that `/dict/jpn` no longer shows default sidebar.

- [ ] **Step 3: Commit** (if required)

```bash
git add app/layouts/hz.vue app/pages/dict/jpn.vue app/pages/dict/jpn/**/*.vue
git commit -m "feat(hz): add horizontal layout for dict/jpn"
```

---

### Task 4: Hz search bar (筆 / 部 / 篩)

**Files:**
- Create: `app/components/search/hz-search-bar.vue`
- Modify: `app/layouts/hz.vue` — mount bar in header
- Optionally thin: reuse logic from `app/components/search/search.vue` (store `searchQuery`, `push`, panels)

**Interfaces:**
- Consumes: `useSearchStore().searchQuery` / `push`, `DrawingPanel`, `ComponentPanel`, `useHzChrome` filter open
- Produces: component with underlined `<input type="search">`, buttons 筆/部/篩; Enter → `push()`

- [ ] **Step 1: Implement `hz-search-bar.vue`**

Visual: bottom border 2px ink; transparent field; `.hz-jp` on input; icon buttons `.hz-ibtn`. Wire handwriting + radical panels like current `Search.vue` (`useToggle`, `onClickOutside`).

- [ ] **Step 2: Mount in `hz.vue`; remove dependency on default layout Search for these routes**

- [ ] **Step 3: Manual check**

Visit `/dict/jpn`, type query, Enter → URL has `?q=`; 筆/部 open panels.

- [ ] **Step 4: Commit** (if required)

```bash
git add app/components/search/hz-search-bar.vue app/layouts/hz.vue
git commit -m "feat(hz): underlined search bar with draw and radical tools"
```

---

### Task 5: Phrase panel

**Files:**
- Create: `app/components/search/hz-phrase-panel.vue`

**Interfaces:**
- Consumes: `tokens: Token[]`, `modelValue` selected index (`defineModel<number>`), emit select; uses `toPhraseTokens` from `#shared/hz-search`
- Produces: panel UI; `@select` / `update:modelValue` when searchable token clicked; local `ruby` toggle default `true`

- [ ] **Step 1: Implement `hz-phrase-panel.vue`**

Caption «Разбор фразы · N токенов»; «Чтения» chip; token buttons with reading/surface/hint; `ph` disabled.

- [ ] **Step 2: Unit sanity** — helpers already cover VM; optional mount not required without Vue test utils.

- [ ] **Step 3: Commit** (if required)

```bash
git add app/components/search/hz-phrase-panel.vue
git commit -m "feat(hz): phrase tokenization panel"
```

---

### Task 6: Filters aside (disabled UI)

**Files:**
- Create: `app/components/search/hz-filters.vue`

**Interfaces:**
- Consumes: optional `id="hz-filters"` for scroll targeting from 篩
- Produces: full filter groups from HzSearch markup; all server-dependent controls `disabled`; «Сбросить» resets only local UI refs (sort select, chip pressed states, ranges) without calling search API

- [ ] **Step 1: Implement presentational filters matching HzSearch groups**

Use `.hz-cap`, `.hz-chip`, palette borders. Mark disabled groups with `title="скоро"` or small muted label.

- [ ] **Step 2: Confirm no `useSearch().search` / store `push` from this component**

- [ ] **Step 3: Commit** (if required)

```bash
git add app/components/search/hz-filters.vue
git commit -m "feat(hz): search filters aside UI (disabled pending API)"
```

---

### Task 7: Result card + dictionary tabs

**Files:**
- Create: `app/components/search/hz-result-card.vue`
- Create: `app/components/search/hz-dict-tabs.vue`

**Interfaces:**
- Consumes: `EntryJp` for card; `count: number` for JR tab
- Produces:
  - `HzResultCard` — link to `{ name: 'dict-jpn-wid', params: { wid }, query: { q } }`; headword size via `headwordFontSize`; senses shortened like current SearchResult (first ≤5 non-rare); tags from entry/sense field tags mapped to `.hz-tag` / sec / ghost where obvious
  - `HzDictTabs` — JR active + count; others disabled

- [ ] **Step 1: Implement `hz-dict-tabs.vue`**

- [ ] **Step 2: Implement `hz-result-card.vue`**

Footer: «Править» (editor route if user can edit — else hide or keep link pattern from existing UI) · «Открыть статью →».

- [ ] **Step 3: Commit** (if required)

```bash
git add app/components/search/hz-result-card.vue app/components/search/hz-dict-tabs.vue
git commit -m "feat(hz): search result cards and dictionary tabs"
```

---

### Task 8: Wire `dict/jpn.vue` + remove auto-navigate

**Files:**
- Modify: `app/pages/dict/jpn.vue` (major)
- Modify: `app/pages/dict/jpn/index.vue` if needed (empty placeholder when no `q`)
- Keep: `app/pages/dict/jpn/[wid]/index.vue` as entry content under NuxtPage when on wid route

**Interfaces:**
- Consumes: Tasks 5–7 components; `useSearch`; `useSearchStore`; helpers
- Produces: When `route.query.q` set and route is search list view: conversions + phrase + filters + results. When on `dict-jpn-wid`: show `<NuxtPage />` (entry) — decide layout: either results+entry side-by-side is **removed** per spec (results page vs entry page). Spec: click navigates to wid; so on wid route render entry only (plus optional small «back to results» if `q` present).

**Critical behavior change:**
- Delete `updateEntry` auto-`navigateTo` first hit and its watchers that only existed for that purpose.

- [ ] **Step 1: Rewrite template regions to HzSearch structure**

`max-width` wrap ~1320px; phrase panel; flex filters + main results.

- [ ] **Step 2: Token select → `inlineSearch(base)` + keep `parsed` from latest full query response**

Same data merge pattern as current `inlineSearch` (preserve `parsed` from original phrase response).

- [ ] **Step 3: Verify no auto navigation**

Search a common word; stay on list; click card → wid page.

- [ ] **Step 4: Run helper tests**

Run: `pnpm test` (or node test both shared tests)  
Expected: all pass

- [ ] **Step 5: Commit** (if required)

```bash
git add app/pages/dict/jpn.vue app/pages/dict/jpn/index.vue
git commit -m "feat(hz): compose horizontal search page without auto-open"
```

---

### Task 9: Acceptance pass

**Files:** none required unless fixes

- [ ] **Step 1: Manual checklist from spec**

1. Long phrase → tokens → toggle readings → click token → results update  
2. No hits messaging  
3. 筆 / 部 panels  
4. Palette switch  
5. Open article; still `hz`  
6. Filters disabled, no fake API params  
7. No auto jump to first result  

- [ ] **Step 2: Fix any regressions found; re-run `shared/*.test.ts`**

- [ ] **Step 3: Final commit** (if required)

```bash
git add -A
git commit -m "fix(hz): polish search layout acceptance issues"
```

---

## Self-review notes

- Spec coverage: layout, routing, phrase, filters, results, fonts/tokens, out-of-scope respected, acceptance mapped to Task 9.
- Auto-navigate removal explicitly Task 8.
- Review Focus cases covered by Tasks 2, 6, 8, 9.
