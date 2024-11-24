const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const uploadImage = require("./utils/uploadImage")

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI; 
const reactAppUrl  = process.env.REACT_APP_URL



//middleware 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(cors({
    origin: reactAppUrl,
    credentials: true,

}));

console.log(reactAppUrl)


// mongo DB connections
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


//routes
const authRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const orderRoutes = require('./routes/orders');
const statsRoutes = require('./routes/stats');


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);


app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});