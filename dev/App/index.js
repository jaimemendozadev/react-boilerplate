import { hot } from 'react-hot-loader/root';
import React, {Fragment} from "react";
import Label from "./Label";

const emoji = "\u{1F525}";
const App = () => (
  <Fragment>
    <h1>React Boilerplate with {emoji} Reloading!</h1>
    <Label />
  </Fragment>
)

export default hot(App);