import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import * as API from '../api/API';

class CarBooking extends Component {

    constructor(props){
        super(props);
        this.state = {
           carname: "",
           pickupaddress:"",
           dropoffaddress:"",
           cartype:"",
           total:"",
           days:""
        }
     }
    componentWillMount(){
      const payload = JSON.parse(localStorage.getItem("carbooking"));
      console.log("payload=>"+payload)

      var pickupaddress = payload.booking.pickupaddress.street+", "+
      payload.booking.pickupaddress.city+", "+
      payload.booking.pickupaddress.state+" - ";

      var dropoffaddress = payload.booking.dropoffaddress.street+", "+
      payload.booking.dropoffaddress.city+", "+
      payload.booking.dropoffaddress.state+" - ";

      this.setState({

            carname: payload.booking.carmodel,
            pickupaddress:pickupaddress,
            dropoffaddress:dropoffaddress,
            cartype:payload.booking.cartype,
            total:payload.booking.price,
            days:payload.booking.days+" days ("+payload.booking.pickupdate.substring(0, 10)+" - "+payload.booking.dropoffdate.substring(0, 10)+")"

      });

    }

    handlePay(){

      const payload = JSON.parse(localStorage.getItem("carbooking"));
      console.log('payload=>',payload);

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
      API.bookCar(payload)
          .then((res) => {
              console.log(res);
              if (res.status == 200) {
                  console.log("Success booking the Car!");
                  console.log("Response is " + res);
              }else if (res.status == 402) {
                  console.log("Error booking the Car!");
                  console.log("Error is " + res);
              }else {
                  console.log("Error booking the Car!");
                  console.log("Error is " + res);
              }
          });
    }

    render(){
        return(
            <div>
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
                                Car: {this.state.carname}
                                </div>
                                <div className="col-sm-6">
                                Address: {this.state.pickupaddress}
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-6">
                                  Car Type: {this.state.cartype}
                                </div>
                                <div className="col-sm-6">
                                  Drop Off Address: {this.state.dropoffaddress}
                                </div>

                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-sm-6">
                                  Days Booked : {this.state.days}
                                </div>
                                <div className="col-sm-6">
                                  Total Price : ${this.state.total}
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
                                                    <input type="text" id="firstname"
                                                    ref="firstname" className="form-control"/>
                                                    <label htmlFor="firstname">Firstname</label>
                                                </div>

                                            </div>
                                            <div className="col-sm-6">
                                                <div className="md-form">
                                                    <i className="fa fa-user prefix"></i>
                                                    <input type="text" id="lastname" ref="lastname"
                                                    className="form-control"/>
                                                    <label htmlFor="lastname">Lastname</label>
                                                </div>

                                            </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                        <i className="fa fa-envelope prefix"></i>
                                        <input type="text" id="email" ref="email" className="form-control"/>
                                        <label htmlFor="email">Email</label>
                                        </div>

                                        </div>

                                        <div className="col-sm-6">
                                        <div className="md-form">
                                        <i className="fa fa-phone prefix"></i>

                                        <input type="text" id="phone" ref="phoneno" className="form-control"/>
                                        <label htmlFor="phone">Phone Number</label>

                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-8">
                                        <div className="md-form">
                                        <i className="fa fa-map-marker prefix"></i>

                                        <input type="text" id="address" ref="address" className="form-control"/>
                                        <label htmlFor="address">Address</label>

                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-location-arrow prefix"></i>

                                        <input type="text" id="zipcode" ref="zipcode" className="form-control"/>
                                        <label htmlFor="form2">Zip Code</label>

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
                                    <input type="text" id="creditcardno" ref="creditcardno" className="form-control validate" maxLength='16'/>
                                    <label htmlFor="creditcardno">Credit Card No</label>
                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <label>Expiry Date :  </label>
                                    <div className="md-form form-group">

                                        <input type="month" id="form92" ref="expirydate" className="form-control validate"/>

                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <div className="md-form form-group">
                                    <input type="text" id="cvv" ref="cvv" className="form-control validate" maxLength='3'/>
                                    <label htmlFor="cvv">CVV</label>
                                    </div>

                                </div>
                            </div>
                            <button className="btn btn-default btn-lg btn-block" onClick={()=>this.handlePay()}>Pay</button>
                          </div>
                        </div>

                     </div>


            </div>
        )
    }
}

export default CarBooking;
