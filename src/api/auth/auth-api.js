import axiosInstance from "@/http/axios-instance";

const LOGIN_API = `${import.meta.env.VITE_IQCM_LOGIN_BASE_API}/api/Login`;
const MAIN_API = `${import.meta.env.VITE_IQCM_MAIN_BASE_API}`;

export default {
    /**
     *
     * @param {String} params.email
     * @param {String} params.password
     * @param {int} params.groupTypeId
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getToken(params) {
        let postData = {
            emailAddress: params.email,
            password: params.password,
            groupTypeId: (params.groupTypeId ?? 1),
        };

        return await axiosInstance.post(`${LOGIN_API}/WebApplicationLogin`, postData)
    },
    async getUserPermissions() {
        return await axiosInstance.get(`${MAIN_API}/User/GetUserPermissions`)
    },
    async destroyToken() {
        return await axiosInstance.delete(`${LOGIN_API}/Logout`)
    },
}