<history-detail>
    <div class="panel panel-default">
        <div class="panel-heading">历史数据详情</div>
        <div class="panel-body">
            这里是<b>{ mounth }</b>月历史数据详情
        </div>
    </div>

    var self = this;
    self.on('mount', function() {
        self.mounth = riot.routeParams.id;
        self.update();
    })
    
</history-detail>