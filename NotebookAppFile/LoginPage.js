import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,FlatList,ScrollView,Image,TouchableHighlight,TextInput,TouchableOpacity,Alert,ActivityIndicator,
} from 'react-native';
import singleToneDataManager from './SingleToneClass.js';
import firebaseClassManager from './FireBaseDatabaseClass.js';
import RouteClass from './Route';
import SignUpClass from './SignUpPage';
import HomeClass from './Home';


 // var fireData = firebaseClassManager.getInstance();
 // var commonDataSingletone = singleToneDataManager.getInstance();
 var self


export default class LoginClass extends Component {
  static navigationOptions={
    title:'Notebook App',

  };
  constructor() {
    super();
    this.state={
      animating:false,
      Email:null,
      Password:null
    }
  }

async LoginButtonPress(){

    console.log(this);
      self._startIndicatorPress();
     console.log("======");
      await firebaseClassManager.getInstance()._FirebaseLogin(self.state.Email,self.state.Password,self);
      self._stopIndicatorPress();

}

_startIndicatorPress=()=>{
  self.setState({
    animating:true,
  });
}


_stopIndicatorPress=()=>{
  self.setState({
    animating:false,
  });
}

  SignUpButtonPress=()=>{
    console.log(this);
     this.props.navigation.navigate('SignUp');
  }

  render(){

    // const { navigate } = this.props.navigation;
      //  self=this.props.navigation;
      self=this;
     return(


      <View style={styles.Maincontainer}>

      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
      Email:</Text>
      <TextInput
         placeholder="Enter your registerd Email"
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

      <TouchableOpacity style={{marginLeft:20,marginRight:20,marginTop:40,backgroundColor:"blue"}}
      onPress={this.LoginButtonPress}>
        <Text style={{color:'white',fontSize:20,textAlign:"center"}}>Login</Text>
      </TouchableOpacity>

      <View style = {styles.loadingContainer}>
              <ActivityIndicator
                 animating = {this.state.animating}
                 color = '#bc2b78'
                 size = "large"
                 style = {styles.activityIndicator}/>
           </View>


      <Text style={{marginTop:20}}>New User!!click here to signUp</Text>
      <TouchableOpacity style={{marginLeft:40,marginRight:40,marginTop:40,backgroundColor:"blue"}}
      onPress={this.SignUpButtonPress}>
        <Text style={{color:'white',fontSize:20,textAlign:"center"}}>Sign-Up</Text>
      </TouchableOpacity>


      </View>

    );
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
    loadingContainer: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 70
    },
    activityIndicator: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       height: 80
    },
  }
)
