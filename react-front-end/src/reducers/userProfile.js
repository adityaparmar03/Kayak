import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';

var initialstate = {
    isLoggedIn:false,
    firstname:" ",
    lastname:" ",
    isadmin:false,
    email:" ",
    address:" ",
    zipcode:" ",
    phonenumber:" ",
    imgpath:" "

}

function userProfile(state = initialstate, action) {

    switch (action.type) {
        case Constants.SIGN_IN :
            console.log("*****************");
            console.log(action.payload);
            console.log("*****************");
            if(action.payload.data==="ADMIN"){
                state= {
                    ...state,
                    isadmin:true
                }
            }
            state= {
                ...state,
                isLoggedIn:true,
                email:action.payload.data[0].email
            }


            return state ;


        default :
            return state;

    }
}

export default userProfile;
