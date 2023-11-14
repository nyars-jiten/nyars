# NYARS THE DICTIONARY

[![Discord](https://img.shields.io/discord/564319699152666624?style=for-the-badge&label=Discord%20server)](https://discord.gg/u7H5nsPWVB)

![Downdetector](https://img.shields.io/website?style=for-the-badge&url=https%3A%2F%2Fnyars.org%2F)

## Development

[Icons from](https://icones.js.org/collection/ic)

## Nuxt                              

##### DevTools (in the browser):

press `Shift + Alt + D` in the browser

##### Installation:

```bash
$ pnpm i
```
##### Dev server:

```bash
$ pnpm dev
```

##### After run dev server:

| What            | Url                              |
|-----------------|----------------------------------|
| main page       | http://localhost:8080/           |
| tailwind styles | http://localhost:8080/_tailwind/ |

##### Upgrade:

```properties
$ npx nuxi upgrade
```
**NB!** Don't use this for upgrading: <span style="color:red">pnpm up -D nuxt</span>

##### Check ts errors:

```properties
$ npx nuxi typecheck
```

<details>
  <summary>Possible problems:</summary>
  
  #### Cannot find name 'defineNuxtConfig'.ts(2304)

  Delete the `node_modules` folder and do:
  
  ```bash
  $ pnpm i
  ```
  Then `F1 + Volar: Restart Vue server`

  #### [Vue Router warn]: No match found for location with path "/_tailwind/"
  
  Probably just ignore this for now, tailwind viewer page still works fine with this warning, but impossible view this page from nuxt devtools ("404 not found"). Check this [issue](https://github.com/nuxt-modules/tailwindcss/issues/459). 
</details>
