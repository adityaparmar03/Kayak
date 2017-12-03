import {combineReducers} from 'redux';
import userProfile from './userProfile';
import userSearch from './userSearch';
import userHistory from './userHistory';
import adminTask from './adminTask';



const rootReducer = combineReducers({userProfile,userSearch,userHistory, adminTask});
export default rootReducer;

