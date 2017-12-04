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
             nolist:false,
             test:[1,2,3,4,5,1,2,3,4,5],
             checkeddata:[],
             changed:false,
             low: 0,
             high:0,
             star_low: 1,
             star_high:5,
             valuesPrice:[],
             initialpricemax:0,
             googlemap:"https://www.google.com/maps/embed/v1/place?key=AIzaSyAOW5Lf27NBLJDBfmgD_mlvIBlu97OHzXw&q="



        }
     }
      maxprice = 0;
      minprice = 0;




    componentWillMount(){

        const payload = JSON.parse(localStorage.getItem("carsearchcriteria"));
        console.log('payload',payload);
        var max=0;
        var min =0;
        API.searchCars(payload)
            .then((res) => {

                if (res.status == 201) {

                    this.props.carSearch(res.cars);

                   
                    var price = res.cars.map((item,i)=>parseInt(item.dailyrent));
                    if(price.length > 0){
                     max = price.reduce(function(a, b) {
                        return Math.max(a, b);
                    });
                     min = price.reduce(function(a, b) {
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

    handleBook(data, price){
        console.log("selected data ="+JSON.stringify(data))
        var carsearchcriteria = JSON.parse(localStorage.getItem('carsearchcriteria'));
        var dropoff = carsearchcriteria.dropoff;
        var startdate = new Date(carsearchcriteria.startdate);
        var enddate = new Date(carsearchcriteria.enddate);
        var oneDay = 24*60*60*1000;
        var diffDays = Math.round(Math.abs((startdate.getTime() - enddate.getTime())/(oneDay)));
        var totalPrice = diffDays * price;
        var carbooking = {
          booking : {
      			  "carId" : data.carId,
      		    "cartype" : data.cartype,
      		    "carmodel" : data.carmodel,
      		    "pickupdate" : startdate,
      		    "dropoffdate" : enddate,
      		    "triptype"    : dropoff,
      		    "pickupaddress" : data.pickupaddress,
      		    "dropoffaddress" : data.dropoffaddress,
      		    "price" : totalPrice,
              "days" : diffDays
      		}
          // credit_card : { // TODO - add credit card from user
      		// 	"card_type" : "MasterCard",
      		// 	"card_number": "012345678989",
      		// 	"card_holder_name" : "Meenakshi Paryani",
      		// 	"valid_from" : "2017-01-18",
      		// 	"valid_till" : "2017-01-26"
    		  // }
        }
        var uniqueId = carbooking + Date.now();
        console.log('payload', carbooking, ' ', uniqueId);
        localStorage.setItem("carbooking", JSON.stringify(carbooking));
        this.props.history.push('/carbooking');
    }

    displayhotels(data,index){
            //var con = this.state.checkeddata.includes(data.cartype);

            var result = (this.state.checkeddata.indexOf(data.cartype) > -1);
            console.log(result)
            if(
                ((this.state.low <= data.dailyrent) && (data.dailyrent <= this.state.high))
                 &&
                 (this.state.checkeddata.length == 0 || result)
            ){
                return(

                                    <div className="card" key={index}>
                                        <div data-toggle="collapse" data-target={'#details'+index}>
                                        <div className="row">
                                        <div className="col-sm-4">
                                                <div style={{padding:'1vw'}}>
                                                    <h5 class="h5-responsive" ><b>{data.carmodel}</b></h5>
                                                    <p>Pickup : {data.pickupaddress.street}, {data.pickupaddress.city}, {data.pickupaddress.state}</p>
                                                    <p>Dropoff : {data.dropoffaddress.street}, {data.dropoffaddress.city}, {data.dropoffaddress.state}</p>

                                                    <button type="button" className="btn btn-primary">Get Direction</button>


                                                </div>

                                             </div>
                                            <div className="col-sm-5">
                                            <div className="view overlay hm-zoom">
                                             <img src={'http://localhost:3001/images/'+data.imageurl}
                                                className="img-fluid " alt={data.carmodel}/>
                                                    <div className="mask flex-center waves-effect waves-light">
                                                        <p className="white-text">{data.carmodel}</p>
                                                    </div>
                                            </div>

                                             </div>

                                            <div className="col-sm-3">
                                                    <div style={{textAlign:"center",marginTop:'5vh'}}>
                                                    <b style={{fontSize:"20px",fontWeight:"bold"}}>${data.dailyrent}</b><br/>
                                                    <b style={{fontSize:"15px",fontWeight:"bold"}}>{data.cartype}</b><br/>
                                                    <button style={{minWidth:"10vw",maxHeight:'7.5vh'}}className="btn btn-deep-orange"
                                                    onClick={()=>this.handleBook(data,data.dailyrent, data)}>Book</button>
                                                    </div>

                                            </div>
                                        </div>
                                        </div>
                                        <div id={'details'+index} className="collapse">


                                             <iframe
                                                    width="100%"
                                                    height="450"
                                                    frameBorder="0"
                                                    src={this.state.googlemap+data.pickupaddress.street}
                                                    >
                                             </iframe>

                                        </div>


                                     </div>
                                )
            }

     }
    handleChecked(data){
       if( this.state.checkeddata.includes(data)) {
        var index = this.state.checkeddata.indexOf(data)
        if (index > -1) {
            console.log("unchecked")
            var arrayvar = this.state.checkeddata.slice()
            arrayvar.splice(index, 1)

            this.setState({
                checkeddata :  arrayvar
            })

        }
       }
       else{
        this.setState({
            checkeddata : [...this.state.checkeddata, data]
        })

       }
       console.log(this.state.checkeddata)
       //this.state.changed

    }
    displaynodatacard(){
        if(!this.state.nolist){
            return(
                <div className="card" style={{padding:"5%",textAlign:'center'}} >
                    <h4 className="btn btn-deep-orange"><b>We are aplogise !</b><br/><br/>
                        <b> we don't have any car for this city at this time. Thank you for visiting Kayak.</b></h4>
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

                                    <p style={{fontWeight:"bold"}}>Type</p>
                                    <hr/>

                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("Small")} value=""/>Small
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("Medium")} value=""/>Medium
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("Large")} value=""/>Large
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("SUV")} value=""/>SUV
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("Luxury")} value=""/>Luxury
                                                </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("Van")} value=""/>Van
                                                </label>
                                        </div>

                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("Pickup Truck")} value=""/>Pickup Truck
                                               </label>
                                        </div>
                                        <div className="form-check form-check">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"
                                                onChange={(e)=>this.handleChecked("Convertible")} value=""/>Convertible
                                             </label>
                                         </div>




                        </div>


                    </div>
                    <div className="col-8" style={{ overflow: 'scroll', height: '90vh'}}>
                         { this.props.cars.map((this.displayhotels),this)}
                         { this.displaynodatacard()}
                    </div>

                </div>


            </div>
        )
    }
}


function mapStateToProps(reducerdata) {
    console.log(reducerdata.userSearch.carSearch);

    const cars=reducerdata.userSearch.carSearch.sort(function(a, b){
        var keyA = a.dailyrent
        var keyB = b.dailyrent;
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });;
    console.log(cars)
    return {cars};
}

function mapDispatchToProps(dispatch) {
    return {

        carSearch : (data) => dispatch(Actions.carSearch(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carlist));
