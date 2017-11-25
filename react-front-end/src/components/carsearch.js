import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import moment from 'moment'

class Carsearch extends Component {


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
    

        // call Api for search here......
        //API CALL

      }


      handleUpdateCityInput = (value,textbox) => {
       
        this.setState({"city":value})  
           
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
                var citysuggestion = json.map((item,index)=>item.label)
                this.setState({
                    citysuggestion: citysuggestion
                  });
		});
        
      }; 
      
    
    
    handleStartDate(event, date){
        this.setState({startdate: date})
    }
    handleEndDate(event, date){
        this.setState({enddate: date})
    }
      
   
   
    render(){
        return(
            <div>
            <div className="card" style={{backgroundColor:'#E4E5EA',
             borderRadius: '0px',paddingTop:'3%',paddingBottom:'3%',zIndex:"1"}}>

            <div className="card-body">
            <div className="row">
            
           
            <div className="col-sm-5">
            <div style={{backgroundColor:'white',paddingLeft:"5%",paddingRight:"5%"}}>
            <AutoComplete
                    hintText="City"
                    dataSource={this.state.citysuggestion}
                    onUpdateInput={this.handleUpdateCityInput}
                    floatingLabelText="City"
                    maxSearchResults={5}
                    underlineShow={false}
                    fullWidth={true}
            />
            </div>

            </div>
            <div className="col-sm-3" style={{backgroundColor:'white',paddingLeft:"2%",paddingRight:"5%"}}>
            <DatePicker hintText="Start Date" mode="landscape"  
            onChange={this.handleStartDate.bind(this)}
            floatingLabelText="Start Date"/>
            </div>
            <div className="col-sm-3" style={{backgroundColor:'white',paddingLeft:"0%",paddingRight:"5%"}}>
            <DatePicker hintText="Return Date" mode="landscape"
            onChange={this.handleEndDate.bind(this)} 
            floatingLabelText="Return Date"/>
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
        
        
        </div>
        )
    }
}

export default Carsearch;