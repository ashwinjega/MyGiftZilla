const { wishlist } = require('../models/wishlist');
const express = require('express');
const router = express.Router();
const sha256 = require('crypto-js/sha256');

// Contains API Logic
router.post('/', async (req, res) => {


    

    // Check if this item is already in the wishlist
    let wishlistitem = await wishlist.findOne({ email:req.body.email, id:req.body.id });
    if (wishlistitem) {
        return res.status(400).send('That item already is in your wishlist!');
    } else {
        //Insert the new item if it does not exist yet
        wishlistitem = new wishlist({
            email: req.body.email,
            id: req.body.id,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image
        });
        await wishlistitem.save();
        res.send(wishlistitem);
    }
}
);

module.exports = router;