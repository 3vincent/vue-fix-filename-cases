/* eslint-disable func-names */
const { readFile, writeFile } = require('fs').promises

const renameFileReferences = async (filename, filesToRename) => {
  let fileContent = ''

  try {
    fileContent = await readFile(filename, 'utf-8')
  } catch (error) {
    console.log(error)
  }

  filesToRename.forEach(item => {
    fileContent = fileContent.replaceAll(new RegExp(item.filename, 'g'), item.newFilename)
  })

  try {
    await writeFile(filename, fileContent, 'utf8')
  } catch (error) {
    console.log(error)
  }
}

module.exports = renameFileReferences
