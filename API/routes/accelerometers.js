const express = require('express');
const router = express.Router();

// Import the model of this route
const Accelerometer = require('../models/Accelerometer');

//Import the user model for the helper function
const User = require('../models/User');

// Add a collected accelerometer data 
router.post('/', async (req, res) => {
    // check for user existance 
    let userExists = await checkKeyAdd(req.body.key);

    if(userExists){
        // Create a new accelerometer data
        const accelerometer = new Accelerometer({
            key: req.body.key,
            X: req.body.X,
            Y: req.body.Y,
            Z: req.body.Z,
            time: req.body.time
        });
        try {
            // Check if adding it is possible or not
            const savedAccelerometer = await accelerometer.save();
            res.json(savedAccelerometer);
        } catch (err) {
            res.json({message: err});
        }
    }else{
        res.json({message: "No matching key found"});
    }
})

// export the route
module.exports = router;
