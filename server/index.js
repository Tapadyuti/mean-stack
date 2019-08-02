const express = require("express");
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')


var mongodb = require("mongodb");
var client = mongodb.MongoClient;
var url = "mongodb://localhost:27017";



mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/flight')
.then(()=>console.log("Mongoose Up"))

const User = require("./models/users")

app.use(bodyParser.json())

app.post('api/login', async(req,res) =>{
	const {username,password} = req.body
	console.log(username+":"+password);
	console.log("::"+User);
	const resp = await User.findOne({username,password})
	console.log("RESP: "+resp);

	if(!res){
		console.log("Incorrect Login");
		resp.json({
			success:false,
			message:"Incorrect details"
		});
	}else{
		//Make a session
		console.log("Correct Login");
		resp.json({
			success:true,
			message:"Correct details"
		});

	}
	res.send("k");

})

app.post('/api/register', (req, res) =>{
	console.log(req.body)
	const {username, password} = req.body
	console.log(username+":"+password);

	const existingUser = await User.findOne({username});
	if(existingUser){
		res.json({
			sucess:false,
			message:"Esisting User"
		})
		return;
	}else{
		res.json({
			sucess:True,
			message:"Welcome"
		})
	}


	const user = new User({
		username,
		password
	})

	res.send('Ok');

	///const result = await user.save()
	console.log("Result: "+result);
	res.json({
		sucess:true,
		message:"Welcome!"
	})
	//Usermodel.save({})
})

app.listen(1234,()=> console.log("Server listening to 1234"));


