const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Admin dashboard view
router.get('/', (req, res) => {
  if (req.session.user && req.session.user.roles.includes('admin')) {
    res.render('admin');
  } else {
    res.redirect('/login');
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product' });
  }
});

// Search products
router.get('/products/search', async (req, res) => {
  const query = req.query.q;
  try {
    const products = await Product.find({ title: { $regex: query, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
