const mongoose = require('mongoose');
const Schema = mongoose.Schema

const authorSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  authorName: {type: String, required: true}
})

const Author = mongoose.model('Author', authorSchema)

module.exports= Author
