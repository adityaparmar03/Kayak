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
               <div className="container-fluid">
                <h2>User Analytics</h2>
                <div className="row" >
                    <div className="col-sm-6">
                         <PieChart/>
                    </div>
                    <div className="col-sm-6">
                         <BarChart/>
                    </div>
                </div>
                <br/>
                <div className="row" >
                    <div className="col-sm-6">
                        <DonutChart/>
                    </div>
                    <div className="col-sm-6">
                     <CandlestickChart/>
                    </div>
                </div>
                <br/>
                <div className="row" >
                    <div className="col-sm-12">
                        <WordTree/>
                    </div>
                </div>
                        
                       
                       
                       
                        
                        <h2>Sales Analytics</h2>

                <div className="row" >
                    <div className="col-sm-6">
                        <Top5Chart/>
                    </div>
                    <div className="col-sm-6">
                        <Top5CarChart/>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row" >
                    <div className="col-sm-6">
                        <Top5FlightChart/>
                    </div>
                    <div className="col-sm-6">
                        <Top5HotelChart/>
                    </div>
                </div>        

            </div>
                
            </div>
        )
    }
}

export default AdminPanelDashboard;