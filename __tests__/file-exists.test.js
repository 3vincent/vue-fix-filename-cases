/* eslint-disable no-undef */
const mock = require('mock-fs')
const fileExists = require('../src/file-exists')

describe('Testing if fileExists really checks if a file exists', () => {
  beforeEach(() => {
    mock({
      'mock-dir': {
        'App.vue': 'Example file content',
      },
    })
  })
  afterEach(mock.restore)

  it('Test for the existance of a file', () => {
    const result = fileExists('mock-dir/', 'App.vue')
    expect(result).toBe(true)
  })
  it('Test for the absence of a file', () => {
    const result = fileExists('mock-dir/', 'main.js')
    expect(result).toBe(false)
  })
  it('Read empty directory', () => {
    const result = fileExists('non-existing-dir/', 'index.js')
    expect(result).toBe(false)
  })
})
