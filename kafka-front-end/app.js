var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
//var passport_google = require('./routes/passport/passport'); //this is the passport for google login
var admin = require('./routes/admin');
var index = require('./routes/index');
var hotel = require('./routes/hotel');
var user = require('./routes/user');
var car = require('./routes/car');
var flight = require('./routes/flight');
var analytics = require('./routes/analytics');

var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var passport = require('passport');
require('./routes/passport')(passport);


var app = express();

app.use(expressSessions({
    cookieName: 'session',
    secret: 'cmpe273_kayak',
    duration: 3 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,
    resave : true,
    saveUninitialized : false,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));

app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/car', car);
app.use('/hotel', hotel);
app.use('/flight', flight);
app.use('/admin',admin);
app.use('/analytics',analytics);

// app.get('/auth/google', passport_google.authenticate('google', { scope : ['profile', 'email'] }));
// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect : '/user/', //technically the daashboard page that is the status 201
//         failureRedirect : '/'      // status 401 redirect to register page. status 401
//     }));






// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;
