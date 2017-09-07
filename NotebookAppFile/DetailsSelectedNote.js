import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,FlatList,ScrollView,Image,TouchableHighlight,TextInput,Textfield,TouchableOpacity,
} from 'react-native';
import singleToneDataManager from './SingleToneClass.js';

export default class DetailsNotebookClass extends Component {
  static navigationOption={
    title:'Details of Note',
  };
  constructor(props) {
    super(props);
    this.state = {
      text:new Date().toDateString(),
      isDateTimePickerVisible: false,
      chooseText:this.props.navigation.state.params.ValueData["chooseText"],
      avatarSource:null,
      NotebookName:this.props.navigation.state.params.ValueData["NotebookName"],
      AuthorName:this.props.navigation.state.params.ValueData["AuthorName"],
      ImageUrl:this.props.navigation.state.params.ValueData["ImageUrl"],
      Description:this.props.navigation.state.params.ValueData["Description"],
      UserID:this.props.navigation.state.params.ValueData["UserID"],
      NoteID:this.props.navigation.state.params.ValueData["NoteID"],

     };
  }

     SaveButtonPress=()=>{

        console.log(this.props.navigation.state.params.ValueData);
        console.log("7777777");
        // this.props.navigation.state.params.ValueData=this.state;

        var noteData = singleToneDataManager.getInstance();
        var details = noteData.getDictNotebookDetailsArray();
        console.log(details[1]);
        for (var i = 0; i < details.length; i++) {
          console.log("6265");
           if (details[i]==this.props.navigation.state.params.ValueData) {
             console.log("6565");
            details[i]["NotebookName"]=this.state.NotebookName;
            details[i]["AuthorName"]=this.state.AuthorName;
            details[i]["Description"]=this.state.Description;
           }

        }
          console.log(details);
         noteData.setDictNotebookDetailsArrayD(details);

        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();

  }


     render(){
        const { navigate } = this.props.navigation;
     console.log(this.props.navigation.state.params.ValueData["NoteID"]);
       return(
      <View style={styles.mainviewContainer}>
         <View style={styles.SidebySidecontainer}>
         <Text style={styles.TextStyleContainer}>
         NoteBook Name:</Text>
         <TextInput
            style={styles.TextInputStyleContainer}
             placeholder={this.props.navigation.state.params.ValueData["NotebookName"]}
            //  value={this.props.navigation.state.params.ValueData["NotebookName"]}
              value={this.state.NotebookName}
             onChangeText={(text) => this.setState({NotebookName:text})}
          />
         </View>
         <View style={styles.SidebySidecontainer}>
         <Text style={styles.TextStyleContainer}>
         Author Name:</Text>
         <TextInput
            style={styles.TextInputStyleContainer}
            placeholder={this.props.navigation.state.params.ValueData["AuthorName"]}
             onChangeText={(text) => this.setState({AuthorName:text})}
              value={this.state.AuthorName}
          />
         </View>
         <View>
           <Text style={styles.TextStyleContainer}>
            Description:</Text>
            <TextInput style={styles.TextInputDescriptionContainer}
    	       multiline={true}
            placeholder={this.props.navigation.state.params.ValueData["Description"]}
    	       numberOfLines={10}
    	       blurOnSubmit={false}
            onChangeText={(text) => {
                           this.setState({Description:text})
                       }}

             value={this.state.Description}
            />
            <Button style={styles.ButtonContainer}
            onPress={this.SaveButtonPress}
            title="Save"

            />
         </View>
         </View>

       )
     }
}

const styles=StyleSheet.create(
  {
    mainviewContainer:{
      marginTop:40,
      marginLeft:20,
      marginRight:20,
      height:500,
      // width:350,
      backgroundColor:'white'
    },
    SidebySidecontainer:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    TextInputStyleContainer:{
      marginTop:15,
      height:30,
      width:150,
      borderColor:'blue',

    },
    TextStyleContainer:{
      marginTop:20,
      marginLeft:10,
      height:30,
      textAlign:'left'
    },
    TextInputDescriptionContainer:{
      marginLeft:10,
      marginTop:10,
      marginLeft:20,
      marginRight:20,
      height:100,
      borderColor:'white',
    },
    ButtonContainer:{
      marginLeft:10,
      marginRight:10,
      height:20,


    },
  }
)
