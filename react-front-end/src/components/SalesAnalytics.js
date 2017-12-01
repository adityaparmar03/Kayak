import React, { Component } from 'react';
import Top5CarChart from '../charts/Top5CarChart'
import Top5FlightChart from '../charts/Top5FlightChart'
import Top5HotelChart from '../charts/Top5HotelChart'
import Top5Chart from '../charts/Top5Chart';


class UserAnalytics extends Component {

    render() {
        return (
            <div className="container-fluid">
                <h2>Sales Analytics</h2>

                <div className="row container-fluid" >
                    <div className="col-sm-12">
                        <Top5Chart/>
                    </div>
                    <div className="col-sm-12">
                        <Top5CarChart/>
                    </div>
                </div>
                <div className="row container-fluid" >
                    <div className="col-sm-12">
                        <Top5FlightChart/>
                    </div>
                    <div className="col-sm-12">
                        <Top5HotelChart/>
                    </div>
                </div>
            </div>
        )

    }
}

export default UserAnalytics;