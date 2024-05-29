const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  originalPrice: Number,
  imageURL: String,
  status: String,
  isFeatured: { type: Boolean, default: false },
}, { collection: 'product' });

module.exports = mongoose.model('Product', productSchema);
