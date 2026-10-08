import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  deinflectHint,
  headwordFontSize,
  isSearchableToken,
  tokenReading,
  toPhraseTokens,
} from './hz-search.ts'

function tok(partial: {
  surface: string
  base?: string
  furigana?: { word: string, kana: string }[]
  deinflect?: { target: string }[]
}) {
  return {
    surface: partial.surface,
    base: partial.base ?? '',
    furigana: partial.furigana ?? [],
    deinflect: (partial.deinflect ?? []).map(d => ({
      source: '',
      target: d.target,
      surface: '',
      rule: '',
    })),
    children: [],
  }
}

describe('headwordFontSize', () => {
  it('maps length buckets to px sizes from HzSearch', () => {
    assert.equal(headwordFontSize('蛙'), '36px')
    assert.equal(headwordFontSize('医者'), '36px')
    assert.equal(headwordFontSize('井蛙の見'), '31px')
    assert.equal(headwordFontSize('あいうえおかきく'), '26px')
    assert.equal(headwordFontSize('あいうえおかきくけこさし'), '23px')
    assert.equal(headwordFontSize('顔面筋疼痛機能不全症候群あ'), '21px') // 13+
  })
})

describe('isSearchableToken', () => {
  it('requires non-empty trimmed base', () => {
    assert.equal(isSearchableToken({ base: '言う' }), true)
    assert.equal(isSearchableToken({ base: '' }), false)
    assert.equal(isSearchableToken({ base: '  ' }), false)
  })
})

describe('tokenReading', () => {
  it('joins furigana kana', () => {
    assert.equal(tokenReading(tok({ surface: '医者', furigana: [{ word: '医', kana: 'い' }, { word: '者', kana: 'しゃ' }] })), 'いしゃ')
    assert.equal(tokenReading(tok({ surface: '、' })), '')
  })
})

describe('deinflectHint', () => {
  it('formats first deinflect target', () => {
    assert.equal(deinflectHint(tok({ surface: '言われ', deinflect: [{ target: '言う' }] })), '← 言う')
    assert.equal(deinflectHint(tok({ surface: '医者' })), '')
  })

  it('tolerates missing deinflect/furigana from API', () => {
    const bare = { surface: '猫', base: '猫' } as ReturnType<typeof tok>
    assert.equal(deinflectHint(bare), '')
    assert.equal(tokenReading(bare), '')
    const vms = toPhraseTokens([bare], { ruby: true, selectedIndex: -1 })
    assert.equal(vms[0]!.surface, '猫')
    assert.equal(vms[0]!.hint, '')
  })
})

describe('toPhraseTokens', () => {
  it('marks ph and selected', () => {
    const tokens = [
      tok({ surface: '医者', base: '医者', furigana: [{ word: '医者', kana: 'いしゃ' }] }),
      tok({ surface: '、' }),
    ]
    const vms = toPhraseTokens(tokens, { ruby: true, selectedIndex: 0 })
    assert.equal(vms[0]!.searchable, true)
    assert.equal(vms[0]!.selected, true)
    assert.equal(vms[0]!.ph, false)
    assert.equal(vms[0]!.reading, 'いしゃ')
    assert.equal(vms[1]!.ph, true)
    assert.equal(vms[1]!.searchable, false)
  })

  it('hides readings when ruby is false', () => {
    const tokens = [tok({ surface: '医者', base: '医者', furigana: [{ word: '医者', kana: 'いしゃ' }] })]
    const vms = toPhraseTokens(tokens, { ruby: false, selectedIndex: -1 })
    assert.equal(vms[0]!.reading, '')
  })
})
