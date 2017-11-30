import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav'
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
                    <div className="tab-pane fade" id="vendor" role="tabpanel" style={{paddingLeft:"10vw",paddingRight:"10vw"}}>
                       <div className="card" > 
                       <table className="table table-responsive-sm">
                           <thead>
                                <tr>
                                    <th>Vendor Name</th>
                                    <th>Type of Service</th>
                                    <th>Vendor API</th>
                                    <th>Delete</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {this.state.test.map(()=>(<tr>
                                    <td>Vendor Name</td>
                                    <td>
                                    <select className="form-control">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
  
                                    </select>
                                    </td>
                                    <td><input type="text" className="form-control"/></td>
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

export default AdminPanel;