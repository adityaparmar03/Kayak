import {combineReducers} from 'redux';
import userProfile from './userProfile';
import userSearch from './userSearch';
import userBooking from './userBookings';
import vendor from './vendor';


const rootReducer = combineReducers({userProfile,userSearch,userBooking, vendor});
export default rootReducer;

