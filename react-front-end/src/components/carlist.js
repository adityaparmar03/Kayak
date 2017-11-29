import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import MultiSlider from "multi-slider";

import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';


class Carlist extends Component {
    constructor(props){
        super(props);
        this.state = {

            //dummy
            carname:"Mercedes-Benz",
            // UI states 
             test:[1,2,3,4,5,1,2,3,4,5],
             low: 0,
             high:0,
             star_low: 1,
             star_high:5,
             valuesPrice:[],
       
     
        }
     }
      maxprice = 0; 
      minprice = 0;

    

     
    componentWillMount(){

        const payload = JSON.parse(localStorage.getItem("carsearchcriteria"));
        console.log('payload',payload);

        API.searchCars(payload)
            .then((res) => {
                console.log(res);
                if (res.status == 201) {

                    this.props.carSearch(res.cars);

                    console.log("Success...")

                }else if (res.status == 401) {

                    //  this.props.history.push('/');
                }
            });

        this.maxprice = 234; //get from api
        this.minprice = 67;
        var valuesPrice = [0,this.maxprice-this.minprice,0]
        var valuesStar=[0,4,0]
        this.setState({
            valuesPrice: valuesPrice,
         
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
    displayhotels(item,index){
        
            return(
                
                <div className="card"  >
                    <div data-toggle="collapse" data-target={'#details'+index}>
                    <div className="row">
                    <div className="col-sm-4">
                            <div style={{padding:'1vw'}}>
                                <h5 class="h5-responsive" ><b>Car Name</b></h5>
                                <p>Specification</p>
                             
                                <button type="button" className="btn btn-primary">Get Direction</button>
                               
                              
                            </div> 
                         
                         </div>
                        <div className="col-sm-5">
                        <div className="view overlay hm-zoom">
                         <img src={require('../image/carsample.png')}
                            className="img-fluid " alt={this.state.hotelname}/>
                                <div className="mask flex-center waves-effect waves-light">
                                    <p className="white-text">{this.state.carname}</p>
                                </div>
                        </div>
                             
                         </div>
                        
                        <div className="col-sm-3">
                                <div style={{textAlign:"center",marginTop:'5vh'}}>
                                <b style={{fontSize:"20px",fontWeight:"bold"}}>$251</b><br/>
                                <b style={{fontSize:"15px",fontWeight:"bold"}}>Car Type</b><br/>
                                <button style={{minWidth:"10vw",maxHeight:'7.5vh'}}className="btn btn-deep-orange">Book</button>
                                </div>

                        </div>
                    </div>
                    </div>
                    <div id={'details'+index} className="collapse">
                    
                  
                         <iframe
                                width="100%"
                                height="450"
                                frameBorder="0"
                                
                                
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAOW5Lf27NBLJDBfmgD_mlvIBlu97OHzXw&q=282AlmadenBlvd+SanJose">
                         </iframe>
                    
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
                                        <div className="col-sm-6" style={{textAlign:'right',fontSize:'10wh'}}>
                                        High:${this.state.high}
                                        </div>
                                    </div>
                     
                        <br/>  <br/>
                      
                                    <p style={{fontWeight:"bold"}}>Type</p>
                                    <hr/>    
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Small
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Medium
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Small
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Medium
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Large
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Suv
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Luxury
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Van
                                                </label>
                                        </div>

                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Pickup Truck
                                               </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" value=""/>Convertible
                                             </label>
                                         </div>

                        
         
                     
                        </div>  

                        
                    </div>
                    <div className="col-8" style={{ overflow: 'scroll', height: '90vh'}}>
                         { this.state.test.map((this.displayhotels),this)}     
                    </div>
                   
                </div>
              
   
            </div>
        )
    }
}


function mapStateToProps(reducerdata) {
    console.log(reducerdata.userSearch.carSearch);

    const cars=reducerdata.userSearch.carSearch;
    return {cars};
}

function mapDispatchToProps(dispatch) {
    return {

        carSearch : (data) => dispatch(Actions.carSearch(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carlist));
