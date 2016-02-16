riot.tag2('main', '<h1>hello {page.name}</h1>', '', '', function(opts) {
        var self = this;
        flux.bind(self, store.page, 'page');
}, '{ }');
riot.tag2('nav-bar', '<div class="brand">Riot Seed</div> <ul> <li link="http://www.baidu.com">Riot官网</li> <li link="http://www.baidu.com">iToolkit</li> <li link="http://www.baidu.com">Riot官网</li> <li link="http://www.baidu.com">Riot官网</li> <li link="http://www.baidu.com">Riot官网</li> </ul>', '', '', function(opts) {
});