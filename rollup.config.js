"use strict";

const browsersync = require("rollup-plugin-browsersync");
const postcss = require("rollup-plugin-postcss");
const postcssNormalize = require("postcss-normalize");
// const browserslist = require("browserslist");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonJs = require("rollup-plugin-commonjs");
const {terser} = require("rollup-plugin-terser");

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = isProduction === false;

module.exports = {
  input: "src/scripts/index.js",
  output: {
    file: "public/giphy.js",
    format: "iife",
    sourcemap: isDevelopment
  },
  plugins: [

    commonJs(),
    resolve(),
    babel(),
    (isProduction && terser()),
    postcss({
      extract: true,
      plugins: [
        postcssNormalize(),
        autoprefixer(),
        cssnano()
      ]
    }),
    (isDevelopment && browsersync({server: 'public'}))
  ]
}
