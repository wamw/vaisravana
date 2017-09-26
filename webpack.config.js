const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))
const isProduction = process.env.NODE_ENV === 'production'

const webpackConfig = {
  entry: {
    app: ['./app/renderer/index.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'renderer.js',
    publicPath: isProduction ? './' : `http://localhost:${argv.port || 8000}/`,
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
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: 'add.html',
      template: 'app/renderer/add.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: 'check_token.html',
      template: 'app/renderer/check_token.html',
      inject: 'head'
    })
  ]
}

module.exports = webpackConfig
