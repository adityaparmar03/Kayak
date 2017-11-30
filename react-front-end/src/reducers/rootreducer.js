import {combineReducers} from 'redux';
import userProfile from './userProfile';
import userHistory from './userHistory';
import userSearch from './userSearch';
import userBooking from './userBookings';
import vendor from './vendor';


const rootReducer = combineReducers({userProfile,userHistory,userSearch,userBooking, vendor});
export default rootReducer;

