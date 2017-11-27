import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';

class Flightsearch extends Component {


    componentWillMount(){
       
    }
    state = {

        //textbox values
        from:"",
        to:"",
        startdate:"",
        enddate:"",
        
        // UI State
        fromsuggestion: [],
        tosuggestion: [],
        travelerpopup:false,
        traveler:1,
        class:"Economy"
      };
       handleSubmit(){
        
        var startdate =moment(this.state.startdate).month()+"/"+
        moment(this.state.startdate).date()+"/"+
        moment(this.state.startdate).year()
        var enddate =moment(this.state.enddate).month()+"/"+
        moment(this.state.enddate).date()+"/"+
        moment(this.state.enddate).year()

        console.log("From=>"+this.state.from)
        console.log("To=>"+this.state.to)
        console.log("Stat date=>"+startdate)
        console.log("Return Date=>"+enddate)
        console.log("Travelers =>"+this.state.traveler)
        console.log("class =>"+this.state.class)

       const  payload={'origincity':'San Jose',
           'originstate':'CA',
           'destinationcity':'Delhi',
           'destinationstate':'Delhi',
           'trip-type':'One-Way',
           'flightclass':'economy'}

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
       // call Api for search here......
           //API CALL

       }


    handleUpdateFromInput = (value,textbox) => {

        this.setState({"from":value})

        var term = value.toUpperCase();
        var API = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=NKHaRIuzMxh8bfMSPnKPt3UGrHjDx9AV&term="+term+"&country=US";
        //var API = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=s&types=(cities)&key=AIzaSyC6yOY5y7Y8pAehpj8khSIIDcjsulHvuFs";

        fetch(API, {method: 'GET',headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        })
            .then((response) => response.json())
            .then((json) => {
                var fromsuggestion = json.map((item,index)=>item.label)
                this.setState({
                    fromsuggestion: fromsuggestion
                });
            });

    };
    handleUpdateToInput = (value,textbox) => {

        this.setState({"to":value})

        var term = value.toUpperCase();
        //var API = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=NKHaRIuzMxh8bfMSPnKPt3UGrHjDx9AV&term="+term+"&country=US";
        var API = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=san&types=(cities)&key=AIzaSyC6yOY5y7Y8pAehpj8khSIIDcjsulHvuFs";
        fetch(API, {method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',

            'Access-Control-Allow-Credentials':true
        },
        })
            .then((response) => response.json())
            .then((json) => {
                var tosuggestion = json.map((item,index)=>item.description)
                console.log(tosuggestion)
                this.setState({
                    tosuggestion: tosuggestion
                });
            });

    };


    handleStartDate(event, date){
        this.setState({startdate: date})
    }
    handleEndDate(event, date){
        this.setState({enddate: date})
    }

    handlepopup(){
        this.setState({travelerpopup:!this.state.travelerpopup})
    }
    changetraveler(op){
        console.log(this.state)
        if(op=="+"){
            this.setState({traveler:this.state.traveler+1})
        }else{
            if(this.state.traveler != 1){
                this.setState({traveler:this.state.traveler-1})
            }
        }
    }
    changeclass(cl){
        this.setState({class:cl})
    }
    displaypopup(){
        if(this.state.travelerpopup){
            return <div style={{marginTop:"-6%",minWidth:"300px",
                marginLeft:"60%",marginRight:"10%",borderRadius:"0",zIndex:"2"}} className="card">
                <div className="card-body">
                    <button type="button" className="close" aria-label="Close" onClick={()=>this.handlepopup()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h6><b>Cabin Class</b></h6>
                    <button type="button" className="btn btn-outline-primary waves-effect" onClick={()=>this.changeclass("Economy")}>Economy</button>
                    <button type="button" className="btn btn-outline-primary waves-effect" onClick={()=>this.changeclass("Business")}>Business</button>
                    <button type="button" className="btn btn-outline-primary waves-effect" onClick={()=>this.changeclass("Premium")}>Premium</button>
                    <button type="button" className="btn btn-outline-primary waves-effect" onClick={()=>this.changeclass("First")}>First</button>
                    <hr/>
                    <h6><b>Travelers</b></h6>
                    <div className="row">

                        <div className="col-sm-4">
                            <button type="button" onClick={()=>this.changetraveler("-")}
                                    className="btn btn-outline-primary waves-effect">&minus;</button>
                        </div>
                        <div className="col-sm-4"><p style={{textAlign:"center",marginTop:"18px"}}>{this.state.traveler}</p></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={()=>this.changetraveler("+")}
                                    className="btn btn-outline-primary waves-effect">+</button>
                        </div>

                    </div>
                </div>

            </div>
        }

    }
    render(){
        return(
            <div>
                <div className="card" style={{backgroundColor:'#E4E5EA',
                    borderRadius: '0px',paddingTop:'3%',paddingBottom:'3%',zIndex:"1"}}>

                    <div className="card-body">
                        <div className="row">

                            <div className="col-sm-3" style={{backgroundColor:'white'}} >

                                <AutoComplete
                                    hintText="From"
                                    dataSource={this.state.fromsuggestion}
                                    onUpdateInput={this.handleUpdateFromInput}
                                    floatingLabelText="From"
                                    maxSearchResults={5}
                                    underlineShow={false}

                                />

                            </div>
                            <div className="col-sm-3">
                                <div style={{backgroundColor:'white'}}>
                                    <AutoComplete
                                        hintText="To"
                                        dataSource={this.state.tosuggestion}
                                        onUpdateInput={this.handleUpdateToInput}
                                        floatingLabelText="To"
                                        maxSearchResults={5}
                                        underlineShow={false}
                                    />
                                </div>

                            </div>
                            <div className="col-sm-1" style={{backgroundColor:'white'}}>
                                <DatePicker hintText="Start Date" mode="landscape"
                                            onChange={this.handleStartDate.bind(this)}
                                            floatingLabelText="Start Date"/>
                            </div>
                            <div className="col-sm-1" style={{backgroundColor:'white'}}>
                                <DatePicker hintText="Return Date" mode="landscape"
                                            onChange={this.handleEndDate.bind(this)}
                                            floatingLabelText="Return Date"/>
                            </div>
                            <div className="col-sm-3">
                                <div style={{backgroundColor:'white'}} onClick={()=>this.handlepopup()}>
                                    <TextField
                                        hintText="Travelers"
                                        floatingLabelText="Travelers"
                                        underlineShow={false}
                                        value={this.state.traveler+" Travelers, "+this.state.class}

                                    />
                                </div>
                            </div>
                            <div className="col-sm-1" >

                                <button type="button" className="btn btn-deep-orange"
                                        onClick={()=>this.handleSubmit()}
                                        style={{marginLeft:"-10%",height:'60px'}}>
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                            </div>

                        </div>
                    </div>

                </div>
                {this.displaypopup()}

            </div>
        )
    }
}


function mapStateToProps(reducerdata) {
    console.log(reducerdata);

    return {reducerdata};
}

function mapDispatchToProps(dispatch) {
    return {

        flightSearch : (data) => dispatch(Actions.flightSearch(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Flightsearch);
