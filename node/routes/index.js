var express = require('express');
var router = express.Router();
var socket = require('nodejs-websocket')

var onlinenumber = 0;//记录在线人数
const ws = socket.createServer(contion=>{
            // 连接成功人数加一
            onlinenumber++
            let online = {onlinenumber:onlinenumber}
              BrodCast(online)
              console.log(onlinenumber.toString())
            contion.on('text',msg=>{
              // 接受客服端的信息并处理
              let msgs = JSON.parse(msg)
              // 为避免客服端时间不一致，这里保存的是服务端的时间，
              msgs.time = new Date()
              BrodCast(msgs)
            })
            contion.on('close',clo=>{
              // 连接关闭人数减一
              onlinenumber--
              let online = {onlinenumber:onlinenumber}
              BrodCast(online)
            })
            contion.on('error',err=>{
              // 连接发生错误时查看错误信息
              if(err){
              let online = {onlinenumber:onlinenumber}
              BrodCast(online)
              console.log(err)
              }
            })
        }).listen(3030)
var BrodCast = function(str){
  console.log(str)
  ws.connections.forEach((coon,index)=>{
        coon.send(JSON.stringify(str))
  })
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/socket',function(req,res,next){
  res.send({
      a:1 
  })
})
module.exports = router;
