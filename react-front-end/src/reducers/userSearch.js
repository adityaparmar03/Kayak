import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';


function carSearch(state = [], action) {

    switch (action.type) {

        case Constants.SEARCH_CAR :
            return action.carSearchResults

        default :
            return state;

    }
}


function hotelSearch(state = [], action) {

    switch (action.type) {

        case Constants.SEARCH_HOTEL :
            return action.hotelSearchResults

        default :
            return state;

    }
}


function flightSearch(state = [], action) {
//console.log(action)
    switch (action.type) {

        case Constants.SEARCH_FLIGHT :
            return action.flightSearchResults

        default :
            return state;

    }
}


const userSearch = combineReducers({carSearch, hotelSearch, flightSearch});
export default userSearch;
