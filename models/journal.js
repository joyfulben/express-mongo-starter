const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  img: String,
  location: String
},
{
  timestamps: true
}
)

const Plant = mongoose.model("Plant", journalSchema)

module.exports = Plant
