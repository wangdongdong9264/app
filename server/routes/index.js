var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   return res.send({
//     status:1,
//     info:'测试'
//   })
// });

var express=require('express');
var router=express.Router();
var fs=require('fs');
var PATH='./public/data/';

router.get('/',(req,res,next)=>{
  if(!req.session.user){
    return res.render('login',{})
  }
  res.render('index',{})
})

router.get('/login',(req,res,next)=>{
  res.render('login',{})
})

router.get('/tuijian',(req,res,next)=>{
  if (!req.session.user) {
    return res.render('login',{})
  }
  res.render('/tuijian')
})

router.get('/edit',(req,res,next)=>{
  if(!req.session.user){
    return res.render('login',{})
  }
  var type=req.query.type;
  if (type) {
    var obj={};
    switch (type) {
      case 'sanwen':
        obj={};
        break;
      case 'it':
        obj={};
        break;
      case 'manager':
        obj={};
        break;
      default:
        return res.send({
          status:0,
          info:'参数错误'
        })
        break;
    }
    fs.readFile(PATH+type+'.json',(err,data)=>{
      if (err) {
        return res.send({
          status:0,
          info:'fail...'
        })
      }
      var obj=JSON.parse(data.toString());
      return res.render('edit',{
        data:obj
      })
    })
  }else{
    return res.send({
      status:0,
      info:'参数错误'
    })
  }
})

module.exports = router;
