import {createRouter, createWebHistory} from 'vue-router'
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:catchAll(.*)*',
            name: 'not-found',
            component: NotFound,
        }
    ]
})

export default router;
