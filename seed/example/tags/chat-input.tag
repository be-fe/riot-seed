<chat-input>
    <div class="panel panel-default">
        <div class="panel-body">
            <form>
                <textarea id="chat-textarea" class="form-control chat-textarea" rows="3" placeholder="Textarea"></textarea>
                <button class="btn btn-primary chat-submit" onclick="{ submitData }">提 交</button>
            </form>
        </div>
    </div>

    submitData(e) {
        e.preventDefault();
        var textarea = document.getElementById('chat-textarea');
        var value = textarea.value;
        if (value) {
            store.chatContent.append({type: 1, content: value, name: 'robot'});
        }
    }
</chat-input>