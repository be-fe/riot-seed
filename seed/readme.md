## Riot Seed简介
### Riot版本
Riot seed 会一直保持一个Riot 2.2.4版本，这是最后一个宣称可兼容IE-8的release版本。并附带html5shim和es5shim。

随着Riot版本更新，会有一个和最新版Riot保持基本同步的版本。

### 功能介绍
- riot: 核心包
- riot-flux: 数据资源管理，让组件不再直接持有数据。
- riot-route: 通过配置文件快速配置路由
- html5shim: IE8下自定义tag兼容
- es5shim: IE8下es5语法兼容
- 打包工具: gulp
- 代理工具: bird
- 测试工具: 待定
- 测试数据生成器：待定

### 安装和使用

    npm install riot-seed -g  //全局安装，安装后可以通过命令行快速创建项目

    riotseed foldername --ie  //在当前目录创建基于2.2.4的IE兼容版本种子工程
    riotseed foldername      //在当前目录创建基于最新版本的种子工程
    (当前版本采用的是shell脚本，无法在windows下运行)

项目创建成功后使用：

    gulp :         监听.tag文件的变更，并启动静态server
    gulp dist :    项目打包

### Riot-flux使用指南

第一步，使用flux.createStore(options) API创建store, 每一个store对应一个数据资源

    
    import flux from 'riot-seed-flux'
    var store = flux.createStore(options)

第二步， 数据的获取，options必须拥有一个get方法：
    
    options.get = function(params) {
        var self = this;
        $.ajax({
            ...
            data: params,
            success: function(result) {
                self.data = result.data;     //把数据赋值给options.data
                self.trigger('complete');    //options抛出'complete'事件
            },
            error: function(err) {
                self.trigger('error');    ////错误时抛出'error'事件
            }
        })
    }
    
第三步， 编写其他数据处理方法
    
    options.unshift = function(params) {
        if (isArray(this.data) && !isArray(params)) {
            this.data.unshift(params);
        }
        if (isArray(options.data) && isArray(params)) {
            this.data = params.concat(this.data);
        }
        this.trigger('complete');    //每次处理结束后都要抛出'complete'事件
    }  
    
第四步，将store和组件中的属性进行绑定

    flux.bind.call(this, {
        store: store, 
        name: 'data', 
        params: {id: 1},
        refresh: true,
        success: function() { //绑定成功后的回调 },
        error: function() { //绑定失败后的回调, 需要在get方法中trigger('error')才会触发。 }
    });
    
- 使用JS中的call/apply方法，将上下文转为组件内， 
- store即为我们刚刚创建的store对象
- name是组件中的属性值, key也可以使用property.
- params是提供给get方法的参数，
- refresh是判断每次绑定的时候是否强制执行get方法，默认一个资源如果已经被请求，再次bind的时候会使用上次的数据，设为true的时候则会每次bind都更新数据。
- success是绑定成功的回调
- error是绑定失败的回调

第五步，bind以后，在任何地方使用`store.unshift(params); store.get(params);` 等之前定义的方法来修改数据，那么跟这个数据资源相关的视图都会被修改。


### Riot-router使用
在页面/组件中进行如下调用：

    <app>
        <route></route>
    </app>
根据配置和url，会把对应的组件mount到对应的<route>标签内 
使用 riotRouter(options) 语法:  
    
    import riotRouter from 'riot-seed-router'
    riotRouter({
        'app': [
            { route: '/main', tag: 'chat', default: true },
            { route: '/login', tag: 'login'},
            { route: '/history', tag: 'history'},
            { route: '/count', tag: 'count'},
            { route: '/setting', tag: 'setting'},
            { route: '/admin', tag: 'admin'},
        ],
        'history' : [
            { route: '/history/show', tag: 'history-show'},
            { route: '/history/:id', tag: 'history-detail'}
        ],
        'count' : [
            {route: '/count/pillar', tag: 'count-pillar'},
            {route: '/count/pie', tag: 'count-pie'},
            {route: '/count/brokenline', tag: 'count-brokenline'}
        ]
    });
    
数组前的key是指父元素的选择器