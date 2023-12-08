const Module = () => import("./Module.vue");
const Landing = () => import("./views/Landing.vue")

const moduleRoute = {
    path: "/",
    component: Module,
    children: [
        {
            path: '',
            name: 'landing',
            component: Landing,
            meta: {
                not_for_authenticated: true
            }
        },
    ]
};

export default moduleRoute;