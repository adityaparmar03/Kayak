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
            triptype:"",

             //UI State
             nolist:false,
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
    getminutes(time){

        var hour  = time.substring(0, 2);
        var minute  = time.substring(3, 5);
        var total = parseInt(hour)*60 + parseInt(minute);

        return parseInt(total)


    }
    componentWillMount(){

        console.log(this.props.location.flightsearchcriteria);
        const payload = JSON.parse(localStorage.getItem("flightsearchcriteria"));
        console.log('payload',payload);

        this.setState({
            triptype:payload.triptype
        })
        API.searchFlights(payload)
            .then((res) => {
                console.log(res);
                if (res.status == 201) {

                    this.props.flightSearch(res.flights);

                    console.log("Success...")
                    if(res.flights.length > 0){
                        if(payload.triptype == 'One-Way'){
                           
                            var price = res.flights.map((item,i)=>parseInt(item.class[0].price));
                            if(price.length > 0){
                                        var  max = price.reduce(function(a, b) {
                                        return Math.max(a, b);
                                        });
                                        var   min = price.reduce(function(a, b) {
                                        return Math.min(a, b);
                                    });
                                    this.maxprice = max; //get from api
                                    this.minprice = min;
                                    var valuesPrice = [0,this.maxprice-this.minprice,0]

                                    this.setState({
                                        valuesPrice: valuesPrice,

                                        low:this.minprice,
                                        high:this.maxprice,
                                        nolist:true
                                        });
                                    }    
                        }else{
                            var price = res.flights.map((item,i)=>parseInt(item._id.class[0].price));
                            if(price.length > 0){
                                        var  max = price.reduce(function(a, b) {
                                        return Math.max(a, b);
                                        });
                                        var   min = price.reduce(function(a, b) {
                                        return Math.min(a, b);
                                    });
                                    this.maxprice = max; //get from api
                                    this.minprice = min;
                                    var valuesPrice = [0,this.maxprice-this.minprice,0]

                                    this.setState({
                                        valuesPrice: valuesPrice,

                                        low:this.minprice,
                                        high:this.maxprice,
                                        nolist:true
                                        });
                            }            
                        }
                        
                    }



                }else if (res.status == 401) {

                    //  this.props.history.push('/');
                }
            });

        var valuesTime=[0,1439,0]
        this.setState({

            valuesArrivalTime:valuesTime,
            valuesDepartureTime:valuesTime,

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

    handleBookOneWay(data,classtype,price, capacity){
        console.log("selected data ="+JSON.stringify(data))
        var flightsearchcriteria = JSON.parse(localStorage.getItem('flightsearchcriteria'));
        var passengers = flightsearchcriteria.passengers;
        var startdate = flightsearchcriteria.startdate;
        var enddate = flightsearchcriteria.enddate;
        var flightbooking = {
          booking : {
            flight : {
                "operator" : data.operator,
                "origincity" : data.flights.origin.city,
                "originstate" : data.flights.origin.state,
                "destinationcity" : data.flights.destination.city,
                "destinationstate" : data.flights.destination.state,
                "triptype" : "One-Way", // TODO : add proper dates
                "flightclass" : classtype,
                "capacity" : capacity,
                "price" : price * passengers,
                "bookingstartdate" : startdate,
                "bookingenddate" : '',
                "passengers" : passengers,
                "flightId" : data.flightId,
                "source_airport" : data.flights.destination.airport,
                "destination_airport" : data.flights.origin.airport
            }

          }
        }
        // use unique ID : TODO
        var uniqueId = flightbooking + Date.now();
        console.log('payload', flightbooking, ' ', uniqueId);
        localStorage.setItem("flightbooking", JSON.stringify(flightbooking));
        this.props.history.push('/flightbooking');
    }



    handleBookTwoWay(data,classtype,price, capacity){
        console.log("selected data ="+JSON.stringify(data));
        var toFlight = data.flights.filter(flight => flight.path =='to')[0];
        var fromFlight = data.flights.filter(flight => flight.path =='from')[0];
        var flightsearchcriteria = JSON.parse(localStorage.getItem('flightsearchcriteria'));
        var passengers = flightsearchcriteria.passengers;
        var startdate = new Date(flightsearchcriteria.startdate);
        var enddate = new Date(flightsearchcriteria.enddate);
        var flightbooking = {
          booking : {
            flight : {
                "operator" : data._id.operator,
                "origincity" : toFlight.origin.city,
                "originstate" : toFlight.origin.state,
                "destinationcity" : toFlight.destination.city,
                "destinationstate" : toFlight.destination.state,
                "triptype" : "Two-Way",
                "flightclass" : classtype,
                "capacity" : capacity,
                "price" : price * passengers ,
                "bookingstartdate" : startdate,
                "bookingenddate" : startdate,
                "passengers" : passengers,
                "flightId" : data._id.flightId,
                "source_airport" : toFlight.origin.airport,
                "destination_airport" : toFlight.destination.airport
            }
            ,
            returnflight: {
                "operator" : data._id.operato,
                "origincity" : fromFlight.origin.city,
                "originstate" : fromFlight.origin.state,
                "destinationcity" : fromFlight.destination.city,
                "destinationstate" : fromFlight.destination.state,
                "triptype" : "Two-Way",
                "flightclass" : classtype,
                "capacity" : capacity,
                "price" : price * passengers,
                "returnstartdate" : enddate,
                "returnenddate" : enddate,
                "passengers" : passengers,
                "flightId" : data._id.flightId,
                "source_airport" : fromFlight.origin.airport,
                "destination_airport" : fromFlight.destination.airport
            }
          }
        }
        var uniqueId = flightbooking + Date.now();
        console.log('payload', flightbooking, ' ', uniqueId);
        localStorage.setItem("flightbooking", JSON.stringify(flightbooking));
        this.props.history.push('/flightbooking');
    }
    displayflights(data,index){


            if(this.state.triptype == 'One-Way'){
                if(this.state.low <= data.class[0].price &&  data.class[0].price <=this.state.high
                   && this.state.arrival_start_time <= this.getminutes(data.flights.arrivaltime)
                   && this.state.arrival_end_time >= this.getminutes(data.flights.arrivaltime)
                   && this.state.departure_start_time <= this.getminutes(data.flights.departuretime)
                   && this.state.departure_end_time >= this.getminutes(data.flights.departuretime)

                ){
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
                                                        <p style={{fontWeight:"bold"}}>{data.flights.departuretime}</p>
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
                                                     <p style={{fontWeight:"bold"}}>{data.flights.arrivaltime}</p>
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
                                        <button style={{width:"12vw"}} onClick={()=>this.handleBookOneWay(data,data.class[0].type,data.class[0].price, data.class[0].capacity)}
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
                                                <button style={{width:"12vw"}} onClick={()=>this.handleBookOneWay(data,data.class[1].type,data.class[1].price, data.class[1].capacity)}
                                                className="btn btn-deep-orange">Book</button>
                                                </div>
                                                <div style={{textAlign:"center"}}>
                                                <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.class[2].price}</b><br/>
                                                <b style={{fontSize:"12px",fontWeight:"bold"}}>{data.class[2].type}</b><br/>
                                                <button style={{width:"12vw"}} onClick={()=>this.handleBookOneWay(data,data.class[2].type,data.class[2].price,  data.class[2].capacity)}
                                                className="btn btn-deep-orange">Book</button>
                                                </div>

                                        </div>
                                </div>
                            </div>

                         </div>
                    )
                }

            }
            else{
                if(this.state.low <= data._id.class[0].price &&  data._id.class[0].price <=this.state.high
                    && this.state.arrival_start_time <= this.getminutes(data.flights[0].arrivaltime)
                    && this.state.arrival_end_time >= this.getminutes(data.flights[0].arrivaltime)
                    && this.state.departure_start_time <= this.getminutes(data.flights[0].departuretime)
                    && this.state.departure_end_time >= this.getminutes(data.flights[0].departuretime)

                ){
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
                                                        <img src={'http://localhost:3001/images/'+data._id.imageurl} height="45vh" width="45vw" alt="logo"/>
                                                        <br/>
                                                        <p>{data._id.operator}</p>
                                                        <img src={'http://localhost:3001/images/'+data._id.imageurl} height="45vh" width="45vw" alt="logo"/>
                                                        <br/>
                                                        <p>{data._id.operator}</p>
                                               </div>
                                            </div>
                                            <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px"}}>
                                               <div  style={{textAlign:"center"}}>
                                                        <p style={{fontWeight:"bold"}}>{data.flights[0].departuretime}</p>
                                                        <p>{data.flights[0].origin.city}</p>
                                               </div>

                                               <div  style={{textAlign:"center"}}>
                                                        <p style={{fontWeight:"bold"}}>{data.flights[1].departuretime}</p>
                                                        <p>{data.flights[1].origin.city}</p>
                                               </div>
                                            </div>
                                            <div className="col-sm-2" style={{textAlign:"center"}}>
                                                <br/>
                                                <div  style={{textAlign:"center"}}>
                                                    {this.displaystopline("nonstop")}
                                                    <p style={{fontSize:"12px"}}>non stop</p>
                                                </div>

                                                <div  style={{textAlign:"center"}}>
                                                    {this.displaystopline("nonstop")}
                                                    <p style={{fontSize:"12px"}}>non stop</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px"}}>
                                            <div  style={{textAlign:"center"}}>
                                                     <p style={{fontWeight:"bold"}}>{data.flights[0].arrivaltime}</p>
                                                     <p>{data.flights[0].destination.city}</p>
                                            </div>

                                            <div  style={{textAlign:"center"}}>
                                                     <p style={{fontWeight:"bold"}}>{data.flights[0].arrivaltime}</p>
                                                     <p>{data.flights[1].destination.city}</p>
                                            </div>
                                            </div>
                                            <div className="col-sm-2" style={{textAlign:"center"}}>
                                                <p style={{fontSize:"12px",fontWeight:"bold"}}>{data.flightId}</p>
                                            </div>

                                    </div>
                                 </div>
                                <div className="col-sm-3">
                                        <br/>
                                        <div style={{textAlign:"center"}}>
                                        <div style={{textAlign:"center"}}>
                                        <b style={{fontSize:"20px",fontWeight:"bold"}}>${data._id.class[0].price}</b><br/>
                                        <b style={{fontSize:"12px",fontWeight:"bold"}}>{data._id.class[0].type}</b><br/>
                                        <button style={{width:"12vw"}} onClick={()=>this.handleBookTwoWay(data,data._id.class[0].type, data._id.class[0].price,data._id.class[0].capacity)}
                                        className="btn btn-deep-orange">Book</button>
                                        </div>
                                        </div>

                                </div>
                            </div>
                            </div>
                            <div id={'details'+index} className="collapse">
                                <div className="row">
                                        <div className="col-sm-9">
                                            <div className="row">
                                                 <div className="col-sm-3">
                                                    <p><b>Origin</b></p>
                                                    <p>Day: {data.flights[0].arrivalday}</p>
                                                    <p>Time: {data.flights[0].arrivaltime}</p>
                                                    <p>Airport: {data.flights[0].origin.airport}</p>
                                                    <p>City: {data.flights[0].origin.city}</p>
                                                    <p>State: {data.flights[0].origin.state}</p>

                                                 </div>
                                                 <div className="col-sm-3">
                                                    <p><b>Destination</b></p>
                                                    <p>Day: {data.flights[0].departureday}</p>
                                                    <p>Time: {data.flights[0].departuretime}</p>
                                                    <p>Airport: {data.flights[0].destination.airport}</p>
                                                    <p>City: {data.flights[0].destination.city}</p>
                                                    <p>State: {data.flights[0].destination.state}</p>
                                                 </div>
                                                 <div className="col-sm-3">
                                                    <p><b>Origin</b></p>
                                                    <p>Day: {data.flights[1].arrivalday}</p>
                                                    <p>Time: {data.flights[1].arrivaltime}</p>
                                                    <p>Airport: {data.flights[1].origin.airport}</p>
                                                    <p>City: {data.flights[1].origin.city}</p>
                                                    <p>State: {data.flights[1].origin.state}</p>

                                                 </div>
                                                 <div className="col-sm-3">
                                                    <p><b>Destination</b></p>
                                                    <p>Day: {data.flights[1].departureday}</p>
                                                    <p>Time: {data.flights[1].departuretime}</p>
                                                    <p>Airport: {data.flights[1].destination.airport}</p>
                                                    <p>City: {data.flights[1].destination.city}</p>
                                                    <p>State: {data.flights[1].destination.state}</p>
                                                 </div>
                                            </div>

                                        </div>
                                        <div className="col-sm-3">
                                            <div style={{textAlign:"center"}}>
                                            <div style={{textAlign:"center"}}>
                                            <b style={{fontSize:"20px",fontWeight:"bold"}}>${data._id.class[1].price}</b><br/>
                                            <b style={{fontSize:"12px",fontWeight:"bold"}}>{data._id.class[1].type}</b><br/>
                                            <button style={{width:"12vw"}} onClick={()=>this.handleBookTwoWay(data,data._id.class[1].type, data._id.class[1].price,data._id.class[1].capacity)}
                                            className="btn btn-deep-orange">Book</button>
                                            </div>
                                            </div>
                                            <br/>
                                            <div style={{textAlign:"center"}}>
                                            <div style={{textAlign:"center"}}>
                                            <b style={{fontSize:"20px",fontWeight:"bold"}}>${data._id.class[2].price}</b><br/>
                                            <b style={{fontSize:"12px",fontWeight:"bold"}}>{data._id.class[2].type}</b><br/>
                                            <button style={{width:"12vw"}} onClick={()=>this.handleBookTwoWay(data,data._id.class[2].type, data._id.class[2].price,data._id.class[2].capacity)}
                                            className="btn btn-deep-orange">Book</button>
                                            </div>
                                            </div>


                                        </div>
                                </div>
                            </div>

                         </div>
                    )
                }

            }



     }
     displaynodatacard(){
        if(!this.state.nolist){
            return(
                <div className="card" style={{padding:"5%",textAlign:'center'}} >
                    <h4 className="btn btn-deep-orange"><b>We are aplogise !</b><br/><br/>
                        <b> we don't have any Flight for this city at this time. Thank you for visiting Kayak.</b></h4>
                </div>
            )
        }
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
                         { this.displaynodatacard()}
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
