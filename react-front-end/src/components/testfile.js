import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API'
class Welcome extends Component {


    componentWillMount(){
       
    }

    render(){
        return(
            <div>
                <h1>Hello, This is Kayak!!</h1>
                
                
            </div>
        )
    }
}

export default Welcome;