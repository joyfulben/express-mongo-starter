const mongoose = require('mongoose');
const Author = require('./author.js')
const Schema = mongoose.Schema;



const userSchema = new Schema({
  password: String,
  name: [{type: mongoose.Schema.Types.ObjectId, ref: 'Author'}]
})

const User = mongoose.model('User', userSchema)

module.exports= User
