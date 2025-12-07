import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Reuse Register styles
import API_URL from '../config';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const res = await axios.post(`${API_URL}/api/users/login`, {
                email: formData.email,
                password: formData.password
            });

            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(res.data.user));

            setMessage({
                type: 'success',
                text: 'Login successful! Redirecting...'
            });

            // Redirect to home/dashboard
            setTimeout(() => {
                navigate('/');
                window.location.reload(); // Ensure Navbar updates
            }, 1000);

        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Login failed'
            });
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Welcome Back</h1>
                <p className="subtitle">Login to continue learning</p>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn-register">
                        Login
                    </button>
                </form>

                <div className="register-footer">
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
