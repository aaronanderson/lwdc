module.exports = {
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
