require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');  // Specify the layout file

// Set the public directory
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 27017;

app.listen(PORT, () => {
  console.log(
    "Express Server Started at port " +
    PORT +
    ". Access your app at http://localhost:" +
    PORT
  );
});

// Connect to MongoDB (uncomment and configure as needed)
// mongoose
//   .connect("mongodb://localhost/Watches", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((error) => console.log(error.message));

app.use('/', require('./server/routes/main.js'));
