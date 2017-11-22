import {combineReducers} from 'redux';
import userProfile from './userProfile';
import userHistory from './userHistory';
import userSearch from './userSearch';
import userBooking from './userBookings';


const rootReducer = combineReducers({userProfile,userHistory,userSearch,userBooking});
export default rootReducer;

