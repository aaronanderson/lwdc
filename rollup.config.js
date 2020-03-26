// rollup.config.js
//import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from "@rollup/plugin-node-resolve";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';



import fs from 'fs';


const elementSrc = 'lib';
let elementInputs = fs.readdirSync(elementSrc).filter((x) => {
    return x !== 'global.d.ts' && x.match('.*.ts');
});


export default {
    external: ['react', 'react-dom'],
    input: elementInputs,
    //input: ['lib/lwdc-card.ts', 'lib/lwdc-button.ts'],
    preserveModules: true,
    output: {
        dir: "wc",
        format: "esm",
        sourcemap: true,
    },
    context: 'window',
    plugins: [
        nodeResolve({
            extensions: ['.ts'],
            //resolveOnly: ['index.ts', 'lwdc-.*'],
            customResolveOptions: {
                basedir: elementSrc
            }
        }),

        commonjs({
            include: "node_modules/**",
            namedExports: {
                // left-hand side can be an absolute path, a path
                // relative to the current directory, or the name
                // of a module in node_modules
                '@workday/design-assets-types': ['CanvasIconTypes']
            }
        }),

        typescript(),
        resolve(),
        postcss({
            extract: false,
            modules: true,
            use: ['sass'],
        }),



    ]

};
