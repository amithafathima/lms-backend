const orders= require('../Models/orderSchema')

// 1 adding order by user


exports.addOrder = async(req,res)=>{
    console.log("Inside addOrder");
     //get book details
     const {name,contactNo,address,pincode,paymentMode,bookName,orderDateTime}=req.body
    //getUserId
    const userId = req.payload 
    
    // existingUser._id venam ngil req.payload kodthal mathii...jwtmiddleware il nammal token n decode chythu req.payload il 
    //existingUser._id  undu
     //userId:existingUser._id -----is the payload which is set in jwtmiddleware
     // req.payload jwtmiddleware il ninn kittith
    //In the function exports.addOrder, userId is a variable that is assigned the value from req.payload.
    // The req.payload is an object that is derived from the JWT (JSON Web Token) that the user sends
    // in their request (often as part of an Authorization header).
    //get bookImage
    //In summary, the payload in your JWT middleware refers to the decoded contents of the JWT token's payload,
    // which typically contains user-related information or other data relevant to your application. 
    //By attaching this payload to the req object, you make it accessible to subsequent parts of your application, allowing them to make decisions or perform actions based on the authenticated user's data.
    
   
    console.log(userId,name,contactNo,address,pincode,paymentMode,bookName,orderDateTime);
//logic for adding new order
try{
    
    
        const userOrder = new orders({
            name,contactNo,address,pincode,paymentMode,userId,bookName,orderDateTime
        })
        await userOrder.save()//save order in mongodb
        //console.log(newOrder);  // for testing purposes
        res.status(200).json(userOrder)//response send to client
    
}
catch(error){
    res.status(401).json({message:error.message})
} 
}


// 2 viewing all orders ordered by user in Admin page 

exports.getAllUserOrders=async(req,res)=>//1
  {
    

      let query = {}
         
    // const query={
    //     language:{$regex:searchKey,$options:'i'}// i indicates case sensitivity options
        // language base aayitt aanu searching varunne


        try{
            const AllUserOrders =await orders.find()
            if(AllUserOrders.length>0)
            {
                res.status(200).json(AllUserOrders)
            }
            else
            {
                res.status(401).json("Can't find this order");
            }
        }
        catch(err)
        {
            res.status(401).json({message:err.message});
        }
    }

    //  3 viewing particular users order in userside

    exports.getAUserOrder=async(req,res)=>
        {
          //  get userId
          const userId=req.payload
          // existingUser._id venam ngil req.payload kodthal mathii...jwtmiddleware il nammal token n decode chythu req.payload il 
          //existingUser._id  undu
          //In the context of a web server and APIs, req.payload refers to the data contained in a JSON Web Token (JWT)
          // that is attached to the incoming request. Typically, the payload is extracted from the request's authorization
          // header.
          try
          {
              const AOrder=await orders.find({userId})// findOne kodthal oru user nta oru order varullu so find kodkkuu
              if(AOrder)
              {
                  res.status(200).json(AOrder)
              }
              else
              {
                  res.status(401).json("Can't find order")
              }
          }
          catch(err)
          {
              res.status(401).json({message:err.message});
          }
        }
      
    
  
