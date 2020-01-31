const mongoose = require('mongoose');

const schma = new mongoose.Schema({
    singer_id: {
        type: Number,
        required: true
    },
    singer_mid: {
        type: String,
        required: true
    },
    singer_name:{
        type: String,
        required: true
    },
    singer_pic: {
        type: String,
        required: true
    }, 
})

module.exports = mongoose.model('Singer',schma)