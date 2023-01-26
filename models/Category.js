const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
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
    },
}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);