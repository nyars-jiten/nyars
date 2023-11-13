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
##### Upgrade:

```properties
$ npx nuxi upgrade
```
**NB!** Don't use this for upgrading: <span style="color:red">pnpm up -D nuxt</span>

##### Check ts errors:

```properties
$ npx nuxi typecheck
```

<details open>
  <summary>Possible problems</summary>
  
  #### Cannot find name 'defineNuxtConfig'.ts(2304)

  Delete the `node_modules` folder and do:
  
  ```bash
  $ pnpm i
  ```
  Then `F1 + Volar: Restart Vue server`
</details>
