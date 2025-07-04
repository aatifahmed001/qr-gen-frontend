import {getEnvironmentVariable} from '../utils/env.helpers'

const serviceURL = new URL(getEnvironmentVariable('VITE_API_HOST'));
const baseURL = serviceURL + '/userapi'

console.log("🧩 VITE_API_HOST:", serviceURL);
console.log("🧩 baseURL:", baseURL);
console.log("🧩 registerUser endpoint:", apiEndpoints.registerUser);

export const apiEndpoints = {
    baseURL: baseURL,
    auth: `${baseURL}/authenticate`,
    loginUser: `${baseURL}/loginUser`,    // http://localhost:5000/userapi/loginUser
    logoutUser: `${baseURL}/logoutUser`,
    registerUser: `${baseURL}/registerUser`,
    forgotPassword: `${baseURL}/forgotPassword`,
    resetPasswordByToken: `${baseURL}/resetPassword/byToken`,
    getQRLink: `${baseURL}/getQRLink`,
    deleteQRById: `${baseURL}/deleteQR/byId`,
    editQRById: `${baseURL}/editQR/byId`,
}

export const ROUTES = {
    ROOT: '/',
    REGISTER: '/register',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgotPassword',
    RESET_PASSWORD: '/resetPassword/:token',
    DASHBOARD: '/dashboard',
    LINK_QR: '/linkqr',
    SHOW_QR: '/showqr',
}