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

    flux.bind = flux.connect = function(store, property, params) {
        var self = this;
        var judgeBinded = function() {
            if (!store.judge || store.judge.indexOf(self) === -1 ) {
                self.trigger('flux-binded', property);
                store.judge = [];
                store.judge.push(self);
            }
        }
        var onComplete = function() {
            store.status = 'complete';
            self[property] = store.data;
            judgeBinded();
            self.update();
        }
        if (store.data && store.status === 'complete') {
            self[property] = store.data;
            judgeBinded()
            self.update();
        }
        else {
            if (store.status !== 'getting') {
                flux.update(store, params);
            }
        }
        store.on('complete', onComplete);
    };

    flux.update = function(store, params) {
        if (store.get && utils.isFunction(store.get)) {
            store.status = 'getting'
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

