const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/main.js',
  mode: "development",
  devtool: 'inline-source-map',
  resolve: {
    // see below for an explanation
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
      "~/*": "./"
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  devServer: {
    publicPath: "/",
    // contentBase: path.resolve(__dirname, 'app', 'dist'),
    hot: true
  },
  module: {
    rules: [
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: true
            },
            hotReload: true
          }
        }
      },
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "app", "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: "index.html" })
  ],
}