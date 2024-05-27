require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/main');  

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 27017;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Watches';


app.use('/', require('./server/routes/main.js'));

// Connect to MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/Watches')
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.error("MongoDB connection error:", error));


app.listen(PORT, () => {
  console.log('Express Server Started at port ' + PORT + '. Access your app at http://localhost:' + PORT);
});

// Add this line below the existing routes
app.use('/cart', require('./server/routes/cart.js'));




