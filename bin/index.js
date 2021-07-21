#! /usr/bin/env node

const { readFile, writeFile } = require('fs').promises
const { readdirSync, renameSync, existsSync } = require('fs')
const { paramCase } = require('change-case')
const logSymbols = require('log-symbols')

const filesToRename = [
  {
    original: {
      path: 'src/',
      filename: 'App.vue',
    },
    linkedFrom: {
      path: 'src/',
      filename: 'main.js',
    },
  },
  {
    original: {
      path: 'src/components/',
      filename: 'HelloWorld.vue',
    },
    linkedFrom: {
      path: 'src/views/',
      filename: 'Home.vue',
    },
  },
  {
    original: {
      path: 'src/views/',
      filename: 'About.vue',
    },
    linkedFrom: {
      path: 'src/router/',
      filename: 'index.js',
    },
  },
  {
    original: {
      path: 'src/views/',
      filename: 'Home.vue',
    },
    linkedFrom: {
      path: 'src/router/',
      filename: 'index.js',
    },
  },
]

const args = process.argv.slice(2, process.argv.length)
if (args.length == 0) {
  args.push('./')
}
if (args[0][args[0].length - 1] != '/') {
  args[0] += '/'
}
if (!existsSync(args[0])) {
  console.log('*** Error: The provided path does not exist!')
  console.log('*** Exiting...')
  process.exit(0)
}

const vueInstallationFiles = ['src/main.js', 'node_modules/vue/dist/vue.js']
vueInstallationFiles.forEach(file => {
  if (!existsSync(`${args[0]}${file}`)) {
    console.log(`*** Error: File ${file} not found`)
    console.log('*** Error: Please provide the path to your vue.js folder')
    console.log('*** EXAMPLE: $ vue-fix-filename-cases frontend/')
    console.log('*** Exiting...')
    process.exit(0)
  }
})

const vuejsRootFolder = args[0]

function fileExists(path, file) {
  const fileArray = readdirSync(path)
  const result = fileArray.filter(item => item == file)
  if (result.includes(file)) return true
  return false
}

function convertFileNameToKebabCase(filename) {
  const fileBody = paramCase(filename.substring(0, filename.lastIndexOf('.')))
  const fileEnding = filename.substring(filename.lastIndexOf('.')).toLowerCase()
  return `${fileBody}${fileEnding}`
}

async function renameFile(filename, location) {
  const newFilename = convertFileNameToKebabCase(filename)
  const oldFileLocation = `${vuejsRootFolder}${location}${filename}`
  const newFileLocation = `${vuejsRootFolder}${location}${newFilename}`
  console.log(logSymbols.info, `=> Renaming ${oldFileLocation} => ${newFileLocation}`)
  if (
    fileExists(`${vuejsRootFolder}${location}`, filename) &&
    !fileExists(`${vuejsRootFolder}${location}`, newFilename)
  ) {
    await renameSync(oldFileLocation, newFileLocation)
    if (fileExists(`${vuejsRootFolder}${location}`, newFilename))
      console.log(logSymbols.success, '..success renaming file!')
    return true
  }
  if (fileExists(`${vuejsRootFolder}${location}`, newFilename)) {
    console.log(logSymbols.error, `*** ERROR while renaming: New file already exists: ${newFileLocation}`)
    return false
  }
  console.log(logSymbols.error, `*** ERROR while renaming: File does not exist: ${oldFileLocation}`)
  return false
}

async function rewriteFilePaths(filename, linkedFromPath, linkedFromFile) {
  const newFilename = convertFileNameToKebabCase(filename)
  let data = ''

  const wholePath = `${vuejsRootFolder}${linkedFromPath}${linkedFromFile}`
  console.log(logSymbols.info, `=> Re-writing path in file ${wholePath}: ${filename} => ${newFilename}`)
  if (fileExists(`${vuejsRootFolder}${linkedFromPath}`, linkedFromFile)) {
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
    if (data != result) {
      try {
        await writeFile(wholePath, result, 'utf8')
        // console.log('\x1b[42m', 'written:', '\x1b[0m', `${linkedFromPath}${linkedFromFile}`)
      } catch (error) {
        console.log(error)
      }
      console.log(logSymbols.success, '..success re-writing file content!')
      return true
    }
    console.log(logSymbols.error, `*** ERROR while re-writing file content: nothing to rename`)
    return true
  }
  console.log(
    logSymbols.error,
    `*** ERROR while re-writing path: File does not exist: ${vuejsRootFolder}${linkedFromPath}${linkedFromFile}`
  )
  return false
}

async function rewriteVueFilesAndPaths() {
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of filesToRename) {
    await renameFile(file.original.filename, file.original.path)
    await rewriteFilePaths(file.original.filename, file.linkedFrom.path, file.linkedFrom.filename)
    console.log('')
  }
}

rewriteVueFilesAndPaths()
