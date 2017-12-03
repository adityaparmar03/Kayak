import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {connect} from 'react-redux';
import userBookings from "../reducers/userBooking";
import * as Actions from '../actions/action';

class UserTrip extends Component {

    constructor(props){
        super(props);
        this.state =
            {
                //UI 
                test:[1,2,3,4,5]

            }
    }
    componentDidMount(){

         // All three Api goes here
         
         // API.getbookings().then((data)=>{
         //     console.log("inside here");
         // })
    }

    displaytrips(){
        var type = "flight"
        if(type=="flight"){

            <div>
                    <p>flight</p>
            </div>    
        }
        else if(type=="hotel"){
            <div>
                    <p>flight</p>
            </div> 
        }
        else{
            <div>
                    <p>flight</p>
            </div>
        }
    }

    render(){
        return(
            <div>


                   

                    


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