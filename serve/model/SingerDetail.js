const mongoose = require('mongoose');

const schma = new mongoose.Schema({
    singer_name: {
        type: String,
        required: true
    },
    singer_mid: {
        type: String,
        required: true
    },
    singer_pmid: {
        type: String,
        required: true
    },
    singer_id: {
        type: Number,
        required: true
    },
    singerDesc: {
        type: String,
        required: true
    },
    singerTotalNumber: {
        type: Number,
        required: true
    },
    fanTotalNumber: {
        type: Number,
        required: true
    },
    songList: [{
        songName: {
            type: String,
            required: true
        },
        songMid: {
            type: String,
            required: true
        },
        songAlbum: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('SingerDetail',schma);