const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');
router.post('/', async (req, res) => {

    var Email = req.body.email;
    var hashedPassword = sha256("cop4935" + req.body.password).toString();

    User.findOne({email:Email, password:hashedPassword}, function(err, result) {

        // Error Encountered.
        if(err) {
            res.status(400).json(err);
        }

        // If found
        if (result){
            res.status(200).json({
                FirstName: result.firstName,
                LastName: result.lastName,
                email:result.email
            })
        }

        // If not found
        else {
            console.log('Failed Login');
            res.status(200).json({error: "Invalid credentials."})
        }
    })
});

module.exports = router; 