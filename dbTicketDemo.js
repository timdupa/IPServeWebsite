
var fs = require('fs'); //This file is simlar to dbMenuDemo.js
var http = require('http');
var url = require('url');
var ROOT_DIR = "Final Project/";
var MongoClient = require('mongodb').MongoClient;
var db,tickets;
var dbURL="mongodb://serveAdmin:password@localhost:27017/serve"
var server=http.createServer(function (req, res) {
   var urlObj = url.parse(req.url, true, false);
  console.log(urlObj.pathname)
  if(req.method=="GET")
  	if(urlObj.pathname=="/yourTickets.html"){
      var query={}
      findTicketItems(res,query)
  	}
  else{ 
  fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
  if (err) {
    res.writeHead(404);
    res.end("<h1>Page does not exist!</h1>");
    return;
  }
  res.writeHead(200);
  res.end(data);
})
}
if(req.method="POST")
{
  //submitTicket request
  if(urlObj.pathname=="/createTicket"){
    var dataFromClient=''
    req.on('data',function(chunk){
      dataFromClient+=chunk;
    })
    req.on('end',function(){
      insertTickets(dataFromClient, res)
      res.writeHead(200);
      res.end("Thank you for Submission!")
    })
  }


}


})
// Initialize connection once
MongoClient.connect(dbURL, 
					function(err, database) {
  if(err) throw err;

  db=database.db("serve")
  
  // Start the application after the database connection is ready
  server.listen(8000);
  console.log("Listening on port 8000");
});
function findTicketItems(res,query)//are these duplicate functions from reg js page?
{
  console.log(query)
  db.collection("tickets").find(query).toArray(function (err,results) {
 
    console.log(results)
    
    res.writeHead(200);
    res.end(JSON.stringify(results))
  })

  //    res.writeHead(200);
  // res.end(results);
 
}
function insertTickets(data,res){
  console.log(data)
  var info =JSON.parse(data)
  var cart=info[0]
  var customerInfo=info[1]
  var currentDate= new Date()
  var records =[]
  for(i in cart){
    item = cart[i]
    tPrice = item.price * item.quantity
    var record ={ customerID:customerInfo[0].customerID,
      pizzaName:item.pizzaName,
      totalPrice:tPrice,
      quantity:item.quantity,
      date: currentDate}
      records.push(record)
      console.log(record)
  }
  db.collection("tickets").insertMany(records, function(err, result){
    if(err)
        console.log(err);
      else{
        console.log("insert: "+result.insertedCount)
        res.writeHead(200);
        res.end("Your order has been placed")
      }
  })
}

