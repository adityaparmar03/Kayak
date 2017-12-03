import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import cities from '../constants/cities';
import * as API from '../api/API';

class Hotelsearch extends Component {


    componentWillMount(){

    }
    state = {

        //textbox values
        city:"",
        startdate:"",
        enddate:"",

        // UI State

        citysuggestion: [],
        travelerpopup:false,
        rooms:1,
        guests:1,

      };
       handleSubmit(){

        var startdate =moment(this.state.startdate).month()+"/"+
        moment(this.state.startdate).date()+"/"+
        moment(this.state.startdate).year()
        var enddate =moment(this.state.enddate).month()+"/"+
        moment(this.state.enddate).date()+"/"+
        moment(this.state.enddate).year()

        console.log("From=>"+this.state.city)
        console.log("Stat date=>"+startdate)
        console.log("Return Date=>"+enddate)
        console.log("Rooms =>"+this.state.rooms)
        console.log("Guests =>"+this.state.guests)

        // call Api for search here......
        //API CALL

        const payload={
            'city':this.state.city.split(",")[0].trim(),
            'state':this.state.city.split(",")[1].trim(),
            'occupancy':this.state.guests,
            'startdate' : startdate,
            'enddate' : enddate,
            'roomcount' : this.state.rooms,
            'searchtype': 'hotel'
        }

           API.checkSession().then((data)=>{
               console.log("inside the check session response");
               console.log(data);

               if(data.status===201){

                   API.addHistory(payload)
                       .then((res) => {


                           if (res.status == 200) {


                               console.log("Success...")

                           }else if (res.status == 401) {

                               //  this.props.history.push('/');
                           }
                       });
               }

           })



           console.log('payload', payload);

           localStorage.setItem("hotelsearchcriteria", JSON.stringify(payload));
           this.props.history.push('/hotellist');


       }


      handleUpdateCityInput = (value,textbox) => {

        this.setState({"city":value})

        var citysuggestion = cities().map((item,i)=>item.city+", "+item.state)

          this.setState({
              citysuggestion: citysuggestion
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
    changetraveler(op,type){

        if(op=="+"){
            if(type === "rooms"){
                if(this.state.rooms >= this.state.guests){
                    this.setState({guests:this.state.guests+1})
                }
                this.setState({rooms:this.state.rooms+1})
            }else{

                if(this.state.guests >= this.state.rooms*4){
                    this.setState({rooms:this.state.rooms+1})
                }
                this.setState({guests:this.state.guests+1})
            }

        }else{
            if(type === "rooms"){
                if(this.state.rooms > 1){

                    this.setState({rooms:this.state.rooms-1})

                    if((this.state.guests) > (this.state.rooms-1)*4){
                        this.setState({guests:(this.state.rooms-1)*4})

                    }

                }

            }else{
                if(this.state.guests > 1)
                {
                    if(this.state.rooms < this.state.guests){
                        this.setState({guests:this.state.guests-1})
                    }

                }

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

                    <h6><b>Rooms</b></h6>
                    <hr/>
                    <div className="row">

                        <div className="col-sm-4">
                            <button type="button" onClick={()=>this.changetraveler("-","rooms")}
                            className="btn btn-outline-primary waves-effect">&minus;</button>
                        </div>
                        <div className="col-sm-4"><p style={{textAlign:"center",marginTop:"18px"}}>{this.state.rooms}</p></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={()=>this.changetraveler("+","rooms")}
                            className="btn btn-outline-primary waves-effect">+</button>
                        </div>

                     </div>
                     <br/>
                     <h6><b>Guests</b></h6>
                    <hr/>
                    <div className="row">

                        <div className="col-sm-4">
                            <button type="button" onClick={()=>this.changetraveler("-","guests")}
                            className="btn btn-outline-primary waves-effect">&minus;</button>
                        </div>
                        <div className="col-sm-4"><p style={{textAlign:"center",marginTop:"18px"}}>{this.state.guests}</p></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={()=>this.changetraveler("+","guests")}
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


            <div className="col-sm-4">
            <div style={{backgroundColor:'white',paddingLeft:"5%",paddingRight:"5%"}}>
            <AutoComplete
                    hintText="City"
                    dataSource={this.state.citysuggestion}
                    onUpdateInput={this.handleUpdateCityInput}
                    floatingLabelText="City"
                    maxSearchResults={5}
                    underlineShow={false}
                    fullWidth={true}
                    filter={AutoComplete.caseInsensitiveFilter}
            />
            </div>

            </div>
            <div className="col-sm-2" style={{backgroundColor:'white',paddingLeft:"2%",paddingRight:"5%"}}>
            <DatePicker hintText="Start Date" mode="landscape"
            onChange={this.handleStartDate.bind(this)}
            floatingLabelText="Start Date"/>
            </div>
            <div className="col-sm-2" style={{backgroundColor:'white',paddingLeft:"0%",paddingRight:"5%"}}>
            <DatePicker hintText="Return Date" mode="landscape"
            onChange={this.handleEndDate.bind(this)}
            floatingLabelText="Return Date"/>
            </div>
            <div className="col-sm-3">
            <div style={{backgroundColor:'white',paddingLeft:"5%",paddingRight:"5%"}} onClick={()=>this.handlepopup()}>
            <TextField
                 hintText="Occupancy"
                 floatingLabelText="Occupancy"
                 underlineShow={false}
                 value={this.state.rooms+" Rooms, "+this.state.guests+" Guests"}

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



export default withRouter(Hotelsearch);
