const { existsSync } = require('fs')
const logSymbols = require('log-symbols')

function findRootFolder() {
  const args = process.argv.slice(2, process.argv.length)
  if (args.length == 0) {
    args.push('./')
  }
  if (args[0][args[0].length - 1] != '/') {
    args[0] += '/'
  }
  if (!existsSync(args[0])) {
    console.log(logSymbols.error, '*** Error: The provided path does not exist!')
    console.log(logSymbols.error, '*** Exiting...')
    process.exit(0)
  }

  const vueInstallationFiles = ['src/main.js', 'node_modules/vue/dist/vue.js']
  vueInstallationFiles.forEach(file => {
    if (!existsSync(`${args[0]}${file}`)) {
      console.log(logSymbols.error, `*** Error: File ${file} not found`)
      console.log(logSymbols.error, '*** Error: Please provide the path to your vue.js folder')
      console.log(logSymbols.error, '*** EXAMPLE: $ vue-fix-filename-cases frontend/')
      console.log(logSymbols.error, '*** Exiting...')
      process.exit(0)
    }
  })

  return args[0]
}

module.exports.findRootFolder = findRootFolder
