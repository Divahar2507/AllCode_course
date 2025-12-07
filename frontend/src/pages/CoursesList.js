import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaBook, FaLayerGroup, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CoursesList.css';
import API_URL from '../config';

const CoursesList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, live, self-paced

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/courses`);
            setCourses(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setLoading(false);
        }
    };

    const getFilteredCourses = () => {
        if (filter === 'all') return courses;
        return courses.filter(course => course.type === filter);
    };

    const getTotalModules = (course) => course.modules ? course.modules.length : 0;
    const getTotalTopics = (course) => course.modules ? course.modules.reduce((acc, m) => acc + m.topics.length, 0) : 0;

    if (loading) return <div className="loading-spinner">Loading courses...</div>;

    return (
        <div className="courses-list-page">
            <Navbar />

            <div className="courses-container">
                <div className="courses-header">
                    <h1>My Courses</h1>
                    <div className="filter-tabs">
                        <button
                            className={filter === 'all' ? 'active' : ''}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={filter === 'live' ? 'active' : ''}
                            onClick={() => setFilter('live')}
                        >
                            Live Classes
                        </button>
                        <button
                            className={filter === 'self-paced' ? 'active' : ''}
                            onClick={() => setFilter('self-paced')}
                        >
                            Self-Paced
                        </button>
                    </div>
                </div>

                <div className="courses-list">
                    {getFilteredCourses().map(course => (
                        <div className="course-list-card" key={course._id} style={{ borderLeftColor: course.accentColor }}>
                            <div className="course-list-header">
                                <div className="course-title-section">
                                    <div className="course-icon-large" style={{ backgroundColor: course.accentColor }}>
                                        {course.title ? course.title.charAt(0) : 'C'}
                                    </div>
                                    <div className="course-title-info">
                                        <h2>{course.title}</h2>
                                        <div className="course-meta-badges">
                                            <span className="badge-modules">
                                                <FaLayerGroup /> {getTotalModules(course)} Modules
                                            </span>
                                            <span className="badge-topics">
                                                <FaBook /> {getTotalTopics(course)} Topics
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-status-badge">
                                    {course.type === 'live' ? (
                                        <span className="badge-live">● Live</span>
                                    ) : (
                                        <span className="badge-self">Self Paced</span>
                                    )}
                                </div>
                            </div>

                            <div className="course-list-body">
                                <div className="course-details-grid">
                                    <div className="detail-item">
                                        <label>Mentor Name</label>
                                        <div className="mentor-info">
                                            <div className="mentor-avatar">{course.mentor ? course.mentor.charAt(0) : 'M'}</div>
                                            <span>{course.mentor || 'Unknown'}</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <label>Start Date</label>
                                        <span>{course.startDate}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Course Type</label>
                                        <span>{course.type === 'live' ? 'Academic' : 'Self Paced'}</span>
                                    </div>
                                    {course.type === 'live' && (
                                        <div className="detail-item">
                                            <label>Class Time</label>
                                            <span>{course.time}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="progress-section-list">
                                    <div className="progress-header">
                                        <span>Progress</span>
                                        <span className="progress-percentage">{course.progress || 0}%</span>
                                    </div>
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar-filled"
                                            style={{
                                                width: `${course.progress || 0}%`,
                                                backgroundColor: course.accentColor
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="course-actions">
                                    <button
                                        className="btn-view-syllabus"
                                        onClick={() => navigate(`/course/${course._id}`)}
                                    >
                                        <FaBook /> View Syllabus
                                    </button>
                                    <button
                                        className="btn-continue"
                                        onClick={() => {
                                            if (course.modules?.[0]?.topics?.[0]) {
                                                navigate(`/course/${course._id}/lesson/${course.modules[0].topics[0]._id}`);
                                            } else {
                                                navigate(`/course/${course._id}`);
                                            }
                                        }}
                                    >
                                        Start Learning <FaChevronRight />
                                    </button>
                                </div>

                                {course.modules && course.modules.length > 0 && (
                                    <div className="active-modules-section">
                                        <h4>📁 Active Modules</h4>
                                        <div className="modules-preview">
                                            {course.modules.slice(0, 3).map((module, index) => (
                                                <div className="module-preview-item" key={index}>
                                                    <span className="module-number">{index + 1}</span>
                                                    <span className="module-name">{module.title}</span>
                                                    <span className="module-topics">{module.topics.length} topics</span>
                                                </div>
                                            ))}
                                            {course.modules.length > 3 && (
                                                <div className="more-modules">
                                                    +{course.modules.length - 3} more modules
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesList;
