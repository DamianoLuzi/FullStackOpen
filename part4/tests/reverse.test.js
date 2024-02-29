const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
	const result = reverse('a')
	assert.strictEquals(result, 'a')
})

test('reverse of react', () => {
	const result = reverse('react')
	assert.strictEquals(result, 'tcaer')
})

test(
	'reverse of obrigadissimo', () => {
		const result = reverse('obrigadissimo')
		assert.strictEquals(result, 'omissidagirbo')
	}
)