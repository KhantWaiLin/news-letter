const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/sign_up.html");
});

app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.Email;

  const data ={
    members:[
      {
        email_address: email,
        email_type : 'text',
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }

    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/05c9f68421";
  const option ={
    method: "POST",
    auth: "kelly:4c1a6a1880ba2b7499887bf9df683d31-us20",
  };

  const request = https.request(url,option,function(response){
    response.on("data",function(data){

      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
      console.log(JSON.parse(data));

    })
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
})




//audience id
//05c9f68421


//api key
// 4c1a6a1880ba2b7499887bf9df683d31-us20
