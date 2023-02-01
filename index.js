// Require File
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const admin = require('firebase-admin');

// Cors
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

// Route
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');

// import service account file (helps to know the firebase project details)
const serviceAccount = require("./shop-ee4a7-firebase-adminsdk-b12ke-045f5b2eb0.json");

// Intialize the firebase-admin project/account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://shop-ee4a7.firebase.com"
});

// Database Connection
const dbname = process.env.DB_NAME;
const pswd = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const username = process.env.DB_USERNAME;
const dbURL = `mongodb+srv://${username}:${pswd}@${cluster}.6putb.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(res => console.log('DB Connected Successfully'))
.catch(err => console.log(err))

// App Use
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);
app.use('/api/products', productRoute);
app.use('/api/categorys', categoryRoute);

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'),
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-with, Content-Type, Accept'),
    next();
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Backend Server Running!');
});