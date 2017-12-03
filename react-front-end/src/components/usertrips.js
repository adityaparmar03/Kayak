import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {connect} from 'react-redux';
import userBookings from "../reducers/userHistory";
import * as Actions from '../actions/action';

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

                if (res.status == 200) {

                    this.props.searchHistory(res.data);

                    console.log("Success...")

                }else if (res.status == 401) {

                    //  this.props.history.push('/');
                }
            });
    }

    displaytrips(data,index){
      
        if(data.type=="flight"){
            return(
                <div className="card" style={{padding:"2%"}}>
                     <div className="row">
                     <div className="col-sm-6">
                     Hotel Name: 
                     </div>
                     <div className="col-sm-6">
                     Address: 
                     </div>
                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       Room Type:
                     </div>
                     <div className="col-sm-6">
                       No of Rooms:
                     </div>

                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       Stay: 
                     </div>
                     <div className="col-sm-6">
                       Total: $
                   </div>
                 </div> 
                </div> 
            )
                
        }
        else if(data.type=="hotel"){
            return(
                <div className="card" style={{padding:"2%"}}>
                     <div className="row">
                     <div className="col-sm-6">
                      : 
                     </div>
                     <div className="col-sm-6">
                     Address: 
                     </div>
                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       From :
                     </div>
                     <div className="col-sm-6">
                       No of Rooms:
                     </div>

                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       Stay: 
                     </div>
                     <div className="col-sm-6">
                       Total: $
                   </div>
                 </div> 
                </div> 
            )
        }
        else{
            return(
                <div className="card" style={{padding:"2%"}}>
                     <div className="row">
                     <div className="col-sm-6">
                      Car 
                     </div>
                     <div className="col-sm-6">
                      Pick up: 
                     </div>
                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                        Pick-up:
                     </div>
                     <div className="col-sm-6">
                        Drop-off:
                     </div>

                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       Date: 
                     </div>
                     <div className="col-sm-6">
                       Total: $
                   </div>
                 </div> 
                </div> 
            )
        }
    }

    render(){
        return(
            <div>


                   {this.state.data.map(this.displaytrips)}

                    


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
        bookingHistory : (data) => dispatch(Actions.bookingHistory(data)),
        searchHistory : (data) => dispatch(Actions.searchHistory(data))

    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTrip));