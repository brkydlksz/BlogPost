const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var yazis=[];
var bass=[];
var yazislcs = [];



app.get("/", function(req,res){
    
    res.render("blog", {entry:yazislcs, head:bass});
    
});

app.get("/AboutUs", function(req,res){
    
    res.render("about");
    
});

app.get("/ContactUs", function(req,res){
    
    res.render("contact");
    
});


app.get("/compose", function(req,res){

    res.render("compose");
})

app.post("/compose", function(req,res){

    
     var bas = req.body.heading;
     var yazi = req.body.text;
    
    let yazislc;
    if(yazi.length>100){
       yazislc = yazi.slice(0,110)
       yazislcs.push(yazislc);
    }
    else{
        yazislc = yazi
        yazislcs.push(yazislc);
    };
    yazis.push(yazi);
    bass.push(bas);



    
    res.redirect("/");
})

app.get("/bass/:postName", function(req, res){

    const requestedTitle = _.lowerCase(req.params.postName);

    for(let i=0; i<bass.length; i++){
        const storedTitle = _.lowerCase(bass[i]);
        const storedtext = _.lowerCase(yazis[i]);

        if (storedTitle === requestedTitle) {

             res.render("popup", {entry:storedtext, head:storedTitle});
        }
    }
    
  })

app.listen("3000", function(){
    console.log("server starting at port 3000");
});