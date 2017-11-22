import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';


function userBooking(state = [], action) {

    switch (action.type) {

        case Constants.SIGN_IN :
            return action.booking

        default :
            return state;

    }
}


export default userBooking;
