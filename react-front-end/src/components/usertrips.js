import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {connect} from 'react-redux';
import userBookings from "../reducers/userBooking";
import * as Actions from '../actions/action';

class UserTrip extends Component {


    componentDidMount(){

         // API.getbookings().then((data)=>{
         //     console.log("inside here");
         // })
    }

    render(){
        return(

            <div>
                <h4>Hello, This is Kayak!!</h4>



            </div>
        )
    }
}

function mapStateToProps(reducerdata) {
    // console.log(reducerdata);
    const bookings = reducerdata.userBooking;

    console.log(bookings);  //all the data in the booking just waiting for aditya to give me boxes so i can fill that up

    return {bookings};
}

function mapDispatchToProps(dispatch) {
    return {
        signIn : (data) => dispatch(Actions.signIn(data)),
        bokingHistory : (data) => dispatch(Actions.bookingHistory(data))

    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTrip));