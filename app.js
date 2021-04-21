const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
// new instance of express

app.get("/", function(req, res){
  res.send("server is up and running.")
})

app.listen(3000, function(){
  console.log("server is running on port 3000");
})
