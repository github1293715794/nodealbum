// 读取uploads中的文件夹
var fs = require("fs");

exports.getAllAlbums = function(callback){
  fs.readdir("./uploads", function(err, files){
    if(err){
      callback("没有找到uploads文件", null);
      return;
    }
    var allAlbums = [];
    // 迭代器
    (function iterator(i){
      if(i == files.length){
        // 遍历结束
        // return allAlbums;
        callback(null, allAlbums);
        return;
      }
      fs.stat("./uploads/" + files[i], function(err, stats){
        if(err){
          callback("找不到文件" + files[i], null);
          return;
        }
        if(stats.isDirectory()){
          allAlbums.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0) 
  })
}

// 根据文件名，获取所有图片
exports.getAllImagesByAlbumName = function(albumName, callback){
  fs.readdir("./uploads/" + albumName, function(err, files){
    if(err){
      callback("没有找到uploads文件", null);
      return;
    }
    var allImages = [];
    (function iterator(i){
      if(i == files.length){
        callback(null, allImages);
        return;
      }
      fs.stat("./uploads/" + albumName + "/" + files[i], function(err, stats){
        if(err){
          callback("找不到文件" + files[i], null);
          return;
        }
        if(stats.isFile()){
          allImages.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0)
  })
}