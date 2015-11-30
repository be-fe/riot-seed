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
        riot.tag('route', '', function(opts) {
            var self = this;
            function mountContent(route) {
                if (route && route.tag) {
                    var newDom = document.createElement(route.tag);
                    var parentNode = self.root.parentNode;
                    var testDoms = document.querySelectorAll(route.parent);
                    if ([].indexOf.call(testDoms, parentNode) > -1) {
                        self.tagObj = null;
                        self.root.innerHTML = '';
                        self.root.appendChild(newDom);
                        self.tagObj = riot.mount(newDom)[0];
                    };
                }
            }

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
                    }
                    if (matchCount === routes[i].args.length && matchCount === l) {
                        realMatchCount = l;
                        match = true;
                    }
                }
                
                if (matchArr.length) {
                    if (matchArr.length === 1 && match === true) {
                        mountContent(matchArr[0]);
                    }
                    else if (match === true) {
                        matchArr = matchArr.sort(orderBy('length'));
                        for (i = 0; i < realMatchCount; i++) {
                            mountContent(matchArr[i]);
                        }
                    }
                }

                extend(riot.routeParams, getParameterObj());

                if (!match) {
                    for (i = 0; i < routes.length; i++) {
                        if (routes[i].default) {
                            mountContent(routes[i]);
                        }
                    }
                }
            }
            self.on('mount', function() {
                if (!riot.testRoute) {
                    riot.route(testRoute);
                    riot.testRoute = true;
                }
                riot.route.exec(testRoute);
            });
            
        });
    }

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