import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Nav from './nav'
import {connect} from 'react-redux';
import * as Actions from '../actions/action';
import * as API from '../api/API';
import UserTrip from './usertrips'
import SearchHistroy from './searchhistroy'
import AlertContainer from 'react-alert'

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
                creditcard:"",

            }
    }


    validateZipCode(elementValue){
        var zipCodePattern;
        if (elementValue.indexOf('-') > -1)
        {
            zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
        } else {
            zipCodePattern = /^\d{5}$/;
        }

        //console.log("Zip Validation : ",zipCodePattern.test(elementValue))
        return zipCodePattern.test(elementValue);
    }

//****************************************

    validateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail))
        {
            console.log("true");
            return (true)
        }
        console.log("false");
        return (false)
    }

//****************************************

    telephoneCheck(str) {
        var isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
        return isphone;
    }

    //********************



    componentWillMount(){
        console.log("willmountcalling");
        API.checkSession().then((data)=>{
            console.log("inside the check session response");
                 console.log(data);
               
            if(data.status===201){
                console.log("user logged in ");
                console.log(data);
              
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

 //*****************************************

    updateUserData() {

        //validation for the zip code will come here.


        console.log("***********");
        var payload = this.state;
        var flag = 0;

        console.log(this.state.email);
        console.log("---------------");
        console.log(payload);
        console.log("---------------");

        if (this.state.email != "") {
            if (!this.validateEmail(this.state.email)) {
                flag = flag + 1;
                this.errorshowAlert(" Email not valid ");
            }

        }
        if (this.state.zipcode != "") {
            if (!this.validateZipCode(this.state.zipcode)) {
                flag = flag + 3;
                console.log("inside zip code validation");
                this.errorshowAlert("zipcode not valid");
            }
        }
        if (this.state.phonenumber != "") {
            if (!this.telephoneCheck(this.state.phonenumber)) {
                flag = flag + 5;
                this.errorshowAlert("Phone number not valid");
            }
        }


        if (flag == 0) {
            API.doUpdate(payload).then((data) => {
                if (data.status == 201) {
                    console.log("Succesfull push");
                    this.successshowAlert("User data succesfully updated");

                }
                else {
                    this.errorshowAlert("Error while updating the user info ");
                }
            })
        }
    }


    //*****************************************

    handleFileUpload = (event) => {

        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
         console.log("inside the upload call");
            console.log(event.target.files[0]);
        API.upload(payload).then((data)=>{
            if(data.status==201){
                this.setState({imgpath:data.filename})
            }
        })
    };


    //*****************************************


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
            <div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
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
                        <a className="nav-link active" data-toggle="tab" href="#profile" role="tab"><i class="fa fa-user"></i> Personal Details</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#trip" role="tab" onClick={()=>{this.trip();}}><i class="fa fa-heart"></i> Trips</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#searchhistroy" role="tab" onClick={()=>{this.trip();}}><i class="fa fa-heart"></i> Search Histroy</a>
                    </li>
                   
                </ul>

                <div className="tab-content">
                    
                    <div className="tab-pane fade in show active" id="profile" role="tabpanel">
                         
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
                                    <input type="file" id="uploadpic"  name="mypic"
                                           onChange={this.handleFileUpload}/>
                                </div>

                                <button type="button" className="btn btn-light-blue btn-lg btn-block" onClick={()=>this.updateUserData()}>Save</button>

                                
                    </div>
                
                    <div className="tab-pane fade" id="trip" role="tabpanel">


                        <UserTrip/>

                    </div>
                    <div className="tab-pane fade" id="searchhistroy" role="tabpanel">


                    <SearchHistroy/>

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