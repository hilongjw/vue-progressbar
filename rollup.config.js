import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import json from 'rollup-plugin-json'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default {
    entry: `src/index.js`,
    dest: `dist/vue-progressbar.js`,
    format: 'umd',
    moduleName: 'VueProgressBar',
    plugins: [
        json(),
        vue({
            css: true
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        resolve({
            browser: true,
            extensions: ['.vue', '.js', '.json']
        }), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        babel(),
        production && uglify() // minify, but only in production
    ],
    sourceMap: false
}
