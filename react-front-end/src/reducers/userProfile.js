import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';

var initialstate = {
    isLoggedIn:null,
    firstname:null,
    lastname:null,
    isadmin:false,
    email:null,
    address:null,
    zipcode:null,
    phonenumber:null,
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
                email:action.payload.data[0].email,
                firstname:action.payload.data[0].first_name,
                lastname:action.payload.data[0].last_name,
                phonenumber:action.payload.data[0].phone,
                zipcode:action.payload.data[0].zipcode,
                imgpath:action.payload.data[0].profile_image_path
            }


            return state ;


        default :
            return state;

    }
}

export default userProfile;
