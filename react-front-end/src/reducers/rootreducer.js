import {combineReducers} from 'redux';
import userProfile from './userProfile';
import userSearch from './userSearch';
import userBooking from './userBooking';
import adminTask from './adminTask';



const rootReducer = combineReducers({userProfile,userSearch,userBooking, adminTask});
export default rootReducer;

