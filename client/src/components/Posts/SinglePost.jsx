import React from 'react';
import ActionButton from './ActionButton';
import './Posts.scss';
export default function SinglePost({ post: { _id, status, title, description, url }, showEdit }) {
    return (
        <div className={`${status === 'LEARNED' ? `success` : status === 'LEARNING' ? `err` : 'warn'} singlePost`}>
            <div className="singlePostLeft">
                <h2 className="title">{title}</h2>
                <div className="status">{status}</div>
                <div>{description}</div>
            </div>
            <div className="singlePostRight">
                <ActionButton _id={_id} url={url} showEdit={showEdit} />
            </div>
        </div>
    );
}
