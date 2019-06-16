const path = require('path');
const entry = path.resolve(__dirname, "../dev/index.jsx");
const publicPath = path.resolve(__dirname, "../public");

module.exports = env => {
  console.log('webpack env is ', env);

  return {
    entry,
    output: {
      path: publicPath,
      filename: "bundle.js"
    },

    module: {
      rules: [
        {test: /.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    }
  }    
}