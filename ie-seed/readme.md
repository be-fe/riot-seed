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
    gulp example : 监听例子工程中.tag文件变更，并启动静态server
