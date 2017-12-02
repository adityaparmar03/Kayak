import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';



function vendor(vendors = [], action) {

    switch (action.type) {

        case Constants.GET_VENDORS :
            return action.vendors


        case Constants.DELETE_VENDOR :
            vendors=[
            ...vendors.slice(0, action.index),
            ...vendors.slice(action.index + 1)
            ]
            return vendors;



        case Constants.ADD_VENDOR :

           vendors=[
                ...vendors,
                action.vendor
            ]

            return  vendors;



        default :
            return vendors;

    }
}

function bill(bills = [], action) {

    switch (action.type) {

        case Constants.GET_BILLS :
            return action.bills

        default :
            return bills;

    }
}


function user(users=[], action){

    switch (action.type) {

        case Constants.ALL_USERS :
            return action.payload.data;

        case Constants.DELETE_USER :
            const userslist=[
                ...users.slice(0, action.index),
                ...users.slice(action.index + 1)
            ]
            return userslist;


        default:
            return users;
    }
}


const adminTask = combineReducers({user, bill, vendor});
export default adminTask;
