import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';

import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';

import MultiSlider from "multi-slider";

class Flightlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Data
            flightlist:"",

             //UI State

             low: 0,
             high:0,
             departure_start_time:0,
             departure_end_time:1439,
             arrival_start_time:0,
             arrival_end_time:1439,
             valuesPrice:[],
             valuesArrivalTime:[],
             valuesDepartureTime:[]
        }
     }
      maxprice = 0;
      minprice = 0;
      maxarrivaltime = 1439;
      minarrivaltime = 0
      maxdepttime = 1439;
      mindepttime = 0

    getTime(minutes){

        var hour = Math.floor(minutes/60)
        var minute = minutes%60;
        if(hour.toString().length<2){
            hour="0"+hour;
        }
        if(minute.toString().length<2){
            minute="0"+minute;
        }
        return hour+":"+minute
    }
    componentWillMount(){

        const payload = JSON.parse(localStorage.getItem("flightsearchcriteria"));
        console.log('payload',payload);
        API.searchFlights(payload)
            .then((res) => {
                console.log(res);
                if (res.status == 201) {

                    this.props.flightSearch(res.flights);

                    console.log("Success...")

                }else if (res.status == 401) {

                    //  this.props.history.push('/');
                }
            });

        this.maxprice = 234; //get from api
        this.minprice = 67;
        var valuesPrice = [0,this.maxprice-this.minprice,0]
        var valuesTime=[0,1439,0]
        this.setState({
            valuesPrice: valuesPrice,
            valuesArrivalTime:valuesTime,
            valuesDepartureTime:valuesTime,
            low:this.minprice,
            high:this.maxprice
          });
    }
    onChangePrice = values =>
    this.setState({
      valuesPrice: values,
      low :  this.minprice + values[0],
      high: this.maxprice - values[2]
    });
    onChangeDepartureTime = values =>
    this.setState({
      valuesDepartureTime: values,
      departure_start_time :  this.mindepttime + values[0],
      departure_end_time: this.maxdepttime - values[2]
    });
    onChangeArrival = values =>
    this.setState({
      valuesArrivalTime: values,
      arrival_start_time :  this.minarrivaltime + values[0],
      arrival_end_time: this.maxarrivaltime - values[2]
    });
    displaystopline(stop){
        if(stop=="nonstop"){
            return <span>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</span>
        }
        else if(stop=="onestop"){
            return <span>&mdash;&mdash;&#9632;&mdash;&mdash;&mdash;</span>
        }
        else{
            return <span>&mdash;&mdash;&#9632;&mdash;&mdash;&#9632;&mdash;&mdash;</span>
        }
    }
    
    handleBook(data,classtype,price){
        console.log("selected data ="+JSON.stringify(data))
        var flightbooking = {
          booking : {
            flight : {
                "operator" : data.operator,
                "origincity" : data.flights.origin.city,
                "originstate" : data.flights.origin.state,
                "destinationcity" : data.flights.destination.city,
                "destinationstate" : data.flights.destination.state,
                "triptype" : "One-Way", // TODO : remove hardcoding and add support for one way flights
                "flightclass" : classtype,
                "capacity" : 100,
                "price" : price,
                "bookingstartdate" : "2017-01-18 09:15:00",
                "bookingenddate" : "2017-01-19 03:14:00",
                "passengers" : 10,
                "flightId" : data.flightId,
                "source_airport" : data.flights.destination.airport,
                "destination_airport" : data.flights.origin.airport
            }
            // ,
            // returnflight: {
            //     "operator" : "Delta Airlines",
            //     "origincity" : "San Francisco",
            //     "originstate" : "CA",
            //     "destinationcity" : "Delhi",
            //     "destinationstate" : "Delhi",
            //     "triptype" : "Two-Way",
            //     "flightclass" : "economy",
            //     "capacity" : 30,
            //     "price" : 1300,
            //     "returnstartdate" : "2017-03-18 06:15:00",
            //     "returnenddate" : "2017-03-19 18:14:00",
            //     "passengers" : 10,
            //     "flightId" : "MMT111",
            //     "source_airport" : "SF International Airport",
            //     "destination_airport" : "Delhi International Airport"
            // }
          },
          credit_card : {
      			"card_type" : "MasterCard",
      			"card_number": "012345678989",
      			"card_holder_name" : "Meenakshi Paryani",
      			"valid_from" : "2017-01-18",
      			"valid_till" : "2017-01-26"
    		  }
        }
        // use unique ID : TODO
        var uniqueId = flightbooking + Date.now();
        console.log('payload', flightbooking, ' ', uniqueId);
        localStorage.setItem("flightbooking", JSON.stringify(flightbooking));
        this.props.history.push('/flightbooking');
    }

    displayflights(data,index){

            return(
                <div className="jumbotron">
                    <div data-toggle="collapse" data-target={'#details'+index}>
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="row" style={{paddingTop:"4vh"}}>
                                    <div className="col-sm-0" style={{textAlign:"center",fontSize:"12px",fontWeight:"bold"}}>

                                    </div>
                                    <div className="col-sm-4" style={{textAlign:"center",fontSize:"12px",fontWeight:""}}>
                                    <div  style={{textAlign:"center"}}>
                                                <img src={'http://localhost:3001/images/'+data.imageurl} height="45vh" width="45vw" alt="logo"/>
                                                <br/>
                                                <p>{data.operator}</p>
                                       </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px"}}>
                                       <div  style={{textAlign:"center"}}>
                                                <p style={{fontWeight:"bold"}}>{data.flights.arrivaltime}</p>
                                                <p>{data.flights.origin.city}</p>
                                       </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center"}}>
                                    <div  style={{textAlign:"center"}}>
                                         {this.displaystopline("nonstop")}
                                         <p style={{fontSize:"12px"}}>non stop</p>
                                    </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px"}}>
                                    <div  style={{textAlign:"center"}}>
                                             <p style={{fontWeight:"bold"}}>{data.flights.departuretime}</p>
                                             <p>{data.flights.destination.city}</p>
                                    </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center"}}>
                                        <p style={{fontSize:"12px",fontWeight:"bold"}}>{data.flightId}</p>
                                    </div>

                            </div>
                         </div>
                        <div className="col-sm-3">
                                <div style={{textAlign:"center"}}>
                                <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.class[0].price}</b><br/>
                                <b style={{fontSize:"12px",fontWeight:"bold"}}>{data.class[0].type}</b><br/>
                                <button style={{width:"12vw"}} onClick={()=>this.handleBook(data,data.class[0].type, data.class[0].price)}
                                className="btn btn-deep-orange">Book</button>
                                </div>

                        </div>
                    </div>
                    </div>
                    <div id={'details'+index} className="collapse">
                        <div className="row">
                                <div className="col-sm-9">
                                    <div className="row">
                                         <div className="col-sm-6">
                                            <p><b>Origin</b></p>
                                            <p>Day: {data.flights.arrivalday}</p>
                                            <p>Time: {data.flights.arrivaltime}</p>
                                            <p>Airport: {data.flights.origin.airport}</p>
                                            <p>City: {data.flights.origin.city}</p>
                                            <p>State: {data.flights.origin.state}</p>

                                         </div>
                                         <div className="col-sm-6">
                                            <p><b>Destination</b></p>
                                            <p>Day: {data.flights.departureday}</p>
                                            <p>Time: {data.flights.departuretime}</p>
                                            <p>Airport: {data.flights.destination.airport}</p>
                                            <p>City: {data.flights.destination.city}</p>
                                            <p>State: {data.flights.destination.state}</p>
                                         </div>
                                    </div>

                                </div>
                                <div className="col-sm-3">

                                        <div style={{textAlign:"center"}}>
                                        <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.class[1].price}</b><br/>
                                        <b style={{fontSize:"12px",fontWeight:"bold"}}>{data.class[1].type}</b><br/>
                                        <button style={{width:"12vw"}}className="btn btn-deep-orange">Book</button>
                                        </div>
                                        <div style={{textAlign:"center"}}>
                                        <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.class[2].price}</b><br/>
                                        <b style={{fontSize:"12px",fontWeight:"bold"}}>{data.class[2].type}</b><br/>
                                        <button style={{width:"12vw"}}className="btn btn-deep-orange">Book</button>
                                        </div>

                                </div>
                        </div>
                    </div>

                 </div>
            )
     }
    render(){
        var colors = ["#FCBD7E", "#EB9F71", "#E6817C"];
        return(
            <div>
                <div style={{backgroundColor:'black'}}>
                <Nav/>
                </div>
                <div className="jumbotron">
                  {this.state.values}
                </div>
                <div className="row">

                    <div className="col-4">
                        <div className="jumbotron">
                                <p style={{fontWeight:"bold"}}>Price</p>
                                <hr/>
                                <MultiSlider
                                colors={colors}
                                values={this.state.valuesPrice}
                                onChange={this.onChangePrice}
                            />
                                    <div className="row">

                                        <div className="col-sm-6">
                                        Low:${this.state.low}
                                        </div>
                                        <div className="col-sm-6" style={{textAlign:'right'}}>
                                        High:${this.state.high}
                                        </div>
                                    </div>

                        <br/>  <br/>

                                    <p style={{fontWeight:"bold"}}>Departure Time</p>
                                    <hr/>
                                    <MultiSlider
                                    colors={colors}
                                    values={this.state.valuesDepartureTime}
                                    onChange={this.onChangeDepartureTime}
                                />
                                <div className="row">

                                        <div className="col-sm-6">
                                        {this.getTime(this.state.departure_start_time)}
                                        </div>
                                        <div className="col-sm-6" style={{textAlign:'right'}}>
                                        {this.getTime(this.state.departure_end_time)}
                                        </div>
                                </div>

                         <br/>  <br/>

                                    <p style={{fontWeight:"bold"}}>Arrival Time</p>
                                    <hr/>
                                    <MultiSlider
                                    colors={colors}
                                    values={this.state.valuesArrivalTime}
                                    onChange={this.onChangeArrival}
                                />
                                <div className="row">

                                        <div className="col-sm-6">
                                        {this.getTime(this.state.arrival_start_time)}
                                        </div>
                                        <div className="col-sm-6" style={{textAlign:'right'}}>
                                        {this.getTime(this.state.arrival_end_time)}
                                        </div>
                                </div>

                        </div>


                    </div>
                    <div className="col-8" style={{ overflow: 'scroll', height: '90vh'}}>
                         { this.props.flightlist.map((this.displayflights),this)}
                    </div>

                </div>
            </div>
        )
    }
}


function mapStateToProps(reducerdata) {
    console.log(reducerdata.userSearch.flightSearch);


    const flightlist=reducerdata.userSearch.flightSearch;
    return {flightlist};
}

function mapDispatchToProps(dispatch) {
    return {

        flightSearch : (data) => dispatch(Actions.flightSearch(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Flightlist));
