// db.MmtHotels.insert({
//     'hotelId': 'MMT111',
//     'name': 'Holiday Inn',
//     'imageurl': 'holidayinn.jpg',
//     'description': 'Very good hotel. Easily accessible by car and good for sightseeing. Great rooms and fantastic service. Awesome vibe.',
//     'address': {'street':'101 E San Fernando Street','city':'San Jose', 'state': 'California', 'country':'USA', 'zip':'95112'},
//     'stars': 3,
//     'reviews':['Good', 'Bad', 'Awesome Food'],
//     'rating':8.5,
//     'rooms':[
//         {'roomtype':'Delux', 'price':120, 'rooomcount':100},
//         {'roomtype':'Super Delux','price':220, 'rooomcount':100},
//         {'roomtype':'Premium','price':320, 'rooomcount':100}
//     ]
// })







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


class Hoteladd extends Component {



    state = {
        hotelId: '',
        name: '',
        imageurl:'',
        description:'',
        city:'',
        state:'',
        zip:'',
        price1:'',
        price2:'',
        price3:'',




        fromsuggestion1: [],
        from1:""



    }


    handleUpdateFromInput1 = (value,textbox) => {

        this.setState({"from1":value})


        var fromsuggestion1 = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion1: fromsuggestion1
        });


    };

    handleSubmit(){


        var payload ={


            'hotelId': this.state.hotelId,
            'name': this.state.name,
            'imageurl': 'holidayinn.jpg',
            'description': this.state.description,
            'address': {'street':'101 E San Fernando Street','city':this.state.from1.split(",")[0].trim(), 'state': this.state.from1.split(",")[1].trim(), 'country':'USA', 'zip':'95112'},
            'stars': 3,
            'reviews':'Awesome Food',
            'rating':8.5,
            'rooms':[
                {'roomtype':'Delux', 'price':this.state.price1, 'rooomcount':100},
                {'roomtype':'Super Delux','price':this.state.price2, 'rooomcount':100},
                {'roomtype':'Premium','price':this.state.price3, 'rooomcount':300}]
        }

        console.log(payload);

        API.addHotel(payload)
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
                            <i className="fa fa-bed prefix"></i>
                            <input type="text" id="Operator" placeholder="Hotel Id" className="form-control"
                                   value={this.state.hotelId}
                                   onChange={(event) => {
                                       this.setState({
                                           hotelId: event.target.value
                                       });
                                   }}/>
                        </div>

                    </div>
                    <div className="col-sm-6">
                        <div className="md-form">
                            <input type="text" id="Hotel Name" placeholder="Hotel Name" className="form-control"
                                   value={this.state.name}
                                   onChange={(event) => {
                                       this.setState({
                                           name: event.target.value
                                       });
                                   }}
                            />

                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="md-form">
                            <i className="fa fa-money prefix"></i>
                            <input type="text" placeholder="Premium" id="premium" className="form-control"
                                   value={this.state.price3}
                                   onChange={(event) => {
                                       this.setState({
                                           price3: event.target.value
                                       });
                                   }}
                            />
                        </div>

                    </div>

                    <div className="col-sm-4">
                        <div className="md-form">
                            <i className="fa fa-money prefix"></i>

                            <input type="text" placeholder=" Delux Price" id="Delux" className="form-control"
                                   value={this.state.price1}
                                   onChange={(event) => {
                                       this.setState({
                                           price1: event.target.value
                                       });
                                   }}
                            />


                        </div>

                    </div>
                    <div className="col-sm-4">
                        <div className="md-form">
                            <i className="fa fa-money prefix"></i>

                            <input type="text" placeholder="Super Delux" id="Super Delux" className="form-control"
                                   value={this.state.price2}
                                   onChange={(event) => {
                                       this.setState({
                                           price2: event.target.value
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
                                hintText="Location"
                                dataSource={this.state.fromsuggestion1}
                                onUpdateInput={this.handleUpdateFromInput1}
                                floatingLabelText="Location"
                                maxSearchResults={5}
                                underlineShow={false}
                                filter={AutoComplete.caseInsensitiveFilter}
                            />

                        </div>

                    </div>


                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="md-textarea">

                            <input type="text" id="Description" placeholder="Description" className="md-textarea"
                                   value={this.state.description}
                                   onChange={(event) => {
                                       this.setState({
                                           description: event.target.value
                                       });
                                   }}/>
                        </div>
                    </div>
                </div>
                        <br/>
                        <br/>
                <button type="button" className="btn btn-light-blue btn-lg btn-block" onClick={() => {
                    this.handleSubmit()
                }}>Add Hotel
                </button>
            </div>


        );


    }
}


export default Hoteladd;


