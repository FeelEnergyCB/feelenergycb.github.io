const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const distFolder = "./build";

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devtool: 'inline-source-map',
  output: {
    filename: './build/index.js'
  },
  devtool: 'eval',
  devServer: {
    contentBase: distFolder
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, distFolder)
  }
}