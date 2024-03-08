//server.js

//db.js

const mongoose = require('mongoose');

const url = `mongodb+srv://a367353933:scN0wuUVJBvnlw3s@rechain.rgxawov.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
};

mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
