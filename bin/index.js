#! /usr/bin/env node

const { readFile, writeFile } = require('fs').promises
const { readdirSync, renameSync, existsSync } = require('fs')

const filesToRename = [
  {
    origName: 'App.vue',
    newName: 'app.vue',
    directory: 'src/',
    linkedFrom: ['src/main.js'],
  },
  {
    origName: 'HelloWorld.vue',
    newName: 'hello-world.vue',
    directory: 'src/components/',
    linkedFrom: ['src/views/Home.vue'],
  },
  {
    origName: 'About.vue',
    newName: 'about.vue',
    directory: 'src/views/',
    linkedFrom: ['src/router/index.js'],
  },
  {
    origName: 'Home.vue',
    newName: 'home.vue',
    directory: 'src/views/',
    linkedFrom: ['src/router/index.js'],
  },
]

const args = process.argv.slice(2, process.argv.length)
if (args.length == 0) {
  console.log('*** Error: Please provide the path to your vue.js folder')
  console.log('*** Exiting...')
  process.exit(0)
}

if (args[0][args[0].length - 1] != '/') {
  args[0] += '/'
}
if (!existsSync(args[0])) {
  console.log('*** Error: The provided path does not exist!')
  console.log('*** Exiting...')
  process.exit(0)
}

const vuejsRootFolder = args[0]

function fileExists(path, file) {
  const fileArray = readdirSync(path)
  const result = fileArray.filter(item => item == file)
  if (result.includes(file)) return true
  return false
}

async function renameFile(oldFileName, newFileName, location) {
  const oldFileLocation = `${vuejsRootFolder}${location}${oldFileName}`
  const newFileLocation = `${vuejsRootFolder}${location}${newFileName}`
  console.log(`### Renaming ${oldFileLocation} => ${newFileLocation}`)
  if (
    fileExists(`${vuejsRootFolder}${location}`, oldFileName) &&
    !fileExists(`${vuejsRootFolder}${location}`, newFileName)
  ) {
    await renameSync(oldFileLocation, newFileLocation)
    if (fileExists(`${vuejsRootFolder}${location}`, newFileName)) console.log('..Success!')
    return true
  }
  if (fileExists(`${vuejsRootFolder}${location}`, newFileName)) {
    console.log(`*** ERROR: New file already exists: ${newFileLocation}`)
    return false
  }
  console.log(`*** ERROR: File does not exist: ${oldFileLocation}`)
  return false
}

async function rewriteFilePaths(oldFileName, newFileName, linkedFrom) {
  const wholePath = `${vuejsRootFolder}${linkedFrom}`
  console.log(`### Rewriting path in file ${wholePath}: ${oldFileName} => ${newFileName}`)
  let data = ''
  try {
    data = await readFile(wholePath, 'utf-8')
    console.log('\x1b[42m', 'now reads file:', '\x1b[0m', linkedFrom)
  } catch (error) {
    console.log(error)
  }
  console.log('\x1b[41m', 'read data: ', oldFileName, '\x1b[0m', data)
  const regularExpr = new RegExp(oldFileName, 'g')
  const result = data.replace(regularExpr, newFileName)
  console.log('\x1b[45m', 'this will be written: ', '\x1b[0m', result)

  try {
    await writeFile(wholePath, result, 'utf8')
    console.log('\x1b[42m', 'written:', '\x1b[0m', linkedFrom)
  } catch (error) {
    console.log(error)
  }
}

async function rewriteVueFilesAndPaths() {
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of filesToRename) {
    await renameFile(file.origName, file.newName, file.directory)
    await rewriteFilePaths(file.origName, file.newName, file.linkedFrom)
    console.log('')
  }
}

rewriteVueFilesAndPaths()
