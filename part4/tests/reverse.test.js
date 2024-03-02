const { test } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})

describe('can fetch blogs by id', () => {
  test('fetching 65e30564c6f25e83d960272d', () => {
    Blog.findById()
  })
})