import * as Constants from '../constants/constants'

export function signIn(isLoggedIn, isAdmin, firstName, lastName, email, password, card, carBookings, hotelBookings, flightBookings, carSearchResults,
                       hotelSearchResults, flightSearchResults, booking) {
    return {
        type: Constants.SIGN_IN,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        card: card,
        carBookings: carBookings,
        hotelBookings: hotelBookings,
        flightBookings: flightBookings,
        carSearchResults: carSearchResults,
        hotelSearchResults: hotelSearchResults,
        flightSearchResults: flightSearchResults,
        booking: booking
    }
}

