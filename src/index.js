const filesToRename = require('./files-to-rename')
const renameFile = require('./rename-file')
const { findRootFolder } = require('./start-up-check')

const rewriteFilePaths = require('./rewrite-file-paths')

async function rewriteVueFilesAndPaths() {
  const vuejsRootFolder = findRootFolder()
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of filesToRename) {
    await renameFile(file.original.filename, `${vuejsRootFolder}${file.original.path}`)
    await rewriteFilePaths(
      file.original.filename,
      `${vuejsRootFolder}${file.linkedFrom.path}`,
      file.linkedFrom.filename
    )
    console.log('')
  }
}

module.exports = rewriteVueFilesAndPaths
