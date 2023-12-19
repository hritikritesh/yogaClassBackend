const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const SLOT = mongoose.model('SLOT');

router.get('/bookedSlot',requireLogin,(req,res)=>{
    SLOT.find({bookedBy:req.user})
    .then(slots=>{
        res.json(slots);
        console.log(slots)
    })
    .catch(err=>console.log(err))
})

router.post("/bookSlot",requireLogin,(req,res) => {
    const {slot} = req.body;
    if(!slot)
    {
        return res.status(422).json({error: "Please add all fields"})
    }
    
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    SLOT.find({slot:slot, bookedBy:req.user}).then((doc)=> {
        if (doc.length === 0) {
            console.log(req.user);
            const saveSlot = new SLOT({
                slot,
                bookedBy:req.user,
                expireAfter:lastDay
            })
            saveSlot.save().then((result)=>{
                return res.json({result})
            }).catch(err => console.log(err))
        } else {
            res.json({error:"Slot already booked"})
        }
    });
    

    
})

module.exports = router;