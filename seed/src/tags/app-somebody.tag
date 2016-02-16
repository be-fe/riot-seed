<app-somebody>
    <h1>hello {page.name}</h1>
    <a href="#/main">goto hello world</a>

    <script>
        var self = this;
        flux.bind.call(self, {
            store: store.page,
            name: 'page'
        });

        store.page.setName('somebody');
    </script>
</app-somebody>