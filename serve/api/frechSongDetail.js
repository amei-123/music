module.exports = router => {
    const request = require('request');
    const SongDetail = require('../model/SongDetail');
    const {JSDOM} = require('jsdom');
    router.get('/songDetail/:songId',async (req,res)=>{
        const ID = req.params.songId;
        const songDetail =await SongDetail.find({
            songMid: ID
        })
        console.log(songDetail);
        if(songDetail.length === 0){
            console.log('此数据未存在')
            request({
                method: 'GET',
                url: 'https://i.y.qq.com/v8/playsong.html',
                qs: {
                    songmid: `${ID}`
                },
                headers: {
                    "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
                }
            },(err,response,body)=>{
                const dom = new JSDOM(body,{runScripts:'dangerously'});
                const songList = dom.window.songlist[0];
                const finalData = {
                    songMid: songList.songmid,
                    m4aUrl: songList.m4aUrl,
                    songName: songList.songname,
                    playTime: songList.playTime,
                    songPic: songList.pic
                };
                res.send(finalData);
                SongDetail.create(finalData).then(()=>{
                    console.log('写入数据库成功')
                })
            })
        }else{
            console.log('此数据存在');
            res.send(songDetail);
        }
    })
}