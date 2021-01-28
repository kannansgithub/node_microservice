import React from 'react';
import CreatePost from './pages/createPost';
import PostList from './pages/postList';
const app= () => {
    return (<div className="container">
        <h1>Create Post</h1>
        <CreatePost />
        <hr />
        <h1>Posts</h1>
        <PostList/>
    </div>);
};

export default app;