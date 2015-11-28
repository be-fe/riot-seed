<chat-content>
    <div class="panel panel-default">
        <div class="panel-heading">聊天窗口</div>
        <div class="panel-body">
            <ul>
                <li each="{ data }">
                    
                    <div class="chat-cell {from: type==1, to: type==2 }">
                        <img class="chat-avatar" src="imgs/default_user_avatar.png">
                        <span class="chat-wrap">{ content }</span>
                    </div><div class="clearfix"></div>
                </li>
            </ul>
        </div>
    </div>
    
    <script>
        var self = this;
        flux.bind.call(this, store.chatContent, 'data', {id : 1});
    </script>
</chat-content>