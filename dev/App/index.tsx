import {hot} from 'react-hot-loader/root';
import * as React from "react";
import Label from "./Label";
import { Add } from './utils';
const {Fragment} = React;

const emoji = "\u{1F525}";
const App = () => (
  <Fragment>
    <h1>React Boilerplate with {emoji} Reloading!</h1>
    <h3>Output from Add() function: {Add(5, 2)}</h3>
    <Label />
  </Fragment>
)

export default hot(App);