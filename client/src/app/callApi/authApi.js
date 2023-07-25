import axiosClient from '../axiosClient';
import setAuthToken from '../../utils/setAuthToken';
// import { useDispatch } from 'react-redux';
import store from '../store/store';
import { setAuth } from '../store/slice/authSlice';
const authApi = {
    // Check xem user đăng nhập chưa
    async loadUser() {
        if (localStorage['token_name']) {
            setAuthToken(localStorage['token_name']);
        }
        try {
            const url = '/auth';
            const response = await axiosClient.get(url);
            if (response.success) {
                store.dispatch(
                    setAuth({
                        user: response.user,
                        isAuthenticated: true,
                    }),
                );
            }
        } catch (error) {
            localStorage.removeItem('token_name');
            setAuthToken(null);
            store.dispatch(
                setAuth({
                    isAuthenticated: false,
                    user: null,
                }),
            );
        }
    },
    // Login
    async loginUser(data) {
        const url = '/auth/login';
        try {
            // chỉ có staust 200 mới đi vào đây còn đâu nó đíu vào đây ms phát hiện xong hehe
            const response = await axiosClient.post(url, data);
            if (response.success) {
                localStorage.setItem('token_name', response.token);
            }
            await authApi.loadUser();

            return response;
        } catch (error) {
            if (error.response) return error.response.data;
            else
                return {
                    success: false,
                    message: error.message,
                };
        }
    },

    // register
    async registerUser(data) {
        const url = '/auth/register';
        try {
            // chỉ có staust 200 mới đi vào đây còn đâu nó đíu vào đây ms phát hiện xong hehe
            const response = await axiosClient.post(url, data);
            if (response.success) {
                localStorage.setItem('token_name', response.token);
            }
            await authApi.loadUser();

            return response;
        } catch (error) {
            if (error.response) return error.response.data;
            else
                return {
                    success: false,
                    message: error.message,
                };
        }
    },

    // logout
    logoutUser() {
        localStorage.removeItem('token_name');
        store.dispatch(
            setAuth({
                isAuthenticated: false,
                user: null,
            }),
        );
    },
};

export default authApi;
