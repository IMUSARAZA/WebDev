const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/add/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // Here you would handle adding the item to the user's cart
            // This is a placeholder, as actual cart functionality will depend on your app's architecture
            res.status(200).send({ message: 'Product added to cart' });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
