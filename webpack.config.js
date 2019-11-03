const path = require('path')

module.exports = {
  entry: './lib/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'canvasDatagrid',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'tutorials')
      // path.join(__dirname, 'dist'),
      // path.join(__dirname, 'docs'),
    ],
    proxy: {
      // '/docs': {
      //   target: path.join(__dirname, 'docs'),
      //   pathRewrite: { '^/docs': '' }
      // }
    },
    // compress: true,
    port: 9000
  }
}
