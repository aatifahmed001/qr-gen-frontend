import {getEnvironmentVariable} from '../utils/env.helpers'

const serviceURL = new URL(getEnvironmentVariable('VITE_API_HOST'));
const baseURL = serviceURL + '/userapi'
// const serviceURL = getEnvironmentVariable('VITE_API_HOST'); // leave as string
// const baseURL = new URL('/userapi/', serviceURL).toString();

// console.log("🧩 VITE_API_HOST:", serviceURL);
// console.log("🧩 baseURL:", baseURL);
// console.log("🧩 registerUser endpoint:", apiEndpoints.registerUser);

export const apiEndpoints = {
    baseURL: baseURL,
    auth: new URL('authenticate', baseURL).toString(),
    loginUser: new URL('loginUser', baseURL).toString(),
    logoutUser: new URL('logoutUser', baseURL).toString(),
    registerUser: new URL('registerUser', baseURL).toString(),
    forgotPassword: new URL('forgotPassword', baseURL).toString(),
    resetPasswordByToken: new URL('resetPassword/byToken', baseURL).toString(),
    getQRLink: new URL('getQRLink', baseURL).toString(),
    deleteQRById: new URL('deleteQRById', baseURL).toString(),
    editQRById: new URL('editQRById', baseURL).toString(),

    // baseURL: baseURL,
    // auth: `${baseURL}/authenticate`
    // loginUser: `${baseURL}/loginUser`,    // http://localhost:5000/userapi/loginUser
    // logoutUser: `${baseURL}/logoutUser`,
    // registerUser: `${baseURL}/registerUser`,
    // forgotPassword: `${baseURL}/forgotPassword`,
    // resetPasswordByToken: `${baseURL}/resetPassword/byToken`,
    // getQRLink: `${baseURL}/getQRLink`,
    // deleteQRById: `${baseURL}/deleteQR/byId`,
    // editQRById: `${baseURL}/editQR/byId`,
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