//1 import mongoose
const mongoose= require('mongoose')

//2 Define connection string 
const connectionString= process.env.DATABASE 

//3 connection code of mongodb
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb atlas connection established");
})
.catch((error)=>{
    console.log("Mongodb atlas connection error",error);
})