var server=require("../../server.js")
function createUser(res,query, update){
	var db=server.getDb();
	var p=server.getPublicPath();
	//var data=req.body
	db.collection("profiles").insertOne(update, function(err, results){
		if(err) throw err
		else{/*
			if(data.query.user != data.profiles.user){
				res.send("Email taken, please reload website and try again.")
			}
			else{*/
			console.log("User Registered "+results.result.n)
			//res.send("User Registered")
			res.sendFile(`${p}/login.html`)
		//}
		}
	})
}
module.exports.createUser=createUser