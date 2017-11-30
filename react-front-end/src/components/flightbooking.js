import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';

class FlightBooking extends Component {

    constructor(props){
        super(props);
        this.state = {
            progress:'100%'
        }
     }
    componentWillMount(){
      
    }

    render(){
        return(
            <div>
                <div style={{backgroundColor:'black'}}>
                <Nav/>
                </div>
                
                    <div style={{padding:'2%',paddingLeft:'10%',paddingRight:'10%'}}>
                        <div className="card">
                    
                        <div className="card-header mdb-color lighten-1 white-text">
                            Booking Details 
                        </div>
                                <div className="card-body">
                                    <p>Type: Flight</p>
                                    <p>Type: Flight</p>
                                    <p>Type: Flight</p>
                                </div>
                        </div>         
                        
                    
                        <div className="card">
                    
                        <div className="card-header mdb-color lighten-1 white-text">
                            Personal Details 
                        </div>
                                <div className="card-body">
                                    <p>Type: Flight</p>
                                    <p>Type: Flight</p>
                                    <p>Type: Flight</p>
                                </div>
                        </div>         
                        
                    
                        <div className="card">
                    
                        <div className="card-header mdb-color lighten-1 white-text">
                            Payment 
                        </div>
                                <div className="card-body">
                                    <p>Type: Flight</p>
                                    <p>Type: Flight</p>
                                    <p>Type: Flight</p>
                                </div>
                        </div>         
                        
                     </div> 
                
                 
            </div>
        )
    }
}

export default FlightBooking;