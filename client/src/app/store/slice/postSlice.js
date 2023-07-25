import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: null,
        posts: [],
        postsLoading: true,
    },
    reducers: {
        setPostToUpdate(state, action) {
            return {
                ...state,
                post: state.posts.find((post) => post._id === action.payload),
            };
        },
        postLoaderSuccess(state, action) {
            state.posts = action.payload;
            state.postsLoading = false;
        },
        postLoaderError(state, action) {
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
