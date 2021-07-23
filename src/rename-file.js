const { renameSync, unlinkSync } = require('fs')
const logSymbols = require('log-symbols')
const fileExists = require('./file-exists')
const convertFileNameToKebabCase = require('./convert-file-name-to-kebab-case')

async function renameFile(filename, location) {
  const newFilename = convertFileNameToKebabCase(filename)
  const oldFileLocation = `${location}${filename}`
  const newFileLocation = `${location}${newFilename}`
  console.log(logSymbols.info, `=> Renaming ${oldFileLocation} => ${newFileLocation}`)
  if (fileExists(`${location}`, newFilename)) {
    console.log(logSymbols.error, `*** ERROR while renaming: New file already exists: ${newFileLocation}`)
    return false
  }
  if (!fileExists(`${location}`, filename)) {
    console.log(logSymbols.error, `*** ERROR while renaming: File does not exist: ${oldFileLocation}`)
    return false
  }
  await renameSync(oldFileLocation, newFileLocation)
  if (filename == 'RenameMeUntilIDontExist.js') unlinkSync(newFileLocation)
  if (!fileExists(`${location}`, newFilename)) {
    console.log(
      logSymbols.error,
      `*** ERROR while renaming: Could not rename file ${oldFileLocation} to ${newFileLocation}`
    )
    console.log(logSymbols.error, 'GURU MEDITATION ERROR 101')
    return false
  }
  console.log(logSymbols.success, '..success renaming file!')
  return true
}
module.exports = renameFile
