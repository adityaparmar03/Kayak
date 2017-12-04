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
import cities from '../constants/cities'
import Toggle from 'material-ui/Toggle';

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
        class:"Economy",
        returndateenable:true
      };
       handleSubmit(){
           if(this.state.from!="" && this.state.to!="" && 
             this.state.startdate!="" && (!this.state.returndateenable || this.state.enddate!="") &&
             this.state.traveler!=""  &&  this.state.class!=""
            ){

            

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
              console.log(moment(this.state.startdate).toString().split(" ")[0]);
              console.log(this.state.returndateenable);


              const  payload={
                  'origincity':this.state.from.split(",")[0].trim(),
                  'originstate':this.state.from.split(",")[1].trim(),
                  'destinationcity':this.state.to.split(",")[0].trim(),
                  'destinationstate':this.state.to.split(",")[1].trim(),
                  'departureday':moment(this.state.startdate).toString().split(" ")[0],
                  'triptype':this.state.returndateenable==true?"Two-Way":"One-Way",
                  'arrivalday':moment(this.state.enddate).toString().split(" ")[0],
                  'flightclass':this.state.class,
                  'startdate' : startdate,
                  'enddate' : enddate,
                  'passengers' : this.state.traveler,
                  'searchtype':'flight'
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

              localStorage.setItem("flightsearchcriteria", JSON.stringify(payload));
              this.props.history.push({
                    pathname:'/flightlist',
                    // search: '?query=abc',
                    flightsearchcriteria: payload
                })
         if(this.props.userprofile.isLoggedIn){
         var date = new Date();
         this.clickHandler({userId:this.props.userprofile.email,sessionId:"sessionId",eventTime:this.timeConverter(date.getTime()),eventName:"FlightSearchButton",pageId:"FlightSearch",buttonId:"FlightSearchButton",objectId:"FlightSearchButton",pageNav:"FlightSearch"})
         }
        }
        else{
        
        }
       }
    
    clickHandler(clickInfo){
        console.log("Button Clicked","$");
        this.handleClick(clickInfo);

    }

    handleClick = (clickInfo) => {
        console.log('handleSubmit');
        API.clickTracker(clickInfo)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.result);
                } else if (response.status === 400) {
                    console.log(response.result);
                }
            });
    };



    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        //YYYY-MM-DD HH:MM:SS
        //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    handleUpdateFromInput = (value,textbox) => {

        this.setState({"from":value})

        var fromsuggestion = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion: fromsuggestion
        });

    };
    handleUpdateToInput = (value,textbox) => {

        this.setState({"to":value})


        var tosuggestion = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            tosuggestion: tosuggestion
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
     styles = {

        toggle: {
          marginBottom: 16,
        },
        thumbOff: {
          backgroundColor: '#ffcccc',
        },
        trackOff: {
          backgroundColor: '#ff9d9d',
        },
        thumbSwitched: {
          backgroundColor: 'red',
        },
        trackSwitched: {
          backgroundColor: '#ff9d9d',
        },
        labelStyle: {
          color: 'red',
        },
      };
    handleToggle(){
        this.setState({
            returndateenable:!this.state.returndateenable
        })
    }
    render(){
        return(
            <div>
                <div className="card" style={{backgroundColor:'#E4E5EA',
                    borderRadius: '0px',paddingTop:'3%',paddingBottom:'3%',zIndex:"1"}}>
                    <table>
                        <tr>
                        <td>One-way</td>
                        <td><Toggle

                                thumbStyle={this.styles.thumbOff}
                                trackStyle={this.styles.trackOff}
                                thumbSwitchedStyle={this.styles.thumbSwitched}
                                trackSwitchedStyle={this.styles.trackSwitched}
                                labelStyle={this.styles.labelStyle}
                                defaultToggled={true}
                                onToggle={this.handleToggle.bind(this)}
                            /></td>
                        <td>Round-Trip</td>
                        </tr>
                     </table>

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
                                    filter={AutoComplete.caseInsensitiveFilter}

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
                                        filter={AutoComplete.caseInsensitiveFilter}
                                    />
                                </div>

                            </div>
                            <div className="col-sm-1" style={{backgroundColor:'white'}}>
                                <DatePicker
                                hintText="Start Date"
                                 mode="landscape"
                                 autoOk={true}
                                 onChange={this.handleStartDate.bind(this)}

                                floatingLabelText="Departure"/>
                            </div>
                            <div className="col-sm-1" style={{backgroundColor:'white',paddingRight:"2vw"}}>
                                <DatePicker
                                hintText="Return Date"
                                mode="landscape"
                                autoOk={true}
                                onChange={this.handleEndDate.bind(this)}
                                disabled={!this.state.returndateenable}
                                floatingLabelText="Return"/>
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
    // console.log(reducerdata);
   const userprofile = reducerdata.userProfile;
 
   console.log(userprofile);
 
     return {userprofile};
 }
 
 function mapDispatchToProps(dispatch) {
     return {
         signIn : (data) => dispatch(Actions.signIn(data))
 
     };
 }
 
 
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Flightsearch));


//export default withRouter(Flightsearch);
