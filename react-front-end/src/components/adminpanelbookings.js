import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class AdminPanelBookings extends Component {

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
               <div>

                Filters are remaing....
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
                                                    {this.state.test.map((vendor, index)=>(<tr>
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
        )
    }
}

export default AdminPanelBookings;