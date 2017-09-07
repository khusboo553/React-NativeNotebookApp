/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RouteClass from './NotebookAppFile/Route';

// import * as firebase from "firebase";
// <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>


export default class NotePadApp extends Component {
  render() {

    return (
      //  <LoginClass/>
      <RouteClass/>
    );
  }
}


AppRegistry.registerComponent('NotePadApp', () => NotePadApp);
