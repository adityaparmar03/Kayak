import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';

var initialState = {

    flight:{},
    car:{},
    hotel:{}

}


function userBooking(state = initialState, action) {

    switch (action.type) {

        case Constants.USER_HISTORY :
            state = {
                ...state,
                car:action.payload.data.car,
                flight:action.payload.data.flight,
                hotel:action.payload.data.hotel
            }
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(state);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~");

            return state;

        default :
            return state;

    }
}


export default userBooking;
