const express = require('express');
const router = express.Router();
const Watch = require('../models/Watch');

router.get('/', async (req, res) => {
    try {
        const watches = await Watch.find();
        const locals = {
            title: 'Watches',
            description: 'Welcome to our homepage',
            header: 'Welcome to our homepage',
            message: 'This is a message from the controller',
        };
        res.render('index', { locals, watches });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;
