export default {
  entry: { main: './src/index.jsx' },
  env: {
    development: {
      extraBabelPlugins: [
        'mickey-model-validator',
        ['mickey-model-loader', { 
          loaderOptions: { 
            directory: './models',
            useSubdirectories: true,
            regExp: /\.js$/,
          },
        }],
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': true }],
      ],
    },
    production: {
      extraBabelPlugins: [
        ['mickey-model-loader', { 
          loaderOptions: { 
            directory: './models',
            useSubdirectories: true,
            regExp: /\.js$/,
          },
        }],
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': true }],
      ],
    }
  },
}
