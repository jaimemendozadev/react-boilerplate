# [React Boilerplate](https://github.com/jaimemendozadev/readio-v2)

My own standard React boilerplate with Webpack, all the Babel dependencies I can't commit to memory because they're hard to remember, and assorted notes.

Note: This repo is a work in progress! Babel and webpack are <strong>CONSTANTLY</strong> changing. This repo is more for my reference and benefit than yours. :-P

## Table of contents

- Main React Dependencies
- Main Babel Dependencies
- Additional Babel Dependencies
- Webpack
- TypeScript
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

## Webpack

Add the following dependencies
- `webpack`
- `webpack-cli`
- `webpack-dev-server`
- `webpack-merge`

For my webpack config, I setup the main `webpack.config.js` file at the root with a separte `webpack` folder that contains separate `config` files based on environments.


Using `webpack-merge`, based on the `env`, I can either merge the `base.config.js` with either the `dev` or `prod` config file.

```

const merge = require('webpack-merge');
const devConfig = require('./webpack/dev.config');
const baseConfig = require('./webpack/base.conifg');

module.exports = env => {

  if(env.dev) {
    return merge(devConfig, baseConfig(env));
  }

  return baseConfig(env);
}

```

For `webpack-dev-server`, I add a `devServer` property in the `dev.config.js` file:

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "../public"),
  }
}

```

In the `package.json`, I add the following script to kickoff the dev server:

```
{ "dev:build": "webpack-dev-server --hot --inline --env.dev --mode=development"}
```
Here's what some of the arguments that we pass to `webpack-dev-server` mean:

-  `--hot`: Enables Hot Module Replacement.

- `--inline`: By default the application will be served with inline mode enabled. This means that a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console. [...] Inline mode is recommended for Hot Module Replacement as it includes an HMR trigger from the websocket. ([From `webpack` docs](https://webpack.js.org/configuration/dev-server/#devserverinline))


And to add React Hot Reloading, we install `react-hot-loader` as a regular dependency and [follow the instructions in the repo](https://github.com/gaearon/react-hot-loader).


## TypeScript

We'll be adding TypeScript to an existing React application, using [Microsoft's instructions](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide) and relying on React Hot Loader's [TypeScript integration](https://github.com/gaearon/react-hot-loader#typescript) instructions.


We'll need to add the following dev dependencies:
- `typescript`
- [`awesome-typescript-loader`](https://www.npmjs.com/package/awesome-typescript-loader) 
- `source-map-loader`
- `@babel/preset-typescript`


Update the `.babelrc` file by adding the `@babel/preset-typescript` to the `presets` array:

```
{
  "presets": ["@babel/preset-typescript", "@babel/preset-react", ["@babel/preset-env", {"targets": "> 0.25%, not dead"}]],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-transform-runtime", {"helpers": true}],
    "@babel/plugin-proposal-class-properties",
    "react-hot-loader/babel"
  ]
}

```


Next we "get the type declaration files (.d.ts files) from [@types](https://devblogs.microsoft.com/typescript/the-future-of-declaration-files-2/) for any library in use." We add them as regular dependencies. 

- `@types/react` 
- `@types/react-dom`

We'll configure the `tsconfig.json` file per the instruction boilerplate:

```

{
   compilerOptions": {
      "outDir": "./dist/",        // path to output directory
      
      "sourceMap": true,          // allow sourcemap support

      "strictNullChecks": true,   // enable strict null checks 
                                  // as a best practice
      
      "module": "es6",            // specify module code generation
      
      "jsx": "react",             // use typescript to 
                                  // transpile jsx to js

      "target": "es5",            // specify ECMAScript target version

      "allowJs": true             // allow a partial TypeScript 
                                  // and JavaScript codebase
      
      "moduleResolution": "node"  // Prevents "Cannot find 
                                  // module 'csstype'" error
   ,
   include": [
      "./src/"
   
}

```

*See [GitHub comment](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/24788#issuecomment-398505981) more info on `Cannot find module 'csstype'` error.



We'll have to add more boilerplate to the webpack.config:

```

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const entry = path.resolve(__dirname, "../dev/index.tsx");
const publicPath = path.resolve(__dirname, "../public");

module.exports = env => {

  return {
    mode: env.mode,
    entry,
    output: {
      path: publicPath,
      filename: "bundle.js"
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
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

```


The React Hot Loader GitHub repo [has a great example](https://github.com/gaearon/react-hot-loader/tree/master/examples/typescript) on integrating TypeScript with webpack and React Hot Loader.

## Created By

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)