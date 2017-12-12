var express = require('express')
var router = express.Router()
var fs= require('fs')
var path=require('path')
var PATH='./data/'

router.get('/read',function(req,res,next){
  var type=String(req.query.type);
  console.log('./data/'+type+'.json');
  fs.readFile('./data/'+type+'.json',function(err,data){
    if(err){
      res.json({
        status:0,
        err:err
      })
    }
    else{
      var obj=JSON.parse(data.toString())
      console.log(obj);
      res.send({
        status:1,
        data:obj
      })
    }
  })
})
module.exports = router;