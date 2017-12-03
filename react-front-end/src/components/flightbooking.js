import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import * as API from '../api/API';

class FlightBooking extends Component {

    constructor(props){
        super(props);
        this.state = {
           operatorname: "",
           source:"",
           destination:"",
           class:"",
           total:"",
           type:"",
           passengers: ""
        }
     }
    componentWillMount(){
      const payload = JSON.parse(localStorage.getItem("flightbooking"));
      console.log("payload=>"+payload)

      if(payload.booking.flight.triptype == 'One-Way'){

        var source = payload.booking.flight.origincity + ' ' + payload.booking.flight.originstate;
        var destination = payload.booking.flight.destinationcity + ' ' + payload.booking.flight.destinationstate;
        this.setState({
              operatorname: payload.booking.flight.operator,
              source:source,
              destination:destination,
              class:payload.booking.flight.flightclass,
              total:payload.booking.flight.price,
              type:payload.booking.flight.triptype,
              passengers: payload.booking.flight.passengers
        })

      }else{
        var source = payload.booking.returnflight.origincity + ' ' + payload.booking.returnflight.originstate;
        var destination = payload.booking.returnflight.destinationcity + ' ' + payload.booking.returnflight.destinationstate;
        this.setState({
              operatorname: payload.booking.returnflight.operator,
              source:source,
              destination:destination,
              class:payload.booking.flight.flightclass,
              total:payload.booking.flight.price + payload.booking.returnflight.price,
              type:payload.booking.flight.triptype,
              passengers: payload.booking.returnflight.passengers
        })
      }



    }

    handlePay(){
      const payload = JSON.parse(localStorage.getItem("flightbooking"));

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


      console.log('payload',payload);
      API.bookFlight(payload)
          .then((res) => {
              console.log(res);
              if (res.status == 200) {
                  console.log("Success booking the Flight!");
                  console.log("Response is " + res);
              }else if (res.status == 402) {
                  console.log("Error booking the Flight!");
                  console.log("Error is " + res);
              }else {
                  console.log("Error booking the Flight!");
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

                        <div className="card-header mdb-color lighten-1 white-text">
                            Booking Details
                        </div>
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                    Flight Operator: {this.state.operatorname}
                                    </div>
                                    <div className="col-sm-6">
                                    Source: {this.state.source}
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                      Destination: {this.state.destination}
                                    </div>
                                    <div className="col-sm-6">
                                      Booking Class: {this.state.class}
                                    </div>

                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                      Total Price: {this.state.total}
                                    </div>
                                    <div className="col-sm-6">
                                      Trip Type: {this.state.type}
                                  </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-6">
                                      Passengers: {this.state.passengers}
                                    </div>
                                    <div className="col-sm-6">

                                  </div>
                                </div>
                                </div>
                        </div>


                        <div className="card">

                        <div className="card-header mdb-color lighten-1 white-text">
                            Personal Details
                        </div>
                                <div className="card-body">
                                    <div className="row">
                                            <div className="col-sm-6">
                                                <div className="md-form">
                                                    <i className="fa fa-user prefix"></i>
                                                    <input type="text" id="firstname" ref="firstname" className="form-control"/>
                                                    <label htmlFor="firstname">Firstname</label>
                                                </div>

                                            </div>
                                            <div className="col-sm-6">
                                                <div className="md-form">
                                                    <i className="fa fa-user prefix"></i>
                                                    <input type="text" id="lastname" ref="lastname" className="form-control"/>
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

                        <div className="card-header mdb-color lighten-1 white-text">
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

export default FlightBooking;
