const esbuild = require("esbuild");
const path = require("path");
const sassPlugin = require("esbuild-sass-plugin").sassPlugin;
const postCssPlugin = require("esbuild-plugin-postcss2").default;

esbuild.build({
    entryPoints: {
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
      'lwdc-switch': 'lib/lwdc-switch.ts',
      'lwdc-table': 'lib/lwdc-table.ts',
      'lwdc-tabs': 'lib/lwdc-tabs.ts',
      'lwdc-text': 'lib/lwdc-text.ts',
      'lwdc-textarea': 'lib/lwdc-textarea.ts',
      'lwdc-toast': 'lib/lwdc-toast.ts',
      'lwdc-tooltip': 'lib/lwdc-tooltip.ts',
    },
    format: 'esm',
    outdir: 'wc',
    bundle: true,
    splitting: true,
    sourcemap: 'external',
    plugins: [
      sassPlugin({
       implementation: 'node-sass',
       type: 'lit-css',
       includePaths: [
         path.resolve('node_modules'),
       ]
     }),
     postCssPlugin({
       plugins: [require('postcss-inline-svg')]
     })
   ],
  }).catch((e) => console.error(e.message));
