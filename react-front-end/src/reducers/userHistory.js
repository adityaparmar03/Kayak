import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';


function carBookingHistory(state = [], action) {

    switch (action.type) {

        case Constants.SIGN_IN :
            return action.carBookings

        default :
            return state;

    }
}

function hotelBookingHistory(state = [], action) {

    switch (action.type) {

        case Constants.SIGN_IN :
            return action.hotelBookings

        default :
            return state;

    }
}

function flightBookingHistory(state = [], action) {

    switch (action.type) {

        case Constants.SIGN_IN :
            return action.flightBookings

        default :
            return state;

    }
}


const userHistory = combineReducers({carBookingHistory, hotelBookingHistory, flightBookingHistory});
export default userHistory;
