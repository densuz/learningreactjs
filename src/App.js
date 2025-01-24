import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import axios from 'axios';

const App = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/posts');
        setSelectedPost(null);
        return response.data;
    };
    
    useEffect(() => {
        fetchPosts();
    }, []);
    

    const handleEdit = (post) => {
        setSelectedPost(post);
    };

    return (
        <div>
            <h1 className='text-center'>Larvel Reactjs</h1>
            <PostForm selectedPost={selectedPost} fetchPosts={fetchPosts} onClick={fetchPosts} />
            <PostList onEdit={handleEdit} />
        </div>
    );
};

export default App;
