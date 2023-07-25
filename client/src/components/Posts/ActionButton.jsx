import React from 'react';
import postApi from '../../app/callApi/postApi';
import { BsPencil } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setPostToUpdate } from '../../app/store/slice/postSlice';
export default function ActionButton({ url, _id, showEdit }) {
    const dispatch = useDispatch();
    const deletePost = async (id) => {
        await postApi.deletePost(id);
    };
    const updatePost = async (id) => {
        dispatch(setPostToUpdate(id));
        showEdit(true);
    };

    return (
        <>
            <a href={url} className="youtube" title={'nguồn tham khảo'}>
                <AiFillYoutube size={28} />
            </a>
            <div className="pen" title={'chỉnh sửa'} onClick={() => updatePost(_id)}>
                <BsPencil size={24} />
            </div>
            <div onClick={() => deletePost(_id)} className="bin" title={'xóa'}>
                <RiDeleteBin6Line size={24} />
            </div>
        </>
    );
}
