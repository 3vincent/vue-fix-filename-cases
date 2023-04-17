const filenameHasUppercase = pathAndFilename => {
  const filename = pathAndFilename.slice(pathAndFilename.lastIndexOf('/') + 1)

  return filename.split('').some(char => char === char.toUpperCase() && char.match(/[A-Za-z]/))
}

module.exports = filenameHasUppercase
