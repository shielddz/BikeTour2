const express = require('express');
const router = express.Router();

// Import the model of this route
const Accelerometer = require('../models/Accelerometer');

//Import the user model for the helper function
const User = require('../models/User');

// Check all collected data of the accelerometer
router.get('/', async (req, res) => {
    try{
        // get all the accelerometers stored
        const accelerometers = await Accelerometer.find();
        //map through them to create a json object
        const context = {
            accelerometers: accelerometers.map(accelerometer => {
                return {
                    key: accelerometer.key,
                    X: accelerometer.X,
                    Y: accelerometer.Y,
                    Z: accelerometer.Z,
                    time: accelerometer.time
                }
            })
        };
        //return the data as a json response
        res.json(context);
    } catch (err){
        res.json({message: err});
    }
});


// export the route
module.exports = router;
