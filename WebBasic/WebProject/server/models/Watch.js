const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    title: String,
    price: Number,
    imageURL: String,
    description: String,
}, { collection: 'product' });

module.exports = mongoose.model('Watch', watchSchema);
