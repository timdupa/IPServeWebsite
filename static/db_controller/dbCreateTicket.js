var server=require("../../server.js")
function createTicket(res,query, update){
	var db=server.getDb();
	var p = server.getPublicPath()
	db.collection("tickets").insertOne(update, function(err, results){
		if(err) throw err
		else{
			console.log("Ticket Created"+results.result.n)
			//res.send("Ticket Created DID NOT REDIRECT")
			res.sendFile(`${p}/home.html`) //This is not updating/deletes
		}
	})
}
module.exports.createTicket=createTicket