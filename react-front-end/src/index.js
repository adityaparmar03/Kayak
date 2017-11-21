import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from "./components/home";
import { createStore } from 'redux';
import reducer from './reducers/index';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
         <Router>
         <MuiThemeProvider> 
            <div>
       
                <Route exact path="/" component={Home}/>
                <Route exact path="/flight" component={Home}/>
                <Route exact path="/hotel" component={Home}/>
                <Route exact path="/car" component={Home}/>
                <Route exact path="/flightlist" component={Home}/>
                <Route exact path="/hotellist" component={Home}/>
                <Route exact path="/carlist" component={Home}/>
       
        
            </div>
            </MuiThemeProvider>
     </Router>
    </Provider>
    ,
    document.getElementById('root')
);