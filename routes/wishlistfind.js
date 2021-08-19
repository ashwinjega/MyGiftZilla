const { wishlist } = require('../models/wishlist');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');
router.post('/', async (req, res) => {

    var Email = req.body.email;

    wishlist.find({email:Email}, function(err, result) {
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
            console.log('Failed Login');
            res.status(400).json({error: "Empty Wishlist"})
        }
    })
});

module.exports = router; 