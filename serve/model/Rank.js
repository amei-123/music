const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    picUrl:{
        type:String,
        required:true
    },
    intro:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    topId:{
        type:Number,
        required:true
    },
    songList:[
        {
            songName:{
                type:String,
                required:true
            },
            albumMid:{
                type:String,
                required:true
            },
            singerName:{
                type:String,
                required:true
            },
            singerMid:{
                type:String,
                required:true
            }
        }
    ]

})

module.exports = mongoose.model('Rank',schema);