const { friends } = require('../models/friends');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    var Email = req.body.email;

    friends.find({useremail:Email}, function(err, result) {
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
            console.log('No friends found.');
            res.status(400).json({error: "You have no friends!"})
        }
    })
});

module.exports = router; 