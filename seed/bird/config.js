//静态服务器配置，可同时配置多个，域名需host到127.0.0.1
exports.Server = {
    "8787": {
        //静态文件根目录
        "basePath": "../src"
        //忽略的静态文件请求，与此正则匹配的请求将直接走转发规则（可选配置）
        //,"ignoreRegExp":  /\/js\/urls\.js/g
    }
};
//转发规则——静态服务器没有响应的或者忽略的请求将根据一下规则转发
exports.TranspondRules = {
    "8787": {
        //目标服务器的ip和端口，域名也可，但注意不要被host了
        targetServer: {
            "host": "rest.implus.baidu.com",
            "port": "80"
        },
        //特殊请求转发，可选配置，内部的host、port和attachHeaders为可选参数
        regExpPath: {}
    },
    "ajaxOnly": false
};