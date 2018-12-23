var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
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
}

// 显示上传
exports.showUp = function(req, res){
  // 命令file模块，调用getAllAlbums函数，得到所有文件夹名字之后，卸载回调函数里
  file.getAllAlbums(function(err, albums){
    console.log(albums);
    res.render("up", {
      albums : albums
    });
  })
}

// 上传表单
exports.doPost = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + "/../tempup/");
  form.parse(req, function(err, fields, files){
    console.log(fields);
    console.log(files);
    // 改名
    if(err){
      next();// 这个中间件不受理这个请求，往下走
      return;
    }
    // 判断文件尺寸
    var size = parseInt(files.tupian.size);
    if(size > 1024){
      res.send("图片尺寸应该小于1M");
      // 删除图片
      fs.unlink(files.tupian.path);
      return;
    }
    var wenjianjia = fields.wenjianjia;
    var oldpath = files.tupian.path;
    var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + parseInt(Math.random()*1000)
    + files.tupian.name);
    fs.rename(oldpath, newpath, function(err){
      if(err){
        res.send("改名失败");
        return;
      }
      res.send("成功");
    })
  })
  return;
}