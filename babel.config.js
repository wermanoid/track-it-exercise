module.exports = api => {
  api.cache(true);
  return {
    presets: [
      '@babel/typescript',
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
            node: 'current',
          },
        },
      ],

      ['@babel/react', { development: process.env.NODE_ENV !== 'production' }],
      '@emotion/babel-preset-css-prop',
    ],
    plugins: [
      'react-hot-loader/babel',
      [
        'transform-imports',
        {
          '@material-ui/core': {
            transform: '@material-ui/core/${member}',
            preventFullImport: true,
          },
          'lodash/fp': {
            transform: 'lodash/fp/${member}',
            preventFullImport: true,
          },
          lodash: {
            transform: 'lodash/${member}',
            preventFullImport: true,
          },
        },
      ],
      ['webpack-alias', { config: './config/webpack/resolvers.js' }],
      ['@babel/transform-runtime', { corejs: 3 }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
      production: {
        plugins: ['closure-elimination'],
      },
    },
  };
};
