const { paramCase } = require('change-case')

function convertFileNameToKebabCase(filename) {
  const fileBody = paramCase(filename.substring(0, filename.lastIndexOf('.')))
  const fileEnding = filename.substring(filename.lastIndexOf('.')).toLowerCase()
  return `${fileBody}${fileEnding}`
}
module.exports = convertFileNameToKebabCase
