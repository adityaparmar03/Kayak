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

export default vendor;
