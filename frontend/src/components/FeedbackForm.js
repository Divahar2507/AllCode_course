import React, { useState } from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';
import './FeedbackForm.css';

const FeedbackForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 0,
        category: 'general',
        message: ''
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                rating: 0,
                category: 'general',
                message: ''
            });
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="feedback-overlay" onClick={onClose}>
            <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                {submitted ? (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>Thank You!</h2>
                        <p>Your feedback has been submitted successfully.</p>
                    </div>
                ) : (
                    <>
                        <h2>We Value Your Feedback</h2>
                        <p className="subtitle">Help us improve AllCode by sharing your thoughts</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Rate Your Experience *</label>
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={star <= (hoverRating || formData.rating) ? 'star active' : 'star'}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="general">General Feedback</option>
                                    <option value="course">Course Content</option>
                                    <option value="platform">Platform Experience</option>
                                    <option value="instructor">Instructor</option>
                                    <option value="technical">Technical Issue</option>
                                    <option value="suggestion">Suggestion</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Your Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Share your thoughts, suggestions, or concerns..."
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn" disabled={formData.rating === 0}>
                                Submit Feedback
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default FeedbackForm;
