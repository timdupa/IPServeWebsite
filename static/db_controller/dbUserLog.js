var server=require("../../server.js")
function updateUsers(res,query, update){
	var db=server.getDb();
	db.collection("profiles").update(query, update, function(err, results){
		if(err) throw err
		else{
			console.log("Updated"+results.result.n)
			res.send("Item has been updated!")
		}
	})
}
module.exports.updateUsers=updateUsers

function updateProfile(res,query, update){
	var db=server.getDb();
	db.collection("profiles").update(query, update, function(err, results){
		if(err) throw err
		else{
			console.log("Updated"+results.result.n)
			res.send("Item has been updated!")
		}
	})
}
module.exports.updateProfile=updateProfile

function deleteUser(res,query){
	var db=server.getDb();
	var p = server.getPublicPath();
	db.collection("profiles").deleteOne(query, function(err, results){
		if(err) throw err
		else{
			console.log("Deleted"+results.result.n)
			res.send("Deleted")
			
		}
	})
}
module.exports.deleteUser=deleteUser
