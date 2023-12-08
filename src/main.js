import {createApp} from 'vue'

import {createPinia} from 'pinia';
import {registerModules} from "@/register-modules";
import {initRouteGuard} from "@/route-guard";

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axiosInstance from './http/axios-instance'
import routerDirective from './plugins/router-directive';

import VueCookies from 'vue3-cookies'
import {config as VueCookiesConfig} from "./plugins/vuecookies";

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import './assets/app.scss'

const app = createApp(App);
const pinia = createPinia();

// Init Axios instance
window.axios = axiosInstance;

// Add icons to the library
library.add(fas);
library.add(far);

// Register modules first before we use anything
registerModules();
initRouteGuard();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueCookies, VueCookiesConfig);
app.directive('route-to', routerDirective);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');