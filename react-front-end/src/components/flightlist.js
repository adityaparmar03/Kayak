import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav'
class Flightlist extends Component {
    constructor(props){
        super(props);
        this.state = {
             test:[1,2,3,4,5]
        }
     }

    componentWillMount(){
       
    }
    displaystopline(stop){
        if(stop=="nonstop"){
            return <span>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</span> 
        }
        else if(stop=="onestop"){
            return <span>&mdash;&mdash;&#9632;&mdash;&mdash;&mdash;</span> 
        }
        else{
            return <span>&mdash;&mdash;&#9632;&mdash;&mdash;&#9632;&mdash;&mdash;</span> 
        }
    }
    displayflights(){
        
            return(
                <div className="jumbotron">

                    <div className="row">
                        <div className="col-sm-9">
                            <div className="row" style={{paddingTop:"4vh"}}>
                                    <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px",fontWeight:"bold"}}>
                                        11/24
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px",fontWeight:""}}>
                                    <div  style={{textAlign:"center"}}>
                                                <img src={require('../image/hotelbg.jpg')} height="25vh" width="25vw" alt="logo"/>
                                                <p>United</p>
                                       </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px"}}>
                                       <div  style={{textAlign:"center"}}>
                                                <p style={{fontWeight:"bold"}}>3:59 pm</p>
                                                <p>SFO</p>
                                       </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center"}}>
                                    <div  style={{textAlign:"center"}}>
                                         {this.displaystopline("nonstop")}
                                         <p style={{fontSize:"12px"}}>non stop</p>
                                    </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center",fontSize:"12px"}}>
                                    <div  style={{textAlign:"center"}}>
                                             <p style={{fontWeight:"bold"}}>3:59 pm</p>
                                             <p>SFO</p>
                                    </div>
                                    </div>
                                    <div className="col-sm-2" style={{textAlign:"center"}}>
                                        <p style={{fontSize:"12px",fontWeight:"bold"}}>LXI09</p>
                                    </div>
                                    
                            </div>
                         </div>
                        <div className="col-sm-3">
                                <div style={{textAlign:"center"}}>
                                <b style={{fontSize:"20px",fontWeight:"bold"}}>$251</b><br/>
                                <b style={{fontSize:"12px",fontWeight:"bold"}}>Class</b><br/>
                                <button className="btn btn-deep-orange">Book</button>
                                </div>

                        </div>
                    </div>
    
                 </div> 
            )
     }
    render(){
        return(
            <div>
                <div style={{backgroundColor:'black'}}>
                <Nav/>
                </div>
                <div className="jumbotron">
                   
                </div>    
                <div className="row">
                    <div className="col-4">
                        <div className="jumbotron">
                    
                        </div>  
                    </div>
                    <div className="col-8">
                         { this.state.test.map((this.displayflights),this)}     
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(Flightlist);