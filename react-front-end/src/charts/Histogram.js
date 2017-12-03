import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import * as API from '../api/API'


class Histogram extends React.Component {

    constructor(){
        super();

        this.state = {
            chartType:"BarChart",
            options : {
                title: "Top 5 most active users",
                hAxis: {title: 'Number of Clicks', minValue: 0, maxValue: 15},
                vAxis: {title: 'Users', minValue: 0, maxValue: 15},
                bar: {
                    groupWidth: "50%"
                },
                legend: {
                    position: "none"
                }
            },
            //width: "40%",
            height: "500px",
            data : [
                [Element, "Clicks", {
                    role: "style"
                }],
                ["User1", 8, "black"],
                ["User2", 10, "blue"],
                ["User3", 10, "black"],
                ["User4", 19, "blue"],
                ["User5", 50, "black"]
            ],
            chartEvents:[{
                eventName: "onmouseover"
            }]
        }

    }

    renderChart(){
        var payload={name:"Top5MostActiveUsers",type:"Histogram",index:3,query:"histogramQuery"};
        this.handleRenderChart(payload);
    }

    createChartResponse(data){

        var resData = [[Element, "Clicks", {
            role: "style"
        }]];

        var i, item;
        for (i=0; i< data.length; i++) {

            var temp =[];
            temp.push(data[i].UserID);
            temp.push(data[i].NoClicks);
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


export default  Histogram;
