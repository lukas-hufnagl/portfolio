import { describe, expect, it } from 'vitest'
import { formatList, formatSentenceList } from './text'

describe('formatList', () => {
  it('joins with commas and a final "and"', () => {
    expect(formatList([])).toBe('')
    expect(formatList(['Fitness'])).toBe('Fitness')
    expect(formatList(['Fitness', 'Music'])).toBe('Fitness and Music')
    expect(formatList(['Fitness', 'Music', 'Cutting'])).toBe('Fitness, Music and Cutting')
  })
})

describe('formatSentenceList', () => {
  it('capitalises only the first word', () => {
    expect(formatSentenceList(['fitness', 'music', 'cutting videos'])).toBe(
      'Fitness, music and cutting videos'
    )
    expect(formatSentenceList([])).toBe('')
  })
})
