import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
//import injectTapEventPlugin from 'react-tap-event-plugin';

import FlatButton from 'material-ui/FlatButton';


import '../css/home.css'
//Compnents
import Nav from './nav'
import Flightsearch from './flightsearch'
import Hotelsearch from './hotelsearch'
import Carsearch from './carsearch'
class Carhome extends Component {

  
    
     
    componentWillMount(){
        //injectTapEventPlugin()
    }
   
    handleSearch(){
    
    }
     
    render(){
        return(
            <div  style={{ backgroundImage: 'url(' + require('../image/carbg.jpg') + ')', height: '600px'}}>
            
       <Nav/>

       

                <p style={{color:'white',
                fontWeight:'700',fontSize:'25',
                marginTop:'5%',marginLeft:"30%",
                marginRight:"30%"}}>Search hundreds of travel sites at once.</p>

                <div style={{marginLeft:'25%',marginRight:'25%',marginTop:"5%"}}>        
                <ul className="nav nav-tabs nav-justified" role="tablist">
   
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#flight" role="tab"><i className="fa fa-plane"></i> <b> FLIGHTS</b></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#hotel" role="tab"><i className="fa fa-hotel"></i><b>  HOTELS</b></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#car" role="tab"><i className="fa fa-car"></i><b> CARS</b></a>
                    </li>
                </ul>
                </div>
                <div className="tab-content">

                    <div className="tab-pane fade" id="flight" role="tabpanel" 
                    style={{paddingTop:"8%",marginTop:'-9%'}}>
                    <Flightsearch/>
                    </div>

                    <div className="tab-pane fade" id="hotel" role="tabpanel"  
                    style={{paddingTop:"8%",marginTop:'-9%'}}>
                    <Hotelsearch/>    
                    </div>
                
                    <div className="tab-pane fade in show active" id="car" role="tabpanel"  
                    style={{paddingTop:"8%",marginTop:'-9%'}}>
                    <Carsearch/>    
                    </div>

                    
                
                </div>






            </div>

        )
    }
}

export default Carhome;