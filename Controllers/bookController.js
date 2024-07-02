const books = require('../Models/bookSchema')

// 1  adding book


exports.addBook = async(req,res)=>{
    console.log("Inside addBook");
     //get book details
     const {title,author,genre,price,availability,description}=req.body
    //getUserId
    const userId = req.payload 
    // existingUser._id venam ngil req.payload kodthal mathii...jwtmiddleware il nammal token n decode chythu req.payload il 
    //existingUser._id  undu
     //userId:existingUser._id -----is the payload which is set in jwtmiddleware
     // req.payload jwtmiddleware il ninn kittith
    //In the function exports.addBook, userId is a variable that is assigned the value from req.payload.
    // The req.payload is an object that is derived from the JWT (JSON Web Token) that the user sends
    // in their request (often as part of an Authorization header).
    //get bookImage
    //In summary, the payload in your JWT middleware refers to the decoded contents of the JWT token's payload,
    // which typically contains user-related information or other data relevant to your application. 
    //By attaching this payload to the req object, you make it accessible to subsequent parts of your application, allowing them to make decisions or perform actions based on the authenticated user's data.
    const bookImage = req.file.filename
   
    console.log(userId,title,author,genre,price,availability,description,bookImage);
//logic for adding new book
try{
    const existingBook = await books.findOne({title})
    if(existingBook){
        res.status(400).json("Book already exist")
    }
    else{
        const newBook = new books({
            title,author,genre,price,availability,description,bookImage,userId
        })
        await newBook.save()//save new book in mongodb
        //console.log(newBook);  // for testing purposes
        res.status(200).json(newBook)//response send to client
    }
}
catch(error){
    res.status(401).json({message:error.message})
} 
}
// -------------------------------------------------------------------------------------------------------------------------

// 2 get all books added by admin

exports.getAllBooks=async(req,res)=>//1
  {
    const searchKey=req.query.search//2
    console.log(searchKey)//2
    
     //3 case sensitivity
    let query = {}

    if(searchKey)
        {
           query.title= {$regex: searchKey, $options:"i"}
        }

        try{
            const AllBooks =await books.find(query)
            if(AllBooks.length>0)
            {
                res.status(200).json(AllBooks)
            }
            else
            {
                res.status(401).json("Cant find book!!!!");
            }
        }
        catch(err)
        {
            res.status(401).json({message:err.message});
        }
    }


    
  // 3 delete admin Book
  exports.deleteAdminBook = async(req,res) =>
    {
      const {bid} =req.params // get project id
  
      try
      {
          const deleteBook=await books.findOneAndDelete({_id:bid})
          //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
          res.status(200).json(deleteBook)
      }
      catch(err)
      {
          res.status(401).json({message:err.message})
      }
    }
    
    // 4 view 3 book on home page(random aayett)
    exports.getHomeBooks=async(req,res)=>
    {
      try
      {
          const HomeBook =await books.find().limit(3)
          if(HomeBook)
          {
              res.status(200).json(HomeBook)
          }
          else
          {
              res.status(401).json("cant find book")
          }
      }
      
      catch(err)
      {
          res.status(401).json({message:err.message});
      }
    }


    //5 update admin books
  exports.updateAdminBook=async(req,res)=>
    {
        const {title,author,genre,price,availability,description,bookImage}=req.body
        userId=req.payload // particular user nta book
        const {bid} =req.params
        const uploadImage=req.file?req.file.filename:bookImage

        try
        {
            // find particular book and update  the data and save the changes

            const updateBook =await books.findByIdAndUpdate({_id:bid},{title,author,genre,price,availability,description,bookImage:uploadImage,userId})
            await updateBook.save()
            res.status(200).json(updateBook)
        }
        catch(err)
        {
            res.status(401).json({message:err.message})        }
    }
  