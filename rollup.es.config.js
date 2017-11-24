import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';

const path = require('path');

console.log('path', path.join(__dirname, 'license-banner.txt'));
export default {
  output: {
    format: 'es',
    sourcemap: true
  },
  plugins: [
    sourcemaps(),
    commonjs({
      include: '../../node_modules/**',
    }),
    license({
      sourceMap: true,

      banner: {
        file: path.join(__dirname, 'lib', 'license-banner.txt'),
        encoding: 'utf-8',
      }
    })
  ],
  onwarn: () => { return }
}
