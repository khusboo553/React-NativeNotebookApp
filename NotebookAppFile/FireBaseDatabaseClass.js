import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,FlatList,ScrollView,Image,TouchableHighlight,TextInput,TouchableOpacity,Alert,ActivityIndicator,
} from 'react-native';
import * as firebase from "firebase";
import singleToneDataManager from './SingleToneClass.js';
import Navigation from './Route.js';

var config = {
   apiKey: "AIzaSyANcNlzhr20A2qs9yxn-uf9NAynO7fB5TA",
   authDomain: "notepadappk.firebaseapp.com",
   databaseURL: "https://notepadappk.firebaseio.com",
   projectId: "notepadappk",
   storageBucket: "notepadappk.appspot.com",
   messagingSenderId: "1011999491898"
 };

var commonDataSingletone = singleToneDataManager.getInstance();

export default class firebaseClassManager{

  static sharedInstance = null;
  static getInstance() {

      if (this.sharedInstance == null) {
          this.sharedInstance = new firebaseClassManager();
      }

      return this.sharedInstance;
  }
  static firebaseApp = null;

    _createFirebase=()=> {
     if (this.firebaseApp == null) {
       this.firebaseApp = firebase.initializeApp(config);
     }
     return this.firebaseApp;
   }

 async _FirebaseLogin(Email,Password,address){

      try {
         await this._createFirebase().auth()
             .signInWithEmailAndPassword(Email,Password);
             console.log("+++++++++successfully+++++++++++++");
                var uid = this._createFirebase().auth().currentUser.uid;
                var email = this._createFirebase().auth().currentUser.email;
                var add=address;
                var arrayD=[{
                  uid:uid,
                  email:email,
                }];
                singleToneDataManager.getInstance().setLoginDetailsArray(arrayD[0]);
                {this._listenUserData(uid,add)};

                // commonDataSingletone.setReturnValue("0");

     } catch (error) {

       singleToneDataManager.getInstance().setReturnValue("0");
           var errorCode = error.code;
           var errorMessage = error.message;
           Alert.alert(
          errorCode,
          errorMessage,
          [

       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'OK', onPress: () => console.log(errorCode)},
          ],
           { cancelable: false }
           )
     }
 }



  async _FirebaseSignUp(Email,Password){
    try {
       await this._createFirebase().auth()
           .createUserWithEmailAndPassword(Email,Password);
           console.log("+++++++++successfully signup+++++++++++++");

              // var email = firebase.auth().currentUser.email;
           Alert.alert(
         'Congratulation!!!',
         'You have successfully sign Up',
         [

         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'OK', onPress: () => console.log('OK Pressed')},
         ],
         { cancelable: false }
       );

   } catch (error) {
         var errorCode = error.code;
         var errorMessage = error.message;
         Alert.alert(
        errorCode,
        errorMessage,
        [

       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'OK', onPress: () => console.log(errorCode)},
        ],
         { cancelable: false }
         )
   }
}
async _FirebaseLogout() {

    try {

        await this._createFirebase().auth().signOut();
        singleToneDataManager.getInstance().setReturnValue("1");
        // Navigate to login view

    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(
     errorCode,
     errorMessage,
     [

    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log(errorCode)},
     ],
      { cancelable: false }
      )

      singleToneDataManager.getInstance().setReturnValue("0");
    }

}
 _FirebaseStoreData(uid,IdDetails,dataDetails) {

        var userPath = "/registerdUserId/Users=" + uid;

        return firebase.database().ref(userPath).set({
             PersonalDetails:IdDetails,
             NoteDetails:dataDetails,
          })

  }
 async _listenUserData(uid,add) {

    var userPath = "/registerdUserId/Users=" + uid +"/NoteDetails";
    var data=this._createFirebase().database().ref(userPath);

    // console.log(data);
   data.on('value', (snapshot)=>{
      var Details = "";

      if (snapshot.val()) {
        Details = snapshot.val();
      }
      singleToneDataManager.getInstance().setDictNotebookDetailsArrayD(Details);
      singleToneDataManager.getInstance()._SelectedNoteArray=Details;
      console.log("****************");
      singleToneDataManager.getInstance().setReturnValue("1");
      console.log(singleToneDataManager.getInstance().getDictNotebookDetailsArray());
      //  <Navigation/>

       add.props.navigation.navigate('Home');

    });
  }

  render(){

    return(
    <Text>hi</Text>
    )
  }
}



// }async LoginButtonPress(){
//   try {
//     //  await firebase.auth()
//     //      .signInWithEmailAndPassword(self.state.Email, self.state.Password);
//
//      self.props.navigation.navigate('Home');
//  } catch (error) {
//        var errorCode = error.code;
//        var errorMessage = error.message;
//        Alert.alert(
//       errorCode,
//       errorMessage,
//       [
//    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
//    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
//    {text: 'OK', onPress: () => console.log(errorCode)},
//       ],
//        { cancelable: false }
//        )
//  }
