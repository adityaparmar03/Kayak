import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

class Flightsearch extends Component {


    componentWillMount(){
       
    }
    state = {

        // UI State
        airportlist: [],
        travellerpopup:false
      };
      handleUpdateInput = (value) => {
        var term = value.toUpperCase();
        var API = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=NKHaRIuzMxh8bfMSPnKPt3UGrHjDx9AV&term="+term+"&country=US";
        console.log("API"+API)
        fetch(API, {method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
           })
            .then((response) => response.json())
		    .then((json) => {
                var airportlist = json.map((item,index)=>item.label)
                this.setState({
                    airportlist: airportlist
                  });
		});
        
      }; 
      
      
    handlepopup(){
        this.setState({travellerpopup:!this.state.travellerpopup})
    } 
    displaypopup(){
        if(this.state.travellerpopup){
            return <div style={{marginTop:"-6%",minWidth:"300px",
            marginLeft:"60%",marginRight:"10%",borderRadius:"0",zIndex:"2"}} className="card">
                <div className="card-body"> 
                    <button type="button" className="close" aria-label="Close" onClick={()=>this.handlepopup()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5>Cabin Class</h5>
                    <button type="button" className="btn btn-outline-primary waves-effect">Economy</button>
                    <button type="button" className="btn btn-outline-primary waves-effect">Business</button>
                    <button type="button" className="btn btn-outline-primary waves-effect">Premium</button>
                    <button type="button" className="btn btn-outline-primary waves-effect">First</button>
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
                    dataSource={this.state.airportlist}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText="From"
                    maxSearchResults={5}
            />
       
            </div>
            <div className="col-sm-3">
            <div style={{backgroundColor:'white'}}>
            <AutoComplete
                    hintText="To"
                    dataSource={this.state.airportlist}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText="To"
                    maxSearchResults={5}
            />
            </div>

            </div>
            <div className="col-sm-1" style={{backgroundColor:'white'}}>
            <DatePicker hintText="Start Date" mode="landscape"  floatingLabelText="Start Date"/>
            </div>
            <div className="col-sm-1" style={{backgroundColor:'white'}}>
            <DatePicker hintText="Return Date" mode="landscape" floatingLabelText="Return Date"/>
            </div>
            <div className="col-sm-3">
            <div style={{backgroundColor:'white'}} onClick={()=>this.handlepopup()}>    
            <TextField
                 hintText="Travelers"
                 floatingLabelText="Travelers"
                 underlineShow='false'
            />
            </div>
            </div>
            <div className="col-sm-1" >

            <button type="button" className="btn btn-deep-orange" style={{marginLeft:"-10%",height:'60px'}}>
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

export default Flightsearch;