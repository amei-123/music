module.exports = router => {
    const request = require('request');
    const {JSDOM} = require('jsdom');
    router.get('/rankDetail/:id',(req,res)=>{
        const ID = req.params.id;
        request({
            method: 'GET',
            url: 'https://i.y.qq.com/n2/m/share/details/toplist.html',
            qs: {
                ADTAG: "myqq",
                from: "myqq",
                channel: 10007100,
                id: `${ID}`
            }
        },(err,response,body)=>{
            let dom = new JSDOM(body,{runScripts:'dangerously'});
            let data = dom.window.firstPageData;
            let finalData = {};
            finalData.headPicUrl = data.toplistData.headPicUrl;//歌单封面
            finalData.titleDetail = data.toplistData.titleDetail;// 歌单,名称
            finalData.songList = [];
            data.songInfoList.forEach(item=>{
                finalData.songList.push({
                    songAlbum:item.album.name,
                    songMid:item.mid,
                    songName:item.title
                })
            })
            res.send(finalData);
        })

    })
}