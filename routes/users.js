const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');

// Contains API Logic
router.post('/', async (req, res) => {
    var hashedPassword = sha256("cop4935" + req.body.password).toString();


    console.log(req.body.firstname);

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        //Insert the new user if they do not exist yet
        user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            login: req.body.login,
            password: hashedPassword
        });
        await user.save();
        res.send(user);
    }
}
);

module.exports = router;