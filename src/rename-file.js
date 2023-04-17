const { renameSync } = require('fs')

const renameFile = data => {
  renameSync(data.filenameAndPath, data.newFilenameAndPath)

  return data.newFilenameAndPath
}

module.exports = renameFile
