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
module.exports = filesToRename
