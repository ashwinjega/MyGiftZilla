const { events } = require('../models/events');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');

// Contains API Logic
router.post('/', async (req, res) => {


    

    // Check if this item is already in the events
    let eventstore = await events.findOne({ title: req.body.title});
    if (eventstore) {
        return res.status(400).send('That event already is in your calendar!');
    } else {
        //Insert the new item if it does not exist yet
        eventstore = new events({
            email: req.body.email,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
        });
        await eventstore.save();
        res.send(eventstore);
    }
}
);

module.exports = router;