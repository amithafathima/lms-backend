const CartOrder= require('../Models/CartOrderSchema')

exports.openCheckoutModal = async (req, res) => {
    try {
        const { name, contactNo, address, pincode, paymentMode, bookNames, orderDateTime } = req.body;
          userId=req.payload
        // Create an array to store book names
        // const bookName = books.map(book => book.title);

        // Concatenate book names into a single string
        // const bookNames = bookName.join(', ');

        // Create a new order instance
        const newOrder = new CartOrder({
            name,
            contactNo,
            address,
            pincode,
            paymentMode,
            bookNames,
            userId,
            orderDateTime: new Date(orderDateTime)
        });

        // Save the new order to the database
        await newOrder.save();

        // Send success response
        res.status(200).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Failed to place order" });
    }
};


// 2 viewing all Cartorders ordered by user in Admin page 

exports.getAllCartOrders=async(req,res)=>//1
  {
    

      let query = {}
         
    // const query={
    //     language:{$regex:searchKey,$options:'i'}// i indicates case sensitivity options
        // language base aayitt aanu searching varunne


        try{
            const AllCartOrders =await CartOrder.find()
            if(AllCartOrders.length>0)
            {
                res.status(200).json(AllCartOrders)
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

    //  3 viewing particular cart order in userside

        exports.getAUserCartOrder=async(req,res)=>
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
                  const ACartOrder=await CartOrder.find({userId})// findOne kodthal oru user nta oru order varullu so find kodkkuu
                  if(ACartOrder)
                  {
                      res.status(200).json(ACartOrder)
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
          