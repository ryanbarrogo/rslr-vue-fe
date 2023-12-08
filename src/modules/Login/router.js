const Module = () => import("@/App.vue");
const Login = () => import("./views/Login.vue")

const moduleRoute = {
    path: "/login",
    component: Module,
    children: [
        {
            path: '',
            name: 'login',
            component: Login,
            meta: {
                not_for_authenticated: true
            }
        },
    ]
};

export default moduleRoute;