const express = require('express');
const router = express.Router();

// Import the model of this route
const Accelerometer = require('../models/Accelerometer');

//Import the user model for the helper function
const User = require('../models/User');

<<<<<<< HEAD
// Add a collected accelerometer data 
router.post('/', async (req, res) => {
    // check for user existance 
    let userExists = await checkKeyAdd(req.body.key);
=======
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
>>>>>>> 7949e93bec04cbb22fc56117dc07fc97f6c6b259

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
