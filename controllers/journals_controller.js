const express = require('express')
const Plant = require('../models/journals.js');
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
    } else {
      res.render('journals/index.ejs', {
        plants: allPlants,
        currentUser: req.session.currentUser
      })
    }
  })
})

module.exports = plants
