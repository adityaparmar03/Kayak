import React, { Component } from 'react';
import logo from './logo.svg';
import * as API from './api/api'
import './App.css';

class App extends Component {



    /*handleClick(e) {
       /// if (this.getDOMNode().contains(e.target)) {
            console.log("Mouse Clicked","*");
        //    return;
        //}
    }

    handleScroll(e) {
        /// if (this.getDOMNode().contains(e.target)) {
        console.log("Page Scrolled","#");
        //    return;
        //}
    }*/

    clickHandler(clickInfo){
        console.log("Button Clicked","$");
        this.handleClick(clickInfo);

    }

    handleClick = (clickInfo) => {
        console.log('handleSubmit');
        API.clickTracker(clickInfo)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.result);
                } else if (response.status === 400) {
                    console.log(response.result);
                }
            });
    };



    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        //YYYY-MM-DD HH:MM:SS
        //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }
    /*componentWillMount () {
        document.addEventListener('click', this.handleClick, false);
        //document.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.handleClick, false);
        //document.addEventListener('scroll', this.handleScroll, false);
    }*/
  render() {
      var date = new Date();
    return (


      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>


          <button className=" form-control btn btn-info" type="button"
                  name="share"
                  id="Button1"
                  value="share"
                  onClick={() => {this.clickHandler({userId:"userId",sessionId:"sessionId",eventTime:this.timeConverter(date.getTime()),eventName:"eventName",pageId:"pageId",buttonId:"buttonId",objectId:"objectId"})}}>
              Track My Clicks
          </button>
      </div>
    );
  }
}

export default App;
