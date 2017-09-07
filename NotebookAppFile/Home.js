import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,FlatList,ScrollView,Image,TouchableHighlight,Alert
} from 'react-native';
import singleToneDataManager from './SingleToneClass.js';
import firebaseClassManager from './FireBaseDatabaseClass.js';
import AddNotebookClass from './NewNotebook.js';
import {StackNavigator} from 'react-navigation';
import Navigation from './Route.js';
// import DetailsNotebookClass from './DetailsSelectedNote';


var self;
var rowData;
// var fireData = firebaseClassManager.getInstance();
// var commonDataSingletone = singleToneDataManager.getInstance();

// const Navigation=StackNavigator({
//   //  Login:{screen:LoginClass},
//   //  SignUp:{screen:SignUpClass},
//   //  Home:{screen:HomeClass},
//    NewNote:{screen:AddNotebookClass},
//    DetailsNote:{screen:DetailsNotebookClass}
//
// });
// export default Navigation;
export default class HomeClass extends Component {
  //


  static navigationOptions = ({ navigation }) => ({
    title: 'Home Page',
    gesturesEnabled:false,
       headerLeft:(
        <Button
          title='Log Out'
          onPress={()=>self.logoutAction()}
        />
      )
      // headerLeft:(<Button onPress={() => navigation.goBack(null)} />)
  });


  constructor() {

    super();
    //
      this.state={
        NotebookArray: singleToneDataManager.getInstance().getDictNotebookDetailsArray(),
    };
    }

    logoutAction=()=>{

       firebaseClassManager.getInstance()._FirebaseLogout();
       var dataDetails =  singleToneDataManager.getInstance().getReturnValue();
         console.log(dataDetails);
         if (dataDetails=="1") {
            self.props.navigation.goBack();
             singleToneDataManager.getInstance().setReturnValue("0");
             singleToneDataManager.getInstance().setDictNotebookDetailsArrayD(null);
             singleToneDataManager.getInstance()._SelectedNoteArray=[];
         }
    }

  refresh(){

    var dataDetails =  singleToneDataManager.getInstance().getDictNotebookDetailsArray();
    console.log("@@@@@");
    console.log(dataDetails);
    var IdDetails =  singleToneDataManager.getInstance().getLoginDetailsArray();
    var uid=IdDetails["uid"];
   firebaseClassManager.getInstance()._FirebaseStoreData(uid,IdDetails,dataDetails);

    this.setState({
      NotebookArray: dataDetails,
    });
    console.log(this.state.NotebookArray);
}

  DetailsButtonPressed(value){
    console.log("+++++++++++reached+++++++++++");
    console.log(value);
     self.props.navigation.navigate('DetailsNote',{
      ValueData:value, onGoBack : () => self.refresh(),
     });

  }
  AddButtonPress(){

  self.props.navigation.navigate('NewNote', {
    onGoBack: () => self.refresh(),
  });

  }

  DeleteButtonPressed=(value)=>{

    console.log(value);

    for (var i = 0; i <this.state.NotebookArray.length; i++) {
      if (this.state.NotebookArray[i]== value) {
        var index = i;
        console.log(index);
        this.state.NotebookArray.splice(index,1);
        // delete this.state.NotebookArray[i][0];
      }
    }
    var details=this.state.NotebookArray

    console.log("updated row is");
    console.log(this.state.NotebookArray);

     singleToneDataManager.getInstance().setDictNotebookDetailsArrayD(this.state.NotebookArray);
    var dataDetails =  singleToneDataManager.getInstance().getDictNotebookDetailsArray();
    var IdDetails =  singleToneDataManager.getInstance().getLoginDetailsArray();

    var uid=IdDetails["uid"];
    for (var i = 0; i < dataDetails.length; i++) {

      dataDetails[i]["NoteID"]=i;
      dataDetails[i]["UserID"]=IdDetails["uid"];
      // console.log(dataDetails[i][0]);
    }

      firebaseClassManager.getInstance()._FirebaseStoreData(uid,IdDetails,dataDetails);
      this.setState({
        NotebookArray: details,

      });
    //
    // this.setState({
    //   NotebookArray: dataDetails,
    // });
  }

  ParseData(){

   console.log("!!!!!");
   console.log(self.state.NotebookArray);
    if (self.state.NotebookArray) {
      return self.state.NotebookArray.map((data,i) => {

        console.log(data);
          return (

          <View style={styles.TableContainer}
          key={i}>
         <View style={styles.SidebySidBecontainer}>
         <View>

          <Text key={i}>{data.NotebookName}</Text>

          </View>

          <View style={styles.SidebySidBtnecontainer}>
          <TouchableHighlight value={data} onPress={() =>
            this.DetailsButtonPressed(data)}>
            <Image
           style={styles.Optbtn}
           source={require('./AssetFile/details.png')}
          />
          </TouchableHighlight>
          <TouchableHighlight value={data} onPress={() =>
            this.DeleteButtonPressed(data)}>
          <Image
           style={styles.OptbtnDelete}
           source={require('./AssetFile/delete.png')}
          />
          </TouchableHighlight>

          </View>
      </View>
        </View>
        )
      }
    )
  }else {
    console.log("*****************nop");
  }

  }
CreateUI(){

  return(
    <View style={styles.container}>
     <View style={styles.SidebySidecontainer}>
      <View style={styles.textContainer}>
        <Text style={{color:'blue'}}>username</Text>
      </View>
      <TouchableHighlight onPress=
      {this.AddButtonPress}>
     <Image
       style={styles.btn}
       source={require('./AssetFile/plus.png')}
     />
     </TouchableHighlight>
    </View>

    <ScrollView>
    {this.ParseData()}
    </ScrollView>
      </View>
  )

}

  render(){
     const { navigate } = this.props.navigation;
     self=this;
      console.log( singleToneDataManager.getInstance().getDictNotebookDetailsArray());
     console.log("*++++*");
     console.log(this.state.NotebookArray)
     return(
      <View style={styles.Maincontainer}>
        {this.CreateUI()}
      </View>
    );
  }
}

const styles=StyleSheet.create(
  {
    Maincontainer:{
      marginLeft:0,
      flex:1,
      paddingLeft:0,
      paddingRight:0
    },
    textContainer:{
      height:20,
      width:100,
    },
    mainviewContainer:{
      marginTop:40,
      marginLeft:20,
      marginRight:20,
      height:500,
      // width:350,
      backgroundColor:'white'
    },
    SidebySidBtnecontainer:{
        flexDirection:'row',
        marginLeft:-20,
        justifyContent:'center'
    },
    SidebySidecontainer:{
      flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between'
    },
    container:{
      // marginTop:40,
      marginLeft:20,
      flex:1,
      paddingLeft:15,
      paddingRight:15
    },
    btn:{
      marginTop:0,
      // marginLeft:200,
      height:40,
      width:40,
      // marginRight:50,
    },
    Optbtn:{
      // marginLeft:200,
      height:30,
      width:30,
    },
    OptbtnDelete:{
      marginLeft:230,
      height:40,
      width:40,
    },
    TableContainer:{
      justifyContent:'center',
      marginTop:5,
      marginBottom:5,
      //alignItems:'center'
    },

    AddButtonContainer:{
      //height:20,
      marginTop:0,
      marginRight:20,
      width:100,
      flexDirection:'row',
      backgroundColor:'blue',
    },

    itemList:{
      padding:10,
      fontSize:15,
      height:40,
    },

  }
)
