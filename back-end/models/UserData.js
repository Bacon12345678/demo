//UserData.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // 使用 mongoose 內建的 ObjectId 類型
  username: String, // 正確的屬性名稱應該是 username 而不是 UserName
  email: String,
  password: String,
  phone: String,
  sale_product: [{ type: mongoose.Schema.Types.ObjectId, required: true, unique: true }], // 連接到產品模型的銷售產品
  cart: [{ type: mongoose.Schema.Types.ObjectId }] // 連接到產品模型的購物車
}, {collection:'User'}
);

UserSchema.methods.isValidPassword = async function (password) {
  return password == this.password;
};

const Users = mongoose.model('User', UserSchema);

module.exports = { Users, UserSchema };
