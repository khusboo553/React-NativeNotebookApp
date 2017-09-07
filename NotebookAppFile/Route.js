import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HomeClass from './Home';
import AddNotebookClass from './NewNotebook'
import {StackNavigator} from 'react-navigation';
import DetailsNotebookClass from './DetailsSelectedNote'
import LoginClass from './LoginPage'
import SignUpClass from './SignUpPage'

const Navigation=StackNavigator({
   Login:{
     screen:LoginClass
   },
   SignUp:{
     screen:SignUpClass
   },
   Home:{
     screen:HomeClass,

   },
   NewNote:{screen:AddNotebookClass},
   DetailsNote:{screen:DetailsNotebookClass},


});

 export default Navigation;

// export default class RouteClass extends Component {
//   constructor() {
//     super();
//
//   }
//   render(){
//     return(
//       // <Text>hello route</Text>
//        <HomeClass />
//
//     );
//   }
// }
