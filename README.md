# [React Boilerplate](https://github.com/jaimemendozadev/readio-v2)

My own standard React boilerplate with Webpack, all the Babel dependencies I can't commit to memory because they're hard to remember, and assorted notes.

Note: This repo is a work in progress! Babel and webpack are CONSTANTLY changing. This repo is more for my reference and benefit than yours. :-P

## Table of contents

- Main React Dependencies
- Main Babel Dependencies
- Additional Babel Dependencies
- Webpack Config
- Created By


## Main React Dependencies
- `react`
- `react-dom`
- `@babel/runtime`

## Main Babel Dependencies

You'll need these dependencies to get React and Babel going. [But why?!](https://www.valentinog.com/blog/babel/)
- `@babel/core`
- `babel-loader`: It's the Webpack loader responsible for taking in the ES6 code and making it understandable by the browser of choice.
- `@babel/preset-react`: For compiling JSX and other stuff down to JavaScript.
- `@babel/preset-env`: For compiling JavaScript ES6 code down to ES5.

Sources: 
- https://www.valentinog.com/blog/babel/
- https://blog.jakoblind.no/babel-preset-env/


## Additional Babel Dependencies

I personally can't use React without these gems:

- `@babel/plugin-transform-runtime`: To enable using `async/await` because too many `.then` declarations is just as bad as `callback` hell.

- `@babel/plugin-proposal-class-properties`: So that we'll never have to `.bind` the `this` context to a handler in the constructor! 

- `@babel/plugin-proposal-object-rest-spread`: Because we want to spread those `{...props}` like butter on toast.

Why do we need plugins? Because they do the heavy lifting. [Read on...](https://blog.jakoblind.no/babel-preset-env/)

Original citations [here](https://medium.com/@jacobworrel/babels-transform-class-properties-plugin-how-it-works-and-what-it-means-for-your-react-apps-6983539ffc22) and [here](https://dev.to/codeprototype/modernize-your-reactjs-application-with-asyncawait-in-2018-1l9j).

## Webpack Config

How I Setup the Webpack Config file. Also, I <strong>DARE</strong> you to try to remember the syntax for writing a rule to compile your `jsx` code.

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
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
```


## Created By

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)