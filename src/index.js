const path = require('path')
const logSymbols = require('log-symbols')
const { existsSync } = require('fs')
const createFileList = require('./create-file-list')
const filenameHasUppercase = require('./filename-has-uppercase')
const generateNewFilename = require('./generate-new-filename')
const renameFile = require('./rename-file')
const renameFileReferences = require('./rename-file-reference')

const dryRun = false

async function rewriteVueFilesAndPaths() {
  let rootDirPath = ''

  if (process.argv[2]) {
    rootDirPath = path.resolve(process.argv[2])
    if (rootDirPath[rootDirPath.length - 1] !== '/') rootDirPath += '/'
  } else {
    console.log(logSymbols.error, '*** Error: Please provide an existing path')
    console.log(logSymbols.error, 'For example:  `npx vue-fix-filename-cases frontend/`')
    console.log(logSymbols.error, 'Or:           `npx vue-fix-filename-cases .`')
    process.exit(1)
  }

  if (!existsSync(rootDirPath)) {
    console.log(logSymbols.error, '*** Error: The provided path does not exist!')
    console.log(logSymbols.error, '*** Exiting...')
    process.exit(1)
  }

  const filesListAll = createFileList(rootDirPath, [])

  const filesToRename = []

  filesListAll.forEach(filenameAbsolutePath => {
    if (filenameHasUppercase(filenameAbsolutePath)) {
      const newFilename = generateNewFilename(filenameAbsolutePath)

      filesToRename.push({
        filenameAndPath: filenameAbsolutePath,
        filename: filenameAbsolutePath.slice(filenameAbsolutePath.lastIndexOf('/') + 1),
        newFilename,
        newFilenameAndPath: filenameAbsolutePath.slice(0, filenameAbsolutePath.lastIndexOf('/') + 1) + newFilename,
      })
    }
  })

  if (filesToRename.length === 0) {
    console.log(logSymbols.success, 'Nothing to rename')
    process.exit(0)
  }

  console.log(
    filesToRename.map(x => x.filenameAndPath),
    filesToRename.length
  )

  if (!dryRun) {
    // eslint-disable-next-line no-restricted-syntax
    for await (const filename of filesListAll) {
      await renameFileReferences(filename, filesToRename)
    }

    filesToRename.forEach(entry => {
      renameFile(entry)
    })
  }
}

module.exports = rewriteVueFilesAndPaths
