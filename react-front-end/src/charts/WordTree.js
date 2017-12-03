import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import * as API from '../api/API'


class WordTree extends React.Component {

    constructor(){
        super();

        this.state = {
            chartType:"WordTree",
            options : {
                wordtree: {
                    format: "implicit",
                    word: "Home"
                }
            },
            width: "100%",
            chartPackages: ["wordtree"],
            data : [
                ["Phrases"],
                ["Home Login Search Booking Payment History Logout"],
                ["Home Login Search Booking Payment History Search Logout"],
                ["Home Login Search Logout"],
                ["Home Login History Logout"],
                ["Home Login Booking Logout"],
                ["Home Login Search Booking Payment Logout"],
                ["Home Login Booking Payment Search Logout"],
                ["Home Login Search History Search"],
                ["Home Login Search History Search Booking Logout"],
                ["Home Login Search History Search History Logout"],
                ["Home Login Booking"],
                ["Home Login Logout"],
                ["Home Search"]
            ],
            chartEvents:[{
                eventName: "onmouseover"
            }]
        }

    }

    renderChart(){
        var payload={name:"PageNavigation",type:"WordTree",index:9,query:"wordTree"};
        this.handleRenderChart(payload);
    }


    createChartResponse(data){

        var resData = [["Phrases"]];

        var i, item;
        for (i=0; i< data.length; i++) {

                var temp =[];
                temp.push(data[i].PageNav);

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
            <Chart chartType = {this.state.chartType} data = {this.state.data} options = {this.state.options} width={this.state.width} chartPackages={this.state.chartPackages} />

        );
    }
}


export default  WordTree;
