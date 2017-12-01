import React, { Component } from 'react';
import CandlestickChart from '../charts/Histogram'
import BarChart from '../charts/BarChart'
import DonutChart from '../charts/DonutChart'
import PieChart from '../charts/PieChart';
import WordTree from '../charts/WordTree';


class UserAnalytics extends Component {

    render() {
        return (
            <div className="container-fluid">
                <h2>User Analytics</h2>

                        <PieChart/>
                        <BarChart/>
                        <DonutChart/>
                        <CandlestickChart/>
                        <WordTree/>

            </div>
        )

    }
}

export default UserAnalytics;