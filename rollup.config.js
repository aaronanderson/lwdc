// rollup.config.js
//import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
    external: ['lit-element','lit-html/directives/class-map','lit-html/directives/if-defined', 'lit-html/directives/style-map'],
    input: {
        'index': 'lib/index.ts',
        'lwdc-action-bar': 'lib/lwdc-action-bar.ts',
        'lwdc-banner': 'lib/lwdc-banner.ts',
        'lwdc-button': 'lib/lwdc-button.ts',
        'lwdc-card': 'lib/lwdc-card.ts',
        'lwdc-checkbox': 'lib/lwdc-checkbox.ts',
        'lwdc-color-input': 'lib/lwdc-color-input.ts',
        'lwdc-combobox': 'lib/lwdc-combobox.ts',
        'lwdc-core': 'lib/lwdc-core.ts',
        'lwdc-count-badge': 'lib/lwdc-count-badge.ts',
        'lwdc-env-label': 'lib/lwdc-env-label.ts',
        'lwdc-file-upload': 'lib/lwdc-file-upload.ts',
        'lwdc-fonts': 'lib/lwdc-fonts.ts',
        'lwdc-form': 'lib/lwdc-form.ts',
        'lwdc-form-field': 'lib/lwdc-form-field.ts',
        'lwdc-header': 'lib/lwdc-header.ts',
        'lwdc-icon': 'lib/lwdc-icon.ts',
        'lwdc-icon-inject': 'lib/lwdc-icon-inject.ts',
        'lwdc-layout-box': 'lib/lwdc-layout-box.ts',
        'lwdc-layout-section': 'lib/lwdc-layout-section.ts',
        'lwdc-loading': 'lib/lwdc-loading.ts',
        'lwdc-menu-item': 'lib/lwdc-menu-item.ts',
        'lwdc-menu': 'lib/lwdc-menu.ts',
        'lwdc-modal': 'lib/lwdc-modal.ts',
        'lwdc-page-header': 'lib/lwdc-page-header.ts',
        'lwdc-pagination': 'lib/lwdc-pagination.ts',
        'lwdc-popup': 'lib/lwdc-popup.ts',
        'lwdc-progress': 'lib/lwdc-progress.ts',
        'lwdc-radio': 'lib/lwdc-radio.ts',
        'lwdc-search-bar': 'lib/lwdc-search-bar.ts',
        'lwdc-select': 'lib/lwdc-select.ts',
        'lwdc-side-panel': 'lib/lwdc-side-panel.ts',
        'lwdc-status-indicator': 'lib/lwdc-status-indicator.ts',
        'lwdc-table': 'lib/lwdc-table.ts',
        'lwdc-tabs': 'lib/lwdc-tabs.ts',
        'lwdc-text': 'lib/lwdc-text.ts',
        'lwdc-textarea': 'lib/lwdc-textarea.ts',
        'lwdc-toast': 'lib/lwdc-toast.ts',
        'lwdc-tooltip': 'lib/lwdc-tooltip.ts',
    },
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
        }),


        resolve(),
        postcss({
            inject: false,
            modules: false,
            use: ['sass'],
            plugins: [require('postcss-inline-svg')]
        }),



    ]

};
