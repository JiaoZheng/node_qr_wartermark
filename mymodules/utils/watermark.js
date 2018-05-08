var utils = {};
var fs = require("fs");
var qr = require("qr-image");
var images = require("images");
/**
 * 业务场景介绍：
 * 用户通过App点击分享按钮，分享到朋友圈、发给好友的分享图片（包含文字内容与二维码，二维码中包含分享人的推荐码）
 * 功能调用：
 * 用户点击分享按钮后，调用后台（这里先用Node实现一番）,根据分享人的用户fid，查询数据库对应的推荐码，对商城的地址链接进行拼接，然后生成携带动态推荐码的二维码
 * 后台代码调用静资源，取图片，以二维码的方式在静态资源图片的合适位置添加水印，生成新的图片，保存并传给微信调用接口。
 * 为了防止用户多次点击，对服务器空间产生冗余文件，可以针对同一fid或者同一推荐码二次调用的形式，实现一图多次用。（查询和多次调用就交给Java那边了）
 *
 * @param {url} callback
 */

/**
 * 根据地址生成二维码
 * 参数 url(string) 地址
 * 参数 callback(Function)
 */
utils.createQr = (url, callback) => {
  var qr_png = qr.image(url, {
    type: "png",
    size: 9 //生成二维码的大小，支持非0正整数
  });
  //   给生成的二维码图片定义name
  var imgName = +new Date() + "" + Math.ceil(Math.random() * 89 + 10);
  imgName = `${imgName}.png`;
  //   管道流创建
  var qr_pipe = qr_png.pipe(fs.createWriteStream(imgName));
  qr_pipe.on("error", err => {
    console.log(err);
    callback(err, null);
    return;
  });
  //   监听结束事件，返回新创建的二维码图片的name
  qr_pipe.on("finish", () => {
    callback(null, imgName);
  });
};

/**
 * 给图片添加水印
 * 参数 sourceImg(string) 原图片路径
 * 参数 waterImg(string) 水印图片路径
 * 参数 callback(Function)
 */
utils.addWater = (sourceImg, waterImg, callback) => {
  var newImg = +new Date() + "" + Math.ceil(Math.random() * 89 + 10);
  var lastput = `${newImg}.png`;
  images(sourceImg)
    .size(750, 1334)
    .draw(images(waterImg), 173, 711)
    .save(lastput, {
      quality: 50 //保存图片到文件,图片质量为50,图片质量直接决定新的图片所占用的空间
    });
  callback(lastput);
};

module.exports = utils;
