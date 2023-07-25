import React, { useState } from 'react';
import postApi from '../../app/callApi/postApi';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

export default function UpdattePost({ closeForm }) {
    const { post } = useSelector((state) => state.post);
    const [updatePost, setUpdatePost] = useState(post);

    const { title, description, url, status } = updatePost;
    const onChangeUpdatePostForm = (e) => {
        setUpdatePost({ ...updatePost, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(updatePost);
        const { success, message } = await postApi.updatePost(updatePost);
        closeForm(false);
    };
    return (
        <div className="addForm">
            <div className="heading">
                <h2>Update post</h2>
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
                        onChange={onChangeUpdatePostForm}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder=""
                        value={description}
                        onChange={onChangeUpdatePostForm}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="url">Url</label>
                    <input
                        type="text"
                        placeholder=""
                        id="url"
                        name="url"
                        value={url}
                        onChange={onChangeUpdatePostForm}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="status">Status</label>
                    <select
                        type="text"
                        placeholder=""
                        id="status"
                        name="status"
                        value={status}
                        onChange={onChangeUpdatePostForm}
                    >
                        <option value="LEARNING">LEARNING</option>
                        <option value="LEARNED">LEARNED</option>
                        <option value="TO LEARN">TO LEARN</option>
                    </select>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}
