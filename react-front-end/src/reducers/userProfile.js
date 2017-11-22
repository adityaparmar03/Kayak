import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';


function userProfile(state = {}, action) {

    switch (action.type) {
        case Constants.SIGN_IN :

            return {
                isLoggedIn: action.isLoggedIn,
                isAdmin: action.isAdmin,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                password: action.password,
                card: action.card
            }

        default :
            return state;

    }
}

export default userProfile;



