const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');
const bcrypt = require('bcrypt');




router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const perPage = 8; 
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);
        const products = await Product.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        const locals = {
            title: 'Watches',
            description: 'Welcome to our homepage',
            header: 'Welcome to our homepage',
            message: 'This is a message from the controller',
        };
        res.render('index', {locals, products, totalPages});
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/products', async (req, res) => {
    try {

        const products = await Product.find()

        res.render('products', { products});
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).render('auth/login', { message: 'Invalid email or password' });
        }
        
        req.session.user = user;

        if (user.roles.includes('admin')) {
            return res.redirect('/admin');
        } else {
            return res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});


router.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('auth/register', { message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        // Set user in session
        req.session.user = newUser;

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});








module.exports = router;
