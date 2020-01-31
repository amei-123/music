const request = require('request');
const fs = require('fs');
const Recommend = require('../model/Recommend')
request({
    method: 'GET',
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs: {
        "cgiKey": "GetHomePage",
        "_": 1576499692284,
        "data": `{ "comm": { "g_tk": 155916146, "uin": 647789540, "format": "json", "inCharset": "utf-8", "outCharset": "utf-8", "notice": 0, "platform": "h5", "needNewCode": 1 }, "MusicHallHomePage": { "module": "music.musicHall.MusicHallPlatform", "method": "MobileWebHome", "param": { "ShelfId": [101, 102, 161] } }, "hotkey": { "module": "tencent_musicsoso_hotkey.HotkeyService", "method": "GetHotkeyForQQMusicMobile", "param": { "remoteplace": "txt.miniapp.wxada7aab80ba27074", "searchid": "1559616839293" } } }`
    }
},(err,res,body)=>{
    // fs.writeFile(`${__dirname}/recommend.json`,body,{
    //     encoding: 'utf8'
    // },(err)=>{
    //     if(err)throw err;
    //     console.log('数据请求成功')
    // })
    Recommend.deleteMany({});
    const data = JSON.parse(body).MusicHallHomePage.data.v_shelf;
    data.forEach(element => {
        const arr = [];
        let category = element.title_template;
        let categoryList = element.v_niche[0].v_card;
        categoryList.forEach(item=>{
          if(item.time){
            arr.push({
                id: item.time,
                title: item.title,
                cover: item.cover
            })  
          }else{
            arr.push({
                id: item.id,
                title: item.title,
                cover: item.cover
            })  
          }
        })
        Recommend.create({
            category: category,
            categoryList: arr
        }).then(()=>{
            // console.log('推荐数据添加成功')
        }).catch(err=>{
            console.log(err);
        })
    });
})