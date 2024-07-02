//1 import mongoose
const mongoose= require('mongoose')

//2 schema creation
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//3 create modal
const user = mongoose.model('user',userSchema)
module.exports=user