# vue-fix-filename-cases for vue.js

This npm Library renames the default files in Vue.js 2 and Vue.js 3 from Pascal case to kebab case.

The library can be run with

    $ npx vue-fix-filename-cases {vue-directory}

right after installation.

After setting up a new Vue.js Installation there are several files that have uppercase letter in them:

- src/App.vue
- components/HelloWorld.vue
- views/About.vue
- view/Home.vue

This Library renames files to lowercase and also updates the corresponding links inside other files.

## Why do we need to rename uppercase files?

Having uppercase files in your vue/node project folder can lead to several problems. For example `git` does not track file renames that are case-sensitive. So when you decide to rename `App.vue` into `app.vue` after you have already committed the initial file, then git will not track this rename.

Other problems can occur when you are working in a team whose participants are using different operating systems. For example, when a member in your team uses a case-sensitive file system they can have `App.vue` and `app.vue` in the same directory. On case-insensitive file systems this will lead to errors.

Another motivation to create this script is my personal preference to have file names in kebab-case.

## Example

First clone the project from GitHub.
Go to the installation directory and execute `$ npx vue-fix-filename-cases {path to vue directory}`, i.e.

    $ npx vue-fix-filename-cases /Users/3vincent/my-vue-app

This should be done before committing the vue project.

## License

MIT License

Copyright (c) 2023 3vincent

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
