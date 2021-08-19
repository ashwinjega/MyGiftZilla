const { friends } = require('../models/friends');
const express = require('express');
const router = express.Router();

// Contains API Logic
router.post('/', async (req, res) => {


    

    // Check if this is already their friend
    let friendscheck = await friends.findOne({ useremail: req.body.useremail, friendemail: req.body.friendemail});
    if (friendscheck) {
        return res.status(400).send('This friend already is in your calendar!');
    } else {
        //add the friend
        friendscheck = new friends({
            useremail: req.body.useremail,
            friendemail: req.body.friendemail,
        });
        await friendscheck.save();
        res.send(friendscheck);
    }
}
);

module.exports = router;