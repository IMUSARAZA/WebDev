
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const User = require('./server/models/user');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Set views and layout engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Add this middleware after session initialization
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

const PORT = process.env.PORT || 27017;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Watches';




// Connect to MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/Watches')
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.error("MongoDB connection error:", error));


// Middleware to make user available in templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', require('./server/routes/main.js'));
app.use('/cart', require('./server/routes/cart.js'));
app.use('/admin', require('./server/routes/admin'));


app.listen(PORT, () => {
  console.log('Express Server Started at port ' + PORT + '. Access your app at http://localhost:' + PORT);
});

// Add product to cart (dummy endpoint, replace with actual implementation)
// Route to handle adding to cart
app.post('/cart/add/:id', async (req, res) => {
  const productId = req.params.id;
  try {
      const product = await Product.findById(productId);
      if (product) {
          res.json(product); 
      } else {
          res.status(404).send({ message: 'Product not found' });
      }
  } catch (error) {
      res.status(500).send({ message: 'Server error' });
  }
});

