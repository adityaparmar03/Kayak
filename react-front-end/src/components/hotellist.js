import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import MultiSlider from "multi-slider";

import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';

class Hotellist extends Component {
    constructor(props){
        super(props);
        this.state = {

            //dummy
            hotelname:"Hyatt",
            // UI states
             nolist:false,
             test:[1,2,3,4,5,1,2,3,4,5],
             low: 0,
             high:0,
             star_low: 1,
             star_high:5,
             valuesPrice:[],
             valuesStar:[],
             googlemap:"https://www.google.com/maps/embed/v1/place?key=AIzaSyAOW5Lf27NBLJDBfmgD_mlvIBlu97OHzXw&q="

        }
     }
      maxprice = 0;
      minprice = 0;
      maxstar = 5;
      minstar = 1;



    componentWillMount(){


        const payload = JSON.parse(localStorage.getItem("hotelsearchcriteria"));
        console.log('payload',payload);


        API.searchHotels(payload)
            .then((res) => {
                console.log(res);
                if (res.status == 201) {

                    this.props.hotelSearch(res.hotels);

                    console.log("Success...")
                  var price = res.hotels.map((item,i)=>parseInt(item.rooms[0].price));
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
                    var valuesStar=[0,4,0]
                    this.setState({
                        valuesPrice: valuesPrice,
            
                        low:this.minprice,
                        high:this.maxprice,
                        nolist:true
                      });
                  }
                 
                  

                }else if (res.status == 401) {

                    //  this.props.history.push('/');
                }
            });


      
       
