import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import * as API from '../api/API'


class BarChart extends React.Component {

    constructor(){
        super();

        this.state = {
            chartType:"BarChart",
            options : {
                title: "Top 5 most booked items",
                hAxis: {title: 'Number of bookings', minValue: 0, maxValue: 15},
                vAxis: {title: 'Items', minValue: 0, maxValue: 15},
                bar: {
                    groupWidth: "50%"
                },
                legend: {
                    position: "none"
                }
            },
           // width: "40%",
            height: "500px",
            data : [
                [Element, "Bookings", {
                    role: "style"
                }],
                ["Home", 8,"red"],
                ["Search", 10,"red"],
                ["Bookings", 10,"red"],
                ["Profile", 19,"red"],
                ["History", 50, "red"]
            ],
            chartEvents:[{
                eventName: "onmouseover"
            }]
        }

    }

    renderChart(){
        var payload={name:"Top5Chart",type:"Top5Chart",index:6,query:"top5Chart"};
        this.handleRenderChart(payload);
    }


    createChartResponse(data){

        var resData = [[Element, "Bookings", {
            role: "style"
        }]];

        var i, item;
        for (i=0; i< data.length; i++) {

            var temp =[];
            temp.push(data[i].TargetName);
            temp.push(data[i].CNT);
            temp.push("green");

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
                    console.log(response.data);
                    var resData = this.createChartResponse(response.data);
                    this.setState({
                        data : resData
                    });

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
            <Chart chartType = {this.state.chartType} data = {this.state.data} options = {this.state.options} width={this.state.width} height={this.state.height} />

        );
    }
}


export default  BarChart;
