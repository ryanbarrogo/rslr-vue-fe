import router from "./router";

/* Import Modules Here */
import loginModule from "@/modules/Login";
import dashBoardModule from "@/modules/Dashboard";
import landingModule from "@/modules/Landing";
import shopModule from "@/modules/Shop";

const MODULES = ({
    login: loginModule,
    dashboard: dashBoardModule,
    landingModule: landingModule,
    shopModule: shopModule,
});

const registerModule = (name, module) => {
    if (module.router) {
        router.addRoute(module.router);
    }
};

export function registerModules() {
    Object.keys(MODULES).forEach(moduleKey => {
        const module = MODULES[moduleKey];
        registerModule(moduleKey, module);
    });
}
