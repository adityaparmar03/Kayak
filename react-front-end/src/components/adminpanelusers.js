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
                                                  
                                                  
                                                    <td><i className="fa fa-eye fa-2x"/></td>
                                                    <td><i className="fa fa-pencil fa-2x"/></td>
                                                    <td><i className="fa fa-trash fa-2x"/></td>
                                                    </tr>))

                                                }

                                            </tbody>      


                                    </table>  
                     </div> 
        )
    }
}

export default AdminPanelUsers;