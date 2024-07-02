//1 import express
const express =require('express')

// 2 import userController.js from controller
const userController = require('../Controllers/userController')
//5 
const bookController=require('../Controllers/bookController')
//6
const jwtmiddleware = require('../Middleware/jwtMiddleware')
//7
const multerConfig= require('../Middleware/multerMiddleware')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
//10
const orderController=require('../Controllers/OrderController')
//16
const orderCartController= require('../Controllers/OrderCartController')


//2.1 create router objcet of express to define path
const router = express.Router()

//3  register api call  path = http://localhost:4000/register
router.post('/register',userController.register)// register nta path

//4 login api call  path = http://localhost:4000/login
router.post('/login',userController.login)// login nta path

// 6  add book API path - https://localhost:4000/book/add
router.post('/book/add',jwtmiddleware,multerConfig.single('bookImage'),bookController.addBook)


//8   get all user book details
router.get('/all/admin/book',jwtMiddleware,bookController.getAllBooks)

//9   delete admin book
router.delete('/book/delete-admin-book/:bid',jwtMiddleware,bookController.deleteAdminBook)

// 11 adding order by user to database
router.post('/add/order',jwtmiddleware,orderController.addOrder)

// 12  get 3 book details for home project(random)
router.get('/book/home-book',bookController.getHomeBooks)

//13 viewing all orders of users in admin dashboard
router.get('/all/user/order',jwtMiddleware,orderController.getAllUserOrders)

//14 viewing all orders of users in user dashboard
router.get('/my/orders',jwtMiddleware,orderController.getAUserOrder)

//  14 update admin books
router.put('/book/update-admin-book/:bid',jwtMiddleware,multerConfig.single('bookImage'),bookController.updateAdminBook)

// 15 get all users in admin
router.get('/all/users',jwtMiddleware,userController.getAllUsers)

// 17 adding cart order by user to database
router.post('/cart/order',jwtmiddleware,orderCartController.openCheckoutModal)

//18 viewing all Cartorders of users in admin dashboard
router.get('/all/user/cart/order',jwtMiddleware,orderCartController.getAllCartOrders)

//19  viewing all orders of users in user dashboard
router.get('/my/cart/orders',jwtMiddleware,orderCartController.getAllCartOrders)


//2.2
module.exports= router 
