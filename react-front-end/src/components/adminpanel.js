import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav'
import AdminPanelUsers from './adminpanelusers'

import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';

var ReactGridLayout = require('react-grid-layout');
class AdminPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            // Data
           
             test:[1,2,3]
        }
     }
    componentWillMount(){

        API.getVendors()
            .then((res) => {
                console.log(res.vendors);

                if (res.status == 200) {

                    this.props.getVendors(res.vendors);

                    console.log("Success...")

                }else if (res.status == 401) {

                    //  this.props.history.push('/');
                }
            });
    }

    addVendor(data){

        API.addVendorApi(data)
            .then((status) => {
                console.log(status);

                if (status == 200) {

                    this.props.addVendor(data);

                    console.log("Success...")

                }else if (status == 401) {

                    //  this.props.history.push('/');
                }
            });
    }

    deleteVendor(index, data){

        API.deleteVendorApi(data)
            .then((status) => {
                console.log(status);

                if (status == 200) {

                    this.props.deleteVendor(index);

                    console.log("Success...")

                }else if (status == 401) {

                    //  this.props.history.push('/');
                }
            });
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
                    


                     </div>
                
                    <div className="tab-pane fade" id="user" role="tabpanel">
                    <AdminPanelUsers/>
                    </div>
                
                    <div className="tab-pane fade" id="booking" role="tabpanel">
                    <div>


                    </div>    
                        <div className="card" > 
                                        <table className="table table-responsive-sm">
                                            <thead>
                                                    <tr>
                                                        <th>Booking Id</th>
                                                        <th>Booking Type</th>
                                                        <th>Price</th>
                                                        <th>User</th>
                                                        <th>Credit Card</th>
                                                        <th>Date</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>

                                                    </tr>
                                                </thead> 
                                                <tbody>
                                                    {this.props.vendors.map((vendor, index)=>(<tr>
                                                        <td>12321</td>
                                                        <td>flight </td>
                                                        <th>$424</th>
                                                        <td>UserID(aditya@parmar.in)</td>
                                                        <td>Creditcard No (543424424424442)</td>
                                                        <td>10/32/2018</td>
                                                    
                                                    
                                                        <td><i className="fa fa-eye fa-2x"/></td>
                                                        <td><i className="fa fa-pencil fa-2x"/></td>
                                                        <td><i className="fa fa-trash fa-2x"/></td>
                                                        </tr>))

                                                    }

                                                </tbody>      


                                        </table>  
                        </div> 
                    </div>
                    
                        <div className="tab-pane fade" id="vendor" role="tabpanel" style={{paddingLeft:"1vw"}}>
                         <div className="row">
                             <div className="col-sm-8">
                                <div className="card" > 
                                    <table className="table table-responsive-sm">
                                        <thead>
                                                <tr>
                                                    <th>Vendor Name</th>
                                                    <th>Type of Service</th>
                                                    <th>Vendor API</th>

                                                </tr>
                                            </thead> 
                                            <tbody>
                                                {this.props.vendors.map((vendor, index)=>(<tr>
                                                    <td>{vendor.vendorname}</td>
                                                    <td>
                                                    {/*<select className="form-control">
                                                        <option value="volvo">Volvo</option>
                                                        <option value="saab">Saab</option>
                                                        <option value="mercedes">Mercedes</option>
                
                                                    </select>*/}
                                                        {vendor.servicetype}
                                                    </td>
                                                    <td>{/*<input type="text" className="form-control"/>*/}
                                                        {vendor.vendorapi}</td>
                                                    {/*<td><i className="fa fa-edit"/></td>*/}
                                                    <td><i className="fa fa-trash"/></td>
                                                    </tr>))

                                                }

                                            </tbody>      


                                    </table>  
                                </div>  
                             </div>
                         
                        <div className="col-sm-4">
                        <div className="card" > 
                                    <table className="table table-responsive-sm">
                                        <thead>
                                                <tr>
                                                    <th>Add Vendor</th>
                                                </tr>
                                            </thead> 
                                            <tbody>
                                               <tr>
                                                    <td>
                                                    Vendor Name:    
                                                    <input type="text" className="form-control"/> 
                                                    Vendor EndPoints:  
                                                    <input type="text" className="form-control"/>
                                                       
                                                     Type: <select className="form-control">
                                                        <option value="flight">Flight</option>
                                                        <option value="hotel">Hotel</option>
                                                        <option value="car">Car</option>
                
                                                    </select>
                                                    <button className="btn btn-default btn-lg btn-block">ADD</button>
                       
                                                    </td>
                                                    
                                               </tr>

                                                

                                            </tbody>      


                                    </table>  
                                </div> 
                        </div>
                        </div>
                    </div>    
                   
                
                </div>
                
            </div>
        )
    }
}


function mapStateToProps(reducerdata) {

    const vendors = reducerdata.vendor;
    console.log(reducerdata.vendor);
    return {vendors};
}

function mapDispatchToProps(dispatch) {
    return {

        getVendors : (data) => dispatch(Actions.getVendors(data)),
        addVendor : (data) => dispatch(Actions.addVendor(data)),
        deleteVendor : (data) => dispatch(Actions.deleteVendor(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPanel));
