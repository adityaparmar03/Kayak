// db.CleartripCars.insert({
//     'carId': 'CT101',
//     'cartype':'Medium',
//     'carmodel':'Audi',
//     'imageurl': 'audi.png',
//     'specification':'manual',
//     'pickupaddress': {'street':'101 E San Fernando St.','city':'San Jose', 'state': 'California', 'country':'USA'},
//     'dropoffaddress': {'street':'101 E San Fernando St.','city':'San Jose', 'state': 'California', 'country':'USA'},
//     'dailyrent':200})

import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import MultiSlider from "multi-slider";
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import cities from '../constants/cities'


class Caradd extends Component {

        state = {
        carid: '',
        cartype: '',
        carmodel: '',
        image: '',
        specification: '',
        city: '',
        state: '',
        city1: '',
        state1: '',
        dailyrent: '',
        fromsuggestion1: [],
        from1:"",
        fromsuggestion2: [],
        from2:"",


    }


    handleUpdateFromInput1 = (value,textbox) => {

        this.setState({"from1":value})


        var fromsuggestion1 = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion1: fromsuggestion1
        });


    };
    handleUpdateFromInput2 = (value,textbox) => {

        this.setState({"from2":value})


        var fromsuggestion2 = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion2: fromsuggestion2
        });


    };

    handleSubmit(){


        var payload ={
            'carId':this.state.carid,
            'cartype':this.state.cartype,
            'carmodel':this.state.carmodel,
            'image':"BMW.png",
            'specification':this.state.specification,
            'dailyrent':this.state.dailyrent,
            'pickupaddress': {'street':'101 E San Fernando St.','city':this.state.from1.split(",")[0].trim(), 'state':this.state.from1.split(",")[1].trim(), 'country':'USA'},
            'dropoffaddress': {'street':'101 E San Fernando St.','city':this.state.from2.split(",")[0].trim(), 'state':this.state.from2.split(",")[1].trim(), 'country':'USA'}
        }



        console.log(payload);


            API.addCar(payload)
                .then((res) => {


                    if (res.status == 200) {


                        console.log("Success...")

                    }else if (res.status == 401) {

                        //  this.props.history.push('/');
                    }
                });



    }


    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="md-form">
                            <i className="fa fa-car prefix"></i>
                            <input type="text" id="Operator" placeholder="Car Type" className="form-control"
                                   value={this.state.cartype}
                                   onChange={(event) => {
                                       this.setState({
                                           cartype: event.target.value
                                       });
                                   }}/>
                        </div>

                    </div>
                    <div className="col-sm-6">
                        <div className="md-form">
                            <input type="text" id="FlightId" placeholder="Car Id" className="form-control"
                                   value={this.state.carid}
                                   onChange={(event) => {
                                       this.setState({
                                           carid: event.target.value
                                       });
                                   }}
                            />

                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="md-form">
                            <i className="fa fa-car prefix"></i>
                            <input type="text" placeholder="Car Model" id="economy" className="form-control"
                                   value={this.state.carmodel}
                                   onChange={(event) => {
                                       this.setState({
                                           carmodel: event.target.value
                                       });
                                   }}
                            />
                        </div>

                    </div>
                    <div className="col-sm-4">
                        <div className="md-form">
                            <i className="fa fa-address-card prefix"></i>
                            <input type="text" placeholder="Specification" id="firstclass" className="form-control"
                                   value={this.state.specification}
                                   onChange={(event) => {
                                       this.setState({
                                           specification: event.target.value
                                       });
                                   }}
                            />


                        </div>

                    </div>
                    <div className="col-sm-4">
                        <div className="md-form">
                            <i className="fa fa-money prefix"></i>

                            <input type="text" placeholder="Daily Rent" id="business" className="form-control"
                                   value={this.state.dailyrent}
                                   onChange={(event) => {
                                       this.setState({
                                           dailyrent: event.target.value
                                       });
                                   }}
                            />


                        </div>

                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="md-form">
                            <AutoComplete
                                hintText="From"
                                dataSource={this.state.fromsuggestion1}
                                onUpdateInput={this.handleUpdateFromInput1}
                                floatingLabelText="From"
                                maxSearchResults={5}
                                underlineShow={false}
                                filter={AutoComplete.caseInsensitiveFilter}
                            />

                        </div>

                    </div>

                    <div className="col-sm-6">
                        <div className="md-form">
                            <AutoComplete
                                hintText="To"
                                dataSource={this.state.fromsuggestion2}
                                onUpdateInput={this.handleUpdateFromInput2}
                                floatingLabelText="To"
                                maxSearchResults={5}
                                underlineShow={false}
                                filter={AutoComplete.caseInsensitiveFilter}
                            />

                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">

                    </div>


                    <div className="col-sm-4">


                    </div>
                    <div className="col-sm-4">


                    </div>
                </div>

                <button type="button" className="btn btn-light-blue btn-lg btn-block" onClick={() => {
                    this.handleSubmit()
                }}>Add Car
                </button>
            </div>


        );


    }
}


export default Caradd;


