/* eslint-disable no-undef */
const convertFileNameToKebabCase = require('../src/convert-file-name-to-kebab-case')

describe('Test converting file names to kebab-case', () => {
  it('FileName should be renamed to kebab-case', () => {
    const result = convertFileNameToKebabCase('HelloWorld.vue')

    expect(result).toBe('hello-world.vue')
  })
})
