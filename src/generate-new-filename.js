const generateNewFilename = pathAndFilename => {
  const filename = pathAndFilename.slice(pathAndFilename.lastIndexOf('/') + 1)

  const newFilename = filename
    .split('')
    .map(char => {
      if (char === char.toUpperCase() && char.match(/[A-Za-z]/)) {
        if (filename.indexOf(char) !== 0) return `-${char.toLowerCase()}`
        return char.toLowerCase()
      }
      return char
    })
    .join('')

  return newFilename
}

module.exports = generateNewFilename
