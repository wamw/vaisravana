const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  entry: {
    app: ['./app/renderer/index.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'renderer.js',
    // publicPath: './',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'electron-renderer',
  devtool: 'sourcemap',
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: [
    (context, request, callback) => {
      if (/\.\.\/shared\/.+/.test(request)) {
        return callback(null, `commonjs ${request}`)
      }
      callback()
    }
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          emitErrors: true,
        }
      }, {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?configFileName=tsconfig.renderer.json',
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'raw-loader',
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/renderer/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'add.html',
      template: 'app/renderer/add.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'check_token.html',
      template: 'app/renderer/check_token.html',
    })
  ]
}

module.exports = webpackConfig
