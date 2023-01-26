const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    categories: {
        type: Array
    },
    size: {
        type: Array
    },
    color: {
        type: Array
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    flashDeal: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);