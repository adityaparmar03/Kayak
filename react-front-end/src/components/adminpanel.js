import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav'
import AdminPanelDashboard from './adminpaneldashboard'
import AdminPanelUsers from './adminpanelusers'
import AdminPanelBookings from './adminpanelbookings'
import AdminPanelVendors from './adminpanelvendors'
import * as Actions from '../actions/action';
import * as API from '../api/API';
import {connect} from 'react-redux';


//var ReactGridLayout = require('react-grid-layout');
class AdminPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            // Data
           
             test:[1,2,3]
        }
     }


    componentWillMount(){


        // API.doLogout().then((data)=>{
        //        console.log("adf");
        //    })
        //
        API.checkSession().then((data)=>{
            console.log("inside the check session response");
            if(data.status===201){
                console.log("user logged in ");
                console.log(data.data.value);
                //this.successshowAlert(data.data.value);
                this.props.signIn(data);
              if(!this.props.userprofile.isadmin){
                  this.props.history.push('/')
              }
            }
            else{
                this.props.history.push('/')
            }

        })


    }



     userdetails(){

        console.log("user info");

        API.getAllUsers().then((data)=>{
            if(data.status==201){
                console.log("------------------");
                console.log(data);
                console.log("------------------");
                this.props.allUsers(data)
            }
            else{
                console.log("error");
            }
        })
     }

     vendorDetails(){
         API.getVendors()
             .then((res) => {
                 console.log(res);

                 if (res.status == 200) {

                     this.props.getVendors(res.vendors);

                     console.log("Success...")

                 }else if (res.status == 401) {

                     //  this.props.history.push('/');
                 }
             });
     }

     billingDetails(){
         API.getBills()
             .then((res) => {
                 console.log(res);

                 if (res.status == 200) {

                     this.props.getBills(res.bills);

                     console.log("Success...")

                 }else if (res.status == 401) {

                     //  this.props.history.push('/');
                 }
             });

     }

   
    render(){
        console.log(this.props.vendors)
        return(
            <div>
                <div style={{backgroundColor:'black'}}>
                <Nav/>
                </div>
                <ul className="nav nav-tabs nav-justified indigo" role="tablist">
                    <li className="nav-item">
                         <a className="nav-link active" data-toggle="tab" href="#dashboard" role="tab"><i className="fa fa-line-chart"></i> Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#user" role="tab" onClick={()=>{this.userdetails()}}><i className="fa fa-user"></i> User</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#booking" role="tab" onClick={()=>{this.billingDetails()}}><i className="fa fa-table"></i> Booking</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#vendor" role="tab" onClick={()=>{this.vendorDetails()}}><i className="fa fa-users"></i> Vendor</a>
                    </li>
                </ul>

                <div className="tab-content">
                
                    <div className="tab-pane fade in show active" id="dashboard" role="tabpanel">
                   
                         <AdminPanelDashboard/>

                     </div>
                
                    <div className="tab-pane fade" id="user" role="tabpanel">
                    <AdminPanelUsers/>
                    </div>
                
                    <div className="tab-pane fade" id="booking" role="tabpanel">
                    <AdminPanelBookings/>
                     
                    </div>
                    
                    <div className="tab-pane fade" id="vendor" role="tabpanel" style={{paddingLeft:"1vw"}}>
                      <AdminPanelVendors/>
                    </div>    
                   
                
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(reducerdata) {
    // console.log(reducerdata);
    const userprofile = reducerdata.userProfile;

    console.log(userprofile);

    return {userprofile};
}




function mapDispatchToProps(dispatch) {
    return {

        getBills : (data) => dispatch(Actions.getBills(data)),
        getVendors : (data) => dispatch(Actions.getVendors(data)),
        allUsers : (data) => dispatch(Actions.allUsers(data)),
        signIn : (data) => dispatch(Actions.signIn(data))
    };
}

export default  connect(mapStateToProps,mapDispatchToProps)(AdminPanel)


