const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {

    var Email = req.body.email;

    User.find({email:Email}, function(err, result) {

        // Error Encountered.
        if(err) {
            res.status(400).json(err);
        }

        // If found
        if (result){
            res.status(200).json({result})
        }

        // If not found
        else {
            console.log('Cannot pull user information!');
            res.status(200).json({error: "Invalid email and authentication."})
        }
    })
});

module.exports = router; 