import React, { useState } from 'react';
import postApi from '../../app/callApi/postApi';
import { AiOutlineClose } from 'react-icons/ai';
export default function AddPost({ closeForm }) {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;
    const onChangeNewPostForm = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await postApi.addPost(newPost);
        closeForm(false);
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN',
        });
    };
    return (
        <div className="addForm">
            <div className="heading">
                <h2>Add post</h2>
                <div className="closeAdd_Update" onClick={() => closeForm(false)}>
                    <AiOutlineClose size={24} />
                </div>
            </div>
            <form action="" onSubmit={onSubmit}>
                <div className="formGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder=""
                        name="title"
                        value={title}
                        id="title"
                        onChange={onChangeNewPostForm}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder=""
                        value={description}
                        onChange={onChangeNewPostForm}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="url">Url</label>
                    <input type="text" placeholder="" id="url" name="url" value={url} onChange={onChangeNewPostForm} />
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}
