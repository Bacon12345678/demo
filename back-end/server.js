// server.js

const {Product} = require('./models/product');

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');




const app = express();
const PORT = 3000;


app.use(cors());

const url = `mongodb+srv://a367353933:scN0wuUVJBvnlw3s@rechain.rgxawov.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
  origin: 'http://localhost:5173/'
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
  app.get('/api/products', async (req, res) => {
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

  /*
  app.get('/api/test',async(req,res) => {
    await client.connect();
    const db = client.db('Rechain');
    const products = await db.collection('product').find({}).toArray();
    res.send(products);
  })
*/

app.get('/api/test', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

