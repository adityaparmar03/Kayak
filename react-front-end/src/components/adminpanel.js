import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav'

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

                }else if (res.status == 401) {

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

                }else if (res.status == 401) {

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
                    
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                    </div>
                
                    <div className="tab-pane fade" id="booking" role="tabpanel">
                    
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                    </div>
                    <div className="tab-pane fade" id="vendor" role="tabpanel" style={{paddingLeft:"10vw",paddingRight:"10vw"}}>
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
