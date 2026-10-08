import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  cookieToPalette,
  PALETTE_IDS,
  paletteToCookie,
  paletteToTheme,
} from './palette.ts'

describe('palette cookie codec', () => {
  it('maps legacy light (0) to washi and dark (1) to indigo', () => {
    assert.equal(cookieToPalette(0), 'washi')
    assert.equal(cookieToPalette(1), 'indigo')
    assert.equal(cookieToPalette('0'), 'washi')
    assert.equal(cookieToPalette('1'), 'indigo')
  })

  it('round-trips all palette ids', () => {
    for (const id of PALETTE_IDS) {
      assert.equal(cookieToPalette(paletteToCookie(id)), id)
    }
  })

  it('falls back to indigo for missing or unknown values', () => {
    assert.equal(cookieToPalette(99), 'indigo')
    assert.equal(cookieToPalette(undefined), 'indigo')
    assert.equal(cookieToPalette(null), 'indigo')
    assert.equal(cookieToPalette('nope'), 'indigo')
  })

  it('treats only indigo as dark', () => {
    assert.equal(paletteToTheme('indigo'), 'dark')
    assert.equal(paletteToTheme('washi'), 'light')
    assert.equal(paletteToTheme('cold'), 'light')
    assert.equal(paletteToTheme('sakura'), 'light')
  })
})
