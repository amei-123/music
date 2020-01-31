const request = require('request');
const fs = require('fs')
module.exports = router =>{
    const Rank = require('../model/Rank')
    router.get('/rank', async(req,res)=>{
        request({
            method: 'GET',
            url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
            qs: {
                "_": 1579060234007,
                data: ` {"comm":{"g_tk":5381,"uin":1652804865,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`
            }
        },(err,res,body)=>{
            // fs.writeFile(`${__dirname}/rank.json`,body,{
            //     encoding: 'utf8'
            // },(err)=>{
            //     if(err)throw err;
            //     console.log('写入成功')
            // })

            let data = JSON.parse(body);
            let finalData = [];
            data.topList.data.group.forEach((item)=>{
                item.toplist.forEach((list)=>{
                    let listData = {};
                    listData.picUrl=list.headPicUrl;
                    listData.intro=list.intro;
                    listData.title=list.title;
                    listData.topId=list.topId;
                    listData.songList=[];
                    list.song.forEach((songItem)=>{
                        listData.songList.push({
                            songName:songItem.title,
                            albumMid:songItem.albumMid,
                            singerName:songItem.singerName,
                            singerMid: songItem.singerMid
                        })
                    });
                    finalData.push(listData);
                })
            });
            Rank.create(
                finalData
            )
        })
    })
}