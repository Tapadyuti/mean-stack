const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	//quote:{type:String, default:"You have no quote."}

})

const User  = mongoose.model("usermodel", UserSchema)

module.exports = User;