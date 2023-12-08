import {defineStore} from 'pinia';

export const useSideMenuStore = defineStore('sideMenuStore', {
    state: () => {
        return {
            drawer: true,
        }
    },
    actions: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
    },
});