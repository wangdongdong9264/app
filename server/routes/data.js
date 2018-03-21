var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

/**
 * @description 读取数据模块，供客户端调用
 * /data/read?type=it
 */

router.get('/read', function (req, res, next) {
    var type = req.param('type') || '';
    fs.readFile(PATH + type + '.json', (err, data) => {
        if (err) {
            return res.send({
                status: 0,
                info: '读取文件出现异常'
            });
        }
        const COUNT = 50;
        var obj = [];
        try {
            obj = JSON.parse(data.toString());
        } catch (e) {
            obj = [];
        }
        if (obj.length > COUNT) {
            obj = obj.slice(0, COUNT);
        }
        return res.send({
            status: 1,
            data: obj
        })
    })
})


/**
 * @description 数据写入模块
 */

router.post('/write', (req, res, next) => {
    if (!req.session.user) {
        return res.send({
            status:0,
            info:'未鉴权认证'
        })
    }
    // 文件名
    let type = req.param('type') || '';
    // 关键字
    let url = req.param('url') || '';
    let title = req.param('title') || '';
    let img = req.param('img') || '';
    if (!url || !title || !img || !type) {
        return res.send({
            status: 0,
            info: '提交的字段不全'
        })
    }

    // readFile
    const filePath = PATH + type + '.json';
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.send({
                status: 0,
                info: '读取文件失败'
            })
        }
        var arr = JSON.parse(data.toString());
        var obj = {
            img: img,
            url: url,
            title: title,
            id: guidGenerate(),
            time: new Date()
        };
        arr.splice(0, 0, obj)

        // writeFile
        var newData = JSON.stringify(arr);
        fs.writeFile(filePath, newData, (err) => {
            if (err) {
                return res.send({
                    status: 0,
                    info: '写入数据失败'
                })
            }
            return res.send({
                status: 1,
                info: obj
            })
        })
    })
})

/**
 * @description 阅读模块写入接口
 */
router.post('/write_config', (req, res, next) => {
    if (!req.session.user) {
        return res.send({
            status:0,
            info:'未鉴权认证'
        })
    }
    //  防止xss攻击
    //  npm install xss
    let data = req.body.data;

    let obj = JSON.parse(data);
    let newData = JSON.stringify(obj);
    fs.writeFile(PATH + 'config.json', newData, (err) => {
        if (err) {
            return res.send({
                status: 0,
                info: '写入数据失败'
            })
        }
        return res.send({
            status: 1,
            info: obj
        })
    })
})

/**
 * @description 登陆接口
 * 
 */
router.post('/login', (req, res, next) => {
    // 用户名，密码验证码
    let username = req.body.username;
    let password = req.body.password;
    //TODO ：对用户名、密码进行校验
    //xss处理、判空

    //密码加密 md5(md5(password + '随机字符串'))
    //密码需要加密－> 可以写入JSON文件
    if(username==='admin'&&password==='123456'){
        req.session.user={
            username:username
        }
        return res.send({
            status:1
        })
    }
    return res.send({
        status:0,
        info:'登陆失败'
    })
})

//guid
function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

module.exports = router;