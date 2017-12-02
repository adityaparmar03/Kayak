import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';

class UserTrip extends Component {


    componentDidMount(){

         // All three Api goes here
         
         // API.getbookings().then((data)=>{
         //     console.log("inside here");
         // })
    }

    render(){
        return(

            <div>
                <ul className="nav md-pills nav-justified pills-primary">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#flights" role="tab">Flights</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#hotels" role="tab">Hotels</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#cars" role="tab">Cars</a>
                </li>
               
                </ul>
                <div className="tab-content">

    
                        <div className="tab-pane fade in show active" id="flights" role="tabpanel">
                            

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>

                        </div>
    
                        <div className="tab-pane fade" id="hotels" role="tabpanel">
                            

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>

                        </div>
    
                        <div className="tab-pane fade" id="cars" role="tabpanel">
                           

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                                reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                                porro voluptate odit minima.</p>

                        </div>
    
   

                    </div>



            </div>
        )
    }
}

export default UserTrip;