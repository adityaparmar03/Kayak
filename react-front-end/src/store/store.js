import RootReducer from '../reducers/rootreducer'
import {createStore} from 'redux'

const store = createStore(
    RootReducer
);

export default store;