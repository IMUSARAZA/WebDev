const express = require('express');
const router = express.Router();
const Watch = require('../models/Watch');

router.post('/add/:id', async (req, res) => {
    try {
        const watch = await Watch.findById(req.params.id);
        if (watch) {
            // Here you would handle adding the item to the user's cart
            // This is a placeholder, as actual cart functionality will depend on your app's architecture
            res.status(200).send({ message: 'Watch added to cart' });
        } else {
            res.status(404).send({ message: 'Watch not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
