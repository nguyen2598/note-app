import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import postApi from '../../../app/callApi/postApi';
import SinglePost from '../../Posts/SinglePost';
import AddPost from '../../Posts/AddPost';
import './Dashboard.scss';
import { BsPlusCircleFill } from 'react-icons/bs';
import UpdattePost from '../../Posts/UpdatePost';
import { FcNext, FcPrevious } from 'react-icons/fc';
export default function Dashboard() {
    console.log('co vao das');
    const { posts, postsLoading, total } = useSelector((state) => state.post);
    const [isShowAddPost, setIsShowAddPost] = useState(false);
    const [isShowUpdatePost, setIsShowUpdatePost] = useState(false);
    const [page, setPage] = useState(1);
    console.log(total);
    useEffect(() => {
        postApi.getPosts(page);
    }, [page]);
    useEffect(() => {
        postApi.getPosts();
    }, []);
    return (
        <div className="Dashboard">
            <div className="posts">
                {posts?.map((post, index) => (
                    <div className="post" key={index}>
                        <SinglePost post={post} showEdit={setIsShowUpdatePost} />
                    </div>
                ))}
            </div>
            {total > 1 ? (
                <div className="pagination">
                    <div onClick={() => setPage((prev) => prev - 1)} className={`pagi ${page > 1 ? '' : 'disabled'}`}>
                        <FcPrevious />
                    </div>
                    <div className="paginNumber">{page}</div>
                    <div
                        onClick={() => setPage((prev) => prev + 1)}
                        className={`pagi ${page < total ? '' : 'disabled'}`}
                    >
                        <FcNext />
                    </div>
                </div>
            ) : (
                ''
            )}
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
