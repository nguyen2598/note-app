import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authLoading: true, // khi logout thì là false
        isAuthenticated: false, // trạng thái ban đầu chưa login là false
        user: null, // chưa có người dùng
    },
    reducers: {
        setAuth(state, action) {
            return { ...state, authLoading: false, ...action.payload };
        },
    },
});

const { actions, reducer } = authSlice;
export const { setAuth } = actions;
export default reducer;
