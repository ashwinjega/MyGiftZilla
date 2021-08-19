
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    const stripe = require("stripe")(
        "sk_test_51IkxFHC6q7MCzL7xHiw1mD9oYSUwYaBZL7aRdPM04QhYx0PVAVWvP3v9bH0IkcWXofRpia0RpTw8lo0HAwVyknGT00Zs0t2axO"
      );
      
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRODUCT", product.price);
    const idempontencyKey = uuid();
  
    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
              name: token.card.name,
              addres: {
                country: token.card.address_country,
              },
            },
          },
          { idempontencyKey }
        );
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  });
  
  module.exports = router;