import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle, FaEnvelope, FaPhoneAlt, FaMoon, FaSun, FaCode, FaCommentDots, FaFileAlt, FaUserTie, FaCalendarAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoWalletOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import FeedbackForm from './FeedbackForm';
import './Navbar.css';

const Navbar = () => {
    const [showFeedback, setShowFeedback] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'));

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert("Logged out successfully");
        navigate('/');
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="logo" onClick={() => navigate('/')}>
                        <span className="logo-kod">All</span><span className="logo-nest">Code</span>
                    </div>
                    <ul className="nav-links">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/practice">Practice</Link></li>
                        <li className="highlight-text"><Link to="/placements">Placements</Link></li>
                        <li className="dropdown-trigger">Community <span className="dropdown-arrow">▼</span></li>
                    </ul>
                </div>

                <div className="navbar-right">
                    <div className="icon-group">
                        <button className="icon-btn" onClick={() => setShowFeedback(true)} title="Send Feedback">
                            <FaEnvelope />
                        </button>
                        <button className="icon-btn highlight-icon"><IoWalletOutline /></button>
                        <button className="icon-btn"><FaPhoneAlt /></button>
                        <button className="icon-btn" onClick={toggleTheme} title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>

                        <div className="profile-menu-container" ref={dropdownRef}>
                            <button className="icon-btn user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                                <FaUserCircle />
                            </button>

                            {showProfileMenu && (
                                <div className="profile-dropdown">
                                    <div className="dropdown-header-user">
                                        <div className="user-avatar-large">
                                            <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} alt="Avatar" />
                                        </div>
                                        <div className="user-info-text">
                                            <div className="user-name">{user?.name || 'Guest User'}</div>
                                            <div className="user-batch">{user?.batch || 'No Batch Assigned'}</div>
                                        </div>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/profile" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <FaUser className="item-icon" /> My Account
                                    </Link>
                                    <Link to="/compiler" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <FaCode className="item-icon" /> Compiler
                                    </Link>
                                    <div className="dropdown-item" onClick={() => { setShowFeedback(true); setShowProfileMenu(false); }}>
                                        <FaCommentDots className="item-icon" /> User Feedback
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/resume" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <FaFileAlt className="item-icon" /> Resume Builder
                                    </Link>
                                    <Link to="/mock-interview" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <FaUserTie className="item-icon" /> Mock Interview
                                    </Link>
                                    <Link to="/leave" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                                        <FaCalendarAlt className="item-icon" /> Apply for Leave
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-item logout-item" onClick={handleLogout}>
                                        <FaSignOutAlt className="item-icon" /> Log Out
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <FeedbackForm isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
        </>
    );
};

export default Navbar;
