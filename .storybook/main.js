
module.exports = {
  webpackFinal: (config) => {    

    return { ...config, module: { ...config.module, rules: [

      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          //wait for update to lit
          //{
          //		loader: 'lit-css-loader',
          //	},
          {
            loader: 'raw-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-inline-svg",
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
               implementation: require("node-sass"),
            }
          },
    
        ],
    
      }


    ] } };
  },
  core: {
    builder: 'webpack5'
  },
  stories: ['../stories/*.stories.tsx'],
  addons: [
    '@storybook/addon-postcss',
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
  ],
};
