const express = require('express');
const router = express.Router();

// Routes
router.get('/', (req, res) => {

    const locals = {
        title: 'Watches.',
        description: 'Welcome to our homepage',
        header: 'Welcome to our homepage',
        message: 'This is a message from the controller'
    };

    res.render('index', {locals});
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;
