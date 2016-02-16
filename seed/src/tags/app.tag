<main>
    <h1>hello {page.name}</h1>

    <script>
        var self = this;
        flux.bind(self, store.page, 'page');
    </script>
</main>