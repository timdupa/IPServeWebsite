//userVerify.js
//serveAdmin@gcsu.edu password
var express = require('express');

var router = express.Router(); //for router
var appVars=require("../server.js")

router.post("/", function(req, res){ //adminLogin
	console.log(req.body.email)
	console.log(req.body.pwd)
	var p = appVars.getPublicPath()
	var db = appVars.getDb()
	var query={user:req.body.email, pwd: req.body.pwd}
	
	db.collection("admin").find(query).toArray(function(err, results){
		if(err) throw err 
		else
			if(results.length>0){
				console.log("Login with: "+req.body.email)
				req.session.regenerate(function(){
					req.session.user=req.body.email
				})
				res.sendFile(`${p}/adminHome.html`)
			}
			else{
				console.log("Invalid!")
				res.send('<html><h1> Admin username and password are not correct! Try again!')
			}	
	})
})
module.exports =router;