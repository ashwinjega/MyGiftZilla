const { wishlist } = require('../models/wishlist');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');

// Contains API Logic
router.post('/', async (req, res) => {


    var Email = req.body.email;

    var wishlistitem =wishlist.find({email:Email, id:req.body.id});
      

        // If found
        if (wishlistitem){
            await wishlistitem.deleteOne();
            console.log('Item deleted');
            res.status(200).json({error: "No errors"})
        }
        // If not found
        else {
            console.log('This is not in your wishlist');
            res.status(400).json({error: "Item not Found!"})
        }
    })

    module.exports = router;
