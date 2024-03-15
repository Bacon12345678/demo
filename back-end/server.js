// server.js


const {Product} = require('./models/product');
const {Users} = require('./models/UserData')

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')



const app = express();
const PORT = 3000;


app.use(cors());

const url = `mongodb+srv://a367353933:scN0wuUVJBvnlw3s@rechain.rgxawov.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
  origin: '*'
}));


mongoose.connect(url,{ useNewUrlParser: true, dbName: 'Rechain' })
  .then((db) => {
    console.log('Connected to database');
    database = db;

    // 在成功連接到數據庫後，開始啟動 Express 伺服器
    app.listen(PORT, () => {
      console.log(`App is listening at http://localhost:${PORT}/api/products`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });


  // 定义路由
  app.get('/api/ProductPageTest', async (req, res) => {
    console.log('Handling product request...');
    try {
      const products = await Product.find({});
      console.log('Found products:', products);
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
    }
  });


app.get('/api/ProductPageTest/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id); // 使用 findById 方法查找特定 id 的產品
    res.status(200).json(product); // 返回找到的產品資料
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/users',async(req,res)=>{
  console.log('Handling product request...');
  try {
    const users = await Users.find({}).populate('sale_product').populate('cart');
    res.json(users);
    console.log(users);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({message:'Internal server error'});
  }
});