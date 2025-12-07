import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaGithub, FaLinkedin, FaFileAlt, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import './Profile.css';
import API_URL from '../config';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Profile');
    const [isEditing, setIsEditing] = useState({}); // Track editing state per section

    // Combined State for all fields
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (!loggedInUser) return;

            const res = await axios.get(`${API_URL}/api/users/${loggedInUser._id}`);
            setUser(res.data);
            setFormData(res.data); // Initialize form with existing data
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleEdit = (section) => {
        setIsEditing(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const saveSection = async (section) => {
        try {
            await axios.put(`${API_URL}/api/users/${user._id}`, formData);
            setUser(formData);
            toggleEdit(section);
            alert(`${section} updated successfully!`);
        } catch (err) {
            alert('Error updating profile');
        }
    };

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (!user) return <div>Please Login</div>;

    // Helper to render an input or text based on edit mode
    const renderField = (section, name, label, type = "text", placeholder = "") => {
        const value = formData[name] || '';
        if (isEditing[section]) {
            return (
                <div className="edit-field-group">
                    <label>{label}</label>
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="profile-input"
                    />
                </div>
            );
        }
        return (
            <div className="view-field-group">
                <span className="field-label">{label}</span>
                <span className="field-value">{value || '-'}</span>
            </div>
        );
    };

    return (
        <div className="my-account-page">
            <Navbar />
            <div className="my-account-container">

                {/* Profile Header Card */}
                <div className="profile-header-card">
                    <div className="profile-avatar-section">
                        <div className="avatar-circle">
                            <img src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}`} alt="Profile" />
                            <div className="completion-badge">100%</div>
                        </div>
                    </div>
                    <div className="profile-basic-info">
                        <div className="info-row-main">
                            <h2>{user.name.toUpperCase()}</h2>
                            <span className="user-id-badge">ID: {user._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="info-row-sub">
                            <span>{user.email}</span>
                            <span>•</span>
                            <span>{user.gender || 'Male'}</span>
                            <span>•</span>
                            <span>{new Date(user.dob || Date.now()).toLocaleDateString()}</span>
                        </div>
                        <div className="info-row-contact">
                            <span>📞 {user.phone || 'Add Phone'}</span>
                            <span>📞 {user.altPhone || 'Add Alt Phone'}</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="profile-tabs">
                    {['Profile', 'Attendance', 'Subscription', 'Referral', 'Certificate'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'Profile' && (
                    <div className="profile-content">

                        {/* Generic Details Section */}
                        <div className="details-card">
                            <div className="card-header">
                                <h3>| Generic Details</h3>
                                {isEditing.generic ? (
                                    <div className="action-btns">
                                        <button onClick={() => saveSection('generic')} className="btn-save"><FaCheck /> Save</button>
                                        <button onClick={() => toggleEdit('generic')} className="btn-cancel"><FaTimes /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => toggleEdit('generic')} className="btn-edit">Edit</button>
                                )}
                            </div>
                            <div className="card-body grid-2">
                                {renderField('generic', 'workExperience', 'Work Experience')}
                                {renderField('generic', 'careerGap', 'Career Gap')}
                                {renderField('generic', 'currentState', 'Current State')}
                                {renderField('generic', 'currentCity', 'Current City')}
                                {renderField('generic', 'preferredLocation', 'Preferred Location', 'text', 'e.g. Bangalore, Mumbai')}
                            </div>

                            {/* Social Links Sub-section */}
                            <div className={`social-links-row ${isEditing.generic ? 'editing' : ''}`}>
                                <div className="social-link-item">
                                    <FaGithub className="social-icon" />
                                    {isEditing.generic ?
                                        <input name="githubLink" value={formData.githubLink} onChange={handleInputChange} placeholder="Github URL" /> :
                                        <a href={formData.githubLink || '#'} target="_blank" rel="noreferrer">{formData.githubLink ? 'GitHub Profile' : 'Add GitHub'}</a>
                                    }
                                </div>
                                <div className="social-link-item">
                                    <FaLinkedin className="social-icon" />
                                    {isEditing.generic ?
                                        <input name="linkedinLink" value={formData.linkedinLink} onChange={handleInputChange} placeholder="LinkedIn URL" /> :
                                        <a href={formData.linkedinLink || '#'} target="_blank" rel="noreferrer">{formData.linkedinLink ? 'LinkedIn Profile' : 'Add LinkedIn'}</a>
                                    }
                                </div>
                                <div className="social-link-item">
                                    <FaFileAlt className="social-icon" />
                                    {isEditing.generic ?
                                        <input name="resumeLink" value={formData.resumeLink} onChange={handleInputChange} placeholder="Resume URL" /> :
                                        <a href={formData.resumeLink || '#'} target="_blank" rel="noreferrer">{formData.resumeLink ? 'View Resume' : 'Add Resume'}</a>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* 10th Grade Section */}
                        <div className="details-card">
                            <div className="card-header">
                                <h3>| 10th Grade</h3>
                                {isEditing.tenth ? (
                                    <div className="action-btns">
                                        <button onClick={() => saveSection('tenth')} className="btn-save"><FaCheck /> Save</button>
                                        <button onClick={() => toggleEdit('tenth')} className="btn-cancel"><FaTimes /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => toggleEdit('tenth')} className="btn-edit">Edit</button>
                                )}
                            </div>
                            <div className="card-body grid-3">
                                {renderField('tenth', 'tenthSchool', 'School Name')}
                                {renderField('tenth', 'tenthYear', 'Year of Passout')}
                                {renderField('tenth', 'tenthMarks', 'Marks in %')}
                            </div>
                        </div>

                        {/* 12th Grade Section */}
                        <div className="details-card">
                            <div className="card-header">
                                <h3>| 12th / PUC / Diploma</h3>
                                {isEditing.twelfth ? (
                                    <div className="action-btns">
                                        <button onClick={() => saveSection('twelfth')} className="btn-save"><FaCheck /> Save</button>
                                        <button onClick={() => toggleEdit('twelfth')} className="btn-cancel"><FaTimes /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => toggleEdit('twelfth')} className="btn-edit">Edit</button>
                                )}
                            </div>
                            <div className="card-body grid-3">
                                {renderField('twelfth', 'twelfthSchool', 'College/School Name')}
                                {renderField('twelfth', 'twelfthYear', 'Year of Passout')}
                                {renderField('twelfth', 'twelfthMarks', 'Marks in %')}
                            </div>
                        </div>

                        {/* UG Detail Section */}
                        <div className="details-card">
                            <div className="card-header">
                                <h3>| UG Detail</h3>
                                {isEditing.ug ? (
                                    <div className="action-btns">
                                        <button onClick={() => saveSection('ug')} className="btn-save"><FaCheck /> Save</button>
                                        <button onClick={() => toggleEdit('ug')} className="btn-cancel"><FaTimes /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => toggleEdit('ug')} className="btn-edit">Edit</button>
                                )}
                            </div>
                            <div className="card-body grid-2">
                                {renderField('ug', 'collegeRollNo', 'University Roll No')}
                                {renderField('ug', 'collegeName', 'College Name')}
                                {renderField('ug', 'collegeDegree', 'Course Name')}
                                {renderField('ug', 'collegeBranch', 'Branch')}
                                {renderField('ug', 'collegeYear', 'Year of Passout')}
                                {renderField('ug', 'collegeMarks', 'Marks in %')}
                                {renderField('ug', 'collegeCGPA', 'CGPA')}
                                {renderField('ug', 'activeBacklogs', 'Active Backlogs')}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
