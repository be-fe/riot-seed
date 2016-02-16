(function(global, riot) {
    var flux = {};
    var utils =  {
        extend: function(src, obj) {
            for (var key in obj) {
                if (!src[key]) {
                    src[key] = obj[key];
                }
            }
        },

        isType: function (type) {
            return function (obj) {
                return toString.call(obj) === '[object ' + type + ']';
            }
        }
    };

    utils.extend(utils, {
        isArray: utils.isType('Array'),
        isObject: utils.isType('Object'),
        isFunction: utils.isType('Function'),
        isElement: function (obj) {
            return toString.call(obj).indexOf('Element') !== -1;
        }
    });

    flux.createStore = function(obj) {
        if (utils.isObject(obj)) {
            return riot.observable(obj);
        }
        else {
            throw('createStore参数格式错误');
        }
    };

    flux.bind = flux.connect = function(options) {

        var self = this;
        var store = options.store;
        var property = options.name || options.property;
        var refresh = options.refresh;
        var params = options.params;

        var judgeBinded = function(result) {
            if (!store.judge) {
                options.success && options.success(result);
                store.judge = [];
                store.judge.push(self);
            }
            else if (store.judge || store.judge.indexOf(self) === -1 ) {
                options.success && options.success(result);
                store.judge.push(self);
            }
        };

        var onComplete = function(result) {
            store.status = 'complete';
            self[property] = store.data;
            judgeBinded(result);
            self.update();
        };

        var onError = function(err) {
            options.error && options.error(err);
        };

        store.on('complete', onComplete);
        store.on('error', onError);

        if (store.data && store.status === 'complete') {
            if (refresh !== true) {
                self[property] = store.data;
                judgeBinded();
                self.update();
            }
            else {
                flux.update(store, params);
            }
        }
        else {
            if (store.status !== 'getting') {
                flux.update(store, params);
            }
        }
    };

    flux.update = function(store, params) {
        if (store.get && utils.isFunction(store.get)) {
            store.status = 'getting';
            store.get(params);
        }
    };

    if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports) {
        module.exports = flux;
    }
    else if (typeof define === 'function' && define.amd) {
        define(function() { return (global.flux = flux) });
    }
    else {
        global.flux = flux;
    }

})(window, window.riot);

