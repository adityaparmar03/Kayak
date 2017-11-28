import * as Constants from '../constants/constants'

export function signIn(action) {
    
    return {
        type: Constants.SIGN_IN,
        payload: action
    }
}


export function flightSearch(flights) {

    return {
        type : Constants.SEARCH_FLIGHT,
        flightSearchResults : flights
    }
};


export function hotelSearch(hotels) {

    return {
        type : Constants.SEARCH_HOTEL,
        hotelSearchResults : hotels
    }
};


export function carSearch(cars) {

    return {
        type : Constants.SEARCH_CAR,
        carSearchResults : cars
    }
};

