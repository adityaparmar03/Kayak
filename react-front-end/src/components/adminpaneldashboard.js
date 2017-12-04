import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import CandlestickChart from '../charts/Histogram'
import BarChart from '../charts/BarChart'
import DonutChart from '../charts/DonutChart'
import PieChart from '../charts/PieChart';
import WordTree from '../charts/WordTree';
import Top5CarChart from '../charts/Top5CarChart'
import Top5FlightChart from '../charts/Top5FlightChart'
import Top5HotelChart from '../charts/Top5HotelChart'
import Top5Chart from '../charts/Top5Chart';



class AdminPanelDashboard extends Component {


    componentWillMount(){
       
    }

    render(){
        return(
            <div>
                
                 
                <ul className="nav nav-tabs nav-justified indigo" role="tablist">
                    <li className="nav-item">
                         <a className="nav-link active" data-toggle="tab" href="#users" role="tab"><i></i> User Analytics</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#sales" role="tab"><i></i> Sales Analytics</a>
                    </li>
                  
                </ul>
                <div className="container-fluid">
                <div className="tab-content">
                
                <div className="tab-pane fade in show active" id="users" role="tabpanel">
                   
                    <div className="row" >
                        <div className="col-sm-6" style={{backgroundColor:"white"}}>
                            <PieChart/>
                        </div>
                        <div className="col-sm-6" style={{backgroundColor:"white"}}>
                            <BarChart/>
                        </div>
                    </div>
                
                    <div className="row" >
                        <div className="col-sm-6" style={{backgroundColor:"white"}}>
                            <DonutChart/>
                        </div>
                        <div className="col-sm-6" style={{backgroundColor:"white"}}>
                        <CandlestickChart/>
                        </div>
                    </div>
                
                    <div className="row" >
                        <div className="col-sm-12" style={{backgroundColor:"white"}}>
                            <WordTree/>
                        </div>
                    </div>

                </div>
                
                <div className="tab-pane fade" id="sales" role="tabpanel">
                            <div className="row" >
                                <div className="col-sm-6" style={{backgroundColor:"white"}}>
                                    <Top5Chart/>
                                </div>
                                <div className="col-sm-6" style={{backgroundColor:"white"}}>
                                    <Top5CarChart/>
                                </div>
                            </div>
                            <br/>
                          
                            <div className="row" >
                                <div className="col-sm-6" style={{backgroundColor:"white"}}>
                                    <Top5FlightChart/>
                                </div>
                                <div className="col-sm-6" style={{backgroundColor:"white"}}>
                                    <Top5HotelChart/>
                                </div>
                            </div> 
                 </div>
                
                    
                   
                
                </div>
                
              
          
                
                        
                       
                       
                       
                        
                       

                    

            </div>
                
            </div>
        )
    }
}

export default AdminPanelDashboard;