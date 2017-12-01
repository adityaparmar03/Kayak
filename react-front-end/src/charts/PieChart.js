import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import * as API from '../api/API'

class PieChart extends React.Component {

    constructor(){
        super();

        this.state = {
            chartType:"PieChart",
            options : {
                title: "Percentage of user's visiting a particular page",
                is3D: true
            },
            //width: "40%",
            height: "500px",
            data : [
                ["Page Name", "% of users visits"],
                ["Home", 11],
                ["Search", 2],
                ["Booking", 2],
                ["Profile", 2],
                ["History", 7]
            ]
        }

    }


    renderChart(){
        var payload={name:"%UsersVisitingAPage",type:"PieChart",index:4,query:"pieChartQuery"};
        this.handleRenderChart(payload);
    }

    createChartResponse(data){

        var resData = [["Page Name", "% of users visits"]];

        var i, item;
        for (i=0; i< data.length; i++) {

            var temp =[];
            temp.push(data[i].PageName);
            temp.push(data[i].NoClicks);

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
            <Chart chartType = {this.state.chartType} data = {this.state.data} options = {this.state.options} width={this.state.width} height={this.state.height}  />

        );
    }
}


export default  PieChart;
