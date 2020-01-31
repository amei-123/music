module.exports = router => {
    const request = require('request');
    const fs = require('fs');
    const {JSDOM} = require('jsdom');
    const RecommendDetail = require('../model//RecommendDetail')
    router.get('/recommendDetail/:id',(req,res)=>{
        request({
            method: "GET",
            url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
            qs: {
                ADTA: "myqq",
                id: req.params.id
            }
        },async(err, response, body) => {
            const dom = new JSDOM(body, {
                runScripts: 'dangerously'
            });
            const songList = dom.window.firstPageData;
            // console.log(songList.seoData)
            // await fs.writeFile(`${__dirname}/recommendDetail.json`,songList,{
            //     encoding: 'utf8'
            // },(err)=>{
            //     if(err)throw err;
            //     console.log('数据请求成功')
            // })
            // console.log(body);
            //查询数据库中该专区数据是否已经存在
            const data = await RecommendDetail.find({
                id: req.params.id
            });
            // console.log(data);
            if(Number(data) === 0){ //该专区未存在
                console.log('此专区数据无');
                let finalData = {};
                finalData.id = req.params.id;
                finalData.cover =songList.taogeData.picurl || songList.taogeData.picurl2
                finalData.title = songList.taogeData.title;
                finalData.tag = [];
                finalData.songList = [];
                songList.taogeData.tag.forEach(item=>{
                    finalData.tag.push({
                        id: item.id,
                        name: item.name
                    })
                });
                songList.taogeData.songlist.forEach(item=>{
                    const singer = [];
                    item.singer.forEach(sing => {
                        singer.push({
                            "singer_id": sing.id,
                            "singer_mid": sing.mid,
                            "singer_name":sing.name
                        })
                    })
                    finalData.songList.push({
                        songMid: item.mid,
                        songName: item.name,
                        singer: singer
                    })
                });
                res.send(JSON.stringify(finalData));
                RecommendDetail.create(finalData);
            }else{
                console.log('此专区数据已存在');
                res.send(JSON.stringify(data));
            }
        })
    })
}