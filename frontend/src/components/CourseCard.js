import React from 'react';
import { FaPhone } from 'react-icons/fa';
import './CourseCard.css';

const CourseCard = ({ title, mentor, progress, time, status, accentColor, type }) => {
    const googleMeetLink = 'https://meet.google.com/jvu-qvar-vhm';

    return (
        <div className="course-card" style={{ borderTopColor: accentColor }}>
            <div className="card-header">
                <div className="course-icon" style={{ backgroundColor: '#212121' }}>
                    {title.charAt(0)}
                </div>
                <div className="course-info">
                    <h3>{title}</h3>
                    <p className="mentor">Mentor: {mentor}</p>
                </div>
                <div className="status-badge">
                    {status === 'Not Started' && <span className="badge warning">⚠ Not Started</span>}
                    {status === 'Self Paced' && <span className="badge info">Self Paced</span>}
                    {status === 'In Progress' && <span className="badge success">● In Progress</span>}
                </div>
            </div>

            <div className="progress-section">
                <div className="progress-label">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="card-footer">
                {type === 'live' ? (
                    <div className="class-time">
                        <span>Class Time</span>
                        <span className="time-val">{time}</span>
                    </div>
                ) : (
                    <div className="spacer" style={{ height: '20px' }}></div>
                )}

                {type === 'live' ? (
                    <a href={googleMeetLink} target="_blank" rel="noopener noreferrer" className="join-btn">
                        <FaPhone /> Join Class
                    </a>
                ) : (
                    <button className="join-btn">
                        → Start Learning
                    </button>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
