// 1 import userSchema or Model
const users = require('../Models/userSchema');// this is the users we see in mongoDB 
 

//3 import jsonwebtoken
const jwt = require('jsonwebtoken')// for login purposes
 
   //For validation(email)
     const express= require('express')
    const router= express.Router();

    // for validation(email)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// 2 Register Logic
exports.register = async (req, res) => 
    {
    //1 accepts data from client
    const { username, email, password } = req.body //req came from frontend to backend and res goes from backend to frontend
    console.log(username, email, password);

    try {
            
        // for  validation (email)
        if (!emailRegex.test(email)) {
            return res.status(400).json("Invalid email format");
        }
        
        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }

        //check if email is already registered
        const existingUser = await users.findOne({ email })// users-(userschema)
        console.log(existingUser);


        if (existingUser) {
            // res.status(406).json("User already registred")
            res.status(406).json("User already registred")
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                
            })
            await newUser.save()
            res.status(200).json(newUser)  // is passed to frontend
        }

    }
    catch (err) {
        res.status(500).json("Register failed...") // is passed to frontend
    }
}


// 4 login logic

exports.login = async (req, res) => {
    // 1 accept data from client
    const { email, password } = req.body   // Auth.jsxil LoginApi il ullil kodtha userData aanu req.body
    try {
        // 2 check if email and password is db
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token=jwt.sign({userId:existingUser._id},"super2024")// userId:existingUser._id -----is the payload

            // sign mathod is used to create token from jwt
            // If a user is found with the given email and password, a JWT (JSON Web Token) is created using 
            // the jwt.sign method with the user's ID (existingUser._id) as the payload
            // and a secret key ("super2024") for signing.

            console.log(token);
            res.status(200).json({existingUser,token})  
            // existingUser is an object representing the user data found in the database. It is the result of the 
            // query users.findOne({ email, password }) that is executed in the function.
            // This object contains the user's information as it is stored in the database, such as the user's ID (_id), email, 
            // and other relevant fields (e.g., username etc).
        }
        else {
            res.status(404).json("Invalid email or password")
        }

    }
    catch (err) {
        res.status(500).json("Register failed..." + err)
    }
}

// 5 get all registered user in admin side
exports.getAllUsers=async(req,res)=>//1
{
  

  //3 case sensitivity
       let query = {}
       
  
  // const query={
  //     language:{$regex:searchKey,$options:'i'}// i indicates case sensitivity options
      // language base aayitt aanu searching varunne


      try{
          const AllUsers =await users.find()
          if(AllUsers.length>0)
          {
              res.status(200).json(AllUsers)
          }
          else
          {
              res.status(401).json("Can't find users");
          }
      }
      catch(err)
      {
          res.status(401).json({message:err.message});
      }
  }