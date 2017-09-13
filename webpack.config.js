const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const webpackConfig = {
  entry: {
    app: ['./app/renderer/index.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'app/renderer-dist'),
    filename: 'app.js',
    publicPath: isProduction ? './' : `http://localhost:${argv.port || 8000}/`,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'electron-renderer',
  devtool: isProduction ? false : 'eval',
  node: {
    __filename: true,
    __dirname: true,
  },
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
        loader: 'awesome-typescript-loader',
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
            sourceMap: !isProduction,
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/renderer/assets/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'app/renderer/assets/static', to: 'assets' }
    ])
  ]
}

if (isProduction) {
  // ...
  // --optimize-minimize がバグってるので uglifyjs plugin 入れるとか
}

module.exports = webpackConfig
