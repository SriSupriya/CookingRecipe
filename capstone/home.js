var express = require('express')  
var mongojs = require('mongojs')
var request = require('request')
var app = express()  
  

var cString="mongodb+srv://sri:SriSupriya@18@cluster0.rmygk.mongodb.net/srisupriya?retryWrites=true&w=majority"
var db = mongojs(cString, ['users'])
app.use(express.static('public'));  
app.set('view engine', 'ejs');
app.get('/', function (req, res) {  
res.sendFile(__dirname+"/public/index.html")  
})

app.get('/signupsubmit', function(req, res){
 var d = {
 	fullname : req.query.fname,
 	emailid :req.query.emai,
 	password : req.query.pswd,
 	collegename: req.query.cn
 }  
     db.users.insert(d,function(err,docs){
 	    if(err){
 		   res.send("something went wrong try again")
 	    }
 	    else{
               res.sendFile(__dirname+"/public/login.html")
 	    	}
    })
})



app.get('/loginsubmit', function (req,res) {  
     var d ={
     	emailid : req.query.e_mai,
     	password  : req.query.p_swd
     }
          db.users.find(d,function(err,docs){
          	 if(err){
                    res.send("something went wrong")
                }
                else{
                    if(docs.length > 0){
                        res.sendFile(__dirname+"/public/search.html")
                    }
            
                    else{
                         res.sendFile(__dirname+"/public/list.html")
                    }

               }   
          })
     
     })
 app.get('/searchfood', function(req, res){

     request("https://www.themealdb.com/api/json/v1/1/search.php?s="+req.query.srch,function(error,response,body){
    if(error){
     
      console.log(error)
    }
    else{
       res.render("dashboard",{data:JSON.parse(body)})     
    }
})
   
});

          
app.listen(3000, function () {  
console.log('Example app listening on port 3000!')  
})