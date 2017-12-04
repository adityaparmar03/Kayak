import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {connect} from 'react-redux';
import userBookings from "../reducers/userHistory";
import * as Actions from '../actions/action';

class SearchHistory extends Component {

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
            return(
                <div className="card" style={{padding:"2%"}}>
                     <div className="row">
                     <div className="col-sm-6">
                      Source : {data.source_city+", "+ data.source_state}
                     </div>
                     <div className="col-sm-6">
                      Destination : {data.destination_city+", "+ data.destination_state}
                     </div>
                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                        Start Date: {data.start_date.substring(0, 16)}
                     </div>
                     <div className="col-sm-6">
                         End Date: {data.end_date.substring(0, 16)}
                     </div>

                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       Search for: {data.search_type}
                     </div>
                     <div className="col-sm-6">
                      
                   </div>
                 </div> 
                </div> 
            )
                
        }
        displaysearchhotel(data,index)
        {
            return(
                <div className="card" style={{padding:"2%"}}>
                 
                 <div className="row">
                     <div className="col-sm-6">
                        Start Date: {data.start_date.substring(0, 16)}
                     </div>
                     <div className="col-sm-6">
                         End Date: {data.end_date.substring(0, 16)}
                     </div>

                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       Search for: {data.search_type}
                     </div>
                     <div className="col-sm-6">
                       Location : {data.source_city+", "+ data.source_state}
                   </div>
                 </div> 
                </div> 
            )
        }
        displaysearchcar(data,index)
        {
            return(
                <div className="card" style={{padding:"2%"}}>
                     <div className="row">
                     <div className="col-sm-6">
                      Pickup : {data.source_city+", "+ data.source_state}
                     </div>
                     <div className="col-sm-6">
                      Dropoff : {data.destination_city+", "+ data.destination_state}
                     </div>
                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                        Start Date: {data.start_date.substring(0, 16)}
                     </div>
                     <div className="col-sm-6">
                         End Date: {data.end_date.substring(0, 16)}
                     </div>

                 </div>
                 <br/>
                 <div className="row">
                     <div className="col-sm-6">
                       Search for: {data.search_type}
                     </div>
                     <div className="col-sm-6">
                      
                   </div>
                 </div> 
                </div> 
            )
        }
    

    render(){
        return(
            <div>


                   {this.props.flightsearch.map(this.displaysearchflight)}
                   {this.props.hotelsearch.map(this.displaysearchhotel)}
                   {this.props.carsearch.map(this.displaysearchcar)}

                    


            </div>
        )
    }
}

function mapStateToProps(reducerdata) {
    // console.log(reducerdata);
    const searchhistory = reducerdata.userHistory;
    const flightsearch = searchhistory.flightsearch;
    const hotelsearch = searchhistory.hotelsearch;
    const carsearch = searchhistory.carsearch;

   // console.log("bookingHistoryList"+JSON.stringify(bookingHistoryList));
    

    return {flightsearch, carsearch, hotelsearch};
}

function mapDispatchToProps(dispatch) {
    return {
        signIn : (data) => dispatch(Actions.signIn(data)),
        bookingHistory : (data) => dispatch(Actions.bookingHistory(data)),
        searchHistory : (data) => dispatch(Actions.searchHistory(data))

    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchHistory));