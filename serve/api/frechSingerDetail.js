module.exports = router => {
    const request = require('request');
    const fs = require('fs');
    const {JSDOM} = require('jsdom');
    const SingerDetail = require('../model/SingerDetail');
    router.get('/singerDetail/:singerId',async(req,res)=>{
        const ID = req.params.singerId;
        const singerDetail = await SingerDetail.find({
            singer_mid: ID
        });
        if(singerDetail.length === 0){
            console.log('此数据中无该数据');
            request({
                method: 'GET',
                url: 'https://i.y.qq.com/n2/m/share/details/singer.html',
                qs: {
                    ADTAG: "newyqq.singer",
                    source: "ydetail",
                    singermid: `${ID}`
                }
            },async (err,response,body)=>{
                const dom = new JSDOM(body,{runScripts: "dangerously"});
                const firstPageData = dom.window.firstPageData;
                const data = JSON.stringify(firstPageData);
                fs.writeFile(`${__dirname}/singerDetail.json`,data,{
                    encoding: 'utf8'
                },(err)=>{
                    if(err)throw err;
                    console.log('数据请求成功')
                })
                const finalData = {};
                finalData.singer_name = firstPageData.singerData.singer_name;
                finalData.singer_mid = firstPageData.singerData.singer_mid;
                finalData.singer_pmid = firstPageData.singerData.singer_pmid;
                finalData.singer_id = firstPageData.singerData.singer_id;
                finalData.singerDesc = firstPageData.singerData.SingerDesc;
                finalData.singerTotalNumber = firstPageData.singerData.total; //歌曲数
                finalData.fanTotalNumber = firstPageData.singerData.fans; //粉丝数
                finalData.songList = [];
                //歌曲的详细信息
                firstPageData.singerData.list.forEach(item=>{
                    finalData.songList.push({
                        songName: item.songInfo.name,
                        songMid: item.songInfo.mid,
                        songAlbum: item.songInfo.album.name
                    })
                })
                console.log(finalData.songList);
                res.send(finalData);
                await SingerDetail.create(finalData)
            })
        }else{
            console.log('此数据库中存在此数据')
            res.send(singerDetail);
        }
    })
}