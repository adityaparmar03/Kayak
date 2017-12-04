import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';
import userProfile from "../reducers/userProfile";
import AlertContainer from 'react-alert'

var Regex= require('regex');
var regex = new Regex(/\S+@\S+\.\S+/);

class Nav extends Component {


    componentWillMount(){


     // API.doLogout().then((data)=>{
     //        console.log("adf");
     //    })
     //
   API.checkSession().then((data)=>{
   
    if(data.status===201){
        
    
        //this.successshowAlert(data.data.value);
        this.props.signIn(data);
    }

   })


    }
//********************************************************
    state = {
                navpopup:false,
                IsLogged:false,
                email:null,
                password:null,
                repeatpassword:null,
                modalValue:null

    };
//********************************************************
    registerButton() {
       
        var flag = 0;
        if (this.state.password === this.state.repeatpassword && this.state.email != null) {
            
            var payload = {
                "email": this.state.email,
                "password": this.state.password
            }
           

            if (!this.validateEmail(this.state.email)) {
                flag = flag + 3;
                
            }


                if(flag==0){
                    API.doRegister(payload).then((data) => {
                        
                                            if (data.status == 201) {
                                                console.log("after the registration is complete");
                                                this.successshowAlert("You have succesfully registered");
                                            }
                                            else {
                                                console.log(data);
                                                this.errorshowAlert(data.value);
                                            }
                        
                        
                                        }).catch((error) => {
                                            console.log("error");
                                        })
                }
                else{
                    this.errorshowAlert("Please Enter Valid Email.");
                }
               

        }
        else{
            this.errorshowAlert("Passwords does not match");
        }
    }
//********************************************************
        logout()
        {
            this.handlepopup();
            API.doLogout().then((data) => {
                if (data.status == 201) {
                    console.log("User logged out");
                    this.successshowAlert(data.value);
                    this.props.userprofile.isLoggedIn = false;
                    this.props.history.push('/');

                }
            })
        }

//********************************************************
        validateZipCode(elementValue)
        {
            var zipCodePattern;
            if (elementValue.indexOf('-') > -1) {
                zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
            } else {
                zipCodePattern = /^\d{5}$/;
            }

            //console.log("Zip Validation : ",zipCodePattern.test(elementValue))
            return zipCodePattern.test(elementValue);
        }
//********************************************************
        validateEmail(mail)
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                console.log("true");
                return (true)
            }
            console.log("false");
            return (false)
        }

//********************************************************
        telephoneCheck(str)
        {
            var isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
            return isphone;
        }
//****************************************************
        loginButton()
        {

            //console.log(regex.test("smcool100@gmail.com"));
            var payload = {
                "email": this.state.email,
                "password": this.state.password
            }
            //console.log(payload);
            API.doLogin(payload).then((data) => {
                //console.log(data);
                if (data.status === 201) {

                    this.successshowAlert("Login Success");
                    //this.props.history.push('/');

                    this.props.userprofile.isLoggedIn = true;

                    if (data.user_role == "USER") {
                        window.location.reload();
                    }

                    else if (data.user_role == "ADMIN") {
                        window.location.reload();
                        this.props.history.push('/admin');
                    }

                    else if (data.user_role == "VENDOR") {
                        window.location.reload();
                        this.props.history.push('/vendor');
                    }

                    // this.props.history.push(this.props.location.pathname);
                    //  console.log("Before getting in the signin reducer  "+ this.props.userprofile.isLoggedIn)
                    // this.props.signIn(data);
                }
                else {
                    this.errorshowAlert(data.value);
                }
            })


        }


//********************************************************



    displaypopup(){
        if(this.state.navpopup){
            if(this.props.userprofile.isLoggedIn){
                return <div style={{marginTop:"4.5%",minWidth:"200px",position: 'absolute',
                top: '0px', left: '0px', marginLeft:"83%",marginRight:"0%",borderRadius:"0",zIndex:"2"}} className="card">
                   <div className="card-body">
                       <button type="button" className="btn btn-deep-orange btn-block"
                       onClick={()=>{
                           this.props.history.push('/profile');
                           this.handlepopup()}} >Profile</button>
                       <button type="button" className="btn btn-outline-deep-orange waves-effect btn-block"
                       onClick={()=>this.logout()}>Sign Out</button>

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
    alertOptions = {
        offset: 14,
        position: 'top center',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      }

     errorshowAlert = (msg) => {
        this.msg.show(msg, {
          time: 5000,
          type: 'success',
          icon: <img src={require('../image/error.png')} />
        })
      }

     successshowAlert = (msg) => {
        this.msg.show(msg, {
          time: 5000,
          type: 'success',
          icon: <img src={require('../image/success.png')} />
        })
      }

    render(){
        return(
            <div >
                 <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
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
                                <input type="email" id="form22" placeholder="Email" className="form-control validate"
                                       value = {this.state.email}
                                 onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}/>


                            </div>

                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form23" placeholder="password" className="form-control validate"
                                value = {this.state.password}
                                 onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}/>


                            </div>
                            <div className="text-center mt-2">
                                <button className="btn btn-info"  data-dismiss={this.state.modalValue}
                                        onClick={()=>{
                                           // console.log(this.state.modalValue)
                                            this.loginButton();}}>Log in <i className="fa fa-sign-in ml-1"></i></button>
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
                                <input type="email" id="form24" placeholder="Email" className="form-control validate"
                                 value = {this.state.email}
                                 onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}/>

                            </div>

                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form25" placeholder="Password" className="form-control validate"
                                 value = {this.state.password}
                                 onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}/>

                            </div>

                            <div className="md-form form-sm">
                                <i className="fa fa-lock prefix"></i>
                                <input type="password" id="form26" placeholder="Password" className="form-control validate"
                                value = {this.state.repeatpassword}
                                 onChange={(event) => {
                                    this.setState({
                                        repeatpassword: event.target.value
                                    });
                                }}/>

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


function mapStateToProps(reducerdata) {
   // console.log(reducerdata);
  const userprofile = reducerdata.userProfile;

  console.log(userprofile);

    return {userprofile};
}

function mapDispatchToProps(dispatch) {
    return {
        signIn : (data) => dispatch(Actions.signIn(data))

    };
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
