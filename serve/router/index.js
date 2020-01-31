module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Recommend = require('../model/Recommend');
    const RecommendDetail = require('../model/RecommendDetail');
    const SingerList = require('../model/Singer')
    const Rank = require('../model/Rank')
    //推荐页面数据的获取
    router.get('/recommend',async(req,res)=>{
        const recommend = await Recommend.find({},{
            __v: false,
            _id: false
        }).lean();
        res.send(JSON.stringify(recommend));
    })

    //获取推荐页面分区的所有数据
    require('../api/frechRecommendDetail')(router);

    // router.get('/recommendDetail',async(req,res)=>{
    //     const recommendDetail = await RecommendDetail.find({},{
    //         __v: false,
    //         _id: false
    //     }).lean();
    //     res.send(JSON.stringify(recommendDetail))
    // })

    //获取歌手列表信息
    router.get('/singerList',async(req,res)=>{
        const singerList = await SingerList.find({},{
            __v: false,
            _id: false
        }).lean();
        if(singerList)
        res.send(JSON.stringify(singerList));
    })

    //获取歌手的详细信息
    require('../api/frechSingerDetail')(router);

    //获取歌曲的详细信息
    require('../api/frechSongDetail')(router);

    //获取热门关键歌曲
    require('../api/frechHotkey')(router) ;

    //获取歌词信息
    require('../api/frechLyric')(router);

    //获取排行榜的歌单数据
    // require('../api/frechRank')(router);

   router.get('/rank',async(req,res)=>{
        const data = await Rank.find({},{
            __v: false,
            _id: false
        }).lean();
        res.send(JSON.stringify(data))
    })

    //获取排行榜单的详细歌单数据
    require('../api/frechRankDetail')(router);

    //获取搜索的热歌
    require('../api/frechHotKeyDetail')(router);
    
    app.use('/api',router);
    
}