# [React Boilerplate](https://github.com/jaimemendozadev/readio-v2)

My own standard React boilerplate with Webpack, all the Babel dependencies I can't commit to memory because they're hard to remember, and assorted notes.

Note: This repo is a work in progress! Babel and webpack are CONSTANTLY changing. This repo is more for my reference and benefit than yours. :-P

## Table of contents

- Babel Dependencies
- Webpack Config
- Created By

## Babel Dependencies

- `babel-core`, `babel-loader`, `babel-preset-react`, `babel-preset-env`: You'll need these to get React and Babel going.

- `babel-plugin-transform-runtime`: [To enable using `async/await`](https://dev.to/codeprototype/modernize-your-reactjs-application-with-asyncawait-in-2018-1l9j) because too many `.then`s is just as bad as `callback` hell.

- `transform-class-properties`: So that we'll [never have to `.bind` the `this` context](https://medium.com/@jacobworrel/babels-transform-class-properties-plugin-how-it-works-and-what-it-means-for-your-react-apps-6983539ffc22) to a handler in the constructor! 

- `transform-object-rest-spread`: Because we want to spread those `{...props}` like butter on toast.

## Webpack Config

How I Setup the Webpack Config file. Also, I DARE you to try to remember the syntax for writing a rule to compile your `jsx` code.

```
const path = require('path');

const public = path.resolve(__dirname, 'public');
const dev = path.resolve(__dirname, 'dev/index.jsx');

module.exports = {
  entry: dev,
  output: {
    path: public,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js?x$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
```


## Created By

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)