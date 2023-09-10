import { babel } from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import clear from 'rollup-plugin-clear';
import screeps from 'rollup-plugin-screeps';
import pkg from './package.json';


let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if ((cfg = require("./screeps.json")[dest]) == null) {
  throw new Error("Invalid upload destination");
}

export default {
  plugins: [
    clear({ targets: ["dist"] }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    }),
    screeps({config: cfg, dryRun: cfg == null})
  ],
  input: "src/main.js",
  output: {
    file: pkg.main,
    format: "cjs",
    sourcemap: true
  },
  external: ['main.js.map']
};
