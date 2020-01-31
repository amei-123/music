const mongoose = require('mongoose');

const schma = new mongoose.Schema({
    songMid: {
        type: String,
        required: true
    },
    m4aUrl: {
        type: String,
        required: true
    },
    songName: {
        type: String,
        required: true
    },
    playTime: {
        type: String,
        required: true
    },
    songPic: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('SongDetail',schma);