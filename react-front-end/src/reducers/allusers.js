import * as Constants from '../constants/constants'

var initialstate ={
    users:[]
}


function alluser(state=[],action,key){

    switch (action.type) {

        case Constants.ALL_USERS :
           return action.payload.data;

        case Constants.DELETE_USER :
            state=[
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ]
            return state;


        default:
            return state;
    }
}

export default alluser;