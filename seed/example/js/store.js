var store = {};
store.contacts = flux.createStore({
    get: function(params) {
        var self = this;
        utils.httpGet('data/contacts.json', {}, function(data) {
            self.data = data.data;
            self.trigger('complete');
        });
    },

    insertBefore: function(data) {
        console.log(data);
        if (utils.isArray(data)) {
            this.data = data.concat(this.data);
        }
        else if (utils.isObject(data)) {
            this.data.unshift(data);
        }
        this.trigger('complete');
    }
});

store.queue = flux.createStore({
    get: function(params) {
        var self = this;
        utils.httpGet('data/queue.json', {}, function(data) {
            self.data = data.data;
            self.trigger('complete');
        });
    },
    delete: function(id) {
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                this.data.splice(i, 1);
            }
        }
        this.trigger('complete');
    }
});

store.chatContent = flux.createStore({
    get: function(params) {
        var self = this;
        utils.httpGet('data/chatContent' + params.id +'.json', {}, function(data) {
            self.data = data.data;
            self.trigger('complete', 'a');
        });
    },

    append: function(data) {
        if (utils.isArray(data)) {
            this.data.concat(data);
        }
        else if (utils.isObject(data)) {
            this.data.push(data);
        }
        this.trigger('complete');
    }, 

    empty: function() {
        this.data = [];
        this.trigger('complete');
    }
});

store.msg = flux.createStore({
    get: function(params) {
        this.data = params;
        this.trigger('complete');
    }
});