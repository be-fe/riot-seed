(function(global, riot) {
    //bug: 子级不匹配的情况下不会跳转到default

    riot.routeParams = {};

    var extend = function(src, obj) {
        for (var key in obj) {
            if (!src[key]) {
                src[key] = obj[key];
            }
        }
    };

    var getParameterObj = function(urlStr) {
        var obj = {};
        var url = urlStr || location.href;
        var len = url.length;
        var offset = url.indexOf("?") + 1;
        var str = url.substr(offset, len);
        var args = str.split("&");
        len = args.length;
        for (var i = 0; i < len; i++) {
            str = args[i];
            var arg = str.split("=");
            if (args.length <= 1) break;
            else {
                obj[arg[0]] = arg[1]
            }
        }
        return obj;
    };

    var riotRouter = function(obj) {
        /*
         * 获取所有注册的routes信息
         */
        var routes = [];
        for (var i in obj) {
            for (var j = 0; j < obj[i].length; j++) {
                var route = obj[i][j].route;
                var tag = obj[i][j].tag;
                var def = obj[i][j]["default"];
                var args = route.split('/')
                for (k = 0; k < args.length; k++) {
                    if (!args[k]) {
                        args.splice(k, 1);
                    }
                }
                routes.push({ route: route, args: args, parent: i, tag: tag, default: def, length: args.length });
            }
        }


        /*
         * 设置一个名为route的组件，当触发路由规则时，使用config中的tag替换这个占位标签
         */
        riot.tag2('route', '', '', '', function(opts) {
            var self = this;

            /*
             * 将对应的tag插入route标签内
             */
            function mountContent(route, fresh) {
                //通过firstChild的tagName判断，如果发现已经mount了，则不进行重新mount.
                //fresh参数用于强行刷新，不受firstChild的限制
                var firstChild = self.root.firstElementChild;
                if (firstChild) {
                    var firstChildTagName = firstChild.tagName;
                }
                if (route && route.tag && route.tag.toUpperCase() !== firstChildTagName || fresh) {
                    
                    var newDom = document.createElement(route.tag);
                    var parentNode = self.root.parentNode;
                    var testDoms = document.querySelectorAll(route.parent);
                    if ([].indexOf.call(testDoms, parentNode) > -1) {
                        self.root.innerHTML = '';
                        self.root.appendChild(newDom);
                        self.tagObj = riot.mount(newDom)[0];
                    };
                }
            }

            /*
             * 根据字段的值对obj进行排序
             */
            function orderBy(name) {
                return function(obj1, obj2) {
                    var v1 = obj1[name];
                    var v2 = obj2[name];
                    if (v1 < v2) {
                        return -1;
                    }
                    else if (v1 > v2) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                };
            }

            /*
             * 将url与路由表进行匹配
             */
            function testRoute() {
                var argArr = [];
                var matchArr = [];
                var realMatchCount = 0;
                var match;
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i]) {
                        arguments[i] = arguments[i].replace(/\?[^\?]+/, '');
                        argArr.push(arguments[i]);
                    };
                };

                for (i = 0; i < routes.length; i++) {
                    var l = argArr.length;
                    var matchCount = 0;
                    for (j = 0; j < routes[i].args.length; j++) {
                        var arg = routes[i].args[j];
                        if (arg) {
                            var matchParams = arg.match(/^:\w+/);
                        }
                        if (arg && arg !== '*' && !matchParams) {
                            if (arg === argArr[j]) {
                                matchCount++
                            }
                        }
                        else {
                            matchCount++
                            if (arg && matchParams) {
                                var paramsKey = matchParams[0].replace(':', '');
                                var paramsValue = argArr[j]
                                riot.routeParams[paramsKey] = paramsValue;
                            }
                        }
                        
                    }
                    if (matchCount === routes[i].args.length) {
                        matchArr.push(routes[i])
                        //表示部分匹配成功，例如#/test/1 同时匹配到了 /test 和 /test/:id
                    }
                    if (matchCount === routes[i].args.length && matchCount === l) {
                        //当匹配长度===url事件长度时，完全匹配。
                        realMatchCount = l;
                        match = true;
                    }
                }
                
                if (matchArr.length === 1 && match === true) {
                    mountContent(matchArr[0], true);
                }
                else if (match === true) {
                    //根据长度重新排序：/test, /test/user, /test/user/1, 根据顺序依次mount
                    matchArr = matchArr.sort(orderBy('length'));
                    for (i = 0; i < realMatchCount; i++) {
                        //完全匹配到的那一项，需要强制刷新。
                        if (i === (l - 1)) {
                            mountContent(matchArr[i], true);
                        }
                        else {
                            mountContent(matchArr[i]);
                        }
                    }
                }

                extend(riot.routeParams, riot.route.query());

                // 如果没有匹配成功，寻找是否存在default参数的路由，如果存在，则使用default
                if (!match) {
                    for (i = 0; i < routes.length; i++) {
                        if (routes[i].default) {
                            mountContent(routes[i]);
                        }
                    }
                }
            }
            self.on('mount', function() {
                if (!riot.testRoutes) {
                    riot.testRoutes = [];
                    riot.route(testRoute);
                    riot.testRoutes.push(testRoute);
                }
                else if (riot.testRoutes.indexOf(testRoute) === -1){
                    riot.route(testRoute);
                    riot.testRoutes.push(testRoute);
                }
                riot.route.exec();
            });
            
        }, '{}');
    }

    riot.route.start();

    if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports) {
        module.exports = riotRouter;
    }
    else if (typeof define === 'function' && define.amd) {
        define(function() { return (global.riotRouter = riotRouter) });
    }
    else {
        global.riotRouter = riotRouter;
    }

})(window, window.riot);