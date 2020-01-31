const express = require('express');

const app = express();

app.listen(2555,()=>{
    console.log('2555端口监听成功');
});

app.use(require('cors')());//允许跨域
app.use(express.json());

require('./plugins/db')(app); //连接数据库
require('./router/index')(app); //创建路由

// require('./api/frechRecommendDara');//添加recommend数据
// require('./api/frechSinger'); //添加singer数据

