var utils = require('./mymodules/utils/watermark');
var async = require('async');

var task1 = function (callback) {
    var url = 'http://www.hanyuan365.com/index.html?promotionCode=980812&time=1525767002853';
    utils.createQr(url, function (err, data) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, data);
    })
};

var task2 = function (waterImg, callback) {
    //原图  
    var sourceImg = '1.png';
    utils.addWater(sourceImg, waterImg, function (data) {
        callback(null, data);
    })
};

async.waterfall([task1, task2], function (err, result) {    
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
})