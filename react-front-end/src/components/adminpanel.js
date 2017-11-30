import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav'
var ReactGridLayout = require('react-grid-layout');
class AdminPanel extends Component {


    componentWillMount(){
       
    }

    render(){
        return(
            <div>
                <div style={{backgroundColor:'black'}}>
                <Nav/>
                </div>
                <ul className="nav nav-tabs nav-justified indigo" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#dashboard" role="tab"><i className="fa fa-line-chart"></i> Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#user" role="tab"><i className="fa fa-user"></i> User</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#booking" role="tab"><i className="fa fa-table"></i> Booking</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#vendor" role="tab"><i className="fa fa-users"></i> Vendor</a>
                    </li>
                </ul>

                <div className="tab-content">
                
                    <div className="tab-pane fade in show active" id="dashboard" role="tabpanel">
                    


                     </div>
                
                    <div className="tab-pane fade" id="user" role="tabpanel">
                    
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                    </div>
                
                    <div className="tab-pane fade" id="booking" role="tabpanel">
                    
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                    </div>
                    <div className="tab-pane fade" id="booking" role="tabpanel">
                    
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                    </div>
                
                </div>
                
            </div>
        )
    }
}

export default AdminPanel;