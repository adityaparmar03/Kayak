import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import * as API from '../api/API'


class DonutChart extends React.Component {

    constructor(){
        super();

        this.state = {
            chartType:"PieChart",
            options : {
                "title": "Percentage of time spent by a user on a particular page",
                "pieHole": 0.4
            },
           // width: "40%",
            height: "500px",
            data : [
                ["Page Name", "% of users visits"],
                ["Home", 10],
                ["Search", 15],
                ["Booking", 20],
                ["Profile", 30],
                ["History", 26]
            ]
        }

    }


    renderChart(){
        var payload={name:"TimeSpentOnAPage",type:"DonutChart",index:2,query:"donutChartQuery"};
        this.handleRenderChart(payload);
    }

    createChartResponse(data){

        var resData = [[Element, "Clicks", {
            role: "style"
        }]];

        var i, item;
        for (i=0; i< data.length; i++) {

            var temp =[];
            temp.push(data[i].PageName);
            temp.push(data[i].NoClicks);
            temp.push("red");

            console.log("TempData : ",temp);
            resData.push(temp);
        }
        console.log("ResData : ",resData);
        return resData;
    }

    handleRenderChart = (payload) => {
        API.getChart(payload)
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data);
                    //var resData = this.createChartResponse(response.data);
                    //this.setState({
                    //    data : resData
                    //});
                } else if (response.status === 400) {
                    console.log("Error fetching the date for chart...!!!");
                }
            });
    };

    componentDidMount() {
        this.renderChart();
    }

    render() {
        return (
            <Chart chartType = {this.state.chartType} data = {this.state.data} options = {this.state.options} graph_id = {this.state.chartType}  width={this.state.width} height={this.state.height}  />

        );
    }
}


export default  DonutChart;
