import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert'
class AdminPanelVendors extends Component {


    componentWillMount(){
        

    }

    addVendor(){
        console.log(this.refs)
        const data= {
                vendorname: this.refs.ref1.value,
                servicetype:this.refs.ref2.value,
                vendorapi:this.refs.ref3.value,
                email:this.refs.ref6.value/*,
                model:this.refs.ref7.value*/
            }

        console.log(data);

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

    vendorRegister(){


        const vendorregister={
            email:this.refs.ref4.value,
            password:this.refs.ref5.value,
            role:"VENDOR"
        }

        API.doRegister(vendorregister).then((data)=>{

            if(data.status==201){
                console.log("after the registration is complete");
                this.successshowAlert("Vendor registered successfully");

            }
            else if (data.status == 401) {

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

    errorshowAlert = (msg) => {
        this.msg.show(msg, {
            time: 5000,
            type: 'success',
            icon: <img src={require('../image/error.png')} />
        })
    }

    successshowAlert = (msg) => {
        this.msg.show(msg, {
            time: 5000,
            type: 'success',
            icon: <img src={require('../image/success.png')} />
        })
    }

    render(){
        return(
            <div className="row">
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
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

                                                        {vendor.servicetype}
                                                    </td>
                                                    <td>
                                                        {vendor.vendorapi}</td>

                                                    <td><i className="fa fa-trash" onClick={()=>this.deleteVendor(index, vendor)}/></td>
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
                                                    <input type="text" className="form-control"

                                                        ref="ref1" />
                                                    Vendor EndPoint:
                                                    <input type="text" className="form-control"
                                                           ref="ref2" />

                                                        Vendor Email:
                                                        <input type="text" className="form-control"

                                                               ref="ref6" />

                                                       {/* Vendor Schema:
                                                        <input type="text" className="form-control"

                                                               ref="ref7" />
*/}
                                                        Type: <select className="form-control" ref="ref3" >
                                                        <option value="flight">Flight</option>
                                                        <option value="hotel">Hotel</option>
                                                        <option value="car">Car</option>
                
                                                    </select>
                                                    <button className="btn btn-default btn-lg btn-block"
                                                    onClick={()=>this.addVendor()}>Add</button>
                       
                                                    </td>
                                                    
                                               </tr>

                                                

                                            </tbody>      


                                    </table>  
                                </div> 


                <div className="card" >
                    <table className="table table-responsive-sm">
                        <thead>
                        <tr>
                            <th>Vendor Register</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>

                                Vendor Email:
                                <input type="text" className="form-control"

                                       ref="ref4" />
                                Password:
                                <input type="password" className="form-control"
                                       ref="ref5" />


                                <button className="btn btn-default btn-lg btn-block"
                                        onClick={()=>this.vendorRegister()}>Save</button>

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
    
        const vendors = reducerdata.adminTask.vendor;
        console.log(reducerdata);
        return {vendors};
    }
    
    function mapDispatchToProps(dispatch) {
        return {
    

            addVendor : (data) => dispatch(Actions.addVendor(data)),
            deleteVendor : (data) => dispatch(Actions.deleteVendor(data))
        };
    }
    
 export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelVendors);
