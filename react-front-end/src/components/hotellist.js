import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import MultiSlider from "multi-slider";

class Hotellist extends Component {
    constructor(props){
        super(props);
        this.state = {

            //dummy
            hotelname:"Hyatt",
            // UI states 
             test:[1,2,3,4,5,1,2,3,4,5],
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
    displayhotels(item,index){
        
            return(
                
                <div className="card" >
                    <div data-toggle="collapse" data-target={'#details'+index}>
                    <div className="row">
                        <div className="col-sm-5">
                        <div className="view overlay hm-zoom">
                         <img src={require('../image/samplehotel.jpg')}
                            className="img-fluid " alt={this.state.hotelname}/>
                                <div className="mask flex-center waves-effect waves-light">
                                    <p className="white-text">{this.state.hotelname}</p>
                                </div>
                        </div>
                             
                         </div>
                         <div className="col-sm-4">
                            <div  style={{marginTop:'3vh'}}>
                                <h4 class="h4-responsive"><b>Hyatt</b></h4>
                                <p>&#9733;&#9733;&#9733;&#9734;&#9734;</p>
                                <div>
                                <button type="button" className="btn btn-elegant">8.6</button><a>1,676 Reviews</a>
                                </div>
                                <p>282 Almaden Blvd, San Jose</p>
                            </div> 
                         
                         </div>
                        <div className="col-sm-3">
                                <div style={{textAlign:"center",marginTop:'5vh'}}>
                                <b style={{fontSize:"20px",fontWeight:"bold"}}>$251</b><br/>
                                <b style={{fontSize:"15px",fontWeight:"bold"}}>Delux</b><br/>
                                <button style={{minWidth:"10vw",maxHeight:'7.5vh'}}className="btn btn-deep-orange">Book</button>
                                </div>

                        </div>
                    </div>
                    </div>
                    <div id={'details'+index} className="collapse">
                    
                    <ul className="nav md-pills nav-justified pills-secondary">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href={'#panel1'+index} role="tab">Details</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href={'#panel2'+index} role="tab">Map</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href={'#panel3'+index} role="tab">Review</a>
                        </li>
                     
                    </ul>

                    <div className="tab-content">
                   
                        <div className="tab-pane fade in show active" id={'panel1'+index} role="tabpanel">
                            <p>Excellent city hotel. Close to City Creek Mall. Close to the city center with easily acessible parking. Great pool.</p>
                            <h4><b>Address:</b></h4>
                            <h6>282 Almaden Blvd</h6>
                            <h6>San Jose,CA</h6>
                        </div>

                        <div className="tab-pane fade" id={'panel2'+index} role="tabpanel">
                        <iframe
                                width="100%"
                                height="450"
                                frameBorder="0"
                                
                                
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAOW5Lf27NBLJDBfmgD_mlvIBlu97OHzXw&q=282AlmadenBlvd+SanJose">
                         </iframe>
                        </div>
   
                        <div className="tab-pane fade" id={'panel3'+index} role="tabpanel">
                        <h4><b>Overall 8.6 Excellent</b></h4>
                        <h6><b>Based on 5,655 reviews</b></h6>
                        <p><b>Location</b></p>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" style={{width:'40%',height:"100px"}}></div>
                        </div>
                        <p><b>Food</b></p>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" style={{width:'60%',height:"100px"}}></div>
                        </div>
                        <p><b>Service</b></p>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" style={{width:'20%',height:"100px"}}></div>
                        </div>
                        <p><b>Room</b></p>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" style={{width:'80%',height:"100px"}}></div>
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
                                        <div className="col-sm-6" style={{textAlign:'right',fontSize:'10wh'}}>
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
                         { this.state.test.map((this.displayhotels),this)}     
                    </div>
                   
                </div>
                <div className="modal fade" id="centralModalSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-notify modal-success" role="document">
           
            <div className="modal-content">
              
                <div className="modal-header">
                    <p className="heading lead">Modal Success</p>
    
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="white-text">&times;</span>
                    </button>
                </div>
    
               
                <div className="modal-body">
                    <div className="text-center">
                        <i className="fa fa-check fa-4x mb-3 animated rotateIn"></i>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam blanditiis ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat. Esse ratione fuga, enim,
                            ab officiis totam.</p>
                    </div>
                </div>
    
               
                <div className="modal-footer justify-content-center">
                    <a type="button" className="btn btn-primary-modal">Get it now <i className="fa fa-diamond ml-1"></i></a>
                    <a type="button" className="btn btn-outline-secondary-modal waves-effect" data-dismiss="modal">No, thanks</a>
                </div>
            </div>
         
        </div>
    </div>
            </div>
        )
    }
}

export default withRouter(Hotellist);