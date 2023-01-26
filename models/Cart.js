const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String
        },
        quantity: {
            type: Number,
            default: 1,
            required: true,
            min: [1, 'Quantity can not be less than 1.']
        },
        total: {
            type: Number,
            default: 0
        }
    }],
}, {timestamps: true});

module.exports = mongoose.model('Cart', CartSchema);