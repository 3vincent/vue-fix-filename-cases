/* eslint-disable no-undef */
const mock = require('mock-fs')
const { existsSync } = require('fs')
const rewriteVueFilesAndPaths = require('../src/index')

describe('Testing full run of the app from startup', () => {
  beforeEach(() => {
    mock({
      src: {
        'App.vue': 'Example file content',
        'main.js': 'App.vue',
        components: {
          'HelloWorld.vue': 'Example file Content',
        },
        views: {
          'Home.vue': 'HelloWorld.vue',
          'About.vue': 'Example file content',
        },
        router: {
          'index.js': 'About.vue Home.vue',
        },
      },
      node_modules: {
        vue: {
          dist: {
            'vue.js': 'Example file content',
          },
        },
      },
    })
  })
  afterEach(mock.restore)

  // it('normal startup', async () => {
  //   await rewriteVueFilesAndPaths()
  //   const result = await existsSync('src/views/home.vue')
  //   expect(result).toBe(true)
  // })
  process.argv = ['node', 'jest', 'foo', 'bar', 'foo2', 'bar2']
  it('startup with mocked argv workdir path', async () => {
    await rewriteVueFilesAndPaths()

    const result = await existsSync('src/views/home.vue')
    const filename = 'src/views/home.vue'
    expect(result == filename).toBe(true)
  })
})
