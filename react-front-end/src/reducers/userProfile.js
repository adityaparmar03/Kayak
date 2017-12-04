import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';

var initialstate = {
    isLoggedIn:false,
    firstname:null,
    lastname:null,
    isadmin:false,
    email:null,
    address:null,
    zipcode:null,
    phonenumber:null,
    imgpath:null,
    creditcard:null

}

function userProfile(state = initialstate, action) {

    switch (action.type) {
        case Constants.SIGN_IN :
            console.log("*****************");
            console.log("Siddharth");
            console.log(action.payload.data);
            console.log("*****************");
            if(action.payload.data.data[0].user_role=="ADMIN"){
                state= {
                    ...state,
                    isadmin:true
                }
            }

            // // if(action.payload.data[0].first_name=='null'){
            // //     action.payload.data[0].first_name="";
            // //
            // // }
            // // if(action.payload.data[0].last_name=='null'){
            // //     console.log("inside lastnamenull");
            // //     action.payload.data[0].last_name="";
            // // }
            // // if(action.payload.data[0].phone=='null'){
            // //     action.payload.data[0].phone="";
            // // }
            // // if(action.payload.data[0].zip_code=='null'){
            // //     action.payload.data[0].zip_code="";
            // // }
            // // if(action.payload.data[0].profile_image_path=='null'){
            // //     action.payload.data[0].profile_image_path="";
            // // }
            // // if(action.payload.data[0].street_address=='null'){
            // //     action.payload.data[0].street_address="";
            // // }
            // // if(action.payload.data[0].credit_card_number=='null'){
            // //     action.payload.data[0].credit_card_number="";
            // // }
            //
            state= {
                ...state,
                isLoggedIn:true,
                email:action.payload.data.data[0].email,
                firstname:action.payload.data.data[0].first_name,
                lastname:action.payload.data.data[0].last_name,
                phonenumber:action.payload.data.data[0].phone,
                zipcode:action.payload.data.data[0].zip_code,
                imgpath:action.payload.data.data[0].profile_image_path,
                address:action.payload.data.data[0].street_address,
                creditcard:action.payload.data.data[0].credit_card_number
            }


            return state ;


        default :
            return state;

    }
}

export default userProfile;
