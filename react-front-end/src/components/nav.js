import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';

var Regex= require('regex');
var regex = new Regex(/\S+@\S+\.\S+/);

class Nav extends Component {


    componentWillMount(){
       
    }
    state = {
                navpopup:false,
                IsLogged:false,
                email:null,
                password:null,
                repeatpassword:null
               
    };
//********************************************************
    registerButton(){
      console.log("I am inside the registerButton");
      console.log(this.state.password);
      console.log(this.state.repeatpassword);
      if(this.state.password===this.state.repeatpassword && this.state.email!=null) {
  
    console.log("+++++++++");
      //console.log(regex.test("smcool100@gmail.com"));
     var payload = {
        "email" :this.state.email,
        "password": this.state.password
     }
     API.doRegister(payload).then((data)=>{
        console.log("after the registration is complete");
     })

    }
    }

//********************************************************
    displaypopup(){
        if(this.state.navpopup){
            if(this.state.IsLogged){
                return <div style={{marginTop:"4.5%",minWidth:"200px",position: 'absolute',
                top: '0px', left: '0px', marginLeft:"83%",marginRight:"0%",borderRadius:"0",zIndex:"2"}} className="card">
                   <div className="card-body"> 
                       <button type="button" className="btn btn-deep-orange btn-block"
                       onClick={()=>this.handlepopup()} >Profile</button>
                       <button type="button" className="btn btn-outline-deep-orange waves-effect btn-block"
                       onClick={()=>this.handlepopup()}>Sign Out</button>
                       
                   </div>
                
               </div> 
            }
            else{
                return <div style={{marginTop:"4.5%",minWidth:"200px",position: 'absolute',
                top: '0px', left: '0px', marginLeft:"83%",marginRight:"0%",borderRadius:"0",zIndex:"2"}} className="card">
                   <div className="card-body"> 
                       <button type="button" className="btn btn-deep-orange btn-block"
                        data-toggle="modal" data-target="#modalLRForm" onClick={()=>this.handlepopup()}>SIGN UP</button>
                       <button type="button" className="btn btn-outline-deep-orange waves-effect btn-block" data-toggle="modal" data-target="#modalLRForm"
                       onClick={()=>this.handlepopup()}>SIGN IN</button>
                       
                   </div>
                
               </div>
            }
            
        }
        
    }

 //********************************************************    
    handlepopup(){
        this.setState({navpopup:!this.state.navpopup})
    } 

 //********************************************************   

    render(){
        return(
            <div >
                <nav className="navbar navbar-expand-lg navbar-dark" >

 
             <a className="navbar-brand" href="#"><img width="120px" src={require('../image/kayaklogo.png')}/></a>

 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

  
             <div className="collapse navbar-collapse" id="navbarSupportedContent">

    
            <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/flight">Flights</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/hotel">Hotels</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/car">Cars</a>
                        </li>
            

           

             </ul>
     
                <form className="form-inline">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item" onClick={()=>this.handlepopup()}>
                                <a className="nav-link">My Account</a>
                            </li>
                            
                        </ul>
                </form>
            </div>
  
        </nav>
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
                                <input type="email" id="form24" className="form-control validate"
                                 value = {this.state.email}
                                 onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}/>
                                <label data-error="wrong" data-success="right" htmlFor="form24">Your email</label>
                            </div>

                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form25" className="form-control validate"
                                 value = {this.state.password}
                                 onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}/>
                                <label data-error="Invalid" data-success="right" htmlFor="form25">Your password</label>
                            </div>

                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form26" className="form-control validate"
                                value = {this.state.repeatpassword}
                                 onChange={(event) => {
                                    this.setState({
                                        repeatpassword: event.target.value
                                    });
                                }}/>

                                
                                <label data-error="Invalid" data-success="right" htmlFor="form26">Repeat password</label>
                            </div>

                            <div className="text-center form-sm mt-2">
                                <button className="btn btn-info" onClick={()=>{this.registerButton();}}>Sign up <i className="fa fa-sign-in ml-1"></i></button>
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
              {this.displaypopup()}  
            </div>
        )
    }
}

export default Nav;