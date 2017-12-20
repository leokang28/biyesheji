var express = require('express')
var mongo=require('mongoskin')
var router = express.Router()
var path=require('path')
var PATH='./data/'
const {execFile} = require('child_process');

const DB_CONN_STR='mongodb://localhost:27017/tb_db';


router.get('/read',function(req,res,next){
  var type=String(req.query.type);
  console.log(type);
  var s={}
  var db=mongo.db(DB_CONN_STR)
  db.collection(type).find({}).toArray(function (err, items) {
    s.data=[];
    for(let i in items){
      s.data.push(items[i]);
    }
    s.code=1;
    if(s.data.length===0) {  //爬取数据并写入数据库
      console.log('没有该类型的数据，开始爬取...');
      new Promise(function(resolve,reject){
        execFile('python',['e://work/code/biyesheji/spider/test.py',type],(error,stdout,stderr)=>{
          if(error){
            console.error(`exec error:${error}`);
            reject()
          }
        })
        setTimeout(resolve(),10000)
      }).then(function(){
        db.collection(type).find({}).toArray(function (err, items){
          for(let i in items){
            s.data.push(items[i]);
          }
        })
        res.send(JSON.stringify(s))
      })
    }else{
      res.send(JSON.stringify(s))
    }
    db.close();
  });
});
module.exports = router;