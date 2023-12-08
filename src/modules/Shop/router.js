const Module = () => import("./Module.vue");
const Shop = () => import("./views/Shop.vue")

const moduleRoute = {
    path: "/shop",
    component: Module,
    children: [
        {
            path: '',
            name: 'shop',
            component: Shop,
            meta: {
                not_for_authenticated: true
            }
        },
    ]
};

export default moduleRoute;