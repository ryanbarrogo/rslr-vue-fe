import Axios from 'axios'
import {useCookies} from "vue3-cookies"

const {cookies} = useCookies()
const AUTH_TOKEN = cookies.get('token')

let axiosInstance = Axios.create({
    // TODO: Set Base URL
    headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        // 401 - Unauthorized
        if (AUTH_TOKEN && error.response.status === 401) {
            this.$cookies.remove('token')
            location.reload()
        }

        // 403 - Forbidden
        if (error.response && error.response.status === 403) {
            console.log('403 - Forbidden');
            // TODO: deal with 403
        }

        // 404 - Not Found
        if (error.response && error.response.status === 404) {
            console.log('404 - Not Found');
            // TODO: deal with 404
        }

        return Promise.reject(error)
    }
);

export default axiosInstance
