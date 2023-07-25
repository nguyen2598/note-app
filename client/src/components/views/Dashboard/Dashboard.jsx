import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import postApi from '../../../app/callApi/postApi';
import SinglePost from '../../Posts/SinglePost';
import AddPost from '../../Posts/AddPost';
import './Dashboard.scss';
import { BsPlusCircleFill } from 'react-icons/bs';
import UpdattePost from '../../Posts/UpdatePost';
export default function Dashboard() {
    console.log('co vao das');
    const { posts, postsLoading } = useSelector((state) => state.post);
    const [isShowAddPost, setIsShowAddPost] = useState(false);
    const [isShowUpdatePost, setIsShowUpdatePost] = useState(false);

    useEffect(() => {
        postApi.getPosts();
    }, []);
    return (
        <div className="Dashboard">
            {posts?.map((post, index) => (
                <div className="post" key={index}>
                    <SinglePost post={post} showEdit={setIsShowUpdatePost} />
                </div>
            ))}
            <div className="addPost" onClick={() => setIsShowAddPost(true)}>
                <BsPlusCircleFill size={40} />
            </div>
            {isShowAddPost ? (
                <div className="formPost">
                    <div className="overlay" onClick={() => setIsShowAddPost(false)}></div>
                    <AddPost closeForm={setIsShowAddPost} />
                </div>
            ) : (
                ''
            )}
            {isShowUpdatePost ? (
                <div className="formPost">
                    <div className="overlay" onClick={() => setIsShowUpdatePost(false)}></div>
                    <UpdattePost closeForm={setIsShowUpdatePost} />
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
