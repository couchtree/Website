const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'doc'),
    filename: 'scripts/bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            // options...
          }
        }
      ],
      sideEffects: true
    },
    {
      test: /\.pug$/,
      use: 'pug-loader'
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          //plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new CopyPlugin([
      { from: './src/assets', to: 'assets' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
  ]
};