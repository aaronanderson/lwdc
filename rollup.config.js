// rollup.config.js
//import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from "@rollup/plugin-node-resolve";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';


export default {
    external: ['react', 'react-dom'],
    input: {
        'index': 'lib/index.ts',
        'lwdc-button': 'lib/lwdc-button.ts',
        'lwdc-card': 'lib/lwdc-card.ts',
        'lwdc-checkbox': 'lib/lwdc-checkbox.ts',
        'lwdc-combobox': 'lib/lwdc-combobox.ts',
        'lwdc-env-label': 'lib/lwdc-env-label.ts',
        'lwdc-fonts': 'lib/lwdc-fonts.ts',
        'lwdc-form': 'lib/lwdc-form.ts',
        'lwdc-form-field': 'lib/lwdc-form-field.ts',
        'lwdc-header': 'lib/lwdc-header.ts',
        'lwdc-icon': 'lib/lwdc-icon.ts',
        'lwdc-icon-inject': 'lib/lwdc-icon-inject.ts',
        'lwdc-loading': 'lib/lwdc-loading.ts',
        'lwdc-menu-item': 'lib/lwdc-menu-item.ts',
        'lwdc-menu': 'lib/lwdc-menu.ts',
        'lwdc-modal': 'lib/lwdc-modal.ts',
        'lwdc-page-header': 'lib/lwdc-page-header.ts',
        'lwdc-popper': 'lib/lwdc-popper.ts',
        'lwdc-radio': 'lib/lwdc-radio.ts',
        'lwdc-select': 'lib/lwdc-select.ts',
        'lwdc-side-panel': 'lib/lwdc-side-panel.ts',
        'lwdc-table': 'lib/lwdc-table.ts',
        'lwdc-tabs': 'lib/lwdc-tabs.ts',
        'lwdc-text': 'lib/lwdc-text.ts',
        'lwdc-textarea': 'lib/lwdc-textarea.ts',
        'lwdc-toast': 'lib/lwdc-toast.ts',
        'lwdc-tooltip': 'lib/lwdc-tooltip.ts',
    },
    //input: ['lib/lwdc-card.ts', 'lib/lwdc-button.ts'],
    //preserveModules: true,
    output: {
        dir: "wc",
        format: "esm",
        sourcemap: true,
    },
    context: 'window',
    plugins: [
        typescript(),
        commonjs({
            include: "node_modules/**",
            namedExports: {
                // left-hand side can be an absolute path, a path
                // relative to the current directory, or the name
                // of a module in node_modules
                '@workday/design-assets-types': ['CanvasIconTypes']
            }
        }),


        resolve(),
        postcss({
            extract: false,
            modules: true,
            use: ['sass'],
        }),



    ]

};