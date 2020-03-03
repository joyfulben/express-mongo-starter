const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  authorName: {type: String, required: true}
})

const userSchema = new Schema({
  password: String,
  name: [authorSchema]
})

const User = mongoose.model('User', userSchema)

module.exports= User
