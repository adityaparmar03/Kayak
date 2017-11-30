import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';

class AdminPanelVendors extends Component {


    componentWillMount(){
        
                API.getVendors()
                    .then((res) => {
                        console.log(res);
        
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
        return(
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
    
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPanelVendors));
