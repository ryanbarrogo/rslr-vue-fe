const Module = () => import("./Module.vue");
const DashBoard = () => import("./views/DashBoard.vue")
const Actions = () => import("./views/Actions.vue")

const moduleRoute = {
    path: "/dashboard",
    component: Module,
    children: [
        {
            path: '',
            name: 'dashboard',
            component: DashBoard,
            meta: {
                requires_auth: true
            }
        },
        {
            path: 'actions',
            name: 'dashboard-actions',
            component: Actions,
            meta: {
                requires_auth: true
            }
        },
    ]
};

export default moduleRoute;