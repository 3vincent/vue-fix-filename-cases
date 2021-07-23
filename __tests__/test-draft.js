/* eslint-disable no-undef */
// const fs = require('fs')
// const { readdirSync } = require('fs')
const mock = require('mock-fs')
const fileExists = require('../src/file-exists')

// jest.mock('readdirSync')

describe('Testing if fileExists really checks if a file exists', () => {
  beforeEach(() => {
    mock({
      'mock-dir': {
        'App.vue': 'Example file content',
        'empty-dir': {
          /** empty directory */
        },
      },
      'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
      'some/other/path': {
        /** another empty directory */
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
