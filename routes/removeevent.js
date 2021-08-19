const { events } = require('../models/events');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');

// Contains API Logic
router.post('/', async (req, res) => {


    var Email = req.body.email;

    var myEvent =events.find({email:Email, title:req.body.title});
      

        // If found
        if (myEvent){
            await myEvent.deleteOne();
            console.log('Item deleted');
            res.status(200).json({error: "No errors"})
        }
        // If not found
        else {
            console.log('This event is already deleted!');
            res.status(400).json({error: "Item not Found!"})
        }
    })

    module.exports = router;
