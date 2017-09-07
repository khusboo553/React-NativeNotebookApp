import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,FlatList,ScrollView,Image,TouchableHighlight,TextInput,TouchableOpacity,Alert,
} from 'react-native';
import singleToneDataManager from './SingleToneClass.js';

import firebaseClassManager from './FireBaseDatabaseClass.js';

var self;
var fireData = firebaseClassManager.getInstance();
var commonDataSingletone = singleToneDataManager.getInstance();

export default class SignUpClass extends Component {

  static navigationOption={
    title:'Notebook App',
  };

  constructor() {
    super();
    this.state={
      Email:null,
      Password:null,
      RePassword:null
    }
  }

  Sign_UpButtonPress(){
  if (self.state.Password==self.state.RePassword) {
    fireData._FirebaseSignUp(self.state.Email,self.state.Password);
     var dataDetails = commonDataSingletone.getReturnValue();
  }else {
    Alert.alert(
  'Warning',
  'Your Confirm Password Doesnt match',
   [

  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  {text: 'OK', onPress: () => console.log("ok")},
  ],
    { cancelable: false }
);
  }

    }

  render(){
    self=this;
    return(
      <View style={styles.Maincontainer}>

      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
      Email:</Text>
      <TextInput
         placeholder="Enter your Email"
         onChangeText={(text) => this.setState({Email:text})}
       />
      </View>

      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
      Password:</Text>
      <TextInput
      secureTextEntry={true}
         placeholder="Enter your Password!!!!"
         onChangeText={(text) => this.setState({Password:text})}
       />
      </View>
      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
      Confirm Password:</Text>
      <TextInput
      secureTextEntry={true}
         placeholder="Confirm your Password!"
         onChangeText={(text) => this.setState({RePassword:text})}
       />
      </View>

      <TouchableOpacity style={{marginLeft:20,marginRight:20,marginTop:40,backgroundColor:"blue"}}
      onPress={this.Sign_UpButtonPress}>
        <Text style={{color:'white',fontSize:20,textAlign:"center"}}>SignUp</Text>
      </TouchableOpacity>


      </View>

    )
  }
}
const styles=StyleSheet.create(
  {
    Maincontainer:{
      marginTop:80,
      marginLeft:40,
      marginRight:40,
      backgroundColor:'white'
    },
    SidebySidecontainer:{
      flexDirection:'row',
        marginTop:40,
        justifyContent:'space-between'
    },
    TextStyleContainer:{
      // textAlign:'left',
      width:100,
    },
  }
)
