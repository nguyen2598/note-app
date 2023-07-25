import axiosClient from '../axiosClient';
import { postLoaderError, postLoaderSuccess, addPost, deletePost, updatePost } from '../store/slice/postSlice';
import store from '../store/store';
const postApi = {
    async getPosts(params) {
        const url = '/posts';
        try {
            const response = await axiosClient.get(url);
            if (response.success) {
                store.dispatch(postLoaderSuccess(response.posts));
            }
        } catch (error) {
            store.dispatch(postLoaderError(error));
        }
    },

    // add post
    async addPost(data) {
        const url = '/posts';
        try {
            const response = await axiosClient.post(url, data);
            if (response.success) {
                store.dispatch(addPost(response.post));
                return response;
            }
        } catch (error) {
            if (error.response) return error.response.data;
            else
                return {
                    success: false,
                    message: error.message,
                };
        }
    },

    // Delete post
    async deletePost(id) {
        const url = `/posts/${id}`;
        try {
            const response = await axiosClient.delete(url);
            if (response.success) {
                store.dispatch(deletePost(id));
            }
        } catch (error) {}
    },
    // update post
    async updatePost(data) {
        const url = `/posts/${data._id}`;
        try {
            const response = await axiosClient.put(url, data);
            if (response.success) {
                store.dispatch(updatePost(response.post));
                return response;
            }
        } catch (error) {
            if (error.response) return error.response.data;
            else
                return {
                    success: false,
                    message: error.message,
                };
        }
    },
};

export default postApi;
