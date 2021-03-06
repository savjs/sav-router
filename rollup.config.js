let {executeRollup, errorExit} = require('rollup-standalone')

const pack = require('./package.json')
const banner = `/*!
 * ${pack.name} v${pack.version}
 * (c) ${new Date().getFullYear()} ${pack.author.name} ${pack.author.email}
 * Release under the ${pack.license} License.
 */
`

Promise.all([
  executeRollup({
    entry: 'src/index.js',
    external: [
      'sav-util'
    ],
    dest: 'dist/sav-router.cjs.js',
    format: 'cjs'
  }),
  executeRollup({
    entry: 'src/index.js',
    external: [
      'sav-util'
    ],
    dest: 'dist/sav-router.es.js',
    format: 'es'
  }),
  executeRollup({
    entry: 'src/index-umd.js',
    dest: 'dist/sav-router.min.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'schema',
    babelOptions: {
      include: [
        'node_modules/**'
      ]
    },
    uglifyOptions: true,
    resolveOptions: {
      jsnext: true
    }
  }, (bundle, res) => {
    res.code = banner + res.code
  }),
  executeRollup({
    entry: 'src/index-umd.js',
    dest: 'dist/sav-router-umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'schema',
    babelOptions: {
      include: [
        'node_modules/**'
      ]
    },
    // uglifyOptions: true,
    resolveOptions: {
      jsnext: true
    }
  }, (bundle, res) => {
    res.code = banner + res.code
  })
]).catch(errorExit('build fail'))
