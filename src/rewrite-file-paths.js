const { readFile, writeFile } = require('fs').promises
const logSymbols = require('log-symbols')

const convertFileNameToKebabCase = require('./convert-file-name-to-kebab-case')
const fileExists = require('./file-exists')

async function rewriteFilePaths(filename, linkedFromPath, linkedFromFile) {
  const newFilename = convertFileNameToKebabCase(filename)
  let data = ''
  const wholePath = `${linkedFromPath}${linkedFromFile}`
  console.log(logSymbols.info, `=> Re-writing path in file ${wholePath}: ${filename} => ${newFilename}`)
  if (!fileExists(`${linkedFromPath}`, linkedFromFile)) {
    console.log(
      logSymbols.error,
      `*** ERROR while re-writing file content: File does not exist: ${linkedFromPath}${linkedFromFile}`
    )
    return false
  }
  try {
    data = await readFile(wholePath, 'utf-8')
    // console.log('\x1b[42m', 'now reads file:', '\x1b[0m', `${linkedFromPath}${linkedFromFile}`)
  } catch (error) {
    console.log(error)
  }
  // console.log('\x1b[41m', 'read data: ', filename, '\x1b[0m', data)
  const regularExpr = new RegExp(filename, 'g')
  const result = data.replace(regularExpr, newFilename)
  // console.log('\x1b[45m', 'this will be written: ', '\x1b[0m', result)
  if (data == result) {
    console.log(logSymbols.error, `*** ERROR while re-writing file content: nothing to rename`)
    return false
  }
  try {
    await writeFile(wholePath, result, 'utf8')
    // console.log('\x1b[42m', 'written:', '\x1b[0m', `${linkedFromPath}${linkedFromFile}`)
  } catch (error) {
    console.log(error)
  }
  console.log(logSymbols.success, '..success re-writing file content!')
  return true
}

module.exports = rewriteFilePaths
