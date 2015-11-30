riot.tag2('chat-content', '<div class="panel panel-default"> <div class="panel-heading">聊天窗口</div> <div class="panel-body"> <ul> <li each="{data}"> <div class="chat-cell {from: type==1, to: type==2}"> <img class="chat-avatar" src="imgs/default_user_avatar.png"> <span class="chat-wrap">{content}</span> </div><div class="clearfix"></div> </li> </ul> </div> </div>', '', '', function(opts) {
        var self = this;
        flux.bind.call(this, store.chatContent, 'data', {id : 1});
}, '{ }');
riot.tag2('chat-input', '<div class="panel panel-default"> <div class="panel-body"> <form> <textarea id="chat-textarea" class="form-control chat-textarea" rows="3" placeholder="Textarea"></textarea> <button class="btn btn-primary chat-submit" onclick="{submitData}">提 交</button> </form> </div> </div>', '', '', function(opts) {

    this.submitData = function(e) {
        e.preventDefault();
        var textarea = document.getElementById('chat-textarea');
        var value = textarea.value;
        if (value) {
            store.chatContent.append({type: 1, content: value, name: 'robot'});
        }
    }.bind(this)
}, '{ }');
riot.tag2('chat', '<div class="container-fluid"> <div class="row"> <contacts class="col-xs-3"></contacts> <div class="col-xs-6"> <chat-content></chat-content> <chat-input></chat-input> </div> <div class="col-xs-3"> <contact-msg></contact-msg> </div> </div> </div>', '', '', function(opts) {
});
riot.tag2('contact-msg', '<div class="panel panel-default"> <div class="panel-heading">联系人信息</div> <div class="panel-body"> <p>这里是{data.name}的信息</p> <dt>id: </dt><dd>{data.id}</dd> <dt>name: </dt><dd>{data.name}</dd> <dt>nickname: </dt><dd>{data.nickname}</dd> <dt>count: </dt><dd>{data.count}</dd> </div> </div>', '', '', function(opts) {

    flux.bind.call(this, store.msg, 'data');
}, '{ }');
riot.tag2('contacts', '<div class="panel panel-default"> <div class="panel-heading">排队列表</div> <div class="panel-body"> <ul class="list-group"> <li class="list-group-item {active: item.active}" each="{item, i in queue}" onclick="{handleQueue}"> <span class="badge">{item.count}</span> {item.name} </li> </ul> <h5 if="{!queue.length}">队列为空</h5> </div> </div> <div class="panel panel-default"> <div class="panel-heading">会话列表</div> <div class="panel-body"> <ul class="list-group"> <li class="list-group-item {active: item.active}" each="{item, i in data}" onclick="{changeContent}"> <span class="badge" if="{!item.active}">{item.count}</span> {item.name} </li> </ul> </div> </div>', '', '', function(opts) {
        var self = this;
        flux.bind.call(this, store.contacts, 'data');
        flux.bind.call(this, store.queue, 'queue');

        self.on('flux-binded', function(property) {
            if (property === 'data') {
                self.data[0].active = true;
                store.msg.get(self.data[0]);
                self.update();
            }
        })

        this.changeContent = function(e) {
            flux.update(store.chatContent, {id: e.item.item.id});
            for (i = 0; i < self.data.length; i++) {
                if (self.data[i].id === e.item.item.id) {
                    self.data[i].active = true;
                    store.msg.get(self.data[i]);
                }
                else {
                    self.data[i].active = false;
                }
            }

            self.update();
        }.bind(this)

        this.handleQueue = function(e) {
            store.queue.delete(e.item.item.id);
            e.item.item.active = true;
            for (i = 0; i < self.data.length; i++) {
                self.data[i].active = false;
            }
            store.contacts.insertBefore(e.item.item);
            store.msg.get(e.item.item);
            flux.update(store.chatContent, {id: e.item.item.id});
        }.bind(this)
}, '{ }');
riot.tag2('count', '<div class="col-xs-3"> <div class="panel panel-default"> <div class="panel-heading">历史数据列表</div> <div class="panel-body"> <ul> <a href="#count/pillar" class="list-group-item">柱状图</a> <a href="#count/pie" class="list-group-item">饼状图</a> <a href="#count/brokenline" class="list-group-item">折线图</a> </ul> </div> </div> </div> <route class="col-xs-8"></route>', '', '', function(opts) {
});
riot.tag2('history-detail', '<div class="panel panel-default"> <div class="panel-heading">历史数据详情</div> <div class="panel-body"> 这里是<b>{mounth}</b>月历史数据详情 </div> </div>', '', '', function(opts) {

    var self = this;
    self.mounth = riot.routeParams.id;
    riot.route(function() {
        self.mounth = riot.routeParams.id;
        self.update();
    })

}, '{ }');
riot.tag2('history-show', '<div class="panel panel-default"> <div class="panel-heading">历史数据总览</div> <div class="panel-body"> 这里是历史数据总览 </div> </div>', '', '', function(opts) {
});
riot.tag2('history', '<div class="col-xs-3"> <div class="panel panel-default"> <div class="panel-heading">历史数据列表</div> <div class="panel-body"> <ul> <a href="#history/show" class="list-group-item">历史数据总览</a> <a href="#history/1" class="list-group-item">1月数据</a> <a href="#history/2" class="list-group-item">2月数据</a> <a href="#history/3" class="list-group-item">3月数据</a> <a href="#history/4" class="list-group-item">4月数据</a> <a href="#history/5" class="list-group-item">5月数据</a> <a href="#history/6" class="list-group-item">6月数据</a> </ul> </div> </div> </div> <route class="col-xs-8"></route>', '', '', function(opts) {
});
riot.tag2('login', '<form> <input type="text"> <input type="password"> <input type="submit" value="登 录"> </form>', '', '', function(opts) {
});
riot.tag2('nav-bar', '<nav class="navbar navbar-default"> <div class="container-fluid"> <div class="navbar-header"> <a class="navbar-brand" href="#/main">Riot Seed</a> </div> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li class="{active: active}" each="{data}" onclick="{choose}"> <a href="{url}">{name}</a> </li> </ul> </div> </div> </nav>', '', '', function(opts) {
        var self = this;
        self.data = [
            {name: '聊天', url: '#/main', active: true},
            {name: '历史消息', url: '#/history', active: false},
            {name: '数据统计', url: '#/count', active: false},
            {name: '设置', url: '#/setting', active: false},
            {name: '管理', url: '#/admin', active: false},
        ]

        this.choose = function(e) {
            self.data.forEach(function(item) {
                item.active = false;
            });
            e.item.active = true;
            location.href = e.item.url;
        }.bind(this)
}, '{ }');