
/*
AUTHOR : Kaushik parmar
 */

/*import node modules START */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var Session = require('express-session');
var cookieParser = require('cookie-parser'); 

/*import node modules END */

// the session is stored in a cookie, so we use this to parse it
app.use(cookieParser());

var Session= Session({
	secret:'secrettokenhere',
	saveUninitialized: true,
	resave: true
});

app.use(Session);

var sessionInfo;

/* requiring config db.js file starts*/
var db = require('./app_engine/db.js');
var connection_object= new db();
var connection=connection_object.connection; // getting conncetion object here 

app.use(express.static(__dirname + '/public'));

/* 
	1. Requiring auth-routes.js file, which takes care of all Login & Registration page operation.
	2. Passing object of express, Database connection, expressSession and cookieParser.
	3. auth-routes.js contains the methods and routes for Login and registration page. 
*/
require('./app_engine/routes.js')(app,connection,Session,cookieParser,sessionInfo);

/*
	Running our application  
*/
http.listen(81,function(){
    console.log("Listening on http://127.0.0.1:81");
});

