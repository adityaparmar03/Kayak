import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert'

class HotelBooking extends Component {

    constructor(props){
        super(props);
        this.state = {
           hotelname: "",
           address:"",
           roomtype:"",
           noofrooms:"",
           total:"",
           stay:"",
           isLoggedin:false,
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
    componentWillMount(){
       
      const payload = JSON.parse(localStorage.getItem("hotelbooking"));
      console.log("payload=>"+payload)
      var address = payload.booking.address.street+", "+
      payload.booking.address.city+", "+
      payload.booking.address.state+" - "+
      payload.booking.address.zip

      this.setState({

            hotelname: payload.booking.name,
            address:address,
            roomtype:payload.booking.roomtype,
            noofrooms:payload.booking.roomcount,
            total:payload.booking.price,
            stay:payload.booking.days+" days ("+payload.booking.bookingstartdate.substring(0, 10)+" - "+payload.booking.bookingenddate.substring(0, 10)+")"

      })

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
                    creditcard:this.props.userprofile.creditcard,
                    isLoggedin:'true'
            })
        
            console.log("***********************");
            console.log("inside hotelbooking");
            console.log(this.state);
            console.log("***********************");
        }
        else{
            this.errorshowAlert("Please Login to proceed with Payment");

        }

    })



    }

    handlePay(){

      if(!this.state.isLoggedin){
        this.errorshowAlert("Please Login to proceed with Payment");
      }else{
        const payload = JSON.parse(localStorage.getItem("hotelbooking"));
        
              var travellerinfo = {
                  "firstname":this.refs.firstname.value,
                  "lastname":this.refs.lastname.value,
                  "email":this.refs.email.value,
                  "phoneno":this.refs.phoneno.value,
                  "address":this.refs.address.value,
                  "zipcode":this.refs.zipcode.value
              }
              var credit_card = {
                    "card_number": this.refs.creditcardno.value,
                    "valid_till":this.refs.expirydate.value,
                    "cvv":this.refs.cvv.value
              }
        
              payload.credit_card = credit_card;
              payload.travellerinfo = travellerinfo;
              API.bookHotel(payload)
                  .then((res) => {
                      console.log(res);
                      if (res.status == 200) {
                          console.log("Success booking the Hotel!");
                          console.log("Response is " + res);
                      }else if (res.status == 402) {
                          console.log("Error booking the Hotel!");
                          console.log("Error is " + res);
                      }else {
                          console.log("Error booking the Hotel!");
                          console.log("Error is " + res);
                      }
                  });
      }  
      
    }
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
            <div>
                 <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <div style={{backgroundColor:'black'}}>
                <Nav/>
                </div>

                    <div style={{padding:'2%',paddingLeft:'10%',paddingRight:'10%'}}>
                        <div className="card">

                        <div className="card-header deep-orange lighten-1 white-text">
                            Booking Details
                        </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                        Hotel Name: {this.state.hotelname}
                                        </div>
                                        <div className="col-sm-6">
                                        Address: {this.state.address}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                          Room Type: {this.state.roomtype}
                                        </div>
                                        <div className="col-sm-6">
                                          No of Rooms: {this.state.noofrooms}
                                        </div>

                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                          Stay: {this.state.stay}
                                        </div>
                                        <div className="col-sm-6">
                                          Total: ${this.state.total}
                                      </div>
                                    </div>
                                </div>
                        </div>


                        <div className="card">

                        <div className="card-header deep-orange lighten-1 white-text">
                            Personal Details
                        </div>
                                <div className="card-body">
                                    <div className="row">
                                            <div className="col-sm-6">
                                                <div className="md-form">
                                                    <i className="fa fa-user prefix"></i>
                                                    <input type="text" placeholder="First Name" value={this.state.firstname}
                                                    ref="firstname" className="form-control"/>
                                                 
                                                </div>

                                            </div>
                                            <div className="col-sm-6">
                                                <div className="md-form">
                                                    <i className="fa fa-user prefix"></i>
                                                   
                                                    <input type="text" placeholder="Lastname" value={this.state.lastname}
                                                     ref="lastname" className="form-control"/>
                                                    
                                                </div>

                                            </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                          
                                        <div className="md-form">
                                         
                                        <i className="fa fa-envelope prefix"></i>
                                       
                                        <input type="text"  value={this.state.email}
                                        ref="email" placeholder="Email" className="form-control"/>
                                        
                                        </div>

                                        </div>

                                        <div className="col-sm-6">
                                        <div className="md-form">
                                        <i className="fa fa-phone prefix"></i>
                                      
                                        <input type="text" placeholder="Phone Number" value={this.state.phonenumber}
                                        ref="phoneno" className="form-control"/>
                                       

                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-8">
                                        <div className="md-form">
                                        <i className="fa fa-map-marker prefix"></i>
                                        
                                       
                                        <input type="text"  value={this.state.address}
                                        ref="address" placeholder="Address" className="form-control"/>
                                       

                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-location-arrow prefix"></i>
                                       
                                        <input type="text" placeholder="Zip Code" value={this.state.zipcode}
                                        ref="zipcode" className="form-control"/>
                                        

                                        </div>

                                        </div>
                                </div>
                        </div>
                        </div>


                        <div className="card">

                        <div className="card-header deep-orange lighten-1 white-text">
                            Payment
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="md-form form-group">
                                    <i className="fa fa-credit-card-alt prefix"></i>
                                    
                                    <input type="text" value={this.state.creditcard}
                                    ref="creditcardno" placeholder="Credit Card"
                                    className="form-control validate" maxLength='16'/>
                                   
                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <label>Expiry Date :  </label>
                                    <div className="md-form form-group">

                                        <input type="month" id="form92"
                                        ref="expirydate" className="form-control validate"/>

                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <div className="md-form form-group">
                                    <input type="text" placeholder="CVV"
                                    ref="cvv" className="form-control validate" maxLength='3'/>
                                   
                                    </div>

                                </div>
                            </div>
                           
                            <button className="btn btn-default btn-lg btn-block"  onClick={()=>this.handlePay()}>Pay</button>
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotelBooking));
