// server.js


const {Product} = require('./models/product');
const {Users} = require('./models/UserData')

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');

 

const session = require('express-session');
const MongoStore = require('connect-mongo');



require('dotenv').config();


const app = express();
const PORT = 3000;

app.use(express.json());
const jwt = require('jsonwebtoken');
app.use(cookieParser());
app.use(bodyParser.json());

const jwtSecret = process.env.JWT_SECRET;

const url = `mongodb+srv://a367353933:scN0wuUVJBvnlw3s@rechain.rgxawov.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(cors({ 
  origin: 'http://localhost:5173', // 更換成你的前端服務器地址
  credentials: true // 允許認證資訊
}));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../demo/front-end/src/assets/image')); // 使用絕對路徑
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]); // 圖片的檔名
  }
});

const upload = multer({ storage: storage });

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


  app.use(session({
    secret: jwtSecret, 
    store: new MongoStore({mongoUrl:url,
    dbName:'Recahin'
    }),
    cookie: {domain:'localhost',maxAge:600*1000,secure:false},
    resave:false,
    saveUninitialized:true,
    name:'user'
  }));

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
      const userObject = user.toObject();
      console.log(JSON.stringify(userObject)); // 打印 userObject 以驗證它的內容
      req.session.user = userObject;

      req.session.save(function(err) {
        if (err) {
          console.error('Session save error: ', err);
          return res.status(500).json({ message: '伺服器錯誤' });
        } else {
          console.log('Session saved: ', JSON.stringify(req.session));
          return res.status(200).json({ message: '登入成功', token: token, user: req.session.user });
        }
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '伺服器錯誤' });
    }
  });

  const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
  
    const parts = authHeader.split(' ');
  
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.sendStatus(401);
  
    const token = parts[1];
  
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.sendStatus(403);
  
      req.user = user;
      next();
    });
  }
  
  // 验证端点
  app.get('/api/auth/verify', verifyToken, (req, res) => {
    res.sendStatus(200);
  });

  app.get('/api/user-cart', async (req, res) => {
    if (!req.session.user || !req.session.user._id) {
      return res.status(401).json({ message: "User not found in session" });
    }
    const user = await Users.findById(req.session.user._id);
  
    if (!user.cart) {
      return res.status(400).json({ message: "Cart not found in user session" });
    }
  
  try {
    const products = await Product.find({_id: {$in: user.cart}})
    console.log(JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/user-info', async (req, res) => {
  if (!req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "User not found in session" });
  }
  try{
  const user = await Users.findById(req.session.user._id);
  console.log(JSON.stringify(user));
  res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/carts/add', async (req, res) => {
  const {productId} = req.body;

  try {
    const user = await Users.findByIdAndUpdate(req.session.user._id, { $push: { cart: productId } },{new:true});
    res.status(200).json({ message: 'Product added to cart successfully.' });
  } catch (error) {
    // handle error
    res.status(500).send({ message: 'Error when adding product to cart: ' + error.message });
  }
});

app.post('/api/carts/remove', async (req, res) => {
  const { productId } = req.body;

  console.log(productId)
  
  try {
    const user = await Users.findByIdAndUpdate(req.session.user._id, { $pull: { cart: productId } });
    res.status(200).send({ success: true, message: 'Product removed from cart successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error when removing product from cart: ' + error.message });
  }
});


app.post('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).send({ error: 'Failed to destroy session' });
      }
      res.clearCookie('user', { path: '/' });
      res.status(200).send({ success: 'Logout successful' });
  });
});

app.post('/api/auction', upload.single('productImage'),async (req, res) => {
  if (!req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "User not found in session" });
  }

  try {
    const user = await Users.findById(req.session.user._id);

    console.log(req.file);

    // 创建新的 product 文档
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      condition: req.body.condition,
      info: req.body.info,
      inventory: req.body.inventory,
      location: req.body.location,
      imageName: req.file.filename,
      available: true
    });
    // 保存到数据库
    const savedProduct = await newProduct.save();

    user.sale_product.push(savedProduct._id);
    await user.save();
    
    res.json({ product: savedProduct, message: 'Product created successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  // 定义路由
  app.get('/api/ProductPageTest', async (req, res) => {
    console.log('Handling product request...');
    try {
      const products = await Product.find({ available: true });
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

app.post('/api/search', async(req, res)=>{
  try{
    const keyword = req.body.keyword;
    const results = await Product.find({ name: new RegExp(keyword, 'i') });
    res.json(results);
    console.log(results);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({message:'Internal server error'});
    }
});

app.post('/api/orders/add', async (req, res) => {

  const {productId} = req.body;

  try {
    const user = await Users.findByIdAndUpdate(req.session.user._id, { $push: { order: productId } },{new:true});
    res.status(200).json({ message: 'Product added to cart successfully.' });
  } catch (error) {
    // handle error
    res.status(500).send({ message: 'Error when adding product to cart: ' + error.message });
  }
});

app.post('/api/orders', async (req,res) => {
  if (!req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "User not found in session" });
  }
  const user = await Users.findById(req.session.user._id);

  if (!user.order) {
    return res.status(400).json({ message: "Cart not found in user session" });
  }
try {
  const products = await Product.find({_id: {$in: user.order}})
  console.log(JSON.stringify(products));
  res.status(200).json(products);
} catch (error) {
  res.status(500).json({ message: error.message });
}
})

app.put('/api/unavailable/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { available: false });
    if (!product) {
        res.status(404).send('Product not found');
    } else {
        res.status(200).send('Product updated');
    }
} catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Error updating product');
}
});