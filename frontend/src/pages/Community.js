import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaComment, FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import './Community.css';
import API_URL from '../config';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [newComment, setNewComment] = useState({}); // Map post ID to comment text
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/posts`);
            setPosts(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please login to create a post');

        try {
            await axios.post(`${API_URL}/api/posts`, {
                userId: user._id,
                title: newPost.title,
                content: newPost.content
            });
            setNewPost({ title: '', content: '' });
            fetchPosts();
        } catch (err) {
            alert('Error creating post');
        }
    };

    const handleLike = async (postId) => {
        if (!user) return alert('Please login to like');
        try {
            await axios.put(`${API_URL}/api/posts/${postId}/like`, { userId: user._id });
            fetchPosts();
        } catch (err) {
            console.error('Error liking post');
        }
    };

    const handleComment = async (postId) => {
        if (!user) return alert('Please login to comment');
        const text = newComment[postId];
        if (!text) return;

        try {
            await axios.post(`${API_URL}/api/posts/${postId}/comment`, {
                userId: user._id,
                text
            });
            setNewComment({ ...newComment, [postId]: '' });
            fetchPosts();
        } catch (err) {
            alert('Error creating comment');
        }
    };

    return (
        <div className="community-page">
            <Navbar />
            <div className="community-container">
                <div className="community-header">
                    <h1>Community Forum</h1>
                    <p>Discuss, Ask Questions, and Share Knowledge with Everyone!</p>
                </div>

                {user && (
                    <div className="create-post-card">
                        <h3>Ask a Question or Share Something</h3>
                        <form onSubmit={handleCreatePost}>
                            <input
                                type="text"
                                placeholder="Post Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="What's on your mind?"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                required
                            ></textarea>
                            <button type="submit" className="btn-post">
                                <FaPaperPlane /> Post
                            </button>
                        </form>
                    </div>
                )}

                <div className="posts-feed">
                    {loading ? (
                        <p>Loading discussions...</p>
                    ) : (
                        posts.map(post => (
                            <div key={post._id} className="post-card">
                                <div className="post-header">
                                    <div className="post-avatar">
                                        <FaUserCircle />
                                    </div>
                                    <div className="post-meta">
                                        <h4>{post.authorName || 'Anonymous'}</h4>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-content">{post.content}</p>

                                <div className="post-actions">
                                    <button
                                        className={`action-btn ${post.likes.includes(user?._id) ? 'liked' : ''}`}
                                        onClick={() => handleLike(post._id)}
                                    >
                                        {post.likes.includes(user?._id) ? <FaHeart /> : <FaRegHeart />}
                                        {post.likes.length} Likes
                                    </button>
                                    <button className="action-btn">
                                        <FaComment /> {post.comments.length} Comments
                                    </button>
                                </div>

                                <div className="comments-section">
                                    {post.comments.map((comment, idx) => (
                                        <div key={idx} className="comment">
                                            <strong>{comment.username}: </strong>
                                            {comment.text}
                                        </div>
                                    ))}

                                    {user && (
                                        <div className="add-comment">
                                            <input
                                                type="text"
                                                placeholder="Write a comment..."
                                                value={newComment[post._id] || ''}
                                                onChange={(e) => setNewComment({ ...newComment, [post._id]: e.target.value })}
                                            />
                                            <button onClick={() => handleComment(post._id)}>Send</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Community;
