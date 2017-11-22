import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {red500,deepOrange500} from 'material-ui/styles/colors'

import FlatButton from 'material-ui/FlatButton';


import '../css/home.css'
//Compnents
import Flightsearch from './flightsearch'
import Hotelsearch from './hotelsearch'
import Carsearch from './carsearch'
class Home extends Component {

  
    
     
    componentWillMount(){
        //injectTapEventPlugin()
    }
   
    handleSearch(){
    
    }
     
    render(){
        return(
            <div  style={{ backgroundImage: 'url(' + require('../image/flightbg.jpg') + ')', height: '600px'}}>
            
        <nav className="navbar navbar-expand-lg navbar-dark" >

 
             <a className="navbar-brand" href="#"><img width="120px" src={require('../image/kayaklogo.png')}/></a>

 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

  
             <div className="collapse navbar-collapse" id="navbarSupportedContent">

    
            <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Flights</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Hotels</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cars</a>
                        </li>
            

           

             </ul>
     
                <form className="form-inline">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="modal" data-target="#modalLRForm">My Account</a>
                            </li>
                            
                        </ul>
                </form>
            </div>
  
        </nav>


       

                <p style={{color:'white',
                fontWeight:'700',fontSize:'25',
                marginTop:'5%',marginLeft:"30%",
                marginRight:"30%"}}>Search hundreds of travel sites at once.</p>

                <div style={{marginLeft:'25%',marginRight:'25%',marginTop:"5%"}}>        
                <ul className="nav nav-tabs nav-justified" role="tablist">
   
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#flight" role="tab"><i className="fa fa-plane"></i> <b> FLIGHTS</b></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#hotel" role="tab"><i className="fa fa-hotel"></i><b>  HOTELS</b></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#car" role="tab"><i className="fa fa-car"></i><b> CARS</b></a>
                    </li>
                </ul>
                </div>
<div className="tab-content">

    <div className="tab-pane fade in show active" id="flight" role="tabpanel" 
    style={{paddingTop:"8%",marginTop:'-9%'}}>
       <Flightsearch/>
    </div>

    <div className="tab-pane fade" id="hotel" role="tabpanel">
        
     </div>
  
    <div className="tab-pane fade" id="car" role="tabpanel">
        
    </div>

    
   
</div>

<div className="modal fade" id="modalLRForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog cascading-modal" role="document">
      
        <div className="modal-content">

         
            <div className="modal-c-tabs">

             
                <ul className="nav nav-tabs tabs-2 light-blue darken-3" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#panel7" role="tab"><i className="fa fa-user mr-1"></i> Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#panel8" role="tab"><i className="fa fa-user-plus mr-1"></i> Register</a>
                    </li>
                </ul>

      
                <div className="tab-content">
                   
                    <div className="tab-pane fade in show active" id="panel7" role="tabpanel">

                        
                        <div className="modal-body mb-1">
                            <div className="md-form form-sm">
                                <i className="fa fa-envelope prefix"></i>
                                <input type="email" id="form22" className="form-control validate"/>
                                <label data-error="wrong" data-success="right" htmlFor="form22">Your email</label>
                            </div>
                            
                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form23" className="form-control validate"/>
                                <label data-error="wrong" data-success="right" htmlFor="form23">Your password</label>
                            </div>
                            <div className="text-center mt-2">
                                <button className="btn btn-info" onClick="">Log in <i className="fa fa-sign-in ml-1"></i></button>
                            </div>
                        </div>
                
                        <div className="modal-footer">
                            <div className="options text-center text-md-right mt-1">
                                <p>Not a member? <a href="#" className="blue-text">Sign Up</a></p>
                                <p>Forgot <a href="#" className="blue-text">Password?</a></p>
                            </div>
                            <button type="button" 
                            className="btn btn-outline-info waves-effect ml-auto" 
                            data-dismiss="modal">Close</button>
                        </div>

                    </div>
                

                
                    <div className="tab-pane fade" id="panel8" role="tabpanel">

                   
                        <div className="modal-body">
                            <div className="md-form form-sm">
                                <i className="fa fa-envelope prefix"></i>
                                <input type="email" id="form24" className="form-control validate"/>
                                <label data-error="wrong" data-success="right" htmlFor="form24">Your email</label>
                            </div>

                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form25" className="form-control validate"/>
                                <label data-error="Invalid" data-success="right" htmlFor="form25">Your password</label>
                            </div>

                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form26" className="form-control validate"/>
                                <label data-error="Invalid" data-success="right" htmlFor="form26">Repeat password</label>
                            </div>

                            <div className="text-center form-sm mt-2">
                                <button className="btn btn-info" onClick="">Sign up <i className="fa fa-sign-in ml-1"></i></button>
                            </div>

                        </div>
                        
                        <div className="modal-footer">
                            <div className="options text-right">
                                <p className="pt-1">Already have an account? <a href="#" className="blue-text">Log In</a></p>
                            </div>
                            <button type="button" className="btn btn-outline-info waves-effect ml-auto" data-dismiss="modal">Close</button>
                        </div>
                    </div>
               
                </div>

            </div>
        </div>
     
    </div>
</div>




            </div>

        )
    }
}

export default Home;