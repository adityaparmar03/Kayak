import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {connect} from 'react-redux';
import userBookings from "../reducers/userHistory";
import * as Actions from '../actions/action';
import index from "../reducers/index";
import {flight, hotel} from "../constant_UI";

class UserTrip extends Component {

    constructor(props){
        super(props);
        this.state =
            {
                //UI 
                test:[1,2,3,4,5],
                data : [{
                    type : "flight",
                    name:"fff"
                },
                {
                    type : "hotel",
                    name:"fffhotel"
                },
                {
                    type : "car",
                    name:"fffcar"
                }]
            }
    }
    componentDidMount(){

         // All three Api goes here
         
         // API.getbookings().then((data)=>{
         //     console.log("inside here");
         // })
    }

    componentWillMount(){

        API.searchHistory()
            .then((res) => {
                console.log(res);

                if (res.status == 201) {

                    this.props.searchHistory(res.data);

                    console.log("Success...")

                }else if (res.status == 401) {

                    //  this.props.history.push('/');
                }
            });
    }

    displaysearchflight(data,index)
    {
        console.log("-----------");
        console.log(data)
        console.log("-----------");
        //return(<div>flight</div>)
        if(data.flight_trip_type == 'One-Way'){
            return(
                <div>
                <div className="card-header deep-orange lighten-1 white-text">
                    Flight Bookings  {data.source_city +"-"+ data.destination_city}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            Flight Operator: {data.target_name}
                        </div>
                        <div className="col-sm-6">
                            Source: {data.source_city}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            Booking Class: {data.booking_class}
                        </div>
                        <div className="col-sm-6">

                            Destination: {data.destination_city}
                        </div>

                    </div>

                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            Total Price: ${data.billing_amount}
                        </div>
                        <div className="col-sm-6">
                            Trip Type: {data.flight_trip_type}
                        </div>
                    </div>
                    <br/>
                    <div className="row">

                        <div className="col-sm-6">

                        </div>
                    </div>
                </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div className="card-header deep-orange lighten-1 white-text">
                    Flight Bookings  {data.return_source_airport +"-"+ data.destination_city}
                    </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            Flight Operator: {data.target_name}
                        </div>
                        <div className="col-sm-6">
                            Source: {data.return_source_airport}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            Booking Class: {data.booking_class}
                        </div>
                        <div className="col-sm-6">

                            Destination: {data.destination_city}
                        </div>

                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            Return Flight Operator: {data.target_name}
                        </div>
                        <div className="col-sm-6">
                            Return Flight Source: {data.return_source_airport}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            Return Flight Booking Class: {data.booking_class}
                        </div>
                        <div className="col-sm-6">

                            Return Flight Destination: {data.destination_city}
                        </div>

                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">
                            Total Price: {data.billing_amount}
                        </div>
                        <div className="col-sm-6">
                            Trip Type: {data.flight_trip_type}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-6">

                        </div>
                        <div className="col-sm-6">

                        </div>
                    </div>
                </div>
                </div>

            )
        }

    }


    displaysearchcar(data,index)
    {
        console.log("-----------");
        console.log(data)
        console.log("-----------");

        return(
            <div>
            <div>
                <div className="card">
                    <div className="card-header deep-orange lighten-1 white-text">
                   Car Bookings - {data.target_name}
                </div>
                <div className="card-body">
                <div className="row">
                <div className="col-sm-6">
                    Car: {data.target_name}
                </div>
                <div className="col-sm-6">
                    Address: {data.destination_city}
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-6">
                    Car Type: {data.car_type}
                </div>
                <div className="col-sm-6">
                    Drop Off Address: {data.destination_street}
                </div>

            </div>
            <br/>
            <div className="row">

                <div className="col-sm-6">
                    Total Price : ${data.billing_amount}
                </div>
            </div>
                </div>
        </div>

            </div>
            </div>
        )
    }

    displaysearchhotel(data,index)
    {

        console.log(data);
       // return(<div>hello</div>);
       return(
           <div>
           <div className="card-header deep-orange lighten-1 white-text">
               Hotel Bookings - {data.target_name}
           </div>
           <div className="card-body">
        <div className="row">
        <div className="col-sm-6">
        Hotel Name: {data.target_name}
    </div>
        <div className="col-sm-6">
            Address: {data.source_street}
        </div>
    </div>
        <br/>
        <div className="row">
            <div className="col-sm-6">
                Room Type: {data.room_type}
            </div>
            <div className="col-sm-6">
                No of Rooms: {data.target_count}
            </div>

        </div>
        <br/>
        <div className="row">
            <div className="col-sm-6">
                Total: $ {data.billing_amount}
            </div>
        </div>
    </div>
    </div>
          )


    }




    render(){
        return(
            <div>

                {this.props.bookingHistoryList.carbooking.map(this.displaysearchcar)}
                {this.props.bookingHistoryList.flightbooking.map(this.displaysearchflight)}
                {this.props.bookingHistoryList.hotelbooking.map(this.displaysearchhotel)}


            </div>
        )
    }
}

function mapStateToProps(reducerdata) {
    // console.log(reducerdata);
    const bookingHistoryList = reducerdata.userHistory;
   // console.log("----",bookingHistoryList.carbooking)
    return {bookingHistoryList};
}

function mapDispatchToProps(dispatch) {
    return {
        signIn : (data) => dispatch(Actions.signIn(data)),
        bookingHistory : (data) => dispatch(Actions.bookingHistory(data)),
        searchHistory : (data) => dispatch(Actions.searchHistory(data))

    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTrip));