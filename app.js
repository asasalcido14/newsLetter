const express = require("express");
// npm package
const bodyParser = require("body-parser");
//npm package
const https = require ("https");

const app = express();
// new instance of express

app.use(express.static("public"));
// provides the path to the static files
app.use(bodyParser.urlencoded({extended: true}));
// easier


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signUp.html");
});

app.post ("/", function (req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
const jsonData = JSON.stringify(data);
const url = "https://us1.api.mailchimp.com/3.0/lists/bd2efe2c53";
const options = {
  method: "POST",
  auth: "asa1:3aa89b6d7a2b489043135d9061ff4851-us1"
};

const request = https.request(url, options, function(response){
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();
});
app.post("/failure", function (req, res){
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("server is running on port 3000");
});


// API Key: 3aa89b6d7a2b489043135d9061ff4851-us1
// List Id: bd2efe2c53
// got these both from Mailchimp - List id was in audience - then manage audience - then all the way at the bottom
