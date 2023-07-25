import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import postReducer from './slice/postSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    },
});

export default store;
