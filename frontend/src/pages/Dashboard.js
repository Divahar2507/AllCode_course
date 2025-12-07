import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import API_URL from '../config';

const Dashboard = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Using 127.0.0.1 to avoid IPv6 issues
                const res = await axios.get(`${API_URL}/api/courses`);
                console.log("Courses data:", res.data);
                setCourses(res.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError(err.message);
            }
        };
        fetchCourses();
    }, []);

    const liveClasses = courses.filter(c => c.type === 'live');
    const selfPacedCourses = courses.filter(c => c.type === 'self-paced');

    const handleCourseClick = (id) => {
        navigate(`/course/${id}`);
    };

    return (
        <div className="dashboard">
            <Navbar />
            <div className="main-content">
                <Hero />

                {error && (
                    <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
                        <h3>Error loading courses: {error}</h3>
                        <p>Please ensure the backend server is running on port 5000.</p>
                    </div>
                )}

                {/* Live Classes Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h2>Live Classes <span className="info-icon">ⓘ</span></h2>
                        <div className="nav-arrows">
                            <button className="arrow-btn"><FaChevronLeft /></button>
                            <button className="arrow-btn"><FaChevronRight /></button>
                        </div>
                    </div>
                    <div className="horizontal-scroll">
                        {liveClasses.length > 0 ? (
                            liveClasses.map(course => (
                                <div key={course._id} onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
                                    <CourseCard type="live" {...course} />
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: '20px' }}>
                                {courses.length === 0 && !error ? 'Loading live classes...' : 'No live classes found.'}
                            </p>
                        )}
                    </div>
                </div>

                {/* Self Paced Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h2>Self-Paced Courses <span className="info-icon">ⓘ</span></h2>
                    </div>
                    <div className="horizontal-scroll">
                        {selfPacedCourses.length > 0 ? (
                            selfPacedCourses.map(course => (
                                <div key={course._id} onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
                                    <CourseCard type="self-paced" {...course} />
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: '20px' }}>
                                {courses.length === 0 && !error ? 'Loading self-paced courses...' : 'No self-paced courses found.'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
