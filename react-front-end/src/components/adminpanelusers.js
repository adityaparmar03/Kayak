import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class AdminPanelUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Data
           
             test:[1,2,3]
        }
     }

    componentWillMount(){
       
    }

    render(){
        return(
            <div>
            <div className="card" > 
                                    <table className="table table-responsive-sm">
                                        <thead>
                                                <tr>
                                                    <th>User Id</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th>Address</th>
                                                    <th>Pincode</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>

                                                </tr>
                                            </thead> 
                                            <tbody>
                                                {this.state.test.map((vendor, index)=>(<tr>
                                                    <td>1</td>
                                                    <td>Aditya Parmar</td>
                                                    <th>parmar@adi.tya</th>
                                                    <td>24342423424</td>
                                                    <td>754 The Alameda 2207, San Jose, California, USA</td>
                                                    <td>95126</td>
                                                  
                                                  
                                                    <td><i className="fa fa-eye fa-2x" data-toggle="modal" data-target="#usermodel" /></td>
                                                    <td><i className="fa fa-pencil fa-2x" data-toggle="modal" data-target="#usermodel"/></td>
                                                    <td><i className="fa fa-trash fa-2x"/></td>
                                                    </tr>))

                                                }

                                            </tbody>      


                                    </table>  
                     </div> 

                     <div className="modal  fade" id="usermodel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">User Details</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body" style={{padding:"2%"}}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                            <i className="fa fa-user prefix"></i>
                                            <input type="text" id="firstname"  className="form-control"/>
                                            <label htmlFor="firstname">Firstname</label>
                                        </div>

                                        </div>
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                            <i className="fa fa-user prefix"></i>
                                            <input type="text" id="lastname" className="form-control"/>
                                            <label htmlFor="lastname">Lastname</label>
                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-envelope prefix"></i>
                                        <input type="text"  id="email" className="form-control"/>
                                        <label htmlFor="email">Email</label>
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-eye prefix"></i>
                                       
                                        <input type="text" id="password" value="********" className="form-control"/>
                                        <label htmlFor="password">Password</label>
                                        
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-phone prefix"></i>
                                       
                                        <input type="text" id="phone"  className="form-control"/>
                                        <label htmlFor="phone">Phone Number</label>
                                      
                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-8">
                                        <div className="md-form">
                                        <i className="fa fa-map-marker prefix"></i>
                                       
                                        <input type="text" id="address"  className="form-control"/>
                                        <label htmlFor="address">Address</label>
                                      
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-location-arrow prefix"></i>
                                       
                                        <input type="text" id="zipcode"  className="form-control"/>
                                        <label htmlFor="form2">Zip Code</label>
                                      
                                        </div>

                                        </div>
                                </div>
                                {/*<div className="row">
                                        <div className="col-sm-4">
                                        <div className="md-form form-group">
                                        <i className="fa fa-credit-card-alt prefix"></i>
                                        <input type="text" id="creditcardno" className="form-control validate" maxLength='16'/>
                                        <label htmlFor="creditcardno">Credit Card No</label>
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <label>Expiry Date :  </label>
                                        <div className="md-form form-group">
                                         
                                            <input type="month" id="form92" className="form-control validate"/>
                                           
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form form-group">
                                        <input type="text" id="cvv" className="form-control validate" maxLength='3'/>
                                        <label htmlFor="cvv">CVV</label>
                                        </div>

                                        </div>
                                </div>*/}
                                 </div>
                                    <div className="modal-footer">
                                    <button type="button" 
                                    className="btn btn-default waves-effect" 
                                    data-dismiss="modal">Save Changes</button>
                                    <button type="button" 
                                    className="btn btn-outline-info waves-effect ml-auto" 
                                    data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                    </div>
       


                     </div>
        )
    }
}

export default AdminPanelUsers;