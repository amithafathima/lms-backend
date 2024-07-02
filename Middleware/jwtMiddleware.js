//router-level middleware
// 5 import token
const jwt= require('jsonwebtoken')

// token verification

// 1
const jwtMiddleware=(req,res,next) =>
{
    console.log("Inside jwt middleware")

    try
    {
        //4 get the token
    // const token = req.headers['authorization']   
    const token = req.headers['authorization'].slice(7)  
    console.log(token) ;

    // 6 verify token
    const jwtVerification= jwt.verify(token,"super2024")
    console.log(jwtVerification)
    req.payload=jwtVerification.userId
    // Verifies the extracted token using jwt.verify(). It expects the token to be signed with the key "super2024". 
    // If verification succeeds, it extracts the userId from the decoded token and attaches it to the request
    // object as req.payload.

    //3
    next()// ith kodthale athile(add-project) content varuu
    // Calls next() to pass control to the next middleware in the chain. If the token is successfully verified,
    // the subsequent middleware can access req.payload to perform user-specific operations.
    }

    catch(err)
    {
        res.status(401).json({"Authorization Error":err.message})
    }
}


// 2
module.exports = jwtMiddleware