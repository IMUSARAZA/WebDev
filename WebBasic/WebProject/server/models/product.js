const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  originalPrice: Number,
  imageURL: String,
  status: String
}, { collection: 'product' });

module.exports = mongoose.model('Product', productSchema);
