require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('../models/model');
require('../models/slots')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(require('../routes/auth'));
app.use(require('../routes/bookSlot'));

const DB = process.env.MONGO_URI
mongoose.connect(DB);
mongoose.connection.on("connected",()=>{
    console.log("Successfully connected");
})
mongoose.connection.on("error",()=>{
    console.log("not connected to mongodb");
})

// app.listen(PORT,()=>{
//     console.log("server is running on "+PORT)
// });

module.exports = app;