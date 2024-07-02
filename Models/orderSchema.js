const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    bookName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    orderDateTime:{
        type: Date,
         required: true
    },
    
    
    
})
const orders = mongoose.model("orders", orderSchema)
module.exports = orders