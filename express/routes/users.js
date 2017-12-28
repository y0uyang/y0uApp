var express = require('express');
var router = express.Router();
const Mock = require('mockjs');
const hc = require("ykt-http-client");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  let acc = req.body.acc;
  let pwd = req.body.pwd;
  hc.post("127.0.0.1:8088/admin/find",{acc,pwd,findType:'exact'}).then(function(data){
      res.send(data)
  })
});
router.post('/findUser', function(req, res, next) {
  let acc = req.body.acc;
  hc.post("127.0.0.1:8088/admin/find",{acc,findType:'exact'}).then(function(data){
    console.log(data)  
    res.send(data)
  })
});
router.post('/reg', function(req, res, next) {
  let acc = req.body.acc;
  let pwd = req.body.pwd;
  hc.post("127.0.0.1:8088/admin/add",{acc,pwd}).then(function(data){
    console.log(data)  
    res.send(data)
  })
});

module.exports = router;
