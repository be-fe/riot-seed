import riotRouter from 'riot-seed-router';

riotRouter({
    'app': [
        { route: '/main', tag: 'app-main', default: true },
        { route: '/somebody', tag: 'app-somebody' }
    ]
});