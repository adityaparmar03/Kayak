import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';

var initialState = {

    flightbooking:[],
    carbooking:[],
    hotelbooking:[],
    flightsearch:[],
    carsearch:[],
    hotelsearch:[]

}


function userHistory(state = initialState, action) {

    switch (action.type) {

        case Constants.BOOKING_HISTORY :
            state = {
                ...state,
                carbooking:action.payload.data.car,
                flightbooking:action.payload.data.flight,
                hotelbooking:action.payload.data.hotel
            }
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(state);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~");

            return state;

        case Constants.SEARCH_HISTORY :
            state = {
                ...state,
                carsearch:action.payload.car,
                flightsearch:action.payload.flight,
                hotelsearch:action.payload.hotel
            }
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(state);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~");

            return state;

        default :
            return state;

    }
}


export default userHistory;
