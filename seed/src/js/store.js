var store = {};
store.page = flux.createStore({
    get: function() {
        this.data = {
            name: 'world'
        };
        this.trigger('complete');
    },

    setName: function(name) {
        this.data.name = name;
        this.trigger('complete');
    }
});
