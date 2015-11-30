riotRouter({
    'app': [
        { route: '/main', tag: 'chat', default: true },
        { route: '/login', tag: 'login'},
        { route: '/history', tag: 'history'},
        { route: '/count', tag: 'count'},
        { route: '/setting', tag: 'setting'},
        { route: '/admin', tag: 'admin'},
    ],
    'history' : [
        { route: '/history/show', tag: 'history-show'},
        { route: '/history/:id', tag: 'history-detail'}
    ],
    'count' : [
        {route: '/count/pillar', tag: 'count-pillar'},
        {route: '/count/pie', tag: 'count-pie'},
        {route: '/count/brokenline', tag: 'count-brokenline'}
    ]
});


