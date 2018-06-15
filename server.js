var express = require('express');
var app = express();
var path=require('path')
var router = express.Router();
const {ObjectId}=require('mongodb');

var userAuth=require("./user_controller/userVerify.js")
var adminAuth=require("./user_controller/adminVerify.js")
var userLogFs=require("./static/db_controller/dbUserLog.js")
var ticketLogFs=require("./static/db_controller/dbTicketLog.js")
var createUserFs=require("./static/db_controller/dbCreateUser.js")
var createTicketFs=require("./static/db_controller/dbCreateTicket.js")
//var updateProfileFs=require("./static/db_controller/dbUpdateProfile.js")
var publicPath=path.resolve(__dirname, "static"	);
app.use(express.static(publicPath))

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var session=require('express-session')
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
app.use(session(sess))

//var args =process.argv.slice(2) //take this off if fail
//if(args=="dev"){ //take this off if fail
	var MongoClient = require('mongodb').MongoClient;
	var db,menu;
	var dbURL="mongodb://serveAdmin:password@localhost:27017/serve"
	MongoClient.connect(dbURL, function(err, database) {
		if(err) throw err;

	  	db=database.db("serve")	 
	  	app.listen(8000);
	  	console.log("Listening on port 8000");
	});
//}
/*
else{ //also this
	const PORT = process.env.PORT || 8000
	var dbURL="mongodb://serveAdmin:password@ds113640.mlab.com:13640/heroku_mc4jss8l"
	MongoClient.connect(dbURL, function(err, database){
		if(err) throw err;

		db=database.db("heroku_mc4jss8l")
		app.listen(PORT)
		console.log("Listening on port "+PORT)
	});


}*/
	app.get('/', function(req, res){
	  res.sendFile(`${publicPath}/login.html`);
	});

app.get('/adminLogin',function (req,res) {
  res.sendFile(`${publicPath}/adminLogin.html`)
  /* body... */
})
app.use("/adminLogin", adminAuth)

app.get('/login',function (req,res) {
  res.sendFile(`${publicPath}/login.html`)
  /* body... */
})
app.use("/login", userAuth)


app.get('/logout',function(req,res){
	req.session.destroy(function(){
    	console.log('destroy the session')
    	res.redirect('/login')
	})
})

	//Registration/Creating User
	app.get("/registration",function(req,res){ //redirect page
	  if(req.body)
	      res.sendFile(`${publicPath}/createUser.html`)
	  else
	      res.sendFile(`${publicPath}/adminLogin.html`)
	})
	app.post("/createUser", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  var update={user: data.user, 
	  			name: data.name,
				pwd: data.pwd,
                phoneNumber: data.phoneNumber}
	  createUserFs.createUser(res,query, update)
	})

	//Creating Tickets
	app.get("/ticketCreation",function(req,res){ //redirect page
	  if(req.body)
	      res.sendFile(`${publicPath}/createTicket.html`)
	  else
	      res.sendFile(`${publicPath}/login.html`)
	})
	app.post("/createTicket", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var sess = req.session
	  var query = {_id: ObjectId(data._id)}
	  var update={user:  sess.user,
	  			date: new Date(),
	  			subject: data.subject, 
	  			message: data.message}
	  createTicketFs.createTicket(res,query, update)
	})			
	//get Tickets
	app.get('/viewTickets',function (req, res) { //show in database
	   var query= {}
      findTicketItems(res,query)
	})
	app.get("/ticketLog",function(req,res){ //redirect page
	  if(req.session.user)
	      res.sendFile(`${publicPath}/ticketLog.html`)
	  else
	      res.sendFile(`${publicPath}/adminLogin.html`)
	})
	app.post("/updateTickets", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  var update={$set:{subject:data.subject,
	                    message: data.message}}
	  ticketLogFs.updateTickets(res,query,update)
	})

	//get Your Tickets
	app.get('/viewYourTickets',function (req, res) { //show in database
		//console.log(req.session)
		var data = req.session
	   var query= {user: data.user}
      findTicketItems(res,query)
	})
	app.get("/yourTickets",function(req,res){ //redirect page
	  if(req.session.user)
	      res.sendFile(`${publicPath}/yourTickets.html`)
	  else
	      res.sendFile(`${publicPath}/login.html`)
	})
	app.post("/updateYourTickets", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  var update={$set:{subject: data.subject,
	                	message: data.message}}
	  ticketLogFs.updateYourTickets(res,query,update)
	})

	app.post("/deleteYourTickets", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  ticketLogFs.deleteYourTickets(res,query)
	})
	app.post("/deleteTickets", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  ticketLogFs.deleteTickets(res,query)
	})


	//Find Ticket items given the query	
	function findTicketItems(res,query)
	{
	  console.log(query)
	  db.collection("tickets").find(query).toArray(function (err,results) {
	 
	    console.log(results)
	    
	    res.json(results)
	  })
	}
	
	//Get Users
	app.get('/viewUsers',function (req, res) { //show in database
	   var query= {}
      findUserItems(res,query)
	})
	app.get("/userLog",function(req,res){ //redirect page
	  if(req.session.user)
	      res.sendFile(`${publicPath}/userLog.html`)
	  else
	      res.sendFile(`${publicPath}/adminLogin.html`)
	})
	app.post("/updateUsers", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  var update={$set:{pwd:data.pwd,
	                    name: data.name,
	                	phoneNumber: data.phoneNumber}}
	  userLogFs.updateUsers(res,query,update)
	})

	//Get Profile
	app.get('/viewProfile',function (req, res) { //show in database
		console.log(req.session)
		var data = req.session
	   var query= {user: data.user}
      findUserItems(res,query)
	})
	app.get("/profile",function(req,res){ //redirect page
	  if(req.session.user)
	      res.sendFile(`${publicPath}/profile.html`)
	  else
	      res.sendFile(`${publicPath}/login.html`)
	})
	app.post("/updateProfile", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  var update={$set:{pwd:data.pwd,
	                    name: data.name,
	                	phoneNumber: data.phoneNumber}}
	  userLogFs.updateProfile(res,query,update)
	})


	app.post("/deleteUser", function(req,res){
	  console.log(req.body)
	  var data = req.body
	  var query = {_id: ObjectId(data._id)}
	  userLogFs.deleteUser(res,query)
	})

	//Find profiles given the query	
	function findUserItems(res,query)
	{
	  console.log(query)
	  db.collection("profiles").find(query).toArray(function (err,results) {	 
	    console.log(results)	    
	    res.json(results)
	  })
	}

var getDb = function(){
	return db
};

var getPublicPath=function(){
  	return publicPath
};

module.exports.getDb = getDb
module.exports.getPublicPath  =getPublicPath