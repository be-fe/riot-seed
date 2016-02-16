<app-main>
    <h1>hello {page.name}</h1>
    <a href="#/somebody">goto hello somebody</a>

    <script>
        var self = this;
        flux.bind.call(self, {
            store: store.page,
            name: 'page'
        });

        store.page.setName('world');
    </script>
</app-main>