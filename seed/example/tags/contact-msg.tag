<contact-msg>
    <div class="panel panel-default">
        <div class="panel-heading">联系人信息</div>
        <div class="panel-body">
            <p>这里是{ data.name }的信息</p>
            <dt>id: </dt><dd>{ data.id }</dd>
            <dt>name: </dt><dd>{ data.name }</dd>
            <dt>nickname: </dt><dd>{ data.nickname }</dd>
            <dt>count: </dt><dd>{ data.count }</dd>
        </div>
    </div>

    flux.bind.call(this, store.msg, 'data');
</contact-msg>