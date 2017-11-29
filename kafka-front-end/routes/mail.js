

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kayak.cmpe273@gmail.com',
        pass: 'kayak_cmpe273'
    }
});



function sendMail(req,res) {
   console.log("inside send mail part");

    var mailOptions = {
        from: 'kayak.cmpe273@gmail.com',
        to: req.body.email,
        subject: 'You have registered for Kayak',
        html: '<h1>Welcome :</h1><p>you have registered to the kayak application : CMPE273 rocks!</p>' +
        '<button type="button" >Click to activate your account!</button>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

        }
    });
    res.send({"status": 201, "email": req.body.email});
}


exports.sendMail = sendMail;