var server=require("../../server.js")
function updateTickets(res,query, update){
	var db=server.getDb();
	db.collection("tickets").update(query, update, function(err, results){
		if(err) throw err
		else{
			console.log("Updated"+results.result.n)
			res.send("Item has been updated!")
		}
	})
}
module.exports.updateTickets=updateTickets

function updateYourTickets(res,query, update){
	var db=server.getDb();
	db.collection("tickets").update(query, update, function(err, results){
		if(err) throw err
		else{
			console.log("Updated"+results.result.n)
			res.send("Item has been updated!")
		}
	})
}
module.exports.updateYourTickets=updateYourTickets

function deleteYourTickets(res,query){
	var db=server.getDb();
	db.collection("tickets").remove(query, function(err, results){
		if(err) throw err
		else{
			console.log("Deleted"+results.result.n)
			res.send("Item has been deleted!")
		}
	})
}
module.exports.deleteYourTickets=deleteYourTickets

function deleteTickets(res,query){
	var db=server.getDb();
	var p = server.getPublicPath();
	db.collection("tickets").deleteOne(query, function(err, results){
		if(err) throw err
		else{
			console.log("Deleted"+results.result.n)
			res.send("Deleted")
			
		}
	})
}
module.exports.deleteTickets=deleteTickets