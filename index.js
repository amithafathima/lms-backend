//1 Loads .env file contents into process.env by defalut
require('dotenv').config()

//2 imprt express
const express= require('express')// express framework of nodejs for creating backend application.
//Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
//It allows developers to execute JavaScript code server-side, outside of a web browser

//3 import cors
const cors= require('cors')//  to connect different ports (backend and frontend port)

// 7 imports database
const db=require('./DB/connection')


//8 imports router
const router=require('./Routes/router') 
//4 create a application using express
const lmsserver =express()

//5 use 
lmsserver.use(cors())
lmsserver.use(express.json()) //return middleware that only parses


//9 use router
lmsserver.use(router)
// 10
lmsserver.use('/uploads',express.static('./uploads'))


//6 port creation
const PORT= 4000 || process.env.PORT  //to run on any other port otherthan 4000
lmsserver.listen(PORT,()=>{
    console.log('lmsserver listening on port ' +PORT);
})
// 6.1
//http://localhost:4000/
lmsserver.get('/',(req,res)=>{
    res.send("Welcome to project fair")
})