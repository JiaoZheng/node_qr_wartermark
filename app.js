var utils = require('./mymodules/utils/watermark');
var async = require('async');


var task1 = (callback) => {
    var url = 'http://www.hanyuan365.com/index.html?promotionCode=980812&time=1525767002853';
    utils.createQr(url, (err, data) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, data);
    })
};


var task2 = (waterImg, callback) => {
    //原图  
    var sourceImg = '1.png';
    utils.addWater(sourceImg, waterImg, (data) => {
        callback(null, data);
    })
};

// async waterfall 依次调用执行
async.waterfall([task1, task2], (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
})