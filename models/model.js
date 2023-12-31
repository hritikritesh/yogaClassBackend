const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

mongoose.model('USER', userSchema);