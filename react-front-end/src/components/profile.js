import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Nav from './nav'
import {connect} from 'react-redux';
import * as Actions from '../actions/action';
import * as API from '../api/API';
import UserTrip from './usertrips'
import SearchHistroy from './searchhistroy'
import AlertContainer from 'react-alert'

class Profile extends Component {

    constructor(props){
        super(props);
        this.state =
            {
                email:"",
                firstname:"",
                lastname:"",
                address:"",
                zipcode:"",
                phonenumber:"",
                imgpath:"",
                creditcard:"",

            }
    }


    validateZipCode(elementValue){
        var zipCodePattern;
        if (elementValue.indexOf('-') > -1)
        {
            zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
        } else {
            zipCodePattern = /^\d{5}$/;
        }

        //console.log("Zip Validation : ",zipCodePattern.test(elementValue))
        return zipCodePattern.test(elementValue);
    }

//****************************************

    validateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail))
        {
            console.log("true");
            return (true)
        }
        console.log("false");
        return (false)
    }

//****************************************

    telephoneCheck(str) {
        var isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
        return isphone;
    }

    creditcardCheck(str) {
        var cc = /^\d{16}$/.test(str);
        return cc;
    }

    //********************



    componentWillMount(){

         // API.doLogout().then((data)=>{
            //     console.log("adf");
            // })
      

        console.log("willmountcalling");
        API.checkSession().then((data)=>{
            console.log("inside the check session response");
                 console.log(data);
               
            if(data.status===201){
                console.log("user logged in ");
                console.log(data);
              
                this.props.signIn(data);
                this.setState({
                    email:this.props.userprofile.email,
                        firstname:this.props.userprofile.firstname,
                        lastname:this.props.userprofile.lastname,
                        address:this.props.userprofile.address,
                        zipcode:this.props.userprofile.zipcode,
                        phonenumber:this.props.userprofile.phonenumber,
                        imgpath:this.props.userprofile.imgpath,
                        creditcard:this.props.userprofile.creditcard
                })
            }

        })


        //track
        var date = new Date();
        this.clickHandler({userId:"userId",sessionId:"sessionId",eventTime:this.timeConverter(date.getTime()),eventName:"Profile",pageId:"Profile",buttonId:"Profile",objectId:"Profile",pageNav:"Profile"})


    }


    trip(){
        console.log("inside the trips click function");
        API.gethistory().then((data)=>{
            console.log("inside here");
            console.log(data);
            if(data.status==201){
                this.props.bokingHistory(data);
            }

        })
    }

 //Tracking
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
    //*****************************************

    deleteUser(){

    console.log("about to delete the user");

    API.deleteUser({email:this.state.email}).then((data)=>{

        if(data.status==201){
          this.props.userprofile.isLoggedIn = false;
         this.props.history.push('/flight');

        }
    })
    }

 //*****************************************

    updateUserData() {

        //validation for the zip code will come here.


      
        var payload = this.state;
        var flag = 0;


        if (this.state.email != "") {
            if (!this.validateEmail(this.state.email)) {
                flag = flag + 1;
                this.errorshowAlert(" Email not valid ");
            }

        }
        if (this.state.zipcode != "") {
            if (!this.validateZipCode(this.state.zipcode)) {
                flag = flag + 3;
                console.log("inside zip code validation");
                this.errorshowAlert("zipcode not valid");
            }
        }
        if (this.state.phonenumber != "") {
            if (!this.telephoneCheck(this.state.phonenumber)) {
                flag = flag + 5;
                this.errorshowAlert("Phone number not valid");
            }
        }
        if (this.state.creditcard != "") {
            if (!this.creditcardCheck(this.state.creditcard)) {
                flag = flag + 5;
                this.errorshowAlert("Credit Card number not valid");
            }
        }


        if (flag == 0) {
            console.log("About to push the data");
            console.log(this.state.imgpath);
            API.doUpdate(payload).then((data) => {
                if (data.status == 201) {
                    console.log("Succesfull push");

                    this.successshowAlert("User data succesfully updated");

                }
                else {
                    this.errorshowAlert("Error while updating the user info ");
                }
            })
        }
    }


    //*****************************************

    handleFileUpload = (event) => {

        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
         console.log("inside the upload call");
            console.log(event.target.files[0]);
        API.upload(payload).then((data)=>{
            if(data.status==201){
                this.setState({imgpath:data.filename})
            }
        })
    };


    //*****************************************


    errorshowAlert = (msg) => {
        this.msg.show(msg, {
            time: 5000,
            type: 'success',
            icon: <img src={require('../image/error.png')} />
        })
    }

    successshowAlert = (msg) => {
        this.msg.show(msg, {
            time: 5000,
            type: 'success',
            icon: <img src={require('../image/success.png')} />
        })
    }

    render(){
        return(
            <div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
               <div style={{backgroundColor:'black'}}>
               <Nav/>
               </div>

            
              
               <div className="card" style={{marginTop:'10vh',marginBottom:'10vh',marginLeft:'10vw',marginRight:'10vw'}}>

               
                <div className="avatar">
                <img src={'http://localhost:3001/profile/'+this.state.imgpath}
                alt="avatar" className="mx-auto d-block rounded-circle img-responsive" width="200px"/>
                </div>

                <div class="card-body">
                <br/>   
                  
                  
                <ul className="nav nav-tabs nav-justified deep-orange" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#profile" role="tab"><i class="fa fa-user"></i> Personal Details</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#trip" role="tab" onClick={()=>{this.trip();}}><i class="fa fa-heart"></i> Trips</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#searchhistroy" role="tab" onClick={()=>{this.trip();}}><i class="fa fa-heart"></i> Search Histroy</a>
                    </li>
                   
                </ul>

                <div className="tab-content">
                    
                    <div className="tab-pane fade in show active" id="profile" role="tabpanel">
                         
                                <div className="row">
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                            <i className="fa fa-user prefix"></i>
                                            <input type="text" id="firstname" placeholder="Firstname" value={this.state.firstname} className="form-control"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           firstname: event.target.value
                                                       });
                                                   }}/>

                                        </div>

                                        </div>
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                            <i className="fa fa-user prefix"></i>
                                            <input type="text" id="lastname" placeholder="Lastname" value={this.state.lastname} className="form-control"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           lastname: event.target.value
                                                       });
                                                   }}/>

                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-envelope prefix"></i>
                                        <input type="text"  value={this.state.email} placeholder="Email" disabled id="email" className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       email: event.target.value
                                                   });
                                               }}/>


                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-eye prefix"></i>
                                       
                                        <input type="text" id="password" value="********" disabled className="form-control"/>

                                        
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-phone prefix"></i>
                                       
                                        <input type="text" id="phone" placeholder="PhoneNumber" value={this.state.phonenumber}
                                               className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       phonenumber: event.target.value
                                                   });
                                               }}
                                        />

                                      
                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-map-marker prefix"></i>
                                       
                                        <input type="text" id="address" placeholder="Address" value={this.state.address} className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       address: event.target.value
                                                   });
                                               }}/>

                                      
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-location-arrow prefix"></i>
                                       
                                        <input type="text" id="zipcode" value={this.state.zipcode} placeholder="zipcode" className="form-control"
                                               onChange={(event) => {
                                                   this.setState({
                                                       zipcode: event.target.value
                                                   });
                                               }}/>

                                      
                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form form-group">
                                        <i className="fa fa-credit-card-alt prefix"></i>
                                        <input type="text" id="creditcardno" className="form-control validate" placeholder="CreditCard" maxLength='16' value={this.state.creditcard}
                                               onChange={(event) => {
                                                   this.setState({
                                                       creditcard: event.target.value
                                                   });
                                               }}
                                        />

                                        </div>

                                        </div>
                                </div>
                           
                                
                                <div className="md-form">
                                    <i className="fa fa-file prefix"></i>
                                    <input type="file" id="uploadpic"  name="mypic"
                                           onChange={this.handleFileUpload}/>
                                </div>

                                <button type="button" className="btn btn-light-blue btn-lg btn-block" onClick={()=>this.updateUserData()}>Save</button>
                                <br/>
                        <button type="button" className="btn btn-red btn-lg btn-block" onClick={()=>this.deleteUser()}>Delete Account</button>

                                
                    </div>
                
                    <div className="tab-pane fade" id="trip" role="tabpanel">


                        <UserTrip/>

                    </div>
                    <div className="tab-pane fade" id="searchhistroy" role="tabpanel">


                    <SearchHistroy/>

                    </div>
   
  
    </div>
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
        signIn : (data) => dispatch(Actions.signIn(data)),
        bokingHistory : (data) => dispatch(Actions.bookingHistory(data))

    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));