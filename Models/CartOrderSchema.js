const mongoose = require('mongoose');

const CartorderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    bookNames: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    orderDateTime: {
        type: Date,
        required: true
    }
});

const CartOrder = mongoose.model("CartOrder", CartorderSchema);

module.exports = CartOrder;
