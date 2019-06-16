const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const entry = path.resolve(__dirname, "../dev/index.tsx");
const publicPath = path.resolve(__dirname, "../public");

module.exports = env => {
  console.log('webpack env is ', env);

  return {
    mode: env.mode,
    entry,
    output: {
      path: publicPath,
      filename: "bundle.js"
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        react: path.resolve(path.join(__dirname, '../node_modules/react')),
      }
    },

    module: {
      rules: [
        { 
          test: /\.(t|j)sx?$/, 
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
          loader: 'babel-loader' 
        },

        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin()
    ]
  }    
}