import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaBook, FaLayerGroup, FaCheckCircle, FaChevronDown, FaChevronUp, FaLock, FaPlayCircle, FaFileAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';
import API_URL from '../config';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/courses/${id}`);
            // Add expanded property to modules for UI state
            const courseData = res.data;
            if (courseData.modules) {
                courseData.modules = courseData.modules.map((m, index) => ({
                    ...m,
                    expanded: index === 0 // Expand first module by default
                }));
            }
            setCourse(courseData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching course:', err);
            setLoading(false);
        }
    };

    const toggleModule = (moduleId) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            modules: prevCourse.modules.map(m =>
                m._id === moduleId ? { ...m, expanded: !m.expanded } : m
            )
        }));
    };

    const handleToggleComplete = async (e, moduleId, topicId) => {
        e.stopPropagation(); // Prevent navigation
        try {
            const res = await axios.put(
                `${API_URL}/api/courses/${id}/module/${moduleId}/topic/${topicId}/complete`
            );
            const updatedCourse = res.data;
            if (updatedCourse.modules) {
                updatedCourse.modules = updatedCourse.modules.map((m, index) => ({
                    ...m,
                    expanded: course.modules.find(cm => cm._id === m._id)?.expanded || false
                }));
            }
            setCourse(updatedCourse);
        } catch (err) {
            console.error('Error updating topic:', err);
        }
    };

    const handleNavigateToLesson = (topicId) => {
        navigate(`/course/${id}/lesson/${topicId}`);
    };

    const handleContinue = () => {
        navigate(`/lesson/1`); // In a real app, this would go to the last accessed lesson
    };

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (!course) return <div className="error-message">Course not found</div>;

    return (
        <div className="course-detail-page">
            <Navbar />

            <div className="detail-container">
                {/* Header Section */}
                <div className="course-header-card">
                    <div className="header-top">
                        <h1>{course.title}</h1>
                        <span className="status-badge-yellow">● {course.status || 'In Progress'}</span>
                    </div>

                    <div className="course-meta-tags">
                        <span className="tag"><FaLayerGroup /> {course.modules ? course.modules.length : 0} Modules</span>
                        <span className="tag"><FaBook /> {course.modules ? course.modules.reduce((acc, m) => acc + m.topics.length, 0) : 0} Topics</span>
                    </div>

                    <div className="course-info-grid">
                        <div className="info-item">
                            <label>Mentor Name</label>
                            <div className="mentor-row">
                                <div className="avatar-small">{course.mentor ? course.mentor.charAt(0) : 'A'}</div>
                                <span>{course.mentor}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <label>Start Date</label>
                            <span>{course.startDate}</span>
                        </div>
                        <div className="info-item">
                            <label>Course Type</label>
                            <span>{course.type === 'live' ? 'Academic' : 'Self Paced'}</span>
                        </div>
                        <div className="info-item progress-item">
                            <div className="progress-label">
                                <span>{course.progress}%</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="btn-continue-large" onClick={handleContinue}>Continue →</button>
                        <button className="btn-continue-large" style={{ marginLeft: '10px', background: '#28a745' }} onClick={() => window.open('https://meet.google.com/sea-cfwe-mrf', '_blank')}>Join Live Class 🎥</button>
                    </div>
                </div>

                {/* Syllabus Section */}
                <div className="syllabus-section">
                    <h3>Syllabus</h3>
                    <div className="syllabus-list">
                        {course.modules && course.modules.length > 0 ? (
                            course.modules.map(module => (
                                <div className="module-item" key={module._id}>
                                    <div className="module-header" onClick={() => toggleModule(module._id)}>
                                        <div className="folder-icon">📁</div>
                                        <span className="module-title">{module.title}</span>
                                        <span className="toggle-icon">
                                            {module.expanded ? <FaChevronUp /> : <FaChevronDown />}
                                        </span>
                                    </div>

                                    {module.expanded && (
                                        <div className="module-content">
                                            {module.topics.map(topic => (
                                                <div
                                                    className="topic-item"
                                                    key={topic._id}
                                                    onClick={() => handleNavigateToLesson(topic._id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div className="topic-status" onClick={(e) => handleToggleComplete(e, module._id, topic._id)}>
                                                        {topic.completed ? <FaCheckCircle className="check-icon" /> : <div className="dot-icon">●</div>}
                                                    </div>
                                                    <span className="topic-title">{topic.title}</span>
                                                    <span className="topic-type">{topic.type === 'video' ? <FaPlayCircle /> : <FaFileAlt />}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-modules">No syllabus available yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;

