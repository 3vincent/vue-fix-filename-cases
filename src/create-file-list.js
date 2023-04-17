const fs = require('fs')
const path = require('path')

const excludeFilesAndDirectories = [
  'node_modules',
  'README',
  'README.md',
  'LICENSE',
  '.gitignore',
  '.prettierrc',
  'package.json',
  'package-lock.json',
]

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath)

  let arrayOfProcessedFiles = arrayOfFiles || []

  files.forEach(file => {
    if (!file[0] !== '.' && !excludeFilesAndDirectories.includes(file)) {
      if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
        arrayOfProcessedFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles)
      } else {
        arrayOfProcessedFiles.push(path.join(dirPath, '/', file))
      }
    }
  })

  return arrayOfProcessedFiles
}

module.exports = getAllFiles
