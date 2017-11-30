import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav'
import adminpanelDashboard from './adminpaneldashboard'
import AdminPanelUsers from './adminpanelusers'
import AdminPanelBookings from './adminpanelbookings'
import AdminPanelVendors from './adminpanelvendors'



//var ReactGridLayout = require('react-grid-layout');
class AdminPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            // Data
           
             test:[1,2,3]
        }
     }
   
   
    render(){
        console.log(this.props.vendors)
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
                    
                    <adminpanelDashboard/>

                     </div>
                
                    <div className="tab-pane fade" id="user" role="tabpanel">
                    <AdminPanelUsers/>
                    </div>
                
                    <div className="tab-pane fade" id="booking" role="tabpanel">
                    <AdminPanelBookings/>
                     
                    </div>
                    
                    <div className="tab-pane fade" id="vendor" role="tabpanel" style={{paddingLeft:"1vw"}}>
                      <AdminPanelVendors/>
                    </div>    
                   
                
                </div>
                
            </div>
        )
    }
}


export default (AdminPanel);
