import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaBookOpen, FaAward, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import './Profile.css';
import API_URL from '../config';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        collegeName: '',
        collegeDegree: '',
        collegeYear: '',
        schoolName: '',
        schoolBoard: '',
        schoolYear: '',
        skills: '',
        interviewAlignment: 'Beginner',
        bio: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch all users to find the specific "divahar" user for this demo
                const res = await axios.get(`${API_URL}/api/users`);
                const users = res.data;

                // TARGET "divahar" specifically as requested by the user for the "logged in" view
                const specificUser = users.find(u => u.name.toLowerCase() === 'divahar') || users.find(u => u.role === 'student') || users[0];

                if (specificUser) {
                    // Fetch full details
                    const detailRes = await axios.get(`${API_URL}/api/users/${specificUser._id}`);
                    setUser(detailRes.data);
                } else {
                    setError('No user found');
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError('Failed to load profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Saving Profile Data:", formData);
        alert("Profile details saved!");
    };

    if (loading) return <div className="loading-spinner">Loading Profile...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!user) return <div className="error-message">User not found</div>;

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FaUser />
                    </div>
                    <div className="profile-info">
                        <h1>{user.name}</h1>
                        <p>{user.email}</p>
                        <span className="profile-role-badge">{user.role}</span>
                    </div>
                </div>

                <div className="profile-details-form">
                    <div className="form-section">
                        <h3>🎓 College Details</h3>
                        <div className="form-group-row">
                            <input type="text" name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleInputChange} />
                            <input type="text" name="collegeDegree" placeholder="Degree / Major" value={formData.collegeDegree} onChange={handleInputChange} />
                            <input type="text" name="collegeYear" placeholder="Graduation Year" value={formData.collegeYear} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>🏫 School Details</h3>
                        <div className="form-group-row">
                            <input type="text" name="schoolName" placeholder="School Name" value={formData.schoolName} onChange={handleInputChange} />
                            <input type="text" name="schoolBoard" placeholder="Board (CBSE/ICSE/State)" value={formData.schoolBoard} onChange={handleInputChange} />
                            <input type="text" name="schoolYear" placeholder="Passing Year" value={formData.schoolYear} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>💡 Skills & Expertise</h3>
                        <textarea name="skills" placeholder="List your technical skills (e.g., React, Java, Python)" value={formData.skills} onChange={handleInputChange} rows="3"></textarea>
                    </div>

                    <div className="form-section">
                        <h3>🚀 Interview Alignment</h3>
                        <label className="form-label">Proficiency Level</label>
                        <select name="interviewAlignment" value={formData.interviewAlignment} onChange={handleInputChange}>
                            <option value="Beginner">Beginner - Preparing for first internship</option>
                            <option value="Intermediate">Intermediate - Ready for Junior Dev roles</option>
                            <option value="Advanced">Advanced - Senior/Lead Roles</option>
                        </select>
                        <textarea name="bio" placeholder="Additional details about your career goals..." value={formData.bio} onChange={handleInputChange} rows="3" style={{ marginTop: '10px' }}></textarea>
                    </div>

                    <button className="save-btn" onClick={handleSave}>Save Profile Details</button>
                </div>

                <div className="course-progress-section">
                    <h2>My Learning Journey</h2>
                    <div className="enrolled-courses-grid">
                        {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                            user.enrolledCourses.map((enrollment, index) => (
                                <div key={index} className="course-progress-card">
                                    <h3>{enrollment.courseId?.title || 'Unknown Course'}</h3>
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${enrollment.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <div className="progress-text">
                                        {enrollment.progress || 0}% Complete
                                    </div>
                                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>
                                        <FaCalendarAlt /> Enrolled on {new Date(enrollment.enrolledDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>You haven't enrolled in any courses yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
