// product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  imageName: String,
  condition: String,
  location: String,
  info: String,
  inventory: Number,
  date: Date,
  available: Boolean,
  status:Number,
}, { collection: 'product' });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, productSchema };
