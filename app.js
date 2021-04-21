const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// new instance of express

app.use(express.static("public"));
// provides the path to the static files
app.use(bodyParser.urlencoded({extended: true}));
// easier


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signUp.html");
})

app.post ("/", function (req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  console.log(firstName, lastName, email);

});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
