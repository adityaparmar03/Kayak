import {combineReducers} from 'redux';
import userProfile from './userProfile';
import userSearch from './userSearch';
import userBooking from './userBooking';
import vendor from './vendor';
import allUsers from './allusers';


const rootReducer = combineReducers({userProfile,userSearch,userBooking, vendor,allUsers});
export default rootReducer;

