const filesToRename = require('./files-to-rename')
const renameFile = require('./rename-file')
const { findRootFolder } = require('./start-up-check')

const rewriteFilePaths = require('./rewrite-file-paths')

async function rewriteVueFilesAndPaths() {
  const vuejsRootFolder = await findRootFolder()
  console.log('nicht lustig: ', vuejsRootFolder)
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of filesToRename) {
    console.log('\n', '\x1b[42m', '\x1b[1m', '\x1b[37m', `> Handling: ${file.original.filename}`, '\x1b[0m')
    await renameFile(file.original.filename, `${vuejsRootFolder}${file.original.path}`)
    await rewriteFilePaths(
      file.original.filename,
      `${vuejsRootFolder}${file.linkedFrom.path}`,
      file.linkedFrom.filename
    )
  }
}

module.exports = rewriteVueFilesAndPaths
