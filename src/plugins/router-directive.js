import router from '@/router';

const routeToDirective = {
    mounted(el, binding) {
        el.addEventListener('click', () => {
            const { value } = binding;
            if (typeof value === 'string') {
                router.push(value);
            } else if (typeof value === 'object' && value.path) {
                router.push(value);
            } else {
                console.error('Invalid route value for v-route-to directive');
            }
        });
    },
};

export default routeToDirective;
