import router from "@/router";

export function initRouteGuard() {
    router.beforeEach((to, from, next) => {
        const isLoggedIn = window.axios.defaults.headers.Authorization.indexOf('null') < 0;

        //Restrict access to protected routes if not logged in
        if (to.meta.requires_auth && !isLoggedIn) {
            router.push({name: 'landing'});
            return;
        }

        //Restrict access to Login page if user is logged in
        if (to.meta.not_for_authenticated && isLoggedIn) {
            router.push({name: 'dashboard'});
            return;
        }

        //Restrict access to non-existing routes if not logged in
        if (to.name === 'not-found' && !isLoggedIn) {
            router.push({name: 'landing'});
            return;
        }

        // if (to.meta.permission && localStorage.getItem('permissions') && localStorage.getItem('permissions').indexOf(to.meta.permission.split('_').join(' ').replace(/\w+/g,
        //     function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})) <= -1) {
        //     router.push({name: 'dashboard'})
        //     return
        // }

        next();
    })
}
