import React, {Component} from 'react';
import './App.css';
import Home from "./components/home";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
  
  });

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider muiTheme={muiTheme}>
                <Home/>
                </MuiThemeProvider>
               
            </div>
        );
    }
}

export default App;
