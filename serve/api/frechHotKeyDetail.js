const request = require('request');

module.exports = router => {
    router.get('/hotKeyDetail/:key',(req,res)=>{
        const key = req.params.key;
        console.log(key);
        request({
            method: 'GET',
            url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
            qs: {
                _: 1579076291057,
                g_tk: 5381,
                uin: 1652804865,
                format: "json",
                inCharset: 'utf-8',
                outCharset: "utf-8",
                notice: 0,
                platform: "h5",
                needNewCode: 1,
                w: key,
                zhidaqu: 1,
                catZhida: 1,
                t: 0,
                flag: 1,
                ie: "utf-8",
                sem: 1,
                aggr: 0,
                perpage: 20,
                n: 20,
                p: 1,
                remoteplace: "txt.mqq.all",
            },
            headers:{
                referer: "https://y.qq.com/m/index.html"
            }
        },(err,response,body)=>{
            // console.log(body);
            let finalData= {
                songlist:[],
                zhida:{}
            };
            let data= JSON.parse(body);
            data.data.song.list.forEach((item)=>{
                finalData.songlist.push({
                    songAlbum:item.albumname,
                    songMid:item.songmid,
                    songName:item.songname
                })
            });
            finalData.zhida=data.data.zhida;
            res.send(finalData);
        })
    })
}