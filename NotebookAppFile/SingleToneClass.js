import React, { Component } from 'react';

// export var DictNotebookDetailsArray:[];
export default class singleToneDataManager {

    static sharedInstance = null;

    _userID = "";
     _DictNotebookDetailsArray=[];
    _SelectedNoteArray=[];
    _returnValue="";
    _loginDetailsArray=[];
   _registeredUsersArray=[];
    /**
     * @returns {singleToneDataManager}
     */
    static getInstance() {
        if (this.sharedInstance == null) {
            this.sharedInstance = new singleToneDataManager();
        }

        return this.sharedInstance;
    }

    getUserID() {
        return this._userID;
    }
    getReturnValue(){
      return this._returnValue;
    }
    setReturnValue(id){
      this._returnValue=id;
    }
    setUserID(id) {
        this._userID = id;
    }
    getDictNotebookDetailsArray() {
        return this._DictNotebookDetailsArray;
    }

    setDictNotebookDetailsArrayD(id) {
        this._DictNotebookDetailsArray = id;
    }
    getSelectedNoteArray() {
        return this._SelectedNoteArray;
    }

    setSelectedNoteArray(id) {
        this._SelectedNoteArray = id;
    }
    getLoginDetailsArray() {
        return this._loginDetailsArray;
    }

    setLoginDetailsArray(id) {
        this._loginDetailsArray = id;
    }
    // getRegisteredUsersArray() {
    //     return this._registeredUsersArray;
    // }
    //
    // setRegisteredUsersArray(id) {
    //     this._registeredUsersArray = id;
    // }
}
