const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const slotSchema = new mongoose.Schema({
    slot:{
        type:String,
        required:true
    },
    bookedBy:{
        type:ObjectId,
        ref:"USER"
    },
    expiresAfter:{
        type:Date
    }
})

mongoose.model("SLOT", slotSchema);