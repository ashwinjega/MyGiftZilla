const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');
const { useAccordionToggle } = require('react-bootstrap');

router.post('/', async (req, res) => {

    var error = '';
    let user = await User.findOne({ email: req.body.email });
    var hashedPass = sha256("cop4935" + req.body.password).toString();
    user.password = hashedPass;
    await user.save();
    var ret = { error: error};
   res.status(200).json(ret);

});
module.exports = router;