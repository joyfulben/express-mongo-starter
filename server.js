//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require ('express-session');
const plants = express.Router()

// Configuration
require('dotenv').config()
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ohmycrud';

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));
//use method override
app.use(methodOverride('_method'));// allow POST,
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

 // PUT and DELETE from a form
app.use(session({
  secret: "something",
  resave: false,
  saveUninitialized: false
}))

// Connect to Mongo
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('the 🌿connection with mongodb is established at:🍑 ', MONGODB_URI);
  }
)

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{
  plants.post('/', (req, res) => {
    Plant.create(
      [
        {
          name: 'Apple tree',
          description: 'Up to 60 feet tall. Usually at the perimeter of a yard or on the side of the road.',
          img: "https://theknow.denverpost.com/wp-content/uploads/2018/08/FE31NELMS2-1283-1040x780.jpg",
          location: "Boulder, Colorado"
        }
      ]
    )
  })
});


/*******************************************
 Controllers
********************************************/
const journalController = require('./controllers/journals_controller.js');
app.use('/plants', journalController)
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)
//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/plants');
});

//___________________
//Listener
//___________________
app.listen(PORT, (req, res) => console.log( '🍊Listening on port:', PORT));
