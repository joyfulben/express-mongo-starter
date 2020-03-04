const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
  password: String,
  name: {type: String, required: true},
  userName: {type:String, required: true, unique: true}
})

const User = mongoose.model('User', userSchema)

module.exports= User
