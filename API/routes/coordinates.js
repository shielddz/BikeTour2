const express = require('express');
const router = express.Router();

// Import the model of this route
const Coordinate = require('../models/Coordinate');

//Import the user model for the helper function
const User = require('../models/User');


// export the route
module.exports = router;