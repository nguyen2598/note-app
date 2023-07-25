import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        total: 0,
        post: null,
        posts: [],
        postsLoading: true,
    },
    reducers: {
        setPostToUpdate(state, action) {
            console.log('up');
            return {
                ...state,
                post: state.posts.find((post) => post._id === action.payload),
            };
        },
        postLoaderSuccess(state, action) {
            console.log('sus');
            state.posts = action.payload.posts;
            state.total = action.payload.total;
            state.postsLoading = false;
        },
        postLoaderError(state, action) {
            console.log('err');
            return {
                ...state,
                postsLoading: true,
            };
        },
        addPost(state, action) {
            state.posts.push(action.payload);
        },
        deletePost(state, action) {
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
            };
        },
        updatePost(state, action) {
            return {
                ...state,
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
            };
        },
    },
});

const { actions, reducer } = postSlice;
export const { postLoaderSuccess, postLoaderError, addPost, deletePost, updatePost, setPostToUpdate } = actions;
export default reducer;
