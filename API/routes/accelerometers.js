const express = require('express');
const router = express.Router();

// Import the model of this route
const Accelerometer = require('../models/Accelerometer');

//Import the user model for the helper function
const User = require('../models/User');



// export the route
module.exports = router;
