var file = require("../models/file.js");
exports.showIndex = function(req, res, next){
  // res.send("我是首页");
  
  // node的编程思维，所有的东西都是异步的，所以内层函数不是return回来的，而是调用高层函数提供的回调函数，把数据当作回调函数的参数来使用
  file.getAllAlbums(function(err, allAlbums){
    if(err){
      // res.send(err);
      // res.render("err");// 可以将所有的错误都引到404
      //中间件，交给下面适合他的中间件
      next();
      return;
    }
    res.render("index", {
      "albums" : allAlbums
    });
  })
  
}

exports.showAlbum = function(req, res, next){
  // 遍历相册中的所有图片
  var albumName = req.params.albumName;
  // 具体业务交给model
  file.getAllImagesByAlbumName(albumName, function(err, imagesArray){
    if(err){
      // res.send(err);
      // 交给下面的中间件
      next();
      return;
    }
    res.render("album", {
      "albumname" : albumName,
      "images" : imagesArray
    })
  });
  // res.render("album", {
  //   "albumname" : albumName,
  //   "images" : ["1.jpg", "2.jpg", "3.jpg"]
  // })
}