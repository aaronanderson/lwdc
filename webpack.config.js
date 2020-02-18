const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    index: './lib/index.ts',
    'lwdc-combobox': './lib/lwdc-combobox.ts',
    'lwdc-env-label': './lib/lwdc-env-label.ts',
    'lwdc-fonts': './lib/lwdc-fonts.ts',
    'lwdc-form-field': './lib/lwdc-form-field.ts',
    'lwdc-icon-inject': './lib/lwdc-icon-inject.ts',
    'lwdc-icon': './lib/lwdc-icon.ts',
    'lwdc-loading': './lib/lwdc-loading.ts',
    'lwdc-menu': './lib/lwdc-menu.ts',
    'lwdc-popper': './lib/lwdc-popper.ts',
    'lwdc-select': './lib/lwdc-select.ts',
    'lwdc-table': './lib/lwdc-table.ts',
    'lwdc-text': './lib/lwdc-text.ts',
    'lwdc-toast': './lib/lwdc-toast.ts',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },

  module: {
    rules: [

      {
        test: /\.ts(x?)$/,
        loaders: ['ts-loader']
      },


      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "file-loader",

          options: {
            name: "assets/[name].[ext]",
          },
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: { includePaths: ['./node_modules'] }
            }
          },
        ]
      }

    ]
  }

};