        var valuesStar=[0,4,0]
        this.setState({
          
            valuesStar:valuesStar,
           
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
    star(num){
        switch(num){
            case 1:
                return <p>&#9733;&#9734;&#9734;&#9734;&#9734;</p>
            case 2:
                return <p>&#9733;&#9733;&#9734;&#9734;&#9734;</p>
            case 3:
                return <p>&#9733;&#9733;&#9733;&#9734;&#9734;</p>
            case 4:
                return <p>&#9733;&#9733;&#9733;&#9733;&#9734;</p>
            case 5:
                return  <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>

        }

    }



    handleBook(data,classtype,price, capacity){
        console.log("selected data ="+JSON.stringify(data))
        var hotelsearchcriteria = JSON.parse(localStorage.getItem('hotelsearchcriteria'));
        var roomcount = hotelsearchcriteria.roomcount;
        var startdate = new Date(hotelsearchcriteria.startdate);
        var enddate = new Date(hotelsearchcriteria.enddate);
        var oneDay = 24*60*60*1000;
        var diffDays = Math.round(Math.abs((startdate.getTime() - enddate.getTime())/(oneDay)));
        var totalPrice = diffDays * price * roomcount;
        var hotelbooking = {

          booking :{
        			"hotelId" : data.hotelId,
        		    "name" : data.name,
        		    "address" : data.address,
        		    "roomtype" : classtype,
        		    "price" : totalPrice,
        		    "roomcount" : roomcount,
        		    "capacity" : capacity,
        		    "bookingstartdate" : startdate,
        			  "bookingenddate" : enddate,
                "days" : diffDays

        	}

      		// "credit_card" : {
      		// 	"card_type" : "MasterCard",
      		// 	"card_number": "012345678989",
      		// 	"card_holder_name" : "Meenakshi Paryani",
      		// 	"valid_from" : "2017-01-18",
      		// 	"valid_till" : "2017-01-26"
      		// }
        }
        var uniqueId = hotelbooking + Date.now();
        console.log('payload', hotelbooking, ' ', uniqueId);
        localStorage.setItem("hotelbooking", JSON.stringify(hotelbooking));
        this.props.history.push('/hotelbooking');
      }

    displayhotels(data,index){
        
           
                if(
                    ((this.state.star_low <= data.stars)&&(this.state.star_high >= data.stars)
                     && (this.state.low <= data.rooms[0].price)&&(this.state.high >= data.rooms[0].price))
                
                     ){
                    return(
    
                                        <div className="card" >
                                            <div data-toggle="collapse" data-target={'#details'+index}>
                                            <div className="row">
                                                <div className="col-sm-7">
                                                <div className="view overlay hm-zoom">
                                                 <img src={'http://localhost:3001/images/'+data.imageurl}
                                                    className="img-fluid " alt={data.name}/>
                                                        <div className="mask flex-center waves-effect waves-light">
                                                            <p className="white-text">{data.name}</p>
                                                        </div>
                                                </div>
    
                                                 </div>
                                                 <div className="col-sm-2">
                                                    <div  style={{marginTop:'3vh'}}>
                                                        <h4 class="h4-responsive"><b>{data.name}</b></h4>
                                                        {this.star(data.stars)}
                                                        <div>
                                                        <button type="button" className="btn btn-elegant">{data.rating}</button>
                                                        <br/><a>{data.reviews.length} Reviews</a>
                                                        </div>
    
                                                    </div>
    
                                                 </div>
                                                <div className="col-sm-3">
                                                        <div style={{textAlign:"center",marginTop:'1vh'}}>
                                                        <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.rooms[0].price}</b><br/>
                                                        <b style={{fontSize:"15px",fontWeight:"bold"}}>{data.rooms[0].roomtype}</b><br/>
                                                        <button style={{minWidth:"10vw",maxHeight:'7.5vh'}}className="btn btn-deep-orange"
                                                        onClick={()=>this.handleBook(data, data.rooms[0].roomtype, data.rooms[0].price, data.rooms[0].rooomcount)}>Book</button>
                                                        <br/>
                                                        <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.rooms[1].price}</b><br/>
                                                        <b style={{fontSize:"15px",fontWeight:"bold"}}>{data.rooms[1].roomtype}</b><br/>
                                                        <button style={{minWidth:"10vw",maxHeight:'7.5vh'}}className="btn btn-deep-orange"
                                                        onClick={()=>this.handleBook(data, data.rooms[1].roomtype, data.rooms[1].price, data.rooms[1].rooomcount)}>Book</button>
                                                        <br/>
                                                        <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.rooms[2].price}</b><br/>
                                                        <b style={{fontSize:"15px",fontWeight:"bold"}}>{data.rooms[2].roomtype}</b><br/>
                                                        <button style={{minWidth:"10vw",maxHeight:'7.5vh'}}className="btn btn-deep-orange"
                                                        onClick={()=>this.handleBook(data, data.rooms[2].roomtype, data.rooms[2].price, data.rooms[2].rooomcount)}>Book</button>
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
                                                <p>{data.description}</p>
                                                    <div className="row">
                                                        <div className="col-sm-4">
    
                                                            <h4><b>Address:</b></h4>
                                                            <h6>{data.address.street}</h6>
                                                            <h6>{data.address.city}, {data.address.state} - {data.address.zip}</h6>
                                                        </div>
    
                                                    </div>
                                                </div>
    
                                                <div className="tab-pane fade" id={'panel2'+index} role="tabpanel">
    
                                                <iframe
                                                        width="100%"
                                                        height="450"
                                                        frameBorder="0"
    
    
                                                        src={this.state.googlemap+data.address.street} >
                                                 </iframe>
                                                </div>
    
                                                <div className="tab-pane fade" id={'panel3'+index} role="tabpanel">
                                                <h4><b>Overall {data.rating}</b></h4>
                                                <h6><b>Based on {data.reviews.length} reviews</b></h6>
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
                                                <div style={{ overflow: 'scroll', height: '20vh'}}>
                                                <p><b>Reviews</b></p>
                                                {data.reviews.map((item,i)=><p>"{item}"</p>)}
                                                </div>
    
                                                </div>
    
    
    
                                            </div>
    
                                            </div>
    
                                         </div>
                                    )
                }
            }
            

     displaynodatacard(){
        if(!this.state.nolist){
            return(
                <div className="card" style={{padding:"5%",textAlign:'center'}} >
                    <h4 className="btn btn-deep-orange"><b>We are aplogise !</b><br/><br/>
                        <b> we don't have any hotel in this area for this time. Thank you for visiting Kayak.</b></h4>
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
                         { this.props.hotels.map((this.displayhotels),this)}
                         { this.displaynodatacard()}
                    </div>
                    

                </div>

              

            </div>
        )
    }
}



function mapStateToProps(reducerdata) {
    console.log(reducerdata.userSearch.hotelSearch);
    const hotels=reducerdata.userSearch.hotelSearch;
    return {hotels};
}

function mapDispatchToProps(dispatch) {
    return {

        hotelSearch : (data) => dispatch(Actions.hotelSearch(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotellist));
