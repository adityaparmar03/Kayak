import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';


function carSearch(state = [], action) {

    switch (action.type) {

        case Constants.SIGN_IN :
            return action.carSearchResults

        default :
            return state;

    }
}


function hotelSearch(state = [], action) {

    switch (action.type) {

        case Constants.SIGN_IN :
            return action.hotelSearchResults

        default :
            return state;

    }
}


function flightSearch(state = [], action) {

    switch (action.type) {

        case Constants.SIGN_IN :
            return action.flightSearchResults

        default :
            return state;

    }
}


const userSearch = combineReducers({carSearch, hotelSearch, flightSearch});
export default userSearch;
