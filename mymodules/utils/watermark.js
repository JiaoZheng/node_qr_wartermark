var utils = {};
var fs = require('fs');
var qr = require('qr-image');
var images = require("images");
/** 
 * 根据地址生成二维码 
 * 参数 url(string) 地址 
 * 参数 callback(Function) 
 */
utils.createQr = (url, callback)=>{
    var qr_png = qr.image(url, {
        type: 'png',
        size: 8
    });
    var imgName = +(new Date()) + '' + Math.ceil(Math.random() * 89 + 10);
    imgName = `${imgName}.png`;
    var qr_pipe = qr_png.pipe(fs.createWriteStream(imgName));
    qr_pipe.on('error', function (err) {
        console.log(err);
        callback(err, null);
        return;
    })
    qr_pipe.on('finish', function () {
        callback(null, imgName);
    })
};

/** 
 * 给图片添加水印 
 * 参数 sourceImg(string) 原图片路径 
 * 参数 waterImg(string) 水印图片路径 
 * 参数 callback(Function) 
 */
utils.addWater = (sourceImg, waterImg, callback)=>{
    var newImg = +(new Date()) + '' + Math.ceil(Math.random() * 89 + 10);
    var lastput = `${newImg}.png`;
    images(sourceImg) //Load image from file   
        //加载图像文件  
        .size(1920, 1080)
        .draw(images(waterImg), 1431, 13)
        .save(lastput, {
            quality: 100 //保存图片到文件,图片质量为50  
        });
    callback(lastput);
};

module.exports = utils;