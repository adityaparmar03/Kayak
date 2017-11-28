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
             star_low: 1,
             star_high:5,
             valuesPrice:[],
             valuesStar:[],
     
        }
     }
      maxprice = 0; 
      minprice = 0;
      maxstar = 5;
      minstar = 1;
    

     
    componentWillMount(){


        this.maxprice = 234; //get from api
        this.minprice = 67;
        var valuesPrice = [0,this.maxprice-this.minprice,0]
        var valuesStar=[0,4,0]
        this.setState({
            valuesPrice: valuesPrice,
            valuesStar:valuesStar,
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
    onChangeStar = values =>
    this.setState({
      valuesStar: values,
      star_low :  this.minstar + values[0],
      star_high: this.maxstar - values[2]
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
                      
                                    <p style={{fontWeight:"bold"}}>Star</p>
                                    <hr/>    
                                    <MultiSlider
                                    colors={colors}
                                    values={this.state.valuesStar}
                                    onChange={this.onChangeStar}
                                />
                                <div className="row">

                                        <div className="col-sm-6">
                                        {(this.state.star_low)}
                                        </div>
                                        <div className="col-sm-6" style={{textAlign:'right',fontSize:'10wh'}}>
                                        {(this.state.star_high)}
                                        </div>
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

export default withRouter(Hotellist);