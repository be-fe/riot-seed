## Riot Seed简介
### Riot版本
Riot seed 会一直保持一个Riot 2.2.4版本，这是最后一个宣称可兼容IE-8的release版本。并附带html5shim和es5shim。

随着Riot版本更新，会有一个和最新版Riot保持基本同步的版本。

### 功能介绍
riot: 核心包
riot-flux: 数据资源管理，让组件不再直接持有数据。
riot-route: 通过配置文件快速配置路由
html5shim: IE8下自定义tag兼容
es5shim: IE8下es5语法兼容
打包工具: webpack/gulp


### 命令行

    riotseed foldername --ie  //在当前目录创建基于2.2.4的IE兼容版本种子工程
    riotseed foldername      //在当前目录创建基于最新版本的种子工程