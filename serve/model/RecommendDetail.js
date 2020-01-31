const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: { //方便后期查询  整个专区的id
        required: true,
        type: String
    },
    cover: { //专区封面图
        required: true,
        type: String
    },
    title: { //专区名字
        required: true,
        type: String
    },
    tag: [ //专区类型
        {
            id: {
                required: true,
                type: Number
            },
            name: {
                required: true,
                type: String
            }
        }
    ],
    songList: [ //此专区的具体音乐列表
        {
            songMid: {
                required: true,
                type: String
            },
            songName: {
                required: true,
                type: String
            },
            singer: [//歌手
                {
                    singer_id: { //歌手id
                        required: true,
                        type: String
                    },
                    singer_mid: {//歌手mid
                        required: true,
                        type: String
                    },
                    singer_name: {//歌手名称
                        required: true,
                        type: String
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model('RecommendDetail',schema);