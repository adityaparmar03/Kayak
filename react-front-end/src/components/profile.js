import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Nav from './nav'
import {connect} from 'react-redux';
import * as Actions from '../actions/action';
import * as API from '../api/API';
import UserTrip from './usertrips'


class Profile extends Component {

    constructor(props){
        super(props);
        this.state =
            {
                email:"",
                firstname:"",
                lastname:"",
                address:"",
                zipcode:"",
                phonenumber:"",
                imgpath:"",
                creditcard:""

            }
    }


    componentWillMount(){
        console.log("willmountcalling");
        API.checkSession().then((data)=>{
            console.log("inside the check session response");
                 console.log(data);
                 console.log("aaaaaaaaaaaaaaaaa");
            if(data.status===201){
                console.log("user logged in ");
                console.log(data);
                console.log("*************");
                this.props.signIn(data);
                this.setState({
                    email:this.props.userprofile.email,
                        firstname:this.props.userprofile.firstname,
                        lastname:this.props.userprofile.lastname,
                        address:this.props.userprofile.address,
                        zipcode:this.props.userprofile.zipcode,
                        phonenumber:this.props.userprofile.phonenumber,
                        imgpath:this.props.userprofile.imgpath,
                        creditcard:this.props.userprofile.creditcard
                })
            }

        })

    }

    trip(){
        console.log("inside the trips click function");
        API.gethistory().then((data)=>{
            console.log("inside here");
            console.log(data);
            if(data.status==201){
                this.props.bokingHistory(data);

            }

        })
    }

    updateUserData(){

        //validation for the zip code will come here.



        console.log("***********");
       var payload = this.state;

         console.log(this.state.email);
         console.log("---------------");
        console.log(payload);
        console.log("---------------");
        API.doUpdate(payload).then((data)=>{
            if(data.status==201){
                console.log("Succesfull push");
              //  this.props.history.push('/profile');
            }
        })


    }


    render(){
        return(
            <div>
               <div style={{backgroundColor:'black'}}>
               <Nav/>
               </div>

            
              
               <div className="card" style={{marginTop:'10vh',marginBottom:'10vh',marginLeft:'10vw',marginRight:'10vw'}}>

               
                <div className="avatar">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg" 
                alt="avatar" className="mx-auto d-block rounded-circle img-responsive" width="200px"/>
                </div>

                <div class="card-body">
                <br/>   
                  
                  
                <ul className="nav nav-tabs nav-justified deep-orange" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#panel5" role="tab"><i class="fa fa-user"></i> Personal Details</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#panel6" role="tab" onClick={()=>{this.trip();}}><i class="fa fa-heart"></i> Trips</a>
                    </li>
                </ul>

                <div className="tab-content">
                    
                    <div className="tab-pane fade in show active" id="panel5" role="tabpanel">
                         
                                <div className="row">
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                            <i className="fa fa-user prefix"></i>
                                            <input type="text" id="firstname" value={this.state.firstname} className="form-control"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           firstname: event.target.value
                                                       });
                                                   }}/>
                                            <label htmlFor="firstname">Firstname</label>
                                        </div>

                                        </div>
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                            <i className="fa fa-user prefix"></i>
                                            <input type="text" id="lastname" value={this.state.lastname} className="form-control"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           lastname: event.target.value
                                                       });
                                                   }}/>
                                            <label htmlFor="lastname">Lastname</label>
                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-envelope prefix"></i>
                                        <input type="text"  value={this.state.email}  id="email" className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       email: event.target.value
                                                   });
                                               }}/>

                                        <label htmlFor="email">Email</label>
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-eye prefix"></i>
                                       
                                        <input type="text" id="password" value="********" disabled className="form-control"/>
                                        <label htmlFor="password">Password</label>
                                        
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-phone prefix"></i>
                                       
                                        <input type="text" id="phone" value={this.state.phonenumber}
                                               className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       phonenumber: event.target.value
                                                   });
                                               }}
                                        />
                                        <label htmlFor="phone">Phone Number</label>
                                      
                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-8">
                                        <div className="md-form">
                                        <i className="fa fa-map-marker prefix"></i>
                                       
                                        <input type="text" id="address" value={this.state.address} className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       address: event.target.value
                                                   });
                                               }}/>
                                        <label htmlFor="address">Address</label>
                                      
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-location-arrow prefix"></i>
                                       
                                        <input type="text" id="zipcode" value={this.state.zipcode} className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       zipcode: event.target.value
                                                   });
                                               }}/>
                                        <label htmlFor="form2">Zip Code</label>
                                      
                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-4">
                                        <div className="md-form form-group">
                                        <i className="fa fa-credit-card-alt prefix"></i>
                                        <input type="text" id="creditcardno" className="form-control validate" maxLength='16' value={this.state.creditcard}
                                               onChange={(event) => {
                                                   this.setState({
                                                       creditcard: event.target.value
                                                   });
                                               }}
                                        />
                                        <label htmlFor="creditcardno">Credit Card No</label>
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <label>Expiry Date :  </label>
                                        <div className="md-form form-group">
                                         
                                            <input type="month" id="form92" className="form-control validate"/>
                                           
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form form-group">
                                        <input type="text" id="cvv" className="form-control validate" maxLength='3'/>
                                        <label htmlFor="cvv">CVV</label>
                                        </div>

                                        </div>
                                </div>
                              
                                
                                
                                <div className="md-form">
                                    <i className="fa fa-file prefix"></i>
                                    <input type="file" id="uploadpic" /> 
                                </div>

                                <button type="button" className="btn btn-light-blue btn-lg btn-block" onClick={()=>this.updateUserData()}>Save</button>

                                
                    </div>
                
                    <div className="tab-pane fade" id="panel6" role="tabpanel">
                        

                        <UserTrip/>

                    </div>
   
  
    </div>
                </div>

            </div>
   
   

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
        signIn : (data) => dispatch(Actions.signIn(data)),
        bokingHistory : (data) => dispatch(Actions.bookingHistory(data))

    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));