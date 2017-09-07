import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,FlatList,ScrollView,Image,TouchableHighlight,TextInput,Textfield,TouchableOpacity,ImagePickerIOS
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import singleToneDataManager from './SingleToneClass.js';
import firebaseClassManager from './FireBaseDatabaseClass.js';
import HomeClass from './Home';
var ImagePicker = require('react-native-image-picker');

var commonDataSingletone = singleToneDataManager.getInstance();

var options = {
  title: 'Select Avatar',
  // customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  // ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

var self;
export default class AddNotebookClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:new Date().toDateString(),
      isDateTimePickerVisible: false,
      chooseText:"Enter your schedule time",
      avatarSource:null,
      NotebookName:"",
      AuthorName:"",
      ImageUrl:null,
      Description:"",
      UserID:"",
      NoteID:"",
     };
  }

  onPhotosFetchedSuccess(data) {
    const photos = data.edges.map((asset) => {
      return asset.node.image;
    });
    console.log(photos);
  }
  SaveButtonPress=()=>{
    // this.setState({ NoteID:"0" });
    // this.setState({ UserID:"1" });
    var IdDetails = commonDataSingletone.getLoginDetailsArray();
    var uid=IdDetails["uid"];
    if (commonDataSingletone._SelectedNoteArray.length>0) {
      var noteId=commonDataSingletone._SelectedNoteArray.length;
      var detailsDict={
        UserID:IdDetails["uid"],
        NoteID:noteId,
        NotebookName:this.state.NotebookName,
        AuthorName:this.state.AuthorName,
        CurrentTime:this.state.text,
        ScheduleTime:this.state.chooseText,
        ImageUrl:this.state.ImageUrl,
        Description:this.state.Description,
      };
    }else {
      var noteId=0;
      var detailsDict=[{
        UserID:IdDetails["uid"],
        NoteID:noteId,
        NotebookName:this.state.NotebookName,
        AuthorName:this.state.AuthorName,
        CurrentTime:this.state.text,
        ScheduleTime:this.state.chooseText,
        ImageUrl:this.state.ImageUrl,
        Description:this.state.Description,
      }];
    }



    console.log(commonDataSingletone._SelectedNoteArray);
  if (commonDataSingletone._SelectedNoteArray.length==undefined || commonDataSingletone._SelectedNoteArray.length==null||commonDataSingletone._SelectedNoteArray.length==0) {
     console.log("4444");

      commonDataSingletone._SelectedNoteArray=detailsDict;
  }else {
    console.log("8888");
    commonDataSingletone._SelectedNoteArray.push(detailsDict);
  }

  commonDataSingletone.setDictNotebookDetailsArrayD(commonDataSingletone._SelectedNoteArray);
  console.log("########");
  // console.log(commonDataSingletone._SelectedNoteArray);
  console.log(commonDataSingletone.getDictNotebookDetailsArray());
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();

  }

  PickDateButtonPress=()=>{
    console.log(this);
     this.setState({ isDateTimePickerVisible: true });
  }

  PickImageButtonPress=()=>{
    ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);
  console.log(response.uri);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };

    this.setState({
      avatarSource: source,
      ImageUrl:response.uri
    });

  }
});

  }


  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {

    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();

    var dateData=date.toDateString();
    this.setState({ chooseText: dateData });

  };


  render(){
    const { navigate } = this.props.navigation;
    var img=this.state.avatarSource==null ? null:
    <Image
    source={this.state.avatarSource}
    style={{height:80,width:100}}
    />

    return(
      <View style={styles.mainviewContainer}>
      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
      NoteBook Name:</Text>
      <TextInput
         style={styles.TextInputStyleContainer}
         placeholder="Type Your Notebook Name"
         onChangeText={(text) => this.setState({NotebookName:text})}
       />
      </View>
      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
      Author Name:</Text>
      <TextInput
         style={styles.TextInputStyleContainer}
         placeholder="Type Author Name"
         onChangeText={(text) => this.setState({AuthorName:text})}
       />
      </View>
      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
       Date and Time: </Text>
       <Text style={styles.TextInputStyleContainer}>
        {this.state.text} </Text>

      </View>
      <View style={styles.SidebySidecontainer}>
      <Text style={styles.TextStyleContainer}>
       Set Post Date:</Text>
       <View style={{ flex: 1}}>
       <TouchableOpacity style={{marginLeft:70}}
       onPress={this.PickDateButtonPress}>
         <Text style={{color:'red'}}>Click Here</Text>
       </TouchableOpacity>
        <Text style={{marginLeft:70,
        height:30,
        textAlign:'left'}}>{this.state.chooseText}</Text>
       <DateTimePicker
         isVisible={this.state.isDateTimePickerVisible}
         onConfirm={this._handleDatePicked}
         onCancel={this._hideDateTimePicker}
       />
       </View>

      </View>
      <Text style={styles.TextStyleContainer}>
       Add any Image You Want to Save:</Text>

       <TouchableOpacity style={{marginLeft:70}}
       onPress={this.PickImageButtonPress}>
         <Text style={{color:'red'}}>Click Here</Text>
       </TouchableOpacity>
       {img}

        <Text style={styles.TextStyleContainer}>
         Description:</Text>
         <TextInput style={styles.TextInputDescriptionContainer}
 	       multiline={true}
         placeholder="Write your notebook Description!!!"
 	       numberOfLines={10}
 	       blurOnSubmit={false}
         onChangeText={(text) => {
                        this.setState({Description:text})
                    }}

          // value={this.state.text}
         />
         <Button style={styles.ButtonContainer}
         onPress={this.SaveButtonPress}
         title="Save"
         //titleColor="black"
         />
      </View>
      // <Text>Add a New Note</Text>
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
