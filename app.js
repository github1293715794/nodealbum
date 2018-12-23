var express = require("express");
var app = express();
// 控制器
var router = require("./controller");// controller 中有package.json文件
// var router = require("./controller/router.js");// controller中没有package.json文件

// 设置模板引擎
app.set("view engine", "ejs");

//路由中间件
// 静态页面
// app.use("static", express.static("./public"));// 访问http://localhost:3000/static/js/jquery.js
app.use(express.static("./public"));// 访问http://localhost:3000/js/jquery.js
app.use(express.static("./uploads"));
// get请求 首页
app.get("/", router.showIndex);// get "/" 异步函数
app.get("/:albumName", router.showAlbum);
app.get("/up",router.showUp);
app.post("/up", router.doPost);

// 404
app.use(function(req, res){
  res.render("err");
})
app.listen(3000);