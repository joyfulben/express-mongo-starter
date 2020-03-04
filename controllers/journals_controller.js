const express = require('express')
const Plant = require('../models/journal.js');
const plants = express.Router();
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}
//New
plants.get('/new', isAuthenticated, (req, res) => {
  res.render('journals/new.ejs', {
    currentUser: req.session.currentUser
  })
})
//Edit
plants.get('/:id/edit', isAuthenticated, (req, res) => {
  Plant.findById(req.params.id, (err, foundPlant) => {
    res.render('journals/edit.ejs', {
      plant: foundPlant,
      currentUser: req.session.currentUser
    })
  })
})
//Show
plants.get('/:id', (req, res) => {
  if (req.session.currentUser) {
    Plant.findById(req.params.id, (err, foundPlant) => {
      res.render('journals/show.ejs', {
        plant: foundPlant,
        currentUser: req.session.currentUser
      })
    })
  } else {
    res.redirect('/sessions/new')
  }
})

//Delete
plants.delete('/:id', isAuthenticated, (req, res) => {
  Plant.findByIdAndRemove(req.params.id, (err, deletedPlant) => {
    res.redirect('/plants')
  })
})

//Update
plants.put('/:id', isAuthenticated, (req, res) => {
  Plant.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedEntry) => {
    res.redirect('/plants')
  })
})
//Create
plants.post('/', isAuthenticated, (req, res) => {
  Plant.create(req.body, (err, createdEntry) => {
    res.redirect('/plants')
  })
})
//Index
plants.get('/', (req, res) => {
  Plant.find({}, (err, allPlants) => {
    if (err) {
      res.send('There was a problem getting the information')
    } else if (allPlants.length < 3) {
      Plant.create([
        {
        name: "Raspberry",
        description: "Bush that grows between 1 and 6 feet tall. Usually found near water. Has small red/purple berries ready to harvest starting in July.",
        img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/raspberry-bush-in-the-garden-boguslaw-banka.jpg",
        location: "Boulder CO"
        },
        {
          name: "Mariposa Lily",
          description: "Very small plant that is only noticible when flowering. Flowers have three white petals with purple and yellow centers. Usually only a few flowers per plant in May and June.",
          img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/colorado-mariposa-lily-ginger-stein.jpg",
          location: "Boulder CO"
        },
        {
          name: "Porcini Mushroom",
          description: "A bolete mushroom (sponge under cap instead of gills). Orange to dark red/purple color. Grows amongst evergreen trees above 8000 feet.",
          img: "https://cdn.summitdaily.com/wp-content/uploads/sites/2/2016/06/MushroomForaging-SDN-080313-1024x769.jpg",
          location: "Mountains west of Boulder, CO"
        }
      ])
    } else {
      res.render('journals/index.ejs', {
        plants: allPlants,
        currentUser: req.session.currentUser
      })
    }
  })
})

module.exports = plants
