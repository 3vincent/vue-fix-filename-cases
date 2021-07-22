const { readdirSync } = require('fs')

function fileExists(path, file) {
  const fileArray = readdirSync(path)
  const result = fileArray.filter(item => item == file)
  if (result.includes(file)) return true
  return false
}
module.exports = fileExists
