const { readdirSync, existsSync } = require('fs')

function fileExists(path, file) {
  if (!existsSync(path)) return false
  const fileArray = readdirSync(path)
  const result = fileArray.filter(item => item == file)
  if (!result.includes(file)) return false
  return true
}
module.exports = fileExists
