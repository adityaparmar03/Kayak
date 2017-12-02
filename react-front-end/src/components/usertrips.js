import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {connect} from 'react-redux';
import userBookings from "../reducers/userBooking";
import * as Actions from '../actions/action';

class UserTrip extends Component {


    componentDidMount(){

         // All three Api goes here
         
         // API.getbookings().then((data)=>{
         //     console.log("inside here");
         // })
    }

    render(){
        return(

            <div>
<<<<<<< HEAD
                <h4>Hello, This is Kayak!!</h4>
=======
                <ul className="nav md-pills nav-justified pills-primary">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#flights" role="tab">Flights</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#hotels" role="tab">Hotels</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#cars" role="tab">Cars</a>
                </li>
               
                </ul>
                <div className="tab-content">

    
                        <div className="tab-pane fade in show active" id="flights" role="tabpanel">
                            

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>

                        </div>
    
                        <div className="tab-pane fade" id="hotels" role="tabpanel">
                            

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>

                        </div>
    
                        <div className="tab-pane fade" id="cars" role="tabpanel">
                           

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>

                        </div>
    
   

                    </div>
>>>>>>> d3276ebe2049b7c2d0b341bcf919e6ad50898ede



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