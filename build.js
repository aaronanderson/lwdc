const esbuild = require("esbuild");
const path = require("path");
const sassPlugin = require("esbuild-sass-plugin").sassPlugin;
//const postCssPlugin = require("esbuild-plugin-postcss2").default;
const postcss_svg = require('postcss-inline-svg');
const postcss = require("postcss");

esbuild.build({
    entryPoints: {
      'index': 'lib/index.ts',
      'lwdc-action-bar': 'lib/lwdc-action-bar.ts',
      'lwdc-banner': 'lib/lwdc-banner.ts',
      'lwdc-breadcrumbs': 'lib/lwdc-breadcrumbs.ts',
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
       //wait for update to lit
       //type: 'lit-css',
       type: "css-text",
       includePaths: [
         path.resolve('node_modules'),
       ],
       async transform(source, resolveDir) {
         const {css} = await postcss([postcss_svg({paths:['wc']})]).process(source);
         //console.log(css);
         return css;
       }

     }),
   ],
  }).catch((e) => console.error(e.message));
