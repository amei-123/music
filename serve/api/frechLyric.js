const requst = require('request');
// const {Buffer} = require('buffer')
module.exports = router => {
    router.get('/lyirc/:songId',(req,res)=>{
        const ID = req.params.songId;
        requst({
            method: 'GET',
            url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
            qs:{
                "_": "MusicJsonCallback_lrc",
                pcachetime: 1578888041725,
                songmid: `${ID}`,
                g_tk: 5381,
                loginUin: 1652804865,
                hostUin: 0,
                format: "json",
                inCharset: "utf8",
                outCharset: "utf-8",
                notice: 0,
                platform: "yqq.json",
                needNewCode: 0
            },
            headers:{
                "Referer": "https://y.qq.com/portal/player.html"
            }
        },(err,response,body)=>{
            res.send(new Buffer(JSON.parse(body).lyric,'base64').toString());
        })
    })
}