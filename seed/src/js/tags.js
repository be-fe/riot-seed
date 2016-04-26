//riot tags需要的依赖
import flux from 'riot-seed-flux';
import store from './store';
riot.tag2('app-main', '<h1>hello {page.name}</h1> <a href="#/somebody">goto hello somebody</a>', '', '', function(opts) {
        var self = this;
        flux.bind.call(self, {
            store: store.page,
            name: 'page'
        });

        store.page.setName('world');
});
riot.tag2('app-somebody', '<h1>hello {page.name}</h1> <a href="#/main">goto hello world</a>', '', '', function(opts) {
        var self = this;
        flux.bind.call(self, {
            store: store.page,
            name: 'page'
        });

        store.page.setName('somebody');
});
riot.tag2('nav-bar', '<div class="brand">Riot Seed</div> <ul> <li link="http://www.baidu.com">Riot官网</li> <li link="http://www.baidu.com">iToolkit</li> </ul>', '', '', function(opts) {
});