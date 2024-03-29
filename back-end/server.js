// server.js


const {Product} = require('./models/product');
const {Users} = require('./models/UserData')

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const cookieParser = require('cookie-parser');

const session = require('express-session');



require('dotenv').config();


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
app.use(cookieParser());

const jwtSecret = process.env.JWT_SECRET;

const url = `mongodb+srv://a367353933:scN0wuUVJBvnlw3s@rechain.rgxawov.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
  origin: '*'
}));

app.use(session({
  secret: jwtSecret, 
  resave: false, 
  saveUninitialized: false,
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

app.get('/api/cart/:id', async (req, res) => {
  console.log('Handling product request...');
  try {
    // 获取 JWT 令牌
    
    const jwtToken = req.cookies.jwtToken;

    // 如果没有 jwtToken，则说明用户未登录，返回未授权的状态码
    if (!jwtToken) {
      return res.status(401).json({ message: '请登录' });
    }

    // 验证 jwtToken，提取其中的 userId
    const decodedToken = jwt.verify(jwtToken, jwtSecret);
    const userId = decodedToken.userId;

    // 获取购物车数据
    const user = await Users.findById(userId).populate('cart');

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 返回用户的购物车数据
    res.json({ cart: user.cart });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: '内部服务器错误' });
  }
});


app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 查找使用者
    const user = await Users.findOne({ email });

    // 使用者不存在
    if (!user) {
      return res.status(404).json({ message: '帳號不存在' });
    }

    // 驗證密碼
    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: '密碼錯誤' });
    }

    if (!jwtSecret) {
      console.error('JWT secret key is missing or empty.');
      process.exit(1);
    }
    // 登入成功
    const token = jwt.sign({ email: email, userId: user._id }, jwtSecret, { expiresIn: '1h' });
    req.session.user = user.toObject();
    return res.status(200).json({ message: '登入成功', token: token, user: req.session.user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '伺服器錯誤' });
  }
});

app.get('/check-session', (req, res) => {
  // Check if session exists
  console.log(req.session)
  console.log(req.session.user)
  if (req.session && req.session.user) {
    // Session exists, user data is available
    const userData = req.session.user;
    res.json({ message: 'Session exists', user: userData });
  } else {
    // Session does not exist or user data is not available
    res.json({ message: 'No session found or user data not available' });
  }
});