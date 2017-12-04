
var mysql = require('../models/mysql');


function fetchUrl(msg, callback){

    var res={};
    var getURL="select vendorapi from vendors where servicetype='"+msg+"'";

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){

                res.code = "200";

                res.value = results;
                console.log("++++++++++++++++++++++++++++++++");
                console.log(results)
                console.log("++++++++++++++++++++++++++++++++");
                callback(null, res);
            }
            else {
                res.code = "401";

                callback(null, res);
            }
        }
    },getURL);
}



function addVendor(msg, callback){

    var res={};

    var vendorname = msg.vendorname;
    var servicetype = msg.servicetype;
    var vendorapi = msg.vendorapi;
    var email = msg.email;
    var model= msg.vendorapi.split("=")[1];

    var addApiSql="insert into vendors(`vendorname`,`servicetype`,`vendorapi`, `email`, `model`) values('"+
        vendorname+"','"+servicetype+"','"+ vendorapi+ "','"+ email+ "','"+ model+ "');";

    mysql.executeQuery(function(err){
        if(err){
            console.log(err);
            res.code = "401";
            res.value=" Error adding API";
            callback(null, res);
        }
        else{
            res.code = "200";
            res.value = "API added successfully!";
            callback(null, res);
        }
    },addApiSql);
}


function deleteVendor(msg, callback){

    var res={};

    var vendorId=msg.vendorId;

    var deleteApiSql="delete from vendors where vendorId = "+vendorId+";";

    mysql.executeQuery(function(err){
        if(err){
            console.log(err);
            res.code = "401";
            res.value=" Error deleting API";
            callback(null, res);
        }
        else{
            res.code = "200";
            res.value = "API deleted successfully!";
            callback(null, res);
        }
    },deleteApiSql);
}


function getVendors(msg, callback){

    var res={};

    var getVendorsSql="select * from vendors";

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){

                res.code = "200";
                res.value = results;
                callback(null, res);
            }
            else {
                res.code = "401";
                callback(null, res);
            }
        }
    },getVendorsSql);
}



//function updateBilling(msg,callback) {
  //  var res={};

    //var updateQuery = "update billing set * * where user_email='"+msg.email+"';";
    // mysql.executeQuery(function (err) {
    //     if(err){
    //         console.log("error while updating the user details");
    //         res.code = "401";
    //         res.value = "error while updating the billing info";
    //
    //     }
    //     else{
    //         res.code = "200";
    //         res.value = "Billing info updated";
    //
    //     }callback(null,res);
    //
    // },updateQuery);

//}

function getBills(msg,callback) {
    var res={};

    var getBillsQuery = "select * from BILLING";

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(!err){

                res.code = "200";
                res.value = results;
                callback(null, res);
            }
            else {
                res.code = "401";
                callback(null, res);
            }
        }
    },getBillsQuery);

}


function getusers(msg,callback) {
    var res = {};
    var getQuery = "select first_name,last_name,email,phone,street_address,zip_code from user where user_role ='USER' ; ";
    mysql.fetchData(function (err,results) {
        if(err){
            res.code = 401;
            res.value = "Error while fetching the data ";
            console.log("inside the error "+ err);
        }
        else{
            res.code = "200" ;
            res.value = "User data fetched";
            res.data=results;
        } callback(null,res);

    },getQuery)

}


//exports.updateBilling = updateBilling;
exports.getusers = getusers;
exports.getBills = getBills;
exports.addVendor = addVendor;
exports.getVendors = getVendors;
exports.deleteVendor = deleteVendor;
exports.fetchUrl = fetchUrl;