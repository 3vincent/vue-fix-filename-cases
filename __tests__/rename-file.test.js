/* eslint-disable no-undef */
const mock = require('mock-fs')
const renameFile = require('../src/rename-file')

describe('Testing if renameFile renames files reliably', () => {
  beforeEach(() => {
    mock({
      'mock-dir': {
        'HelloWorld.vue': 'Example file content',
        'ThisFileExists.js': 'Example file content',
        'this-file-exists.js': 'Example file content',
        'RenameMeUntilIDontExist.js': 'Example file content',
      },
    })
  })
  afterEach(mock.restore)

  it('Test renaming of file', async () => {
    const result = await renameFile('HelloWorld.vue', 'mock-dir/')
    expect(result).toBe(true)
  })
  it('Test renaming of file that already exists', async () => {
    const result = await renameFile('ThisFileExists.js', 'mock-dir/')
    expect(result).toBe(false)
  })
  it('Test renaming of file that does not exists', async () => {
    const result = await renameFile('not-existing-file.js', 'mock-dir/')
    expect(result).toBe(false)
  })
  it('Test test if file really exists after renaming it', async () => {
    const result = await renameFile('RenameMeUntilIDontExist.js', 'mock-dir/')
    expect(result).toBe(false)
  })
  it('Test test if file really exists after renaming it', async () => {
    const result = await renameFile('RenameMeUntilIDontExist.js', 'mock-dir/')
    expect(renameFile).toHaveBeenCalled()
  })
  // it('Test for the absence of a file', () => {
  //   const result = fileExists('mock-dir/', 'main.js')
  //   expect(result).toBe(false)
  // })
  // it('Read empty directory', () => {
  //   const result = fileExists('non-existing-dir/', 'index.js')
  //   expect(result).toBe(false)
  // })
})
