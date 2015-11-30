<nav-bar>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#/main">Riot Seed</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="{ active: active }" each="{ data }" onclick="{ choose }">
                        <a href="{ url }" >{ name }</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <script>
        var self = this;
        self.data = [
            {name: '聊天', url: '#/main', active: true},
            {name: '历史消息', url: '#/history', active: false},
            {name: '数据统计', url: '#/count', active: false},
            {name: '设置', url: '#/setting', active: false},
            {name: '管理', url: '#/admin', active: false},
        ]

        choose(e) {
            self.data.forEach(function(item) {
                item.active = false;
            });
            e.item.active = true;
            location.href = e.item.url;
        }
    </script>
</nav-bar>