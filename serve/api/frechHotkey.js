const request = require('request');
const fs = require('fs')
module.exports = router =>{
    router.get('/hotKey',(req,res)=>{
        request({
            method: 'GET',
            url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
            qs: {
                cgiKey: "GetHomePage",
                _: 1578884981552,
                data: `{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
            }
        },(err,response,body)=>{
            if(err)throw err;
           let searchKey = [];
           data = JSON.parse(body);
            // fs.writeFile(`${__dirname}/hotKey.json`,body,{
            //     encoding: 'utf8'
            // },(err)=>{
            //     if(err)throw err;
            //     console.log('数据请求成功')
            // })
           data.hotkey.data.vec_hotkey.forEach(item=>{
               searchKey.push({
                   key:item.query,
                   score:item.score,
                   pic_url:item.pic_url,
                   description:item.description
               })
           })
            res.send(searchKey);
        })
    })
}