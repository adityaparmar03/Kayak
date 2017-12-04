var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('./kafka/client');
var mail = require('./mail');
var multer = require('multer');
var fname = "";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const username ="./public/profile/";

        cb(null,username);
    },
    filename: function (req, file, cb) {

        fname = req.session.email+file.originalname;

        cb(null,fname);
    }
});

var upload = multer({storage:storage});


//************************************************************************************************************************

router.post('/login', function (req, res) {

    // var reqEmail = req.body.email;
    //  var reqPassword = req.body.password;


    console.log("inside the login path with the body"+req.body);
    var email = req.body.email;
    console.log("------------");
    console.log(email);
    passport.authenticate('login', function(err, user) {

        if (err) {
            throw err;
        }

        if(!user ){
            res.send({status: 401,"value":"Failed Login"});
        }
        else {
            if(user.code==201) {
                req.session.email = email;
                req.session.isloggedin = true;
                console.log(user.data);
                res.send({status: 201, "value": user.data, "user_role":user.user_role});
            }
            else{

            res.send({status:401,"value":user.data});

            }
            }
    })(req,res);

});

//************************************************************************************************************************

router.get('/checkSession', function (req, res) {

    // var reqEmail = req.body.email;
    //  var reqPassword = req.body.password;
    // console.log(req.session);
    if(req.session.isloggedin){

        var email = {"email":req.session.email}
        console.log(email);
        kafka.make_request('getuserdata',email,function (err,results) {
            if(err){
                res.send({"status":401,"data":"error while fetching the data for logged in user"})
            }
            else {
                if(results.code==200){
                    console.log("-------------");
                    console.log(results);
                    console.log("-------------");
                    res.send({"status":201,"data":results});
                }
                else{
                    res.send({"status":401,"data":results});
                }
            }

        })

    }
    else {
        res.send({"status": 401});
    }
});

//************************************************************************************************************************


router.get('/bookinghistory', function (req, res) {

    // var reqEmail = req.body.email;
    //  var reqPassword = req.body.password;
    console.log("inside history path");
    var email = {"email": req.session.email};
    kafka.make_request('bookings' ,email, function (err, results) {
        if(err){
            console.log("Error occcured");
            res.send({"status":401 , "data": results})
        }
        else{
            console.log("i am here");
            if(results.code==200){
                console.log("Everything successfull");
                res.send({"status":201 , "data": results})

            } else {
                res.send({"status":401 , "data": results})

            }
        }

    })
});

//************************************************************************************************************************

router.post('/register',function (req,res) {

    console.log("_______________");
    console.log(req.body);
    console.log("_______________");

    kafka.make_request('register', req.body ,function(err,results){

        if(err){
            console.log("After kafka response");

            res.send({"status":401})
        }
        else
        {
            if(results.code === "200"){
                mail.sendMail(req,res,results);

            }
            else {

                res.send({"status":401,"value":results.value})
            }
        }
    })
})


//************************************************************************************************************************

router.put('/update',function (req,res) {

    console.log("inside the update path");
    console.log("*********************");
    console.log(req.body);
    console.log("*********************");
    var payload = req.body;
    payload['user_email']=req.session.email;
    console.log(payload.user_email);
    kafka.make_request('update', payload ,function(err,results){

        if(err){
            console.log("After kafka response");
            done(err,{});
            res.send({"status":401})
        }
        else
        {
            if(results.code == 200){
                req.session.email = req.body.email;
                res.send({"status":201})

            }
            else {
                done(null,false);
                res.send({"status":401})
            }
        }
    })


})


//************************************************************************************************************************

router.post('/upload', upload.single('mypic'),function (req, res) {
    console.log("inside the upload folder");
        res.send({"status":201 , "data": "User file updated" ,"filename":fname});
    //
    // else{
    //     res.send({"status":401,"data":"Error while uploading"})
    // }

})
//************************************************************************************************************************


//************************************************************************************************************************

router.delete('/delete',function (req,res) {

    console.log("inside the delete path");


    // console.log(req.query);
    // var email = { 'email':req.session.email };

    kafka.make_request('deleteuser', req.body.email ,function(err,results){

        if(err){
            console.log("After kafka response");
            res.send({"status":401})
        }
        else
        {
            console.log(results);
            if(results.code === "200"){
                req.session.destroy();
                //req.logout();
                res.send({"status":201 ,"data":results.value})
            }
            else {
                res.send({"status":401,"data":res.value});
            }
        }
    })


})

//************************************************************************************************************************

//Logout the user - invalidate the session
router.post('/logout', function (req, res) {

    req.session.destroy();
    console.log('Session destroyed');
    res.status(201).send({status:201,"value":"logout succesfull"});

});

//************************************************************************************************************************



router.post('/addhistory', function (req, res) {

    var reqObject = {
        email : req.session.email,
        payload : req.body
    }
    kafka.make_request("addhistory", reqObject, function(err,results){

        if(err){
            console.log('Returning Error ----' + err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code});
            }
            else {
                res.send({'status': results.code});
            }
        }
    })
});



router.get('/searchhistory', function (req, res) {

    var email =  req.session.email;
    kafka.make_request('searchhistory' ,email, function (err, results) {
        if(err){

            res.send({"status":401 })
        }
        else{

            if(results.code==200){

                res.send({"status":201 , "data": results})

            } else {
                res.send({"status":401 , "data": results})

            }
        }

    })
});

module.exports = router;
