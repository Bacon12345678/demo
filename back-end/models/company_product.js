// company_product.js

const mongoose = require('mongoose');

const Company_productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  imageName: String,
  Company: String,
  info: String,
  date: Date,
  carbonPoint: Number,
  classification : String,
  available : Boolean,

}, { collection: 'Company_product' });

const CompanyProduct = mongoose.model('Company_product', Company_productSchema);

module.exports = { CompanyProduct, Company_productSchema };
