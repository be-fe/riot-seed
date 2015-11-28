riotRouter({
    'app': [
        { route: 'main', tag: 'chat', default: true },
        { route: 'login', tag: 'login'},
        { route: 'history', tag: 'history'},
        { route: 'count', tag: 'count'},
        { route: 'setting', tag: 'setting'},
        { route: 'admin', tag: 'admin'},
    ],
    'history' : [
        { route: 'history/:id', tag: 'history-detail', depend: 'history'}
    ]
});


