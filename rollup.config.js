import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const name = require('./package.json').main.replace(/\.js$/, '');

const bundle = (config) => ({
    ...config,
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
});

const config = [
    bundle({
        input: 'src/index.ts', // our source file
        output: [
            {
                file: `${name}.js`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: 'es',
                sourcemap: true,
            },
        ],
        plugins: [
            typescript(),
            terser({
                ecma: 2020,
                module: true,
                toplevel: true,
                compress: { pure_getters: true },
                format: { wrap_func_args: false },
            }),
        ],
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: `${name}.d.ts`,
            format: 'es',
        },
    }),
];

export default config;
