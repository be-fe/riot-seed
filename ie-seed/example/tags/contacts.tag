<contacts>
    <div class="panel panel-default">
        <div class="panel-heading">排队列表</div>
        <div class="panel-body">
            <ul class="list-group">
                <li class="list-group-item {active: item.active}" each="{ item, i in queue }" onclick="{ handleQueue }">
                    <span class="badge">{ item.count }</span>
                    { item.name }
                </li>
            </ul>
            <h5 if={ !queue.length }>队列为空</h5>
        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">会话列表</div>
        <div class="panel-body">
            <ul class="list-group">
                <li class="list-group-item {active: item.active}" each="{ item, i in data }" onclick="{ changeContent }">
                    <span class="badge" if="{ !item.active }">{ item.count }</span>
                    { item.name }
                </li>
            </ul>
        </div>
    </div>


    <script>
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
        
        changeContent(e) {
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
        }

        handleQueue(e) {
            store.queue.delete(e.item.item.id);
            e.item.item.active = true;
            for (i = 0; i < self.data.length; i++) {
                self.data[i].active = false;
            }
            store.contacts.insertBefore(e.item.item);
            store.msg.get(e.item.item);
            flux.update(store.chatContent, {id: e.item.item.id});
        }
    </script>
</contacts>