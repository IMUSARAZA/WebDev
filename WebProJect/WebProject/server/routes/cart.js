const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/add/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (product) {
            res.json({
                title: product.title,
                price: product.price,
                imageURL: product.imageURL
            });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
