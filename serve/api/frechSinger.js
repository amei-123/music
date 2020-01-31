const request = require('request');
const fs = require('fs');
const Singer = require('../model/Singer');

request({
    method: 'GET',
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    qs: {
        "-": "getUCGI03082786007752758",
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data:`{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}`
    }
},(err,res,body)=>{
    // fs.writeFile(`${__dirname}/singer.json`,body,{
    //     encoding: 'utf8'
    // },(err)=>{
    //     if(err) throw err;
    //     console.log('写入成功')
    // })
    const singerList = [];
    const singerlist = JSON.parse(body).singerList.data.singerlist;
    singerlist.forEach(list => {
        singerList.push({
            singer_id : list.singer_id,
            singer_mid: list.singer_mid,
            singer_name: list.singer_name,
            singer_pic: list.singer_pic
        })
    })
    Singer.create(singerList).then(()=>{
        console.log('数据添加成功')
    }).catch(err=>{
        console.log('数据添加失败')
    })
})