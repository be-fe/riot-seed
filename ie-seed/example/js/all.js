riot.tag('chat-content', '<div class="panel panel-default"> <div class="panel-heading">聊天窗口</div> <div class="panel-body"> <ul> <li each="{ data }"> <div class="chat-cell {from: type==1, to: type==2 }"> <img class="chat-avatar" src="imgs/default_user_avatar.png"> <span class="chat-wrap">{ content }</span> </div><div class="clearfix"></div> </li> </ul> </div> </div>', function(opts) {
        var self = this;
        flux.bind.call(this, {
            store: store.chatContent,
            name:'data',
            params:{id : 1}
        });
    
});
riot.tag('chat-input', '<div class="panel panel-default"> <div class="panel-body"> <form> <textarea id="chat-textarea" class="form-control chat-textarea" rows="3" placeholder="Textarea"></textarea> <button class="btn btn-primary chat-submit" onclick="{ submitData }">提 交</button> </form> </div> </div>', function(opts) {

    this.submitData = function(e) {
        e.preventDefault();
        var textarea = document.getElementById('chat-textarea');
        var value = textarea.value;
        if (value) {
            store.chatContent.append({type: 1, content: value, name: 'robot'});
        }
    }.bind(this);

});
riot.tag('chat', '<div class="container-fluid"> <div class="row"> <contacts class="col-xs-3"></contacts> <div class="col-xs-6"> <chat-content></chat-content> <chat-input></chat-input> </div> <div class="col-xs-3"> <contact-msg></contact-msg> </div> </div> </div>', function(opts) {

});
riot.tag('contact-msg', '<div class="panel panel-default"> <div class="panel-heading">联系人信息</div> <div class="panel-body"> <p>这里是{ data.name }的信息</p> <dt>id: </dt><dd>{ data.id }</dd> <dt>name: </dt><dd>{ data.name }</dd> <dt>nickname: </dt><dd>{ data.nickname }</dd> <dt>count: </dt><dd>{ data.count }</dd> </div> </div>', function(opts) {
        flux.bind.call(this, {
            store: store.msg,
            name: 'data'
        });
    
});
riot.tag('contacts', '<div class="panel panel-default"> <div class="panel-heading">排队列表</div> <div class="panel-body"> <ul class="list-group"> <li class="list-group-item {active: item.active}" each="{ item, i in queue }" onclick="{ handleQueue }"> <span class="badge">{ item.count }</span> { item.name } </li> </ul> <h5 if="{ !queue.length }">队列为空</h5> </div> </div> <div class="panel panel-default"> <div class="panel-heading">会话列表</div> <div class="panel-body"> <ul class="list-group"> <li class="list-group-item {active: item.active}" each="{ item, i in data }" onclick="{ changeContent }"> <span class="badge" if="{ !item.active }">{ item.count }</span> { item.name } </li> </ul> </div> </div>', function(opts) {
        var self = this;
        flux.bind.call(this, {
            store: store.contacts,
            name: 'data',
            success: function() {
                self.data[0].active = true;
                store.msg.get(self.data[0]);
                self.update();
            }
        });

        flux.bind.call(this, {
            store: store.queue,
            name: 'queue'
        });







        
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
        }.bind(this);

        this.handleQueue = function(e) {
            store.queue.delete(e.item.item.id);
            e.item.item.active = true;
            for (i = 0; i < self.data.length; i++) {
                self.data[i].active = false;
            }
            store.contacts.insertBefore(e.item.item);
            store.msg.get(e.item.item);
            flux.update(store.chatContent, {id: e.item.item.id});
        }.bind(this);
    
});
riot.tag('content', '<contacts></contacts> <chat-content></chat-content> <route></route>', function(opts) {

});
riot.tag('history-detail', '<div class="panel panel-default"> <div class="panel-heading">历史数据详情</div> <div class="panel-body"> 这里是<b>{ mounth }</b>月历史数据详情 </div> </div>', function(opts) {

    var self = this;
    self.on('mount', function() {
        self.mounth = riot.routeParams.id;
        self.update();
    })
    

});
riot.tag('history-show', '<div class="panel panel-default"> <div class="panel-heading">历史数据总览</div> <div class="panel-body"> 这里是历史数据总览 </div> </div>', function(opts) {

});
riot.tag('history', '<div class="col-xs-3"> <div class="panel panel-default"> <div class="panel-heading">历史数据列表</div> <div class="panel-body"> <ul> <a href="#history/show" class="list-group-item">历史数据总览</a> <a href="#history/1" class="list-group-item">1月数据</a> <a href="#history/2" class="list-group-item">2月数据</a> <a href="#history/3" class="list-group-item">3月数据</a> <a href="#history/4" class="list-group-item">4月数据</a> <a href="#history/5" class="list-group-item">5月数据</a> <a href="#history/6" class="list-group-item">6月数据</a> </ul> </div> </div> </div> <route class="col-xs-8"></route>', function(opts) {

});
riot.tag('login', '<form> <input type="text"> <input type="password"> <input type="submit" value="登 录"> </form>', function(opts) {

});
riot.tag('nav-bar', '<nav class="navbar navbar-default"> <div class="container-fluid"> <div class="navbar-header"> <a class="navbar-brand" href="#/main">Riot Seed</a> </div> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li class="active"><a href="#/main?a=1">聊天</a></li> <li><a href="#/history">历史消息</a></li> <li><a href="#/count">数据统计</a></li> <li><a href="#/setting">设置</a></li> <li><a href="#/admin">管理</a></li> </ul> </div> </div> </nav>', function(opts) {
        
    
});