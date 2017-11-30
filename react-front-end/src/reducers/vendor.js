import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';
/*
var initialstate = {
    vendorId:"",
    vendorname:"",
    servicetype:"",
    vendorapi:""
}*/

function vendor(state = [], action) {

    switch (action.type) {

        case Constants.GET_VENDORS :
            return action.vendors

        case Constants.DELETE_VENDOR :
            return {
                files:[
                    ...state.slice(0, action.index),
                    ...state.slice(action.index + 1)
                ]
            }

        case Constants.ADD_VENDOR :
            return {
                state:[
                    ...state,
                    action.vendor
                ]
            }

        default :
            return state;

    }
}

export default vendor;
